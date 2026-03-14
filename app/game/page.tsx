"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GAME_LEVELS, WEAPONS, UPGRADES } from "./data";
import type { GameScreen, Upgrade } from "./data";
import { PixelHeart } from "./components/PixelArt";
import ShooterArena from "./components/ShooterArena";
import {
  TitleScreen,
  TutorialScreen,
  LevelIntro,
  QuizScreen,
  LevelComplete,
  GameOverScreen,
  VictoryScreen,
  ShopScreen,
  UpgradeScreen,
} from "./components/Screens";

/* ── CSS animations (font loaded from globals.css) ─────────────────── */

const gameCss = `
html, body { overflow: hidden !important; height: 100dvh !important; }
body > nav { display: none !important; }
body > main { padding-top: 0 !important; min-height: 0 !important; height: 100dvh !important; overflow: hidden !important; }
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none;
  z-index: 1;
}
.crt-glow { text-shadow: 0 0 6px currentColor, 0 0 12px currentColor; }
@keyframes pixel-idle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
.pixel-idle { animation: pixel-idle 1s ease-in-out infinite; }
@keyframes pixel-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.pixel-blink { animation: pixel-blink 1s step-end infinite; }
@keyframes pixel-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
.pixel-shake { animation: pixel-shake 0.3s ease-in-out; }
`;

/* ── Helper: pick N random upgrade choices ─────────────────────────── */

