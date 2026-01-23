const ROLES = ["PG", "SG", "SF", "PF", "C"];
const SHOT_TYPES = ["layup", "mid", "three"];
const SHOT_POINTS = { layup: 2, mid: 2, three: 3 };
const SHOT_BASE = { layup: 3, mid: 2, three: 2 };
const ORB_BASE = { layup: 2, mid: 2, three: 1 };
const LANG_KEY = "diceHoopsLang";
const STATS_KEY = "diceHoopsStats";

const ROSTER = [
  { role: "PG", TO: 85, LAY: 70, MID: 68, THREE: 65, ORB: 30 },
  { role: "SG", TO: 60, LAY: 60, MID: 75, THREE: 85, ORB: 25 },
  { role: "SF", TO: 70, LAY: 72, MID: 70, THREE: 68, ORB: 50 },
  { role: "PF", TO: 55, LAY: 80, MID: 60, THREE: 40, ORB: 80 },
  { role: "C", TO: 50, LAY: 85, MID: 45, THREE: 20, ORB: 90 }
];

const i18n = {
  it: {
    app_title: "Dice Hoops",
    app_tagline: "Basket turn-based con dadi",
    play: "Gioca",
    stats: "Statistiche",
    tutorial: "Tutorial",
    tutorial_interactive: "Tutorial interattivo",
    language: "Lingua",
    offline_ready: "Gioco offline",
    dice_player: "Giocatore",
    dice_context: "Contesto",
    dice_result: "Esito",
    possession: "Possesso",
    active_player: "Giocatore attivo",
    choose_shot: "Scegli il tiro",
    roll: "Lancia",
    new_game: "Nuova partita",
    log: "Cronaca",
    lineups: "Lineups",
    shot_layup: "Layup",
    shot_mid: "Midrange",
    shot_three: "3PT",
    team_you: "YOU",
    team_ai: "AI",
    ai_thinking: "AI thinking...",
    stats_title: "Statistiche avanzate",
    players: "Giocatori",
    back: "Indietro",
    next: "Avanti",
    skip: "Salta",
    win_you: "Hai vinto!",
    win_ai: "Ha vinto AI!",
    log_possession: "Possesso",
    log_player: "D1 seleziona",
    log_pick: "Scelta giocatore",
    log_shot: "Scelta tiro",
    log_context: "D2 contesto",
    log_outcome: "D3 esito",
    log_turnover: "Turnover",
    log_no_turnover: "Nessun turnover",
    log_made: "Canestro!",
    log_miss: "Tiro sbagliato",
    log_orb: "Rimbalzo offensivo",
    log_no_orb: "Niente ORB",
    log_game_over: "Fine partita",
    ctx_to: "Turnover window",
    ctx_bad: "Bad look",
    ctx_normal: "Normal",
    ctx_good: "Good",
    ctx_great: "Great",
    tutorial_text:
      "Obiettivo: primo a 21 punti.\n\n" +
      "Ogni possesso usa 3 dadi:\n" +
      "D1: seleziona giocatore (1-5) o 6 = scegli tu.\n" +
      "Scegli il tiro: Layup (2), Midrange (2), 3PT (3).\n" +
      "D2: contesto. 1 = Turnover window, 2-3 Bad (-1), 4 Normal (0), 5 Good (+1), 6 Great (+2).\n" +
      "D3: esito. Se D2=1 controlla il turnover. Se non c'e turnover, lo stesso D3 risolve il tiro.\n" +
      "Se il tiro e' sbagliato, lo stesso D3 controlla il rimbalzo offensivo. Se ORB, il possesso continua con un nuovo D1.\n\n" +
      "Skill -> SHIFT: 1-20 = -2, 21-40 = -1, 41-60 = 0, 61-80 = +1, 81-100 = +2.\n" +
      "Le stats sono salvate offline in localStorage.",
    coach_step_d1: "D1=6: scegli tu il giocatore. Nel demo la scelta e' mostrata qui.",
    coach_step_pick: "Seleziona un ruolo per il possesso.",
    coach_step_shot: "Scegli il tiro (Layup, Midrange, 3PT).",
    coach_step_d2: "D2 indica il contesto: da Bad a Great o Turnover window.",
    coach_step_d3: "D3 risolve esito, canestro o rimbalzo offensivo.",
    coach_step_log: "La cronaca registra ogni evento del possesso.",
    coach_step_roll: "Il pulsante Lancia avvia i tiri nei turni reali."
  },
  en: {
    app_title: "Dice Hoops",
    app_tagline: "Turn-based dice basketball",
    play: "Play",
    stats: "Stats",
    tutorial: "Tutorial",
    tutorial_interactive: "Interactive tutorial",
    language: "Language",
    offline_ready: "Offline ready",
    dice_player: "Player",
    dice_context: "Context",
    dice_result: "Result",
    possession: "Possession",
    active_player: "Active player",
    choose_shot: "Choose the shot",
    roll: "Roll",
    new_game: "New game",
    log: "Play log",
    lineups: "Lineups",
    shot_layup: "Layup",
    shot_mid: "Midrange",
    shot_three: "3PT",
    team_you: "YOU",
    team_ai: "AI",
    ai_thinking: "AI thinking...",
    stats_title: "Advanced stats",
    players: "Players",
    back: "Back",
    next: "Next",
    skip: "Skip",
    win_you: "You win!",
    win_ai: "AI wins!",
    log_possession: "Possession",
    log_player: "D1 selects",
    log_pick: "Pick player",
    log_shot: "Shot choice",
    log_context: "D2 context",
    log_outcome: "D3 outcome",
    log_turnover: "Turnover",
    log_no_turnover: "No turnover",
    log_made: "Bucket!",
    log_miss: "Missed",
    log_orb: "Offensive board",
    log_no_orb: "No ORB",
    log_game_over: "Game over",
    ctx_to: "Turnover window",
    ctx_bad: "Bad look",
    ctx_normal: "Normal",
    ctx_good: "Good",
    ctx_great: "Great",
    tutorial_text:
      "Goal: first to 21 points.\n\n" +
      "Each possession uses 3 dice:\n" +
      "D1: select player (1-5) or 6 = you pick.\n" +
      "Choose the shot: Layup (2), Midrange (2), 3PT (3).\n" +
      "D2: context. 1 = Turnover window, 2-3 Bad (-1), 4 Normal (0), 5 Good (+1), 6 Great (+2).\n" +
      "D3: outcome. If D2=1 check turnover. If no turnover, the same D3 resolves the shot.\n" +
      "On a miss, the same D3 checks offensive rebound. If ORB, the possession continues with a new D1.\n\n" +
      "Skill -> SHIFT: 1-20 = -2, 21-40 = -1, 41-60 = 0, 61-80 = +1, 81-100 = +2.\n" +
      "Stats are saved offline in localStorage.",
    coach_step_d1: "D1=6: you choose the player. The demo shows this pick.",
    coach_step_pick: "Select a role for the possession.",
    coach_step_shot: "Pick a shot: Layup, Midrange, or 3PT.",
    coach_step_d2: "D2 shows the context from Bad to Great or Turnover window.",
    coach_step_d3: "D3 resolves the result, bucket or offensive rebound.",
    coach_step_log: "The log keeps every event of the possession.",
    coach_step_roll: "Roll starts the dice on real turns."
  },
  es: {
    app_title: "Dice Hoops",
    app_tagline: "Baloncesto por turnos con dados",
    play: "Jugar",
    stats: "Estadisticas",
    tutorial: "Tutorial",
    tutorial_interactive: "Tutorial interactivo",
    language: "Idioma",
    offline_ready: "Listo offline",
    dice_player: "Jugador",
    dice_context: "Contexto",
    dice_result: "Resultado",
    possession: "Posesion",
    active_player: "Jugador activo",
    choose_shot: "Elige el tiro",
    roll: "Lanzar",
    new_game: "Nueva partida",
    log: "Cronica",
    lineups: "Lineups",
    shot_layup: "Layup",
    shot_mid: "Media distancia",
    shot_three: "3PT",
    team_you: "TU",
    team_ai: "AI",
    ai_thinking: "AI pensando...",
    stats_title: "Estadisticas avanzadas",
    players: "Jugadores",
    back: "Atras",
    next: "Siguiente",
    skip: "Saltar",
    win_you: "Has ganado!",
    win_ai: "AI gana!",
    log_possession: "Posesion",
    log_player: "D1 selecciona",
    log_pick: "Elegir jugador",
    log_shot: "Eleccion de tiro",
    log_context: "D2 contexto",
    log_outcome: "D3 resultado",
    log_turnover: "Perdida",
    log_no_turnover: "Sin perdida",
    log_made: "Canasta!",
    log_miss: "Fallo",
    log_orb: "Rebote ofensivo",
    log_no_orb: "Sin ORB",
    log_game_over: "Fin de partido",
    ctx_to: "Turnover window",
    ctx_bad: "Bad look",
    ctx_normal: "Normal",
    ctx_good: "Good",
    ctx_great: "Great",
    tutorial_text:
      "Objetivo: primero a 21 puntos.\n\n" +
      "Cada posesion usa 3 dados:\n" +
      "D1: selecciona jugador (1-5) o 6 = eliges tu.\n" +
      "Elige el tiro: Layup (2), Media (2), 3PT (3).\n" +
      "D2: contexto. 1 = Turnover window, 2-3 Bad (-1), 4 Normal (0), 5 Good (+1), 6 Great (+2).\n" +
      "D3: resultado. Si D2=1 se comprueba la perdida. Si no hay perdida, el mismo D3 resuelve el tiro.\n" +
      "Si fallas, el mismo D3 comprueba el rebote ofensivo. Si ORB, la posesion continua con un nuevo D1.\n\n" +
      "Skill -> SHIFT: 1-20 = -2, 21-40 = -1, 41-60 = 0, 61-80 = +1, 81-100 = +2.\n" +
      "Las estadisticas se guardan en localStorage.",
    coach_step_d1: "D1=6: eliges el jugador. El demo muestra esta eleccion.",
    coach_step_pick: "Selecciona un rol para la posesion.",
    coach_step_shot: "Elige un tiro: Layup, Media, o 3PT.",
    coach_step_d2: "D2 indica el contexto, de Bad a Great o Turnover window.",
    coach_step_d3: "D3 resuelve el resultado, canasta o rebote ofensivo.",
    coach_step_log: "La cronica registra cada evento de la posesion.",
    coach_step_roll: "Lanzar inicia los dados en turnos reales."
  }
};

