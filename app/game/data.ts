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
  type: "sandbag" | "crater" | "trench" | "tank" | "wall" | "bunker" | "barrel" | "wire" | "palace" | "gate" | "vehicle";
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
  spawnX?: number;
  spawnY?: number;
  maxRange?: number;
  isRocket?: boolean;
  aoeRadius?: number;
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
  scale?: number;
}

export interface AllyTank {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  lastShot: number;
  shootCooldown: number;
  bulletSpeed: number;
  active: boolean;
  width: number;
  height: number;
}

export interface WeaponType {
  id: string;
  name: string;
  emoji: string;
  bulletCount: number;    // số đường đạn bắn ra cùng lúc
  spreadAngle: number;    // góc lệch giữa các đường đạn (radian), 0 = circle
  cost: number;           // giá mua bằng score
  description: string;
  maxRange?: number;
  bulletSpeedMultiplier?: number;
  isRocket?: boolean;
  aoeRadius?: number;
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
export const WAVES_PER_LEVEL = 5;

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

export const ALLY_TANK_843 = {
  startX: 400,
  startY: 500,
  targetY: 130,
  speed: 0.12,
  shootCooldown: 2500,
  bulletSpeed: 5,
  width: 44,
  height: 28,
};

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
    id: "shotgun",
    name: "SHOTGUN",
    emoji: "🔫💨",
    bulletCount: 5,
    spreadAngle: 0.35,
    cost: 450,
    description: "Bắn 5 viên tầm ngắn",
    maxRange: 150,
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
    id: "rocket",
    name: "RPG",
    emoji: "🚀",
    bulletCount: 1,
    spreadAngle: 0,
    cost: 800,
    description: "Tên lửa chậm, nổ diện rộng",
    bulletSpeedMultiplier: 0.5,
    isRocket: true,
    aoeRadius: 60,
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
        // === DINH ĐỘC LẬP (tòa nhà chính phía trên) ===
        { x: 280, y: 20, w: 240, h: 80, type: "palace" },
        // Cổng Dinh (2 trụ cổng)
        { x: 300, y: 110, w: 20, h: 30, type: "gate" },
        { x: 480, y: 110, w: 20, h: 30, type: "gate" },
        // Hàng rào 2 bên
        { x: 120, y: 100, w: 60, h: 15, type: "wall" },
        { x: 600, y: 100, w: 60, h: 15, type: "wall" },

        // === TUYẾN PHÒNG THỦ 1 (gần Dinh, ~170y) ===
        { x: 150, y: 170, w: 50, h: 20, type: "sandbag" },
        { x: 600, y: 170, w: 50, h: 20, type: "sandbag" },
        { x: 370, y: 180, w: 60, h: 20, type: "sandbag" },

        // === TUYẾN PHÒNG THỦ 2 (giữa, ~280-320y) ===
        { x: 350, y: 280, w: 60, h: 40, type: "bunker" },
        { x: 80, y: 320, w: 50, h: 40, type: "bunker" },
        { x: 700, y: 300, w: 50, h: 20, type: "sandbag" },
        { x: 200, y: 290, w: 80, h: 16, type: "trench" },
        { x: 500, y: 290, w: 80, h: 16, type: "trench" },

        // === CHƯỚNG NGẠI VẬT ĐẠI LỘ (~360-420y) ===
        { x: 300, y: 380, w: 40, h: 20, type: "sandbag" },
        { x: 500, y: 400, w: 40, h: 20, type: "sandbag" },
        { x: 350, y: 360, w: 100, h: 12, type: "wire" },

        // === XE CHÁY ===
        { x: 180, y: 420, w: 55, h: 30, type: "vehicle" },
        { x: 550, y: 380, w: 55, h: 30, type: "vehicle" },

