'use client';

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  MeshWobbleMaterial, 
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Stage,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Rotate3d, Box, Ticket, Radio, Trophy, MousePointer2, Star } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════ */
/*  DATA                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

interface Artifact {
  id: number;
  name: string;
  year: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: [number, number, number];
}

const artifacts: Artifact[] = [
  {
    id: 0,
    name: "Xe tăng 390",
    year: "1975",
    description: "Chiếc xe tăng húc đổ cổng chính Dinh Độc Lập vào trưa ngày 30/4/1975, đánh dấu thời khắc non sông thu về một mối. Đây là biểu tượng của sức mạnh đại đoàn kết toàn dân tộc.",
    icon: <Box size={24} />,
    color: "#4A5D4E",
    position: [-4, 0, 0]
  },
  {
    id: 1,
    name: "Tem phiếu mua lương thực",
    year: "1976 - 1986",
    description: "Vật bất ly thân của người dân thời bao cấp, dùng để mua các nhu yếu phẩm cơ bản như gạo, thịt, vải. Nó phản ánh một giai đoạn lịch sử đầy khó khăn nhưng cũng rất kiên cường.",
    icon: <Ticket size={24} />,
    color: "#B45309",
    position: [-1.3, 0, 0]
  },
  {
    id: 2,
    name: "Đài Cassette cổ",
    year: "Thập niên 80",
    description: "Cửa sổ nhìn ra thế giới và nguồn thông tin chính yếu của các gia đình Việt Nam trong thời kỳ khó khăn. Đài cassette thường được coi là báu vật trong nhà.",
    icon: <Radio size={24} />,
    color: "#475569",
    position: [1.3, 0, 0]
  },
  {
    id: 3,
    name: "Huân chương Chiến công",
    year: "1979",
    description: "Biểu tượng cho lòng dũng cảm của các chiến sĩ trong cuộc chiến đấu bảo vệ biên giới phía Bắc và Tây Nam. Vinh danh những người đã ngã xuống vì độc lập dân tộc.",
    icon: <Trophy size={24} />,
    color: "#DA251D",
    position: [4, 0, 0]
  }
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  CUSTOM 3D MODELS                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function TankModel({ color }: { color: string }) {
  return (
    <group scale={0.4}>
      {/* --- CHASSIS & HULL --- */}
      {/* Lower Hull & Tracks (Simplified into one block) */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.5, 4.8]} />
        <meshStandardMaterial color="#222" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Track Highlight (White Stripe instead of individual rims) */}
      <mesh position={[-1.11, -0.2, 0]} castShadow>
        <boxGeometry args={[0.02, 0.1, 4.4]} />
        <meshStandardMaterial color="#E8D9C5" />
      </mesh>
      <mesh position={[1.11, -0.2, 0]} castShadow>
        <boxGeometry args={[0.02, 0.1, 4.4]} />
        <meshStandardMaterial color="#E8D9C5" />
      </mesh>

      {/* Upper Hull Body */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.4, 4.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.5} />
      </mesh>
      
      {/* Splash Guard (Front V-shape) */}
      <mesh position={[0, 0.25, 2.3]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 0.1, 0.6]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.5} />
      </mesh>

      {/* --- TURRET (T-54/55 Dome Style) --- */}
      <group position={[0, 0.45, 0.2]}>
        {/* Main Dome */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.05, 24, 12, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.5} />
        </mesh>

        {/* Main Gun Barrel (100mm D-10T) */}
        <mesh position={[0, 0.3, 2.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 3.0, 12]} />
          <meshStandardMaterial color="#2a332c" metalness={0.7} roughness={0.4} />
        </mesh>
        
        {/* Fume Extractor on Barrel (near tip) */}
        <mesh position={[0, 0.3, 3.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.5, 12]} />
          <meshStandardMaterial color="#2a332c" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Left Side Markings: Star + 390 */}
        <group position={[-1.02, 0.3, 0.1]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[-0.4, 0, 0]}> /* Star */
            <cylinderGeometry args={[0.15, 0.15, 0.02, 5]} />
            <meshStandardMaterial color="#DA251D" />
          </mesh>
          <Text
            position={[0.2, 0.05, 0.02]} 
            fontSize={0.4}
            color="#FFF"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            390
          </Text>
        </group>

        {/* Right Side Markings: Star + 390 */}
        <group position={[1.02, 0.3, 0.1]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[-0.4, 0, 0]}> /* Star */
            <cylinderGeometry args={[0.15, 0.15, 0.02, 5]} />
            <meshStandardMaterial color="#DA251D" />
          </mesh>
          <Text
            position={[0.2, 0.05, 0.02]} 
            fontSize={0.4}
            color="#FFF"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            390
          </Text>
        </group>
      </group>

      {/* --- REAR ACCESSORIES --- */}
      {/* Dual External Fuel Drums */}
      <mesh position={[-0.5, 0.3, -2.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 12]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.6} />
      </mesh>
      <mesh position={[0.5, 0.3, -2.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 12]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.6} />
      </mesh>

      {/* Unditching Log */}
      <mesh position={[0, -0.1, -2.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.8, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={1} />
      </mesh>

    </group>
  );
}

