/* ═══════════════════════════════════════════════════════════════════ */
/*  TYPES & GAME DATA                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

export interface GameQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  era: string;
}

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "sandbag" | "crater" | "trench" | "tank" | "wall" | "bunker" | "barrel" | "wire" | "palace" | "gate";
}

export interface MapDecoration {
  x: number;
  y: number;
  type: "fire" | "smoke" | "flag" | "debris" | "tree_stump" | "shell_casing" | "tank_active";
}

export interface MapTheme {
  terrain: "jungle" | "urban" | "rice_field" | "mountain" | "coast" | "delta" | "highland";
  weather: "clear" | "rain" | "fog" | "night";
  obstacles: Obstacle[];
  decorations: MapDecoration[];
}

export interface LevelData {
  name: string;
  emoji: string;
  bg: string;
  groundColor: string;
  enemyColor: string;
  questions: GameQuestion[];
  map?: MapTheme;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Bullet {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface EnemyBullet {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  fromTank: boolean;
}

export type EnemyType = "soldier" | "fortified" | "tank";

export interface EnemyTypeConfig {
  type: EnemyType;
  speed: number;
  size: number;
  hp: number;
  shootCooldown: number;
  bulletSpeed: number;
  scoreValue: number;
}

export interface Enemy {
  id: number;
  x: number;
  y: number;
  hp: number;
  type: EnemyType;
  speed: number;
  size: number;
  lastShot: number;
  anchorX?: number;
  anchorY?: number;
  shootCooldown: number;
  bulletSpeed: number;
}

export interface Explosion {
  id: number;
  x: number;
  y: number;
  frame: number;
}

export interface WeaponType {
  id: string;
  name: string;
  emoji: string;
  bulletCount: number;    // số đường đạn bắn ra cùng lúc
  spreadAngle: number;    // góc lệch giữa các đường đạn (radian), 0 = circle
  cost: number;           // giá mua bằng score
  description: string;
}

/* ── Constants ─────────────────────────────────────────────────────── */

export const ARENA_W = 960;
export const ARENA_H = 640;
export const PLAYER_SIZE = 22;
export const PLAYER_SPEED = 3.2;
export const BULLET_SPEED = 7;
export const BULLET_SIZE = 4;
export const ENEMY_SIZE = 20;
export const ENEMY_SPEED = 1.3;
export const ENEMIES_PER_WAVE = 6;
export const SHOOT_COOLDOWN = 180;

export const ENEMY_TYPES: Record<EnemyType, EnemyTypeConfig> = {
  soldier: {
    type: "soldier",
    speed: 1.3,
    size: 20,
    hp: 1,
    shootCooldown: 2500,
    bulletSpeed: 3,
    scoreValue: 50,
  },
  fortified: {
    type: "fortified",
    speed: 0.3,
    size: 20,
    hp: 2,
    shootCooldown: 1800,
    bulletSpeed: 3.5,
    scoreValue: 80,
  },
  tank: {
    type: "tank",
    speed: 0.5,
    size: 36,
    hp: 5,
    shootCooldown: 3000,
    bulletSpeed: 4,
    scoreValue: 150,
  },
};

export const ENEMY_SHOOT_RANGE = 300;
export const FORTIFIED_ANCHOR_RANGE = 60;
export const ENEMY_BULLET_SIZE = 3;
export const TANK_BULLET_SIZE = 6;

export interface WaveComposition {
  soldiers: number;
  fortified: number;
  tanks: number;
}

export function getWaveComposition(levelIndex: number, waveNum: number): WaveComposition {
  if (levelIndex === 0) {
    // Level 1: Chiến dịch HCM — lính địch tử thủ, có xe tăng
    return {
      soldiers: 3 + waveNum,
      fortified: 2 + Math.floor(waveNum / 2),
      tanks: waveNum >= 2 ? 1 + Math.floor(waveNum / 3) : 0,
    };
  }
  // Default cho các level khác (backwards compatible)
  return {
    soldiers: ENEMIES_PER_WAVE + waveNum * 2,
    fortified: 0,
    tanks: 0,
  };
}

