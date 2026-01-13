window.addEventListener("DOMContentLoaded", () => {
  /***********************
   * CONFIG
   ***********************/
  const CONFIG = {
    targetScore: 21,
    rollAnimMs: 520,
    aiRandomness: 0.25,
    fxDurationMs: 520,
    soundOnByDefault: true,
  };

  /***********************
   * i18n (minimal - keep your existing strings if you already have them)
   ***********************/
  const I18N = {
    it: {
      landing_subtitle: "Turn-based • dadi • primo a 21",
      choose: "Scegli",
      play: "Gioca",
      stats: "Statistiche",
      tutorial: "Tutorial",
      language: "Lingua",
      tip6: "Tip: con 6 sul Dado 2 scegli il tiro e il Dado 3 parte da solo.",
      teams_roster: "Squadre & roster",
      team_you: "Squadra YOU",
      team_ai: "Squadra AI",
      players_you: "Giocatori YOU",
      skills_note: "Nota: le skill restano quelle base (PM / all-around / big).",
      possession: "Possesso",
      shot_meter: "Shot meter",
      die1: "Dado 1",
      die2: "Dado 2",
      die3: "Dado 3",
      die1_hint: "Giocatore",
      die2_hint: "Azione",
      die3_hint: "Esito / Rimbalzo",
      active_player: "Giocatore attivo",
      roll: "Lancia",
      choose_action: "Hai fatto 6 sul Dado 2: scegli tu l’azione",
      close_shot: "Tiro da sotto (2)",
      three_shot: "Tiro da 3 (3)",
      log: "Cronaca",
      new_game: "Nuova partita",
      rolling: "Lancio Dado 3…",
      bucket: "BUCKET",
      swish: "SWISH",
      clank: "CLANK",
      turnover: "Turnover",
      rebound: "Rimbalzo",
    },
    en: {
      landing_subtitle: "Turn-based • dice • first to 21",
      choose: "Choose",
      play: "Play",
      stats: "Stats",
      tutorial: "Tutorial",
      language: "Language",
      tip6: "Tip: with a 6 on Die 2 you choose the shot and Die 3 auto-rolls.",
      teams_roster: "Teams & roster",
      team_you: "Team YOU",
      team_ai: "Team AI",
      players_you: "Players (YOU)",
      skills_note: "Note: skills are fixed by role (PM / all-around / big).",
      possession: "Possession",
      shot_meter: "Shot meter",
      die1: "Die 1",
      die2: "Die 2",
      die3: "Die 3",
      die1_hint: "Player",
      die2_hint: "Action",
      die3_hint: "Result / Rebound",
      active_player: "Active player",
      roll: "Roll",
      choose_action: "You rolled 6 on Die 2: choose the action",
      close_shot: "Close shot (2)",
      three_shot: "3pt shot (3)",
      log: "Play-by-play",
      new_game: "New game",
      rolling: "Rolling Die 3…",
      bucket: "BUCKET",
      swish: "SWISH",
      clank: "CLANK",
      turnover: "Turnover",
      rebound: "Rebound",
    },
    es: {
      landing_subtitle: "Por turnos • dados • primero a 21",
      choose: "Elige",
      play: "Jugar",
      stats: "Estadísticas",
      tutorial: "Tutorial",
      language: "Idioma",
      tip6: "Tip: con 6 en el Dado 2 eliges el tiro y el Dado 3 se lanza solo.",
      teams_roster: "Equipos y plantilla",
      team_you: "Equipo YOU",
      team_ai: "Equipo AI",
      players_you: "Jugadores (YOU)",
      skills_note: "Nota: las habilidades son fijas por rol (PM / all-around / big).",
      possession: "Posesión",
      shot_meter: "Medidor de tiro",
      die1: "Dado 1",
      die2: "Dado 2",
      die3: "Dado 3",
      die1_hint: "Jugador",
      die2_hint: "Acción",
      die3_hint: "Resultado / Rebote",
      active_player: "Jugador activo",
      roll: "Lanzar",
      choose_action: "Sacaste 6 en el Dado 2: elige la acción",
      close_shot: "Tiro cerca (2)",
      three_shot: "Tiro de 3 (3)",
      log: "Crónica",
      new_game: "Nueva partida",
      rolling: "Lanzando Dado 3…",
      bucket: "CANASTA",
      swish: "SWISH",
      clank: "CLANK",
      turnover: "Pérdida",
      rebound: "Rebote",
    }
  };

  const $ = (id) => document.getElementById(id);

  const State = {
    lang: localStorage.getItem("bd_lang") || "it",
    soundOn: (localStorage.getItem("bd_sound") ?? String(CONFIG.soundOnByDefault)) === "true",

    possession: "HUMAN",
    scores: { HUMAN: 0, AI: 0 },
    activePlayerId: null,
    phase: "NEED_PLAYER",
    lastShotType: null,

    st: {
      human2_att: 0, human3_att: 0,
      human2_made: 0, human3_made: 0
    }
  };

  const MatchStats = {
    twoMade: 0, twoAtt: 0,
    threeMade: 0, threeAtt: 0
  };

  const UI = {
    screenLanding: $("screenLanding"),
    screenGame: $("screenGame"),
    screenStats: $("screenStats"),
    screenTutorial: $("screenTutorial"),

    btnGoPlay: $("btnGoPlay"),
    btnGoStats: $("btnGoStats"),
    btnGoTutorial: $("btnGoTutorial"),

    btnBackHome: $("btnBackHome"),
    btnStatsBack: $("btnStatsBack"),
    btnTutorialBack: $("btnTutorialBack"),

    langSelect: $("langSelect"),

    teamHumanName: $("teamHumanName"),
    teamAIName: $("teamAIName"),
    p1: $("p1"), p2: $("p2"), p3: $("p3"), p4: $("p4"), p5: $("p5"), p6: $("p6"),

    die1: $("die1"),
    die2: $("die2"),
    die3: $("die3"),

    scoreHuman: $("scoreHuman"),
    scoreAI: $("scoreAI"),
    labelHuman: $("labelHuman"),
    labelAI: $("labelAI"),

    possessionPill: $("possessionPill"),
    statusPill: $("statusPill"),
    activePlayer: $("activePlayer"),
    activeSkills: $("activeSkills"),

    btnRoll: $("btnRoll"),
    btnNew: $("btnNew"),
    choiceBox: $("choiceBox"),
    btnChooseClose: $("btnChooseClose"),
    btnChooseThree: $("btnChooseThree"),

    logBox: $("logBox"),

    fxFlash: $("fxFlash"),
    fxBanner: $("fxBanner"),
    fxBannerText: $("fxBannerText"),
    fxFloat: $("fxFloat"),
    shotmeterFill: $("shotmeterFill"),
    ballShot: $("ballShot"),

    btnSoundToggle: $("btnSoundToggle"),
    matchSubtitle: $("matchSubtitle"),

    statsBox: $("statsBox"),
    btnResetStats: $("btnResetStats"),
  };

  function t(key) {
    return (I18N[State.lang] && I18N[State.lang][key]) || (I18N.it[key] || key);
  }

  function setLang(lang) {
    State.lang = lang;
    localStorage.setItem("bd_lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      el.innerHTML = t(k);
    });

    UI.btnRoll.textContent = t("roll");
    UI.btnNew.textContent = t("new_game");
  }

  function showScreen(which) {
    [UI.screenLanding, UI.screenGame, UI.screenStats, UI.screenTutorial].forEach(s => {
      s.classList.remove("screen--active");
      s.setAttribute("aria-hidden", "true");
    });

    which.classList.add("screen--active");
    which.setAttribute("aria-hidden", "false");
  }

  /***********************
   * Simple sound
   ***********************/
  let _audioCtx = null;
  function getAudioCtx() {
    if (_audioCtx) return _audioCtx;
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return _audioCtx;
  }
  function beep(freq, dur, type="sine", gain=0.06) {
    if (!State.soundOn) return;
    const ctx = getAudioCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g); g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  }
  const sfx = {
    swish(){ beep(880, .06, "sine", .06); beep(1320, .08, "triangle", .05); },
    clank(){ beep(240, .05, "square", .06); beep(180, .06, "square", .05); },
    click(){ beep(520, .03, "triangle", .04); }
  };

  function setSound(on) {
    State.soundOn = on;
    localStorage.setItem("bd_sound", String(on));
    if (UI.btnSoundToggle) {
      UI.btnSoundToggle.textContent = on ? "🔊" : "🔇";
      UI.btnSoundToggle.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  /***********************
   * Storage (teams/stats)
   ***********************/
  function loadTeams() {
    try { return JSON.parse(localStorage.getItem("bd_teams") || "{}"); } catch { return {}; }
  }
  function saveTeams(obj) {
    localStorage.setItem("bd_teams", JSON.stringify(obj));
  }
  function fillTeamInputsFromSaved() {
    const saved = loadTeams();
    if (saved.hName) UI.teamHumanName.value = saved.hName;
    if (saved.aName) UI.teamAIName.value = saved.aName;
    if (saved.players?.length === 6) {
      [UI.p1,UI.p2,UI.p3,UI.p4,UI.p5,UI.p6].forEach((el,i)=> el.value = saved.players[i] || el.value);
    }
  }

  function loadStats() {
    try { return JSON.parse(localStorage.getItem("bd_stats") || "{}"); } catch { return {}; }
  }
  function saveStats(obj) {
    localStorage.setItem("bd_stats", JSON.stringify(obj));
  }
  function resetStats() {
    saveStats({});
    renderStatsUI();
  }
  function renderStatsUI() {
    const st = loadStats();
    const totalGames = st.games || 0;
    const wins = st.wins || 0;
    const losses = st.losses || 0;

    UI.statsBox.innerHTML = `
      <div style="display:grid; gap:10px">
        <div><b>${t("stats")}</b></div>
        <div class="muted mini">Games: <b>${totalGames}</b></div>
        <div class="muted mini">W: <b>${wins}</b> • L: <b>${losses}</b></div>
      </div>
    `;
  }

  /***********************
   * Helpers
   ***********************/
  function rollDie() { return Math.floor(Math.random() * 6) + 1; }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function skillBadge(label, level) {
    const cls = level === "good" ? "good" : level === "bad" ? "bad" : "medium";
    return `<span class="badge ${cls}">${label}: ${level}</span>`;
  }

  function actionFromDie(value) {
    if (value === 1) return { type: "turnover" };
    if (value === 2 || value === 3) return { type: "close" };
    if (value === 4 || value === 5) return { type: "three" };
    return { type: "choose" };
  }

  function shotThreshold(skillLevel) {
    if (skillLevel === "good") return { scoreMin: 3 };
    if (skillLevel === "bad") return { scoreMin: 5 };
    return { scoreMin: 4 };
  }

  function reboundSuccessOn(skillLevel) {
    if (skillLevel === "strong") return { min: 4 };
    if (skillLevel === "weak") return { min: 6 };
    return { min: 5 };
  }

  function levelToScore(lvl){
    return lvl === "good" ? 82 : lvl === "medium" ? 60 : 35;
  }

  /***********************
   * Teams
   ***********************/
  function makeTeam(name, playersNames) {
    const names = playersNames || [
      "Playmaker 1","Playmaker 2","All-around 3","All-around 4","Big 5","Big 6"
    ];
    const players = [
      { id: 1, name: names[0], shooting_close: "bad", shooting_3: "good", rebound: "weak" },
      { id: 2, name: names[1], shooting_close: "bad", shooting_3: "good", rebound: "weak" },
      { id: 3, name: names[2], shooting_close: "medium", shooting_3: "medium", rebound: "medium" },
      { id: 4, name: names[3], shooting_close: "medium", shooting_3: "medium", rebound: "medium" },
      { id: 5, name: names[4], shooting_close: "good", shooting_3: "bad", rebound: "strong" },
      { id: 6, name: names[5], shooting_close: "good", shooting_3: "bad", rebound: "strong" },
    ];
    return { name, players };
  }

  function applyTeamsFromInputsAndSave() {
    const hName = (UI.teamHumanName.value || "YOU").trim();
    const aName = (UI.teamAIName.value || "AI").trim();
    const players = [UI.p1.value, UI.p2.value, UI.p3.value, UI.p4.value, UI.p5.value, UI.p6.value].map(s => (s||"").trim());

    saveTeams({ hName, aName, players });
    humanTeam = makeTeam(hName, players);
    aiTeam = makeTeam(aName, ["AI 1","AI 2","AI 3","AI 4","AI 5","AI 6"]);

    UI.labelHuman.textContent = humanTeam.name;
    UI.labelAI.textContent = aiTeam.name;
    setPossessionPill();
  }

  let humanTeam = makeTeam("YOU");
  let aiTeam = makeTeam("AI");

  function teamOf(possession) {
    return possession === "HUMAN" ? humanTeam : aiTeam;
  }

  /***********************
   * Match stats
   ***********************/
  function resetMatchStats(){
    MatchStats.twoMade=0; MatchStats.twoAtt=0;
    MatchStats.threeMade=0; MatchStats.threeAtt=0;
  }

  function commitMatchToGlobalStats(humanWon){
    const st = loadStats();
    st.games = (st.games || 0) + 1;
    if (humanWon) st.wins = (st.wins || 0) + 1;
    else st.losses = (st.losses || 0) + 1;
    saveStats(st);
  }

  /***********************
   * UI render
   ***********************/
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

    if (!UI.shotmeterFill) return;
    const lvl = State.lastShotType === "close" ? p.shooting_close : p.shooting_3;
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

  // ✅ DEFINITIVO: calcola dx/dy verso il ferro in base alla posizione reale (mobile-safe)
  function animateBall(made) {
    if (!UI.ballShot) return;

    const ballEl = UI.ballShot;
    const hoopEl = document.querySelector(".hoop");
    const parentEl = ballEl.offsetParent || document.body;

    try {
      if (hoopEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const ballRect = ballEl.getBoundingClientRect();
        const hoopRect = hoopEl.getBoundingClientRect();

        const ballCX = (ballRect.left + ballRect.right) / 2 - parentRect.left;
        const ballCY = (ballRect.top + ballRect.bottom) / 2 - parentRect.top;

        // rim center (slightly adjusted down = more realistic)
        const rimCX = (hoopRect.left + hoopRect.right) / 2 - parentRect.left;
        const rimCY = (hoopRect.top + hoopRect.bottom) / 2 - parentRect.top + hoopRect.height * 0.08;

        const dx = rimCX - ballCX;
        const dy = rimCY - ballCY;

        ballEl.style.setProperty("--dx", `${dx.toFixed(1)}px`);
        ballEl.style.setProperty("--dy", `${dy.toFixed(1)}px`);
      } else {
        ballEl.style.setProperty("--dx", "0px");
        ballEl.style.setProperty("--dy", "-180px");
      }
    } catch {
      ballEl.style.setProperty("--dx", "0px");
      ballEl.style.setProperty("--dy", "-180px");
    }

    ballEl.classList.remove("make", "miss", "on");
    void ballEl.offsetWidth;
    ballEl.classList.add("on", made ? "make" : "miss");
    setTimeout(() => ballEl.classList.remove("on", "make", "miss"), 900);
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
   * Game flow
   ***********************/
  function checkGameOver() {
    const h = State.scores.HUMAN;
    const a = State.scores.AI;
    if (h >= CONFIG.targetScore || a >= CONFIG.targetScore) {
      UI.btnRoll.disabled = true;
      const humanWon = h >= CONFIG.targetScore;
      commitMatchToGlobalStats(humanWon);
      logLine(`<b>🏁 Fine partita!</b> Vince <b>${humanWon ? humanTeam.name : aiTeam.name}</b> (${h} - ${a}).`);
      setStatus(`🏁 ${humanWon ? humanTeam.name : aiTeam.name} wins`);
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
    setStatus("Lancia Dado 1…");
  }

  async function stepRollPlayer() {
    const v = rollDie();
    await animateRoll(UI.die1, v);
    State.activePlayerId = v;
    renderActivePlayer();

    const p = getActivePlayer();
    logLine(`<b>${State.possession === "HUMAN" ? humanTeam.name : aiTeam.name}</b>: Dado 1 = <b>${v}</b> → ${p.name}`);
    State.phase = "NEED_ACTION";
    setStatus("Lancia Dado 2…");
  }

  async function stepRollAction() {
    const v = rollDie();
    await animateRoll(UI.die2, v);

    const p = getActivePlayer();
    const action = actionFromDie(v);

    if (action.type === "turnover") {
      fxBanner(t("turnover"), "bad");
      sfx.clank();
      logLine(`🟥 ${t("turnover")}!`);
      await sleep(280);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
      return;
    }

    if (action.type === "choose") {
      if (State.possession === "HUMAN") {
        State.phase = "NEED_CHOICE";
        UI.choiceBox.setAttribute("aria-hidden", "false");
        UI.btnRoll.disabled = true;
        setStatus(t("choose_action"));
      } else {
        const chosen = aiChooseShotType(p);
        State.lastShotType = chosen;
        State.phase = "NEED_RESULT";
        setStatus(t("rolling"));
        await maybeAutoPlayAI();
      }
      return;
    }

    State.lastShotType = action.type;
    State.phase = "NEED_RESULT";
    renderActivePlayer();
    setStatus(t("rolling"));

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

    // attempt stats (only you)
    if (State.possession === "HUMAN") {
      if (shotType === "close") State.st.human2_att += 1;
      if (shotType === "three") State.st.human3_att += 1;
    }

    // ✅ palla sempre legata al ferro
    animateBall(made);

    if (made) {
      State.scores[State.possession] += points;
      renderScores();

      fxFlash();
      fxBanner(shotType === "close" ? t("bucket") : t("swish"), "good");
      fxFloat(`+${points}`);
      sfx.swish();

      if (State.possession === "HUMAN") {
        if (shotType === "close") State.st.human2_made += 1;
        if (shotType === "three") State.st.human3_made += 1;
      }

      if (checkGameOver()) return;

      await sleep(420);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      fxBanner(t("clank"), "bad");
      sfx.clank();

      State.phase = "NEED_REBOUND";
      setStatus(`${t("rebound")}…`);
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function stepRollRebound() {
    const p = getActivePlayer();
    if (!p) return;

    const v = rollDie();
    await animateRoll(UI.die3, v);

    const req = reboundSuccessOn(p.rebound);
    const got = v >= req.min;

    if (got) {
      fxBanner(t("rebound"), "good");
      logLine(`🏀 ${t("rebound")} (${p.name})`);
      State.phase = "NEED_ACTION";
      State.lastShotType = null;
      UI.die2.textContent = "-";
      UI.die3.textContent = "-";
      setStatus("Lancia Dado 2…");
      if (State.possession === "AI") await maybeAutoPlayAI();
    } else {
      logLine(`🙅 ${t("rebound")} perso → cambio possesso`);
      await sleep(240);
      switchPossession();
      if (State.possession === "AI") await maybeAutoPlayAI();
    }
  }

  async function autoRollAfterChoice() {
    UI.choiceBox.setAttribute("aria-hidden", "true");
    UI.btnRoll.disabled = true;
    await sleep(120);
    await stepRollResult();
    if (!checkGameOver()) UI.btnRoll.disabled = (State.phase !== "NEED_PLAYER" && State.phase !== "NEED_ACTION" && State.phase !== "NEED_RESULT" && State.phase !== "NEED_REBOUND") ? true : false;
  }

  /***********************
   * AI autoplay
   ***********************/
  async function maybeAutoPlayAI() {
    if (State.possession !== "AI") return;
    if (checkGameOver()) return;

    UI.btnRoll.disabled = true;
    await sleep(220);

    while (State.possession === "AI") {
      if (State.phase === "NEED_PLAYER") { await stepRollPlayer(); await sleep(140); continue; }
      if (State.phase === "NEED_ACTION") { await stepRollAction(); await sleep(140); continue; }
      if (State.phase === "NEED_RESULT") { await stepRollResult(); await sleep(140); continue; }
      if (State.phase === "NEED_REBOUND") { await stepRollRebound(); await sleep(140); continue; }
      break;
    }

    UI.btnRoll.disabled = (State.phase === "NEED_CHOICE");
  }

  /***********************
   * New game
   ***********************/
  function newGame() {
    applyTeamsFromInputsAndSave();
    resetMatchStats();

    State.possession = "HUMAN";
    State.scores = { HUMAN: 0, AI: 0 };
    State.activePlayerId = null;
    State.phase = "NEED_PLAYER";
    State.lastShotType = null;

    UI.choiceBox.setAttribute("aria-hidden", "true");
    UI.btnRoll.disabled = false;

    UI.logBox.innerHTML = "";
    renderScores();
    setPossessionPill();
    renderActivePlayer();
    setDice(null, null, null);
    setStatus("Lancia Dado 1…");
    logLine(`🏁 Nuova partita. Arriva a <b>${CONFIG.targetScore}</b> per vincere.`);
  }

  /***********************
   * Events
   ***********************/
  UI.btnGoPlay?.addEventListener("click", () => {
    applyTeamsFromInputsAndSave();
    showScreen(UI.screenGame);
    newGame();
  });

  UI.btnGoStats?.addEventListener("click", () => {
    renderStatsUI();
    showScreen(UI.screenStats);
  });

  UI.btnGoTutorial?.addEventListener("click", () => showScreen(UI.screenTutorial));

  UI.btnBackHome?.addEventListener("click", () => showScreen(UI.screenLanding));
  UI.btnStatsBack?.addEventListener("click", () => showScreen(UI.screenLanding));
  UI.btnTutorialBack?.addEventListener("click", () => showScreen(UI.screenLanding));

  UI.btnResetStats?.addEventListener("click", resetStats);

  UI.btnSoundToggle?.addEventListener("click", async () => {
    setSound(!State.soundOn);
    sfx.click();
  });

  UI.btnNew?.addEventListener("click", newGame);

  UI.btnChooseClose?.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "close";
    State.phase = "NEED_RESULT";
    renderActivePlayer();
    await autoRollAfterChoice();
  });

  UI.btnChooseThree?.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "three";
    State.phase = "NEED_RESULT";
    renderActivePlayer();
    await autoRollAfterChoice();
  });

  UI.btnRoll?.addEventListener("click", async () => {
    if (checkGameOver()) return;

    UI.btnRoll.disabled = true;

    try {
      if (State.phase === "NEED_PLAYER") {
        setDice(null, null, null);
        await stepRollPlayer();
        State.phase = "NEED_ACTION";
        UI.btnRoll.disabled = false;
        setStatus("Lancia Dado 2…");
        return;
      }

      if (State.phase === "NEED_ACTION") {
        UI.die2.textContent = "-";
        UI.die3.textContent = "-";
        await stepRollAction();
        if (State.phase === "NEED_RESULT") UI.btnRoll.disabled = false;
        if (State.phase === "NEED_CHOICE") UI.btnRoll.disabled = true;
        return;
      }

      if (State.phase === "NEED_RESULT") {
        await stepRollResult();
        if (State.phase === "NEED_REBOUND") UI.btnRoll.disabled = false;
        if (State.phase === "NEED_PLAYER") UI.btnRoll.disabled = false;
        return;
      }

      if (State.phase === "NEED_REBOUND") {
        await stepRollRebound();
        UI.btnRoll.disabled = (State.phase === "NEED_CHOICE");
        if (State.phase === "NEED_ACTION") UI.btnRoll.disabled = false;
        if (State.phase === "NEED_PLAYER") UI.btnRoll.disabled = false;
        return;
      }

      if (State.phase === "NEED_CHOICE") {
        UI.btnRoll.disabled = true;
        return;
      }
    } finally {
      if (!checkGameOver()) {
        if (State.possession === "HUMAN") {
          UI.btnRoll.disabled = (State.phase === "NEED_CHOICE");
        } else {
          UI.btnRoll.disabled = true;
        }
      }
    }
  });

  UI.langSelect?.addEventListener("change", (e) => {
    setLang(e.target.value);
  });

  // Save teams live as user types
  [UI.teamHumanName, UI.teamAIName, UI.p1, UI.p2, UI.p3, UI.p4, UI.p5, UI.p6].forEach(el => {
    el?.addEventListener("input", () => {
      const hName = (UI.teamHumanName.value || "YOU").trim();
      const aName = (UI.teamAIName.value || "AI").trim();
      const players = [UI.p1.value, UI.p2.value, UI.p3.value, UI.p4.value, UI.p5.value, UI.p6.value].map(s => (s||"").trim());
      saveTeams({ hName, aName, players });
    });
  });

  /***********************
   * Init
   ***********************/
  fillTeamInputsFromSaved();
  applyTeamsFromInputsAndSave();
  setSound(State.soundOn);
  setLang(State.lang);
  renderStatsUI();
});