const state = {
  lang: "it",
  screen: "home",
  scores: { you: 0, ai: 0 },
  possession: "you",
  phase: "roll_player",
  activePlayerIndex: null,
  shot: null,
  dice: { d1: 1, d2: 1, d3: 1 },
  log: [],
  gameOver: false,
  aiThinking: false,
  coachMode: false,
  mute: false,
  ballSide: 1,
  stats: null
};

const TIMINGS = {
  userD2Delay: 0,
  userD3Delay: 820,
  aiD1Delay: 300,
  aiPickDelay: 650,
  aiShotDelay: 800,
  aiD2Delay: 900,
  aiD3Delay: 1100
};

const els = {
  playBtn: document.getElementById("playBtn"),
  statsBtn: document.getElementById("statsBtn"),
  tutorialBtn: document.getElementById("tutorialBtn"),
  coachBtn: document.getElementById("coachBtn"),
  langSelect: document.getElementById("langSelect"),
  screens: {
    home: document.getElementById("home"),
    game: document.getElementById("game"),
    stats: document.getElementById("stats"),
    tutorial: document.getElementById("tutorial")
  },
  homeBtn: document.getElementById("homeBtn"),
  homeBtnStats: document.getElementById("homeBtnStats"),
  homeBtnTutorial: document.getElementById("homeBtnTutorial"),
  soundBtn: document.getElementById("soundBtn"),
  scoreboard: document.getElementById("scoreboard"),
  dice1: document.getElementById("dice1"),
  dice2: document.getElementById("dice2"),
  dice3: document.getElementById("dice3"),
  possessionLabel: document.getElementById("possessionLabel"),
  activePlayerLabel: document.getElementById("activePlayerLabel"),
  playerChooser: document.getElementById("playerChooser"),
  shotButtons: Array.from(document.querySelectorAll(".shot-btn")),
  rollBtn: document.getElementById("rollBtn"),
  logList: document.getElementById("logList"),
  newGameBtn: document.getElementById("newGameBtn"),
  lineupsContent: document.getElementById("lineupsContent"),
  statsContent: document.getElementById("statsContent"),
  statsSummary: document.getElementById("statsSummary"),
  tutorialText: document.getElementById("tutorialText"),
  ball: document.getElementById("ball"),
  ballLayer: document.getElementById("ballLayer"),
  rim: document.getElementById("rim"),
  coachOverlay: document.getElementById("coachOverlay"),
  coachFocus: document.getElementById("coachFocus"),
  coachText: document.getElementById("coachText"),
  coachPrev: document.getElementById("coachPrev"),
  coachNext: document.getElementById("coachNext"),
  coachSkip: document.getElementById("coachSkip")
};

