"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Shield,
  Flag,
  Zap,
  BookOpen,
  CheckCircle,
  Circle,
  Swords,
  Vote,
  Landmark,
  Wheat,
  TrendingUp,
  Scale,
  Award,
  Target,
  ArrowRight,
  Sparkles,
  Trophy,
  RotateCcw,
  X,
  Calendar,
  MapPin,
  Info,
  Link as LinkIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════ */
/*  DATA                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

interface Milestone {
  year: string;
  label: string;
  icon: React.ReactNode;
  accent: string;
  headline: string;
  body: string;
  highlight?: string;
  image: string;
  imageCaption: string;
  detailContent: string[];
  detailBullets: string[];
  sourceLink?: string;
}

const PHASE_1: Milestone[] = [
  {
    year: "1975",
    label: "30/4",
    icon: <Flag size={28} />,
    accent: "#DA251D",
    headline: "Thống Nhất Đất Nước",
    body: "Chiến dịch Hồ Chí Minh toàn thắng, giải phóng miền Nam, chính thức khép lại 21 năm kháng chiến chống Mỹ đầy gian khổ và hy sinh.",
    highlight: "Sức mạnh tổng hợp",
    image: "/images/thong_nhat_1975.png",
    imageCaption: "Niềm hân hoan của nhân dân trong ngày đất nước hoàn toàn giải phóng, non sông thu về một mối.",
    detailContent: [
      "Sau đại thắng mùa Xuân năm 1975, nền hòa bình và độc lập của Việt Nam cuối cùng đã được thiết lập. Thắng lợi vĩ đại này là kết tinh của máu, nước mắt và tinh thần kiên cường của toàn dân tộc suốt hơn 2 thập kỷ.",
      "Về mặt chính trị, sự thống nhất và độc lập đã tạo ra một 'Sức mạnh tổng hợp' vô cùng to lớn từ lòng dân. Sự đoàn kết toàn dân tộc được củng cố vững chắc hơn bao giờ hết, là bệ phóng tinh thần cho công cuộc tái thiết đất nước.",
      "Tuy nhiên, niềm vui độc lập đan xen với những thử thách khổng lồ. Đất nước bước vào thời kỳ quá độ lên chủ nghĩa xã hội từ một nền sản xuất nhỏ, nông nghiệp lạc hậu. Hậu quả chiến tranh để lại tàn dư nặng nề, cơ sở hạ tầng bị tàn phá, ruộng đồng đầy rẫy bom mìn, hàng triệu người mang thương tật, đòi hỏi một nguồn lực khổng lồ để khắc phục.",
      "Về mặt quốc tế, bối cảnh phức tạp cũng đặt ra nhiều chông gai. Sự rạn nứt bên trong phe xã hội chủ nghĩa phần nào bộc lộ những khó khăn về mô hình phát triển. Cùng lúc đó, các thế lực thù địch tiếp tục âm mưu bao vây, cấm vận và phá hoại sự phát triển của Việt Nam non trẻ."
    ],
    detailBullets: [
      "Toàn thắng ngày 30/4/1975 mang lại hòa bình, độc lập và tự do.",
      "Chính trị: Tạo ra 'Sức mạnh tổng hợp' từ lòng dân và đoàn kết toàn dân tộc.",
      "Kinh tế: Quá độ từ nền sản xuất nhỏ, trình độ kinh tế - xã hội rất thấp.",
      "Xã hội: Hậu quả chiến tranh bom đạn nặng nề, đòi hỏi nguồn lực khổng lồ tái thiết.",
      "Quốc tế: Phe XHCN rạn nứt, các thế lực thù địch bao vây cấm vận."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/",
  },
  {
    year: "1975",
    label: "Tháng 8",
    icon: <Star size={28} />,
    accent: "#c0392b",
    headline: "Hội nghị TW 24",
    body: "Ban Chấp hành Trung ương Đảng khóa III họp Hội nghị lần thứ 24, đề ra đường lối chiến lược hoàn thành thống nhất nước nhà.",
    highlight: "Quyết sách cực kỳ cấp bách",
    image: "/images/hoi_nghi_tw24.png",
    imageCaption: "Hội nghị Trung ương 24 khóa III đã đưa ra quyết sách then chốt về việc thống nhất đất nước.",
    detailContent: [
      "Tháng 8/1975, Ban Chấp hành Trung ương Đảng khóa III tiến hành Hội nghị lần thứ 24. Hội nghị nhận định rằng, sau khi giải phóng, nước ta vẫn tồn tại hai chính quyền: Chính phủ Việt Nam Dân chủ Cộng hòa (miền Bắc) và Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam (miền Nam).",
      "Hội nghị chủ trương: Hoàn thành thống nhất nước nhà và đưa cả nước tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội. Đây không chỉ là nhu cầu chính trị mà là quy luật khách quan của cách mạng.",
      "Theo đó, miền Bắc tiếp tục xây dựng, phát triển CNXH và hoàn thiện quan hệ sản xuất XHCN. Đồng thời, miền Nam vừa tiến hành cải tạo, vừa xây dựng chủ nghĩa xã hội.",
      "Thống nhất đất nước về mặt Nhà nước càng sớm sẽ càng phát huy sức mạnh mới của dân tộc, đồng thời ngăn ngừa và phá tan triệt để các âm mưu chia rẽ của các thế lực phản động trong và ngoài nước."
    ],
    detailBullets: [
      "Hội nghị TW 24 khóa III họp tháng 8/1975.",
      "Chủ trương định hướng: Hoàn thành thống nhất nước nhà về mặt nhà nước.",
      "Miền Bắc: Tiếp tục xây dựng CNXH, hoàn thiện quan hệ sản xuất.",
      "Miền Nam: Tiến hành cải tạo và xây dựng CNXH đồng thời.",
      "Ý nghĩa: Phát huy sức mạnh, phá tan âm mưu chia rẽ của thế lực thù địch."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/van-kien-dang-toan-tap/tap-36-1975-6019",
  },
  {
    year: "1975",
    label: "Tháng 11",
    icon: <Landmark size={28} />,
    accent: "#e74c3c",
    headline: "Hội nghị Hiệp thương Bắc – Nam",
    body: "Hai đoàn đại biểu từ miền Bắc và miền Nam tiến hành hội nghị lịch sử tại Sài Gòn, thống nhất quan điểm tổ chức Tổng tuyển cử chung.",
    highlight: "Đồng lòng thống nhất",
    image: "/images/hoi_nghi_hiep_thuong.png",
    imageCaption: "Quang cảnh trang nghiêm của Hội nghị Hiệp thương chính trị tổ chức tại Sài Gòn.",
    detailContent: [
      "Quá trình chuẩn bị cho sự hợp nhất về mặt Nhà nước diễn ra hết sức khẩn trương và dân chủ. Ngày 27/10/1975, Ủy ban Thường vụ Quốc hội Việt Nam Dân chủ Cộng hòa đã cử đoàn đại biểu 25 thành viên do Chủ tịch Trường Chinh làm Trưởng đoàn.",
      "Chỉ ít ngày sau, ngày 05-06/11/1975, Ủy ban Trung ương Mặt trận Dân tộc giải phóng miền Nam Việt Nam cũng cử đoàn 25 đại biểu do đồng chí Phạm Hùng lãnh đạo.",
      "Từ ngày 15 đến 21/11/1975, Hội nghị Hiệp thương chính trị giữa hai đoàn đại biểu Bắc - Nam đã diễn ra tại Sài Gòn. Hội nghị thảo luận sôi nổi và đạt được sự nhất trí tuyệt đối.",
      "Hội nghị khẳng định sự cần thiết tất yếu của việc thống nhất về mặt Nhà nước thông qua một cuộc Tổng tuyển cử chung trong cả nước. Nguyên tắc bầu cử được thống nhất là: dân chủ, phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín."
    ],
    detailBullets: [
      "Đoàn miền Bắc (27/10) do đồng chí Trường Chinh làm Trưởng đoàn.",
      "Đoàn miền Nam (05-06/11) do đồng chí Phạm Hùng làm Trưởng đoàn.",
      "Hội nghị Hiệp thương diễn ra tại Sài Gòn từ 15 đến 21/11/1975.",
      "Khẳng định sự cần thiết phải thống nhất đất nước về mặt nhà nước.",
      "Chốt phương thức qua Tổng tuyển cử: Phổ thông, bình đẳng, trực tiếp, bỏ phiếu kín."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/su-kien-va-nhan-chung/hoi-nghi-hiep-thuong-chinh-tri-thong-nhat-dat-nuoc-3687",
  },
  {
    year: "1976",
    label: "25/4",
    icon: <Vote size={28} />,
    accent: "#DA251D",
    headline: "Tổng Tuyển Cử Lịch Sử",
    body: "Lần đầu tiên sau nhiều thập kỷ chia cắt, toàn thể nhân dân hai miền Nam - Bắc cùng nô nức cầm lá phiếu bầu ra Quốc hội chung của nước Việt Nam.",
    highlight: "Ngày hội non sông",
    image: "/images/tong_tuyen_cu_1976.png",
    imageCaption: "Cử tri trên khắp mọi miền tổ quốc tin tưởng bỏ lá phiếu bầu ra Quốc hội chung.",
    detailContent: [
      "Vào ngày 25/04/1976, sự kiện trọng đại được mong chờ nhất đã diễn ra: Cuộc Tổng tuyển cử bầu Quốc hội chung cho cả nước. Đây là một ngày hội lớn của non sông, khi hàng chục triệu cử tri từ Ải Nam Quan đến Mũi Cà Mau được thực hiện quyền làm chủ thực sự.",
      "Cuộc bầu cử tuân thủ nghiêm ngặt các nguyên tắc dân chủ đã được Hội nghị Hiệp thương đề ra trước đó. Ý chí mạnh mẽ của nhân dân không chỉ được thể hiện qua tỷ lệ đi bầu kỷ lục mà còn qua niềm hy vọng cháy bỏng về một tương lai thịnh vượng.",
      "Sự thành công của cuộc Tổng tuyển cử đã tạo nền tảng pháp lý tối cao cho việc hoàn thiện bộ máy chính quyền Nhà nước thống nhất, chấm dứt hoàn toàn về mặt pháp lý trạng thái tồn tại hai chính quyền."
    ],
    detailBullets: [
      "Tiến hành ngày 25/04/1976 trên phạm vi toàn quốc.",
      "Cuộc Tổng tuyển cử bầu ra Quốc hội nước Việt Nam thống nhất.",
      "Thực hiện theo nguyên tắc dân chủ, phổ thông, trực tiếp, bỏ phiếu kín.",
      "Đánh dấu ngày hội lớn của toàn dân, thể hiện ý chí làm chủ.",
      "Tạo cơ sở pháp lý vững chắc cho việc kiện toàn bộ máy Nhà nước."
    ],
    sourceLink: "https://quochoi.vn/gioithieu/Pages/qua-trinh-phat-trien.aspx?ItemID=18",
  },
  {
    year: "1976",
    label: "Đại hội IV",
    icon: <Award size={28} />,
    accent: "#c0392b",
    headline: "Xây dựng CNXH & Bảo vệ Tổ quốc",
    body: "Đại hội IV của Đảng chính thức vạch ra đường lối tiến lên chủ nghĩa xã hội trên phạm vi cả nước sau khi hoàn thành thống nhất Nhà nước.",
    highlight: "Giai đoạn bản lề",
    image: "/images/bo_chinh_tri.png",
    imageCaption: "Các nhà lãnh đạo Đảng và Nhà nước bàn thảo đường lối kiến thiết đất nước tại Đại hội IV.",
    detailContent: [
      "Tiếp nối thành công của việc kiện toàn bộ máy Nhà nước thống nhất, Đại hội đại biểu toàn quốc lần thứ IV của Đảng được triệu tập. Đây là Đại hội có ý nghĩa lịch sử vô cùng to lớn đối với tương lai dân tộc.",
      "Đại hội IV có sứ mệnh vừa tổng kết những kinh nghiệm quý báu của cuộc kháng chiến vĩ đại vừa qua, vừa phác thảo cương lĩnh, đường lối cho cách mạng Việt Nam trong giai đoạn hoàn toàn mới.",
      "Nhiệm vụ trung tâm xuyên suốt là 'Đảng lãnh đạo cả nước xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc'. Đại hội đã đề ra đường lối chung, nhấn mạnh việc thực hiện đồng thời 3 cuộc cách mạng (quan hệ sản xuất, khoa học kỹ thuật, tư tưởng văn hóa).",
      "Tuy nhiên, do bối cảnh khó khăn chồng chất, vừa phải tái thiết sau chiến tranh, vừa phải chống lại sự cấm vận và chiến tranh biên giới, quá trình thực hiện Nghị quyết Đại hội gặp muôn vàn thách thức."
    ],
    detailBullets: [
      "Đại hội IV định hình con đường tiến lên CNXH trên phạm vi cả nước.",
      "Nhiệm vụ kép: Xây dựng CNXH gắn liền với Bảo vệ Tổ quốc.",
      "Tổng kết kinh nghiệm kháng chiến và đề ra chiến lược mới.",
      "Đẩy mạnh 3 cuộc cách mạng: Quan hệ sản xuất, KH-KT, tư tưởng văn hóa.",
      "Luôn phải đối mặt với khó khăn chồng chất từ cấm vận và hậu quả chiến tranh."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/ban-chap-hanh-trung-uong-dang/dai-hoi-dang/lan-thu-iv",
  }
];

const PHASE_2: Milestone[] = [
  {
    year: "1982",
    label: "Tháng 3",
    icon: <Landmark size={28} />,
    accent: "#1a5276",
    headline: "Đại hội V",
    body: "Đại hội V của Đảng tiếp tục khẳng định đường lối chung, đồng thời đánh giá khách quan về những khó khăn trong chặng đường đầu tiên của thời kỳ quá độ.",
    highlight: "Nhìn nhận thực tế",
    image: "/images/san_xuat_kinh_te.png",
    imageCaption: "Hoạt động sản xuất kinh tế thời kỳ đầu được đẩy mạnh để giải quyết khó khăn đời sống.",
    detailContent: [
      "Đại hội đại biểu toàn quốc lần thứ V của Đảng Cộng sản Việt Nam họp từ ngày 27-31/03/1982 tại Hà Nội. Đại hội diễn ra trong bối cảnh nền kinh tế - xã hội đang gặp rất nhiều khó khăn và mất cân đối nghiêm trọng.",
      "Đại hội V tiếp tục khẳng định hai nhiệm vụ chiến lược: Xây dựng thành công chủ nghĩa xã hội và sẵn sàng chiến đấu, bảo vệ vững chắc Tổ quốc Việt Nam XHCN. Hai nhiệm vụ này có quan hệ mật thiết và hỗ trợ lẫn nhau.",
      "Đại hội đã chỉ ra rằng nước ta đang ở chặng đường đầu tiên của thời kỳ quá độ. Trong chặng đường này, nền kinh tế còn rất yếu kém, nông nghiệp và công nghiệp nhẹ chưa đáp ứng đủ nhu cầu thiết yếu.",
      "Một quyết định quan trọng của Đại hội V là coi nông nghiệp là mặt trận hàng đầu, tập trung sức giải quyết vấn đề lương thực, thực phẩm và hàng tiêu dùng. Đây là bước điều chỉnh chiến lược quan trọng so với trước đây."
    ],
    detailBullets: [
      "Đại hội V họp từ 27-31/03/1982, đối diện với muôn vàn khó khăn kinh tế.",
      "Tiếp tục thực hiện 2 nhiệm vụ chiến lược: Xây dựng CNXH và Bảo vệ Tổ quốc.",
      "Khẳng định nước ta đang ở chặng đường đầu tiên của thời kỳ quá độ.",
      "Điều chỉnh chiến lược: Coi nông nghiệp là mặt trận hàng đầu.",
      "Tập trung giải quyết vấn đề lương thực, thực phẩm và hàng tiêu dùng."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/ban-chap-hanh-trung-uong-dang/dai-hoi-dang/lan-thu-v",
  },
  {
    year: "1982-1986",
    label: "Thực Hiện",
    icon: <TrendingUp size={28} />,
    accent: "#2c3e50",
    headline: "Quá trình thực hiện Nghị quyết",
    body: "Quá trình thực hiện Nghị quyết Đại hội V gặp vô vàn trở ngại do cơ chế bao cấp rập khuôn, lạm phát phi mã và đời sống nhân dân cực kỳ khó khăn.",
    highlight: "Khủng hoảng & bế tắc",
    image: "/images/chien_dau_bien_gioi.png",
    imageCaption: "Bên cạnh khó khăn kinh tế, quân và dân ta vẫn kiên cường bảo vệ biên cương.",
    detailContent: [
      "Quá trình đưa Nghị quyết Đại hội V vào cuộc sống là một cuộc vật lộn cam go. Giai đoạn 1982-1986, đất nước rơi vào khủng hoảng kinh tế - xã hội trầm trọng nhất kể từ sau khi thống nhất.",
      "Lạm phát phi mã (lên đến con số hơn 700% vào năm 1986), sản xuất đình đốn, phân phối lưu thông ách tắc. Chế độ tem phiếu bao cấp bộc lộ sự cứng nhắc, triệt tiêu động lực và kìm hãm sức sản xuất.",
      "Hàng hóa thiết yếu cực kỳ khan hiếm, đời sống của người lao động, cán bộ công nhân viên và các lực lượng vũ trang vô cùng khó khăn. Áp lực từ thực tế sinh động đòi hỏi Đảng phải dũng cảm nhìn thẳng vào sự thật, đánh giá đúng sự thật.",
      "Sự bế tắc này đã tạo ra sức ép khổng lồ từ thực tiễn cơ sở, buộc bộ máy lãnh đạo phải thai nghén những tư duy mới, nung nấu những bước đột phá nhằm cứu vãn nền kinh tế."
    ],
    detailBullets: [
      "Khủng hoảng kinh tế - xã hội trầm trọng nhất kể từ sau 1975.",
      "Lạm phát phi mã, sản xuất đình đốn, phân phối bế tắc.",
      "Cơ chế tập trung quan liêu bao cấp triệt tiêu mọi động lực phát triển.",
      "Đời sống nhân dân và lực lượng vũ trang vô cùng cực khổ.",
      "Sức ép từ thực tiễn cơ sở buộc phải đổi mới cách làm."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/",
  },
  {
    year: "1986",
    label: "Đột phá",
    icon: <Scale size={28} />,
    accent: "#1a5276",
    headline: "Các bước đột phá kinh tế",
    body: "Những bước đột phá trong tư duy kinh tế của Đảng dần hình thành, thừa nhận sản xuất hàng hóa, xóa bỏ bao cấp và mở đường cho công cuộc Đổi Mới toàn diện.",
    highlight: "Thai nghén Đổi Mới",
    image: "/images/bo_chinh_tri.png",
    imageCaption: "Hội nghị Bộ Chính trị đánh dấu sự lột xác trong tư duy kinh tế, chuẩn bị cho Đại hội VI.",
    detailContent: [
      "Để thoát khỏi khủng hoảng, từ nỗ lực xé rào ở cơ sở đến những quyết định ở trung ương, các bước đột phá tiếp tục đổi mới kinh tế (1982-1986) đã được định hình.",
      "Bắt đầu từ những thay đổi như 'Khoán 100' trong nông nghiệp, hay 'kế hoạch 3 phần' trong công nghiệp (1981), cho đến sự ra đời của Nghị quyết Hội nghị TW 8 (khóa V) vào tháng 6/1985 về Giá - Lương - Tiền.",
      "Đỉnh cao của sự đột phá tư duy trước thềm Đại hội VI là Kết luận của Bộ Chính trị (tháng 8/1986). Bản Kết luận lịch sử này đã thẳng thắn thừa nhận nền kinh tế nước ta đang tồn tại cấu trúc hàng hóa nhiều thành phần.",
      "Chủ trương cốt lõi là dứt khoát xóa bỏ cơ chế quản lý kinh tế tập trung quan liêu, bao cấp, chuyển hẳn sang hạch toán kinh doanh xã hội chủ nghĩa. Đây là bước lột xác về tư duy lý luận, dọn đường trực tiếp cho Đường lối Đổi mới toàn diện tại Đại hội VI (12/1986)."
    ],
    detailBullets: [
      "Sự vận động đổi mới đi từ thực tiễn cơ sở (xé rào) lên Trung ương.",
      "Nghị quyết TW 8 (6/1985) bước đầu giải quyết khâu Giá - Lương - Tiền.",
      "Kết luận của Bộ Chính trị (8/1986) là bước đột phá tư duy quyết định.",
      "Thừa nhận nền kinh tế hàng hóa nhiều thành phần.",
      "Chủ trương dứt khoát xóa bỏ bao cấp, chuyển sang hạch toán kinh doanh."
    ],
    sourceLink: "https://tulieuvankien.dangcongsan.vn/ban-chap-hanh-trung-uong-dang/dai-hoi-dang/lan-thu-vi",
  }
];

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizData: QuizItem[] = [
  { question: "Sau ngày 30/4/1975, nền hòa bình độc lập đã tạo ra điều gì cho cách mạng Việt Nam?", options: ["Sức mạnh quân sự", "'Sức mạnh tổng hợp' từ lòng dân", "Nền kinh tế công nghiệp", "Sự hỗ trợ của quốc tế"], correctIndex: 1, explanation: "Sự thống nhất đẽ tạo ra một 'Sức mạnh tổng hợp' vô cùng to lớn từ lòng dân." },
  { question: "Hội nghị nào chốt chủ trương 'Hoàn thành thống nhất nước nhà về mặt Nhà nước'?", options: ["Hội nghị TW 24 (8/1975)", "Hội nghị TW 6 (8/1979)", "Đại hội IV (12/1976)", "Đại hội V (3/1982)"], correctIndex: 0, explanation: "Hội nghị TW 24 (8/1975) đã đưa ra quyết sách then chốt về mặt thống nhất Nhà nước." },
  { question: "Hội nghị Hiệp thương chính trị Bắc - Nam (11/1975) diễn ra tại đâu?", options: ["Hà Nội", "Huế", "Sài Gòn", "Đà Nẵng"], correctIndex: 2, explanation: "Ngày 15 đến 21/11/1975, Hội nghị Hiệp thương chính trị hai đoàn Bắc-Nam họp tại Sài Gòn." },
  { question: "Tổng tuyển cử bầu Quốc hội chung cho nước Việt Nam thống nhất diễn ra vào ngày nào?", options: ["30/4/1975", "15/11/1975", "25/4/1976", "18/12/1986"], correctIndex: 2, explanation: "Ngày 25/04/1976 cuộc Tổng tuyển cử bầu Quốc hội chung đã diễn ra trên cả nước." },
  { question: "Nhiệm vụ trung tâm xuyên suốt được nêu tại Đại hội IV của Đảng là gì?", options: ["Chống giặc ngoại xâm", "Xây dựng CNXH và bảo vệ Tổ quốc", "Cải tạo nông nghiệp", "Mở rộng quan hệ quốc tế"], correctIndex: 1, explanation: "Nhiệm vụ xuyên suốt là 'Đảng lãnh đạo cả nước xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc'." },
  { question: "Đại hội V (3/1982) xác định đâu là 'mặt trận hàng đầu'?", options: ["Giáo dục đào tạo", "Công nghiệp nặng", "Nông nghiệp", "Quốc phòng an ninh"], correctIndex: 2, explanation: "Đại hội V quyết định coi nông nghiệp là mặt trận hàng đầu để giải quyết lương thực, thực phẩm." },
  { question: "Trong giai đoạn 1982-1986, nền kinh tế nước ta đối mặt với khó khăn gì lớn nhất?", options: ["Khủng hoảng kinh tế, lạm phát phi mã", "Động đất", "Bùng nổ dân số", "Thiếu lao động"], correctIndex: 0, explanation: "1982-1986 là thời kỳ khủng hoảng kinh tế - xã hội trầm trọng nhất, lạm phát phi mã lên tới hơn 700%." },
  { question: "Nghị quyết Hội nghị TW 8 (khóa V) tháng 6/1985 bàn về vấn đề cốt lõi nào?", options: ["Khoán 100", "Khoán 10", "Giá - Lương - Tiền", "Kế hoạch 3 phần"], correctIndex: 2, explanation: "Nghị quyết TW 8 (khóa V) tập trung vào khâu đột phá Giá - Lương - Tiền." },
  { question: "Kết luận của Bộ Chính trị (8/1986) thừa nhận thực tế gì về kinh tế?", options: ["Kinh tế tự cung tự cấp", "Nền kinh tế hàng hóa nhiều thành phần", "Kinh tế thị trường định hướng XHCN", "Kinh tế tư bản chủ nghĩa"], correctIndex: 1, explanation: "Kết luận thẳng thắn thừa nhận nền kinh tế nước ta đan xen cấu trúc hàng hóa nhiều thành phần." },
  { question: "Chủ trương dứt khoát xóa bỏ cơ chế quản lý kinh tế tập trung quan liêu, bao cấp đọn đường cho sự kiện nào?", options: ["Hội nghị Hiệp thương", "Tổng Tuyển cử 1976", "Đại hội VI (12/1986)", "Thống nhất đất nước"], correctIndex: 2, explanation: "Việc xóa mỏ cơ chế bao cấp là bước ngoặt quyết định mở đường cho Đại hội VI Đổi mới toàn diện." },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  COMPONENTS                                                        */