export const WEAPONS: WeaponType[] = [
  {
    id: "single",
    name: "SÚNG TRƯỜNG",
    emoji: "🔫",
    bulletCount: 1,
    spreadAngle: 0,
    cost: 0,
    description: "Bắn 1 viên đạn",
  },
  {
    id: "double",
    name: "SÚNG ĐÔI",
    emoji: "🔫🔫",
    bulletCount: 2,
    spreadAngle: 0.15,
    cost: 300,
    description: "Bắn 2 viên đạn",
  },
  {
    id: "triple",
    name: "LIÊN THANH",
    emoji: "💥",
    bulletCount: 3,
    spreadAngle: 0.2,
    cost: 600,
    description: "Bắn 3 viên đạn hình quạt",
  },
  {
    id: "circle",
    name: "VÒNG TRÒN",
    emoji: "💫",
    bulletCount: 8,
    spreadAngle: 0, // 0 = full circle (2*PI / bulletCount)
    cost: 1000,
    description: "Bắn 8 viên đạn vòng tròn",
  },
];

/* ── Level data ────────────────────────────────────────────────────── */

export const GAME_LEVELS: LevelData[] = [
  /* ──────── LEVEL 1: CHIẾN DỊCH HCM — Xe tăng húc Dinh Độc Lập ──────── */
  {
    name: "GIẢI PHÓNG SÀI GÒN",
    emoji: "🚩",
    bg: "#2a3a2a",
    groundColor: "#3a5a3a",
    enemyColor: "#8B7355",
    map: {
      terrain: "urban",
      weather: "clear",
      obstacles: [
        // Dinh Độc Lập (tòa nhà chính phía trên)
        { x: 280, y: 20, w: 240, h: 80, type: "palace" },
        // Cổng Dinh (2 trụ cổng)
        { x: 300, y: 110, w: 20, h: 30, type: "gate" },
        { x: 480, y: 110, w: 20, h: 30, type: "gate" },
        // Hàng rào 2 bên
        { x: 120, y: 100, w: 60, h: 15, type: "wall" },
        { x: 600, y: 100, w: 60, h: 15, type: "wall" },
        // Công sự phòng thủ — nơi lính tử thủ
        { x: 150, y: 200, w: 50, h: 20, type: "sandbag" },
        { x: 600, y: 200, w: 50, h: 20, type: "sandbag" },
        { x: 350, y: 280, w: 60, h: 40, type: "bunker" },
        { x: 700, y: 350, w: 50, h: 20, type: "sandbag" },
        { x: 80, y: 320, w: 50, h: 40, type: "bunker" },
        // Hố bom trên đường tiến công
        { x: 200, y: 400, w: 50, h: 50, type: "crater" },
        { x: 500, y: 450, w: 40, h: 20, type: "sandbag" },
        { x: 100, y: 500, w: 60, h: 20, type: "sandbag" },
      ],
      decorations: [
        // Xe tăng 843 tiến về cổng Dinh
        { x: 400, y: 220, type: "tank_active" },
        // Cờ giải phóng
        { x: 395, y: 15, type: "flag" },
        // Khói lửa chiến trận
        { x: 150, y: 250, type: "smoke" },
        { x: 550, y: 300, type: "fire" },
        { x: 350, y: 480, type: "debris" },
        { x: 650, y: 200, type: "smoke" },
      ],
    },
    questions: [
      {
        question: "Chiến dịch Hồ Chí Minh bắt đầu ngày nào?",
        options: ["26/4/1975", "30/4/1975", "21/4/1975", "1/5/1975"],
        correctIndex: 0,
        explanation:
          "Chiến dịch Hồ Chí Minh bắt đầu ngày 26/4/1975, kết thúc thắng lợi vào 30/4/1975.",
        era: "1975",
      },
      {
        question: "Ai là Tổng tư lệnh Chiến dịch Hồ Chí Minh?",
        options: [
          "Võ Nguyên Giáp",
          "Văn Tiến Dũng",
          "Lê Đức Thọ",
          "Trần Văn Trà",
        ],
        correctIndex: 1,
        explanation:
          "Đại tướng Văn Tiến Dũng là Tư lệnh Chiến dịch Hồ Chí Minh.",
        era: "1975",
      },
      {
        question: "Xe tăng nào húc đổ cổng Dinh Độc Lập?",
        options: ["Xe 390", "Xe 843", "Xe 354", "Xe 279"],
        correctIndex: 1,
        explanation:
          "Xe tăng 843 do Bùi Quang Thận lái húc đổ cổng Dinh Độc Lập trưa 30/4/1975.",
        era: "1975",
      },
      {
        question: "Chiến dịch Tây Nguyên bắt đầu đánh vào đâu?",
        options: ["Pleiku", "Buôn Ma Thuột", "Kon Tum", "Đà Lạt"],
        correctIndex: 1,
        explanation:
          "Chiến dịch Tây Nguyên mở màn bằng trận đánh Buôn Ma Thuột ngày 10/3/1975.",
        era: "1975",
      },
      {
        question: "Tổng thống cuối cùng của Việt Nam Cộng hòa là ai?",
        options: [
          "Nguyễn Văn Thiệu",
          "Trần Văn Hương",
          "Dương Văn Minh",
          "Nguyễn Cao Kỳ",
        ],
        correctIndex: 2,
        explanation:
          "Dương Văn Minh tuyên bố đầu hàng vô điều kiện trưa 30/4/1975.",
        era: "1975",
      },
    ],
  },
  /* ──────── LEVEL 2: THỐNG NHẤT ──────── */
  {
    name: "THỐNG NHẤT",
    emoji: "🏛️",
    bg: "#2d5016",
    groundColor: "#3a6b1e",
    enemyColor: "#cc2222",
    map: {
      terrain: "jungle",
      weather: "clear",
      obstacles: [
        { x: 120, y: 80, w: 60, h: 20, type: "sandbag" },
        { x: 500, y: 120, w: 50, h: 50, type: "crater" },
        { x: 300, y: 400, w: 80, h: 16, type: "trench" },
        { x: 600, y: 350, w: 40, h: 20, type: "sandbag" },
        { x: 80, y: 300, w: 50, h: 50, type: "crater" },
      ],
      decorations: [
        { x: 150, y: 200, type: "tree_stump" },
        { x: 550, y: 450, type: "debris" },
        { x: 400, y: 50, type: "shell_casing" },
        { x: 650, y: 200, type: "tree_stump" },
      ],
    },
    questions: [
      {
        question: "Ngày 30/4/1975 đánh dấu sự kiện gì?",
        options: [
          "Thành lập Đảng",
          "Thống nhất đất nước",
          "Đại hội VI",
          "Khoán 100",
        ],
        correctIndex: 1,
        explanation:
          "Chiến dịch Hồ Chí Minh toàn thắng, giải phóng miền Nam, thống nhất đất nước.",
        era: "1975",
      },
      {
        question: "Hội nghị Hiệp thương Bắc-Nam diễn ra tại đâu?",
        options: ["Hà Nội", "Huế", "Sài Gòn", "Đà Nẵng"],
        correctIndex: 2,
        explanation:
          "Hội nghị Hiệp thương tổ chức tại Sài Gòn từ 15-21/11/1975.",
        era: "1975",
      },
      {
        question: "Tổng tuyển cử bầu Quốc hội chung diễn ra ngày nào?",
        options: ["30/4/1975", "2/9/1975", "25/4/1976", "7/1/1979"],
        correctIndex: 2,
        explanation:
          "Ngày 25/04/1976, toàn dân đi bầu Quốc hội chung cho nước Việt Nam thống nhất.",
        era: "1976",
      },
      {
        question: "Nước ta đổi tên thành gì sau thống nhất?",
        options: [
          "Việt Nam Dân chủ Cộng hòa",
          "Cộng hòa XHCN Việt Nam",
          "Việt Nam Cộng hòa",
          "Liên bang Việt Nam",
        ],
        correctIndex: 1,
        explanation:
          "Quốc hội khóa VI quyết định đổi tên thành nước CHXHCN Việt Nam.",
        era: "1976",
      },
      {
        question: "Đại hội IV đề ra nhiệm vụ trung tâm gì?",
        options: [
          "Phát triển công nghệ",
          "Xây dựng CNXH & Bảo vệ Tổ quốc",
          "Mở rộng ngoại giao",
          "Cải cách giáo dục",
        ],
        correctIndex: 1,
        explanation:
          "Đại hội IV: 'Đảng lãnh đạo cả nước xây dựng CNXH và bảo vệ Tổ quốc'.",
        era: "1976",
      },
    ],
  },
  /* ──────── LEVEL 3: BIÊN GIỚI ──────── */
  {
    name: "BIÊN GIỚI",
    emoji: "⚔️",
    bg: "#2a3a1a",
    groundColor: "#4A5D23",
    enemyColor: "#dd7722",
    map: {
      terrain: "mountain",
      weather: "fog",
      obstacles: [
        { x: 80, y: 60, w: 70, h: 30, type: "sandbag" },
        { x: 350, y: 150, w: 80, h: 16, type: "trench" },
        { x: 550, y: 250, w: 60, h: 60, type: "crater" },
        { x: 200, y: 380, w: 50, h: 40, type: "bunker" },
        { x: 600, y: 450, w: 70, h: 30, type: "sandbag" },
        { x: 100, y: 200, w: 40, h: 40, type: "crater" },
      ],
      decorations: [
        { x: 300, y: 80, type: "flag" },
        { x: 450, y: 400, type: "smoke" },
        { x: 150, y: 480, type: "shell_casing" },
        { x: 500, y: 100, type: "debris" },
      ],
    },
    questions: [
      {
        question: "Chiến tranh biên giới phía Bắc bắt đầu ngày nào?",
        options: ["30/4/1975", "17/2/1979", "7/1/1979", "5/3/1979"],
        correctIndex: 1,
        explanation:
          "Ngày 17/02/1979, hơn 60 vạn quân tấn công biên giới phía Bắc.",
        era: "1979",
      },
      {
        question:
          "Tập đoàn nào ở Campuchia gây ra chiến tranh Tây Nam?",
        options: [
          "Lon Nol",
          "Pol Pot - Ieng Sary",
          "Norodom Sihanouk",
          "Hun Sen",
        ],
        correctIndex: 1,
        explanation:
          "Tập đoàn Pol Pot - Ieng Sary gây chiến tranh biên giới Tây Nam.",
        era: "1978",
      },
      {
        question: "Thủ đô Phnom Penh được giải phóng ngày nào?",
        options: ["23/12/1978", "7/1/1979", "17/2/1979", "30/4/1979"],
        correctIndex: 1,
        explanation:
          "Ngày 07/01/1979, Quân tình nguyện VN tiến vào giải phóng Phnom Penh.",
        era: "1979",
      },
      {
        question: "Mặt trận Vị Xuyên còn có tên gọi nào?",
        options: [
          "Cối xay thịt",
          "Lò vôi thế kỷ",
          "Cánh đồng chết",
          "Đồi máu",
        ],
        correctIndex: 1,
        explanation:
          "Mặt trận Vị Xuyên mệnh danh là 'lò vôi thế kỷ' vì sự khốc liệt.",
        era: "1984-89",
      },
      {
        question: "Quân tình nguyện VN tại Campuchia được gọi là gì?",
        options: [
          "Đội quân thép",
          "Đội quân nhà Phật",
          "Đội quân giải phóng",
          "Đội quân anh hùng",
        ],
        correctIndex: 1,
        explanation:
          "Quân tình nguyện VN được gọi là 'Đội quân nhà Phật', cứu dân Campuchia.",
        era: "1979-89",
      },
    ],
  },
  /* ──────── LEVEL 4: KINH TẾ & ĐỔI MỚI ──────── */
  {
    name: "KINH TẾ & ĐỔI MỚI",
    emoji: "📜",
    bg: "#1a3a5c",
    groundColor: "#1a5276",
    enemyColor: "#8833aa",
    map: {
      terrain: "urban",
      weather: "clear",
      obstacles: [
        { x: 100, y: 100, w: 80, h: 60, type: "wall" },
        { x: 500, y: 80, w: 60, h: 40, type: "wall" },
        { x: 300, y: 300, w: 50, h: 50, type: "bunker" },
        { x: 150, y: 420, w: 40, h: 30, type: "barrel" },
        { x: 580, y: 400, w: 80, h: 60, type: "wall" },
      ],
      decorations: [
        { x: 250, y: 150, type: "debris" },
        { x: 450, y: 350, type: "debris" },
        { x: 620, y: 100, type: "smoke" },
      ],
    },
    questions: [
      {
        question: "Đại hội V coi ngành nào là 'mặt trận hàng đầu'?",
        options: ["Công nghiệp nặng", "Giáo dục", "Nông nghiệp", "Quốc phòng"],
        correctIndex: 2,
        explanation:
          "Đại hội V quyết định coi nông nghiệp là mặt trận hàng đầu.",
        era: "1982",
      },
      {
        question: "Lạm phát cao nhất 1985-86 lên tới bao nhiêu?",
        options: ["200%", "500%", "Trên 700%", "50%"],
        correctIndex: 2,
        explanation:
          "Lạm phát phi mã lên tới hơn 700% trong giai đoạn 1985-1986.",
        era: "1986",
      },
      {
        question: "Cơ chế nào gây khủng hoảng kinh tế trước Đổi Mới?",
        options: [
          "Kinh tế thị trường",
          "Tập trung quan liêu bao cấp",
          "Kinh tế hỗn hợp",
          "Kinh tế tư nhân",
        ],
        correctIndex: 1,
        explanation:
          "Cơ chế tập trung quan liêu bao cấp triệt tiêu mọi động lực phát triển.",
        era: "1982-86",
      },
      {
        question: "Khoán 100 ban hành năm nào?",
        options: ["1979", "1981", "1983", "1986"],
        correctIndex: 1,
        explanation:
          "Chỉ thị 100 về khoán sản phẩm trong nông nghiệp ban hành năm 1981.",
        era: "1981",
      },
      {
        question: "Đại hội VI (12/1986) được gọi là gì?",
        options: [
          "Đại hội Thống nhất",
          "Đại hội Đổi mới",
          "Đại hội Cải cách",
          "Đại hội Mở cửa",
        ],
        correctIndex: 1,
        explanation:
          "Đại hội VI mở ra thời kỳ Đổi mới toàn diện đất nước.",
        era: "1986",
      },
    ],
  },
  /* ──────── LEVEL 5: ĐIỆN BIÊN PHỦ ──────── */
  {
    name: "ĐIỆN BIÊN PHỦ",
    emoji: "🏔️",
    bg: "#3d2b1f",
    groundColor: "#5c4033",
    enemyColor: "#2266aa",
    map: {
      terrain: "highland",
      weather: "fog",
      obstacles: [
        { x: 100, y: 80, w: 80, h: 16, type: "trench" },
        { x: 300, y: 60, w: 60, h: 40, type: "bunker" },
        { x: 550, y: 120, w: 70, h: 16, type: "trench" },
        { x: 150, y: 250, w: 80, h: 30, type: "sandbag" },
        { x: 400, y: 300, w: 60, h: 60, type: "crater" },
        { x: 600, y: 350, w: 50, h: 40, type: "bunker" },
        { x: 250, y: 450, w: 60, h: 16, type: "trench" },
        { x: 500, y: 480, w: 50, h: 20, type: "sandbag" },
        { x: 80, y: 400, w: 60, h: 60, type: "crater" },
      ],
      decorations: [
        { x: 200, y: 150, type: "flag" },
        { x: 450, y: 200, type: "smoke" },
        { x: 350, y: 400, type: "fire" },
        { x: 600, y: 50, type: "debris" },
        { x: 100, y: 500, type: "shell_casing" },
      ],
    },
    questions: [
      {
        question: "Chiến dịch Điện Biên Phủ diễn ra năm nào?",
        options: ["1952", "1953", "1954", "1955"],
        correctIndex: 2,
        explanation:
          "Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954.",
        era: "1954",
      },
      {
        question: "Ai là Tổng chỉ huy chiến dịch Điện Biên Phủ?",
        options: [
          "Hồ Chí Minh",
          "Võ Nguyên Giáp",
          "Phạm Văn Đồng",
          "Trường Chinh",
        ],
        correctIndex: 1,
        explanation:
          "Đại tướng Võ Nguyên Giáp trực tiếp chỉ huy chiến dịch Điện Biên Phủ.",
        era: "1954",
      },
      {
        question: "Phương châm tác chiến cuối cùng của ta ở ĐBP là gì?",
        options: [
          "Đánh nhanh thắng nhanh",
          "Đánh chắc tiến chắc",
          "Chiến tranh du kích",
          "Phòng ngự tích cực",
        ],
        correctIndex: 1,
        explanation:
          "Tướng Giáp thay đổi phương châm từ 'đánh nhanh thắng nhanh' sang 'đánh chắc tiến chắc'.",
        era: "1954",
      },
      {
        question: "Tướng Pháp chỉ huy ở Điện Biên Phủ là ai?",
        options: [
          "De Castries",
          "Navarre",
          "De Lattre",
          "Cogny",
        ],
        correctIndex: 0,
        explanation:
          "Tướng De Castries chỉ huy tập đoàn cứ điểm Điện Biên Phủ và đã bị bắt sống.",
        era: "1954",
      },
      {
        question: "Anh hùng nào lấy thân mình lấp lỗ châu mai?",
        options: [
          "Tô Vĩnh Diện",
          "Phan Đình Giót",
          "Bế Văn Đàn",
          "La Văn Cầu",
        ],
        correctIndex: 1,
        explanation:
          "Phan Đình Giót anh dũng lấy thân mình lấp lỗ châu mai tại đồi Him Lam.",
        era: "1954",
      },
    ],
  },
  /* ──────── LEVEL 6: ĐƯỜNG TRƯỜNG SƠN ──────── */
  {
    name: "ĐƯỜNG TRƯỜNG SƠN",
    emoji: "🌿",
    bg: "#0d2b0d",
    groundColor: "#1a4d1a",
    enemyColor: "#cc6600",
    map: {
      terrain: "jungle",
      weather: "rain",
      obstacles: [
        { x: 100, y: 50, w: 50, h: 50, type: "crater" },
        { x: 350, y: 100, w: 40, h: 20, type: "sandbag" },
        { x: 550, y: 200, w: 60, h: 60, type: "crater" },
        { x: 200, y: 300, w: 70, h: 50, type: "tank" },
        { x: 450, y: 400, w: 60, h: 20, type: "sandbag" },
        { x: 80, y: 450, w: 50, h: 50, type: "crater" },
        { x: 620, y: 100, w: 40, h: 30, type: "barrel" },
        { x: 300, y: 200, w: 100, h: 16, type: "trench" },
      ],
      decorations: [
        { x: 180, y: 120, type: "tree_stump" },
        { x: 400, y: 50, type: "tree_stump" },
        { x: 600, y: 350, type: "fire" },
        { x: 100, y: 350, type: "smoke" },
        { x: 500, y: 500, type: "shell_casing" },
        { x: 300, y: 480, type: "tree_stump" },
      ],
    },
    questions: [
      {
        question: "Đường Trường Sơn bắt đầu mở từ năm nào?",
        options: ["1954", "1959", "1965", "1968"],
        correctIndex: 1,
        explanation:
          "Đường Trường Sơn (đường Hồ Chí Minh) bắt đầu mở từ ngày 19/5/1959.",
        era: "1959",
      },
      {
        question: "Đơn vị nào được giao nhiệm vụ mở đường Trường Sơn?",
        options: [
          "Đoàn 559",
          "Đoàn 338",
          "Đoàn 125",
          "Đoàn 772",
        ],
        correctIndex: 0,
        explanation:
          "Đoàn 559 (Binh đoàn Trường Sơn) được thành lập ngày 19/5/1959 để mở đường.",
        era: "1959",
      },
      {
        question: "Tổng chiều dài đường Trường Sơn khoảng bao nhiêu km?",
        options: ["5.000 km", "10.000 km", "20.000 km", "1.000 km"],
        correctIndex: 2,
        explanation:
          "Hệ thống đường Trường Sơn có tổng chiều dài khoảng 20.000 km đường bộ.",
        era: "1959-75",
      },
      {
        question: "Đường Trường Sơn còn gọi là gì?",
        options: [
          "Đường Quốc lộ 1",
          "Đường Hồ Chí Minh",
          "Đường Cách mạng",
          "Đường Thống nhất",
        ],
        correctIndex: 1,
        explanation:
          "Đường Trường Sơn được gọi là đường Hồ Chí Minh – con đường huyền thoại.",
        era: "1959-75",
      },
      {
        question: "Nữ anh hùng nào nổi tiếng trên đường Trường Sơn?",
        options: [
          "Võ Thị Sáu",
          "Nguyễn Thị Minh Khai",
          "Tám thanh niên xung phong Ngã ba Đồng Lộc",
          "Nguyễn Thị Định",
        ],
        correctIndex: 2,
        explanation:
          "10 cô gái ở Ngã ba Đồng Lộc hy sinh anh dũng để bảo vệ huyết mạch Trường Sơn.",
        era: "1968",
      },
    ],
  },
  /* ──────── LEVEL 7: TẾT MẬU THÂN ──────── */
  {
    name: "TẾT MẬU THÂN",
    emoji: "💥",
    bg: "#1a1a2e",
    groundColor: "#2a2a4e",
    enemyColor: "#33aa55",
    map: {
      terrain: "urban",
      weather: "night",
      obstacles: [
        { x: 80, y: 50, w: 100, h: 70, type: "wall" },
        { x: 500, y: 60, w: 80, h: 50, type: "wall" },
        { x: 300, y: 180, w: 50, h: 50, type: "bunker" },
        { x: 120, y: 320, w: 60, h: 30, type: "barrel" },
        { x: 550, y: 300, w: 70, h: 16, type: "wire" },
        { x: 350, y: 420, w: 80, h: 60, type: "wall" },
        { x: 200, y: 450, w: 50, h: 50, type: "crater" },
        { x: 620, y: 430, w: 40, h: 30, type: "barrel" },
      ],
      decorations: [
        { x: 250, y: 80, type: "fire" },
        { x: 450, y: 250, type: "fire" },
        { x: 150, y: 250, type: "smoke" },
        { x: 600, y: 180, type: "smoke" },
        { x: 400, y: 500, type: "debris" },
        { x: 100, y: 500, type: "shell_casing" },
      ],
    },
    questions: [
      {
        question: "Tổng tiến công Tết Mậu Thân diễn ra năm nào?",
        options: ["1966", "1967", "1968", "1969"],
        correctIndex: 2,
        explanation:
          "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân diễn ra đêm 30 rạng 31/1/1968.",
        era: "1968",
      },
      {
        question: "Biệt động Sài Gòn đánh vào đâu trong Tết Mậu Thân?",
        options: [
          "Dinh Độc Lập",
          "Tòa Đại sứ Mỹ",
          "Sân bay Tân Sơn Nhất",
          "Tất cả các đáp án trên",
        ],
        correctIndex: 3,
        explanation:
          "Biệt động Sài Gòn tấn công đồng loạt Dinh Độc Lập, Tòa Đại sứ Mỹ, sân bay và nhiều mục tiêu.",
        era: "1968",
      },
      {
        question: "Cuộc chiến đấu khốc liệt nhất Mậu Thân ở miền Trung diễn ra tại đâu?",
        options: ["Đà Nẵng", "Huế", "Quảng Trị", "Quy Nhơn"],
        correctIndex: 1,
        explanation:
          "Trận Huế kéo dài 26 ngày đêm là trận chiến ác liệt nhất trong Tết Mậu Thân.",
        era: "1968",
      },
      {
        question: "Sự kiện Mậu Thân tác động gì đến nước Mỹ?",
        options: [
          "Mỹ tăng quân",
          "Phong trào phản chiến bùng nổ",
          "Mỹ ném bom nhiều hơn",
          "Không ảnh hưởng gì",
        ],
        correctIndex: 1,
        explanation:
          "Tết Mậu Thân gây chấn động nước Mỹ, phong trào phản chiến bùng nổ mạnh mẽ.",
        era: "1968",
      },
      {
        question: "Sau Mậu Thân, tổng thống Mỹ nào tuyên bố không tái tranh cử?",
        options: [
          "Nixon",
          "Johnson",
          "Kennedy",
          "Eisenhower",
        ],
        correctIndex: 1,
        explanation:
          "Tổng thống Johnson tuyên bố không tái tranh cử ngày 31/3/1968 do áp lực từ chiến tranh.",
        era: "1968",
      },
    ],
  },
];