const coachSteps = [
  { selector: "#dice1", textKey: "coach_step_d1" },
  { selector: "#playerChooser", textKey: "coach_step_pick" },
  { selector: ".shot-buttons", textKey: "coach_step_shot" },
  { selector: "#dice2", textKey: "coach_step_d2" },
  { selector: "#dice3", textKey: "coach_step_d3" },
  { selector: "#logList", textKey: "coach_step_log" },
  { selector: "#rollBtn", textKey: "coach_step_roll" }
];

let coachIndex = 0;

function t(key) {
  return (i18n[state.lang] && i18n[state.lang][key]) || key;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function skillToShift(value) {
  if (value <= 20) return -2;
  if (value <= 40) return -1;
  if (value <= 60) return 0;
  if (value <= 80) return 1;
  return 2;
}

function showScreen(name) {
  Object.values(els.screens).forEach((screen) => screen.classList.remove("active"));
  els.screens[name].classList.add("active");
  state.screen = name;
  if (name === "stats") renderStats();
}

function setLang(lang) {
  if (!i18n[lang]) return;
  state.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  els.tutorialText.textContent = t("tutorial_text");
  updateScoreboard();
  updateLabels();
  renderStats();
}

function updateScoreboard() {
  els.scoreboard.textContent = `${t("team_you")} ${state.scores.you} • ${t("team_ai")} ${state.scores.ai}`;
}

function updateLabels() {
  const teamLabel = state.possession === "you" ? t("team_you") : t("team_ai");
  const playerLabel = state.activePlayerIndex === null ? "-" : ROSTER[state.activePlayerIndex].role;
  els.possessionLabel.textContent = `${t("possession")}: ${teamLabel}`;
  els.activePlayerLabel.textContent = `${t("active_player")}: ${playerLabel}`;
}

function setDiceValue(el, value) {
  el.dataset.value = value;
  el.classList.add("rolling3d");
  setTimeout(() => el.classList.remove("rolling3d"), 700);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 50);
  renderLog();
}

