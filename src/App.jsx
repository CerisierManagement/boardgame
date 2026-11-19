import React, { useState, useMemo } from "react";
import {
  Users,
  Scale,
  RotateCcw,
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
  Shuffle,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Coins,
  MessageSquare,
  Vote,
  Layers,
  Award,
} from "lucide-react";

const ACTION_TYPES = ["elephant", "squirrel", "fox", "monkey"];

const ACTION_META = {
  elephant: {
    id: "elephant",
    name: "全力奉仕（ゾウ）",
    shortName: "ゾウ",
    emoji: "🐘",
    contribution: 3,
    influence: 0,
    locksRoleNextRound: false,
    keepsOnBoardNextRound: false,
    desc: "+3貢献 / 影響力0 / 制限なし",
  },
  squirrel: {
    id: "squirrel",
    name: "堅実な備蓄（リス）",
    shortName: "リス",
    emoji: "🐿️",
    contribution: 1,
    influence: 1,
    locksRoleNextRound: false,
    keepsOnBoardNextRound: false,
    desc: "+1貢献 / 影響力+1 / 制限なし",
  },
  fox: {
    id: "fox",
    name: "秘密の工作（キツネ）",
    shortName: "キツネ",
    emoji: "🦊",
    contribution: -1,
    influence: 3,
    locksRoleNextRound: true,
    keepsOnBoardNextRound: true,
    desc: "-1貢献 / 影響力+3 / 次R役職不可・手元留置",
  },
  monkey: {
    id: "monkey",
    name: "議論の撹乱（サル）",
    shortName: "サル",
    emoji: "🐒",
    contribution: -2,
    influence: 1,
    locksRoleNextRound: true,
    keepsOnBoardNextRound: true,
    desc: "-2貢献 / 影響力+1 / 3秒指差し-1 / 次R役職不可・手元留置",
  },
};

const ROLE_META = {
  lion: {
    id: "lion",
    name: "熱弁家（ライオン）",
    shortName: "熱弁",
    emoji: "🦁",
    timing: "投票時",
    desc: "緑（賛成）を1枚以上出して投票したとき、表向きにして賛成合計に+2。",
  },
  beaver: {
    id: "beaver",
    name: "調停者（ビーバー）",
    shortName: "調停",
    emoji: "🦫",
    timing: "公開直後",
    desc: "アクション公開直後に表向きにし、他のプレイヤー1人に影響力トークンを1個譲渡。",
  },
  dove: {
    id: "dove",
    name: "運び屋（ハト）",
    shortName: "運び",
    emoji: "🕊️",
    timing: "公開直後",
    desc: "このラウンドでサルが出たとき、表向きにして全体のマイナス補正（-2→0）を1回分無効化。",
  },
  octopus: {
    id: "octopus",
    name: "策士（タコ）",
    shortName: "策士",
    emoji: "🐙",
    timing: "先行解決",
    desc: "自分がキツネを出していた場合、アクションと役職を先行オープンし、影響力+1。",
  },
  wolf: {
    id: "wolf",
    name: "扇動者（オオカミ）",
    shortName: "扇動",
    emoji: "🐺",
    timing: "投票時",
    desc: "赤（反対）を1枚以上出して投票したとき、表向きにして反対合計のマイナス影響をさらに2強化。",
  },
  owl: {
    id: "owl",
    name: "見張り（フクロウ）",
    shortName: "見張",
    emoji: "🦉",
    timing: "先行解決",
    desc: "アクション一斉公開前に表向きにし、他者1人とカード種1つを宣言して単独公開（的中時、影響力+1）。",
  },
};

// 仕様書 6. 人数別・補充用共有サプライ初期予備枚数表
function getInitialSupply(playerCount) {
  if (playerCount === 5) {
    return { elephant: 1, squirrel: 1, fox: 1, monkey: 1 };
  }
  if (playerCount >= 6 && playerCount <= 8) {
    return { elephant: 2, squirrel: 2, fox: 1, monkey: 1 };
  }
  if (playerCount === 9) {
    return { elephant: 3, squirrel: 1, fox: 3, monkey: 1 };
  }
  if (playerCount === 10) {
    return { elephant: 3, squirrel: 3, fox: 2, monkey: 1 };
  }
  if (playerCount >= 11 && playerCount <= 12) {
    return { elephant: 3, squirrel: 3, fox: 2, monkey: 2 };
  }
  return { elephant: 4, squirrel: 4, fox: 2, monkey: 2 };
}

// 仕様書 7. 人数別配分表・役職内訳・勝利ゾーン
function getConfigByPlayerCount(n) {
  const table = {
    5: { herb: 3, carn: 2, roles: { lion: 1, beaver: 1, dove: 1, octopus: 1, wolf: 1, owl: 0 } },
    6: { herb: 4, carn: 2, roles: { lion: 1, beaver: 1, dove: 1, octopus: 1, wolf: 1, owl: 1 } },
    7: { herb: 5, carn: 2, roles: { lion: 2, beaver: 1, dove: 1, octopus: 1, wolf: 1, owl: 1 } },
    8: { herb: 5, carn: 3, roles: { lion: 2, beaver: 1, dove: 1, octopus: 1, wolf: 2, owl: 1 } },
    9: { herb: 6, carn: 3, roles: { lion: 2, beaver: 2, dove: 1, octopus: 1, wolf: 2, owl: 1 } },
    10: { herb: 6, carn: 4, roles: { lion: 2, beaver: 2, dove: 1, octopus: 2, wolf: 2, owl: 1 } },
    11: { herb: 7, carn: 4, roles: { lion: 2, beaver: 2, dove: 2, octopus: 2, wolf: 2, owl: 1 } },
    12: { herb: 8, carn: 4, roles: { lion: 3, beaver: 2, dove: 2, octopus: 2, wolf: 2, owl: 1 } },
    13: { herb: 9, carn: 4, roles: { lion: 3, beaver: 2, dove: 2, octopus: 2, wolf: 2, owl: 2 } },
    14: { herb: 9, carn: 5, roles: { lion: 3, beaver: 2, dove: 2, octopus: 2, wolf: 3, owl: 2 } },
    15: { herb: 10, carn: 5, roles: { lion: 3, beaver: 3, dove: 2, octopus: 2, wolf: 3, owl: 2 } },
  };
  const cfg = table[n] || table[5];
  const maxHerbWin = cfg.herb + 5;
  return {
    ...cfg,
    herbMin: 1,
    herbMax: maxHerbWin,
    winText: `+1〜+${maxHerbWin}（肉食: 0以下 / +${maxHerbWin + 1}以上）`,
  };
}