export type GameScreen =
  | "title"
  | "tutorial"
  | "level-intro"
  | "combat"
  | "quiz"
  | "upgrade"
  | "shop"
  | "level-complete"
  | "game-over"
  | "victory";

export interface Upgrade {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: "common" | "rare" | "epic";
  maxStack: number;
}

export const UPGRADES: Upgrade[] = [
  { id: "extra_bullet", name: "THÊM ĐẠN", emoji: "🔹", description: "+1 đường đạn bắn ra", rarity: "rare", maxStack: 4 },
  { id: "fire_rate", name: "TỐC ĐỘ BẮN", emoji: "⚡", description: "Bắn nhanh hơn 20%", rarity: "common", maxStack: 5 },
  { id: "bullet_speed", name: "ĐẠN NHANH", emoji: "💨", description: "Đạn bay nhanh hơn 25%", rarity: "common", maxStack: 3 },
  { id: "hp_up", name: "TĂNG HP", emoji: "❤️", description: "+1 HP (hiện tại)", rarity: "common", maxStack: 99 },
  { id: "ammo_up", name: "THÊM ĐẠN DƯỢC", emoji: "📦", description: "+15 viên đạn", rarity: "common", maxStack: 99 },
  { id: "spread_shot", name: "ĐẠN QUẠT", emoji: "🔱", description: "Mở rộng góc bắn", rarity: "rare", maxStack: 3 },
  { id: "circle_shot", name: "ĐẠN VÒNG TRÒN", emoji: "💫", description: "Bắn đạn vòng tròn 360°", rarity: "epic", maxStack: 1 },
  { id: "damage_up", name: "SÁT THƯƠNG", emoji: "🗡️", description: "+50 điểm mỗi lần hạ địch", rarity: "rare", maxStack: 5 },
  { id: "speed_up", name: "TỐC ĐỘ DI CHUYỂN", emoji: "🏃", description: "Di chuyển nhanh hơn 15%", rarity: "common", maxStack: 3 },
];