function renderLog() {
  els.logList.innerHTML = state.log.map((entry) => `<div class="log-entry">${entry}</div>`).join("");
}

function resetDice() {
  state.dice = { d1: 1, d2: 1, d3: 1 };
  setDiceValue(els.dice1, 1);
  setDiceValue(els.dice2, 1);
  setDiceValue(els.dice3, 1);
}

function contextShift(d2) {
  if (d2 === 1) return 0;
  if (d2 <= 3) return -1;
  if (d2 === 4) return 0;
  if (d2 === 5) return 1;
  return 2;
}

function contextLabel(d2) {
  if (d2 === 1) return t("ctx_to");
  if (d2 <= 3) return t("ctx_bad");
  if (d2 === 4) return t("ctx_normal");
  if (d2 === 5) return t("ctx_good");
  return t("ctx_great");
}

function startGame(fullReset = true) {
  state.gameOver = false;
  state.possession = "you";
  state.phase = "roll_player";
  state.activePlayerIndex = null;
  state.shot = null;
  setActiveShot(null);
  state.log = [];
  state.aiThinking = false;
  resetDice();
  if (fullReset) {
    state.scores = { you: 0, ai: 0 };
  }
  updateScoreboard();
  updateLabels();
  updateControls();
  renderLog();
  addLog(`${t("log_possession")} ${t("team_you")}`);
}

function updateControls() {
  const isHumanTurn = state.possession === "you";
  const canRoll =
    !state.gameOver &&
    !state.coachMode &&
    isHumanTurn &&
    (state.phase === "roll_player" || state.phase === "roll_outcome");
  els.rollBtn.disabled = !canRoll;
  els.playerChooser.classList.toggle("hidden", state.phase !== "choose_player" && !state.coachMode);
  updateLabels();
}

function setActiveShot(shot) {
  state.shot = shot;
  els.shotButtons.forEach((btn) => {
    btn.classList.toggle("active", shot && btn.dataset.shot === shot);
  });
}

function handlePlayerRoll() {
  const d1 = rollDie();
  state.dice.d1 = d1;
  setDiceValue(els.dice1, d1);
  if (d1 === 6) {
    state.activePlayerIndex = null;
    state.phase = "choose_player";
    addLog(`${t("log_player")} 6 (${t("log_pick")})`);
  } else {
    state.activePlayerIndex = d1 - 1;
    state.phase = "choose_shot";
    addLog(`${t("log_player")} ${ROSTER[state.activePlayerIndex].role}`);
  }
  updateControls();
}

function logContext(d2) {
  addLog(`${t("log_context")}: ${contextLabel(d2)}`);
}

