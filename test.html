import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  Users, 
  HelpCircle, 
  RotateCcw, 
  Play, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Info, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Dices,
  Layers,
  ArrowRight
} from 'lucide-react';

// ==========================================
// CONSTANTS & GAME DATA CONFIGURATIONS
// ==========================================

const ACTION_CARDS = {
  ELEPHANT: { name: 'ゾウ（全力奉仕）', animal: '🐘 ゾウ', contribution: 3, influence: 0, icon: '🐘', coolDown: false },
  SQUIRREL: { name: 'リス（堅実な備蓄）', animal: '🐿️ リス', contribution: 1, influence: 1, icon: '🐿️', coolDown: false },
  FOX:      { name: 'キツネ（秘密の工作）', animal: '🦊 キツネ', contribution: -1, influence: 3, icon: '🦊', coolDown: true },
  MONKEY:   { name: 'サル（議論の撹乱）', animal: '🐒 サル', contribution: -2, influence: 1, icon: '🐒', coolDown: true },
};

const ROLES = {
  LION:    { name: '熱弁家', animal: 'ライオン 🦁', timing: '投票時', desc: '緑(賛成)を1枚以上出すと賛成+2' },
  BEAVER:  { name: '調停者', animal: 'ビーバー 🦫', timing: '公開直後', desc: 'サルが出たら全体のマイナスを1回分(-2→0)無効化' },
  DOVE:    { name: '運び屋', animal: 'ハト 🕊️', timing: '公開直後', desc: '他のプレイヤー1人に影響力トークンを1個渡す' },
  OCTOPUS: { name: '策士',   animal: 'タコ 🐙', timing: '見張り後', desc: '自分がキツネならオープンして影響力+1' },
  WOLF:    { name: '扇動者', animal: 'オオカミ 🐺', timing: '投票時', desc: '赤(反対)を1枚以上出すと反対合計-2(マイナス2強化)' },
  OWL:     { name: '見張り', animal: 'フクロウ 🦉', timing: '公開前', desc: '他者1人とカード種宣言し公開。的中なら影響力+1' },
};

// Configuration Table per player count (5 to 15) as defined in Spec Sheet p.2-p.3
const CONFIG_BY_PLAYERS = {
  5:  { herbivores: 3,  carnivores: 2, roles: ['LION', 'BEAVER', 'DOVE', 'OCTOPUS', 'WOLF'], supply: { ELEPHANT: 1, SQUIRREL: 1, FOX: 1, MONKEY: 1 }, winZone: [1, 8] },
  6:  { herbivores: 4,  carnivores: 2, roles: ['LION', 'BEAVER', 'DOVE', 'OCTOPUS', 'WOLF', 'OWL'], supply: { ELEPHANT: 2, SQUIRREL: 2, FOX: 1, MONKEY: 1 }, winZone: [1, 9] },
  7:  { herbivores: 5,  carnivores: 2, roles: ['LION', 'LION', 'BEAVER', 'DOVE', 'OCTOPUS', 'WOLF', 'OWL'], supply: { ELEPHANT: 2, SQUIRREL: 2, FOX: 1, MONKEY: 1 }, winZone: [1, 10] },
  8:  { herbivores: 5,  carnivores: 3, roles: ['LION', 'LION', 'BEAVER', 'DOVE', 'OCTOPUS', 'WOLF', 'WOLF', 'OWL'], supply: { ELEPHANT: 2, SQUIRREL: 2, FOX: 1, MONKEY: 1 }, winZone: [1, 10] },
  9:  { herbivores: 6,  carnivores: 3, roles: ['LION', 'LION', 'BEAVER', 'BEAVER', 'DOVE', 'OCTOPUS', 'WOLF', 'WOLF', 'OWL'], supply: { ELEPHANT: 3, SQUIRREL: 3, FOX: 1, MONKEY: 1 }, winZone: [1, 11] },
  10: { herbivores: 6,  carnivores: 4, roles: ['LION', 'LION', 'BEAVER', 'BEAVER', 'DOVE', 'OCTOPUS', 'OCTOPUS', 'WOLF', 'WOLF', 'OWL'], supply: { ELEPHANT: 3, SQUIRREL: 3, FOX: 2, MONKEY: 1 }, winZone: [1, 11] },
  11: { herbivores: 7,  carnivores: 4, roles: ['LION', 'LION', 'BEAVER', 'BEAVER', 'DOVE', 'DOVE', 'OCTOPUS', 'OCTOPUS', 'WOLF', 'WOLF', 'OWL'], supply: { ELEPHANT: 3, SQUIRREL: 3, FOX: 2, MONKEY: 2 }, winZone: [1, 12] },
  12: { herbivores: 8,  carnivores: 4, roles: ['LION', 'LION', 'LION', 'BEAVER', 'BEAVER', 'DOVE', 'DOVE', 'OCTOPUS', 'OCTOPUS', 'WOLF', 'WOLF', 'OWL'], supply: { ELEPHANT: 3, SQUIRREL: 3, FOX: 2, MONKEY: 2 }, winZone: [1, 13] },
  13: { herbivores: 9,  carnivores: 4, roles: ['LION', 'LION', 'LION', 'BEAVER', 'BEAVER', 'DOVE', 'DOVE', 'OCTOPUS', 'OCTOPUS', 'WOLF', 'WOLF', 'OWL', 'OWL'], supply: { ELEPHANT: 4, SQUIRREL: 4, FOX: 2, MONKEY: 2 }, winZone: [1, 14] },
  14: { herbivores: 9,  carnivores: 5, roles: ['LION', 'LION', 'LION', 'BEAVER', 'BEAVER', 'DOVE', 'DOVE', 'OCTOPUS', 'OCTOPUS', 'WOLF', 'WOLF', 'WOLF', 'OWL', 'OWL'], supply: { ELEPHANT: 4, SQUIRREL: 4, FOX: 2, MONKEY: 2 }, winZone: [1, 14] },
  15: { herbivores: 10, carnivores: 5, roles: ['LION', 'LION', 'LION', 'BEAVER', 'BEAVER', 'BEAVER', 'DOVE', 'DOVE', 'OCTOPUS', 'OCTOPUS', 'WOLF', 'WOLF', 'WOLF', 'OWL', 'OWL'], supply: { ELEPHANT: 4, SQUIRREL: 4, FOX: 2, MONKEY: 2 }, winZone: [1, 15] },
};

// Target values helper
const getTargetValue = (round, playerCount) => {
  switch (round) {
    case 1: return playerCount;       // R1 = N
    case 2: return playerCount + 2;   // R2 = N+2
    case 3: return playerCount + 4;   // R3 = N+4
    case 4: return playerCount + 1;   // R4 = N+1
    case 5: return playerCount + 5;   // R5 = N+5
    default: return playerCount;
  }
};