function TicketModel({ color }: { color: string }) {
  return (
    <group scale={0.6} rotation={[Math.PI / 8, 0, 0]}>
      {/* Paper Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.5, 0.05]} />
        <meshStandardMaterial color="#F5E6D3" roughness={1} />
      </mesh>
      {/* Red Header Stripe */}
      <mesh position={[0, 1.4, 0.03]} castShadow>
        <boxGeometry args={[2.3, 0.4, 0.02]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Stamp Grids */}
      {Array.from({ length: 4 }).map((_, r) => 
        Array.from({ length: 3 }).map((_, c) => (
          <mesh key={`${r}-${c}`} position={[-0.8 + c * 0.8, 0.6 - r * 0.6, 0.03]}>
            <boxGeometry args={[0.6, 0.4, 0.01]} />
            <meshStandardMaterial color={r % 2 === 0 && c % 2 !== 0 ? color : "#D1C2A5"} opacity={0.6} transparent />
          </mesh>
        ))
      )}
    </group>
  );
}

function RadioModel() {
  return (
    <group scale={0.6}>
      {/* Main Case */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.8, 0.8]} />
        <meshStandardMaterial color="#475569" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Left Speaker */}
      <mesh position={[-0.9, 0, 0.41]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>
      {/* Right Speaker */}
      <mesh position={[0.9, 0, 0.41]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>
      {/* Cassette Deck */}
      <mesh position={[0, -0.2, 0.42]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.05]} />
        <meshStandardMaterial color="#0F172A" roughness={0.5} />
      </mesh>
      {/* Tuning Dial */}
      <mesh position={[0, 0.5, 0.42]} castShadow>
        <boxGeometry args={[1, 0.2, 0.02]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.8} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[2.6, 0.1, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[-1.25, 0.95, 0]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[1.25, 0.95, 0]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

function MedalModel({ color }: { color: string }) {
  return (
    <group scale={0.8}>
      {/* Ribbon */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Ribbon Yellow Stripes */}
      <mesh position={[-0.3, 1, 0.06]} castShadow>
        <boxGeometry args={[0.1, 1.5, 0.01]} />
        <meshStandardMaterial color="#EAB308" />
      </mesh>
      <mesh position={[0.3, 1, 0.06]} castShadow>
        <boxGeometry args={[0.1, 1.5, 0.01]} />
        <meshStandardMaterial color="#EAB308" />
      </mesh>
      {/* Metal Base/Ring */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Medal Disc */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Inner Star/Detail */}
      <mesh position={[0, -0.6, 0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 5]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function ArtifactModel({ artifact, hovered }: { artifact: Artifact, hovered?: boolean }) {
  const scale = hovered ? 1.1 : 1;
  const yOffset = hovered ? 0.2 : 0;
  
  return (
    <group scale={scale} position={[0, yOffset, 0]}>
      {artifact.id === 0 && <TankModel color={artifact.color} />}
      {artifact.id === 1 && <TicketModel color={artifact.color} />}
      {artifact.id === 2 && <RadioModel />}
      {artifact.id === 3 && <MedalModel color={artifact.color} />}
      {/* Highlight effect when hovered */}
      {hovered && (
        <pointLight position={[0, 0, 2]} intensity={2} color={artifact.color} distance={4} />
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  THREE.JS COMPONENTS                                               */
/* ═══════════════════════════════════════════════════════════════════ */

function Pedestal({ artifact, onSelect }: { artifact: Artifact; onSelect: (a: Artifact) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={artifact.position}>
      {/* 3D Custom Artifact Model */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group 
          ref={groupRef}
          onClick={() => onSelect(artifact)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <ArtifactModel artifact={artifact} hovered={hovered} />
        </group>
      </Float>

      {/* Label inside the 3D space (Outside rotating mesh) */}
      <Text
        position={[0, -0.8, 0.8]}
        fontSize={0.2}
        color="#2C2A29"
        anchorX="center"
        anchorY="middle"
      >
        {artifact.name}
      </Text>

      {/* Display Base */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[1, 1.2, 0.5, 32]} />
        <meshStandardMaterial color="#D1C2A5" metalness={0.2} roughness={0.7} />
      </mesh>
      
      {/* Light coming from bottom */}
      <pointLight position={[0, -1, 0.8]} intensity={0.8} color={artifact.color} distance={5} />
    </group>
  );
}

function Scene({ onSelect }: { onSelect: (a: Artifact) => void }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 12]} fov={45} />
      <OrbitControls 
        enablePan={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={6} 
        maxDistance={15}
        makeDefault
      />
      
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#FFE4B5" />

      <group position={[0, -1, 0]}>
        {artifacts.map((a) => (
          <Pedestal key={a.id} artifact={a} onSelect={onSelect} />
        ))}
      </group>

      <ContactShadows resolution={1024} scale={30} blur={2.5} opacity={0.4} far={10} color="#000000" />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                    */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Museum3D() {
  const [selected, setSelected] = useState<Artifact | null>(null);

  return (
    <div className="relative w-full h-[700px] flex flex-col bg-[#F5E6D3] rounded-3xl border-4 border-[#2C2A29] shadow-[15px_15px_0px_0px_#2C2A29] overflow-hidden">
      {/* Instructions Overlay */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <h2 className="text-2xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter drop-shadow-md">
          Bảo Tàng Thực Tế Ảo 3D
        </h2>
        <div className="flex items-center gap-2 text-[#DA251D] text-[10px] font-black uppercase tracking-widest mt-1 bg-white/50 px-3 py-1 inline-flex rounded-full">
          <MousePointer2 size={12} /> Xoay để khám phá, Click để xem chi tiết
        </div>
      </div>

      {/* WebGL Canvas */}
      <div className="flex-1 w-full relative cursor-move">
        <Canvas shadows>
          <Suspense fallback={<Html center><div className="text-[#DA251D] font-black animate-pulse px-6 py-3 bg-white/80 rounded-full shadow-lg border-2 border-[#DA251D] whitespace-nowrap">ĐANG TẢI MÔ HÌNH 3D...</div></Html>}>
            <Scene onSelect={setSelected} />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom info bar */}
      <div className="h-16 bg-[#2C2A29] flex items-center justify-between px-8 border-t-2 border-[#2C2A29]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#DA251D]">
             <Rotate3d size={16} />
          </div>
          <span className="text-[10px] font-bold text-[#E8D9C5] uppercase tracking-widest">
            Trải nghiệm WebGL Engine 2026
          </span>
        </div>
        <div className="flex gap-2">
           {artifacts.map(a => (
             <div key={a.id} className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
           ))}
        </div>
      </div>

      {/* Real 3D Modal (Physical Modal Overlay) */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#2C2A29]/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full max-w-2xl bg-[#FAF3EB] border-8 border-double border-[#2C2A29] shadow-[20px_20px_0px_0px_rgba(218,37,29,0.3)] p-10 relative grid md:grid-cols-2 gap-8 items-center"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#DA251D] text-white flex items-center justify-center border-2 border-[#2C2A29] shadow-lg hover:scale-110 transition-transform z-10"
              >
                <X size={24} />
              </button>

              {/* Real 3D Artifact Viewer in Modal */}
              <div className="w-full h-80 bg-[#1E1C1A] border-4 border-[#2C2A29] shadow-inner relative overflow-hidden rounded-lg cursor-move">
                <Canvas shadows camera={{ position: [0, 1, 5], fov: 40 }}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} />
                  <spotLight position={[-5, 5, 5]} intensity={1} angle={0.5} penumbra={1} castShadow />
                  <Suspense fallback={null}>
                    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                      <group position={[0, -0.5, 0]}>
                        <ArtifactModel artifact={selected} />
                      </group>
                    </Float>
                    <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2.4} />
                    <Environment preset="city" />
                  </Suspense>
                  <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} minDistance={3} maxDistance={8} />
                </Canvas>
                <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-white/80 border border-white/20 flex items-center gap-2">
                  <Rotate3d size={10} /> Tương tác 3D đa chiều
                </div>
              </div>

              <div className="flex flex-col justify-center h-full">
                 <div className="mb-4 text-[#DA251D]">
                    {selected.name === "Xe tăng 390" && <Box size={32} />}
                    {selected.name === "Tem phiếu mua lương thực" && <Ticket size={32} />}
                    {selected.name === "Đài Cassette cổ" && <Radio size={32} />}
                    {selected.name === "Huân chương Chiến công" && <Trophy size={32} />}
                 </div>

                 <h3 className="text-4xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter mb-2 leading-none">
                   {selected.name}
                 </h3>
                 <span className="text-white font-black text-[10px] uppercase tracking-widest mb-6 bg-[#DA251D] self-start px-3 py-1 rounded-sm shadow-sm inline-block">
                   Năm {selected.year}
                 </span>

                 <div className="bg-[#E8D9C5]/50 p-5 border-l-4 border-[#D1C2A5] mb-8">
                   <p className="font-serif-body text-[#333] leading-relaxed text-justify text-sm">
                     {selected.description}
                   </p>
                 </div>

                 <button 
                    onClick={() => setSelected(null)}
                    className="w-full py-3 border-2 border-[#2C2A29] text-[#2C2A29] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#2C2A29] hover:text-[#FAF3EB] transition-colors flex items-center justify-center gap-3"
                 >
                    <Star size={12} className="animate-spin-slow" /> Trở về Bảo Tàng <Star size={12} className="animate-spin-slow" />
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .canvas-container { pointer-events: auto !important; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