function resolveOutcome(team, d2Override, d3Override, contextLogged = false) {
  const d2 = d2Override || rollDie();
  const d3 = d3Override || rollDie();
  state.dice.d2 = d2;
  state.dice.d3 = d3;
  if (!contextLogged) {
    setDiceValue(els.dice2, d2);
    setDiceValue(els.dice3, d3);
  }

  const player = ROSTER[state.activePlayerIndex];
  const shiftContext = contextShift(d2);
  if (!contextLogged) {
    logContext(d2);
  }

  let turnover = false;
  if (d2 === 1) {
    const shiftTO = skillToShift(player.TO);
    const threshold = Math.max(1, 2 - shiftTO);
    turnover = d3 <= threshold;
    if (turnover) {
      addLog(`${t("log_turnover")} (${d3} <= ${threshold})`);
    } else {
      addLog(`${t("log_no_turnover")} (${d3} > ${threshold})`);
    }
  }

  if (turnover) {
    recordTurnover(team, state.activePlayerIndex);
    switchPossession();
    return false;
  }

  const shiftShot = skillToShift(player[shotSkillKey(state.shot)]);
  const base = SHOT_BASE[state.shot];
  const success = clamp(base + shiftShot + shiftContext, 1, 6);
  const made = d3 <= success;

  addLog(`${t("log_outcome")}: ${d3} / ${success}`);
  animateBall(made);
  recordShot(team, state.activePlayerIndex, state.shot, made);

  if (made) {
    addLog(t("log_made"));
    addPoints(team, SHOT_POINTS[state.shot]);
    if (!checkWin()) {
      switchPossession();
    }
    return false;
  }

  addLog(t("log_miss"));
  const shiftOrb = skillToShift(player.ORB);
  const orbTarget = clamp(ORB_BASE[state.shot] + shiftOrb + shiftContext, 1, 6);
  const gotOrb = d3 <= orbTarget;
  if (gotOrb) {
    addLog(`${t("log_orb")} (${d3} <= ${orbTarget})`);
    recordOrb(team, state.activePlayerIndex);
    state.phase = "roll_player";
    state.activePlayerIndex = null;
    state.shot = null;
    setActiveShot(null);
    updateControls();
    return true;
  }

  addLog(`${t("log_no_orb")} (${d3} > ${orbTarget})`);
  switchPossession();
  return false;
}

async function rollOutcomeAnimated(team, delay2, delay3) {
  const d2 = rollDie();
  state.dice.d2 = d2;
  await wait(delay2);
  setDiceValue(els.dice2, d2);
  logContext(d2);
  const d3 = rollDie();
  state.dice.d3 = d3;
  await wait(delay3);
  setDiceValue(els.dice3, d3);
  return resolveOutcome(team, d2, d3, true);
}

function addPoints(team, points) {
  if (team === "you") {
    state.scores.you += points;
  } else {
    state.scores.ai += points;
  }
  updateScoreboard();
}

function switchPossession() {
  state.possession = state.possession === "you" ? "ai" : "you";
  state.phase = "roll_player";
  state.activePlayerIndex = null;
  state.shot = null;
  setActiveShot(null);
  updateControls();
  addLog(`${t("log_possession")} ${state.possession === "you" ? t("team_you") : t("team_ai")}`);
  if (state.possession === "ai") {
    aiTurn();
  }
}

function checkWin() {
  if (state.scores.you >= 21 || state.scores.ai >= 21) {
    state.gameOver = true;
    updateControls();
    if (state.scores.you > state.scores.ai) {
      addLog(t("win_you"));
      recordWin("YOU");
    } else {
      addLog(t("win_ai"));
      recordWin("AI");
    }
    addLog(t("log_game_over"));
    return true;
  }
  return false;
}

function shotSkillKey(shot) {
  if (shot === "layup") return "LAY";
  if (shot === "mid") return "MID";
  return "THREE";
}

function aiTurn() {
  if (state.gameOver) return;
  state.aiThinking = true;
  updateControls();
  addLog(t("ai_thinking"));
  setTimeout(async () => {
    await wait(TIMINGS.aiD1Delay);
    aiPickPlayer();
    await wait(TIMINGS.aiPickDelay);
    aiPickShot();
    await wait(TIMINGS.aiShotDelay);
    state.phase = "roll_outcome";
    const kept = await rollOutcomeAnimated("ai", TIMINGS.aiD2Delay, TIMINGS.aiD3Delay);
    state.aiThinking = false;
    if (!state.gameOver && state.possession === "ai" && kept) {
      setTimeout(() => aiTurn(), 500);
    }
  }, 200);
}

function aiPickPlayer() {
  const d1 = rollDie();
  state.dice.d1 = d1;
  setDiceValue(els.dice1, d1);
  if (d1 === 6) {
    state.activePlayerIndex = bestPlayerIndex();
    addLog(`${t("log_player")} 6 -> ${ROSTER[state.activePlayerIndex].role}`);
  } else {
    state.activePlayerIndex = d1 - 1;
    addLog(`${t("log_player")} ${ROSTER[state.activePlayerIndex].role}`);
  }
}

