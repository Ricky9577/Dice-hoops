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
    const t = loadTeams();
    $("teamHumanName").value = t.humanName;
    $("teamAIName").value = t.aiName;
    $("p1").value = t.players[0];
    $("p2").value = t.players[1];
    $("p3").value = t.players[2];
    $("p4").value = t.players[3];
    $("p5").value = t.players[4];
    $("p6").value = t.players[5];
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

    $("stGames").textContent = Stats.games;
    $("stWins").textContent = Stats.wins;
    $("stLosses").textContent = Stats.losses;
    $("stWinPct").textContent = `${winPct}%`;

    $("stPtsFor").textContent = Stats.ptsFor;
    $("stPtsAgainst").textContent = Stats.ptsAgainst;
    $("stDiff").textContent = Stats.ptsFor - Stats.ptsAgainst;

    $("st2pt").textContent = `${Stats.twoMade}/${Stats.twoAtt}`;
    $("st3pt").textContent = `${Stats.threeMade}/${Stats.threeAtt}`;
    $("stFgPct").textContent = `${fgPct}%`;

    $("stTov").textContent = Stats.turnovers;
    $("stRebWon").textContent = Stats.reboundsWon;
    $("stRebLost").textContent = Stats.reboundsLost;
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
    const data = {
      humanName: ($("teamHumanName").value || "YOU").trim(),
      aiName: ($("teamAIName").value || "AI").trim(),
      players: [$("p1").value,$("p2").value,$("p3").value,$("p4").value,$("p5").value,$("p6").value],
    };
    saveTeams(data);

    const saved = loadTeams();
    humanTeam = makeTeam(saved.humanName, saved.players);
    aiTeam = makeTeam(saved.aiName, null);

    $("scoreHumanLabel").textContent = saved.humanName.toUpperCase();
    $("scoreAILabel").textContent = saved.aiName.toUpperCase();
    $("matchSubtitle").textContent = `Primo a ${CONFIG.targetScore}`;
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
    UI.possessionPill.textContent = `Possesso: ${name}`;
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
    const t = teamOf(State.possession);
    return t.players.find((p) => p.id === State.activePlayerId) || null;
  }

  function renderActivePlayer() {
    const p = getActivePlayer();
    if (!p) {
      UI.activePlayer.textContent = "—";
      UI.activeSkills.innerHTML = "";
      UI.shotmeterFill.style.width = "0%";
      return;
    }
    UI.activePlayer.textContent = `${p.name} (#${p.id})`;
    UI.activeSkills.innerHTML =
      skillBadge("close", p.shooting_close) +
      skillBadge("3pt", p.shooting_3) +
      skillBadge("rebound", p.rebound);

    const base = Math.round((levelToScore(p.shooting_close) + levelToScore(p.shooting_3)) / 2);
    UI.shotmeterFill.style.width = `${base}%`;
  }

  function updateShotMeterForShot(player, shotType) {
    const lvl = shotType === "close" ? player.shooting_close : player.shooting_3;
    UI.shotmeterFill.style.width = `${levelToScore(lvl)}%`;
  }

  /***********************
   * FX
   ***********************/
  function fxFlash() {
    UI.fxFlash.classList.add("on");
    setTimeout(() => UI.fxFlash.classList.remove("on"), 170);
  }

  function fxBanner(text, kind) {
    UI.fxBannerText.textContent = text;
    UI.fxBannerText.classList.remove("good", "bad");
    UI.fxBannerText.classList.add(kind);
    UI.fxBanner.classList.add("on");
    setTimeout(() => UI.fxBanner.classList.remove("on"), CONFIG.fxDurationMs);
  }

  function fxFloat(text) {
    UI.fxFloat.textContent = text;
    UI.fxFloat.classList.add("on");
    setTimeout(() => UI.fxFloat.classList.remove("on"), 420);
  }

  function animateBall(made) {
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
    setStatus("Lancio Dado 1…");
    const v = rollDie();
    await animateRoll(UI.die1, v);
    State.activePlayerId = v;
    renderActivePlayer();

    const p = getActivePlayer();
    logLine(`<b>${teamOf(State.possession).name}</b>: Dado 1 = <b>${v}</b> → ${p.name}`);
    State.phase = "NEED_ACTION";
    setStatus("Lancia Dado 2 (azione)");
  }

  async function stepRollAction() {
    setStatus("Lancio Dado 2…");
    const v = rollDie();
    await animateRoll(UI.die2, v);

    const p = getActivePlayer();
    const action = actionFromDie(v);

    if (action.type === "turnover") {
      logLine(`🟥 Turnover! (<b>${teamOf(State.possession).name}</b>) perde palla.`);
      fxBanner("TURNOVER", "bad");
      fxFlash();
      sfx.turnover();

      if (State.possession === "HUMAN") MatchStats.turnoversHuman += 1;

      setStatus("Turnover → cambio possesso");
      await sleep(300);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
      return;
    }

    if (action.type === "choose") {
      logLine(`🎲 Dado 2 = <b>6</b> → scelta tiro.`);
      if (State.possession === "HUMAN") {
        State.phase = "NEED_CHOICE";
        setStatus("Scegli tiro");
        showChoice(true);
        UI.btnRoll.disabled = true;
      } else {
        const chosen = aiChooseShotType(p);
        logLine(`🤖 AI sceglie: <b>${chosen === "close" ? "sotto" : "da 3"}</b>.`);
        State.lastShotType = chosen;
        updateShotMeterForShot(p, chosen);
        State.phase = "NEED_RESULT";
        setStatus("Lancio Dado 3…");
        await maybeAutoPlayAI();
      }
      return;
    }

    State.lastShotType = action.type;
    updateShotMeterForShot(p, action.type);
    logLine(`🎯 Azione: <b>${action.type === "close" ? "Tiro da sotto (2)" : "Tiro da 3 (3)"}</b>.`);
    State.phase = "NEED_RESULT";
    setStatus("Lancia Dado 3 (esito tiro)");
    if (State.possession === "AI") await maybeAutoPlayAI();
  }

  async function stepRollResult() {
    const p = getActivePlayer();
    const shotType = State.lastShotType;
    if (!p || !shotType) return;

    setStatus("Lancio Dado 3…");
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
      fxBanner(shotType === "close" ? "BUCKET!" : "SWISH!", "good");
      fxFloat(`+${points}`);
      sfx.swish();

      if (State.possession === "HUMAN") {
        if (shotType === "close") MatchStats.twoMade += 1;
        else MatchStats.threeMade += 1;
      }

      logLine(`✅ <b>${teamOf(State.possession).name}</b> segna! (${p.name}) <b>+${points}</b> — (D3=${v}, ${skillLevel}).`);
      setStatus(`Canestro! +${points}`);

      if (checkGameOver()) return;

      await sleep(420);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      fxBanner("CLANK", "bad");
      sfx.clank();
      logLine(`❌ Errore. (${p.name}) — (D3=${v}, ${skillLevel}).`);
      State.phase = "NEED_REBOUND";
      setStatus("Lancia per rimbalzo");
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function stepRollRebound() {
    const p = getActivePlayer();
    if (!p) return;

    setStatus("Lancio rimbalzo…");
    const v = rollDie();
    await animateRoll(UI.die3, v);

    const req = reboundSuccessOn(p.rebound);
    const got = v >= req.min;

    if (got) {
      fxBanner("BOARD!", "good");
      sfx.board(true);

      if (State.possession === "HUMAN") MatchStats.reboundsWon += 1;
      else MatchStats.reboundsLost += 1;

      logLine(`🏀 <b>${teamOf(State.possession).name}</b> prende rimbalzo! (${p.name}) — (D=${v}, ${p.rebound}).`);
      State.phase = "NEED_ACTION";
      State.lastShotType = null;
      UI.die2.textContent = "-";
      UI.die3.textContent = "-";
      setStatus("Lancia Dado 2 (azione)");
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      fxBanner("NO REB", "bad");
      sfx.board(false);

      if (State.possession === "HUMAN") MatchStats.reboundsLost += 1;
      else MatchStats.reboundsWon += 1;

      logLine(`🙅 Rimbalzo perso. (${p.name}) — (D=${v}, ${p.rebound}). Cambio possesso.`);
      await sleep(280);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function autoRollAfterChoice() {
    showChoice(false);
    UI.die3.textContent = "-";
    UI.btnRoll.disabled = true;
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

      const winner = h >= CONFIG.targetScore ? humanTeam.name : aiTeam.name;
      const humanWon = h >= CONFIG.targetScore;

      fxBanner(humanWon ? "YOU WIN" : "YOU LOSE", humanWon ? "good" : "bad");
      fxFlash();
      humanWon ? sfx.swish() : sfx.clank();

      setStatus(`Fine partita: vince ${winner}`);
      logLine(`<b>🏁 Fine partita!</b> Vince <b>${winner}</b> (${h} - ${a}).`);

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
    setStatus("Lancia Dado 1 (giocatore)");
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
    setStatus("Lancia Dado 1 (giocatore)");
    logLine(`🏁 Nuova partita. Arriva a <b>${CONFIG.targetScore}</b> per vincere.`);
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
   * Bind UI
   ***********************/
  UI.btnGoPlay.addEventListener("click", async () => {
    await ensureAudioReady();
    applyTeamsFromInputsAndSave();
    showScreen("game");
    newGame();
  });

  UI.btnGoStats.addEventListener("click", () => showScreen("stats"));
  UI.btnGoTutorial.addEventListener("click", () => showScreen("tutorial"));
  UI.btnTutBack.addEventListener("click", () => showScreen("landing"));

  UI.btnBackHome.addEventListener("click", () => { showScreen("landing"); fillTeamInputsFromSaved(); });
  UI.btnStatsBack.addEventListener("click", () => showScreen("landing"));

  UI.btnResetStats.addEventListener("click", () => {
    if (confirm("Vuoi davvero resettare tutte le statistiche?")) resetStats();
  });

  UI.btnSoundToggle.addEventListener("click", async () => {
    Sound.enabled = !Sound.enabled;
    UI.btnSoundToggle.setAttribute("aria-pressed", Sound.enabled ? "true" : "false");
    UI.btnSoundToggle.textContent = Sound.enabled ? "🔊" : "🔇";
    if (Sound.enabled) await ensureAudioReady();
  });

  UI.btnNew.addEventListener("click", newGame);

  UI.btnChooseClose.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "close";
    State.phase = "NEED_RESULT";
    const p = getActivePlayer();
    if (p) updateShotMeterForShot(p, "close");
    logLine(`🎯 Hai scelto: <b>Tiro da sotto (2)</b>.`);
    setStatus("Lancio automatico Dado 3…");
    await autoRollAfterChoice();
  });

  UI.btnChooseThree.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "three";
    State.phase = "NEED_RESULT";
    const p = getActivePlayer();
    if (p) updateShotMeterForShot(p, "three");
    logLine(`🎯 Hai scelto: <b>Tiro da 3 (3)</b>.`);
    setStatus("Lancio automatico Dado 3…");
    await autoRollAfterChoice();
  });

  UI.btnRoll.addEventListener("click", async () => {
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
        setStatus("Scegli tiro");
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
});
