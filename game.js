window.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    targetScore: 21,
    rollAnimMs: 520,
    aiRandomness: 0.25,
    fxDurationMs: 520,
    soundOnByDefault: true,
  };

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
      stats_sub: "Tutto salvato in locale",
      reset_stats: "Reset statistiche",
      tutorial_sub: "Regole e consigli",
      t1_title: "Come si gioca",
      t1_1: "Premi <b>Lancia</b>.",
      t1_2: "<b>Dado 1</b> sceglie il giocatore (1–6).",
      t1_3: "<b>Dado 2</b> sceglie l’azione (turnover / tiro / scelta).",
      t1_4: "<b>Dado 3</b> determina l’esito del tiro (pesato dalle skill).",
      t1_5: "Se sbagli: tiri per il rimbalzo (dipende dalla skill rimbalzo).",
      t2_title: "Azioni (Dado 2)",
      t2_1: "<b>1</b> = palla persa (cambio possesso)",
      t2_2: "<b>2–3</b> = tiro da sotto (2 punti)",
      t2_3: "<b>4–5</b> = tiro da 3 (3 punti)",
      t2_4: "<b>6</b> = scegli tu (e il Dado 3 parte da solo)",
      t3_title: "Obiettivo",
      t3_1: "Vince chi arriva per primo a <b>21</b>."
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
      stats_sub: "Saved locally",
      reset_stats: "Reset stats",
      tutorial_sub: "Rules & tips",
      t1_title: "How to play",
      t1_1: "Press <b>Roll</b>.",
      t1_2: "<b>Die 1</b> picks the player (1–6).",
      t1_3: "<b>Die 2</b> picks the action (turnover / shot / choice).",
      t1_4: "<b>Die 3</b> resolves the shot (weighted by skills).",
      t1_5: "If you miss: roll for rebound (depends on rebound skill).",
      t2_title: "Actions (Die 2)",
      t2_1: "<b>1</b> = turnover (possession changes)",
      t2_2: "<b>2–3</b> = close shot (2 points)",
      t2_3: "<b>4–5</b> = 3pt shot (3 points)",
      t2_4: "<b>6</b> = you choose (Die 3 auto-rolls)",
      t3_title: "Goal",
      t3_1: "First to <b>21</b> wins."
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
      stats_sub: "Guardado localmente",
      reset_stats: "Reset estadísticas",
      tutorial_sub: "Reglas y consejos",
      t1_title: "Cómo jugar",
      t1_1: "Pulsa <b>Lanzar</b>.",
      t1_2: "<b>Dado 1</b> elige el jugador (1–6).",
      t1_3: "<b>Dado 2</b> elige la acción (pérdida / tiro / elección).",
      t1_4: "<b>Dado 3</b> resuelve el tiro (según habilidades).",
      t1_5: "Si fallas: tira por el rebote (según rebote).",
      t2_title: "Acciones (Dado 2)",
      t2_1: "<b>1</b> = pérdida (cambia posesión)",
      t2_2: "<b>2–3</b> = tiro cerca (2 puntos)",
      t2_3: "<b>4–5</b> = tiro de 3 (3 puntos)",
      t2_4: "<b>6</b> = eliges tú (Dado 3 automático)",
      t3_title: "Objetivo",
      t3_1: "Gana el primero en llegar a <b>21</b>."
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
    st: { human2_att: 0, human3_att: 0, human2_made: 0, human3_made: 0 }
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

  // Sound
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
    UI.btnSoundToggle.textContent = on ? "🔊" : "🔇";
    UI.btnSoundToggle.setAttribute("aria-pressed", on ? "true" : "false");
  }

  // Storage
  function loadTeams() {
    try { return JSON.parse(localStorage.getItem("bd_teams") || "{}"); } catch { return {}; }
  }
  function saveTeams(obj) { localStorage.setItem("bd_teams", JSON.stringify(obj)); }

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
  function saveStats(obj) { localStorage.setItem("bd_stats", JSON.stringify(obj)); }
  function resetStats() { saveStats({}); renderStatsUI(); }
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
  function commitMatchToGlobalStats(humanWon){
    const st = loadStats();
    st.games = (st.games || 0) + 1;
    if (humanWon) st.wins = (st.wins || 0) + 1;
    else st.losses = (st.losses || 0) + 1;
    saveStats(st);
  }

  // Helpers
  function rollDie() { return Math.floor(Math.random() * 6) + 1; }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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

  // Skills
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

  // Teams
  function makeTeam(name, playersNames) {
    const names = playersNames || ["Playmaker 1","Playmaker 2","All-around 3","All-around 4","Big 5","Big 6"];
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

  let humanTeam = makeTeam("YOU");
  let aiTeam = makeTeam("AI");

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

  function teamOf(possession) { return possession === "HUMAN" ? humanTeam : aiTeam; }

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
  }

  // FX
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

  // ✅ Ball animation targets hoop (in flow)
  function animateBall(made) {
    const ballEl = UI.ballShot;
    const hoopEl = document.querySelector(".hoop");
    const parentEl = ballEl.offsetParent || document.body;

    try {
      const parentRect = parentEl.getBoundingClientRect();
      const ballRect = ballEl.getBoundingClientRect();
      const hoopRect = hoopEl.getBoundingClientRect();

      const ballCX = (ballRect.left + ballRect.right) / 2 - parentRect.left;
      const ballCY = (ballRect.top + ballRect.bottom) / 2 - parentRect.top;

      const rimCX = (hoopRect.left + hoopRect.right) / 2 - parentRect.left;
      const rimCY = (hoopRect.top + hoopRect.bottom) / 2 - parentRect.top + hoopRect.height * 0.20;

      const dx = rimCX - ballCX;
      const dy = rimCY - ballCY;

      ballEl.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      ballEl.style.setProperty("--dy", `${dy.toFixed(1)}px`);
    } catch {
      ballEl.style.setProperty("--dx", "0px");
      ballEl.style.setProperty("--dy", "-160px");
    }

    ballEl.classList.remove("make", "miss", "on");
    void ballEl.offsetWidth;
    ballEl.classList.add("on", made ? "make" : "miss");
    setTimeout(() => ballEl.classList.remove("on", "make", "miss"), 900);
  }

  // ✅ 3D dice helpers
  function setDieValue(dieEl, value) {
  if (!dieEl) return;
  const v = Math.max(0, Math.min(6, value));
  dieEl.setAttribute("data-value", String(v));
}

  async function animateRoll(dieEl, finalValue) {
    if (!dieEl) return;
    dieEl.classList.add("rolling3d");

    const start = Date.now();
    while (Date.now() - start < CONFIG.rollAnimMs) {
      setDieValue(dieEl, rollDie());
      await sleep(70);
    }

    dieEl.classList.remove("rolling3d");
    setDieValue(dieEl, finalValue);
  }

  function resetDice() {
    setDieValue(UI.die1, 0);
    setDieValue(UI.die2, 0);
    setDieValue(UI.die3, 0);
  }

  // AI
  function aiChooseShotType(player) {
    const closeLevel = player.shooting_close;
    const threeLevel = player.shooting_3;

    if (closeLevel === "good" && threeLevel !== "good") return "close";
    if (threeLevel === "good" && closeLevel !== "good") return "three";

    if (Math.random() < CONFIG.aiRandomness) return Math.random() < 0.5 ? "close" : "three";

    const score = (lvl) => (lvl === "good" ? 2 : lvl === "medium" ? 1 : 0);
    return score(closeLevel) >= score(threeLevel) ? "close" : "three";
  }

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
    resetDice();
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

    animateBall(made);

    if (made) {
      State.scores[State.possession] += points;
      renderScores();

      fxFlash();
      fxBanner(shotType === "close" ? t("bucket") : t("swish"), "good");
      fxFloat(`+${points}`);
      sfx.swish();

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
      setDieValue(UI.die2, 0);
      setDieValue(UI.die3, 0);
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
    if (!checkGameOver()) UI.btnRoll.disabled = (State.phase === "NEED_CHOICE");
  }

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

  function newGame() {
    applyTeamsFromInputsAndSave();
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
    resetDice();
    setStatus("Lancia Dado 1…");
    logLine(`🏁 Nuova partita. Arriva a <b>${CONFIG.targetScore}</b> per vincere.`);
  }

  // Events
  UI.btnGoPlay.addEventListener("click", () => {
    applyTeamsFromInputsAndSave();
    showScreen(UI.screenGame);
    newGame();
  });
  UI.btnGoStats.addEventListener("click", () => { renderStatsUI(); showScreen(UI.screenStats); });
  UI.btnGoTutorial.addEventListener("click", () => showScreen(UI.screenTutorial));

  UI.btnBackHome.addEventListener("click", () => showScreen(UI.screenLanding));
  UI.btnStatsBack.addEventListener("click", () => showScreen(UI.screenLanding));
  UI.btnTutorialBack.addEventListener("click", () => showScreen(UI.screenLanding));

  UI.btnResetStats.addEventListener("click", resetStats);
  UI.btnNew.addEventListener("click", newGame);

  UI.btnSoundToggle.addEventListener("click", () => { setSound(!State.soundOn); sfx.click(); });

  UI.btnChooseClose.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "close";
    State.phase = "NEED_RESULT";
    await autoRollAfterChoice();
  });
  UI.btnChooseThree.addEventListener("click", async () => {
    if (State.phase !== "NEED_CHOICE") return;
    State.lastShotType = "three";
    State.phase = "NEED_RESULT";
    await autoRollAfterChoice();
  });

  UI.btnRoll.addEventListener("click", async () => {
    if (checkGameOver()) return;

    UI.btnRoll.disabled = true;

    try {
      if (State.phase === "NEED_PLAYER") {
        resetDice();
        await stepRollPlayer();
        UI.btnRoll.disabled = false;
        return;
      }
      if (State.phase === "NEED_ACTION") {
        setDieValue(UI.die2, 0);
        setDieValue(UI.die3, 0);
        await stepRollAction();
        UI.btnRoll.disabled = (State.phase === "NEED_CHOICE");
        if (State.phase === "NEED_RESULT") UI.btnRoll.disabled = false;
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
    } finally {
      if (!checkGameOver()) {
        if (State.possession === "HUMAN") UI.btnRoll.disabled = (State.phase === "NEED_CHOICE");
        else UI.btnRoll.disabled = true;
      }
    }
  });

  UI.langSelect.addEventListener("change", (e) => setLang(e.target.value));

  // Save teams live
  [UI.teamHumanName, UI.teamAIName, UI.p1, UI.p2, UI.p3, UI.p4, UI.p5, UI.p6].forEach(el => {
    el.addEventListener("input", () => {
      const hName = (UI.teamHumanName.value || "YOU").trim();
      const aName = (UI.teamAIName.value || "AI").trim();
      const players = [UI.p1.value, UI.p2.value, UI.p3.value, UI.p4.value, UI.p5.value, UI.p6.value].map(s => (s||"").trim());
      saveTeams({ hName, aName, players });
    });
  });

  // Init
  fillTeamInputsFromSaved();
  applyTeamsFromInputsAndSave();
  setSound(State.soundOn);
  UI.langSelect.value = State.lang;
  setLang(State.lang);
  renderStatsUI();
});