function aiPickShot() {
  const trailing = state.scores.ai < state.scores.you;
  const gap = Math.abs(state.scores.ai - state.scores.you);
  const player = ROSTER[state.activePlayerIndex];

  let bestShot = "layup";
  let bestEv = -999;
  SHOT_TYPES.forEach((shot) => {
    const shiftShot = skillToShift(player[shotSkillKey(shot)]);
    const base = SHOT_BASE[shot];
    const success = clamp(base + shiftShot, 1, 6);
    const prob = success / 6;
    const shiftTO = skillToShift(player.TO);
    const threshold = Math.max(1, 2 - shiftTO);
    const turnoverProb = (1 / 6) * (threshold / 6);
    let ev = prob * SHOT_POINTS[shot] - turnoverProb * 1.2;
    if (trailing && gap >= 6 && shot === "three") ev += 0.6;
    if (!trailing && gap >= 6 && shot === "layup") ev += 0.4;
    if (ev > bestEv) {
      bestEv = ev;
      bestShot = shot;
    }
  });
  state.shot = bestShot;
  setActiveShot(bestShot);
  addLog(`${t("log_shot")}: ${shotLabel(bestShot)}`);
}

function bestPlayerIndex() {
  let bestIdx = 0;
  let bestScore = -1;
  ROSTER.forEach((player, idx) => {
    const score = player.LAY + player.MID + player.THREE + player.ORB;
    if (score > bestScore) {
      bestScore = score;
      bestIdx = idx;
    }
  });
  return bestIdx;
}

function shotLabel(shot) {
  if (shot === "layup") return t("shot_layup");
  if (shot === "mid") return t("shot_mid");
  return t("shot_three");
}

function animateBall(made) {
  const rimRect = els.rim.getBoundingClientRect();
  const layerRect = els.ballLayer.getBoundingClientRect();
  const startX = layerRect.width / 2;
  const startY = layerRect.height * 0.8;
  const rimX = rimRect.left - layerRect.left + rimRect.width / 2;
  const rimY = rimRect.top - layerRect.top + rimRect.height / 2;

  els.ball.style.transition = "none";
  els.ball.style.opacity = "1";
  els.ball.style.transform = `translate(${startX}px, ${startY}px) scale(1)`;

  requestAnimationFrame(() => {
    els.ball.style.transition = "transform 0.55s ease, opacity 0.3s ease";
    els.ball.style.transform = `translate(${rimX}px, ${rimY}px) scale(0.9)`;

    setTimeout(() => {
      const side = state.ballSide;
      state.ballSide *= -1;
      if (made) {
        els.ball.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        els.ball.style.transform = `translate(${rimX}px, ${rimY + 36}px) scale(0.6)`;
        els.ball.style.opacity = "0";
      } else {
        const bounceX = rimX + side * 40;
        const bounceY = rimY + 28;
        els.ball.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        els.ball.style.transform = `translate(${bounceX}px, ${bounceY}px) rotate(120deg) scale(0.7)`;
        els.ball.style.opacity = "0";
      }
    }, 560);
  });
}

function defaultStats() {
  return {
    teams: {
      YOU: teamStatsBase(),
      AI: teamStatsBase()
    },
    players: {
      YOU: playerStatsBase(),
      AI: playerStatsBase()
    }
  };
}

function teamStatsBase() {
  return {
    pointsFor: 0,
    pointsAgainst: 0,
    wins: 0,
    losses: 0,
    turnovers: 0,
    orb: 0,
    shots: {
      layup: { made: 0, att: 0 },
      mid: { made: 0, att: 0 },
      three: { made: 0, att: 0 }
    }
  };
}

function playerStatsBase() {
  const base = {};
  ROLES.forEach((role) => {
    base[role] = {
      points: 0,
      fgm: 0,
      fga: 0,
      threeMade: 0,
      threeAtt: 0,
      turnovers: 0,
      orb: 0
    };
  });
  return base;
}

function normalizeStats(raw) {
  const base = defaultStats();
  if (!raw || typeof raw !== "object") return base;
  ["YOU", "AI"].forEach((team) => {
    base.teams[team] = { ...base.teams[team], ...(raw.teams && raw.teams[team]) };
    base.players[team] = { ...base.players[team], ...(raw.players && raw.players[team]) };
    ROLES.forEach((role) => {
      base.players[team][role] = { ...base.players[team][role], ...(raw.players && raw.players[team] && raw.players[team][role]) };
    });
  });
  return base;
}

function saveStats() {
  localStorage.setItem(STATS_KEY, JSON.stringify(state.stats));
}

