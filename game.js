window.addEventListener("DOMContentLoaded", () => {
  /***********************
   * CONFIG
   ***********************/
  const CONFIG = {
    targetScore: 21,
    rollAnimMs: 520,
    aiRandomness: 0.25,
    soundEnabledDefault: true,
  };

  /***********************
   * Helpers
   ***********************/
  const $ = (id) => document.getElementById(id);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function skillBadge(label, level) {
    const cls = level === "good" ? "good" : level === "bad" ? "bad" : "medium";
    return `<span class="badge ${cls}">${label}: ${level}</span>`;
  }

  // --- Dice face rendering (pips) ---
  function ensureDieDOM(dieEl) {
    if (!dieEl) return;
    if (dieEl.querySelector(".pip-grid")) return;

    const grid = document.createElement("div");
    grid.className = "pip-grid";
    for (let i = 0; i < 9; i++) {
      const pip = document.createElement("span");
      pip.className = "pip";
      grid.appendChild(pip);
    }
    const dash = document.createElement("div");
    dash.className = "dash";
    dash.textContent = "–";
    dieEl.textContent = "";
    dieEl.appendChild(grid);
    dieEl.appendChild(dash);
  }

  function pipMaskFor(value) {
    // indices 0..8 = 3x3 grid:
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const masks = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };
    return masks[value] || [];
  }

  function renderDie(dieEl, value) {
    ensureDieDOM(dieEl);
    if (!dieEl) return;

    if (value == null) {
      dieEl.dataset.empty = "true";
      const pips = dieEl.querySelectorAll(".pip");
      pips.forEach((p) => (p.style.opacity = 0));
      return;
    }

    dieEl.dataset.empty = "false";
    const on = new Set(pipMaskFor(value));
    const pips = dieEl.querySelectorAll(".pip");
    pips.forEach((pip, idx) => {
      pip.style.opacity = on.has(idx) ? 1 : 0;
    });
  }

  function actionFromDie(value) {
    if (value === 1) return { type: "turnover" };
    if (value === 2 || value === 3) return { type: "close" };
    if (value === 4 || value === 5) return { type: "three" };
    return { type: "choose" }; // 6
  }

  function shotThreshold(skillLevel) {
    if (skillLevel === "good") return { scoreMin: 3 };
    if (skillLevel === "bad") return { scoreMin: 5 };
    return { scoreMin: 4 }; // medium
  }

  function reboundSuccessOn(skillLevel) {
    if (skillLevel === "strong") return { min: 4 };
    if (skillLevel === "weak") return { min: 6 };
    return { min: 5 }; // medium
  }

  /***********************
   * i18n (minimo: già presente nel tuo progetto)
   * NB: qui lasciamo com'è, non tocchiamo i testi.
   ***********************/
  const I18N = window.I18N || null; // se hai i18n globale
  const t = (k) => (I18N && I18N.t ? I18N.t(k) : k);

  /***********************
   * Players
   ***********************/
  function makeTeam(name, rosterNames) {
    const base = [
      { id: 1, name: "Playmaker 1", shooting_close: "bad", shooting_3: "good", rebound: "weak" },
      { id: 2, name: "Playmaker 2", shooting_close: "bad", shooting_3: "good", rebound: "weak" },
      { id: 3, name: "All-around 3", shooting_close: "medium", shooting_3: "medium", rebound: "medium" },
      { id: 4, name: "All-around 4", shooting_close: "medium", shooting_3: "medium", rebound: "medium" },
      { id: 5, name: "Big 5", shooting_close: "good", shooting_3: "bad", rebound: "strong" },
      { id: 6, name: "Big 6", shooting_close: "good", shooting_3: "bad", rebound: "strong" },
    ];

    if (Array.isArray(rosterNames) && rosterNames.length === 6) {
      base.forEach((p, idx) => (p.name = rosterNames[idx] || p.name));
    }

    return { name, players: base };
  }

  /***********************
   * Game state
   ***********************/
  const State = {
    possession: "HUMAN",
    scores: { HUMAN: 0, AI: 0 },

    d1: null,
    d2: null,
    d3: null,

    activePlayerId: null,
    phase: "NEED_PLAYER",
    lastShotType: null,

    soundOn: CONFIG.soundEnabledDefault,

    // stats session
    st: {
      human2_made: 0, human2_att: 0,
      human3_made: 0, human3_att: 0,
      tov: 0,
      rebWon: 0,
      rebLost: 0,
    }
  };

  const UI = {
    // screens
    screenLanding: $("screenLanding"),
    screenGame: $("screenGame"),
    screenStats: $("screenStats"),
    screenTutorial: $("screenTutorial"),

    // landing
    btnGoPlay: $("btnGoPlay"),
    btnGoStats: $("btnGoStats"),
    btnGoTutorial: $("btnGoTutorial"),

    teamHumanName: $("teamHumanName"),
    teamAIName: $("teamAIName"),
    p1: $("p1"), p2: $("p2"), p3: $("p3"), p4: $("p4"), p5: $("p5"), p6: $("p6"),

    // game UI
    die1: $("die1"),
    die2: $("die2"),
    die3: $("die3"),

    scoreHumanLabel: $("scoreHumanLabel"),
    scoreAILabel: $("scoreAILabel"),
    scoreHuman: $("scoreHuman"),
    scoreAI: $("scoreAI"),

    possessionPill: $("possessionPill"),
    statusPill: $("statusPill"),

    activePlayer: $("activePlayer"),
    activeSkills: $("activeSkills"),

    choiceBox: $("choiceBox"),
    btnChooseClose: $("btnChooseClose"),
    btnChooseThree: $("btnChooseThree"),

    logBox: $("logBox"),
    shotmeterFill: $("shotmeterFill"),

    btnRoll: $("btnRoll"),
    btnNew: $("btnNew"),
    btnBackHome: $("btnBackHome"),
    btnSoundToggle: $("btnSoundToggle"),

    // tutorial/stats back
    btnTutBack: $("btnTutBack"),
    btnStatsBack: $("btnStatsBack"),
    btnResetStats: $("btnResetStats"),

    // fx
    fxFlash: $("fxFlash"),
    fxBanner: $("fxBanner"),
    fxBannerText: $("fxBannerText"),
    fxFloat: $("fxFloat"),
    ballShot: $("ballShot"),

    // stats ids (se esistono)
    stGames: $("stGames"),
    stWins: $("stWins"),
    stLosses: $("stLosses"),
    stWinPct: $("stWinPct"),
    stPtsFor: $("stPtsFor"),
    stPtsAgainst: $("stPtsAgainst"),
    stDiff: $("stDiff"),
    st2pt: $("st2pt"),
    st3pt: $("st3pt"),
    stFgPct: $("stFgPct"),
    stTov: $("stTov"),
    stRebWon: $("stRebWon"),
    stRebLost: $("stRebLost"),
  };

  // init dice DOM
  ensureDieDOM(UI.die1);
  ensureDieDOM(UI.die2);
  ensureDieDOM(UI.die3);

  /***********************
   * Navigation
   ***********************/
  function showScreen(which) {
    const all = [UI.screenLanding, UI.screenGame, UI.screenStats, UI.screenTutorial];
    all.forEach((s) => {
      if (!s) return;
      s.classList.remove("screen--active");
      s.setAttribute("aria-hidden", "true");
    });

    which.classList.add("screen--active");
    which.setAttribute("aria-hidden", "false");
  }

  /***********************
   * Storage (roster)
   ***********************/
  const LS = {
    roster: "bd_roster_v1",
    stats: "bd_stats_v1",
    sound: "bd_sound_v1",
  };

  function loadRoster() {
    try {
      const raw = localStorage.getItem(LS.roster);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  function saveRoster(data) {
    try {
      localStorage.setItem(LS.roster, JSON.stringify(data));
    } catch {}
  }
  function getRosterFromInputs() {
    return {
      humanName: (UI.teamHumanName?.value || "YOU").trim() || "YOU",
      aiName: (UI.teamAIName?.value || "AI").trim() || "AI",
      players: [
        UI.p1?.value || "Playmaker 1",
        UI.p2?.value || "Playmaker 2",
        UI.p3?.value || "All-around 3",
        UI.p4?.value || "All-around 4",
        UI.p5?.value || "Big 5",
        UI.p6?.value || "Big 6",
      ].map((s) => (s || "").trim()),
    };
  }
  function hydrateRosterInputs(data) {
    if (!data) return;
    if (UI.teamHumanName) UI.teamHumanName.value = data.humanName || "YOU";
    if (UI.teamAIName) UI.teamAIName.value = data.aiName || "AI";
    const ps = data.players || [];
    if (UI.p1) UI.p1.value = ps[0] || "Playmaker 1";
    if (UI.p2) UI.p2.value = ps[1] || "Playmaker 2";
    if (UI.p3) UI.p3.value = ps[2] || "All-around 3";
    if (UI.p4) UI.p4.value = ps[3] || "All-around 4";
    if (UI.p5) UI.p5.value = ps[4] || "Big 5";
    if (UI.p6) UI.p6.value = ps[5] || "Big 6";
  }

  /***********************
   * Sounds (tiny synth)
   ***********************/
  let audioCtx = null;

  function ensureAudio() {
    if (!State.soundOn) return null;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    return audioCtx;
  }

  function beep(freq, ms, type = "sine", gain = 0.06) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + ms / 1000);
  }

  function swishSound() {
    beep(740, 70, "triangle", 0.06);
    setTimeout(() => beep(980, 70, "triangle", 0.05), 70);
    setTimeout(() => beep(1240, 90, "sine", 0.045), 140);
  }

  function clankSound() {
    beep(220, 90, "square", 0.05);
    setTimeout(() => beep(160, 120, "square", 0.04), 90);
  }

  /***********************
   * UI helpers
   ***********************/
  function logLine(html) {
    if (!UI.logBox) return;
    const p = document.createElement("div");
    p.className = "log-line";
    p.innerHTML = html;
    UI.logBox.appendChild(p);
    UI.logBox.scrollTop = UI.logBox.scrollHeight;
  }

  function setStatus(text) {
    if (UI.statusPill) UI.statusPill.textContent = text;
  }

  function setPossessionPill() {
    if (!UI.possessionPill) return;
    UI.possessionPill.textContent = `Possesso: ${State.possession === "HUMAN" ? (UI.scoreHumanLabel?.textContent || "YOU") : (UI.scoreAILabel?.textContent || "AI")}`;
  }

  function renderScores() {
    if (UI.scoreHuman) UI.scoreHuman.textContent = String(State.scores.HUMAN);
    if (UI.scoreAI) UI.scoreAI.textContent = String(State.scores.AI);
  }

  function showChoice(show) {
    if (!UI.choiceBox) return;
    UI.choiceBox.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function pulseShotmeter() {
    if (!UI.shotmeterFill) return;
    const v = clamp(Math.random() * 100, 8, 100);
    UI.shotmeterFill.style.width = `${v}%`;
  }

  function fxBanner(text, good) {
    if (!UI.fxBanner || !UI.fxBannerText) return;
    UI.fxBannerText.textContent = text;
    UI.fxBannerText.classList.remove("good", "bad");
    UI.fxBannerText.classList.add(good ? "good" : "bad");
    UI.fxBanner.classList.add("on");
    setTimeout(() => UI.fxBanner.classList.remove("on"), 520);
  }

  function fxFlash() {
    if (!UI.fxFlash) return;
    UI.fxFlash.classList.add("on");
    setTimeout(() => UI.fxFlash.classList.remove("on"), 140);
  }

  function fxFloat(points) {
    if (!UI.fxFloat) return;
    UI.fxFloat.textContent = points > 0 ? `+${points}` : "";
    UI.fxFloat.classList.add("on");
    setTimeout(() => UI.fxFloat.classList.remove("on"), 520);
  }

  function ballAnim(kind) {
    if (!UI.ballShot) return;
    UI.ballShot.classList.remove("make", "miss");
    UI.ballShot.classList.add("on");
    // force reflow
    void UI.ballShot.offsetWidth;
    UI.ballShot.classList.add(kind);
    setTimeout(() => {
      UI.ballShot.classList.remove("on", "make", "miss");
    }, 900);
  }

  async function animateRoll(dieEl, finalValue) {
    ensureDieDOM(dieEl);
    dieEl.classList.add("rolling");
    const start = Date.now();
    while (Date.now() - start < CONFIG.rollAnimMs) {
      renderDie(dieEl, rollDie());
      await sleep(60);
    }
    dieEl.classList.remove("rolling");
    renderDie(dieEl, finalValue);
  }

  function setDice(d1, d2, d3) {
    State.d1 = d1;
    State.d2 = d2;
    State.d3 = d3;
    renderDie(UI.die1, d1);
    renderDie(UI.die2, d2);
    renderDie(UI.die3, d3);
  }

  function resetDice() {
    setDice(null, null, null);
  }

  /***********************
   * Teams
   ***********************/
  let humanTeam = makeTeam("YOU");
  let aiTeam = makeTeam("AI");

  function loadTeamsFromRoster() {
    const data = getRosterFromInputs();
    humanTeam = makeTeam(data.humanName || "YOU", data.players);
    aiTeam = makeTeam(data.aiName || "AI");
    if (UI.scoreHumanLabel) UI.scoreHumanLabel.textContent = humanTeam.name || "YOU";
    if (UI.scoreAILabel) UI.scoreAILabel.textContent = aiTeam.name || "AI";
  }

  function teamOf(possession) {
    return possession === "HUMAN" ? humanTeam : aiTeam;
  }

  function getActivePlayer() {
    const t = teamOf(State.possession);
    return t.players.find((p) => p.id === State.activePlayerId) || null;
  }

  function renderActivePlayer() {
    const p = getActivePlayer();
    if (!p) {
      if (UI.activePlayer) UI.activePlayer.textContent = "—";
      if (UI.activeSkills) UI.activeSkills.innerHTML = "";
      return;
    }
    if (UI.activePlayer) UI.activePlayer.textContent = `${p.name} (#${p.id})`;
    if (UI.activeSkills) {
      UI.activeSkills.innerHTML =
        skillBadge("close", p.shooting_close) +
        skillBadge("3pt", p.shooting_3) +
        skillBadge("rebound", p.rebound);
    }
  }

  /***********************
   * Game flow
   ***********************/
  function checkGameOver() {
    const h = State.scores.HUMAN;
    const a = State.scores.AI;

    if (h >= CONFIG.targetScore || a >= CONFIG.targetScore) {
      State.phase = "GAME_OVER";
      if (UI.btnRoll) UI.btnRoll.disabled = true;
      showChoice(false);
      const winner = h >= CONFIG.targetScore ? (humanTeam.name || "YOU") : (aiTeam.name || "AI");
      setStatus(`Fine partita: vince ${winner}`);
      logLine(`<b>🏁 Fine partita!</b> Vince <b>${winner}</b> (${h} - ${a}).`);
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
    resetDice();
    setStatus("Lancia Dado 1 (giocatore)");
  }

  function aiChooseShotType(player) {
    const closeLevel = player.shooting_close;
    const threeLevel = player.shooting_3;

    if (closeLevel === "good" && threeLevel !== "good") return "close";
    if (threeLevel === "good" && closeLevel !== "good") return "three";

    if (Math.random() < CONFIG.aiRandomness) {
      return Math.random() < 0.5 ? "close" : "three";
    }

    const score = (lvl) => (lvl === "good" ? 2 : lvl === "medium" ? 1 : 0);
    return score(closeLevel) >= score(threeLevel) ? "close" : "three";
  }

  async function stepRollPlayer() {
    setStatus("Lancio Dado 1…");
    const v = rollDie();
    await animateRoll(UI.die1, v);
    State.activePlayerId = v;
    renderActivePlayer();

    const p = getActivePlayer();
    logLine(`<b>${State.possession === "HUMAN" ? humanTeam.name : aiTeam.name}</b>: Dado 1 = <b>${v}</b> → ${p.name}`);
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
      if (State.possession === "HUMAN") State.st.tov += 1;
      logLine(`🟥 Turnover! (${State.possession === "HUMAN" ? humanTeam.name : aiTeam.name}) perde palla.`);
      setStatus("Turnover → cambio possesso");
      await sleep(320);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
      return;
    }

    if (action.type === "choose") {
      logLine(`🎲 Dado 2 = <b>6</b> → scelta azione.`);
      if (State.possession === "HUMAN") {
        State.phase = "NEED_CHOICE";
        setStatus("Scegli tiro (sotto o 3)");
        showChoice(true);
        if (UI.btnRoll) UI.btnRoll.disabled = true;
      } else {
        const chosen = aiChooseShotType(p);
        logLine(`🤖 AI sceglie: <b>${chosen === "close" ? "tiro da sotto" : "tiro da 3"}</b>.`);
        State.lastShotType = chosen;
        State.phase = "NEED_RESULT";
        setStatus("Lancia Dado 3 (esito tiro)");
        await maybeAutoPlayAI();
      }
      return;
    }

    State.lastShotType = action.type;
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
    pulseShotmeter();
    const v = rollDie();
    await animateRoll(UI.die3, v);

    const skillLevel = shotType === "close" ? p.shooting_close : p.shooting_3;
    const thr = shotThreshold(skillLevel);

    const made = v >= thr.scoreMin;
    const points = shotType === "close" ? 2 : 3;

    // attempt stats (only YOU)
    if (State.possession === "HUMAN") {
      if (shotType === "close") State.st.human2_att += 1;
      if (shotType === "three") State.st.human3_att += 1;
    }

    if (made) {
      if (State.possession === "HUMAN") {
        if (shotType === "close") State.st.human2_made += 1;
        if (shotType === "three") State.st.human3_made += 1;
      }

      State.scores[State.possession] += points;
      renderScores();

      fxFlash();
      fxBanner("SWISH", true);
      fxFloat(points);
      ballAnim("make");
      swishSound();

      logLine(`✅ <b>${State.possession === "HUMAN" ? humanTeam.name : aiTeam.name}</b> segna! (${p.name}) <b>+${points}</b> — (Dado 3 = ${v}, skill ${skillLevel}).`);
      setStatus(`Canestro! +${points}`);

      if (checkGameOver()) return;

      await sleep(420);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      fxBanner("CLANK", false);
      ballAnim("miss");
      clankSound();

      logLine(`❌ Errore. (${p.name}) — (Dado 3 = ${v}, skill ${skillLevel}).`);
      State.phase = "NEED_REBOUND";
      setStatus("Lancia per rimbalzo");
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function stepRollRebound() {
    const p = getActivePlayer();
    if (!p) return;

    setStatus("Lancio rimbalzo…");
    pulseShotmeter();
    const v = rollDie();
    await animateRoll(UI.die3, v);

    const req = reboundSuccessOn(p.rebound);
    const got = v >= req.min;

    if (got) {
      if (State.possession === "HUMAN") State.st.rebWon += 1;
      logLine(`🏀 <b>${State.possession === "HUMAN" ? humanTeam.name : aiTeam.name}</b> prende rimbalzo! (${p.name}) — (Dado = ${v}, rebound ${p.rebound}). Possesso continua.`);
      State.phase = "NEED_ACTION";
      State.lastShotType = null;
      renderDie(UI.die2, null);
      renderDie(UI.die3, null);
      setStatus("Lancia Dado 2 (azione)");
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      if (State.possession === "HUMAN") State.st.rebLost += 1;
      logLine(`🙅 Rimbalzo perso. (${p.name}) — (Dado = ${v}, rebound ${p.rebound}). Cambio possesso.`);
      await sleep(300);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function autoRollAfterChoice() {
    showChoice(false);
    renderDie(UI.die3, null);
    if (UI.btnRoll) UI.btnRoll.disabled = true;
    await sleep(120);
    await stepRollResult();
    if (State.phase !== "GAME_OVER") {
      if (UI.btnRoll) UI.btnRoll.disabled = State.phase === "NEED_CHOICE";
    }
  }

  /***********************
   * New game
   ***********************/
  function newGame() {
    loadTeamsFromRoster();

    State.possession = "HUMAN";
    State.scores = { HUMAN: 0, AI: 0 };
    State.d1 = State.d2 = State.d3 = null;
    State.activePlayerId = null;
    State.phase = "NEED_PLAYER";
    State.lastShotType = null;

    State.st = {
      human2_made: 0, human2_att: 0,
      human3_made: 0, human3_att: 0,
      tov: 0,
      rebWon: 0,
      rebLost: 0,
    };

    if (UI.btnRoll) UI.btnRoll.disabled = false;
    showChoice(false);

    if (UI.logBox) UI.logBox.innerHTML = "";
    renderScores();
    setPossessionPill();
    renderActivePlayer();
    resetDice();
    setStatus("Lancia Dado 1 (giocatore)");
    logLine(`🏁 Nuova partita. Arriva a <b>${CONFIG.targetScore}</b> per vincere.`);
  }

  /***********************
   * Auto-play AI
   ***********************/
  async function maybeAutoPlayAI() {
    if (State.possession !== "AI") return;
    if (State.phase === "GAME_OVER") return;

    if (UI.btnRoll) UI.btnRoll.disabled = true;
    await sleep(240);

    while (State.possession === "AI" && State.phase !== "GAME_OVER") {
      if (State.phase === "NEED_PLAYER") {
        resetDice();
        await stepRollPlayer();
        await sleep(200);
        continue;
      }
      if (State.phase === "NEED_ACTION") {
        renderDie(UI.die2, null);
        renderDie(UI.die3, null);
        await stepRollAction();
        await sleep(200);
        continue;
      }
      if (State.phase === "NEED_RESULT") {
        await stepRollResult();
        await sleep(200);
        continue;
      }
      if (State.phase === "NEED_REBOUND") {
        await stepRollRebound();
        await sleep(200);
        continue;
      }
      break;
    }

    if (State.phase !== "GAME_OVER") {
      if (UI.btnRoll) UI.btnRoll.disabled = State.phase === "NEED_CHOICE";
    }
  }

  /***********************
   * Buttons
   ***********************/
  UI.btnGoPlay?.addEventListener("click", () => {
    loadTeamsFromRoster();
    showScreen(UI.screenGame);
    newGame();
  });
  UI.btnGoStats?.addEventListener("click", () => showScreen(UI.screenStats));
  UI.btnGoTutorial?.addEventListener("click", () => showScreen(UI.screenTutorial));

  UI.btnBackHome?.addEventListener("click", () => showScreen(UI.screenLanding));
  UI.btnTutBack?.addEventListener("click", () => showScreen(UI.screenLanding));
  UI.btnStatsBack?.addEventListener("click", () => showScreen(UI.screenLanding));

  // move New Game here: top-right
  UI.btnNew?.addEventListener("click", () => {
    // opzionale: conferma
    const ok = confirm("Nuova partita? (reset punteggio e log)");
    if (!ok) return;
    newGame();
  });

  UI.btnSoundToggle?.addEventListener("click", () => {
    State.soundOn = !State.soundOn;
    UI.btnSoundToggle.textContent = State.soundOn ? "🔊" : "🔇";
    UI.btnSoundToggle.setAttribute("aria-pressed", State.soundOn ? "true" : "false");
    try { localStorage.setItem(LS.sound, State.soundOn ? "1" : "0"); } catch {}
    if (State.soundOn) ensureAudio();
  });

  UI.btnChooseClose?.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "close";
    State.phase = "NEED_RESULT";
    logLine(`🎯 Hai scelto: <b>Tiro da sotto (2)</b>.`);
    setStatus("Lancio automatico Dado 3…");
    await autoRollAfterChoice();
  });

  UI.btnChooseThree?.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "three";
    State.phase = "NEED_RESULT";
    logLine(`🎯 Hai scelto: <b>Tiro da 3 (3)</b>.`);
    setStatus("Lancio automatico Dado 3…");
    await autoRollAfterChoice();
  });

  UI.btnRoll?.addEventListener("click", async () => {
    if (State.phase === "GAME_OVER") return;
    if (UI.btnRoll) UI.btnRoll.disabled = true;

    try {
      if (State.phase === "NEED_PLAYER") {
        resetDice();
        await stepRollPlayer();
      } else if (State.phase === "NEED_ACTION") {
        renderDie(UI.die2, null);
        renderDie(UI.die3, null);
        await stepRollAction();
      } else if (State.phase === "NEED_RESULT") {
        await stepRollResult();
      } else if (State.phase === "NEED_REBOUND") {
        await stepRollRebound();
      } else if (State.phase === "NEED_CHOICE") {
        setStatus("Scegli tiro (sotto o 3)");
      } else {
        setStatus("Pronto");
      }
    } finally {
      if (State.phase !== "GAME_OVER") {
        if (UI.btnRoll) UI.btnRoll.disabled = State.phase === "NEED_CHOICE";
      }
    }
  });

  // Save roster on input changes
  const rosterInputs = [UI.teamHumanName, UI.teamAIName, UI.p1, UI.p2, UI.p3, UI.p4, UI.p5, UI.p6].filter(Boolean);
  rosterInputs.forEach((el) => {
    el.addEventListener("input", () => {
      saveRoster(getRosterFromInputs());
    });
  });

  /***********************
   * Boot
   ***********************/
  // load roster
  hydrateRosterInputs(loadRoster());

  // sound persisted
  try {
    const s = localStorage.getItem(LS.sound);
    if (s === "0") State.soundOn = false;
  } catch {}
  if (UI.btnSoundToggle) {
    UI.btnSoundToggle.textContent = State.soundOn ? "🔊" : "🔇";
    UI.btnSoundToggle.setAttribute("aria-pressed", State.soundOn ? "true" : "false");
  }
  if (UI.btnNew) {
    UI.btnNew.textContent = "↻";
    UI.btnNew.title = "Nuova partita";
    UI.btnNew.setAttribute("aria-label", "Nuova partita");
  }

  // start on landing
  showScreen(UI.screenLanding);
});