// Helper Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // Game Setup States
  const [numPlayers, setNumPlayers] = useState(5);
  const [gameState, setGameState] = useState('SETUP'); // SETUP, STEP1, STEP2, STEP3, STEP4_LOOKOUT, STEP4_TACTICIAN, STEP4_REVEAL, STEP4_CARRIER, STEP5, STEP6_VOTE, STEP6_RESULT, STEP6_DRAFT, GAME_OVER
  const [round, setRound] = useState(1);
  const [dealerIndex, setDealerIndex] = useState(0);
  const [balance, setBalance] = useState(0);
  const [targetValue, setTargetValue] = useState(5);
  const [supply, setSupply] = useState({ ELEPHANT: 1, SQUIRREL: 1, FOX: 1, MONKEY: 1 });
  const [players, setPlayers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [debugMode, setDebugMode] = useState(true); // Toggle hidden info for testing

  // Timer state for Step 2 & Step 5
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPhase, setTimerPhase] = useState('RIGHT'); // 'RIGHT' or 'LEFT' for step 2

  // Interactive Sub-Step States
  // Step 4.1: Lookout owl declarations
  const [lookoutActions, setLookoutActions] = useState({}); // owlPlayerId: { targetId, declaredCard }
  // Step 4.4: Carrier dove transfers
  const [carrierTransfers, setCarrierTransfers] = useState({}); // dovePlayerId: targetId
  // Step 5: Monkey target selections
  const [monkeyTargets, setMonkeyTargets] = useState([]); // array of targetPlayerIds
  // Step 6: Draft Queue
  const [draftQueue, setDraftQueue] = useState([]); // array of playerIds who need to draft
  const [currentDrafterIndex, setCurrentDrafterIndex] = useState(0);
  // Temporary step 6 calculation results
  const [step6Calc, setStep6Calc] = useState(null);

  // Active player config
  const activeConfig = useMemo(() => CONFIG_BY_PLAYERS[numPlayers], [numPlayers]);

  // Log Helper
  const addLog = (msg) => {
    setLogs((prev) => [`[R${round}] ${msg}`, ...prev]);
  };

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (gameState === 'STEP2' && timerPhase === 'RIGHT') {
        setTimerPhase('LEFT');
        setTimer(60);
        addLog('隣接交渉：左隣との交渉開始（60秒）');
        setIsTimerRunning(true);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, gameState, timerPhase]);

  // Init New Game
  const initGame = () => {
    const config = CONFIG_BY_PLAYERS[numPlayers];
    
    // Factions
    let factionPool = [
      ...Array(config.herbivores).fill('HERBIVORE'),
      ...Array(config.carnivores).fill('CARNIVORE')
    ];
    factionPool = shuffle(factionPool);

    // Roles
    let rolePool = shuffle([...config.roles]);

    const newPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      newPlayers.push({
        id: i,
        name: `P${i + 1}`,
        faction: factionPool[i],
        role: rolePool[i],
        hand: ['ELEPHANT', 'SQUIRREL', 'FOX', 'MONKEY'],
        tokens: 3,
        coolDownCard: null,
        // Turn states
        selectedAction: null,
        useRole: false,
        lookoutRevealed: false,
        voteColor: 'NONE',
        voteAmount: 0,
      });
    }

    setPlayers(newPlayers);
    setSupply({ ...config.supply });
    setBalance(0);
    setRound(1);
    setDealerIndex(0);
    setTargetValue(getTargetValue(1, numPlayers));
    setLogs([`=== 『森の会議』テスト開始 (人数: ${numPlayers}人 / 草食:${config.herbivores} 肉食:${config.carnivores}) ===`]);
    setGameState('STEP1');
  };

  // Move to Step 1
  const startStep1 = () => {
    setGameState('STEP1');
    setTargetValue(getTargetValue(round, numPlayers));
    addLog(`--- 第${round}ラウンド 開始 (親: P${dealerIndex + 1}, 目標値: ${getTargetValue(round, numPlayers)}) ---`);
  };

  // Move to Step 2
  const startStep2 = () => {
    setGameState('STEP2');
    setTimer(60);
    setTimerPhase('RIGHT');
    setIsTimerRunning(true);
    addLog('Step 2: 隣接交渉開始（右隣1分）');
  };

  // Move to Step 3
  const startStep3 = () => {
    setIsTimerRunning(false);
    setGameState('STEP3');
    addLog('Step 3: アクションカード & 役職使用選択');
  };

  // Step 3 Randomize inputs
  const autoFillStep3 = () => {
    setPlayers(prev => prev.map(p => {
      // Pick random from available hand
      const randomAction = p.hand[Math.floor(Math.random() * p.hand.length)];
      // Decide role use if available
      const canUseRole = !p.coolDownCard;
      const useRole = canUseRole ? Math.random() > 0.4 : false;
      return {
        ...p,
        selectedAction: randomAction,
        useRole: useRole
      };
    }));
  };

  // Confirm Step 3 and proceed to Step 4
  const submitStep3 = () => {
    // Validation
    const unselected = players.find(p => !p.selectedAction);
    if (unselected) {
      alert(`${unselected.name} の提出アクションカードを選択してください。`);
      return;
    }

    addLog('Step 3 完了: 全員のカードが伏せて提出されました。');

    // Check for Owls
    const owls = players.filter(p => p.useRole && !p.coolDownCard && p.role === 'OWL');
    if (owls.length > 0) {
      // Setup lookout inputs
      const initialLookout = {};
      owls.forEach(o => {
        // pick first available target that is not self
        const defaultTarget = players.find(p => p.id !== o.id)?.id || 0;
        initialLookout[o.id] = { targetId: defaultTarget, declaredCard: 'ELEPHANT' };
      });
      setLookoutActions(initialLookout);
      setGameState('STEP4_LOOKOUT');
      addLog('Step 4.1: 見張り（フクロウ）の能力解決');
    } else {
      proceedToTactician();
    }
  };

  // Step 4.1 Resolve Lookout
  const resolveLookout = () => {
    let updatedPlayers = [...players];
    const owls = updatedPlayers.filter(p => p.useRole && !p.coolDownCard && p.role === 'OWL');

    // Resolve in order starting from dealer
    const sortedOwls = [...owls].sort((a, b) => {
      const distA = (a.id - dealerIndex + numPlayers) % numPlayers;
      const distB = (b.id - dealerIndex + numPlayers) % numPlayers;
      return distA - distB;
    });

    sortedOwls.forEach(owl => {
      const choice = lookoutActions[owl.id];
      if (choice) {
        const target = updatedPlayers.find(p => p.id === choice.targetId);
        if (target) {
          const hit = target.selectedAction === choice.declaredCard;
          target.lookoutRevealed = true;
          if (hit) {
            owl.tokens = Math.min(8, owl.tokens + 1);
            addLog(`🦉 【見張り成功】 ${owl.name} が ${target.name} の 『${ACTION_CARDS[choice.declaredCard].name}』 を的中！ (${owl.name} 影響力+1 -> ${owl.tokens})`);
          } else {
            addLog(`🦉 【見張り失敗】 ${owl.name} が ${target.name} に 『${ACTION_CARDS[choice.declaredCard].name}』 を宣言したが不的中 (実際は ${ACTION_CARDS[target.selectedAction].name})。`);
          }
        }
      }
    });

    setPlayers(updatedPlayers);
    proceedToTactician();
  };

  // Step 4.2 Tactician
  const proceedToTactician = () => {
    const tacticians = players.filter(p => p.useRole && !p.coolDownCard && p.role === 'OCTOPUS');
    if (tacticians.length > 0) {
      setGameState('STEP4_TACTICIAN');
      addLog('Step 4.2: 策士（タコ）の能力解決');
    } else {
      resolveStep4Reveal();
    }
  };

  // Step 4.2 Resolve Tactician
  const resolveTactician = () => {
    let updatedPlayers = [...players];
    const tacticians = updatedPlayers.filter(p => p.useRole && !p.coolDownCard && p.role === 'OCTOPUS');

    tacticians.forEach(tac => {
      if (tac.selectedAction === 'FOX') {
        tac.tokens = Math.min(8, tac.tokens + 1);
        addLog(`🐙 【策士成功】 ${tac.name} はキツネを提出していたためオープン！ 影響力+1 (現在:${tac.tokens})`);
      } else {
        addLog(`🐙 【策士不発】 ${tac.name} は策士を公開したが、キツネではなく ${ACTION_CARDS[tac.selectedAction].name} でした。`);
      }
    });

    setPlayers(updatedPlayers);
    resolveStep4Reveal();
  };

  // Step 4.3 All Reveal & Settlement
  const resolveStep4Reveal = () => {
    let updatedPlayers = [...players];

    // Count monkeys & Beavers
    const monkeysCount = updatedPlayers.filter(p => p.selectedAction === 'MONKEY').length;
    const beavers = updatedPlayers.filter(p => p.useRole && !p.coolDownCard && p.role === 'BEAVER');
    const validBeaversCount = Math.min(monkeysCount, beavers.length);

    // Calculate base contribution
    let rawContribution = 0;
    updatedPlayers.forEach(p => {
      rawContribution += ACTION_CARDS[p.selectedAction].contribution;
    });

    // Beaver adjustment: +2 per valid beaver (cancelling -2 of monkey)
    const beaverBonus = validBeaversCount * 2;
    const adjustedContribution = rawContribution + beaverBonus;

    if (beavers.length > 0 && monkeysCount > 0) {
      addLog(`🦫 【調停者発動】 サル${monkeysCount}枚に対し調停者${validBeaversCount}名が効果発動！ マイナス補正を+${beaverBonus}無効化。`);
    }

    // Apply Card Influence gains (max 8) & remove used action card from hand
    updatedPlayers = updatedPlayers.map(p => {
      const card = ACTION_CARDS[p.selectedAction];
      const newTokens = Math.min(8, p.tokens + card.influence);
      const newHand = p.hand.filter((c, idx) => {
        // remove one instance of selectedAction
        const firstIdx = p.hand.indexOf(p.selectedAction);
        return idx !== firstIdx;
      });

      return {
        ...p,
        tokens: newTokens,
        hand: newHand
      };
    });

    setPlayers(updatedPlayers);
    addLog(`Step 4.3 アクション一斉公開: 基本貢献値 ${rawContribution} (調停者補正後: ${adjustedContribution})`);

    // Check for Carrier (Dove)
    const doves = updatedPlayers.filter(p => p.useRole && !p.coolDownCard && p.role === 'DOVE');
    if (doves.length > 0) {
      const initialCarriers = {};
      doves.forEach(d => {
        const defaultTarget = updatedPlayers.find(p => p.id !== d.id)?.id || 0;
        initialCarriers[d.id] = defaultTarget;
      });
      setCarrierTransfers(initialCarriers);
      setGameState('STEP4_CARRIER');
      addLog('Step 4.4: 運び屋（ハト）のトークン譲渡');
    } else {
      startStep5(monkeysCount);
    }
  };

  // Step 4.4 Resolve Carrier
  const resolveCarrier = () => {
    let updatedPlayers = [...players];
    const doves = updatedPlayers.filter(p => p.useRole && !p.coolDownCard && p.role === 'DOVE');

    // Sort order
    const sortedDoves = [...doves].sort((a, b) => {
      const distA = (a.id - dealerIndex + numPlayers) % numPlayers;
      const distB = (b.id - dealerIndex + numPlayers) % numPlayers;
      return distA - distB;
    });

    sortedDoves.forEach(dove => {
      const targetId = carrierTransfers[dove.id];
      const target = updatedPlayers.find(p => p.id === targetId);
      if (dove.tokens > 0 && target) {
        dove.tokens -= 1;
        target.tokens = Math.min(8, target.tokens + 1);
        addLog(`🕊️ 【運び屋解決】 ${dove.name} が ${target.name} に影響力トークンを1個譲渡しました。`);
      } else if (dove.tokens === 0) {
        addLog(`🕊️ 【運び屋不発】 ${dove.name} は影響力トークンを0個しか持っていないため譲渡できませんでした。`);
      }
    });

    setPlayers(updatedPlayers);
    const monkeysCount = updatedPlayers.filter(p => p.selectedAction === 'MONKEY').length;
    startStep5(monkeysCount);
  };

  // Move to Step 5
  const startStep5 = (monkeysCount) => {
    setGameState('STEP5');
    setTimer(60);
    setIsTimerRunning(true);
    // Prepare monkey targets array if monkeys played
    setMonkeyTargets(Array(monkeysCount).fill(0));
    addLog(`Step 5: 全体相談開始（60秒） ${monkeysCount > 0 ? `※サルが${monkeysCount}枚出ているため多数決で${monkeysCount}名指名` : ''}`);
  };

  // Resolve Monkey Targets
  const resolveMonkeyTargets = () => {
    if (monkeyTargets.length > 0) {
      let updatedPlayers = [...players];
      monkeyTargets.forEach((targetId, idx) => {
        const target = updatedPlayers.find(p => p.id === targetId);
        if (target && target.tokens > 0) {
          target.tokens -= 1;
          addLog(`🐒 【サル指差し多数決 ${idx + 1}回目】 ${target.name} の影響力を-1 (現在:${target.tokens})`);
        } else if (target) {
          addLog(`🐒 【サル指差し多数決 ${idx + 1}回目】 ${target.name} が選ばれましたが影響力は既に0でした。`);
        }
      });
      setPlayers(updatedPlayers);
    }
    startStep6Vote();
  };

  // Move to Step 6 Vote
  const startStep6Vote = () => {
    setIsTimerRunning(false);
    setGameState('STEP6_VOTE');
    addLog('Step 6: 両面トークン投票フェーズ（緑=賛成 / 赤=反対）');
  };

  // Auto fill votes for testing
  const autoFillStep6Vote = () => {
    setPlayers(prev => prev.map(p => {
      if (p.tokens === 0) {
        return { ...p, voteColor: 'NONE', voteAmount: 0 };
      }
      const choices = ['GREEN', 'RED', 'NONE'];
      const color = choices[Math.floor(Math.random() * choices.length)];
      const amount = color === 'NONE' ? 0 : Math.floor(Math.random() * p.tokens) + 1;
      return {
        ...p,
        voteColor: color,
        voteAmount: amount
      };
    }));
  };

  // Submit Votes and compute result
  const submitVotes = () => {
    let greenTotal = 0;
    let redTotal = 0;
    let lionCount = 0;
    let wolfCount = 0;

    let updatedPlayers = [...players];

    updatedPlayers.forEach(p => {
      if (p.voteColor === 'GREEN' && p.voteAmount > 0) {
        greenTotal += p.voteAmount;
        if (p.useRole && !p.coolDownCard && p.role === 'LION') {
          lionCount++;
        }
      } else if (p.voteColor === 'RED' && p.voteAmount > 0) {
        redTotal += p.voteAmount;
        if (p.useRole && !p.coolDownCard && p.role === 'WOLF') {
          wolfCount++;
        }
      }
      // Deduct spent tokens
      p.tokens = Math.max(0, p.tokens - p.voteAmount);
    });

    const lionBonus = lionCount * 2;
    const wolfBonus = wolfCount * 2; // Subtracts 2 from total

    // Calculate card contributions
    const monkeysCount = updatedPlayers.filter(p => p.selectedAction === 'MONKEY').length;
    const beavers = updatedPlayers.filter(p => p.useRole && !p.coolDownCard && p.role === 'BEAVER');
    const validBeaversCount = Math.min(monkeysCount, beavers.length);
    
    let rawActionContrib = 0;
    updatedPlayers.forEach(p => {
      rawActionContrib += ACTION_CARDS[p.selectedAction].contribution;
    });
    const actionContrib = rawActionContrib + (validBeaversCount * 2);

    const netVote = (greenTotal + lionBonus) - (redTotal + wolfBonus);
    const finalContribution = actionContrib + netVote;
    const delta = finalContribution - targetValue;
    const newBalance = balance + delta;

    const calcObj = {
      actionContrib,
      greenTotal,
      lionBonus,
      redTotal,
      wolfBonus,
      netVote,
      finalContribution,
      targetValue,
      delta,
      newBalance
    };

    setStep6Calc(calcObj);
    setBalance(newBalance);
    setPlayers(updatedPlayers);

    addLog(`Step 6 投票結果: 賛成(緑:${greenTotal} + 熱弁:${lionBonus}) - 反対(赤:${redTotal} + 扇動:${wolfBonus}) = ネット:${netVote}`);
    addLog(`最終貢献値: ${finalContribution} (目標値: ${targetValue}) -> 天秤移動量: ${delta > 0 ? `+${delta}` : delta} (天秤現在地: ${newBalance})`);

    setGameState('STEP6_RESULT');
  };

  // Move to Draft & Supply Cleanup
  const proceedToDraft = () => {
    let updatedSupply = { ...supply };
    let updatedPlayers = [...players];

    // 1. Return Elephant/Squirrel played THIS round to supply
    // 2. Return Fox/Monkey played PREVIOUS round (coolDownCard) to supply
    updatedPlayers.forEach(p => {
      if (p.selectedAction === 'ELEPHANT' || p.selectedAction === 'SQUIRREL') {
        updatedSupply[p.selectedAction] += 1;
      }
      if (p.coolDownCard === 'FOX' || p.coolDownCard === 'MONKEY') {
        updatedSupply[p.coolDownCard] += 1;
      }
    });

    // 3. Set new coolDownCard for next round for Fox/Monkey played THIS round
    updatedPlayers = updatedPlayers.map(p => {
      const isCoolDown = p.selectedAction === 'FOX' || p.selectedAction === 'MONKEY';
      return {
        ...p,
        coolDownCard: isCoolDown ? p.selectedAction : null
      };
    });

    // Determine minority action card played this round
    const counts = { ELEPHANT: 0, SQUIRREL: 0, FOX: 0, MONKEY: 0 };
    updatedPlayers.forEach(p => {
      counts[p.selectedAction] += 1;
    });

    // Find min count among played actions (>0)
    let minCount = Infinity;
    Object.values(counts).forEach(c => {
      if (c > 0 && c < minCount) minCount = c;
    });

    const minorityActions = Object.keys(counts).filter(k => counts[k] === minCount && minCount > 0);

    // Identify eligible drafters (who played one of the minority actions)
    const eligibleDrafters = updatedPlayers.filter(p => minorityActions.includes(p.selectedAction));

    // Sort eligible drafters starting from dealer clockwise
    eligibleDrafters.sort((a, b) => {
      const distA = (a.id - dealerIndex + numPlayers) % numPlayers;
      const distB = (b.id - dealerIndex + numPlayers) % numPlayers;
      return distA - distB;
    });

    const queue = eligibleDrafters.map(p => p.id);

    setSupply(updatedSupply);
    setPlayers(updatedPlayers);
    setDraftQueue(queue);
    setCurrentDrafterIndex(0);

    if (queue.length > 0) {
      setGameState('STEP6_DRAFT');
      addLog(`サプライ返却・補充開始: 少数派アクション 『${minorityActions.map(a => ACTION_CARDS[a].name).join(', ')}』 のプレイヤー${queue.length}名が補充開始。`);
    } else {
      finishRound();
    }
  };

  // Perform Draft Selection for current drafter
  const handleDraftSelect = (cardKey) => {
    if (supply[cardKey] <= 0) return;

    const drafterId = draftQueue[currentDrafterIndex];
    
    // Update Supply
    setSupply(prev => ({ ...prev, [cardKey]: prev[cardKey] - 1 }));

    // Add card to player hand
    setPlayers(prev => prev.map(p => {
      if (p.id === drafterId) {
        return {
          ...p,
          hand: [...p.hand, cardKey]
        };
      }
      return p;
    }));

    const drafter = players.find(p => p.id === drafterId);
    addLog(`📦 【カード補充】 ${drafter.name} がサプライから 『${ACTION_CARDS[cardKey].name}』 を1枚手札に補充しました。`);

    if (currentDrafterIndex + 1 < draftQueue.length) {
      setCurrentDrafterIndex(prev => prev + 1);
    } else {
      finishRound();
    }
  };

  // Finish Round and check Game Over or proceed to next Round
  const finishRound = () => {
    if (round >= 5) {
      setGameState('GAME_OVER');
      const winMin = activeConfig.winZone[0];
      const winMax = activeConfig.winZone[1];
      const isHerbivoreWin = balance >= winMin && balance <= winMax;
      addLog(`=== 全5ラウンド終了！ 最終天秤位置: ${balance} ===`);
      addLog(isHerbivoreWin ? '🏆 【草食陣営『実り豊かな森』の勝利！】' : '🏆 【肉食陣営『飢えと飽和の荒れ野』の勝利！】');
      return;
    }

    // Prepare next round
    const nextRound = round + 1;
    const nextDealer = (dealerIndex + 1) % numPlayers;

    // Reshuffle and redistribute roles
    let rolePool = shuffle([...activeConfig.roles]);
    const updatedPlayers = players.map((p, idx) => ({
      ...p,
      role: rolePool[idx],
      selectedAction: null,
      useRole: false,
      lookoutRevealed: false,
      voteColor: 'NONE',
      voteAmount: 0
    }));

    setPlayers(updatedPlayers);
    setRound(nextRound);
    setDealerIndex(nextDealer);
    setTargetValue(getTargetValue(nextRound, numPlayers));
    setGameState('STEP1');

    addLog(`=== 第${nextRound}ラウンドへ突入 (親: P${nextDealer + 1}) 役職再配布完了 ===`);
  };

  // Game Victory Status Info
  const victoryInfo = useMemo(() => {
    const winMin = activeConfig.winZone[0];
    const winMax = activeConfig.winZone[1];
    const isHerbivoreWin = balance >= winMin && balance <= winMax;
    return {
      winMin,
      winMax,
      isHerbivoreWin
    };
  }, [activeConfig, balance]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-2 sm:p-4 md:p-6">
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 rounded-lg shadow-inner">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-emerald-400 flex items-center gap-2">
                『森の会議』 ボードゲーム検証・シミュレータ
                <span className="text-xs font-normal px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full border border-slate-600">
                  確定仕様書 Ver2.0
                </span>
              </h1>
              <p className="text-xs text-slate-400">1台で5〜15人分を操作可能・ルール自動精算機能付き</p>
            </div>
          </div>

          {/* Top Bar Stats */}
          {gameState !== 'SETUP' && (
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
              <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400">ラウンド:</span> <strong className="text-amber-400">{round} / 5</strong>
              </div>
              <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400">親(スタピ):</span> <strong className="text-emerald-400">P{dealerIndex + 1}</strong>
              </div>
              <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400">課題目標値:</span> <strong className="text-blue-400">{targetValue}</strong>
              </div>
              <button
                onClick={() => setDebugMode(!debugMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                  debugMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-700 text-slate-300 border-slate-600'
                }`}
              >
                {debugMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {debugMode ? 'GM視点 (全表示中)' : 'プレイヤー視点'}
              </button>
            </div>
          )}
        </div>

        {/* BALANCE & WIN ZONE GAUGE */}
        {gameState !== 'SETUP' && (
          <div className="mt-4 pt-3 border-t border-slate-700/80">
            <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
              <span className="text-red-400 flex items-center gap-1">
                🥩 肉食領域 (0以下)
              </span>
              <span className="text-slate-300 font-bold text-sm">
                森の天秤: <span className="text-emerald-400 text-base">{balance}</span>
              </span>
              <span className="text-red-400 flex items-center gap-1">
                肉食領域 ({victoryInfo.winMax + 1}以上) 🥩
              </span>
            </div>
            
            {/* Visual Balance Bar */}
            <div className="relative w-full h-5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden flex">
              {/* Carnivore Left Zone */}
              <div className="h-full bg-red-950/60 border-r border-red-800/40 text-[10px] text-red-400 flex items-center justify-center font-bold" style={{ width: '25%' }}>
                肉食勝利 (0以下)
              </div>
              {/* Herbivore Win Zone */}
              <div className="h-full bg-emerald-900/60 border-r border-emerald-500/40 text-[10px] text-emerald-300 flex items-center justify-center font-bold" style={{ width: '50%' }}>
                🌿 草食勝利ゾーン (+1 〜 +{victoryInfo.winMax})
              </div>
              {/* Carnivore Right Zone */}
              <div className="h-full bg-red-950/60 text-[10px] text-red-400 flex items-center justify-center font-bold" style={{ width: '25%' }}>
                肉食勝利 ({victoryInfo.winMax + 1}〜)
              </div>
            </div>

            {/* Supply Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 bg-slate-900/60 p-2 rounded-lg">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> 中央サプライ予備ストック:
              </span>
              <div className="flex gap-4">
                <span>🐘 ゾウ: <strong className="text-slate-200">{supply.ELEPHANT}</strong></span>
                <span>🐿️ リス: <strong className="text-slate-200">{supply.SQUIRREL}</strong></span>
                <span>🦊 キツネ: <strong className="text-slate-200">{supply.FOX}</strong></span>
                <span>🐒 サル: <strong className="text-slate-200">{supply.MONKEY}</strong></span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT 2 COLUMNS: GAME STEP CONTROLLER & PLAYERS GRID */}
        <div className="lg:col-span-2 space-y-6">

          {/* SETUP SCREEN */}
          {gameState === 'SETUP' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-center">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">ゲームセットアップ</h2>
              <p className="text-slate-400 text-sm mb-6">プレイ人数を選択して検証ゲームを開始します（5人〜15人対応）</p>

              <div className="max-w-xs mx-auto mb-6">
                <label className="block text-xs font-semibold text-slate-300 mb-2">プレイヤー人数を選択</label>
                <select
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-lg font-bold text-center text-emerald-400 focus:outline-none focus:border-emerald-500"
                >
                  {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => (
                    <option key={n} value={n}>{n} 人プレイ</option>
                  ))}
                </select>
              </div>

              {/* Player Configuration Summary Card */}
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 text-left max-w-md mx-auto mb-6 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">陣営構成:</span>
                  <span className="font-bold text-slate-200">
                    草食 {activeConfig.herbivores}人 🌿 / 肉食 {activeConfig.carnivores}人 🍖
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">草食勝利ゾーン:</span>
                  <span className="font-bold text-emerald-400">
                    +1 〜 +{activeConfig.winZone[1]}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">初期サプライ予備計:</span>
                  <span className="font-bold text-amber-400">
                    {activeConfig.supply.ELEPHANT + activeConfig.supply.SQUIRREL + activeConfig.supply.FOX + activeConfig.supply.MONKEY} 枚
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">使用役職カード:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeConfig.roles.map((r, idx) => (
                      <span key={idx} className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-[11px] text-slate-300">
                        {ROLES[r].animal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={initGame}
                className="w-full max-w-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5 fill-current" /> 検証ゲームを開始する
              </button>
            </div>
          )}

          {/* STEP CONTROLLER CONTAINER */}
          {gameState !== 'SETUP' && gameState !== 'GAME_OVER' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
              
              {/* STEP 1 */}
              {gameState === 'STEP1' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">Step 1</span>
                      課題目標値の公開
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    第{round}ラウンドの目標値は <strong className="text-blue-400 text-sm">{targetValue}</strong> です。（手動変更も可能）
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <label className="text-xs text-slate-400">目標値微調整:</label>
                    <input
                      type="number"
                      value={targetValue}
                      onChange={(e) => setTargetValue(parseInt(e.target.value) || 0)}
                      className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-bold text-blue-400"
                    />
                  </div>
                  <button
                    onClick={startStep2}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition flex items-center gap-1.5"
                  >
                    次へ: Step 2 隣接交渉 <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {gameState === 'STEP2' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">Step 2</span>
                      隣接交渉フェーズ ({timerPhase === 'RIGHT' ? '右隣と交渉中' : '左隣と交渉中'})
                    </h3>
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-amber-400 font-mono font-bold text-base">
                      <Clock className="w-4 h-4" /> {timer}秒
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    口頭交渉・約束・ブラフは自由です。（※現物カードの提示は禁止）
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-3 py-1.5 rounded text-xs"
                    >
                      {isTimerRunning ? '一時停止' : '再開'}
                    </button>
                    <button
                      onClick={startStep3}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded text-xs transition flex items-center gap-1"
                    >
                      交渉終了・次へ: Step 3 同時提出 <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {gameState === 'STEP3' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">Step 3</span>
                      同時裏向き提出
                    </h3>
                    <button
                      onClick={autoFillStep3}
                      className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1 transition"
                    >
                      <Dices className="w-3.5 h-3.5" /> ランダム一括入力
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    下のプレイヤー一覧テーブルにて、各プレイヤーが伏せて出す「アクションカード」と「役職の使用有無」を選択してください。
                  </p>
                  <button
                    onClick={submitStep3}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-lg text-sm transition flex items-center gap-2 shadow-lg"
                  >
                    全員のカード提出を確定し Step 4 公開フェーズへ <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 4.1 LOOKOUT */}
              {gameState === 'STEP4_LOOKOUT' && (
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <span>🦉</span> Step 4.1: 見張り（フクロウ）の能力発動
                  </h3>
                  <p className="text-xs text-slate-300 mb-4">
                    他者1人とカード種（ゾウ/リス/キツネ/サル）を宣言し、伏せアクションを公開させます。的中すれば影響力+1。
                  </p>

                  <div className="space-y-3 mb-4">
                    {players.filter(p => p.useRole && !p.coolDownCard && p.role === 'OWL').map(owl => (
                      <div key={owl.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-bold text-amber-300">🦉 {owl.name} の宣言:</span>
                        
                        <div className="flex items-center gap-1">
                          <label className="text-slate-400">対象:</label>
                          <select
                            value={lookoutActions[owl.id]?.targetId || 0}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setLookoutActions(prev => ({ ...prev, [owl.id]: { ...prev[owl.id], targetId: val } }));
                            }}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200"
                          >
                            {players.filter(p => p.id !== owl.id).map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-1">
                          <label className="text-slate-400">宣言カード:</label>
                          <select
                            value={lookoutActions[owl.id]?.declaredCard || 'ELEPHANT'}
                            onChange={(e) => {
                              const val = e.target.value;
                              setLookoutActions(prev => ({ ...prev, [owl.id]: { ...prev[owl.id], declaredCard: val } }));
                            }}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200"
                          >
                            {Object.keys(ACTION_CARDS).map(k => (
                              <option key={k} value={k}>{ACTION_CARDS[k].name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={resolveLookout}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    見張りの結果を判定・進行
                  </button>
                </div>
              )}

              {/* STEP 4.2 TACTICIAN */}
              {gameState === 'STEP4_TACTICIAN' && (
                <div>
                  <h3 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                    <span>🐙</span> Step 4.2: 策士（タコ）のオープン
                  </h3>
                  <p className="text-xs text-slate-300 mb-4">
                    策士を出したプレイヤーが自らオープンします。キツネを出していた場合のみ影響力+1を獲得します。
                  </p>
                  <button
                    onClick={resolveTactician}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    策士をオープンし次へ
                  </button>
                </div>
              )}

              {/* STEP 4.4 CARRIER */}
              {gameState === 'STEP4_CARRIER' && (
                <div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <span>🕊️</span> Step 4.4: 運び屋（ハト）のトークン譲渡
                  </h3>
                  <p className="text-xs text-slate-300 mb-4">
                    全員のアクション公開後、運び屋を出したプレイヤーは自分の影響力トークン1個を指名した1人に譲渡します。
                  </p>

                  <div className="space-y-3 mb-4">
                    {players.filter(p => p.useRole && !p.coolDownCard && p.role === 'DOVE').map(dove => (
                      <div key={dove.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex items-center gap-3 text-xs">
                        <span className="font-bold text-blue-300">🕊️ {dove.name} (所持:{dove.tokens}個) から譲渡する対象:</span>
                        <select
                          value={carrierTransfers[dove.id] || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setCarrierTransfers(prev => ({ ...prev, [dove.id]: val }));
                          }}
                          className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200"
                        >
                          {players.filter(p => p.id !== dove.id).map(p => (
                            <option key={p.id} value={p.id}>{p.name} (現在:{p.tokens}個)</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={resolveCarrier}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    譲渡を確定し Step 5 へ進む
                  </button>
                </div>
              )}

              {/* STEP 5 */}
              {gameState === 'STEP5' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">Step 5</span>
                      全体相談 (60秒) & サル指差し多数決
                    </h3>
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-amber-400 font-mono font-bold text-base">
                      <Clock className="w-4 h-4" /> {timer}秒
                    </div>
                  </div>

                  {monkeyTargets.length > 0 ? (
                    <div className="bg-slate-900 p-3 rounded-lg border border-red-500/40 mb-4 space-y-2">
                      <span className="text-xs font-bold text-red-400 block">
                        🐒 【サル撹乱】 このラウンドでサルが {monkeyTargets.length} 枚提出されました！ 多数決で指名するプレイヤーを{monkeyTargets.length}人分選んでください (影響力-1)
                      </span>
                      {monkeyTargets.map((tId, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 font-semibold">{idx + 1}回目の指名対象:</span>
                          <select
                            value={tId}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setMonkeyTargets(prev => {
                                const copy = [...prev];
                                copy[idx] = val;
                                return copy;
                              });
                            }}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200"
                          >
                            {players.map(p => (
                              <option key={p.id} value={p.id}>{p.name} (影響力:{p.tokens})</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mb-4">※このラウンドでサルは提出されていません。</p>
                  )}

                  <button
                    onClick={resolveMonkeyTargets}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition flex items-center gap-1.5"
                  >
                    全体相談完了・Step 6 投票へ <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 6 VOTE */}
              {gameState === 'STEP6_VOTE' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">Step 6</span>
                      両面トークン投票
                    </h3>
                    <button
                      onClick={autoFillStep6Vote}
                      className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1 transition"
                    >
                      <Dices className="w-3.5 h-3.5" /> ランダム投票入力
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    下のプレイヤー一覧テーブルにて、各プレイヤーの「緑（賛成）」「赤（反対）」および投入枚数を選択してください。
                  </p>
                  <button
                    onClick={submitVotes}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-lg text-sm transition shadow-lg flex items-center gap-2"
                  >
                    投票を開封・集計し天秤を移動 <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 6 RESULT */}
              {gameState === 'STEP6_RESULT' && step6Calc && (
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 第{round}ラウンド 投票・天秤移動結果
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700">
                      <span className="text-slate-400 block">アクション貢献値</span>
                      <strong className="text-base text-slate-200">{step6Calc.actionContrib}</strong>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-emerald-500/40">
                      <span className="text-slate-400 block">賛成合計 (緑+熱弁)</span>
                      <strong className="text-base text-emerald-400">+{step6Calc.greenTotal + step6Calc.lionBonus}</strong>
                      <span className="text-[10px] text-slate-400 block">(緑:{step6Calc.greenTotal} / 熱弁:+{step6Calc.lionBonus})</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-red-500/40">
                      <span className="text-slate-400 block">反対合計 (赤+扇動)</span>
                      <strong className="text-base text-red-400">-{step6Calc.redTotal + step6Calc.wolfBonus}</strong>
                      <span className="text-[10px] text-slate-400 block">(赤:{step6Calc.redTotal} / 扇動:-{step6Calc.wolfBonus})</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-blue-500/40">
                      <span className="text-slate-400 block">最終貢献値 vs 目標</span>
                      <strong className="text-base text-blue-400">{step6Calc.finalContribution} vs {step6Calc.targetValue}</strong>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-amber-500/50 mb-4 text-xs font-semibold text-center text-amber-300">
                    天秤移動量: {step6Calc.delta > 0 ? `+${step6Calc.delta}` : step6Calc.delta}  ➜  森の天秤の新しい位置: <span className="text-emerald-400 text-sm font-bold">{step6Calc.newBalance}</span>
                  </div>

                  <button
                    onClick={proceedToDraft}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-lg text-sm transition flex items-center gap-2"
                  >
                    カード返却 & 少数派ドラフト補充へ <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 6 DRAFT */}
              {gameState === 'STEP6_DRAFT' && (
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <span>📦</span> 少数派アクション提出者 ドラフト補充
                  </h3>
                  
                  {draftQueue[currentDrafterIndex] !== undefined && (
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-4">
                      <p className="text-xs text-slate-300 mb-3">
                        順序: <strong className="text-emerald-400 font-bold">{players.find(p => p.id === draftQueue[currentDrafterIndex])?.name}</strong> のカード補充選択ターンです。中央サプライから1枚選んで補充してください。
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        {Object.keys(ACTION_CARDS).map((cardKey) => {
                          const count = supply[cardKey];
                          const card = ACTION_CARDS[cardKey];
                          return (
                            <button
                              key={cardKey}
                              disabled={count <= 0}
                              onClick={() => handleDraftSelect(cardKey)}
                              className={`p-3 rounded-lg border text-left flex flex-col justify-between transition ${
                                count > 0 
                                  ? 'bg-slate-800 border-slate-600 hover:border-emerald-500 hover:bg-slate-700' 
                                  : 'bg-slate-900 border-slate-800 opacity-40 cursor-not-allowed'
                              }`}
                            >
                              <span className="font-bold text-slate-200">{card.animal}</span>
                              <span className="text-[10px] text-slate-400">予備残数: {count}枚</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* GAME OVER SCREEN */}
          {gameState === 'GAME_OVER' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-center">
              <h2 className="text-3xl font-bold text-amber-400 mb-2">🎉 全5ラウンド終了！</h2>
              <div className="text-xl font-bold text-slate-200 mb-4">
                森の天秤 最終位置: <span className="text-emerald-400 text-2xl">{balance}</span>
              </div>

              {victoryInfo.isHerbivoreWin ? (
                <div className="bg-emerald-950/80 border border-emerald-500 p-4 rounded-xl max-w-md mx-auto mb-6 text-emerald-300">
                  <h3 className="text-xl font-bold mb-1">🌿 草食陣営『実り豊かな森』の勝利！</h3>
                  <p className="text-xs text-emerald-400/80">勝利ゾーン範囲 (+1 〜 +{victoryInfo.winMax}) 内で見事に調和を保ちました。</p>
                </div>
              ) : (
                <div className="bg-red-950/80 border border-red-500 p-4 rounded-xl max-w-md mx-auto mb-6 text-red-300">
                  <h3 className="text-xl font-bold mb-1">🍖 肉食陣営『飢えと飽和の荒れ野』の勝利！</h3>
                  <p className="text-xs text-red-400/80">
                    {balance <= 0 ? '枯渇・荒廃（0以下）に追い込みました。' : `過剰繁栄・崩壊（+${victoryInfo.winMax + 1}以上）を引き起こしました。`}
                  </p>
                </div>
              )}

              <button
                onClick={initGame}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center justify-center gap-2 mx-auto text-sm"
              >
                <RotateCcw className="w-4 h-4" /> もう一度テストプレイを行う
              </button>
            </div>
          )}

          {/* PLAYERS TABLE & CONTROLS */}
          {gameState !== 'SETUP' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg overflow-x-auto">
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
                <span>👥 プレイヤー全一覧 & 操作パネル</span>
                <span className="text-xs font-normal text-slate-400">※（親）マークはラウンドスタートプレイヤー</span>
              </h3>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="p-2">席順</th>
                    <th className="p-2">プレイヤー</th>
                    <th className="p-2">陣営 / 役職</th>
                    <th className="p-2">手札 (4枚)</th>
                    <th className="p-2">影響力</th>
                    <th className="p-2">手元ロック</th>
                    <th className="p-2">今Rアクション</th>
                    <th className="p-2">今R役職発動</th>
                    <th className="p-2">今R投票</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {players.map((p) => {
                    const isDealer = p.id === dealerIndex;
                    const canUseRole = !p.coolDownCard;
                    return (
                      <tr key={p.id} className={`hover:bg-slate-700/30 ${isDealer ? 'bg-emerald-950/20' : ''}`}>
                        
                        {/* 席順 */}
                        <td className="p-2 font-mono text-slate-400">#{p.id + 1}</td>

                        {/* 名前 */}
                        <td className="p-2 font-bold text-slate-200 flex items-center gap-1">
                          {p.name}
                          {isDealer && <span className="text-[10px] bg-emerald-600 text-white px-1 rounded font-normal">親</span>}
                        </td>

                        {/* 陣営 & 役職 */}
                        <td className="p-2">
                          {debugMode ? (
                            <div className="space-y-0.5">
                              <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                p.faction === 'HERBIVORE' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-red-900/60 text-red-300'
                              }`}>
                                {p.faction === 'HERBIVORE' ? '🌿 草食' : '🍖 肉食'}
                              </span>
                              <div className="text-[11px] text-slate-300">
                                {ROLES[p.role].animal}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">🔒 伏せ</span>
                          )}
                        </td>

                        {/* 手札 */}
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {p.hand.map((cKey, idx) => (
                              <span key={idx} className="bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-[10px]">
                                {ACTION_CARDS[cKey].icon}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* 影響力トークン */}
                        <td className="p-2 font-bold text-amber-400">
                          🟢 {p.tokens}個
                        </td>

                        {/* 手元ロック（キツネ・サル クールタイム） */}
                        <td className="p-2">
                          {p.coolDownCard ? (
                            <span className="bg-red-950 border border-red-700 text-red-400 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                              {ACTION_CARDS[p.coolDownCard].icon} 役職不可
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">-</span>
                          )}
                        </td>

                        {/* Step 3 アクション選択 */}
                        <td className="p-2">
                          {gameState === 'STEP3' ? (
                            <select
                              value={p.selectedAction || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPlayers(prev => prev.map(pl => pl.id === p.id ? { ...pl, selectedAction: val } : pl));
                              }}
                              className="bg-slate-900 border border-slate-600 text-xs rounded px-1.5 py-1 text-slate-200"
                            >
                              <option value="">選択...</option>
                              {p.hand.map((cKey, idx) => (
                                <option key={idx} value={cKey}>{ACTION_CARDS[cKey].name}</option>
                              ))}
                            </select>
                          ) : (
                            <span>
                              {p.selectedAction ? (
                                (debugMode || gameState.startsWith('STEP4') || gameState === 'STEP5' || gameState.startsWith('STEP6') || p.lookoutRevealed) 
                                  ? ACTION_CARDS[p.selectedAction].icon + ' ' + ACTION_CARDS[p.selectedAction].name 
                                  : '🔒 伏せ'
                              ) : '-'}
                            </span>
                          )}
                        </td>

                        {/* Step 3 役職使用有無 */}
                        <td className="p-2">
                          {gameState === 'STEP3' ? (
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                disabled={!canUseRole}
                                checked={p.useRole}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setPlayers(prev => prev.map(pl => pl.id === p.id ? { ...pl, useRole: checked } : pl));
                                }}
                                className="rounded bg-slate-900 border-slate-600 text-emerald-500 focus:ring-0"
                              />
                              <span className={`text-[11px] ${!canUseRole ? 'text-slate-600 line-through' : 'text-slate-300'}`}>
                                伏せる
                              </span>
                            </label>
                          ) : (
                            <span className="text-[11px]">
                              {p.useRole ? '✅ 伏せ済' : '❌ 未使用'}
                            </span>
                          )}
                        </td>

                        {/* Step 6 投票選択 */}
                        <td className="p-2">
                          {gameState === 'STEP6_VOTE' ? (
                            <div className="flex items-center gap-1">
                              <select
                                value={p.voteColor}
                                onChange={(e) => {
                                  const col = e.target.value;
                                  setPlayers(prev => prev.map(pl => pl.id === p.id ? { ...pl, voteColor: col, voteAmount: col === 'NONE' ? 0 : Math.min(1, pl.tokens) } : pl));
                                }}
                                className="bg-slate-900 border border-slate-600 text-xs rounded px-1 py-1 text-slate-200"
                              >
                                <option value="NONE">棄権</option>
                                <option value="GREEN">緑(賛成)</option>
                                <option value="RED">赤(反対)</option>
                              </select>
                              {p.voteColor !== 'NONE' && (
                                <input
                                  type="number"
                                  min="1"
                                  max={p.tokens}
                                  value={p.voteAmount}
                                  onChange={(e) => {
                                    const amt = Math.max(0, Math.min(p.tokens, parseInt(e.target.value) || 0));
                                    setPlayers(prev => prev.map(pl => pl.id === p.id ? { ...pl, voteAmount: amt } : pl));
                                  }}
                                  className="w-12 bg-slate-900 border border-slate-600 text-xs rounded px-1 py-1 text-center font-bold text-amber-400"
                                />
                              )}
                            </div>
                          ) : (
                            <span className="text-[11px]">
                              {p.voteColor === 'GREEN' && `🟢 緑 x${p.voteAmount}`}
                              {p.voteColor === 'RED' && `🔴 赤 x${p.voteAmount}`}
                              {p.voteColor === 'NONE' && `-`}
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* RIGHT 1 COLUMN: LOGS & RULE QUICK REFERENCE */}
        <div className="space-y-6">

          {/* GAME LOGS CONTAINER */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col h-96">
            <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-emerald-400" /> リアルタイム進行ログ</span>
              <span className="text-[10px] text-slate-400">時系列降順</span>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px] leading-relaxed text-slate-300">
              {logs.map((log, idx) => (
                <div key={idx} className="bg-slate-900/60 p-1.5 rounded border border-slate-800/80">
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* RULE QUICK REFERENCE */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg text-xs space-y-3">
            <h3 className="font-bold text-emerald-400 border-b border-slate-700 pb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> 各カード・ルールクイック参照
            </h3>

            <div>
              <span className="font-bold text-slate-200 block mb-1">【アクションカード】</span>
              <ul className="space-y-1 text-slate-400">
                <li>🐘 ゾウ: 貢献+3 / 影響0 / 制限なし</li>
                <li>🐿️ リス: 貢献+1 / 影響+1 / 制限なし</li>
                <li>🦊 キツネ: 貢献-1 / 影響+3 / <strong className="text-red-400">翌R役職不可</strong></li>
                <li>🐒 サル: 貢献-2 / 影響+1 / <strong className="text-red-400">翌R役職不可</strong>・多数決他者影響-1</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-slate-200 block mb-1">【役職カード】</span>
              <ul className="space-y-1 text-slate-400">
                <li>🦁 熱弁家: 緑1枚以上投票時、賛成+2</li>
                <li>🦫 調停者: サル出現時、マイナス1回分(-2→0)無効化</li>
                <li>🕊️ 運び屋: 公開直後、他者へトークン1個譲渡</li>
                <li>🐙 策士: キツネ提出時、オープンして影響+1</li>
                <li>🐺 扇動者: 赤1枚以上投票時、反対-2(マイナス2強化)</li>
                <li>🦉 見張り: シャッフル前他者とカード宣言し的中時影響+1</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