function getDefaultTarget(round, playerCount) {
  const offsets = { 1: 0, 2: 2, 3: 4, 4: 1, 5: 5 };
  return playerCount + (offsets[round] ?? 0);
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function dealRoles(playerCount) {
  const cfg = getConfigByPlayerCount(playerCount);
  const pool = [];
  Object.entries(cfg.roles).forEach(([roleId, count]) => {
    for (let i = 0; i < count; i++) pool.push(roleId);
  });
  return shuffleArray(pool).slice(0, playerCount);
}

function createInitialGame(playerCount = 5) {
  const clamped = Math.max(5, Math.min(15, playerCount));
  const cfg = getConfigByPlayerCount(clamped);
  const factions = shuffleArray([
    ...Array(cfg.herb).fill("herbivore"),
    ...Array(cfg.carn).fill("carnivore"),
  ]);
  const roles = dealRoles(clamped);

  const players = Array.from({ length: clamped }, (_, idx) => ({
    id: idx,
    name: `P${idx + 1}`,
    faction: factions[idx],
    role: roles[idx],
    hand: [...ACTION_TYPES],
    influence: 3,
    lockedNextRound: false,
    heldCards: [],
    submittedAction: null,
    submittedRole: false,
    owlTargetId: null,
    owlGuessAction: "elephant",
    beaverTargetId: null,
    voteGreen: 0,
    voteRed: 0,
  }));

  return {
    playerCount: clamped,
    round: 1,
    maxRounds: 5,
    step: 1,
    parentIndex: 0,
    scale: 0,
    target: getDefaultTarget(1, clamped),
    supply: getInitialSupply(clamped),
    negotiationSubPhase: "right",
    negotiationSeconds: 60,
    preRevealDone: false,
    preRevealSummary: null,
    actionRevealDone: false,
    actionRevealSummary: null,
    monkeyPenaltyTargets: [],
    votingDone: false,
    lastRoundResult: null,
    players,
    logs: [
      `【セットアップ完了】${clamped}人プレイ（草食${cfg.herb}/肉食${cfg.carn}）で開始。森の天秤は「0」、第1ラウンド親は P1 です。`,
    ],
  };
}

export default function App() {
  const [setupCount, setSetupCount] = useState(5);
  const [game, setGame] = useState(() => createInitialGame(5));
  const [gmView, setGmView] = useState(true);
  const [selectedPlayerId, setSelectedPlayerId] = useState(0);

  const config = useMemo(() => getConfigByPlayerCount(game.playerCount), [game.playerCount]);
  const selectedPlayer = game.players[selectedPlayerId] || game.players[0];

  const appendLog = (prevLogs, text) => [...prevLogs, `[R${game.round}-S${game.step}] ${text}`];

  const handleReset = (count = setupCount) => {
    const next = createInitialGame(count);
    setGame(next);
    setSelectedPlayerId(0);
  };

  const updatePlayer = (playerId, updater) => {
    setGame((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? (typeof updater === "function" ? updater(p) : { ...p, ...updater }) : p
      ),
    }));
  };

  // Step 3: 全員ランダムアクション＆可能なら役職伏せ
  const handleRandomizeSubmissions = () => {
    setGame((prev) => {
      const nextPlayers = prev.players.map((p) => {
        const pickedAction = p.hand[Math.floor(Math.random() * p.hand.length)];
        const canUseRole = !p.lockedNextRound && !!p.role;
        const wantRole = canUseRole && Math.random() < 0.45;
        let owlTargetId = p.owlTargetId;
        let beaverTargetId = p.beaverTargetId;

        if (canUseRole && wantRole) {
          if (p.role === "owl") {
            const others = prev.players.filter((o) => o.id !== p.id);
            if (others.length > 0) {
              owlTargetId = others[Math.floor(Math.random() * others.length)].id;
            }
          }
          if (p.role === "beaver") {
            const others = prev.players.filter((o) => o.id !== p.id && p.influence > 0);
            if (others.length > 0) {
              beaverTargetId = others[Math.floor(Math.random() * others.length)].id;
            }
          }
        }

        return {
          ...p,
          submittedAction: pickedAction,
          submittedRole: wantRole,
          owlTargetId,
          beaverTargetId,
        };
      });
      return {
        ...prev,
        players: nextPlayers,
        logs: appendLog(prev.logs, "全プレイヤーの提出カード（アクション・任意役職）を自動セットしました。"),
      };
    });
  };

  // Step 4-A: 「見張り（フクロウ）」と「策士（タコ）」の先行解決
  // 仕様①: アクションカードを回収・一斉公開する前に見張り・策士が先行発動する
  const handleResolvePreReveal = () => {
    setGame((prev) => {
      if (prev.preRevealDone) return prev;

      const working = prev.players.map((p) => ({ ...p }));
      const messages = [];

      // 1. 見張り（フクロウ）先行解決
      working.forEach((p) => {
        const canUse = !p.lockedNextRound && p.submittedRole && p.role === "owl";
        if (!canUse) return;
        const target = working.find((t) => t.id === p.owlTargetId);
        if (!target || target.id === p.id) {
          messages.push(`🦉見張り(${p.name}): 対象未指定のため不発。`);
          return;
        }
        const isHit = target.submittedAction === p.owlGuessAction;
        if (isHit) {
          p.influence = Math.min(8, p.influence + 1);
        }
        messages.push(
          `🦉見張り(${p.name})が表向き: ${target.name} の伏せカードを「${
            ACTION_META[p.owlGuessAction].shortName
          }」と宣言 → 単独公開で「${
            target.submittedAction ? ACTION_META[target.submittedAction].shortName : "なし"
          }」を確認！${isHit ? "【的中】影響力+1（現" + p.influence + "）" : "【外れ】"}`
        );
      });

      // 2. 策士（タコ）先行オープン解決（キツネ提出者がアクションと役職を先行オープンして影響力+1）
      working.forEach((p) => {
        const canUse = !p.lockedNextRound && p.submittedRole && p.role === "octopus";
        if (!canUse) return;
        if (p.submittedAction === "fox") {
          p.influence = Math.min(8, p.influence + 1);
          messages.push(
            `🐙策士(${p.name})が先行オープン: キツネ提出を確認し、アクション＆役職を公開して影響力+1（現${p.influence}）！`
          );
        } else {
          messages.push(
            `🐙策士(${p.name})が役職オープン: キツネ未提出のため追加影響力なし。`
          );
        }
      });

      if (messages.length === 0) {
        messages.push("先行解決（見張り・策士）の対象役職はありませんでした。");
      }

      return {
        ...prev,
        players: working,
        preRevealDone: true,
        preRevealSummary: messages,
        logs: [...prev.logs, ...messages.map((m) => `[R${prev.round}-S4先行] ${m}`)],
      };
    });
  };

  // Step 4-B: 残りのアクションカード一斉公開・基本貢献値・調停者/運び屋・アクション影響力精算
  const handleResolveActionReveal = () => {
    setGame((prev) => {
      if (!prev.preRevealDone || prev.actionRevealDone) return prev;

      const working = prev.players.map((p) => ({ ...p }));
      const messages = [];

      // 提出漏れがあれば手札先頭を自動補完
      working.forEach((p) => {
        if (!p.submittedAction) {
          p.submittedAction = p.hand[0] || "elephant";
        }
      });

      // シャッフルして一斉公開
      const shuffledOrder = shuffleArray(working.map((p) => p.id));
      messages.push(
        `🔀 残りアクション一斉公開順: ${shuffledOrder
          .map((id) => {
            const pl = working.find((x) => x.id === id);
            return `${pl.name}(${ACTION_META[pl.submittedAction].shortName})`;
          })
          .join(" → ")}`
      );

      // 基本貢献値計算
      let baseContribution = 0;
      let monkeyCount = 0;
      working.forEach((p) => {
        const meta = ACTION_META[p.submittedAction];
        baseContribution += meta.contribution;
        if (p.submittedAction === "monkey") monkeyCount += 1;
      });
      messages.push(`📊 アクション基本貢献値合計: ${baseContribution >= 0 ? `+${baseContribution}` : baseContribution}`);

      // 運び屋（ハト）: サルが出たとき、表向きにして全体のマイナス補正（-2→0）を1回分無効化
      let doveNegatedMonkeys = 0;
      working.forEach((p) => {
        const canUse = !p.lockedNextRound && p.submittedRole && p.role === "dove";
        if (canUse && monkeyCount > 0 && doveNegatedMonkeys < monkeyCount) {
          doveNegatedMonkeys += 1;
          messages.push(`🕊️運び屋(${p.name})が表向き: サルのマイナス補正(-2→0)を1回分無効化！`);
        }
      });

      const effectiveMonkeyPenalty = Math.max(0, monkeyCount - doveNegatedMonkeys) * -2;
      const actionContribution = baseContribution + monkeyCount * 2 + effectiveMonkeyPenalty;
      messages.push(
        `⚖️ サル補正反映後の貢献値: ${actionContribution >= 0 ? `+${actionContribution}` : actionContribution}（サル${monkeyCount}枚 / 無効化${doveNegatedMonkeys}枚）`
      );

      // 調停者（ビーバー）: 公開直後に表向きにし、他のプレイヤー1人に影響力トークンを1個譲渡
      working.forEach((p) => {
        const canUse = !p.lockedNextRound && p.submittedRole && p.role === "beaver";
        if (!canUse) return;
        const recipient = working.find((t) => t.id === p.beaverTargetId && t.id !== p.id);
        if (recipient && p.influence > 0) {
          p.influence -= 1;
          recipient.influence = Math.min(8, recipient.influence + 1);
          messages.push(
            `🦫調停者(${p.name})が表向き: ${recipient.name} に影響力トークンを1個譲渡（${p.name}:${p.influence} / ${recipient.name}:${recipient.influence}）。`
          );
        } else {
          messages.push(`🦫調停者(${p.name})が表向き: 譲渡対象なしまたはトークン不足のため譲渡なし。`);
        }
      });

      // アクションカード分の影響力増減（上限8）
      working.forEach((p) => {
        const gain = ACTION_META[p.submittedAction].influence;
        if (gain !== 0) {
          const before = p.influence;
          p.influence = Math.max(0, Math.min(8, p.influence + gain));
          messages.push(
            `🪙 ${p.name} アクション影響力 ${gain > 0 ? `+${gain}` : gain}: ${before} → ${p.influence}（上限8）`
          );
        }
      });

      return {
        ...prev,
        players: working,
        actionRevealDone: true,
        actionRevealSummary: {
          actionContribution,
          monkeyCount,
          doveNegatedMonkeys,
          messages,
        },
        logs: [...prev.logs, ...messages.map((m) => `[R${prev.round}-S4公開] ${m}`)],
      };
    });
  };

  // Step 5: サル指差し多数決（サル枚数分の対象選択をランダム補助）
  const handleRandomMonkeyTargets = () => {
    const monkeyCount = game.actionRevealSummary?.monkeyCount || 0;
    if (monkeyCount <= 0) return;
    const picks = Array.from({ length: monkeyCount }, () =>
      Math.floor(Math.random() * game.playerCount)
    );
    setGame((prev) => ({
      ...prev,
      monkeyPenaltyTargets: picks,
      logs: appendLog(
        prev.logs,
        `🐒 サル指差し対象（${monkeyCount}回分）を自動選択: ${picks.map((id) => `P${id + 1}`).join(", ")}`
      ),
    }));
  };

  // Step 6: 投票ランダム入力
  const handleRandomizeVotes = () => {
    setGame((prev) => {
      const nextPlayers = prev.players.map((p) => {
        const total = Math.floor(Math.random() * (p.influence + 1));
        const isGreen = p.faction === "herbivore" ? Math.random() < 0.7 : Math.random() < 0.3;
        return {
          ...p,
          voteGreen: isGreen ? total : 0,
          voteRed: !isGreen ? total : 0,
        };
      });
      return {
        ...prev,
        players: nextPlayers,
        logs: appendLog(prev.logs, "全プレイヤーの投票トークンをランダムセットしました。"),
      };
    });
  };

  // Step 6 精算＆次ラウンド移行
  // 仕様②: 投票結果開示後に熱弁家・扇動者を解決し、使用トークン全返却
  // 仕様③: 少数派アクション選択者のうち親から時計回りで一番近い人を先頭に、時計回りで全員が1枚補充して手札4枚を維持
  const handleSettleAndAdvanceRound = () => {
    setGame((prev) => {
      const n = prev.playerCount;
      const working = prev.players.map((p) => ({
        ...p,
        hand: [...p.hand],
        heldCards: [...p.heldCards],
      }));
      const logs = [...prev.logs];

      // サル指差しペナルティ適用
      const monkeyCount = prev.actionRevealSummary?.monkeyCount || 0;
      const targets =
        prev.monkeyPenaltyTargets.length === monkeyCount
          ? prev.monkeyPenaltyTargets
          : Array.from({ length: monkeyCount }, (_, idx) => prev.monkeyPenaltyTargets[idx] ?? 0);

      let monkeyPenaltyTotal = 0;
      if (monkeyCount > 0) {
        targets.forEach((tid, idx) => {
          const target = working.find((x) => x.id === tid);
          if (target) {
            target.influence = Math.max(0, target.influence - 1);
            monkeyPenaltyTotal -= 1;
            logs.push(
              `[R${prev.round}-S5] 🐒サル指差し(${idx + 1}/${monkeyCount}回目): ${target.name} の影響力-1（残${target.influence}）`
            );
          }
        });
      }

      // 投票集計
      let greenSum = 0;
      let redSum = 0;
      let lionBonus = 0;
      let wolfExtraPenalty = 0;

      working.forEach((p) => {
        const g = Math.max(0, Math.min(p.influence, p.voteGreen || 0));
        const r = Math.max(0, Math.min(p.influence - g, p.voteRed || 0));
        greenSum += g;
        redSum += r;

        // 投票で使用したトークンは手元から減らし中央サプライへ返却
        p.influence = Math.max(0, p.influence - (g + r));

        // 熱弁家: 緑（賛成）を1枚以上出したとき +2
        const canUseRole = !p.lockedNextRound && p.submittedRole;
        if (canUseRole && p.role === "lion" && g >= 1) {
          lionBonus += 2;
          logs.push(`[R${prev.round}-S6] 🦁熱弁家(${p.name})発動: 緑${g}枚投票につき賛成合計+2！`);
        }
        // 扇動者: 赤（反対）を1枚以上出したとき、反対合計のマイナス影響をさらに2強化
        if (canUseRole && p.role === "wolf" && r >= 1) {
          wolfExtraPenalty += 2;
          logs.push(`[R${prev.round}-S6] 🐺扇動者(${p.name})発動: 赤${r}枚投票につき反対マイナス影響を+2強化！`);
        }
      });

      const effectiveGreen = greenSum + lionBonus;
      const effectiveRedPenalty = -(redSum + wolfExtraPenalty);
      const voteDelta = effectiveGreen + effectiveRedPenalty;

      const baseActionContrib = prev.actionRevealSummary?.actionContribution ?? 0;
      const finalContribution = baseActionContrib + voteDelta;
      const scaleDelta = finalContribution - prev.target;
      const nextScale = prev.scale + scaleDelta;

      logs.push(
        `[R${prev.round}-S6] 🗳️ 投票結果: 緑${greenSum}(+${lionBonus}) vs 赤-${redSum}(-${wolfExtraPenalty}) → 投票補正 ${
          voteDelta >= 0 ? `+${voteDelta}` : voteDelta
        } / 最終貢献値 ${finalContribution} vs 目標 ${prev.target} → 天秤 ${
          scaleDelta >= 0 ? `+${scaleDelta}` : scaleDelta
        }（現在 ${nextScale}）`
      );

      // 最も少数派のアクションを特定（同数最小タイはすべて同列少数派）
      const countsByAction = { elephant: 0, squirrel: 0, fox: 0, monkey: 0 };
      working.forEach((p) => {
        const act = p.submittedAction || "elephant";
        countsByAction[act] += 1;
      });
      const minCount = Math.min(...ACTION_TYPES.map((a) => countsByAction[a]));
      const minorityActions = new Set(ACTION_TYPES.filter((a) => countsByAction[a] === minCount));

      // 最も少数派アクション選択者のうち、今Rの親から時計回りで一番近い人を探す
      let startDrawIndex = prev.parentIndex;
      for (let offset = 0; offset < n; offset++) {
        const idx = (prev.parentIndex + offset) % n;
        if (minorityActions.has(working[idx].submittedAction)) {
          startDrawIndex = idx;
          break;
        }
      }

      // サプライ返却と手札からの提出カード除外
      // 仕様: 今R使用のゾウ・リスと、前Rから手元にあったキツネ・サルを共有サプライへ返却
      // 今R提出のキツネ・サルはサプライに入れず、各自の前に表向きで残し、次R役職不可にする
      const nextSupply = { ...prev.supply };

      working.forEach((p) => {
        // 前ラウンドから手元に置かれていたキツネ・サルをサプライへ返却
        if (p.heldCards.length > 0) {
          p.heldCards.forEach((cardId) => {
            nextSupply[cardId] = (nextSupply[cardId] || 0) + 1;
          });
          p.heldCards = [];
        }

        const act = p.submittedAction || "elephant";
        // 手札から提出した1枚を除外
        const cardPos = p.hand.indexOf(act);
        if (cardPos !== -1) {
          p.hand.splice(cardPos, 1);
        }

        if (act === "elephant" || act === "squirrel") {
          nextSupply[act] = (nextSupply[act] || 0) + 1;
          p.lockedNextRound = false;
        } else {
          // キツネ or サル: 次のラウンド終了時まで手元に表向きで残し、次R役職不可
          p.heldCards = [act];
          p.lockedNextRound = true;
        }
      });

      // 仕様②修正: 少数派の人を先頭に時計回りで「全プレイヤー」が1枚ずつ補充し、常に4枚を維持
      const drawOrder = Array.from({ length: n }, (_, k) => (startDrawIndex + k) % n);
      const drawSummary = [];

      drawOrder.forEach((pIdx) => {
        const pl = working[pIdx];
        if (pl.hand.length >= 4) return;
        const availableAction = ACTION_TYPES.find((a) => (nextSupply[a] || 0) > 0);
        if (availableAction) {
          nextSupply[availableAction] -= 1;
          pl.hand.push(availableAction);
          drawSummary.push(`${pl.name}←${ACTION_META[availableAction].shortName}`);
        } else {
          drawSummary.push(`${pl.name}←(枯渇)`);
        }
      });

      logs.push(
        `[R${prev.round}-S6] 🔄 少数派先頭(${working[startDrawIndex].name})から時計回りで全員1枚補充: ${
          drawSummary.join(", ") || "なし"
        }`
      );

      const roundRecord = {
        round: prev.round,
        target: prev.target,
        baseActionContrib,
        voteDelta,
        finalContribution,
        scaleDelta,
        scaleAfter: nextScale,
        monkeyPenaltyTotal,
      };

      // 最終ラウンド（5R）終了時は次ラウンドへ進まず結果表示
      if (prev.round >= prev.maxRounds) {
        return {
          ...prev,
          players: working.map((p) => ({
            ...p,
            submittedAction: null,
            submittedRole: false,
            voteGreen: 0,
            voteRed: 0,
          })),
          supply: nextSupply,
          scale: nextScale,
          lastRoundResult: roundRecord,
          logs: [...logs, `🏁 全5ラウンド終了！最終「森の天秤」は ${nextScale} です。`],
        };
      }

      // 次ラウンドへ: 役職回収・シャッフル再配布、親を時計回りに1人進める
      const nextRound = prev.round + 1;
      const nextParent = (prev.parentIndex + 1) % n;
      const redealtRoles = dealRoles(n);

      const nextPlayers = working.map((p, idx) => ({
        ...p,
        role: redealtRoles[idx],
        submittedAction: null,
        submittedRole: false,
        owlTargetId: null,
        beaverTargetId: null,
        voteGreen: 0,
        voteRed: 0,
      }));

      const nextTarget = getDefaultTarget(nextRound, n);
      logs.push(
        `➡️ 第${nextRound}ラウンド開始！親は ${nextPlayers[nextParent].name}、課題目標値は ${nextTarget} です。`
      );

      return {
        ...prev,
        round: nextRound,
        step: 1,
        parentIndex: nextParent,
        scale: nextScale,
        target: nextTarget,
        supply: nextSupply,
        negotiationSubPhase: "right",
        negotiationSeconds: 60,
        preRevealDone: false,
        preRevealSummary: null,
        actionRevealDone: false,
        actionRevealSummary: null,
        monkeyPenaltyTargets: [],
        votingDone: false,
        lastRoundResult: roundRecord,
        players: nextPlayers,
        logs,
      };
    });
  };

  // 勝敗判定
  const isFinished = game.round === game.maxRounds && !!game.lastRoundResult;
  const herbivoreWins = game.scale >= config.herbMin && game.scale <= config.herbMax;

  // 天秤ゲージ位置（-15〜+20の範囲を0〜100%へマップ）
  const gaugeMin = -15;
  const gaugeMax = Math.max(20, config.herbMax + 5);
  const scalePercent = Math.max(
    0,
    Math.min(100, ((game.scale - gaugeMin) / (gaugeMax - gaugeMin)) * 100)
  );
  const herbStartPercent = Math.max(
    0,
    Math.min(100, ((config.herbMin - gaugeMin) / (gaugeMax - gaugeMin)) * 100)
  );
  const herbEndPercent = Math.max(
    0,
    Math.min(100, ((config.herbMax - gaugeMin) / (gaugeMax - gaugeMin)) * 100)
  );

  const greenTotal = game.players.reduce((acc, p) => acc + (p.voteGreen || 0), 0);
  const redTotal = game.players.reduce((acc, p) => acc + (p.voteRed || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* ヘッダー＆セットアップ */}
        <header className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-emerald-700" />
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                『森の会議』ボードゲーム検証・シミュレータ（修正版）
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              1台で5〜15人分を操作可能 ・ 見張り/策士先行解決＆少数派先頭時計回り全員1枚補充 反映済
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-sm font-medium bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
              <Users className="w-4 h-4 text-slate-700" />
              <span>人数:</span>
              <select
                value={setupCount}
                onChange={(e) => setSetupCount(Number(e.target.value))}
                className="bg-white border border-slate-300 rounded px-2 py-0.5 font-semibold"
              >
                {Array.from({ length: 11 }, (_, i) => i + 5).map((num) => (
                  <option key={num} value={num}>
                    {num}人
                  </option>
                ))}
              </select>
            </label>

            <button
              onClick={() => handleReset(setupCount)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              リセット開始
            </button>

            <button
              onClick={() => setGmView((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border cursor-pointer ${
                gmView
                  ? "bg-amber-100 border-amber-400 text-amber-950"
                  : "bg-slate-800 border-slate-800 text-white"
              }`}
            >
              {gmView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {gmView ? "GM視点（全情報表示）" : "プレイヤー視点（秘匿表示）"}
            </button>
          </div>
        </header>

        {/* ステータス＆森の天秤バー */}
        <section className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">ラウンド / ステップ</div>
              <div className="text-lg font-bold mt-0.5">
                R{game.round} / {game.maxRounds} <span className="text-emerald-700">Step {game.step}</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">現在の親（時計回り交代）</div>
              <div className="text-lg font-bold mt-0.5">
                👑 {game.players[game.parentIndex]?.name}（席#{game.parentIndex + 1}）
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">今回の課題目標値</div>
              <div className="text-lg font-bold mt-0.5 text-indigo-700">{game.target}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">森の天秤 現在位置</div>
              <div className="text-lg font-bold mt-0.5">
                {game.scale > 0 ? `+${game.scale}` : game.scale}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 col-span-2 md:col-span-1">
              <div className="text-xs text-slate-500">草食勝利ゾーン（H={config.herb}）</div>
              <div className="text-sm font-bold mt-1 text-emerald-800">{config.winText}</div>
            </div>
          </div>

          {/* 天秤ゲージ */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
              <span>🍖 肉食領域（{gaugeMin}〜{config.herbMin - 1}）</span>
              <span className="text-emerald-700 font-bold">
                🌿 草食勝利ゾーン（+{config.herbMin}〜+{config.herbMax}）
              </span>
              <span>🍖 肉食過剰領域（+{config.herbMax + 1}〜+{gaugeMax}）</span>
            </div>
            <div className="relative h-7 bg-rose-100 border border-slate-300 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-emerald-200 border-x border-emerald-500"
                style={{
                  left: `${herbStartPercent}%`,
                  width: `${Math.max(2, herbEndPercent - herbStartPercent)}%`,
                }}
              />
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-slate-900 transition-all duration-300"
                style={{ left: `calc(${scalePercent}% - 3px)` }}
                title={`現在: ${game.scale}`}
              />
            </div>
          </div>

          {/* 中央サプライ予備ストック */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Layers className="w-4 h-4 text-slate-600" />
              <span>中央補充サプライ予備:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ACTION_TYPES.map((actId) => {
                const m = ACTION_META[actId];
                return (
                  <span
                    key={actId}
                    className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 text-xs font-semibold"
                  >
                    {m.emoji} {m.shortName}: <strong>{game.supply[actId] ?? 0}</strong>枚
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* 最終結果バナー */}
        {isFinished && (
          <section
            className={`rounded-xl border-2 p-5 shadow-sm ${
              herbivoreWins
                ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                : "bg-rose-50 border-rose-500 text-rose-950"
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-xl font-bold">
                  第5ラウンド終了 — {herbivoreWins ? "🌿 草食陣営『実り豊かな森』の勝利！" : "🍖 肉食陣営『飢えと飽和の荒れ野』の勝利！"}
                </h2>
                <p className="text-sm mt-1">
                  最終天秤位置: <strong>{game.scale > 0 ? `+${game.scale}` : game.scale}</strong> / 草食勝利条件:{" "}
                  <strong>{config.winText}</strong>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* メイン進行パネル（Step 1〜6） */}
        <section className="bg-white rounded-xl border border-slate-300 p-4 md:p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((st) => (
                <button
                  key={st}
                  onClick={() => setGame((prev) => ({ ...prev, step: st }))}
                  className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold cursor-pointer ${
                    game.step === st
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Step {st}
                </button>
              ))}
            </div>

            {game.step < 6 && (
              <button
                onClick={() => setGame((prev) => ({ ...prev, step: Math.min(6, prev.step + 1) }))}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold cursor-pointer"
              >
                <span>次へ: Step {game.step + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Step 1: 課題公開 */}
          {game.step === 1 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold">Step 1: 課題目標値の公開</h2>
              <p className="text-sm text-slate-600">
                第{game.round}ラウンドの基準目標値は <strong>{game.target}</strong> です（必要に応じて微調整可能）。
              </p>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">目標値調整:</label>
                <input
                  type="number"
                  value={game.target}
                  onChange={(e) =>
                    setGame((prev) => ({ ...prev, target: Number(e.target.value) || 0 }))
                  }
                  className="w-24 border border-slate-300 rounded-lg px-3 py-1.5 font-bold"
                />
              </div>
            </div>
          )}

          {/* Step 2: 隣接交渉 */}
          {game.step === 2 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-700" />
                Step 2: 隣接交渉（右隣1分 → 左隣1分）
              </h2>
              <p className="text-sm text-slate-600">
                口頭での約束・推測・ブラフは自由。陣営カード・手札・未公開役職の現物提示は禁止です。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    setGame((prev) => ({
                      ...prev,
                      negotiationSubPhase: prev.negotiationSubPhase === "right" ? "left" : "right",
                    }))
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-amber-100 border border-amber-400 text-amber-950 text-sm font-semibold cursor-pointer"
                >
                  現在: {game.negotiationSubPhase === "right" ? "👉 右隣交渉フェーズ" : "👈 左隣交渉フェーズ"}（切替）
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 同時裏向き提出 */}
          {game.step === 3 && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold">Step 3: 同時裏向き提出</h2>
                  <p className="text-sm text-slate-600">
                    各プレイヤーがアクション1枚を選択し、役職使用可能（前Rキツネ/サル留置中でない）な人は役職発動の有無も設定します。
                  </p>
                </div>
                <button
                  onClick={handleRandomizeSubmissions}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold cursor-pointer"
                >
                  <Shuffle className="w-4 h-4" />
                  全員ランダム提出
                </button>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
                提出完了状況:{" "}
                <strong>
                  {game.players.filter((p) => !!p.submittedAction).length} / {game.playerCount}人
                </strong>
                （下のプレイヤー一覧または個別操作パネルから選択できます）
              </div>
            </div>
          )}

          {/* Step 4: 公開＆役職解決（見張り・策士を先行解決 → 残り一斉公開・調停者/運び屋） */}
          {game.step === 4 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold">Step 4: 公開＆役職解決</h2>
                  <p className="text-sm text-slate-600">
                    ①<strong>見張り・策士を先行解決</strong>してから、②<strong>残りアクション一斉公開・調停者・運び屋・影響力精算</strong>を行います。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleResolvePreReveal}
                    disabled={game.preRevealDone}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                      game.preRevealDone
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-700 text-white"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    ① 見張り・策士を先行解決
                  </button>

                  <button
                    onClick={handleResolveActionReveal}
                    disabled={!game.preRevealDone || game.actionRevealDone}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                      !game.preRevealDone || game.actionRevealDone
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-emerald-700 hover:bg-emerald-800 text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    ② 残り一斉公開＆精算
                  </button>
                </div>
              </div>

              {game.preRevealSummary && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 space-y-1">
                  <div className="text-xs font-bold text-amber-900">【先行解決（見張り・策士）結果】</div>
                  {game.preRevealSummary.map((line, i) => (
                    <div key={i} className="text-sm text-amber-950">
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {game.actionRevealSummary && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 space-y-1">
                  <div className="text-xs font-bold text-emerald-900">【一斉公開・調停者/運び屋 結果】</div>
                  {game.actionRevealSummary.messages.map((line, i) => (
                    <div key={i} className="text-sm text-emerald-950">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: 全体相談＆サル指差し多数決 */}
          {game.step === 5 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                Step 5: 全体相談（60秒）＆ サル指差し多数決
              </h2>
              <p className="text-sm text-slate-600">
                全体で議論後、今ラウンドでサルが出た枚数（<strong>{game.actionRevealSummary?.monkeyCount || 0}枚</strong>）だけ、指差し多数決で対象1人の影響力を-1します（同一人物が複数回選ばれることもあります）。
              </p>

              {(game.actionRevealSummary?.monkeyCount || 0) > 0 ? (
                <div className="space-y-2 bg-rose-50 border border-rose-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-rose-900">
                      サル指差し対象（{game.actionRevealSummary.monkeyCount}回分）
                    </span>
                    <button
                      onClick={handleRandomMonkeyTargets}
                      className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      ランダム指名
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: game.actionRevealSummary.monkeyCount }).map((_, idx) => (
                      <label key={idx} className="flex items-center gap-1.5 text-sm">
                        <span>#{idx + 1}回目:</span>
                        <select
                          value={game.monkeyPenaltyTargets[idx] ?? 0}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setGame((prev) => {
                              const next = [...prev.monkeyPenaltyTargets];
                              next[idx] = val;
                              return { ...prev, monkeyPenaltyTargets: next };
                            });
                          }}
                          className="border border-rose-300 bg-white rounded px-2 py-1"
                        >
                          {game.players.map((pl) => (
                            <option key={pl.id} value={pl.id}>
                              {pl.name}（現影響力: {pl.influence}）
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  今ラウンドはサルが出ていないため、指差し多数決はありません。
                </div>
              )}
            </div>
          )}

          {/* Step 6: 両面トークン投票・天秤移動・少数派先頭時計回り全員1枚補充 */}
          {game.step === 6 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Vote className="w-5 h-5 text-indigo-700" />
                    Step 6: 両面トークン投票・天秤移動・手札補充
                  </h2>
                  <p className="text-sm text-slate-600">
                    投票開示後に熱弁家・扇動者を適用し、天秤移動後、<strong>最も少数派アクション選択者のうち親から時計回りで一番近い人を先頭に、時計回りで全プレイヤーが1枚補充</strong>して次ラウンドへ進みます。
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleRandomizeVotes}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4" />
                    投票ランダム入力
                  </button>

                  <button
                    onClick={handleSettleAndAdvanceRound}
                    disabled={!game.actionRevealDone || isFinished}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                      !game.actionRevealDone || isFinished
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-indigo-700 hover:bg-indigo-800 text-white"
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    {game.round < game.maxRounds
                      ? `精算して 第${game.round + 1}ラウンドへ`
                      : "最終精算（ゲーム終了）"}
                  </button>
                </div>
              </div>

              {!game.actionRevealDone && (
                <div className="flex items-center gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-300 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>先に Step 4 で「①見張り・策士先行解決」と「②残り一斉公開＆精算」を実行してください。</span>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span>
                  現在の緑（賛成）合計: <strong className="text-emerald-700">{greenTotal}</strong>
                </span>
                <span>
                  現在の赤（反対）合計: <strong className="text-rose-700">{redTotal}</strong>
                </span>
              </div>
            </div>
          )}
        </section>

        {/* 選択中プレイヤー詳細操作パネル */}
        <section className="bg-white rounded-xl border border-slate-300 p-4 md:p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h2 className="text-base md:text-lg font-bold">
              個別プレイヤー操作: {selectedPlayer.name}（席#{selectedPlayer.id + 1}）
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {game.players.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlayerId(p.id)}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    selectedPlayerId === p.id
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {p.name}
                  {p.id === game.parentIndex ? "👑" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 陣営・役職・影響力 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="text-xs font-bold text-slate-500">ステータス</div>
              <div className="text-sm">
                陣営:{" "}
                <strong
                  className={
                    gmView
                      ? selectedPlayer.faction === "herbivore"
                        ? "text-emerald-700"
                        : "text-rose-700"
                      : "text-slate-500"
                  }
                >
                  {gmView
                    ? selectedPlayer.faction === "herbivore"
                      ? "🌿 草食陣営"
                      : "🍖 肉食陣営"
                    : "（秘匿）"}
                </strong>
              </div>
              <div className="text-sm">
                今R役職:{" "}
                <strong>
                  {gmView && selectedPlayer.role
                    ? `${ROLE_META[selectedPlayer.role].emoji} ${ROLE_META[selectedPlayer.role].name}`
                    : "（秘匿 / なし）"}
                </strong>
              </div>
              <div className="text-sm">
                手元トークン（最大8）: <strong>{selectedPlayer.influence}個</strong>
              </div>
              {selectedPlayer.lockedNextRound && (
                <div className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded">
                  🔒 今ラウンドは役職カード使用・公開不可（前Rキツネ/サル留置中）
                </div>
              )}
            </div>

            {/* アクション＆役職提出設定 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="text-xs font-bold text-slate-500">手札（4枚）からアクション選択</div>
              <div className="grid grid-cols-2 gap-1.5">
                {selectedPlayer.hand.map((actId) => {
                  const m = ACTION_META[actId];
                  const active = selectedPlayer.submittedAction === actId;
                  return (
                    <button
                      key={actId}
                      onClick={() => updatePlayer(selectedPlayer.id, { submittedAction: actId })}
                      className={`p-2 rounded border text-left text-xs cursor-pointer ${
                        active
                          ? "bg-emerald-700 text-white border-emerald-800 font-bold"
                          : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      <div>
                        {m.emoji} {m.shortName}
                      </div>
                      <div className="opacity-80">{m.desc}</div>
                    </button>
                  );
                })}
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs font-semibold">
                <input
                  type="checkbox"
                  disabled={selectedPlayer.lockedNextRound || !selectedPlayer.role}
                  checked={!!selectedPlayer.submittedRole}
                  onChange={(e) =>
                    updatePlayer(selectedPlayer.id, { submittedRole: e.target.checked })
                  }
                />
                <span>このラウンドで役職カードを発動する</span>
              </label>

              {!selectedPlayer.lockedNextRound && selectedPlayer.role === "owl" && (
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <select
                    value={selectedPlayer.owlTargetId ?? ""}
                    onChange={(e) =>
                      updatePlayer(selectedPlayer.id, { owlTargetId: Number(e.target.value) })
                    }
                    className="border border-slate-300 bg-white rounded px-2 py-1"
                  >
                    <option value="">見張り対象を選択</option>
                    {game.players
                      .filter((p) => p.id !== selectedPlayer.id)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                  <select
                    value={selectedPlayer.owlGuessAction}
                    onChange={(e) =>
                      updatePlayer(selectedPlayer.id, { owlGuessAction: e.target.value })
                    }
                    className="border border-slate-300 bg-white rounded px-2 py-1"
                  >
                    {ACTION_TYPES.map((a) => (
                      <option key={a} value={a}>
                        宣言: {ACTION_META[a].shortName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!selectedPlayer.lockedNextRound && selectedPlayer.role === "beaver" && (
                <div className="pt-1 text-xs">
                  <select
                    value={selectedPlayer.beaverTargetId ?? ""}
                    onChange={(e) =>
                      updatePlayer(selectedPlayer.id, { beaverTargetId: Number(e.target.value) })
                    }
                    className="border border-slate-300 bg-white rounded px-2 py-1"
                  >
                    <option value="">調停者（譲渡先）を選択</option>
                    {game.players
                      .filter((p) => p.id !== selectedPlayer.id)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            {/* 投票トークン設定 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="text-xs font-bold text-slate-500">
                両面トークン投票（所持: {selectedPlayer.influence}個）
              </div>
              <div className="flex items-center gap-3 text-sm">
                <label className="flex items-center gap-1">
                  <span className="text-emerald-700 font-bold">緑（賛成）:</span>
                  <input
                    type="number"
                    min={0}
                    max={selectedPlayer.influence}
                    value={selectedPlayer.voteGreen || 0}
                    onChange={(e) => {
                      const g = Math.max(0, Math.min(selectedPlayer.influence, Number(e.target.value) || 0));
                      const maxR = Math.max(0, selectedPlayer.influence - g);
                      updatePlayer(selectedPlayer.id, (p) => ({
                        ...p,
                        voteGreen: g,
                        voteRed: Math.min(p.voteRed || 0, maxR),
                      }));
                    }}
                    className="w-16 border border-slate-300 bg-white rounded px-2 py-1"
                  />
                </label>

                <label className="flex items-center gap-1">
                  <span className="text-rose-700 font-bold">赤（反対）:</span>
                  <input
                    type="number"
                    min={0}
                    max={Math.max(0, selectedPlayer.influence - (selectedPlayer.voteGreen || 0))}
                    value={selectedPlayer.voteRed || 0}
                    onChange={(e) => {
                      const maxR = Math.max(0, selectedPlayer.influence - (selectedPlayer.voteGreen || 0));
                      const r = Math.max(0, Math.min(maxR, Number(e.target.value) || 0));
                      updatePlayer(selectedPlayer.id, { voteRed: r });
                    }}
                    className="w-16 border border-slate-300 bg-white rounded px-2 py-1"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-500">
                ※ 投票で使用したトークンは精算時に中央サプライへ返却されます。
              </p>
            </div>
          </div>
        </section>

        {/* 全プレイヤー一覧テーブル */}
        <section className="bg-white rounded-xl border border-slate-300 p-4 md:p-5 shadow-sm space-y-3">
          <h2 className="text-base md:text-lg font-bold">全プレイヤー一覧（時計回り順）</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-left">
                  <th className="p-2">席</th>
                  <th className="p-2">名前</th>
                  <th className="p-2">陣営</th>
                  <th className="p-2">今R役職</th>
                  <th className="p-2">手札</th>
                  <th className="p-2">影響力</th>
                  <th className="p-2">手元留置</th>
                  <th className="p-2">提出アクション</th>
                  <th className="p-2">役職伏せ</th>
                  <th className="p-2">投票(緑/赤)</th>
                </tr>
              </thead>
              <tbody>
                {game.players.map((p) => {
                  const showAct = gmView || game.step >= 4;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPlayerId(p.id)}
                      className={`border-b border-slate-200 cursor-pointer ${
                        selectedPlayerId === p.id ? "bg-emerald-50/70" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="p-2 font-mono">#{p.id + 1}</td>
                      <td className="p-2 font-bold">
                        {p.name} {p.id === game.parentIndex ? "👑" : ""}
                      </td>
                      <td className="p-2">
                        {gmView ? (
                          p.faction === "herbivore" ? (
                            <span className="text-emerald-700 font-semibold">🌿 草食</span>
                          ) : (
                            <span className="text-rose-700 font-semibold">🍖 肉食</span>
                          )
                        ) : (
                          <span className="text-slate-400">秘匿</span>
                        )}
                      </td>
                      <td className="p-2">
                        {gmView && p.role ? (
                          <span>
                            {ROLE_META[p.role].emoji} {ROLE_META[p.role].shortName}
                          </span>
                        ) : (
                          <span className="text-slate-400">秘匿</span>
                        )}
                      </td>
                      <td className="p-2">
                        {gmView
                          ? p.hand.map((a) => ACTION_META[a].shortName).join(", ")
                          : `${p.hand.length}枚`}
                      </td>
                      <td className="p-2 font-bold">{p.influence}個</td>
                      <td className="p-2">
                        {p.heldCards.length > 0
                          ? p.heldCards.map((c) => ACTION_META[c].shortName).join(",")
                          : "-"}
                      </td>
                      <td className="p-2">
                        {p.submittedAction ? (
                          showAct ? (
                            <span className="font-semibold">
                              {ACTION_META[p.submittedAction].emoji}{" "}
                              {ACTION_META[p.submittedAction].shortName}
                            </span>
                          ) : (
                            <span className="text-indigo-700 font-semibold">伏せ済</span>
                          )
                        ) : (
                          <span className="text-slate-400">未提出</span>
                        )}
                      </td>
                      <td className="p-2">
                        {p.lockedNextRound ? (
                          <span className="text-rose-600 font-semibold">使用不可</span>
                        ) : p.submittedRole ? (
                          <span className="text-amber-700 font-semibold">伏せ済</span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-2 font-mono">
                        {p.voteGreen || 0} / {p.voteRed || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 進行ログ */}
        <section className="bg-white rounded-xl border border-slate-300 p-4 md:p-5 shadow-sm space-y-2">
          <h2 className="text-base font-bold">進行ログ</h2>
          <div className="max-h-60 overflow-y-auto bg-slate-950 text-slate-100 rounded-lg p-3 font-mono text-xs space-y-1">
            {game.logs.map((entry, i) => (
              <div key={i}>{entry}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