function recordShot(teamKey, playerIndex, shot, made) {
  const teamLabel = teamKey === "you" ? "YOU" : "AI";
  const opponentLabel = teamKey === "you" ? "AI" : "YOU";
  const role = ROSTER[playerIndex].role;

  const teamStats = state.stats.teams[teamLabel];
  const playerStats = state.stats.players[teamLabel][role];

  teamStats.shots[shot].att += 1;
  playerStats.fga += 1;
  if (shot === "three") playerStats.threeAtt += 1;

  if (made) {
    teamStats.shots[shot].made += 1;
    playerStats.fgm += 1;
    if (shot === "three") playerStats.threeMade += 1;
    const points = SHOT_POINTS[shot];
    playerStats.points += points;
    teamStats.pointsFor += points;
    state.stats.teams[opponentLabel].pointsAgainst += points;
  }
  saveStats();
}

function recordTurnover(teamKey, playerIndex) {
  const teamLabel = teamKey === "you" ? "YOU" : "AI";
  const role = ROSTER[playerIndex].role;
  state.stats.teams[teamLabel].turnovers += 1;
  state.stats.players[teamLabel][role].turnovers += 1;
  saveStats();
}

function recordOrb(teamKey, playerIndex) {
  const teamLabel = teamKey === "you" ? "YOU" : "AI";
  const role = ROSTER[playerIndex].role;
  state.stats.teams[teamLabel].orb += 1;
  state.stats.players[teamLabel][role].orb += 1;
  saveStats();
}

function recordWin(winner) {
  if (winner === "YOU") {
    state.stats.teams.YOU.wins += 1;
    state.stats.teams.AI.losses += 1;
  } else {
    state.stats.teams.AI.wins += 1;
    state.stats.teams.YOU.losses += 1;
  }
  saveStats();
}

function renderStats() {
  if (!state.stats) return;
  const you = state.stats.teams.YOU;
  const ai = state.stats.teams.AI;
  els.statsSummary.textContent = `${you.wins}-${you.losses}`;

  const teamCards = [
    renderTeamCard(t("team_you"), you),
    renderTeamCard(t("team_ai"), ai)
  ];

  const playerCards = [
    renderPlayerCard(t("team_you"), state.stats.players.YOU),
    renderPlayerCard(t("team_ai"), state.stats.players.AI)
  ];

  els.statsContent.innerHTML = [
    `<div class="stats-card"><h3>${t("stats_title")}</h3></div>`,
    ...teamCards,
    ...playerCards
  ].join("");
}