function pickUpgradeChoices(
  upgradeCounts: Record<string, number>,
  count: number = 3
): Upgrade[] {
  // Filter upgrades that haven't hit max stack
  const available = UPGRADES.filter(
    (u) => (upgradeCounts[u.id] || 0) < u.maxStack
  );
  // Weighted by rarity: common 5, rare 3, epic 1
  const weighted: Upgrade[] = [];
  for (const u of available) {
    const w = u.rarity === "common" ? 5 : u.rarity === "rare" ? 3 : 1;
    for (let i = 0; i < w; i++) weighted.push(u);
  }
  // Shuffle and pick unique
  const picked: Upgrade[] = [];
  const used = new Set<string>();
  const shuffled = weighted.sort(() => Math.random() - 0.5);
  for (const u of shuffled) {
    if (picked.length >= count) break;
    if (!used.has(u.id)) {
      picked.push(u);
      used.add(u.id);
    }
  }
  return picked;
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN GAME PAGE                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

export default function GamePage() {
  const [screen, setScreen] = useState<GameScreen>("title");
  const [level, setLevel] = useState(0);
  const [hp, setHp] = useState(5);
  const [ammo, setAmmo] = useState(30);
  const [score, setScore] = useState(0);
  const [waveIdx, setWaveIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [weaponId, setWeaponId] = useState("single");
  const [ownedWeapons, setOwnedWeapons] = useState<string[]>(["single"]);
  const [ammoQuizUsed, setAmmoQuizUsed] = useState(false);

  // Upgrade system
  const [upgradeCounts, setUpgradeCounts] = useState<Record<string, number>>({});
  const [upgradeChoices, setUpgradeChoices] = useState<Upgrade[]>([]);
  // Track what happens after upgrade: "next-wave" or "level-complete" or "resume-combat"
  const afterUpgradeRef = useRef<"next-wave" | "level-complete" | "resume-combat">("next-wave");
  // Track whether quiz was triggered by wave clear or ammo empty
  const quizSourceRef = useRef<"wave-clear" | "ammo-empty">("wave-clear");

  useEffect(() => {
    if (hp <= 0 && screen === "combat") {
      setScreen("game-over");
    }
  }, [hp, screen]);

  const levelData = GAME_LEVELS[level];
  const totalQ = levelData.questions.length;

  // Compute current weapon stats from upgrades
  const extraBullets = upgradeCounts["extra_bullet"] || 0;
  const hasCircleShot = (upgradeCounts["circle_shot"] || 0) > 0;
  const spreadStacks = upgradeCounts["spread_shot"] || 0;
  const bonusScore = (upgradeCounts["damage_up"] || 0) * 50;

  // Derive effective weaponId from upgrades (specialty weapons not overridden by extra_bullet)
  const isSpecialtyWeapon = weaponId === "rocket" || weaponId === "shotgun";
  const effectiveWeaponId = hasCircleShot
    ? "circle"
    : isSpecialtyWeapon
    ? weaponId
    : extraBullets >= 2
    ? "triple"
    : extraBullets >= 1
    ? "double"
    : weaponId;

  function startGame() {
    setLevel(0);
    setHp(5);
    setAmmo(30);
    setScore(0);
    setWaveIdx(0);
    setCorrectCount(0);
    setWeaponId("single");
    setOwnedWeapons(["single"]);
    setAmmoQuizUsed(false);
    setUpgradeCounts({});
    setUpgradeChoices([]);
    setScreen("tutorial");
  }

  function startLevel() {
    setWaveIdx(0);
    setCorrectCount(0);
    setAmmoQuizUsed(false);
    setScreen("combat");
  }

  const onWaveCleared = useCallback(() => {
    setAmmoQuizUsed(false);
    quizSourceRef.current = "wave-clear";
    setScreen("quiz");
  }, []);

  const onAmmoEmpty = useCallback(() => {
    setAmmoQuizUsed((used) => {
      if (used) return true;
      quizSourceRef.current = "ammo-empty";
      setScreen("quiz");
      return true;
    });
  }, []);

  function onQuizAnswer(correct: boolean) {
    if (correct) {
      setHp((h) => Math.min(5, h + 1));
      setAmmo((a) => a + 10);
      setScore((s) => s + 100);
      setCorrectCount((c) => c + 1);
    } else {
      setAmmo((a) => a + 5);
    }

    // Determine what happens after upgrade
    if (quizSourceRef.current === "ammo-empty") {
      // Ammo empty quiz: always resume combat (enemies still alive)
      afterUpgradeRef.current = "resume-combat";
    } else {
      // Wave cleared quiz: advance to next wave or complete level
      const isLastWave = waveIdx + 1 >= totalQ;
      if (isLastWave) {
        afterUpgradeRef.current = "level-complete";
      } else {
        afterUpgradeRef.current = "next-wave";
      }
    }

    // Generate 3 random upgrade choices
    setUpgradeCounts((prev) => {
      const choices = pickUpgradeChoices(prev, 3);
      setUpgradeChoices(choices);
      return prev;
    });
    setScreen("upgrade");
  }

  function onUpgradePick(upgradeId: string) {
    // Apply upgrade
    setUpgradeCounts((prev) => {
      const next = { ...prev, [upgradeId]: (prev[upgradeId] || 0) + 1 };
      return next;
    });

    // Apply instant effects
    switch (upgradeId) {
      case "hp_up":
        setHp((h) => Math.min(5, h + 1));
        break;
      case "ammo_up":
        setAmmo((a) => a + 15);
        break;
    }

    // Move to next state
    if (afterUpgradeRef.current === "level-complete") {
      setScreen("level-complete");
    } else if (afterUpgradeRef.current === "resume-combat") {
      // Return to same wave (enemies still alive, just got ammo from quiz)
      setAmmoQuizUsed(false);
      setScreen("combat");
    } else {
      setWaveIdx((w) => w + 1);
      setAmmoQuizUsed(false);
      setScreen("combat");
    }
  }

  function nextLevel() {
    if (level + 1 >= GAME_LEVELS.length) {
      setScreen("victory");
    } else {
      setLevel((l) => l + 1);
      setAmmo(30);
      setAmmoQuizUsed(false);
      setScreen("shop");
    }
  }

  function restart() {
    setLevel(0);
    setHp(5);
    setAmmo(30);
    setScore(0);
    setWaveIdx(0);
    setCorrectCount(0);
    setWeaponId("single");
    setOwnedWeapons(["single"]);
    setAmmoQuizUsed(false);
    setUpgradeCounts({});
    setUpgradeChoices([]);
    setScreen("title");
  }

  function buyWeapon(id: string) {
    const weapon = WEAPONS.find((w) => w.id === id);
    if (!weapon || score < weapon.cost || ownedWeapons.includes(id)) return;
    setScore((s) => s - weapon.cost);
    setOwnedWeapons((o) => [...o, id]);
    setWeaponId(id);
  }

  function equipWeapon(id: string) {
    if (ownedWeapons.includes(id)) {
      setWeaponId(id);
    }
  }

  // Build stats display for HUD
  const activeUpgrades: string[] = [];
  if (extraBullets > 0) activeUpgrades.push(`+${extraBullets}đạn`);
  if (hasCircleShot) activeUpgrades.push("360°");
  if (spreadStacks > 0) activeUpgrades.push(`quạt×${spreadStacks}`);
  const fireRateStacks = upgradeCounts["fire_rate"] || 0;
  if (fireRateStacks > 0) activeUpgrades.push(`⚡×${fireRateStacks}`);
  const speedStacks = upgradeCounts["speed_up"] || 0;
  if (speedStacks > 0) activeUpgrades.push(`🏃×${speedStacks}`);

  return (
    <>
      <style jsx global>{gameCss}</style>

      <div
        className="relative overflow-hidden flex flex-col"
        style={{ height: "100dvh", background: "linear-gradient(180deg, #0a0a1e 0%, #12122a 50%, #1a1a3a 100%)" }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b-2 border-[#333] shrink-0"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <Link href="/" className="pixel-font text-[11px] sm:text-[13px] text-[#888] hover:text-[#FFD700] transition-colors">
            ← THOÁT
          </Link>
          <span className="pixel-font text-[11px] sm:text-[13px] text-[#FFD700]">
            KÝ ỨC THỐNG NHẤT — XÂY DỰNG & BẢO VỆ TỔ QUỐC
          </span>
          <span className="pixel-font text-[11px] sm:text-[13px] text-[#555]">v2.0</span>
        </div>

        {/* HUD */}
        {(screen === "combat" || screen === "quiz") && (
          <div
            className="flex items-center justify-between px-5 py-3 border-b border-[#222] flex-wrap gap-2 shrink-0"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <div className="flex items-center gap-1">
              <span className="pixel-font text-[12px] text-[#888] mr-1">HP</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <PixelHeart key={i} filled={i < hp} />
                ))}
              </div>
            </div>
            <div className="pixel-font text-[13px] sm:text-[14px] text-[#aaa]">
              ĐẠN: <span className={ammo <= 5 ? "text-[#ff4444]" : "text-[#4fc3f7]"}>{ammo}</span>
            </div>
            {activeUpgrades.length > 0 && (
              <div className="pixel-font text-[11px] sm:text-[12px] text-[#a855f7]">
                {activeUpgrades.join(" ")}
              </div>
            )}
            <div className="pixel-font text-[13px] sm:text-[14px] text-[#FFD700]">
              ⬡ {score.toString().padStart(5, "0")}
            </div>
            <div className="pixel-font text-[12px] text-[#888]">
              LV{level + 1} • W{waveIdx + 1}/{totalQ}
            </div>
          </div>
        )}

        {/* Main area — flex-1 to fill remaining space */}
        <div className={`flex-1 min-h-0 ${screen === "combat" ? "overflow-hidden" : "overflow-auto"}`}>
          <AnimatePresence mode="wait">
            {screen === "title" && <TitleScreen key="title" onStart={startGame} />}

            {screen === "tutorial" && (
              <TutorialScreen key="tutorial" onStart={() => setScreen("level-intro")} />
            )}

            {screen === "level-intro" && (
              <LevelIntro key={`intro-${level}`} level={level} levelData={levelData} onStart={startLevel} />
            )}

            {screen === "combat" && (
              <motion.div
                key={`combat-${level}-${waveIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <ShooterArena
                  levelData={levelData}
                  levelIndex={level}
                  onWaveCleared={onWaveCleared}
                  onAmmoEmpty={onAmmoEmpty}
                  setHp={setHp}
                  ammo={ammo}
                  setAmmo={setAmmo}
                  setScore={setScore}
                  waveNum={waveIdx}
                  weaponId={effectiveWeaponId}
                  upgrades={upgradeCounts}
                />
              </motion.div>
            )}

            {screen === "quiz" && (
              <QuizScreen
                key={`quiz-${level}-${waveIdx}`}
                question={levelData.questions[waveIdx]}
                onAnswer={onQuizAnswer}
              />
            )}

            {screen === "upgrade" && (
              <UpgradeScreen
                key={`upgrade-${level}-${waveIdx}`}
                choices={upgradeChoices.map((u) => ({
                  upgrade: u,
                  stacks: upgradeCounts[u.id] || 0,
                }))}
                onPick={onUpgradePick}
              />
            )}

            {screen === "level-complete" && (
              <LevelComplete
                key={`complete-${level}`}
                levelData={levelData}
                correctCount={correctCount}
                totalQ={totalQ}
                totalScore={score}
                onNext={nextLevel}
                isLastLevel={level + 1 >= GAME_LEVELS.length}
              />
            )}

            {screen === "shop" && (
              <ShopScreen
                key={`shop-${level}`}
                score={score}
                currentWeaponId={effectiveWeaponId}
                ownedWeapons={ownedWeapons}
                onBuy={buyWeapon}
                onEquip={equipWeapon}
                onContinue={() => setScreen("level-intro")}
              />
            )}

            {screen === "game-over" && <GameOverScreen key="gameover" score={score} onRestart={restart} />}

            {screen === "victory" && <VictoryScreen key="victory" score={score} onRestart={restart} />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