/* ═══════════════════════════════════════════════════════════════════ */

/** Animated number counter */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/** Detail popup modal for milestone */
function MilestoneDetailModal({ m, isOpen, onClose }: { m: Milestone | null; isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && m && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 lg:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FAF3EB] w-full max-w-full lg:max-w-6xl rounded-t-lg lg:rounded-lg border-4 border-[#2C2A29] shadow-[12px_12px_0px_0px_rgba(44,42,41,1)] overflow-hidden pointer-events-auto flex flex-col max-h-[95vh]"
            >
              {/* Drag handle (mobile) */}
              <div className="lg:hidden flex justify-center pt-3 pb-2 bg-[#E3D6C1] border-b-4 border-[#2C2A29]">
                <div className="w-12 h-1.5 rounded-full bg-[#2C2A29]/20" />
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 px-5 sm:px-6 pt-4 sm:pt-6 pb-5 border-b-4 border-[#2C2A29] bg-[#E3D6C1]">
                <div
                  className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white border-4 border-[#2C2A29] shadow-[4px_4px_0px_0px_rgba(44,42,41,1)]"
                  style={{ background: m.accent }}
                >
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-[#2C2A29] text-white text-[10px] sm:text-xs uppercase tracking-widest font-sans font-bold">{m.year}</span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-[.2em] font-bold" style={{ color: m.accent }}>• {m.label}</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-wider leading-tight pr-8">{m.headline}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 -mr-2 -mt-2 rounded-sm border-4 border-transparent hover:border-[#2C2A29] hover:bg-white/50 hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] hover:-translate-y-1 transition-all text-[#2C2A29]"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Scrollable content (Split layout on desktop) */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto overscroll-contain bg-[#FAF3EB]">
                {/* LEFT SIDE: Image */}
                <div className="w-full lg:w-[45%] flex-shrink-0 border-b-4 lg:border-b-0 lg:border-r-4 border-[#2C2A29] bg-[#D1C2A5]/30 flex flex-col relative h-[300px] sm:h-[400px] lg:h-auto">
                  <div className="flex-1 relative m-4 sm:m-6 border-4 border-[#2C2A29] bg-[#2C2A29] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)]">
                    <Image
                      src={m.image}
                      alt={m.headline}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                  <div className="bg-[#2C2A29] p-4 lg:p-6 border-t-4 border-[#2C2A29] mt-auto">
                    <p className="text-[11px] sm:text-[13px] font-serif-body text-[#FAF3EB] italic leading-relaxed">{m.imageCaption}</p>
                    
                    {m.sourceLink && (
                      <div className="mt-4 pt-4 border-t border-[#FAF3EB]/20 flex justify-end">
                        <a 
                          href={m.sourceLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#F4D03F] hover:text-white uppercase tracking-wider hover:underline"
                        >
                          {/* <LinkIcon size={14} /> Xem tài liệu đối chiếu */}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE: Text Content */}
                <div className="w-full lg:w-[55%] p-5 sm:p-8 lg:p-10 space-y-8 flex flex-col relative h-max lg:h-full lg:overflow-y-auto">
                  {/* Highlight badge */}
                  {m.highlight && (
                    <div>
                      <span
                        className="inline-block px-4 py-1.5 border-4 border-[#2C2A29] text-xs font-sans font-black uppercase tracking-[.2em] text-[#2C2A29] shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] bg-white"
                      >
                        {m.highlight}
                      </span>
                    </div>
                  )}

                  {/* Detail paragraphs */}
                  <div className="space-y-5 prose prose-stone max-w-none">
                    {m.detailContent.map((p, i) => (
                      <p key={i} className="text-[15px] sm:text-[17px] font-serif-body text-[#2C2A29] leading-[1.9] text-justify font-medium">{p}</p>
                    ))}
                  </div>

                  {/* Key facts */}
                  <div className="bg-white border-4 border-[#2C2A29] p-6 lg:p-8 shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] mt-auto">
                    <h4 className="text-sm font-sans font-black uppercase tracking-[.2em] text-[#2C2A29] mb-5 border-b-4 border-[#2C2A29] pb-3 flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-[#2C2A29] text-[#F4D03F]"><Info size={20} /></span>
                      Trích yếu cốt lõi
                    </h4>
                    <ul className="space-y-4">
                      {m.detailBullets.map((b, i) => (
                        <li key={i} className="flex gap-4 items-start group">
                          <span
                            className="flex-shrink-0 w-3 h-3 mt-1.5 border-2 border-[#2C2A29] transition-colors group-hover:bg-[#2C2A29]"
                            style={{ background: m.accent }}
                          />
                          <span className="text-[14px] sm:text-[15px] font-serif-body text-[#2C2A29] font-bold leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer close button (mobile friendly) */}
              <div className="px-5 sm:px-6 py-4 border-t-4 border-[#2C2A29] bg-[#E3D6C1] lg:hidden">
                <button
                  onClick={onClose}
                  className="w-full py-4 border-4 border-[#2C2A29] shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(44,42,41,1)] font-sans font-black transition-all text-white uppercase tracking-widest text-sm"
                  style={{ background: m.accent }}
                >
                   Đóng tài liệu
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Single milestone card — alternating layout, clickable */
function MilestoneCard({ m, index, onClick }: { m: Milestone; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      {/* connector line */}
      {index > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-[2px] h-10 bg-gradient-to-b from-transparent to-black/10" />
      )}

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-center`}>
        {/* Date block */}
        <div className="flex-shrink-0 w-full md:w-[200px] text-center md:text-right">
          <div className="inline-block">
            <p className="text-[11px] uppercase tracking-[.3em] font-semibold text-black/40 mb-1">{m.year}</p>
            <p className="text-3xl md:text-4xl font-black leading-none" style={{ color: m.accent }}>{m.label}</p>
          </div>
        </div>

        {/* Icon */}
        <div
          className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}dd)` }}
        >
          {m.icon}
          <div className="absolute inset-0 rounded-2xl ring-4 ring-white/20" />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <button
            onClick={onClick}
            className="w-full text-left bg-[#FAF3EB] rounded-sm p-5 sm:p-6 border border-[#D1C2A5] shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] transition-all group cursor-pointer"
          >
            {m.highlight && (
              <span
                className="inline-block px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#FAF3EB] mb-3"
                style={{ background: m.accent }}
              >
                {m.highlight}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-serif-heading font-bold text-[#2C2A29] leading-snug mb-2">{m.headline}</h3>
            <p className="font-serif-body text-[#5C554E] text-sm md:text-[15px] leading-relaxed mb-3">{m.body}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold transition-colors group-hover:gap-2.5 uppercase tracking-wider" style={{ color: m.accent }}>
              Xem chi tiết <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/** Section divider with gradient */
function Divider({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  );
}

/** Quiz */
function InlineQuiz({ data }: { data: QuizItem[] }) {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = data[idx];
  const right = pick === q.correctIndex;

  function select(i: number) {
    if (pick !== null) return;
    setPick(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }
  function next() {
    if (idx + 1 >= data.length) setDone(true);
    else { setIdx((i) => i + 1); setPick(null); }
  }
  function restart() { setIdx(0); setPick(null); setScore(0); setDone(false); }

  if (done) {
    const pct = Math.round((score / data.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="relative inline-block mb-6">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="62" fill="none" stroke="#e5e5e5" strokeWidth="8" />
            <motion.circle
              cx="70" cy="70" r="62" fill="none"
              stroke={pct >= 70 ? "#27ae60" : "#DA251D"} strokeWidth="8"
              strokeLinecap="round" strokeDasharray={390}
              initial={{ strokeDashoffset: 390 }}
              animate={{ strokeDashoffset: 390 - (390 * pct) / 100 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black" style={{ color: pct >= 70 ? "#27ae60" : "#DA251D" }}>{pct}%</span>
            <span className="text-xs text-[#585858] font-medium">{score}/{data.length}</span>
          </div>
        </div>
        <p className="text-lg font-bold text-[#1C1C1C] mb-1">
          {pct >= 90 ? "Xuất sắc!" : pct >= 70 ? "Tốt lắm!" : pct >= 50 ? "Khá ổn!" : "Cố gắng thêm!"}
        </p>
        <p className="text-sm text-[#585858] mb-8">
          {pct >= 70 ? "Bạn nắm vững kiến thức rồi." : "Hãy đọc lại nội dung và thử lại nhé."}
        </p>
        <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-3 bg-[#DA251D] hover:bg-[#8B1923] text-white rounded-full font-semibold transition-colors">
          <RotateCcw size={16} /> Làm lại
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* progress */}
      <div className="flex items-center gap-2 mb-6">
        {data.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < idx ? "bg-[#DA251D]" : i === idx ? "bg-[#DA251D]/60" : "bg-black/10"}`} />
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-xs font-bold text-[#585858]">Câu {idx + 1} / {data.length}</span>
        <span className="text-xs font-bold text-[#DA251D]">{score} đúng</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
          <p className="text-lg md:text-xl font-serif-heading font-bold text-[#2C2A29] mb-5 leading-snug">{q.question}</p>
          <div className="grid gap-3">
            {q.options.map((opt, i) => {
              const isCorrectOpt = i === q.correctIndex;
              const isPicked = i === pick;
              let cls = "w-full text-left px-5 py-4 rounded-sm border-2 font-serif-body text-base font-bold transition-all flex items-center gap-4 cursor-pointer hover:-translate-y-1 shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]";
              if (pick === null) cls += " border-[#D1C2A5] bg-white hover:bg-[#FAF3EB] hover:border-[#DA251D] text-[#5C554E]";
              else if (isCorrectOpt) cls += " border-[#4A5D23] bg-[#eef5e6] text-[#4A5D23]";
              else if (isPicked) cls += " border-[#DA251D] bg-[#fdf0f0] text-[#DA251D]";
              else cls += " border-[#D1C2A5] bg-white text-[#999] opacity-70";
              return (
                <button key={i} onClick={() => select(i)} className={cls} disabled={pick !== null}>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold border-2 ${
                    pick === null ? "bg-[#FAF3EB] text-[#2C2A29] border-[#D1C2A5]" : isCorrectOpt ? "bg-[#4A5D23] text-white border-[#4A5D23]" : isPicked ? "bg-[#DA251D] text-white border-[#DA251D]" : "bg-[#f5f5f5] text-[#ccc] border-[#ddd]"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {pick !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <div className={`p-5 rounded-sm text-base leading-relaxed border-2 font-serif-body ${right ? "bg-[#eef5e6] border-[#4A5D23] text-[#4A5D23]" : "bg-[#fdf0f0] border-[#DA251D] text-[#DA251D]"}`}>
                  <p className="font-bold mb-2 font-serif-heading text-lg">{right ? "Chính xác!" : "Chưa đúng!"}</p>
                  <p>{q.explanation}</p>
                </div>
                <button onClick={next} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#DA251D] hover:bg-[#b01e18] text-white border-2 border-[#2C2A29] rounded-sm font-sans text-sm font-bold uppercase tracking-wider transition-colors shadow-[2px_2px_0px_0px_rgba(44,42,41,1)] active:translate-y-1 active:shadow-none">
                  {idx + 1 >= data.length ? "Xem kết quả" : "Tiếp theo"} <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Wrapper() {
  return <Suspense fallback={null}><Page /></Suspense>;
}

function Page() {
  const sp = useSearchParams();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    const t = sp.get("topic");
    if (t === "2") setTab(2);
    else if (t === "3") setTab(3);
    else setTab(1);
  }, [sp]);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">

      {/* Detail Modal */}
      <MilestoneDetailModal
        m={selectedMilestone}
        isOpen={selectedMilestone !== null}
        onClose={() => setSelectedMilestone(null)}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-[#F5E6D3] min-h-[500px]">
        {/* decorative bg */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#DA251D]/[.06] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1a5276]/[.05] rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center mt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[.4em] text-[#DA251D] font-bold mb-4 font-sans">Chương 3.1</p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-heading font-black text-[#2C2A29] leading-[1.1] mb-6 uppercase tracking-wider">
              Hành trình<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-[#4A5D23]">Kiến thiết</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#DA251D]/15 -z-0 rounded" />
              </span>
              {" & "}
              <span className="text-[#DA251D]">Bảo vệ Tổ quốc</span>
            </h1>

            <p className="font-serif-body text-[#5C554E] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Đất nước bước ra khỏi khói lửa chiến tranh, đón nhận hòa bình và thống nhất.
              Nhưng hành trình quá độ lên CNXH mở đầu với vô vàn thách thức.
            </p>
          </motion.div>

          {/* stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { n: 11, s: " năm", l: "1975 – 1986" },
              { n: 3, s: " đột phá", l: "Tư duy kinh tế" },
              { n: 23, s: " triệu", l: "Cử tri bầu cử" },
              { n: 774, s: "%", l: "Lạm phát đỉnh" },
            ].map((s, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl px-5 py-4 border border-black/5 min-w-[130px]">
                <p className="text-2xl font-black text-[#DA251D]"><Counter value={s.n} suffix={s.s} /></p>
                <p className="text-[11px] text-[#888] font-medium uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ NAV TABS ═══ */}
      <div className="sticky top-[72px] z-30 bg-white/70 backdrop-blur-xl border-y border-black/5">
        <div className="max-w-3xl mx-auto px-4 flex">
          {([
            { id: 1 as const, label: "1975 – 1981", sub: "Bước chuyển mình" },
            { id: 2 as const, label: "1982 – 1986", sub: "Vượt khủng hoảng" },
            { id: 3 as const, label: "Tổng kết", sub: "11 năm nhìn lại" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-center relative transition-colors ${tab === t.id ? "text-[#DA251D]" : "text-[#5C554E] hover:text-[#2C2A29]"}`}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold block font-sans">{t.label}</span>
              <span className="text-[11px] font-medium font-serif-heading italic">{t.sub}</span>
              {tab === t.id && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-[#DA251D] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <AnimatePresence mode="wait">
        {tab === 1 && (
          <motion.section key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            {/* section intro */}
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-[#FAF3EB] bg-[#DA251D] mb-4">Giai đoạn 1</span>
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-[#2C2A29] mb-3">Bước Chuyển Mình Đầu Tiên</h2>
              <p className="font-serif-body text-[#5C554E] max-w-lg mx-auto text-sm leading-relaxed">
                Thống nhất non sông, bảo vệ biên giới, và những "đốm lửa" đổi mới đầu tiên.
              </p>
            </div>
            <div className="space-y-12">
              {PHASE_1.map((m, i) => <MilestoneCard key={i} m={m} index={i} onClick={() => setSelectedMilestone(m)} />)}
            </div>
          </motion.section>
        )}

        {tab === 2 && (
          <motion.section key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-[#FAF3EB] bg-[#1a5276] mb-4">Giai đoạn 2</span>
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-[#2C2A29] mb-3">Tìm Đường Vượt Khủng Hoảng</h2>
              <p className="font-serif-body text-[#5C554E] max-w-lg mx-auto text-sm leading-relaxed">
                Từ khủng hoảng kinh tế – xã hội đến ba bước đột phá thai nghén Đổi Mới.
              </p>
            </div>
            <div className="space-y-12">
              {PHASE_2.map((m, i) => <MilestoneCard key={i} m={m} index={i} onClick={() => setSelectedMilestone(m)} />)}
            </div>
          </motion.section>
        )}

        {tab === 3 && (
          <motion.section key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-[#FAF3EB] bg-[#7d3c98] mb-4">Tổng kết</span>
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-[#2C2A29] mb-3">11 Năm Nhìn Lại</h2>
              <p className="font-serif-body text-[#5C554E] max-w-lg mx-auto text-sm leading-relaxed">
                Máu, mồ hôi và trí tuệ — giai đoạn "thai nghén" vĩ đại cho Đường lối Đổi mới toàn diện.
              </p>
            </div>

            {/* Key achievements */}
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              {[
                { 
                  icon: <Flag size={24} />, 
                  color: "#DA251D", 
                  title: "Thanh toán chia cắt, thống nhất non sông", 
                  desc: "Xác lập chủ quyền Nhà nước duy nhất trên toàn bộ lãnh thổ. Hoàn thành về mặt pháp lý việc hợp nhất bộ máy chính quyền, quốc kỳ, quốc ca và hệ thống chính trị từ Trung ương đến địa phương." 
                },
                { 
                  icon: <Shield size={24} />, 
                  color: "#1a5276", 
                  title: "Bảo vệ vững chắc chủ quyền lãnh thổ", 
                  desc: "Vừa tái thiết sau chiến tranh chống Mỹ, vừa phải tiến hành hai cuộc chiến đấu chính nghĩa bảo vệ biên giới Tây Nam và phía Bắc, đập tan âm mưu bao vây, cô lập và phá hoại của các thế lực thù địch." 
                },
                { 
                  icon: <Sparkles size={24} />, 
                  color: "#e67e22", 
                  title: "Ba bước đột phá tư duy kinh tế", 
                  desc: "Từng bước chuyển dịch từ cơ chế quản lý mệnh lệnh hành chính sang hạch toán kinh doanh. Các 'thử nghiệm' như Khoán 100 hay Nghị quyết TW 8 đã dọn đường cho quy luật giá trị phát huy tác dụng." 
                },
                { 
                  icon: <Star size={24} />, 
                  color: "#7d3c98", 
                  title: "Tiền đề trực tiếp cho Đại hội VI", 
                  desc: "Thời kỳ 1975 - 1986 là giai đoạn 'thai nghén' lý luận và thực tiễn khốc liệt nhất. Đây là bước đệm lịch sử không thể thiếu để Đảng đi đến quyết định Đổi mới toàn diện đất nước vào tháng 12/1986." 
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Lessons */}
            <div className="bg-gradient-to-br from-[#7d3c98]/10 via-white/60 to-[#DA251D]/5 rounded-3xl p-8 border border-black/5 mb-8">
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-[#7d3c98]" /> Bài học lịch sử
              </h3>
              <div className="space-y-4">
                {[
                  "Phải luôn xuất phát từ thực tiễn khách quan, tôn trọng và vận dụng đúng quy luật kinh tế — tuyệt đối tránh nóng vội, chủ quan duy ý chí hoặc áp đặt các mô hình rập khuôn.",
                  "Đổi mới là đòi hỏi sống còn và tất yếu — cơ chế tập trung quan liêu bao cấp nếu kéo dài sẽ dẫn đến sự đình trệ và tiêu vong động lực phát triển của xã hội.",
                  "Kết hợp chặt chẽ giữa phát triển kinh tế và củng cố quốc phòng an ninh — bảo vệ Tổ quốc là tiền đề để xây dựng đất nước và ngược lại.",
                  "Đổi mới là một quá trình liên tục, có bước đi và lộ trình phù hợp — cần sự dũng cảm nhìn thẳng vào sự thật để tự phê bình và sửa chữa sai lầm tư duy.",
                ].map((lesson, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#7d3c98] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#333] leading-relaxed">{lesson}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative bg-[#DA251D] text-white rounded-3xl p-8 md:p-10 text-center"
            >
              <div className="absolute top-4 left-6 text-6xl leading-none text-white/20 font-serif">&ldquo;</div>
              <p className="text-lg md:text-xl font-semibold leading-relaxed max-w-lg mx-auto relative z-10">
                Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.
              </p>
              <p className="text-sm text-white/60 mt-4 font-medium">— Phương châm Đại hội VI, tháng 12/1986</p>
            </motion.blockquote>
          </motion.section>
        )}
      </AnimatePresence>

      <Divider color="#DA251D" />

      {/* ═══ QUIZ ═══ */}
      <section id="quiz-on-tap" className="scroll-mt-28 max-w-2xl mx-auto px-4 pb-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DA251D] to-[#e74c3c] text-[#F5E6D3] shadow-lg mb-4">
            <Trophy size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif-heading font-black text-[#2C2A29] mb-2">Quiz Ôn Tập</h2>
          <p className="font-serif-body text-sm text-[#5C554E]">10 câu trắc nghiệm — Chương 3.1 (1975 – 1986)</p>
        </div>
        <div className="bg-[#FAF3EB] rounded-sm p-6 md:p-8 border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)]">
          <InlineQuiz data={quizData} />
        </div>
      </section>
    </div>
  );
}