function renderTeamCard(label, stats) {
  return `
    <div class="stats-card">
      <h3>${label}</h3>
      <div class="stats-grid">
        <div>PF: ${stats.pointsFor}</div>
        <div>PA: ${stats.pointsAgainst}</div>
        <div>W: ${stats.wins}</div>
        <div>L: ${stats.losses}</div>
        <div>TO: ${stats.turnovers}</div>
        <div>ORB: ${stats.orb}</div>
      </div>
      <table class="stats-table">
        <thead>
          <tr><th>Shot</th><th>Made</th><th>Att</th></tr>
        </thead>
        <tbody>
          <tr><td>${t("shot_layup")}</td><td>${stats.shots.layup.made}</td><td>${stats.shots.layup.att}</td></tr>
          <tr><td>${t("shot_mid")}</td><td>${stats.shots.mid.made}</td><td>${stats.shots.mid.att}</td></tr>
          <tr><td>${t("shot_three")}</td><td>${stats.shots.three.made}</td><td>${stats.shots.three.att}</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderPlayerCard(label, players) {
  return `
    <div class="stats-card">
      <h3>${label} - ${t("players")}</h3>
      <table class="stats-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>PTS</th>
            <th>FGM/FGA</th>
            <th>3PT</th>
            <th>TO</th>
            <th>ORB</th>
          </tr>
        </thead>
        <tbody>
          ${ROLES.map((role) => {
            const p = players[role];
            return `<tr>
              <td>${role}</td>
              <td>${p.points}</td>
              <td>${p.fgm}/${p.fga}</td>
              <td>${p.threeMade}/${p.threeAtt}</td>
              <td>${p.turnovers}</td>
              <td>${p.orb}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function setupLineups() {
  const list = (teamLabel) =>
    ROSTER.map(
      (p) =>
        `${p.role} | TO ${p.TO} LAY ${p.LAY} MID ${p.MID} 3PT ${p.THREE} ORB ${p.ORB}`
    ).join("<br>");

  els.lineupsContent.innerHTML = `
    <div>
      <div class="team-title">${t("team_you")}</div>
      <div>${list("YOU")}</div>
    </div>
    <div>
      <div class="team-title">${t("team_ai")}</div>
      <div>${list("AI")}</div>
    </div>
  `;
}

function startCoach() {
  state.coachMode = true;
  coachIndex = 0;
  showScreen("game");
  startGame(true);
  state.dice.d1 = 6;
  state.dice.d2 = 5;
  state.dice.d3 = 2;
  setDiceValue(els.dice1, 6);
  setDiceValue(els.dice2, 5);
  setDiceValue(els.dice3, 2);
  state.phase = "choose_player";
  updateControls();
  els.coachOverlay.classList.remove("hidden");
  state.log = [];
  addLog(t("tutorial_interactive"));
  renderCoachStep();
}

function renderCoachStep() {
  const step = coachSteps[coachIndex];
  const target = document.querySelector(step.selector);
  if (!target) return;

  if (coachIndex === 1) {
    state.activePlayerIndex = 0;
    updateLabels();
  }

  if (coachIndex === 2) {
    setActiveShot("layup");
  }

  if (coachIndex === 3) {
    addLog(`${t("log_context")}: ${contextLabel(5)}`);
  }

  if (coachIndex === 4) {
    addLog(`${t("log_outcome")}: 2 / 4`);
  }

  const rect = target.getBoundingClientRect();
  els.coachFocus.style.top = `${rect.top - 6}px`;
  els.coachFocus.style.left = `${rect.left - 6}px`;
  els.coachFocus.style.width = `${rect.width + 12}px`;
  els.coachFocus.style.height = `${rect.height + 12}px`;
  els.coachText.textContent = t(step.textKey);
}

function nextCoachStep() {
  coachIndex += 1;
  if (coachIndex >= coachSteps.length) {
    stopCoach();
    return;
  }
  renderCoachStep();
}

function prevCoachStep() {
  coachIndex = Math.max(0, coachIndex - 1);
  renderCoachStep();
}

function stopCoach() {
  state.coachMode = false;
  els.coachOverlay.classList.add("hidden");
  startGame(true);
  showScreen("home");
}

function setupEvents() {
  els.playBtn.addEventListener("click", () => {
    showScreen("game");
    startGame(true);
  });
  els.statsBtn.addEventListener("click", () => showScreen("stats"));
  els.tutorialBtn.addEventListener("click", () => showScreen("tutorial"));
  els.coachBtn.addEventListener("click", () => startCoach());
  els.homeBtn.addEventListener("click", () => showScreen("home"));
  els.homeBtnStats.addEventListener("click", () => showScreen("home"));
  els.homeBtnTutorial.addEventListener("click", () => showScreen("home"));
  els.langSelect.addEventListener("change", (e) => setLang(e.target.value));
  els.soundBtn.addEventListener("click", () => {
    state.mute = !state.mute;
    els.soundBtn.classList.toggle("muted", state.mute);
  });
  els.newGameBtn.addEventListener("click", () => startGame(true));

  els.playerChooser.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.phase !== "choose_player") return;
      state.activePlayerIndex = parseInt(btn.dataset.player, 10);
      state.phase = "choose_shot";
      addLog(`${t("log_pick")}: ${ROSTER[state.activePlayerIndex].role}`);
      updateControls();
    });
  });

  els.shotButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.phase !== "choose_shot" && !state.coachMode) return;
      setActiveShot(btn.dataset.shot);
      if (!state.coachMode) {
        state.phase = "roll_outcome";
        addLog(`${t("log_shot")}: ${shotLabel(state.shot)}`);
        updateControls();
      }
    });
  });

  els.rollBtn.addEventListener("click", () => {
    if (state.phase === "roll_player") {
      handlePlayerRoll();
      return;
    }
    if (state.phase === "roll_outcome") {
      state.phase = "rolling_outcome";
      updateControls();
      rollOutcomeAnimated("you", TIMINGS.userD2Delay, TIMINGS.userD3Delay);
    }
  });

  els.coachNext.addEventListener("click", nextCoachStep);
  els.coachPrev.addEventListener("click", prevCoachStep);
  els.coachSkip.addEventListener("click", stopCoach);
}

function init() {
  const storedLang = localStorage.getItem(LANG_KEY);
  if (storedLang && i18n[storedLang]) state.lang = storedLang;
  els.langSelect.value = state.lang;

  const storedStats = (() => {
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY));
    } catch (err) {
      return null;
    }
  })();
  state.stats = normalizeStats(storedStats);
  saveStats();

  setLang(state.lang);
  setupLineups();
  setupEvents();
  startGame(true);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

init();
