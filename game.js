window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const CONFIG = {
    targetScore: 21,
    rollAnimMs: 520,
    uiStepDelayMs: 420,
    aiThinkMs: 520,
    fxDurationMs: 520,
    soundOnByDefault: true,
  };

  // --- i18n ---
const I18N = {
  it: {
    landing_subtitle: "Turn-based • dadi • primo a 21",
    choose: "Scegli",
    play: "Gioca",
    stats: "Statistiche",
    stats_sub: "Totali offline (localStorage)",
    stats_team: "Statistiche squadra",
    stats_players: "Statistiche giocatori",
    pts: "PTS",
    fg: "FG",
    threes: "3PT",
    to: "TO",
    orb: "ORB",

    tutorial: "Tutorial",
    tutorial_sub: "Regole e consigli",
    coach: "Tutorial interattivo",
    coach_prev: "Indietro",
    coach_next: "Avanti",
    coach_skip: "Salta",
    coach_s1: "Benvenuto! Qui impari le basi in 30 secondi.",
    coach_s2: "Premi Lancia: il Dado 1 seleziona il giocatore (con 6 scegli tu).",
    coach_s3: "Scegli il tiro: Layup, Midrange o 3PT (punti tra parentesi).",
    coach_s4: "Dado 2 = contesto (Bad/Normal/Good/Great o finestra Turnover).",
    coach_s5: "Dado 3 risolve. Su errore puoi prendere ORB e ripartire da Dado 1.",

    language: "Lingua",
    tip6: "Tip: con 6 sul Dado 1 scegli tu il giocatore. Le skill spostano gli esiti dei dadi.",
    teams_roster: "Squadre & roster",
    team_you: "Squadra YOU",
    team_ai: "Squadra AI",
    players_you: "Giocatori YOU",
    skills_note: "Ogni giocatore ha skill (1–100): TO, LAY, MID, 3PT, ORB. Le skill influenzano turnover, canestro e rimbalzo.",
    you_lineup: "YOU • Lineup",
    ai_lineup: "AI • Lineup",
    lineups: "Lineups",
    shot_meter: "Shot meter",
    die1: "Dado 1",
    die1_hint: "Giocatore",
    die2: "Dado 2",
    die2_hint: "Contesto",
    die3: "Dado 3",
    die3_hint: "Esito",
    roll: "Lancia",
    new_game: "Nuova partita",
    log: "Cronaca",
    choose_player: "Scegli il giocatore",
    choose_shot: "Scegli il tiro",
    shot_layup: "Layup (2)",
    shot_mid: "Midrange (2)",
    shot_three: "3PT (3)",
    active_player: "Giocatore attivo",
    reset_stats: "Reset statistiche",

    // Tutorial (screen)
    t1_title: "Come si gioca",
    t1_1: "Premi Lancia per avviare il possesso.",
    t1_2: "Dado 1 seleziona il giocatore (1–5). Con 6 scegli tu.",
    t1_3: "Scegli il tiro: Layup, Midrange o 3PT.",
    t1_4: "Dado 2 determina il contesto (Bad/Normal/Good/Great o finestra Turnover).",
    t1_5: "Dado 3 risolve (canestro/errore). Su errore puoi prendere rimbalzo d'attacco e ripartire.",
    t2_title: "Contesto (Dado 2)",
    t2_1: "1 = finestra Turnover (dipende da TO).",
    t2_2: "2–3 = Bad look (penalità).",
    t2_3: "4 = Normal.",
    t2_4: "5 = Good look (bonus).",
    t2_5: "6 = Great look (bonus forte).",
    t3_title: "Obiettivo",
    t3_1: "Vince chi arriva per primo a 21 punti."
  },

  en: {
    landing_subtitle: "Turn-based • dice • first to 21",
    choose: "Choose",
    play: "Play",
    stats: "Stats",
    stats_sub: "Offline totals (localStorage)",
    stats_team: "Team stats",
    stats_players: "Player stats",
    pts: "PTS",
    fg: "FG",
    threes: "3PT",
    to: "TO",
    orb: "ORB",

    tutorial: "Tutorial",
    tutorial_sub: "Rules & tips",
    coach: "Interactive tutorial",
    coach_prev: "Back",
    coach_next: "Next",
    coach_skip: "Skip",
    coach_s1: "Welcome! Learn the basics in 30 seconds.",
    coach_s2: "Press Roll: Die 1 selects the player (on 6 you choose).",
    coach_s3: "Pick the shot: Layup, Midrange or 3PT (points in brackets).",
    coach_s4: "Die 2 = context (Bad/Normal/Good/Great or Turnover window).",
    coach_s5: "Die 3 resolves. After a miss you may get ORB and restart.",

    language: "Language",
    tip6: "Tip: roll a 6 on Die 1 to pick any player. Skills shift dice results.",
    teams_roster: "Teams & roster",
    team_you: "Team YOU",
    team_ai: "Team AI",
    players_you: "YOUR players",
    skills_note: "Each player has skills (1–100): TO, LAY, MID, 3PT, ORB. Skills affect turnovers, makes and offensive rebounds.",
    you_lineup: "YOU • Lineup",
    ai_lineup: "AI • Lineup",
    lineups: "Lineups",
    shot_meter: "Shot meter",
    die1: "Die 1",
    die1_hint: "Player",
    die2: "Die 2",
    die2_hint: "Context",
    die3: "Die 3",
    die3_hint: "Outcome",
    roll: "Roll",
    new_game: "New game",
    log: "Play-by-play",
    choose_player: "Choose a player",
    choose_shot: "Choose a shot",
    shot_layup: "Layup (2)",
    shot_mid: "Midrange (2)",
    shot_three: "3PT (3)",
    active_player: "Active player",
    reset_stats: "Reset stats",

    t1_title: "How to play",
    t1_1: "Press Roll to start the possession.",
    t1_2: "Die 1 selects the player (1–5). On 6 you choose.",
    t1_3: "Pick the shot: Layup, Midrange or 3PT.",
    t1_4: "Die 2 sets the context (Bad/Normal/Good/Great or Turnover window).",
    t1_5: "Die 3 resolves (make/miss). After a miss you may get an offensive rebound and restart.",
    t2_title: "Context (Die 2)",
    t2_1: "1 = Turnover window (depends on TO).",
    t2_2: "2–3 = Bad look (penalty).",
    t2_3: "4 = Normal.",
    t2_4: "5 = Good look (bonus).",
    t2_5: "6 = Great look (strong bonus).",
    t3_title: "Goal",
    t3_1: "First to 21 wins."
  },

  es: {
    landing_subtitle: "Por turnos • dados • primero a 21",
    choose: "Elige",
    play: "Jugar",
    stats: "Estadísticas",
    stats_sub: "Totales offline (localStorage)",
    stats_team: "Estadísticas de equipo",
    stats_players: "Estadísticas de jugadores",
    pts: "PTS",
    fg: "TC",
    threes: "3PT",
    to: "PÉR",
    orb: "RO",

    tutorial: "Tutorial",
    tutorial_sub: "Reglas y consejos",
    coach: "Tutorial interactivo",
    coach_prev: "Atrás",
    coach_next: "Siguiente",
    coach_skip: "Saltar",
    coach_s1: "¡Bienvenido! Aprende lo básico en 30 segundos.",
    coach_s2: "Pulsa Lanzar: el Dado 1 selecciona jugador (con 6 eliges tú).",
    coach_s3: "Elige el tiro: Layup, Media distancia o Triple (puntos entre paréntesis).",
    coach_s4: "Dado 2 = contexto (Bad/Normal/Good/Great o ventana de pérdida).",
    coach_s5: "Dado 3 resuelve. Tras fallo puedes tomar RO y reiniciar.",

    language: "Idioma",
    tip6: "Tip: con 6 en el Dado 1 eliges el jugador. Las skills modifican los resultados.",
    teams_roster: "Equipos y roster",
    team_you: "Equipo YOU",
    team_ai: "Equipo AI",
    players_you: "Tus jugadores",
    skills_note: "Cada jugador tiene skills (1–100): TO, LAY, MID, 3PT, ORB. Afectan pérdidas, aciertos y rebotes ofensivos.",
    you_lineup: "YOU • Lineup",
    ai_lineup: "AI • Lineup",
    lineups: "Lineups",
    shot_meter: "Shot meter",
    die1: "Dado 1",
    die1_hint: "Jugador",
    die2: "Dado 2",
    die2_hint: "Contexto",
    die3: "Dado 3",
    die3_hint: "Resultado",
    roll: "Lanzar",
    new_game: "Nueva partida",
    log: "Crónica",
    choose_player: "Elige el jugador",
    choose_shot: "Elige el tiro",
    shot_layup: "Layup (2)",
    shot_mid: "Media distancia (2)",
    shot_three: "Triple (3)",
    active_player: "Jugador activo",
    reset_stats: "Resetear estadísticas",

    t1_title: "Cómo jugar",
    t1_1: "Pulsa Lanzar para iniciar la posesión.",
    t1_2: "Dado 1 selecciona el jugador (1–5). Con 6 eliges tú.",
    t1_3: "Elige el tiro: Layup, Media distancia o Triple.",
    t1_4: "Dado 2 define el contexto (Bad/Normal/Good/Great o ventana de pérdida).",
    t1_5: "Dado 3 resuelve (acierto/fallo). Tras fallo puedes tomar rebote ofensivo y reiniciar.",
    t2_title: "Contexto (Dado 2)",
    t2_1: "1 = ventana de pérdida (depende de TO).",
    t2_2: "2–3 = Bad look (penalización).",
    t2_3: "4 = Normal.",
    t2_4: "5 = Good look (bonus).",
    t2_5: "6 = Great look (bonus fuerte).",
    t3_title: "Objetivo",
    t3_1: "Gana quien llegue primero a 21."
  }
};


  const LS_KEYS = {
    lang: "dicehoops_lang",
    stats: "dicehoops_stats_v2",
    sound: "dicehoops_sound",
  };

  let lang = localStorage.getItem(LS_KEYS.lang) || "it";

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.it[key] || key);
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = t(key);
    });
  }

  // --- Sound (basket flavored) ---
  let soundOn = (localStorage.getItem(LS_KEYS.sound) ?? String(CONFIG.soundOnByDefault)) === "true";
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(ctx, freq, ms, type, gainVal, atSec = 0, endFreq = null) {
    const start = ctx.currentTime + atSec;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, start);
    if (endFreq) {
      o.frequency.exponentialRampToValueAtTime(Math.max(60, endFreq), start + ms / 1000);
    }
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gainVal, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + ms / 1000);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(start);
    o.stop(start + ms / 1000 + 0.02);
  }

  function playSound(name) {
    if (!soundOn) return;
    try {
      const ctx = getAudioCtx();
      switch (name) {
        case "roll":
          playTone(ctx, 240, 50, "triangle", 0.06, 0, 160);
          playTone(ctx, 420, 40, "triangle", 0.04, 0.04, 260);
          break;
        case "swish":
          playTone(ctx, 1200, 120, "sine", 0.05, 0, 520);
          playTone(ctx, 780, 90, "triangle", 0.04, 0.05, 420);
          break;
        case "rim":
          playTone(ctx, 1500, 60, "square", 0.03, 0, 900);
          playTone(ctx, 900, 90, "triangle", 0.03, 0.04, 520);
          break;
        case "turnover":
          playTone(ctx, 180, 130, "sawtooth", 0.035, 0, 110);
          break;
        case "orb":
          playTone(ctx, 220, 80, "triangle", 0.06, 0, 120);
          playTone(ctx, 320, 60, "triangle", 0.05, 0.06, 180);
          break;
        case "ui_on":
          playTone(ctx, 880, 80, "sine", 0.05, 0);
          break;
        case "ui_off":
          playTone(ctx, 220, 80, "sine", 0.04, 0);
          break;
        default:
          break;
      }
    } catch {}
  }

  document.addEventListener("visibilitychange", () => {
    if (audioCtx && document.hidden) {
      audioCtx.suspend().catch(() => {});
    }
  });

  // --- Elements ---
  const $ = (id) => document.getElementById(id);

  const screenLanding = $("screenLanding");
  const screenGame = $("screenGame");
  const screenStats = $("screenStats");
  const screenTutorial = $("screenTutorial");

  const btnGoPlay = $("btnGoPlay");
  const btnGoStats = $("btnGoStats");
  const btnGoTutorial = $("btnGoTutorial");
  const btnGoCoach = $("btnGoCoach");
  const btnBackFromStats = $("btnStatsBack");
  const btnBackFromTutorial = $("btnTutorialBack");
  const btnResetStats = $("btnResetStats");
  const btnBackHome = $("btnBackHome");
  const btnSoundToggle = $("btnSoundToggle");

  const langSelect = $("langSelect");

  const possessionPill = $("possessionPill");
  const statusPill = $("statusPill");

  const scoreHuman = $("scoreHuman");
  const scoreAI = $("scoreAI");

  const btnRoll = $("btnRoll");
  const btnNew = $("btnNew");

  const die1 = $("die1");
  const die2 = $("die2");
  const die3 = $("die3");

  const logBox = $("logBox");

  const playerChoice = $("playerChoice");
  const shotChoice = $("shotChoice");

  const btnLayup = $("btnLayup");
  const btnMid = $("btnMid");
  const btnThree = $("btnThree");

  const youLineup = $("youLineup");
  const aiLineup = $("aiLineup");

  const ballShot = $("ballShot");
  const fxFlash = $("fxFlash");
  const fxBanner = $("fxBanner");
  const fxBannerText = $("fxBannerText");

  const coachOverlay = $("coachOverlay");
  const coachTitle = $("coachTitle");
  const coachBody = $("coachBody");
  const btnCoachClose = $("btnCoachClose");
  const btnCoachPrev = $("btnCoachPrev");
  const btnCoachNext = $("btnCoachNext");
  const btnCoachSkip = $("btnCoachSkip");

  // --- Helpers ---
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const rollD6 = () => (Math.random() * 6 | 0) + 1;

  function setDieValue(dieEl, value) {
    if (!dieEl) return;
    const v = Math.max(0, Math.min(6, value));
    dieEl.setAttribute("data-value", String(v));
  }

  async function animateRoll(dieEl, finalValue) {
    if (!dieEl) return;
    dieEl.classList.remove("popface", "settle");
    dieEl.classList.add("rolling3d");

    const start = Date.now();
    while (Date.now() - start < CONFIG.rollAnimMs) {
      setDieValue(dieEl, rollD6());
      await sleep(70);
    }

    dieEl.classList.remove("rolling3d");
    setDieValue(dieEl, finalValue);

    // highlight + settle
    const cube = dieEl.querySelector(".cube");
    if (cube) {
      const base = getComputedStyle(cube).transform;
      cube.style.setProperty("--final", base === "none" ? "rotateX(22deg) rotateY(28deg)" : base);
    }
    void dieEl.offsetWidth;
    dieEl.classList.add("popface", "settle");
    setTimeout(() => dieEl.classList.remove("popface", "settle"), 260);
  }

  function show(el, yes) {
    if (!el) return;
    el.setAttribute("aria-hidden", yes ? "false" : "true");
    el.style.display = yes ? "" : "none";
  }

  function setScreen(activeId) {
    [screenLanding, screenGame, screenStats, screenTutorial].forEach((s) => {
      const on = s && s.id === activeId;
      if (s) {
        s.classList.toggle("screen--active", on);
        s.setAttribute("aria-hidden", on ? "false" : "true");
      }
    });
  }

  // --- Simple routing (prevents "wrong screen" issues) ---
  const ROUTES = {
    home: "screenLanding",
    game: "screenGame",
    stats: "screenStats",
    tutorial: "screenTutorial",
  };

  let _routing = false;
  function applyRouteFromHash() {
    const raw = (location.hash || "#home").replace(/^#/, "").trim();
    const route = ROUTES[raw] ? raw : "home";
    // stop any coach overlay when navigating away
    if (route !== "game") stopCoachTutorial();
    if (route === "stats") renderStatsScreen();
    setScreen(ROUTES[route]);
  }

  function navigate(route) {
    const r = ROUTES[route] ? route : "home";
    _routing = true;
    location.hash = "#" + r;
    applyRouteFromHash();
    // allow hashchange events again
    setTimeout(() => (_routing = false), 0);
  }

  window.addEventListener("hashchange", () => {
    if (_routing) return;
    applyRouteFromHash();
  });

  function addLog(html) {
    const row = document.createElement("div");
    row.className = "log-row";
    row.innerHTML = html;
    logBox.prepend(row);
  }

  function banner(text, kind = "good") {
    fxBannerText.textContent = text;
    fxBanner.className = "fx-banner " + (kind === "bad" ? "bad" : "good");
    fxBanner.setAttribute("aria-hidden", "false");
    setTimeout(() => fxBanner.setAttribute("aria-hidden", "true"), CONFIG.fxDurationMs);
  }

  function flash(kind = "good") {
    fxFlash.className = "fx-flash " + (kind === "bad" ? "bad" : "good");
    fxFlash.setAttribute("aria-hidden", "false");
    setTimeout(() => fxFlash.setAttribute("aria-hidden", "true"), CONFIG.fxDurationMs);
  }

  // --- Ball animation ---
  function animateBall(made) {
  if (!ballShot) return;

  const courtEl = document.querySelector(".court-overlay");
  const hoopEl = document.querySelector(".hoop");
  const netEl = document.querySelector(".hoop .net");
  if (!courtEl || !hoopEl) return;

  const courtRect = courtEl.getBoundingClientRect();
  const hoopRect = hoopEl.getBoundingClientRect();
  const netRect = netEl ? netEl.getBoundingClientRect() : hoopRect;

  // Start near bottom-center of the visible court area (above the roll button)
  const startX = courtRect.left + courtRect.width * 0.5;
  const startY = Math.min(courtRect.bottom - 150, courtRect.top + courtRect.height * 0.88);

  // Rim center (slightly in front of the backboard)
  const rimX = (hoopRect.left + hoopRect.right) / 2;
  const rimY = hoopRect.top + hoopRect.height * 0.62;

  // Convert to relative coords within court
  const sx = startX - courtRect.left;
  const sy = startY - courtRect.top;
  const rx = rimX - courtRect.left;
  const ry = rimY - courtRect.top;

  // Drop point inside the net for MADE
  const dropX = rx;
  const dropY = (netRect.bottom - courtRect.top) - 10;

  ballShot.style.left = `${sx}px`;
  ballShot.style.top = `${sy}px`;
  ballShot.style.opacity = "1";
  ballShot.style.transform = "translate(0,0) scale(1)";

  const toRim = [
    { transform: `translate(0px,0px) scale(1)`, offset: 0 },
    { transform: `translate(${(rx - sx) * 0.55}px, ${(ry - sy) * 0.45}px) scale(.92)`, offset: 0.55 },
    { transform: `translate(${(rx - sx)}px, ${(ry - sy)}px) scale(.78)`, offset: 1 }
  ];

  const bounceSide = (Math.random() < 0.5 ? -1 : 1) * (18 + Math.random() * 16);
  const missEndX = (rx - sx) + bounceSide;
  const missEndY = (ry - sy) + (46 + Math.random() * 22);

  const miss = [
    { transform: `translate(0px,0px) scale(1)`, offset: 0 },
    { transform: `translate(${(rx - sx) * 0.62}px, ${(ry - sy) * 0.50}px) scale(.92)`, offset: 0.62 },
    // "hit the rim" then bounce
    { transform: `translate(${missEndX}px, ${missEndY}px) scale(.86)`, offset: 1 }
  ];

  if (!made) {
    ballShot.animate(miss, { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)" });
    setTimeout(() => { ballShot.style.opacity = "0"; }, 560);
    return;
  }

  // MADE: go to rim, then drop inside the net
  const anim1 = ballShot.animate(toRim, { duration: 360, easing: "cubic-bezier(.2,.9,.2,1)" });
  anim1.onfinish = () => {
    const drop = [
      { transform: `translate(${(rx - sx)}px, ${(ry - sy)}px) scale(.78)`, offset: 0 },
      { transform: `translate(${(dropX - sx)}px, ${(dropY - sy)}px) scale(.68)`, offset: 1 }
    ];
    ballShot.animate(drop, { duration: 240, easing: "cubic-bezier(.2,.8,.2,1)" });
    setTimeout(() => { ballShot.style.opacity = "0"; }, 640);
  };
}

  // --- Game model ---
  const rosterBase = [
    { role: "PG", name: "Play",  skills: { TO: 85, LAY: 70, MID: 68, T3: 65, ORB: 30 } },
    { role: "SG", name: "Shooter",skills:{ TO: 60, LAY: 60, MID: 75, T3: 85, ORB: 25 } },
    { role: "SF", name: "Wing",  skills: { TO: 70, LAY: 72, MID: 70, T3: 68, ORB: 50 } },
    { role: "PF", name: "Hustle",skills:{ TO: 55, LAY: 80, MID: 60, T3: 40, ORB: 80 } },
    { role: "C",  name: "Center",skills:{ TO: 50, LAY: 85, MID: 45, T3: 20, ORB: 90 } },
  ];

  function cloneTeam(prefix) {
    return rosterBase.map((p, idx) => ({
      id: idx,
      role: p.role,
      name: p.name,
      label: `${prefix}-${p.role}`,
      skills: { ...p.skills },
      stats: {
        PTS: 0,
        LAY_att: 0, LAY_made: 0,
        MID_att: 0, MID_made: 0,
        T3_att: 0,  T3_made: 0,
        ORB: 0, TO: 0
      }
    }));
  }

  function skillShift(skill100) {
    if (skill100 <= 20) return -2;
    if (skill100 <= 40) return -1;
    if (skill100 <= 60) return 0;
    if (skill100 <= 80) return +1;
    return +2;
  }

  const BASE_SUCCESS = { LAY: 3, MID: 2, T3: 2 };     // d6 thresholds
  const BASE_ORB     = { LAY: 2, MID: 2, T3: 1 };     // d6 thresholds

  function contextShift(d2) {
    // d6 mapping: 1 turnover window; 2-3 bad; 4 normal; 5 good; 6 great
    if (d2 === 2 || d2 === 3) return -1;
    if (d2 === 4) return 0;
    if (d2 === 5) return +1;
    if (d2 === 6) return +2;
    return 0;
  }

  function contextTag(d2) {
    if (d2 === 1) return { key: "TO", text: "TO", kind: "bad" };
    if (d2 === 2 || d2 === 3) return { key: "BAD", text: "BAD", kind: "bad" };
    if (d2 === 4) return { key: "NORM", text: "OK", kind: "good" };
    if (d2 === 5) return { key: "GOOD", text: "GOOD", kind: "good" };
    return { key: "GREAT", text: "GREAT", kind: "good" };
  }

  const GLOBAL_STATS_DEFAULT = {
  games: 0,
  wins: 0,
  losses: 0,
  teams: {
    you: { PF: 0, PA: 0, FGM: 0, FGA: 0, TPM: 0, TPA: 0, TO: 0, ORB: 0 },
    ai:  { PF: 0, PA: 0, FGM: 0, FGA: 0, TPM: 0, TPA: 0, TO: 0, ORB: 0 },
  },
  players: {
    you: Array.from({ length: 5 }, () => ({ PTS: 0, FGM: 0, FGA: 0, TPM: 0, TPA: 0, TO: 0, ORB: 0 })),
    ai:  Array.from({ length: 5 }, () => ({ PTS: 0, FGM: 0, FGA: 0, TPM: 0, TPA: 0, TO: 0, ORB: 0 })),
  }
};

function normalizeGlobalStats(v) {
  const base = JSON.parse(JSON.stringify(GLOBAL_STATS_DEFAULT));
  if (!v || typeof v !== "object") return base;

  base.games = v.games ?? base.games;
  base.wins = v.wins ?? base.wins;
  base.losses = v.losses ?? base.losses;

  // Legacy fields (v1/v2)
  if (typeof v.pointsFor === "number") base.teams.you.PF = v.pointsFor;
  if (typeof v.pointsAgainst === "number") base.teams.you.PA = v.pointsAgainst;
  if (typeof v.turnovers === "number") base.teams.you.TO = v.turnovers;
  if (typeof v.offReb === "number") base.teams.you.ORB = v.offReb;

  // New structure merge
  if (v.teams?.you) Object.assign(base.teams.you, v.teams.you);
  if (v.teams?.ai) Object.assign(base.teams.ai, v.teams.ai);

  if (Array.isArray(v.players?.you)) {
    for (let i = 0; i < 5; i++) Object.assign(base.players.you[i], v.players.you[i] ?? {});
  }
  if (Array.isArray(v.players?.ai)) {
    for (let i = 0; i < 5; i++) Object.assign(base.players.ai[i], v.players.ai[i] ?? {});
  }
  return base;
}

function loadGlobalStats() {
  try {
    const raw = localStorage.getItem(LS_KEYS.stats);
    if (!raw) return JSON.parse(JSON.stringify(GLOBAL_STATS_DEFAULT));
    const v = JSON.parse(raw);
    return normalizeGlobalStats(v);
  } catch {
    return JSON.parse(JSON.stringify(GLOBAL_STATS_DEFAULT));
  }
}
function saveGlobalStats(stats) {
  localStorage.setItem(LS_KEYS.stats, JSON.stringify(stats));
}

let globalStats = loadGlobalStats();

// UI stats screen
function renderStatsScreen() {
  const box = $("statsBox");
  if (!box) return;

  const tYou = globalStats.teams.you;
  const tAI = globalStats.teams.ai;

  const rowTeam = (label, team) => `
    <div class="statblock">
      <div class="statblock-head">${label}</div>
      <div class="statgrid">
        <div class="statcard"><div class="k">${t("pts")}</div><div class="v">${team.PF}</div></div>
        <div class="statcard"><div class="k">PA</div><div class="v">${team.PA}</div></div>
        <div class="statcard"><div class="k">${t("fg")}</div><div class="v">${team.FGM}/${team.FGA}</div></div>
        <div class="statcard"><div class="k">${t("threes")}</div><div class="v">${team.TPM}/${team.TPA}</div></div>
        <div class="statcard"><div class="k">${t("to")}</div><div class="v">${team.TO}</div></div>
        <div class="statcard"><div class="k">${t("orb")}</div><div class="v">${team.ORB}</div></div>
      </div>
    </div>
  `;

  const rowPlayers = (sideKey, titleKey) => {
    const arr = globalStats.players[sideKey];
    const label = sideKey === "you" ? (document.getElementById("labelHuman")?.textContent || "YOU") : (document.getElementById("labelAI")?.textContent || "AI");
    const rows = arr.map((p, i) => {
      const role = rosterBase[i]?.role ?? `P${i+1}`;
      return `
        <tr>
          <td><b>${role}</b></td>
          <td>${p.PTS}</td>
          <td>${p.FGM}/${p.FGA}</td>
          <td>${p.TPM}/${p.TPA}</td>
          <td>${p.TO}</td>
          <td>${p.ORB}</td>
        </tr>
      `;
    }).join("");

    return `
      <div class="statblock" style="margin-top:12px">
        <div class="statblock-head">${label} • ${t(titleKey)}</div>
        <div class="tablewrap">
          <table class="stattable">
            <thead>
              <tr>
                <th>Pos</th>
                <th>${t("pts")}</th>
                <th>${t("fg")}</th>
                <th>${t("threes")}</th>
                <th>${t("to")}</th>
                <th>${t("orb")}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  };

  box.innerHTML = `
    <div class="statgrid">
      <div class="statcard"><div class="k">Games</div><div class="v">${globalStats.games}</div></div>
      <div class="statcard"><div class="k">W</div><div class="v">${globalStats.wins}</div></div>
      <div class="statcard"><div class="k">L</div><div class="v">${globalStats.losses}</div></div>
    </div>

    <div class="muted mini" style="margin-top:10px">${t("stats_sub")}</div>

    <div style="margin-top:12px"></div>
    <div class="muted mini" style="margin-bottom:6px">${t("stats_team")}</div>
    ${rowTeam((document.getElementById("labelHuman")?.textContent || "YOU"), tYou)}
    ${rowTeam((document.getElementById("labelAI")?.textContent || "AI"), tAI)}

    <div class="muted mini" style="margin-top:14px; margin-bottom:6px">${t("stats_players")}</div>
    ${rowPlayers("you", "stats_players")}
    ${rowPlayers("ai", "stats_players")}
  `;
}

  // --- Match state ---
  const state = {
    you: { score: 0, team: cloneTeam("YOU") },
    ai: { score: 0, team: cloneTeam("AI") },
    possession: "you",           // 'you' | 'ai'
    phase: "ready",              // ready -> awaitShot -> resolving -> gameover
    selectedPlayerId: null,      // 0..4
    selectedShot: null,          // 'LAY'|'MID'|'T3'
    contextD2: null,
    last: { d1: 0, d2: 0, d3: 0 },
  };

  function resetMatch() {
    state.you.score = 0;
    state.ai.score = 0;
    state.possession = "you";
    state.phase = "ready";
    state.selectedPlayerId = null;
    state.selectedShot = null;
    state.contextD2 = null;
    state.last = { d1: 0, d2: 0, d3: 0 };
    state.you.team = cloneTeam("YOU");
    state.ai.team = cloneTeam("AI");

    scoreHuman.textContent = "0";
    scoreAI.textContent = "0";
    logBox.innerHTML = "";

    setDieValue(die1, 0);
    setDieValue(die2, 0);
    setDieValue(die3, 0);

    show(playerChoice, false);
    show(shotChoice, false);

    updatePills();
    renderLineups();
    banner("Dice Hoops", "good");
  }

  function updatePills() {
    const who = state.possession === "you" ? "YOU" : "AI";
    possessionPill.textContent = `Possesso: ${who}`;
    if (state.phase === "ready") statusPill.textContent = t("roll");
    if (state.phase === "awaitPlayerChoice") statusPill.textContent = t("choose_player");
    if (state.phase === "awaitShot") statusPill.textContent = t("choose_shot");
    if (state.phase === "resolving") statusPill.textContent = "…";
    if (state.phase === "gameover") statusPill.textContent = "GAME OVER";
  }

  function currentSide() {
    return state.possession === "you" ? state.you : state.ai;
  }
  function otherSide() {
    return state.possession === "you" ? state.ai : state.you;
  }

  function renderLineups() {
    function chipHTML(p, active) {
      const s = p.skills;
      const tag =
        (s.T3 >= 80) ? `<span class="tag good">3PT+</span>` :
        (s.ORB >= 80) ? `<span class="tag good">ORB+</span>` :
        (s.TO >= 80) ? `<span class="tag good">SAFE</span>` :
        (s.T3 <= 30) ? `<span class="tag bad">NO 3</span>` :
        `<span class="tag">OK</span>`;

      return `
        <div class="player-chip ${active ? "active" : ""}" data-pid="${p.id}">
          <div class="top">
            <div class="role">${p.role}</div>
            <span class="dot"></span>
          </div>
          <div class="name">${p.name}</div>
          <div class="mini">
            <span>TO ${s.TO}</span>
          </div>
          ${tag}
        </div>
      `;
    }

    const youActive = state.possession === "you" ? state.selectedPlayerId : null;
    const aiActive  = state.possession === "ai" ? state.selectedPlayerId : null;

    youLineup.innerHTML = state.you.team.map(p => chipHTML(p, p.id === youActive)).join("");
    aiLineup.innerHTML  = state.ai.team.map(p => chipHTML(p, p.id === aiActive)).join("");
  }

  // --- Core flow ---
  async function rollForPlayer() {
    state.phase = "resolving";
    updatePills();
    btnRoll.disabled = true;

    const d1 = rollD6(); // 1-6
    state.last.d1 = d1;
    await animateRoll(die1, d1);
    playSound("roll");

    if (d1 === 6) {
      state.phase = "awaitPlayerChoice";
      state.selectedPlayerId = null;
      renderLineups();

      if (state.possession === "you") {
        show(playerChoice, true);
        addLog(`<span class="tag bad">D1=6</span> YOU può scegliere il giocatore.`);
        btnRoll.disabled = true;
      } else {
        // AI chooses best player for situation
        const pid = aiPickPlayer();
        await sleep(220);
        choosePlayer(pid);
      }
      updatePills();
      return;
    }

    // d1 1-5 -> pid 0-4; d1=6 handled
    const pid = clamp(d1, 1, 5) - 1;
    choosePlayer(pid);
  }

  function choosePlayer(pid) {
    state.selectedPlayerId = pid;
    show(playerChoice, false);
    state.phase = "awaitShot";
    renderLineups();
    updatePills();

    const side = currentSide();
    const p = side.team[pid];
    addLog(`<b>${state.possession === "you" ? "YOU" : "AI"}</b> — ${p.role} <span class="muted">(${p.name})</span>`);
    if (state.possession === "you") {
      show(shotChoice, true);
      btnRoll.disabled = true;
    } else {
      show(shotChoice, false);
      // AI picks shot automatically
      const shot = aiPickShot(pid);
      state.selectedShot = shot;
      state.phase = "ready";
      updatePills();
      btnRoll.disabled = false;
      addLog(`<span class="muted">AI sceglie:</span> <b>${shotLabel(shot)}</b>`);
    }
  }

  function shotLabel(shot) {
    if (shot === "LAY") return "Layup";
    if (shot === "MID") return "Midrange";
    return "3PT";
  }

  function pickShot(shot) {
    state.selectedShot = shot;
    show(shotChoice, false);
    state.phase = "ready";
    updatePills();
    btnRoll.disabled = false;
    addLog(`<span class="muted">Scelta tiro:</span> <b>${shotLabel(shot)}</b>`);
  }

  async function resolvePlay() {
    if (state.selectedPlayerId == null || !state.selectedShot) return;

    state.phase = "resolving";
    updatePills();
    btnRoll.disabled = true;

    // Roll context (D2)
    const d2 = rollD6();
    state.contextD2 = d2;
    state.last.d2 = d2;
    await animateRoll(die2, d2);
    playSound("roll");

    // Roll outcome (D3)
    const d3 = rollD6();
    state.last.d3 = d3;
    await animateRoll(die3, d3);
    playSound("roll");

    const side = currentSide();
    const opp = otherSide();
    const p = side.team[state.selectedPlayerId];
    const ctx = contextTag(d2);

    // Turnover window
    if (d2 === 1) {
      const shTO = skillShift(p.skills.TO);
      const toThreshold = clamp(2 - shTO, 1, 4); // d6
      if (d3 <= toThreshold) {
        // turnover
        p.stats.TO += 1;
        playSound("turnover");
        flash("bad");
        banner("TURNOVER!", "bad");
        addLog(`<span class="tag bad">TO</span> ${p.role} perde palla. (D3=${d3} ≤ ${toThreshold})`);
        animateBall(false);
        endPossession();
        return;
      }
      addLog(`<span class="tag">SAFE</span> niente turnover. (D3=${d3} > ${toThreshold})`);
    }

    // Shot attempt
    const shot = state.selectedShot;
    const pts = shot === "T3" ? 3 : 2;

    // track attempts
    if (shot === "LAY") p.stats.LAY_att += 1;
    if (shot === "MID") p.stats.MID_att += 1;
    if (shot === "T3")  p.stats.T3_att += 1;

    const shShot = skillShift(shot === "T3" ? p.skills.T3 : p.skills[shot]);
    const shCtx = contextShift(d2);

    let success = BASE_SUCCESS[shot] + shShot + shCtx;
    success = clamp(success, 1, 6);

    const made = d3 <= success;

    if (made) {
      // made shot
      if (shot === "LAY") p.stats.LAY_made += 1;
      if (shot === "MID") p.stats.MID_made += 1;
      if (shot === "T3")  p.stats.T3_made += 1;

      p.stats.PTS += pts;
      side.score += pts;
      if (state.possession === "you") scoreHuman.textContent = String(side.score);
      else scoreAI.textContent = String(side.score);

      flash("good");
      banner(`+${pts}`, "good");
      addLog(`<span class="tag good">${ctx.text}</span> <b>${shotLabel(shot)}</b> — CANESTRO! (D3=${d3} ≤ ${success})`);
      animateBall(true);
      playSound("swish");

      if (side.score >= CONFIG.targetScore) {
        finishGame();
        return;
      }
      endPossession();
      return;
    }

    // Missed shot -> Offensive rebound attempt
    flash("bad");
    addLog(`<span class="tag ${ctx.kind === "bad" ? "bad" : "good"}">${ctx.text}</span> <b>${shotLabel(shot)}</b> — ferro. (D3=${d3} > ${success})`);
    animateBall(false);
    playSound("rim");

    // Rebound roll uses die3 again (keeps dice focus, still 3D)
    await sleep(180);
    const d3r = rollD6();
    await animateRoll(die3, d3r);

    const shOrb = skillShift(p.skills.ORB);
    const orbBase = BASE_ORB[shot];
    let orbSuccess = orbBase + shOrb + (shCtx > 0 ? 1 : 0); // good/great slightly help second chance
    orbSuccess = clamp(orbSuccess, 1, 6);

    if (d3r <= orbSuccess) {
      p.stats.ORB += 1;
      playSound("orb");
      flash("good");
      banner("OFF REB!", "good");
      addLog(`<span class="tag good">ORB</span> rimbalzo d'attacco! (D3=${d3r} ≤ ${orbSuccess}) → si riparte.`);
      // Restart within same possession
      state.selectedPlayerId = null;
      state.selectedShot = null;
      state.contextD2 = null;
      renderLineups();
      state.phase = "resolving";
      updatePills();

      // Immediately roll for next player
      await sleep(200);
      await rollForPlayer();
      return;
    }

    addLog(`<span class="tag bad">NO ORB</span> cambio possesso. (D3=${d3r} > ${orbSuccess})`);
    endPossession();
  }

  function endPossession() {
    // reset selection and swap possession
    state.selectedPlayerId = null;
    state.selectedShot = null;
    state.contextD2 = null;
    state.possession = state.possession === "you" ? "ai" : "you";
    renderLineups();
    state.phase = "ready";
    updatePills();

    btnRoll.disabled = false;

    // AI autoplay
    if (state.possession === "ai") {
      autoplayAI();
    }
  }

  function finishGame() {
  state.phase = "gameover";
  updatePills();
  btnRoll.disabled = true;
  show(playerChoice, false);
  show(shotChoice, false);

  const youWon = state.you.score >= CONFIG.targetScore;

  // --- Aggregate stats ---
  globalStats.games += 1;
  if (youWon) globalStats.wins += 1;
  else globalStats.losses += 1;

  const aggregateSide = (sideKey) => {
    const side = sideKey === "you" ? state.you : state.ai;
    const opp = sideKey === "you" ? state.ai : state.you;

    const T = globalStats.teams[sideKey];
    T.PF += side.score;
    T.PA += opp.score;

    // per-player + team shooting/TO/ORB
    side.team.forEach((p, idx) => {
      const ps = p.stats;

      const fga = ps.LAY_att + ps.MID_att + ps.T3_att;
      const fgm = ps.LAY_made + ps.MID_made + ps.T3_made;

      const pla = globalStats.players[sideKey][idx];
      pla.PTS += ps.PTS;
      pla.FGA += fga;
      pla.FGM += fgm;
      pla.TPA += ps.T3_att;
      pla.TPM += ps.T3_made;
      pla.TO  += ps.TO;
      pla.ORB += ps.ORB;

      T.FGA += fga;
      T.FGM += fgm;
      T.TPA += ps.T3_att;
      T.TPM += ps.T3_made;
      T.TO  += ps.TO;
      T.ORB += ps.ORB;
    });
  };

  aggregateSide("you");
  aggregateSide("ai");

  saveGlobalStats(globalStats);
  renderStatsScreen();

  banner(youWon ? "YOU WIN!" : "AI WINS!", youWon ? "good" : "bad");
  addLog(`<hr/>`);
  addLog(`<b>${youWon ? "YOU WIN" : "AI WINS"}</b> — ${state.you.score} : ${state.ai.score}`);
}

  // --- AI ---
  function aiPickPlayer() {
    // pick best player for situation: if needs 3, prefer shooter; if wants safe, prefer TO
    const deficit = state.you.score - state.ai.score; // positive means AI trailing
    let best = 0;
    let bestScore = -1e9;
    state.ai.team.forEach((p) => {
      const s = p.skills;
      const need3 = deficit >= 3 || (state.ai.score >= 18 && deficit > 0);
      const score =
        (need3 ? s.T3 * 1.2 : s.LAY * 1.0) +
        s.ORB * 0.35 +
        s.TO * 0.55;
      if (score > bestScore) { bestScore = score; best = p.id; }
    });
    return best;
  }

  function aiPickShot(pid) {
    const p = state.ai.team[pid];
    const deficit = state.you.score - state.ai.score;
    const need3 = deficit >= 3 || (state.ai.score >= 18 && deficit > 0);

    // approximate expected value using average context shift (roughly +0.25)
    const avgCtx = 0.25;

    const scoreShot = (shot) => {
      const sh = skillShift(shot === "T3" ? p.skills.T3 : p.skills[shot]);
      const base = BASE_SUCCESS[shot] + sh + avgCtx;
      const thr = clamp(base, 1, 6);
      const pMake = thr / 6;
      const pts = shot === "T3" ? 3 : 2;

      // add offensive rebound value (second chance)
      const orb = clamp(BASE_ORB[shot] + skillShift(p.skills.ORB), 1, 6) / 6;
      const orbValue = orb * (pts * 0.35); // conservative

      // turnover risk (only on d2=1 => 1/6 chance)
      const toThr = clamp(2 - skillShift(p.skills.TO), 1, 4);
      const pTO = (1/6) * (toThr / 6);

      let value = pMake * pts + orbValue - pTO * 2.2;

      if (need3 && shot === "T3") value += 0.35;
      if (!need3 && shot === "T3") value -= 0.15;
      return value;
    };

    const opts = ["LAY", "MID", "T3"];
    opts.sort((a, b) => scoreShot(b) - scoreShot(a));
    return opts[0];
  }

  async function autoplayAI() {
    if (state.phase === "gameover") return;
    // AI sequence: roll player, choose shot, roll resolve
    btnRoll.disabled = true;
    await sleep(CONFIG.aiThinkMs);

    await rollForPlayer(); // may choose player internally

    // If AI still needs to choose player (shouldn't), safeguard
    if (state.possession !== "ai") return;
    if (state.phase === "awaitShot") {
      // AI already selected shot inside choosePlayer -> set ready; ensure
      state.phase = "ready";
      updatePills();
    }
    await sleep(180);

    // Resolve
    if (state.selectedPlayerId != null && state.selectedShot) {
      await resolvePlay();
    } else {
      // if something went off, force end
      endPossession();
    }
  }

// --- Coach (interactive tutorial) ---
let coachOn = false;
let coachStep = 0;
const coachSteps = [
  { key: "coach_s1", highlight: null },
  { key: "coach_s2", highlight: "btnRoll" },
  { key: "coach_s3", highlight: "shotChoice" },
  { key: "coach_s4", highlight: "die2" },
  { key: "coach_s5", highlight: "die3" },
];

function coachShow(showIt) {
  if (!coachOverlay) return;
  coachOverlay.classList.toggle("show", !!showIt);
  coachOverlay.setAttribute("aria-hidden", showIt ? "false" : "true");
}

function clearCoachHighlights() {
  document.querySelectorAll(".coach-highlight").forEach((el) => el.classList.remove("coach-highlight"));
}

function highlightEl(idOrSelector) {
  clearCoachHighlights();
  if (!idOrSelector) return;
  const el = typeof idOrSelector === "string"
    ? (document.getElementById(idOrSelector) || document.querySelector("." + idOrSelector) || document.querySelector(idOrSelector))
    : idOrSelector;
  if (el) el.classList.add("coach-highlight");
}

async function runCoachScriptForStep(stepIdx) {
  // Script a short, deterministic mini-sequence so the tutorial "shows" the flow.
  if (!coachOn) return;

  if (stepIdx === 1) {
    // Prepare a player-choice scenario: D1 = 6
    resetMatch();
    state.possession = "you";
    state.phase = "ready";
    updatePills();
    btnRoll.disabled = true;

    // Visually show Die 1 = 6 then open player choice
    await animateRoll(die1, 6);
    state.last.d1 = 6;
    state.phase = "awaitPlayerChoice";
    state.selectedPlayerId = null;
    show(playerChoice, true);
    show(shotChoice, false);
    updatePills();
    btnRoll.disabled = true;
    addLog(`<span class="tag">COACH</span> D1=6 → scegli il giocatore.`);
    highlightEl("playerChoice");
  }

  if (stepIdx === 2) {
    // Choose a sample player (SG) and show shot choice
    if (state.phase === "awaitPlayerChoice") {
      choosePlayer(1);
    }
    show(shotChoice, true);
    btnRoll.disabled = true;
    highlightEl("shotChoice");
  }

  if (stepIdx === 3) {
    // Pick a shot, then script D2 and D3
    pickShot("T3");
    // Context = great (6), outcome = made (1)
    btnRoll.disabled = true;
    await sleep(120);
    await animateRoll(die2, 6);
    await animateRoll(die3, 1);
    addLog(`<span class="tag good">GREAT</span> 3PT — CANESTRO! (tutorial)`);
    animateBall(true);
    highlightEl("die3");
  }
}

function coachRender() {
  if (!coachOn) return;
  const step = coachSteps[coachStep];
  if (!step) return;
  if (coachTitle) coachTitle.textContent = t("coach");
  if (coachBody) coachBody.innerHTML = t(step.key);
  highlightEl(step.highlight);
  if (btnCoachPrev) btnCoachPrev.disabled = coachStep === 0;
}

function startCoachTutorial() {
  coachOn = true;
  coachStep = 0;
  setScreen("screenGame");
  resetMatch();
  coachShow(true);
  coachRender();
}

function stopCoachTutorial() {
  coachOn = false;
  coachShow(false);
  clearCoachHighlights();
}

btnCoachClose?.addEventListener("click", stopCoachTutorial);
btnCoachSkip?.addEventListener("click", stopCoachTutorial);
btnCoachPrev?.addEventListener("click", () => {
  coachStep = Math.max(0, coachStep - 1);
  coachRender();
});
btnCoachNext?.addEventListener("click", async () => {
  coachStep = Math.min(coachSteps.length - 1, coachStep + 1);
  coachRender();
  // Run script on certain steps to show flow
  if (coachStep === 1) await runCoachScriptForStep(1);
  if (coachStep === 2) await runCoachScriptForStep(2);
  if (coachStep === 3) await runCoachScriptForStep(3);
  if (coachStep === coachSteps.length - 1) {
    // last step: keep overlay open until user closes
  }
});

  // --- UI actions ---
  btnGoPlay?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("game");
  });
  btnGoStats?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("stats");
  });

  btnResetStats?.addEventListener("click", () => {
    globalStats = JSON.parse(JSON.stringify(GLOBAL_STATS_DEFAULT));
    saveGlobalStats(globalStats);
    renderStatsScreen();
  });
  btnGoTutorial?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("tutorial");
  });
  btnGoCoach?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Coach tutorial runs inside the game screen
    navigate("game");
    startCoachTutorial();
  });
  btnBackFromStats?.addEventListener("click", (e) => {
    e.preventDefault();
    navigate("home");
  });
  btnBackFromTutorial?.addEventListener("click", (e) => {
    e.preventDefault();
    navigate("home");
  });
  btnBackHome?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("home");
  });

  // Language
  if (langSelect) {
    langSelect.value = lang;
    langSelect.addEventListener("change", () => {
      lang = langSelect.value;
      localStorage.setItem(LS_KEYS.lang, lang);
      applyI18n();
    });
  }


  // Sound toggle (topbar)
  function renderSoundIcon(){
    if (!btnSoundToggle) return;
    btnSoundToggle.textContent = soundOn ? "🔊" : "🔇";
    btnSoundToggle.setAttribute("aria-pressed", soundOn ? "true" : "false");
  }
  btnSoundToggle?.addEventListener("click", () => {
    soundOn = !soundOn;
    localStorage.setItem(LS_KEYS.sound, String(soundOn));
    renderSoundIcon();
    playSound(soundOn ? "ui_on" : "ui_off");
  });
  renderSoundIcon();

  // Roll button logic depends on phase
  btnRoll?.addEventListener("click", async () => {
    if (state.phase === "gameover") return;

    if (state.selectedPlayerId == null) {
      await rollForPlayer();
      return;
    }

    if (!state.selectedShot) {
      // waiting for shot selection
      return;
    }

    await resolvePlay();
  });

  btnNew?.addEventListener("click", () => {
    resetMatch();
    // Start with YOU possession ready
    btnRoll.disabled = false;
  });

  // Choice buttons
  playerChoice?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-player]");
    if (!btn) return;
    if (state.possession !== "you" || state.phase !== "awaitPlayerChoice") return;
    const pid = Number(btn.getAttribute("data-player"));
    choosePlayer(clamp(pid, 0, 4));
  });

  btnLayup?.addEventListener("click", () => pickShot("LAY"));
  btnMid?.addEventListener("click", () => pickShot("MID"));
  btnThree?.addEventListener("click", () => pickShot("T3"));

  // init
  applyI18n();
  renderStatsScreen();
  // Use hash routing so landing buttons always open the correct screen
  applyRouteFromHash();
  resetMatch();

  // PWA SW
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
