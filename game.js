window.addEventListener("DOMContentLoaded", () => {
  /***********************
   * CONFIG
   ***********************/
  const CONFIG = {
    targetScore: 21,
    rollAnimMs: 520,
    aiRandomness: 0.25,
    fxDurationMs: 520,
  };

  const $ = (id) => document.getElementById(id);

  /***********************
   * i18n (IT / EN / ES)
   ***********************/
  const LANG_KEY = "basket_dice_lang_v1";

  const I18N = {
    it: {
      play: "Gioca",
      stats: "Statistiche",
      tutorial: "Tutorial",
      language: "Lingua",
      choose: "Scegli",
      tip: "Tip: se esce 6 sul Dado 2 scegli tu il tiro e il Dado 3 parte da solo.",
      teamsTitle: "Squadre & roster (salvati)",
      teamYou: "Squadra YOU",
      teamAi: "Squadra AI",
      playersYou: "Giocatori YOU",
      noteSkills: "Nota: le skill restano quelle base (PM / all-around / big).",
      possession: "Possesso",
      rollPlayer: "Lancia Dado 1 (giocatore)",
      rollAction: "Lancia Dado 2 (azione)",
      rollResult: "Lancia Dado 3 (esito tiro)",
      chooseShot: "Hai fatto 6: scegli il tiro",
      chooseShotShort: "Hai fatto 6: scegli il tiro",
      newGame: "Nuova",
      roll: "Lancia",
      menu: "Menu",
      tutorialTitle: "Tutorial",
      statsTitle: "Statistiche",
      scoreTo: "Primo a",
      soundsOn: "Suoni: ON",
      soundsOff: "Suoni: OFF",
      autoRoll: "Lancio automatico Dado 3…",
      rolling: "Lancio…",
      ready: "Pronto",
      turnover: "Turnover",
      bucket: "CANESTRO!",
      swish: "SWISH!",
      clank: "CLANK",
      board: "RIMBALZO!",
      noReb: "NO REB",
      gameOverWin: "YOU WIN",
      gameOverLose: "YOU LOSE",
      endMatch: "Fine partita: vince",
      newMatch: "🏁 Nuova partita. Arriva a <b>{N}</b> per vincere.",
      aiChooseClose: "🤖 AI sceglie: <b>sotto</b>.",
      aiChooseThree: "🤖 AI sceglie: <b>da 3</b>.",
      actionClose: "🎯 Azione: <b>Tiro da sotto (2)</b>.",
      actionThree: "🎯 Azione: <b>Tiro da 3 (3)</b>.",
      youPickedClose: "🎯 Hai scelto: <b>Tiro da sotto (2)</b>.",
      youPickedThree: "🎯 Hai scelto: <b>Tiro da 3 (3)</b>.",
      logPlayerPick: "<b>{TEAM}</b>: Dado 1 = <b>{V}</b> → {P}",
      logTurnover: "🟥 Turnover! (<b>{TEAM}</b>) perde palla.",
      logMade: "✅ <b>{TEAM}</b> segna! ({P}) <b>+{PTS}</b> — (D3={V}, {SKILL}).",
      logMiss: "❌ Errore. ({P}) — (D3={V}, {SKILL}).",
      logRebWon: "🏀 <b>{TEAM}</b> prende rimbalzo! ({P}) — (D={V}, {REB}).",
      logRebLost: "🙅 Rimbalzo perso. ({P}) — (D={V}, {REB}). Cambio possesso.",
      statsSaved: "Salvate in locale",
      statsResetConfirm: "Vuoi davvero resettare tutte le statistiche?",
      statsUpdatedNote: "Aggiornate a fine partita (quando qualcuno arriva a 21).",
      chooseShotTitle: "Hai fatto 6: scegli il tiro",
      chooseCloseBtn: "Tiro da sotto (2)",
      chooseThreeBtn: "Tiro da 3 (3)",
      rollDie1: "Lancia Dado 1 (giocatore)",
      rollDie2: "Lancia Dado 2 (azione)",
      rollRebound: "Lancia per rimbalzo",
    },
    en: {
      play: "Play",
      stats: "Stats",
      tutorial: "Tutorial",
      language: "Language",
      choose: "Choose",
      tip: "Tip: if you roll 6 on Die 2 you choose the shot and Die 3 auto-rolls.",
      teamsTitle: "Teams & roster (saved)",
      teamYou: "YOUR team",
      teamAi: "AI team",
      playersYou: "YOUR players",
      noteSkills: "Note: skills are fixed (PM / all-around / big).",
      possession: "Possession",
      rollPlayer: "Roll Die 1 (player)",
      rollAction: "Roll Die 2 (action)",
      rollResult: "Roll Die 3 (shot result)",
      chooseShot: "You rolled 6: choose the shot",
      chooseShotShort: "Rolled 6: choose shot",
      newGame: "New",
      roll: "Roll",
      menu: "Menu",
      tutorialTitle: "Tutorial",
      statsTitle: "Stats",
      scoreTo: "First to",
      soundsOn: "Sound: ON",
      soundsOff: "Sound: OFF",
      autoRoll: "Auto-rolling Die 3…",
      rolling: "Rolling…",
      ready: "Ready",
      turnover: "TURNOVER",
      bucket: "BUCKET!",
      swish: "SWISH!",
      clank: "CLANK",
      board: "BOARD!",
      noReb: "NO REB",
      gameOverWin: "YOU WIN",
      gameOverLose: "YOU LOSE",
      endMatch: "Game over: winner",
      newMatch: "🏁 New game. Reach <b>{N}</b> to win.",
      aiChooseClose: "🤖 AI chooses: <b>close</b>.",
      aiChooseThree: "🤖 AI chooses: <b>three</b>.",
      actionClose: "🎯 Action: <b>Close shot (2)</b>.",
      actionThree: "🎯 Action: <b>Three-point (3)</b>.",
      youPickedClose: "🎯 You chose: <b>Close shot (2)</b>.",
      youPickedThree: "🎯 You chose: <b>Three-point (3)</b>.",
      logPlayerPick: "<b>{TEAM}</b>: Die 1 = <b>{V}</b> → {P}",
      logTurnover: "🟥 Turnover! (<b>{TEAM}</b>) loses the ball.",
      logMade: "✅ <b>{TEAM}</b> scores! ({P}) <b>+{PTS}</b> — (D3={V}, {SKILL}).",
      logMiss: "❌ Miss. ({P}) — (D3={V}, {SKILL}).",
      logRebWon: "🏀 <b>{TEAM}</b> gets the rebound! ({P}) — (D={V}, {REB}).",
      logRebLost: "🙅 Rebound lost. ({P}) — (D={V}, {REB}). Possession switches.",
      statsSaved: "Saved locally",
      statsResetConfirm: "Reset all stats?",
      statsUpdatedNote: "Updated at end of each game (when someone reaches 21).",
      chooseShotTitle: "You rolled 6: choose the shot",
      chooseCloseBtn: "Close shot (2)",
      chooseThreeBtn: "Three-point (3)",
      rollDie1: "Roll Die 1 (player)",
      rollDie2: "Roll Die 2 (action)",
      rollRebound: "Roll for rebound",
    },
    es: {
      play: "Jugar",
      stats: "Estadísticas",
      tutorial: "Tutorial",
      language: "Idioma",
      choose: "Elige",
      tip: "Tip: si sacas 6 en el Dado 2 eliges el tiro y el Dado 3 se lanza solo.",
      teamsTitle: "Equipos y plantel (guardado)",
      teamYou: "Tu equipo",
      teamAi: "Equipo IA",
      playersYou: "Tus jugadores",
      noteSkills: "Nota: las habilidades son fijas (PM / all-around / big).",
      possession: "Posesión",
      rollPlayer: "Lanza Dado 1 (jugador)",
      rollAction: "Lanza Dado 2 (acción)",
      rollResult: "Lanza Dado 3 (resultado)",
      chooseShot: "Sacaste 6: elige el tiro",
      chooseShotShort: "Sacaste 6: elige",
      newGame: "Nueva",
      roll: "Lanzar",
      menu: "Menú",
      tutorialTitle: "Tutorial",
      statsTitle: "Estadísticas",
      scoreTo: "Primero a",
      soundsOn: "Sonido: ON",
      soundsOff: "Sonido: OFF",
      autoRoll: "Lanzando Dado 3 automáticamente…",
      rolling: "Lanzando…",
      ready: "Listo",
      turnover: "PÉRDIDA",
      bucket: "¡CANASTA!",
      swish: "¡SWISH!",
      clank: "CLANK",
      board: "¡REBOTE!",
      noReb: "SIN REB",
      gameOverWin: "GANAS",
      gameOverLose: "PIERDES",
      endMatch: "Fin del partido: gana",
      newMatch: "🏁 Nueva partida. Llega a <b>{N}</b> para ganar.",
      aiChooseClose: "🤖 IA elige: <b>cerca</b>.",
      aiChooseThree: "🤖 IA elige: <b>triple</b>.",
      actionClose: "🎯 Acción: <b>Tiro cerca (2)</b>.",
      actionThree: "🎯 Acción: <b>Triple (3)</b>.",
      youPickedClose: "🎯 Elegiste: <b>Tiro cerca (2)</b>.",
      youPickedThree: "🎯 Elegiste: <b>Triple (3)</b>.",
      logPlayerPick: "<b>{TEAM}</b>: Dado 1 = <b>{V}</b> → {P}",
      logTurnover: "🟥 Pérdida! (<b>{TEAM}</b>) pierde la pelota.",
      logMade: "✅ <b>{TEAM}</b> anota! ({P}) <b>+{PTS}</b> — (D3={V}, {SKILL}).",
      logMiss: "❌ Fallo. ({P}) — (D3={V}, {SKILL}).",
      logRebWon: "🏀 <b>{TEAM}</b> toma el rebote! ({P}) — (D={V}, {REB}).",
      logRebLost: "🙅 Rebote perdido. ({P}) — (D={V}, {REB}). Cambia posesión.",
      statsSaved: "Guardadas localmente",
      statsResetConfirm: "¿Resetear todas las estadísticas?",
      statsUpdatedNote: "Se actualizan al final del partido (cuando alguien llega a 21).",
      chooseShotTitle: "Sacaste 6: elige el tiro",
      chooseCloseBtn: "Tiro cerca (2)",
      chooseThreeBtn: "Triple (3)",
      rollDie1: "Lanza Dado 1 (jugador)",
      rollDie2: "Lanza Dado 2 (acción)",
      rollRebound: "Lanza para rebote",
    }
  };

  let lang = localStorage.getItem(LANG_KEY) || "it";
  if (!I18N[lang]) lang = "it";

  function t(key, vars = null) {
    const base = (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : (I18N.it[key] || key);
    if (!vars) return base;
    return base.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
  }

  function setLang(newLang) {
    if (!I18N[newLang]) return;
    lang = newLang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations();
  }

  /***********************
   * Screens
   ***********************/
  const Screens = {
    landing: $("screenLanding"),
    tutorial: $("screenTutorial"),
    game: $("screenGame"),
    stats: $("screenStats"),
  };

  function showScreen(name) {
    Object.entries(Screens).forEach(([k, el]) => {
      const active = k === name;
      el.classList.toggle("screen--active", active);
      el.setAttribute("aria-hidden", active ? "false" : "true");
    });
    if (name === "stats") renderStatsUI();
  }

  /***********************
   * Sound (WebAudio)
   ***********************/
  const Sound = { enabled: true, ctx: null };

  function getAudioCtx() {
    if (!Sound.ctx) Sound.ctx = new (window.AudioContext || window.webkitAudioContext)();
    return Sound.ctx;
  }

  async function ensureAudioReady() {
    if (!Sound.enabled) return;
    try {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") await ctx.resume();
    } catch {}
  }

  function beep({ freq = 440, duration = 0.09, type = "sine", gain = 0.06 } = {}) {
    if (!Sound.enabled) return;
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(g);
    g.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  const sfx = {
    swish() {
      beep({ freq: 520, type: "sine", duration: 0.08, gain: 0.07 });
      setTimeout(() => beep({ freq: 780, type: "triangle", duration: 0.09, gain: 0.06 }), 55);
      setTimeout(() => beep({ freq: 1040, type: "triangle", duration: 0.10, gain: 0.05 }), 110);
    },
    clank() {
      beep({ freq: 180, type: "square", duration: 0.10, gain: 0.06 });
      setTimeout(() => beep({ freq: 140, type: "square", duration: 0.09, gain: 0.05 }), 70);
    },
    turnover() {
      beep({ freq: 260, type: "sawtooth", duration: 0.08, gain: 0.05 });
      setTimeout(() => beep({ freq: 180, type: "sawtooth", duration: 0.10, gain: 0.05 }), 70);
    },
    board(good) {
      beep({ freq: good ? 420 : 220, type: good ? "triangle" : "sawtooth", duration: 0.08, gain: 0.05 });
    }
  };

  /***********************
   * Teams (localStorage)
   ***********************/
  const TEAM_KEY = "basket_dice_teams_v1";
  const defaultTeams = () => ({
    humanName: "YOU",
    aiName: "AI",
    players: ["Playmaker 1","Playmaker 2","All-around 3","All-around 4","Big 5","Big 6"],
  });

  function loadTeams() {
    try {
      const raw = localStorage.getItem(TEAM_KEY);
      if (!raw) return defaultTeams();
      const parsed = JSON.parse(raw);
      const d = defaultTeams();
      return {
        humanName: (parsed.humanName || d.humanName).trim() || d.humanName,
        aiName: (parsed.aiName || d.aiName).trim() || d.aiName,
        players: Array.isArray(parsed.players) && parsed.players.length === 6
          ? parsed.players.map((x, i) => (String(x || "").trim() || d.players[i]))
          : d.players,
      };
    } catch {
      return defaultTeams();
    }
  }

  function saveTeams(data) {
    const d = defaultTeams();
    const safe = {
      humanName: (data.humanName || d.humanName).trim() || d.humanName,
      aiName: (data.aiName || d.aiName).trim() || d.aiName,
      players: (data.players || d.players).map((x, i) => (String(x || "").trim() || d.players[i])),
    };
    localStorage.setItem(TEAM_KEY, JSON.stringify(safe));
  }

  function fillTeamInputsFromSaved() {
    const tSaved = loadTeams();
    const h = $("teamHumanName");
    const a = $("teamAIName");
    if (h) h.value = tSaved.humanName;
    if (a) a.value = tSaved.aiName;
    const ids = ["p1","p2","p3","p4","p5","p6"];
    ids.forEach((id, i) => {
      const el = $(id);
      if (el) el.value = tSaved.players[i];
    });
  }

  /***********************
   * Stats (localStorage)
   ***********************/
  const STATS_KEY = "basket_dice_stats_v1";
  const defaultStats = () => ({
    games: 0, wins: 0, losses: 0,
    ptsFor: 0, ptsAgainst: 0,
    twoMade: 0, twoAtt: 0,
    threeMade: 0, threeAtt: 0,
    turnovers: 0,
    reboundsWon: 0, reboundsLost: 0,
  });

  function loadStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (!raw) return defaultStats();
      const parsed = JSON.parse(raw);
      return { ...defaultStats(), ...parsed };
    } catch {
      return defaultStats();
    }
  }

  function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }
  function resetStats() { saveStats(defaultStats()); renderStatsUI(); }

  let Stats = loadStats();

  function renderStatsUI() {
    Stats = loadStats();
    const fgMade = Stats.twoMade + Stats.threeMade;
    const fgAtt  = Stats.twoAtt + Stats.threeAtt;
    const winPct = Stats.games ? Math.round((Stats.wins / Stats.games) * 100) : 0;
    const fgPct  = fgAtt ? Math.round((fgMade / fgAtt) * 100) : 0;

    const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };

    set("stGames", Stats.games);
    set("stWins", Stats.wins);
    set("stLosses", Stats.losses);
    set("stWinPct", `${winPct}%`);

    set("stPtsFor", Stats.ptsFor);
    set("stPtsAgainst", Stats.ptsAgainst);
    set("stDiff", Stats.ptsFor - Stats.ptsAgainst);

    set("st2pt", `${Stats.twoMade}/${Stats.twoAtt}`);
    set("st3pt", `${Stats.threeMade}/${Stats.threeAtt}`);
    set("stFgPct", `${fgPct}%`);

    set("stTov", Stats.turnovers);
    set("stRebWon", Stats.reboundsWon);
    set("stRebLost", Stats.reboundsLost);
  }

  /***********************
   * Helpers
   ***********************/
  function rollDie() { return Math.floor(Math.random() * 6) + 1; }
  function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  function skillBadge(label, level) {
    const cls = level === "good" ? "good" : level === "bad" ? "bad" : "medium";
    return `<span class="badge ${cls}">${label}: ${level}</span>`;
  }

  function actionFromDie(v) {
    if (v === 1) return { type: "turnover" };
    if (v === 2 || v === 3) return { type: "close" };
    if (v === 4 || v === 5) return { type: "three" };
    return { type: "choose" };
  }

  function shotThreshold(skillLevel) {
    if (skillLevel === "good") return { scoreMin: 3 };
    if (skillLevel === "bad")  return { scoreMin: 5 };
    return { scoreMin: 4 };
  }

  function reboundSuccessOn(skillLevel) {
    if (skillLevel === "strong") return { min: 4 };
    if (skillLevel === "weak")   return { min: 6 };
    return { min: 5 };
  }

  function levelToScore(level) { return level === "good" ? 70 : level === "medium" ? 50 : 30; }

  /***********************
   * Teams build
   ***********************/
  function makeTeam(name, customPlayers) {
    const base = [
      { role:"Playmaker", shooting_close:"bad",    shooting_3:"good",   rebound:"weak" },
      { role:"Playmaker", shooting_close:"bad",    shooting_3:"good",   rebound:"weak" },
      { role:"All-around",shooting_close:"medium", shooting_3:"medium", rebound:"medium" },
      { role:"All-around",shooting_close:"medium", shooting_3:"medium", rebound:"medium" },
      { role:"Big",       shooting_close:"good",   shooting_3:"bad",    rebound:"strong" },
      { role:"Big",       shooting_close:"good",   shooting_3:"bad",    rebound:"strong" },
    ];
    return {
      name,
      players: base.map((b, i) => ({
        id: i + 1,
        name: (customPlayers?.[i] || `${b.role} ${i + 1}`),
        ...b,
      })),
    };
  }

  let humanTeam = null;
  let aiTeam = null;

  function applyTeamsFromInputsAndSave() {
    const hEl = $("teamHumanName");
    const aEl = $("teamAIName");
    const data = {
      humanName: (hEl ? hEl.value : "YOU").trim() || "YOU",
      aiName: (aEl ? aEl.value : "AI").trim() || "AI",
      players: ["p1","p2","p3","p4","p5","p6"].map((id) => {
        const el = $(id);
        return el ? el.value : "";
      }),
    };
    saveTeams(data);

    const saved = loadTeams();
    humanTeam = makeTeam(saved.humanName, saved.players);
    aiTeam = makeTeam(saved.aiName, null);

    const shLab = $("scoreHumanLabel");
    const saLab = $("scoreAILabel");
    if (shLab) shLab.textContent = saved.humanName.toUpperCase();
    if (saLab) saLab.textContent = saved.aiName.toUpperCase();

    const sub = $("matchSubtitle");
    if (sub) sub.textContent = `${t("scoreTo")} ${CONFIG.targetScore}`;
  }

  function teamOf(possession) { return possession === "HUMAN" ? humanTeam : aiTeam; }

  /***********************
   * State
   ***********************/
  const State = {
    possession: "HUMAN",
    scores: { HUMAN: 0, AI: 0 },
    activePlayerId: null,
    phase: "NEED_PLAYER",
    lastShotType: null,
  };

  const MatchStats = {
    twoAtt: 0, twoMade: 0,
    threeAtt: 0, threeMade: 0,
    turnoversHuman: 0,
    reboundsWon: 0,
    reboundsLost: 0,
  };

  function resetMatchStats() {
    MatchStats.twoAtt = 0; MatchStats.twoMade = 0;
    MatchStats.threeAtt = 0; MatchStats.threeMade = 0;
    MatchStats.turnoversHuman = 0;
    MatchStats.reboundsWon = 0;
    MatchStats.reboundsLost = 0;
  }

  function commitMatchToGlobalStats() {
    Stats = loadStats();
    Stats.games += 1;

    const humanPts = State.scores.HUMAN;
    const aiPts = State.scores.AI;

    Stats.ptsFor += humanPts;
    Stats.ptsAgainst += aiPts;

    if (humanPts >= CONFIG.targetScore) Stats.wins += 1;
    else Stats.losses += 1;

    Stats.twoAtt += MatchStats.twoAtt;
    Stats.twoMade += MatchStats.twoMade;
    Stats.threeAtt += MatchStats.threeAtt;
    Stats.threeMade += MatchStats.threeMade;

    Stats.turnovers += MatchStats.turnoversHuman;
    Stats.reboundsWon += MatchStats.reboundsWon;
    Stats.reboundsLost += MatchStats.reboundsLost;

    saveStats(Stats);
  }

  /***********************
   * UI refs
   ***********************/
  const UI = {
    btnGoPlay: $("btnGoPlay"),
    btnGoStats: $("btnGoStats"),
    btnGoTutorial: $("btnGoTutorial"),
    btnTutBack: $("btnTutBack"),

    btnBackHome: $("btnBackHome"),
    btnStatsBack: $("btnStatsBack"),
    btnResetStats: $("btnResetStats"),
    btnSoundToggle: $("btnSoundToggle"),

    die1: $("die1"),
    die2: $("die2"),
    die3: $("die3"),
    scoreHuman: $("scoreHuman"),
    scoreAI: $("scoreAI"),
    possessionPill: $("possessionPill"),
    statusPill: $("statusPill"),
    activePlayer: $("activePlayer"),
    activeSkills: $("activeSkills"),
    logBox: $("logBox"),
    btnRoll: $("btnRoll"),
    btnNew: $("btnNew"),
    choiceBox: $("choiceBox"),
    btnChooseClose: $("btnChooseClose"),
    btnChooseThree: $("btnChooseThree"),

    fxFlash: $("fxFlash"),
    fxBanner: $("fxBanner"),
    fxBannerText: $("fxBannerText"),
    fxFloat: $("fxFloat"),
    shotmeterFill: $("shotmeterFill"),
    ballShot: $("ballShot"),
  };

  function logLine(html) {
    const div = document.createElement("div");
    div.className = "log-line";
    div.innerHTML = html;
    UI.logBox.appendChild(div);
    UI.logBox.scrollTop = UI.logBox.scrollHeight;
  }

  function setStatus(text) { UI.statusPill.textContent = text; }

  function setPossessionPill() {
    const name = State.possession === "HUMAN" ? humanTeam.name : aiTeam.name;
    UI.possessionPill.textContent = `${t("possession")}: ${name}`;
  }

  function renderScores() {
    UI.scoreHuman.textContent = String(State.scores.HUMAN);
    UI.scoreAI.textContent = String(State.scores.AI);
  }

  function setDice(d1, d2, d3) {
    UI.die1.textContent = d1 ?? "-";
    UI.die2.textContent = d2 ?? "-";
    UI.die3.textContent = d3 ?? "-";
  }

  function showChoice(show) {
    UI.choiceBox.setAttribute("aria-hidden", show ? "false" : "true");
  }

  async function animateRoll(dieEl, finalValue) {
    dieEl.classList.add("rolling");
    const start = Date.now();
    while (Date.now() - start < CONFIG.rollAnimMs) {
      dieEl.textContent = String(rollDie());
      await sleep(60);
    }
    dieEl.classList.remove("rolling");
    dieEl.textContent = String(finalValue);
  }

  function getActivePlayer() {
    const tTeam = teamOf(State.possession);
    return tTeam.players.find((p) => p.id === State.activePlayerId) || null;
  }

  function renderActivePlayer() {
    const p = getActivePlayer();
    if (!p) {
      UI.activePlayer.textContent = "—";
      UI.activeSkills.innerHTML = "";
      if (UI.shotmeterFill) UI.shotmeterFill.style.width = "0%";
      return;
    }
    UI.activePlayer.textContent = `${p.name} (#${p.id})`;
    UI.activeSkills.innerHTML =
      skillBadge("close", p.shooting_close) +
      skillBadge("3pt", p.shooting_3) +
      skillBadge("rebound", p.rebound);

    const base = Math.round((levelToScore(p.shooting_close) + levelToScore(p.shooting_3)) / 2);
    if (UI.shotmeterFill) UI.shotmeterFill.style.width = `${base}%`;
  }

  function updateShotMeterForShot(player, shotType) {
    if (!UI.shotmeterFill) return;
    const lvl = shotType === "close" ? player.shooting_close : player.shooting_3;
    UI.shotmeterFill.style.width = `${levelToScore(lvl)}%`;
  }

  /***********************
   * FX
   ***********************/
  function fxFlash() {
    if (!UI.fxFlash) return;
    UI.fxFlash.classList.add("on");
    setTimeout(() => UI.fxFlash.classList.remove("on"), 170);
  }

  function fxBanner(text, kind) {
    if (!UI.fxBanner || !UI.fxBannerText) return;
    UI.fxBannerText.textContent = text;
    UI.fxBannerText.classList.remove("good", "bad");
    UI.fxBannerText.classList.add(kind);
    UI.fxBanner.classList.add("on");
    setTimeout(() => UI.fxBanner.classList.remove("on"), CONFIG.fxDurationMs);
  }

  function fxFloat(text) {
    if (!UI.fxFloat) return;
    UI.fxFloat.textContent = text;
    UI.fxFloat.classList.add("on");
    setTimeout(() => UI.fxFloat.classList.remove("on"), 420);
  }

  function animateBall(made) {
    if (!UI.ballShot) return;
    UI.ballShot.classList.remove("make", "miss", "on");
    void UI.ballShot.offsetWidth;
    UI.ballShot.classList.add("on", made ? "make" : "miss");
    setTimeout(() => UI.ballShot.classList.remove("on", "make", "miss"), 700);
  }

  /***********************
   * AI
   ***********************/
  function aiChooseShotType(player) {
    const closeLevel = player.shooting_close;
    const threeLevel = player.shooting_3;

    if (closeLevel === "good" && threeLevel !== "good") return "close";
    if (threeLevel === "good" && closeLevel !== "good") return "three";

    if (Math.random() < CONFIG.aiRandomness) return Math.random() < 0.5 ? "close" : "three";

    const score = (lvl) => (lvl === "good" ? 2 : lvl === "medium" ? 1 : 0);
    return score(closeLevel) >= score(threeLevel) ? "close" : "three";
  }

  /***********************
   * Core gameplay
   ***********************/
  async function stepRollPlayer() {
    setStatus(t("rolling"));
    const v = rollDie();
    await animateRoll(UI.die1, v);
    State.activePlayerId = v;
    renderActivePlayer();

    const p = getActivePlayer();
    logLine(t("logPlayerPick", { TEAM: teamOf(State.possession).name, V: v, P: p.name }));
    State.phase = "NEED_ACTION";
    setStatus(t("rollDie2"));
  }

  async function stepRollAction() {
    setStatus(t("rolling"));
    const v = rollDie();
    await animateRoll(UI.die2, v);

    const p = getActivePlayer();
    const action = actionFromDie(v);

    if (action.type === "turnover") {
      logLine(t("logTurnover", { TEAM: teamOf(State.possession).name }));
      fxBanner(t("turnover"), "bad");
      fxFlash();
      sfx.turnover();

      if (State.possession === "HUMAN") MatchStats.turnoversHuman += 1;

      setStatus(`${t("turnover")} → ${t("rollDie1")}`);
      await sleep(300);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
      return;
    }

    if (action.type === "choose") {
      logLine(`🎲 Dado 2 = <b>6</b> → ${t("choose")}.`);
      if (State.possession === "HUMAN") {
        State.phase = "NEED_CHOICE";
        setStatus(t("chooseShotShort"));
        showChoice(true);
        UI.btnRoll.disabled = true;
      } else {
        const chosen = aiChooseShotType(p);
        State.lastShotType = chosen;
        updateShotMeterForShot(p, chosen);
        logLine(chosen === "close" ? t("aiChooseClose") : t("aiChooseThree"));
        State.phase = "NEED_RESULT";
        setStatus(t("rollResult"));
        await maybeAutoPlayAI();
      }
      return;
    }

    State.lastShotType = action.type;
    updateShotMeterForShot(p, action.type);
    logLine(action.type === "close" ? t("actionClose") : t("actionThree"));
    State.phase = "NEED_RESULT";
    setStatus(t("rollResult"));
    if (State.possession === "AI") await maybeAutoPlayAI();
  }

  async function stepRollResult() {
    const p = getActivePlayer();
    const shotType = State.lastShotType;
    if (!p || !shotType) return;

    setStatus(t("rolling"));
    const v = rollDie();
    await animateRoll(UI.die3, v);

    const skillLevel = shotType === "close" ? p.shooting_close : p.shooting_3;
    const thr = shotThreshold(skillLevel);

    const made = v >= thr.scoreMin;
    const points = shotType === "close" ? 2 : 3;

    if (State.possession === "HUMAN") {
      if (shotType === "close") MatchStats.twoAtt += 1;
      else MatchStats.threeAtt += 1;
    }

    animateBall(made);

    if (made) {
      State.scores[State.possession] += points;
      renderScores();

      fxFlash();
      fxBanner(shotType === "close" ? t("bucket") : t("swish"), "good");
      fxFloat(`+${points}`);
      sfx.swish();

      if (State.possession === "HUMAN") {
        if (shotType === "close") MatchStats.twoMade += 1;
        else MatchStats.threeMade += 1;
      }

      logLine(t("logMade", { TEAM: teamOf(State.possession).name, P: p.name, PTS: points, V: v, SKILL: skillLevel }));
      setStatus(`${t("ready")} • +${points}`);

      if (checkGameOver()) return;

      await sleep(420);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      fxBanner(t("clank"), "bad");
      sfx.clank();
      logLine(t("logMiss", { P: p.name, V: v, SKILL: skillLevel }));
      State.phase = "NEED_REBOUND";
      setStatus(t("rollRebound"));
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function stepRollRebound() {
    const p = getActivePlayer();
    if (!p) return;

    setStatus(t("rolling"));
    const v = rollDie();
    await animateRoll(UI.die3, v);

    const req = reboundSuccessOn(p.rebound);
    const got = v >= req.min;

    if (got) {
      fxBanner(t("board"), "good");
      sfx.board(true);

      if (State.possession === "HUMAN") MatchStats.reboundsWon += 1;
      else MatchStats.reboundsLost += 1;

      logLine(t("logRebWon", { TEAM: teamOf(State.possession).name, P: p.name, V: v, REB: p.rebound }));
      State.phase = "NEED_ACTION";
      State.lastShotType = null;
      UI.die2.textContent = "-";
      UI.die3.textContent = "-";
      setStatus(t("rollDie2"));
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      fxBanner(t("noReb"), "bad");
      sfx.board(false);

      if (State.possession === "HUMAN") MatchStats.reboundsLost += 1;
      else MatchStats.reboundsWon += 1;

      logLine(t("logRebLost", { P: p.name, V: v, REB: p.rebound }));
      await sleep(280);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function autoRollAfterChoice() {
    showChoice(false);
    UI.die3.textContent = "-";
    UI.btnRoll.disabled = true;
    setStatus(t("autoRoll"));
    await sleep(120);
    await stepRollResult();
    if (State.phase !== "GAME_OVER") UI.btnRoll.disabled = State.phase === "NEED_CHOICE";
  }

  function checkGameOver() {
    const h = State.scores.HUMAN;
    const a = State.scores.AI;

    if (h >= CONFIG.targetScore || a >= CONFIG.targetScore) {
      State.phase = "GAME_OVER";
      UI.btnRoll.disabled = true;
      showChoice(false);

      const humanWon = h >= CONFIG.targetScore;
      fxBanner(humanWon ? t("gameOverWin") : t("gameOverLose"), humanWon ? "good" : "bad");
      fxFlash();
      humanWon ? sfx.swish() : sfx.clank();

      const winner = humanWon ? humanTeam.name : aiTeam.name;
      setStatus(`${t("endMatch")} ${winner}`);
      logLine(`<b>🏁</b> ${t("endMatch")} <b>${winner}</b> (${h} - ${a}).`);

      commitMatchToGlobalStats();
      return true;
    }
    return false;
  }

  function switchPossession() {
    State.possession = State.possession === "HUMAN" ? "AI" : "HUMAN";
    State.activePlayerId = null;
    State.lastShotType = null;
    State.phase = "NEED_PLAYER";
    setPossessionPill();
    renderActivePlayer();
    setDice(null, null, null);
    setStatus(t("rollDie1"));
  }

  function newGame() {
    State.possession = "HUMAN";
    State.scores = { HUMAN: 0, AI: 0 };
    State.activePlayerId = null;
    State.phase = "NEED_PLAYER";
    State.lastShotType = null;

    resetMatchStats();

    UI.btnRoll.disabled = false;
    showChoice(false);

    UI.logBox.innerHTML = "";
    renderScores();
    setPossessionPill();
    renderActivePlayer();
    setDice(null, null, null);
    setStatus(t("rollDie1"));
    logLine(t("newMatch", { N: CONFIG.targetScore }));
  }

  async function maybeAutoPlayAI() {
    if (State.possession !== "AI") return;
    if (State.phase === "GAME_OVER") return;

    UI.btnRoll.disabled = true;
    await sleep(220);

    while (State.possession === "AI" && State.phase !== "GAME_OVER") {
      if (State.phase === "NEED_PLAYER") {
        setDice(null, null, null);
        await stepRollPlayer();
        await sleep(180);
        continue;
      }
      if (State.phase === "NEED_ACTION") {
        UI.die2.textContent = "-";
        UI.die3.textContent = "-";
        await stepRollAction();
        await sleep(180);
        continue;
      }
      if (State.phase === "NEED_RESULT") {
        await stepRollResult();
        await sleep(180);
        continue;
      }
      if (State.phase === "NEED_REBOUND") {
        await stepRollRebound();
        await sleep(180);
        continue;
      }
      break;
    }

    if (State.phase !== "GAME_OVER") UI.btnRoll.disabled = State.phase === "NEED_CHOICE";
  }

  /***********************
   * applyTranslations()
   ***********************/
  function applyTranslations() {
    // Home buttons
    if (UI.btnGoPlay) UI.btnGoPlay.textContent = `🏀 ${t("play")}`;
    if (UI.btnGoStats) UI.btnGoStats.textContent = `📊 ${t("stats")}`;
    if (UI.btnGoTutorial) UI.btnGoTutorial.textContent = `📘 ${t("tutorial")}`;

    // Tip (first one on landing)
    const tipEl = document.querySelector(".landing-tip");
    if (tipEl) tipEl.textContent = t("tip");

    // Landing kicker(s)
    const kickers = document.querySelectorAll(".landing-kicker");
    if (kickers && kickers.length) {
      // first kicker = "Scegli/Choose", second = teamsTitle (se esiste)
      if (kickers[0]) kickers[0].textContent = t("choose");
      if (kickers[1]) kickers[1].textContent = t("teamsTitle");
    }

    // Labels on landing if present
    const lblYou = document.querySelector('label[for="teamHumanName"]');
    const lblAI = document.querySelector('label[for="teamAIName"]');
    if (lblYou) lblYou.textContent = t("teamYou");
    if (lblAI) lblAI.textContent = t("teamAi");

    const playersTitle = document.querySelector(".players-title");
    if (playersTitle) playersTitle.textContent = t("playersYou");

    const note = document.querySelector(".players-edit .muted.mini");
    if (note) note.textContent = t("noteSkills");

    // Game buttons
    if (UI.btnRoll) UI.btnRoll.textContent = t("roll");
    if (UI.btnNew) UI.btnNew.textContent = t("newGame");

    // Choice
    const choiceTitle = document.querySelector(".choice-title");
    if (choiceTitle) choiceTitle.textContent = t("chooseShotTitle");
    if (UI.btnChooseClose) UI.btnChooseClose.textContent = t("chooseCloseBtn");
    if (UI.btnChooseThree) UI.btnChooseThree.textContent = t("chooseThreeBtn");

    // Match subtitle
    const sub = $("matchSubtitle");
    if (sub) sub.textContent = `${t("scoreTo")} ${CONFIG.targetScore}`;

    // Possession pill refresh
    if (humanTeam && aiTeam) setPossessionPill();

    // Status refresh in idle phases
    if (State.phase === "NEED_PLAYER") setStatus(t("rollDie1"));
    if (State.phase === "NEED_ACTION") setStatus(t("rollDie2"));
    if (State.phase === "NEED_REBOUND") setStatus(t("rollRebound"));
    if (State.phase === "NEED_RESULT") setStatus(t("rollResult"));

    // Stats subtitle (if exists)
    // (quasi tutto testo in stats sta già in HTML, ma almeno la confirm cambia)
  }

  /***********************
   * Bind UI
   ***********************/
  const langSelect = $("langSelect");
  if (langSelect) {
    langSelect.value = lang;
    langSelect.addEventListener("change", () => setLang(langSelect.value));
  }

  UI.btnGoPlay?.addEventListener("click", async () => {
    await ensureAudioReady();
    applyTeamsFromInputsAndSave();
    showScreen("game");
    newGame();
  });

  UI.btnGoStats?.addEventListener("click", () => showScreen("stats"));
  UI.btnGoTutorial?.addEventListener("click", () => showScreen("tutorial"));
  UI.btnTutBack?.addEventListener("click", () => showScreen("landing"));

  UI.btnBackHome?.addEventListener("click", () => { showScreen("landing"); fillTeamInputsFromSaved(); });
  UI.btnStatsBack?.addEventListener("click", () => showScreen("landing"));

  UI.btnResetStats?.addEventListener("click", () => {
    if (confirm(t("statsResetConfirm"))) resetStats();
  });

  UI.btnSoundToggle?.addEventListener("click", async () => {
    Sound.enabled = !Sound.enabled;
    UI.btnSoundToggle.setAttribute("aria-pressed", Sound.enabled ? "true" : "false");
    UI.btnSoundToggle.textContent = Sound.enabled ? "🔊" : "🔇";
    if (Sound.enabled) await ensureAudioReady();
  });

  UI.btnNew?.addEventListener("click", newGame);

  UI.btnChooseClose?.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "close";
    State.phase = "NEED_RESULT";
    const p = getActivePlayer();
    if (p) updateShotMeterForShot(p, "close");
    logLine(t("youPickedClose"));
    await autoRollAfterChoice();
  });

  UI.btnChooseThree?.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "three";
    State.phase = "NEED_RESULT";
    const p = getActivePlayer();
    if (p) updateShotMeterForShot(p, "three");
    logLine(t("youPickedThree"));
    await autoRollAfterChoice();
  });

  UI.btnRoll?.addEventListener("click", async () => {
    if (State.phase === "GAME_OVER") return;
    await ensureAudioReady();

    UI.btnRoll.disabled = true;
    try {
      if (State.phase === "NEED_PLAYER") {
        setDice(null, null, null);
        await stepRollPlayer();
      } else if (State.phase === "NEED_ACTION") {
        UI.die2.textContent = "-";
        UI.die3.textContent = "-";
        await stepRollAction();
      } else if (State.phase === "NEED_RESULT") {
        await stepRollResult();
      } else if (State.phase === "NEED_REBOUND") {
        await stepRollRebound();
      } else if (State.phase === "NEED_CHOICE") {
        setStatus(t("chooseShotShort"));
      }
    } finally {
      if (State.phase !== "GAME_OVER") {
        UI.btnRoll.disabled = State.phase === "NEED_CHOICE";
      }
    }
  });

  /***********************
   * Init
   ***********************/
  fillTeamInputsFromSaved();
  applyTeamsFromInputsAndSave();
  showScreen("landing");
  applyTranslations();
});