        // === HỐ BOM & CÔNG SỰ (~450-540y) ===
        { x: 200, y: 480, w: 50, h: 50, type: "crater" },
        { x: 650, y: 450, w: 40, h: 40, type: "crater" },
        { x: 100, y: 540, w: 60, h: 20, type: "sandbag" },
      ],
      decorations: [
        // Xe tăng 843 tiến về cổng Dinh (sẽ trở thành ally tank)
        { x: 400, y: 500, type: "tank_active" },
        // Cờ giải phóng
        { x: 395, y: 15, type: "flag" },
        // Khói lửa chiến trận
        { x: 150, y: 220, type: "smoke" },
        { x: 550, y: 350, type: "fire" },
        { x: 350, y: 450, type: "debris" },
        { x: 650, y: 170, type: "smoke" },
        { x: 250, y: 380, type: "fire" },
        { x: 450, y: 500, type: "debris" },
        { x: 100, y: 300, type: "shell_casing" },
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
      {
        question: "Chiến dịch HCM gồm bao nhiêu quân đoàn tham gia?",
        options: ["3 quân đoàn", "4 quân đoàn", "5 quân đoàn", "6 quân đoàn"],
        correctIndex: 2,
        explanation: "5 quân đoàn (1, 2, 3, 4 và đoàn 232) tham gia chiến dịch Hồ Chí Minh.",
        era: "1975",
      },
      {
        question: "Trận Xuân Lộc diễn ra trước chiến dịch HCM có ý nghĩa gì?",
        options: [
          "Mở đường vào Sài Gòn",
          "Phá vỡ 'cánh cửa thép' phòng thủ",
          "Đánh chiếm sân bay",
          "Giải phóng Biên Hòa",
        ],
        correctIndex: 1,
        explanation: "Trận Xuân Lộc (9-21/4/1975) phá vỡ tuyến phòng thủ 'cánh cửa thép' trước Sài Gòn.",
        era: "1975",
      },
      {
        question: "Ai là người cắm cờ trên nóc Dinh Độc Lập?",
        options: ["Bùi Quang Thận", "Nguyễn Văn Thiệu", "Phạm Xuân Thệ", "Trần Văn Trà"],
        correctIndex: 0,
        explanation: "Đại úy Bùi Quang Thận cắm lá cờ giải phóng trên nóc Dinh Độc Lập trưa 30/4/1975.",
        era: "1975",
      },
      {
        question: "Chiến dịch giải phóng Đà Nẵng diễn ra vào thời gian nào?",
        options: ["26-29/3/1975", "1-5/4/1975", "10-15/3/1975", "20-25/4/1975"],
        correctIndex: 0,
        explanation: "Đà Nẵng được giải phóng ngày 29/3/1975, chỉ sau 3 ngày chiến đấu.",
        era: "1975",
      },
      {
        question: "Trận đánh nào mở màn cho Tổng tiến công mùa Xuân 1975?",
        options: ["Trận Phước Long", "Trận Buôn Ma Thuột", "Trận Huế", "Trận Xuân Lộc"],
        correctIndex: 1,
        explanation: "Trận Buôn Ma Thuột (10/3/1975) mở màn cho cuộc Tổng tiến công mùa Xuân 1975.",
        era: "1975",
      },
      {
        question: "Hiệp định Paris về Việt Nam được ký năm nào?",
        options: ["1971", "1972", "1973", "1974"],
        correctIndex: 2,
        explanation: "Hiệp định Paris được ký ngày 27/1/1973, Mỹ phải rút quân khỏi Việt Nam.",
        era: "1973",
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
      {
        question: "Sài Gòn được đổi tên thành gì sau 1975?",
        options: ["Thành phố Hồ Chí Minh", "Thành phố Giải Phóng", "Thành phố Thống Nhất", "Thành phố Cách Mạng"],
        correctIndex: 0,
        explanation: "Sài Gòn được đổi tên thành Thành phố Hồ Chí Minh vào ngày 2/7/1976.",
        era: "1976",
      },
      {
        question: "Quốc hội thống nhất họp khóa đầu tiên vào tháng mấy năm 1976?",
        options: ["Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
        correctIndex: 2,
        explanation: "Quốc hội thống nhất họp phiên đầu tiên từ 24/6 đến 3/7/1976.",
        era: "1976",
      },
      {
        question: "Kế hoạch 5 năm đầu tiên sau thống nhất (1976-1980) tập trung vào gì?",
        options: ["Công nghiệp hóa", "Khôi phục kinh tế", "Mở cửa thị trường", "Phát triển du lịch"],
        correctIndex: 1,
        explanation: "Kế hoạch 5 năm 1976-1980 tập trung khôi phục và phát triển kinh tế sau chiến tranh.",
        era: "1976-80",
      },
      {
        question: "Việt Nam gia nhập Liên Hợp Quốc năm nào?",
        options: ["1975", "1976", "1977", "1978"],
        correctIndex: 2,
        explanation: "Việt Nam chính thức gia nhập Liên Hợp Quốc ngày 20/9/1977.",
        era: "1977",
      },
      {
        question: "Sau thống nhất, miền Nam thực hiện cải tạo gì về kinh tế?",
        options: [
          "Tư nhân hóa",
          "Cải tạo XHCN",
          "Kinh tế thị trường",
          "Mở cửa ngoại thương",
        ],
        correctIndex: 1,
        explanation: "Miền Nam thực hiện cải tạo XHCN: quốc hữu hóa, hợp tác xã hóa nông nghiệp.",
        era: "1976-80",
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
      {
        question: "Trận phòng thủ biên giới phía Bắc kéo dài đến năm nào?",
        options: ["1979", "1984", "1989", "1991"],
        correctIndex: 2,
        explanation: "Xung đột biên giới phía Bắc kéo dài từ 1979 đến 1989 mới hoàn toàn chấm dứt.",
        era: "1979-89",
      },
      {
        question: "Bao nhiêu tỉnh biên giới phía Bắc bị tấn công tháng 2/1979?",
        options: ["3 tỉnh", "4 tỉnh", "6 tỉnh", "8 tỉnh"],
        correctIndex: 2,
        explanation: "6 tỉnh biên giới phía Bắc bị tấn công: Quảng Ninh, Lạng Sơn, Cao Bằng, Hà Tuyên, Hoàng Liên Sơn, Lai Châu.",
        era: "1979",
      },
      {
        question: "Anh hùng Lê Đình Chinh hy sinh ở đâu?",
        options: ["Lạng Sơn", "Cao Bằng", "Biên giới Tây Nam", "Vị Xuyên"],
        correctIndex: 2,
        explanation: "Lê Đình Chinh hy sinh tại biên giới Tây Nam năm 1978 khi chống quân Pol Pot xâm lấn.",
        era: "1978",
      },
      {
        question: "Sau khi giải phóng Campuchia, VN giúp nước này điều gì?",
        options: [
          "Xây dựng quân đội",
          "Hồi sinh đất nước khỏi diệt chủng",
          "Khai thác tài nguyên",
          "Sáp nhập lãnh thổ",
        ],
        correctIndex: 1,
        explanation: "Việt Nam giúp Campuchia hồi sinh sau nạn diệt chủng khiến gần 2 triệu người chết.",
        era: "1979",
      },
      {
        question: "Quân VN rút khỏi Campuchia hoàn toàn vào năm nào?",
        options: ["1985", "1987", "1989", "1991"],
        correctIndex: 2,
        explanation: "Quân tình nguyện Việt Nam rút hoàn toàn khỏi Campuchia vào tháng 9/1989.",
        era: "1989",
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
      {
        question: "Luật Đầu tư nước ngoài đầu tiên được ban hành năm nào?",
        options: ["1986", "1987", "1988", "1990"],
        correctIndex: 1,
        explanation: "Luật Đầu tư nước ngoài tại Việt Nam được ban hành ngày 29/12/1987.",
        era: "1987",
      },
      {
        question: "Khoán 10 (Nghị quyết 10) ban hành năm nào?",
        options: ["1986", "1988", "1990", "1992"],
        correctIndex: 1,
        explanation: "Nghị quyết 10 (Khoán 10) ban hành năm 1988, giao đất cho hộ nông dân tự chủ sản xuất.",
        era: "1988",
      },
      {
        question: "Trước Đổi Mới, Việt Nam chủ yếu nhận viện trợ từ đâu?",
        options: ["Mỹ", "Liên Xô và các nước XHCN", "Trung Quốc", "Nhật Bản"],
        correctIndex: 1,
        explanation: "Trước 1986, Việt Nam phụ thuộc viện trợ từ Liên Xô và các nước XHCN.",
        era: "1976-86",
      },
      {
        question: "Đổi Mới chuyển nền kinh tế sang mô hình gì?",
        options: [
          "Kinh tế tư bản",
          "Kinh tế thị trường định hướng XHCN",
          "Kinh tế kế hoạch hóa",
          "Kinh tế tự cung tự cấp",
        ],
        correctIndex: 1,
        explanation: "Đổi Mới chuyển sang kinh tế thị trường định hướng XHCN, thừa nhận nhiều thành phần kinh tế.",
        era: "1986",
      },
      {
        question: "Tổng Bí thư nào khởi xướng đường lối Đổi Mới?",
        options: ["Lê Duẩn", "Trường Chinh", "Nguyễn Văn Linh", "Đỗ Mười"],
        correctIndex: 2,
        explanation: "Tổng Bí thư Nguyễn Văn Linh được coi là kiến trúc sư của công cuộc Đổi Mới (1986).",
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
      {
        question: "Chiến dịch Điện Biên Phủ chia thành mấy đợt tiến công?",
        options: ["2 đợt", "3 đợt", "4 đợt", "5 đợt"],
        correctIndex: 1,
        explanation: "Chiến dịch ĐBP chia 3 đợt: đợt 1 (13-17/3), đợt 2 (30/3-30/4), đợt 3 (1-7/5/1954).",
        era: "1954",
      },
      {
        question: "Tô Vĩnh Diện hy sinh khi làm nhiệm vụ gì?",
        options: ["Đánh bộc phá", "Kéo pháo", "Đào hào", "Trinh sát"],
        correctIndex: 1,
        explanation: "Tô Vĩnh Diện lấy thân chèn pháo khi kéo pháo vào trận địa Điện Biên Phủ.",
        era: "1954",
      },
      {
        question: "Cứ điểm đầu tiên bị tiêu diệt ở Điện Biên Phủ là gì?",
        options: ["Độc Lập", "Him Lam", "Bản Kéo", "Hồng Cúm"],
        correctIndex: 1,
        explanation: "Cứ điểm Him Lam bị tiêu diệt đêm 13/3/1954, mở màn chiến dịch.",
        era: "1954",
      },
      {
        question: "Chiến thắng ĐBP góp phần đưa đến hội nghị nào?",
        options: ["Hội nghị Paris", "Hội nghị Geneva", "Hội nghị Bandung", "Hội nghị Potsdam"],
        correctIndex: 1,
        explanation: "Chiến thắng ĐBP (7/5/1954) buộc Pháp ký Hiệp định Geneva (21/7/1954).",
        era: "1954",
      },
      {
        question: "Bao nhiêu dân công tham gia phục vụ chiến dịch ĐBP?",
        options: ["100.000", "200.000", "260.000", "350.000"],
        correctIndex: 2,
        explanation: "Khoảng 260.000 dân công tham gia vận chuyển lương thực, đạn dược phục vụ chiến dịch.",
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
      {
        question: "Mỹ dùng chiến dịch gì để phá hoại đường Trường Sơn?",
        options: ["Sấm Rền", "Linebacker", "Arc Light", "Rolling Thunder"],
        correctIndex: 0,
        explanation: "Chiến dịch Sấm Rền (Rolling Thunder) là chiến dịch ném bom quy mô lớn nhắm vào tuyến vận tải Trường Sơn.",
        era: "1965-68",
      },
      {
        question: "Đường Trường Sơn đi qua mấy nước?",
        options: ["1 nước", "2 nước", "3 nước", "4 nước"],
        correctIndex: 2,
        explanation: "Đường Trường Sơn đi qua 3 nước: Việt Nam, Lào, và Campuchia.",
        era: "1959-75",
      },
      {
        question: "Xăng dầu được vận chuyển vào Nam bằng gì trên Trường Sơn?",
        options: ["Xe bồn", "Đường ống xăng dầu", "Thùng phi", "Tàu biển"],
        correctIndex: 1,
        explanation: "Hệ thống đường ống xăng dầu dài hàng nghìn km được xây dựng dọc Trường Sơn.",
        era: "1968-75",
      },
      {
        question: "Thanh niên xung phong trên Trường Sơn chủ yếu làm gì?",
        options: ["Chiến đấu", "Mở đường và rà phá bom", "Nấu ăn", "Trồng trọt"],
        correctIndex: 1,
        explanation: "Thanh niên xung phong chịu trách nhiệm mở đường, rà phá bom mìn, đảm bảo giao thông thông suốt.",
        era: "1959-75",
      },
      {
        question: "Bao nhiêu tấn bom Mỹ đã thả xuống đường Trường Sơn?",
        options: ["1 triệu tấn", "3 triệu tấn", "4 triệu tấn", "Hơn 4 triệu tấn"],
        correctIndex: 3,
        explanation: "Mỹ đã thả hơn 4 triệu tấn bom xuống khu vực Trường Sơn nhưng không ngăn được dòng tiếp tế.",
        era: "1965-73",
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
      {
        question: "Bao nhiêu đô thị miền Nam bị tấn công trong Tết Mậu Thân?",
        options: ["10", "20", "36", "44"],
        correctIndex: 2,
        explanation: "36/44 tỉnh lỵ, 5/6 thành phố lớn và nhiều căn cứ quân sự Mỹ-ngụy bị tấn công đồng loạt.",
        era: "1968",
      },
      {
        question: "Biệt động Sài Gòn gồm bao nhiêu đội tham gia Mậu Thân?",
        options: ["5 đội", "11 đội", "15 đội", "20 đội"],
        correctIndex: 1,
        explanation: "11 đội biệt động Sài Gòn tấn công các mục tiêu quan trọng trong đêm Giao thừa Mậu Thân.",
        era: "1968",
      },
      {
        question: "Cuộc Tổng tiến công Mậu Thân diễn ra vào dịp gì?",
        options: ["Tết Nguyên Đán", "Quốc khánh 2/9", "Ngày thống nhất", "Sinh nhật Bác Hồ"],
        correctIndex: 0,
        explanation: "Cuộc tấn công bất ngờ diễn ra đêm giao thừa Tết Nguyên Đán Mậu Thân (30 rạng 31/1/1968).",
        era: "1968",
      },
      {
        question: "Chiến dịch Mậu Thân do ai trực tiếp chỉ đạo ở miền Nam?",
        options: ["Võ Nguyên Giáp", "Nguyễn Chí Thanh", "Trần Văn Trà", "Phạm Hùng"],
        correctIndex: 2,
        explanation: "Trung tướng Trần Văn Trà là Tư lệnh Quân giải phóng miền Nam, trực tiếp chỉ đạo chiến dịch.",
        era: "1968",
      },
      {
        question: "Sự kiện nào sau Mậu Thân dẫn đến đàm phán hòa bình?",
        options: [
          "Mỹ ném bom B-52",
          "Mỹ chấp nhận đàm phán Paris",
          "Mỹ tăng viện trợ",
          "Mỹ đổ thêm quân",
        ],
        correctIndex: 1,
        explanation: "Sau Mậu Thân, Mỹ chấp nhận ngồi vào bàn đàm phán Paris (5/1968), bước ngoặt ngoại giao.",
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
