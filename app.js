const levels = window.HSK_LEVELS || [];
const videosByLevel = window.HSK_VIDEOS || {};
const grammarByLevel = window.HSK_GRAMMAR || {};
const storageKey = "hsk-chinese-studio-state-v1";
const authSessionKey = "hsk-chinese-studio-auth-session-v1";
const activeAccountKey = "hsk-chinese-studio-active-account-v1";
const activeAccountsKey = "hsk-chinese-studio-active-accounts-v2";
const authHeartbeatMs = 5000;
const authStaleMs = 15000;
const wordsPerPage = 15;
const dialoguesPerPage = 5;
const defaultAccounts = {
  admin: "123456",
  guest: "123456",
  user: "123456"
};

const defaultState = {
  levelId: 1,
  tab: "words",
  search: "",
  known: [],
  wordPage: 1,
  dialoguePage: 1,
  flashIndex: 0,
  flashFlipped: false,
  dialogueTopic: "all",
  videoTopic: "all",
  videoId: "",
  grammarAnswers: {},
  grammarChecked: false,
  writingWord: "",
  writingChar: ""
};

let state = loadState();
let writer = null;
let writerScriptLoading = false;
let writerScriptFailed = false;
let resizeTimer = null;
let flashQuiz = null;
let authHeartbeatTimer = null;
let tesseractScriptLoading = null;

const translationState = {
  mode: "text",
  source: "",
  target: "vi",
  extracted: "",
  result: "",
  status: "",
  error: "",
  imageName: ""
};

const practiceState = {
  char: "",
  strokes: [],
  redoStack: [],
  activeStroke: null,
  drawing: false,
  quizActive: false,
  completed: false,
  expectedStrokeCount: null,
  warning: ""
};

const elements = {
  levelNav: document.querySelector("#levelNav"),
  levelBand: document.querySelector("#levelBand"),
  levelTitle: document.querySelector("#levelTitle"),
  levelTarget: document.querySelector("#levelTarget"),
  levelGoals: document.querySelector("#levelGoals"),
  overallKnown: document.querySelector("#overallKnown"),
  overallProgress: document.querySelector("#overallProgress"),
  wordSearch: document.querySelector("#wordSearch"),
  tabButtons: Array.from(document.querySelectorAll(".tab-button")),
  contentArea: document.querySelector("#contentArea"),
  appShell: document.querySelector(".app-shell"),
  loginScreen: document.querySelector("#loginScreen"),
  loginForm: document.querySelector("#loginForm"),
  loginUsername: document.querySelector("#loginUsername"),
  loginPassword: document.querySelector("#loginPassword"),
  loginError: document.querySelector("#loginError"),
  loginFillButtons: Array.from(document.querySelectorAll("[data-login-fill]")),
  userPanel: document.querySelector("#userPanel"),
  activeUserLabel: document.querySelector("#activeUserLabel"),
  logoutButton: document.querySelector("#logoutButton")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      ...defaultState,
      ...saved,
      known: Array.isArray(saved.known) ? saved.known : [],
      wordPage: Number(saved.wordPage) > 0 ? Number(saved.wordPage) : 1,
      dialoguePage: Number(saved.dialoguePage) > 0 ? Number(saved.dialoguePage) : 1,
      grammarAnswers: saved.grammarAnswers && typeof saved.grammarAnswers === "object" && !Array.isArray(saved.grammarAnswers) ? saved.grammarAnswers : {}
    };
  } catch {
    return { ...defaultState };
  }
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function readJsonStorage(storage, key) {
  try {
    return JSON.parse(storage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function writeJsonStorage(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
}

function makeSession(username) {
  const random = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const now = Date.now();
  return {
    username,
    token: `${username}-${random}`,
    loggedAt: new Date(now).toISOString(),
    lastSeen: now
  };
}

function readTabSession() {
  const session = readJsonStorage(sessionStorage, authSessionKey);
  return session && defaultAccounts[session.username] ? session : null;
}

function sessionLastSeen(session) {
  return Number(session?.lastSeen) || Date.parse(session?.loggedAt || "") || 0;
}

function isFreshSession(session) {
  const lastSeen = sessionLastSeen(session);
  return lastSeen > 0 && Date.now() - lastSeen <= authStaleMs;
}

function readActiveAccounts() {
  const accounts = readJsonStorage(localStorage, activeAccountsKey);
  const legacy = readJsonStorage(localStorage, activeAccountKey);
  const normalized = accounts && typeof accounts === "object" && !Array.isArray(accounts) ? accounts : {};
  let changed = false;
  if (legacy && defaultAccounts[legacy.username] && !normalized[legacy.username]) {
    normalized[legacy.username] = legacy;
    changed = true;
    localStorage.removeItem(activeAccountKey);
  }
  const freshAccounts = Object.fromEntries(
    Object.entries(normalized).filter(([username, session]) => {
      const fresh = defaultAccounts[username] && session?.username === username && isFreshSession(session);
      if (!fresh) changed = true;
      return fresh;
    })
  );
  if (changed) writeActiveAccounts(freshAccounts);
  return freshAccounts;
}

function writeActiveAccounts(accounts) {
  writeJsonStorage(localStorage, activeAccountsKey, accounts);
}

function activeAccountFor(username) {
  return readActiveAccounts()[username] || null;
}

function writeTabSession(session) {
  writeJsonStorage(sessionStorage, authSessionKey, session);
}

function writeActiveAccount(session) {
  const accounts = readActiveAccounts();
  accounts[session.username] = { ...session, lastSeen: Date.now() };
  writeActiveAccounts(accounts);
}

function removeActiveAccount(username) {
  const accounts = readActiveAccounts();
  delete accounts[username];
  writeActiveAccounts(accounts);
}

function refreshActiveSession() {
  const session = readTabSession();
  if (!session) return null;

  const active = activeAccountFor(session.username);
  if (active && active.token !== session.token) {
    sessionStorage.removeItem(authSessionKey);
    return null;
  }

  const refreshed = { ...session, lastSeen: Date.now() };
  writeTabSession(refreshed);
  writeActiveAccount(refreshed);
  return refreshed;
}

function startAuthHeartbeat() {
  stopAuthHeartbeat();
  refreshActiveSession();
  authHeartbeatTimer = window.setInterval(refreshActiveSession, authHeartbeatMs);
}

function stopAuthHeartbeat() {
  if (!authHeartbeatTimer) return;
  window.clearInterval(authHeartbeatTimer);
  authHeartbeatTimer = null;
}

function clearCurrentActiveAccount() {
  const session = readTabSession();
  if (!session) return;
  const active = activeAccountFor(session.username);
  if (active?.token === session.token) removeActiveAccount(session.username);
}

function activeSession() {
  const session = readTabSession();
  if (!session) return null;

  const active = activeAccountFor(session.username);
  if (!active) {
    writeActiveAccount(session);
    return session;
  }

  if (active.token === session.token) return refreshActiveSession() || session;

  sessionStorage.removeItem(authSessionKey);
  return null;
}

function setLoginError(message = "") {
  if (elements.loginError) elements.loginError.textContent = message;
}

function showLogin(message = "") {
  stopAuthHeartbeat();
  elements.loginScreen.hidden = false;
  elements.appShell.classList.add("auth-hidden");
  if (elements.userPanel) elements.userPanel.hidden = true;
  setLoginError(message);
  requestAnimationFrame(() => elements.loginUsername?.focus());
}

function showApp(session) {
  startAuthHeartbeat();
  elements.loginScreen.hidden = true;
  elements.appShell.classList.remove("auth-hidden");
  if (elements.userPanel) elements.userPanel.hidden = false;
  if (elements.activeUserLabel) elements.activeUserLabel.textContent = session.username;
  setLoginError("");
  render();
}

function handleLogin(event) {
  event.preventDefault();
  const username = elements.loginUsername.value.trim().toLowerCase();
  const password = elements.loginPassword.value;

  if (!defaultAccounts[username] || defaultAccounts[username] !== password) {
    setLoginError("Tài khoản hoặc mật khẩu không đúng.");
    return;
  }

  const active = activeAccountFor(username);
  if (active) {
    setLoginError(`Tài khoản ${username} đang đăng nhập. Không thể đăng nhập lại bằng tài khoản này.`);
    return;
  }

  const session = makeSession(username);
  writeTabSession(session);
  writeActiveAccount(session);
  showApp(session);
}

function logout() {
  const session = readTabSession();
  stopAuthHeartbeat();
  sessionStorage.removeItem(authSessionKey);
  if (session) removeActiveAccount(session.username);
  elements.loginPassword.value = "";
  showLogin("");
}

function initializeAuth() {
  const session = activeSession();
  if (session) {
    showApp(session);
    return;
  }
  showLogin("");
}

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function speakerIcon() {
  return `
    <svg class="speaker-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z"></path>
      <path d="M16 8.5c1.1 1.1 1.7 2.2 1.7 3.5s-.6 2.4-1.7 3.5"></path>
      <path d="M18.8 5.7C20.8 7.5 22 9.7 22 12s-1.2 4.5-3.2 6.3"></path>
    </svg>
  `;
}

function undoIcon() {
  return `
    <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 14 4 9l5-5"></path>
      <path d="M4 9h9.5a5.5 5.5 0 1 1 0 11H11"></path>
    </svg>
  `;
}

function redoIcon() {
  return `
    <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 14 5-5-5-5"></path>
      <path d="M20 9h-9.5a5.5 5.5 0 1 0 0 11H13"></path>
    </svg>
  `;
}

function translateToolIcon(name) {
  const paths = {
    text: `<path d="m5 8 6 0"></path><path d="M8 5v12"></path><path d="M4 17h8"></path><path d="M14 7h6"></path><path d="m17 7-3 8"></path><path d="m17 7 3 8"></path><path d="M15 13h4"></path>`,
    image: `<rect x="4" y="5" width="16" height="14" rx="2"></rect><path d="m7 16 3.5-3.5 2.5 2.5 2-2 3 3"></path><circle cx="9" cy="9" r="1.2"></circle>`,
    file: `<path d="M7 3h7l5 5v13H7z"></path><path d="M14 3v5h5"></path>`,
    web: `<rect x="4" y="5" width="16" height="14" rx="2"></rect><path d="M4 9h16"></path><path d="M9 5v14"></path>`,
    swap: `<path d="M7 7h11"></path><path d="m15 4 3 3-3 3"></path><path d="M17 17H6"></path><path d="m9 14-3 3 3 3"></path>`,
    close: `<path d="M6 6l12 12"></path><path d="M18 6 6 18"></path>`,
    mic: `<path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"></path><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path>`,
    edit: `<path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16z"></path><path d="m13 7 4 4"></path>`
  };
  return `
    <svg class="translate-icon" viewBox="0 0 24 24" aria-hidden="true">
      ${paths[name] || paths.text}
    </svg>
  `;
}

function renderMeaning(word, options = {}) {
  const className = options.flash ? "flash-meaning" : "meaning";
  const noteClass = options.flash ? "flash-meaning-note" : "meaning-note";
  const note = word.meaningNote ? `<span class="${noteClass}">(${htmlEscape(word.meaningNote)})</span>` : "";
  return `<div class="${className}">${htmlEscape(word.meaning || "")}</div>${note}`;
}

function renderExample(word, options = {}) {
  const compact = options.compact ? " compact" : "";
  return `
    <div class="word-example${compact}">
      <span class="example-label">Ví dụ:</span>
      <div class="example-line">
        <strong>${htmlEscape(word.example)}</strong>
        <button class="speak-button speak-button-small" type="button" data-speak="${htmlEscape(word.example)}" aria-label="Nghe câu ví dụ" title="Nghe câu ví dụ">
          ${speakerIcon()}
        </button>
      </div>
      <span>${htmlEscape(word.examplePinyin)}</span>
      <span>${htmlEscape(word.exampleMeaning)}</span>
    </div>
  `;
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ü/g, "u");
}

function currentLevel() {
  return levels.find((level) => level.id === state.levelId) || levels[0];
}

function allWords() {
  return levels.flatMap((level) => level.words.map((word) => ({ levelId: level.id, ...word })));
}

function validKnownKeys() {
  const validKeys = new Set(allWords().map((word) => wordKey(word.levelId, word)));
  return state.known.filter((key) => validKeys.has(key));
}

function wordKey(levelId, word) {
  const identity = typeof word === "string" ? word : word.id || word.hanzi;
  return `${levelId}:${identity}`;
}

function isKnown(levelId, word) {
  return state.known.includes(wordKey(levelId, word));
}

function toggleKnown(levelId, word, forceKnown) {
  const key = wordKey(levelId, word);
  const shouldKnow = forceKnown === undefined ? !state.known.includes(key) : forceKnown;
  if (shouldKnow && !state.known.includes(key)) {
    state.known.push(key);
  }
  if (!shouldKnow) {
    state.known = state.known.filter((item) => item !== key);
  }
  persist();
}

function levelKnownCount(level) {
  return level.words.filter((word) => isKnown(level.id, word)).length;
}

function filteredWords(level = currentLevel()) {
  const query = normalize(state.search.trim());
  if (!query) return level.words;
  return level.words.filter((word) => {
    const haystack = normalize(
      [
        word.hanzi,
        word.pinyin,
        word.meaning,
        word.meaningNote,
        word.type,
        word.tags.join(" "),
        word.example,
        word.examplePinyin,
        word.exampleMeaning
      ].join(" ")
    );
    return haystack.includes(query);
  });
}

function filteredDialogues(level = currentLevel()) {
  const query = normalize(state.search.trim());
  return level.dialogues.filter((dialogue) => {
    if (state.dialogueTopic !== "all" && dialogue.topic !== state.dialogueTopic) return false;
    if (!query) return true;
    const lineText = dialogue.lines.flat().join(" ");
    const haystack = normalize([dialogue.title, dialogue.topic, lineText].join(" "));
    return haystack.includes(query);
  });
}

function levelVideos(level = currentLevel()) {
  return videosByLevel[level.id] || [];
}

function filteredVideos(level = currentLevel()) {
  const query = normalize(state.search.trim());
  return levelVideos(level).filter((video) => {
    if (state.videoTopic !== "all" && !video.tags.includes(state.videoTopic)) return false;
    if (!query) return true;
    const cueText = videoStudyLines(video, level).flat().join(" ");
    const haystack = normalize([video.title, video.tags.join(" "), cueText].join(" "));
    return haystack.includes(query);
  });
}

function levelGrammar(level = currentLevel()) {
  return grammarByLevel[level.id] || [];
}

function filteredGrammar(level = currentLevel()) {
  const query = normalize(state.search.trim());
  const items = levelGrammar(level);
  if (!query) return items;
  return items.filter((item) => {
    const exampleText = item.examples.flat().join(" ");
    const quizText = [item.quiz?.question, ...(item.quiz?.options || [])].join(" ");
    const haystack = normalize([item.title, item.structure, item.note, exampleText, quizText].join(" "));
    return haystack.includes(query);
  });
}

function clampPage(page, totalItems, perPage) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  return Math.min(Math.max(1, Number(page) || 1), totalPages);
}

function pageSlice(items, page, perPage) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

function renderPagination(scope, page, totalItems, perPage) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  if (totalPages <= 1) return "";
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1);
  const buttons = [];
  let previous = 0;
  for (const item of pages) {
    if (previous && item - previous > 1) buttons.push(`<span class="page-ellipsis">...</span>`);
    buttons.push(
      `<button class="page-button${item === page ? " active" : ""}" type="button" data-page-scope="${scope}" data-page="${item}">${item}</button>`
    );
    previous = item;
  }
  return `
    <nav class="pagination" aria-label="Phân trang">
      <button class="page-button" type="button" data-page-scope="${scope}" data-page="prev" ${page <= 1 ? "disabled" : ""}>Trước</button>
      ${buttons.join("")}
      <button class="page-button" type="button" data-page-scope="${scope}" data-page="next" ${page >= totalPages ? "disabled" : ""}>Sau</button>
    </nav>
  `;
}

function renderNav() {
  elements.levelNav.innerHTML = levels
    .map((level) => {
      const known = levelKnownCount(level);
      const active = level.id === state.levelId ? " active" : "";
      return `
        <button class="level-card${active}" type="button" data-level="${level.id}">
          <span class="level-index">H${level.id}</span>
          <span class="level-name">
            <strong>${htmlEscape(level.title)}</strong>
            <small>${htmlEscape(level.band)}</small>
          </span>
          <span class="level-count">${known}/${level.words.length}</span>
        </button>
      `;
    })
    .join("");
}

function renderHeader() {
  const level = currentLevel();
  elements.levelBand.textContent = `${level.band} · ${level.words.length.toLocaleString("vi-VN")} từ mới · mốc ${level.totalWords.toLocaleString("vi-VN")} từ`;
  elements.levelTitle.textContent = level.title;
  elements.levelTarget.textContent = level.target;
  elements.levelGoals.innerHTML = level.goals.map((goal) => `<span class="goal-chip">${htmlEscape(goal)}</span>`).join("");
}

function renderOverallProgress() {
  const validKnown = validKnownKeys();
  if (validKnown.length !== state.known.length) {
    state.known = validKnown;
    persist();
  }
  const known = validKnown.length;
  const total = allWords().length || 1;
  if (elements.overallKnown) elements.overallKnown.textContent = String(known);
  if (elements.overallProgress) elements.overallProgress.style.width = `${Math.round((known / total) * 100)}%`;
}

function renderTabs() {
  elements.tabButtons.forEach((button) => {
    const selected = button.dataset.tab === state.tab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
}

function renderStats(level, words) {
  const known = levelKnownCount(level);
  const remaining = level.words.length - known;
  const filtered = words.length;
  const progress = Math.round((known / level.words.length) * 100);
  return `
    <div class="stats-row">
      <div class="stat-box">
        <span>Cấp hiện tại</span>
        <strong>${htmlEscape(level.title)}</strong>
      </div>
      <div class="stat-box">
        <span>Từ mới cấp này</span>
        <strong>${level.words.length.toLocaleString("vi-VN")}</strong>
      </div>
      <div class="stat-box">
        <span>Đã nhớ</span>
        <strong>${known}</strong>
      </div>
      <div class="stat-box">
        <span>Còn lại / lọc</span>
        <strong>${remaining} / ${filtered}</strong>
      </div>
    </div>
    <div class="resource-strip">
      <span class="stat-pill">Tiến độ ${progress}%</span>
      <span class="stat-pill">Mốc HSK ${level.id}: ${level.totalWords.toLocaleString("vi-VN")} từ</span>
      <a href="${youtubeSearchUrl(`HSK ${level.id} vocabulary pronunciation examples`)}" target="_blank" rel="noreferrer">
        Video từ vựng ${htmlEscape(level.title)}
      </a>
    </div>
  `;
}

function renderWords() {
  const level = currentLevel();
  const words = filteredWords(level);
  state.wordPage = clampPage(state.wordPage, words.length, wordsPerPage);
  const pagedWords = pageSlice(words, state.wordPage, wordsPerPage);
  const cards = pagedWords.length
    ? pagedWords
        .map((word) => {
          const known = isKnown(level.id, word);
          return `
            <article class="word-card${known ? " known" : ""}">
              <div class="word-head">
                <div>
                  <div class="hanzi">${htmlEscape(word.hanzi)}</div>
                  <div class="pinyin">${htmlEscape(word.pinyin)}</div>
                </div>
                <div class="word-actions">
                  <button class="speak-button" type="button" data-speak="${htmlEscape(word.hanzi)}" aria-label="Nghe từ ${htmlEscape(word.hanzi)}" title="Nghe từ">
                    ${speakerIcon()}
                  </button>
                  <button class="mark-button${known ? " active" : ""}" type="button" data-mark-key="${htmlEscape(word.id || word.hanzi)}" data-level-id="${level.id}">
                    ${known ? "Đã nhớ" : "Ghi nhớ"}
                  </button>
                </div>
              </div>
              ${renderMeaning(word)}
              ${renderExample(word)}
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">Không có từ nào khớp bộ lọc hiện tại.</div>`;

  elements.contentArea.innerHTML = `
    ${renderStats(level, words)}
    <div class="resource-strip">
      <span>Trang ${state.wordPage}/${Math.max(1, Math.ceil(words.length / wordsPerPage))} · hiển thị ${pagedWords.length}/${words.length} từ trong bộ lọc</span>
    </div>
    <div class="word-grid">${cards}</div>
    ${renderPagination("words", state.wordPage, words.length, wordsPerPage)}
  `;
}

function renderFlashcards() {
  const level = currentLevel();
  const deck = filteredWords(level);
  if (!deck.length) {
    elements.contentArea.innerHTML = `${renderStats(level, deck)}<div class="empty-state">Không có flashcard nào khớp bộ lọc hiện tại.</div>`;
    return;
  }
  if (flashQuizMatches()) {
    renderFlashQuiz(level, deck);
    return;
  }

  state.flashIndex = wrapIndex(state.flashIndex, deck.length);
  const word = deck[state.flashIndex];
  const known = isKnown(level.id, word);
  const pronounce = `
    <div class="flash-pronounce">
      ${state.flashFlipped ? `<span class="flash-pinyin">${htmlEscape(word.pinyin)}</span>` : ""}
      <button class="speak-button speak-button-small" type="button" data-speak="${htmlEscape(word.hanzi)}" aria-label="Nghe từ ${htmlEscape(word.hanzi)}" title="Nghe từ">
        ${speakerIcon()}
      </button>
    </div>
  `;
  const answer = state.flashFlipped
    ? `
      ${renderMeaning(word, { flash: true })}
      ${renderExample(word, { compact: true })}
    `
    : `<span class="flash-hint">(Nhấn vào thẻ để xem pinyin và nghĩa)</span>`;

  elements.contentArea.innerHTML = `
    <div class="flashcard-layout">
      <section class="deck-panel">
        <h3>${htmlEscape(level.title)} Flashcard</h3>
        <p>${state.flashIndex + 1}/${deck.length} thẻ trong bộ lọc hiện tại.</p>
      </section>

      <article class="flashcard is-clickable" aria-label="Flashcard hiện tại" data-flash-card="flip" role="button" tabindex="0">
        <div class="flashcard-inner">
          <span class="flash-hanzi">${htmlEscape(word.hanzi)}</span>
          ${pronounce}
          ${answer}
        </div>
      </article>

      <section class="flash-actions-panel" aria-label="Điều khiển flashcard">
        <div class="action-row">
          <button class="ghost-button" type="button" data-flash="prev">Trước</button>
          <button class="ghost-button" type="button" data-flash="next">Tiếp</button>
          <button class="ghost-button" type="button" data-flash="random">Trộn</button>
          <button class="mark-button${known ? " active" : ""}" type="button" data-flash="known">${known ? "Đã nhớ" : "Ghi nhớ"}</button>
          <button class="ghost-button" type="button" data-quiz="start">Quiz</button>
        </div>
      </section>
    </div>
  `;
}

function renderWriting() {
  const level = currentLevel();
  const words = filteredWords(level);
  const sourceWords = words.length ? words : level.words;
  const selectedWord = getSelectedWritingWord(sourceWords, level);
  const chars = getChineseChars(selectedWord.hanzi);
  const selectedChar = chars.includes(state.writingChar) ? state.writingChar : chars[0];
  state.writingWord = selectedWord.hanzi;
  state.writingChar = selectedChar;
  persist();
  if (practiceState.char !== selectedChar) {
    resetPracticeState(selectedChar);
  }

  elements.contentArea.innerHTML = `
    <div class="writing-layout">
      <section class="writer-panel">
        <h3>${htmlEscape(selectedWord.hanzi)} · ${htmlEscape(selectedWord.pinyin)}</h3>
        <p class="writer-status" id="writerStatus">Đang chuẩn bị chữ ${htmlEscape(selectedChar)}.</p>
        <div class="action-row">
          ${chars.map((char) => `<button class="char-button${char === selectedChar ? " active" : ""}" type="button" data-char="${htmlEscape(char)}">${htmlEscape(char)}</button>`).join("")}
        </div>
        <div id="writerTarget" class="writer-target" aria-label="Vùng viết theo nét">
          <span class="fallback-char">${htmlEscape(selectedChar)}</span>
        </div>
        <div class="action-row">
          <button class="action-button" type="button" data-writing="animate">Chạy nét</button>
          <button class="ghost-button" type="button" data-writing="quiz">Tập theo nét</button>
        </div>
      </section>

      <section class="practice-panel">
        <div class="practice-header">
          <h3>Ô luyện tay</h3>
          <div class="canvas-toolbar" aria-label="Công cụ ô viết">
            <button class="icon-button" type="button" data-writing="undo" aria-label="Hoàn tác nét vừa viết" title="Hoàn tác">
              ${undoIcon()}
            </button>
            <button class="icon-button" type="button" data-writing="redo" aria-label="Làm lại nét vừa hoàn tác" title="Làm lại">
              ${redoIcon()}
            </button>
          </div>
        </div>
        <p id="practiceStatus" class="practice-status">${htmlEscape(practiceStatusText())}</p>
        <p id="writingWarning" class="writing-warning${practiceState.warning ? " show" : ""}">${htmlEscape(practiceState.warning)}</p>
        <canvas id="practiceCanvas" class="practice-canvas" aria-label="Canvas luyện viết"></canvas>
        <div class="action-row">
          <button class="ghost-button" type="button" data-writing="clear-canvas">Xóa ô viết</button>
          <button class="ghost-button" type="button" data-writing="evaluate-canvas">Kiểm tra nét</button>
        </div>
        <div class="writing-word-list">
          ${sourceWords
            .map((word) => `<button class="char-button${word.hanzi === selectedWord.hanzi ? " active" : ""}" type="button" data-writing-word="${htmlEscape(word.hanzi)}">${htmlEscape(word.hanzi)}</button>`)
            .join("")}
        </div>
      </section>
    </div>
  `;

  requestAnimationFrame(() => {
    setupPracticeCanvas();
    setupWriter(selectedChar);
  });
}

function getSelectedWritingWord(words, level) {
  return words.find((word) => word.hanzi === state.writingWord) || level.words.find((word) => word.hanzi === state.writingWord) || words[0] || level.words[0];
}

function getChineseChars(text) {
  return Array.from(text).filter((char) => /[\u3400-\u9fff]/.test(char));
}

function resetPracticeState(char = state.writingChar) {
  practiceState.char = char || "";
  practiceState.strokes = [];
  practiceState.redoStack = [];
  practiceState.activeStroke = null;
  practiceState.drawing = false;
  practiceState.quizActive = false;
  practiceState.completed = false;
  practiceState.expectedStrokeCount = estimateStrokeCount(char);
  practiceState.warning = "";
}

function practiceStatusText() {
  if (!practiceState.char) return "Chọn một chữ để bắt đầu luyện viết.";
  if (practiceState.completed) return "Đã hoàn thành. Nét đúng màu đen, nét cần sửa màu đỏ.";
  if (practiceState.quizActive) {
    const expected = practiceState.expectedStrokeCount || estimateStrokeCount(practiceState.char);
    return `Đang tập theo nét: ${practiceState.strokes.length}/${expected} nét.`;
  }
  return "Viết vào ô để luyện tay. Bấm Tập theo nét để được đánh giá nét.";
}

function updatePracticeStatus(text = practiceStatusText()) {
  const status = document.querySelector("#practiceStatus");
  if (status) status.textContent = text;
}

function setPracticeWarning(text) {
  practiceState.warning = text;
  const warning = document.querySelector("#writingWarning");
  if (!warning) return;
  warning.textContent = text;
  warning.classList.toggle("show", Boolean(text));
}

function hasUnfinishedWriting() {
  return state.tab === "writing" && practiceState.strokes.length > 0 && !practiceState.completed;
}

function guardWritingSwitch() {
  if (!hasUnfinishedWriting()) return true;
  setPracticeWarning("Bạn chưa hoàn thành chữ này");
  updatePracticeStatus("Hoàn thành hoặc xóa ô viết trước khi đổi chữ.");
  return false;
}

function estimateStrokeCount(char) {
  const knownCounts = {
    一: 1,
    二: 2,
    三: 3,
    十: 2,
    人: 2,
    大: 3,
    小: 3,
    口: 3,
    中: 4,
    不: 4,
    月: 4,
    日: 4,
    水: 4,
    火: 4,
    木: 4,
    天: 4,
    你: 7,
    我: 7,
    他: 5,
    她: 6,
    好: 6,
    爱: 10,
    学: 8,
    习: 3,
    语: 9,
    汉: 5
  };
  if (knownCounts[char]) return knownCounts[char];
  return 8;
}

function loadExpectedStrokeCount(char) {
  practiceState.expectedStrokeCount = estimateStrokeCount(char);
  if (!window.HanziWriter || typeof window.HanziWriter.loadCharacterData !== "function") {
    updatePracticeStatus();
    return;
  }
  window.HanziWriter.loadCharacterData(char)
    .then((data) => {
      if (practiceState.char !== char || !Array.isArray(data?.strokes)) return;
      practiceState.expectedStrokeCount = data.strokes.length || practiceState.expectedStrokeCount;
      updatePracticeStatus();
    })
    .catch(() => updatePracticeStatus());
}

function startPracticeQuizMode() {
  const char = state.writingChar || practiceState.char;
  resetPracticeState(char);
  practiceState.quizActive = true;
  loadExpectedStrokeCount(char);
  redrawPracticeCanvas();
  setPracticeWarning("");
  updatePracticeStatus("Đang tập theo nét. Viết từng nét trong ô luyện tay.");
}

function clearPracticeCanvas() {
  const wasQuizActive = practiceState.quizActive;
  const char = practiceState.char || state.writingChar;
  resetPracticeState(char);
  practiceState.quizActive = wasQuizActive;
  loadExpectedStrokeCount(char);
  redrawPracticeCanvas();
  setPracticeWarning("");
  updatePracticeStatus();
}

function undoPracticeStroke() {
  if (!practiceState.strokes.length) return;
  practiceState.redoStack.push(practiceState.strokes.pop());
  practiceState.completed = false;
  redrawPracticeCanvas();
  setPracticeWarning("");
  updatePracticeStatus();
}

function redoPracticeStroke() {
  if (!practiceState.redoStack.length) return;
  practiceState.strokes.push(practiceState.redoStack.pop());
  if (practiceState.quizActive) evaluatePracticeCompletion();
  redrawPracticeCanvas();
  updatePracticeStatus();
}

function strokeLength(stroke) {
  return stroke.points.reduce((total, point, index, points) => {
    if (index === 0) return total;
    const previous = points[index - 1];
    return total + Math.hypot(point.x - previous.x, point.y - previous.y);
  }, 0);
}

function classifyPracticeStroke(stroke, index) {
  const expected = practiceState.expectedStrokeCount || estimateStrokeCount(practiceState.char);
  const longEnough = stroke.points.length >= 2 && strokeLength(stroke) >= 18;
  return longEnough && index < expected ? "correct" : "wrong";
}

function evaluatePracticeCompletion(force = false) {
  const expected = practiceState.expectedStrokeCount || estimateStrokeCount(practiceState.char);
  practiceState.strokes.forEach((stroke, index) => {
    stroke.result = classifyPracticeStroke(stroke, index);
    stroke.color = stroke.result === "correct" ? "#172124" : "#dc2626";
  });

  const correct = practiceState.strokes.filter((stroke) => stroke.result === "correct").length;
  if (practiceState.strokes.length >= expected || force) {
    practiceState.completed = practiceState.strokes.length >= expected && correct >= Math.min(expected, practiceState.strokes.length);
    setPracticeWarning(practiceState.completed ? "" : "Bạn chưa hoàn thành chữ này");
    updatePracticeStatus(`Đã kiểm tra: ${correct}/${expected} nét hợp lệ.`);
  } else {
    practiceState.completed = false;
    updatePracticeStatus(`Bạn cần viết thêm ${expected - practiceState.strokes.length} nét.`);
  }
}

function drawPracticeStroke(ctx, stroke) {
  if (!stroke?.points?.length) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = stroke.color || "#172124";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (const point of stroke.points.slice(1)) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}

function redrawPracticeCanvas() {
  const canvas = document.querySelector("#practiceCanvas");
  if (!canvas) return;
  const box = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, box.width, box.height);
  practiceState.strokes.forEach((stroke) => drawPracticeStroke(ctx, stroke));
  if (practiceState.activeStroke) drawPracticeStroke(ctx, practiceState.activeStroke);
}

function renderDialogues() {
  const level = currentLevel();
  const dialogues = filteredDialogues(level);
  state.dialoguePage = clampPage(state.dialoguePage, dialogues.length, dialoguesPerPage);
  const pagedDialogues = pageSlice(dialogues, state.dialoguePage, dialoguesPerPage);
  const allTopics = Array.from(new Set(level.dialogues.map((dialogue) => dialogue.topic))).sort((a, b) => a.localeCompare(b));
  if (state.dialogueTopic !== "all" && !allTopics.includes(state.dialogueTopic)) {
    state.dialogueTopic = "all";
    state.dialoguePage = 1;
    persist();
  }
  const topicButtons = [
    `<button class="topic-filter${state.dialogueTopic === "all" ? " active" : ""}" type="button" data-dialogue-topic="all">Tất cả</button>`,
    ...allTopics.map(
      (topic) =>
        `<button class="topic-filter${state.dialogueTopic === topic ? " active" : ""}" type="button" data-dialogue-topic="${htmlEscape(topic)}">${htmlEscape(topic)}</button>`
    )
  ].join("");
  const cards = pagedDialogues.length
    ? pagedDialogues
        .map((dialogue) => {
          const lines = dialogue.lines
            .map(
              ([speaker, zh, pinyin, vi]) => `
                <div class="dialogue-line">
                  <span class="speaker">${htmlEscape(speaker)}</span>
                  <span class="line-text">
                    <strong>${htmlEscape(zh)}</strong>
                    <span>${htmlEscape(pinyin)}</span>
                    <small>${htmlEscape(vi)}</small>
                  </span>
                  <button class="speak-button" type="button" data-speak="${htmlEscape(zh)}" aria-label="Nghe câu" title="Nghe câu">
                    ${speakerIcon()}
                  </button>
                </div>
              `
            )
            .join("");
          return `
            <article class="dialogue-card">
              <div class="dialogue-header">
                <div>
                  <h3>${htmlEscape(dialogue.title)}</h3>
                  <span class="dialogue-topic">${htmlEscape(dialogue.topic)}</span>
                </div>
                <a href="${corodomoVideosUrl()}" target="_blank" rel="noreferrer">Corodomo</a>
              </div>
              <div class="line-list">${lines}</div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">Không có hội thoại nào khớp bộ lọc hiện tại.</div>`;

  elements.contentArea.innerHTML = `
    <div class="resource-strip">
      <span>${htmlEscape(level.title)} · ${dialogues.length}/${level.dialogues.length} hội thoại riêng theo cấp · trang ${state.dialoguePage}/${Math.max(1, Math.ceil(dialogues.length / dialoguesPerPage))}</span>
      <a href="${corodomoVideosUrl()}" target="_blank" rel="noreferrer">
        Xem thêm video hội thoại trên Corodomo
      </a>
    </div>
    <div class="topic-filter-row" aria-label="Chọn chủ đề hội thoại">${topicButtons}</div>
    <div class="dialogue-grid">${cards}</div>
    ${renderPagination("dialogues", state.dialoguePage, dialogues.length, dialoguesPerPage)}
  `;
}

function renderVideos() {
  const level = currentLevel();
  const allVideos = levelVideos(level);
  const videos = filteredVideos(level);
  const allTopics = Array.from(new Set(allVideos.flatMap((video) => video.tags))).sort((a, b) => tagLabel(a).localeCompare(tagLabel(b)));
  if (state.videoTopic !== "all" && !allTopics.includes(state.videoTopic)) {
    state.videoTopic = "all";
    persist();
  }

  if (!allVideos.length) {
    elements.contentArea.innerHTML = `
      <div class="resource-strip">
        <span>${htmlEscape(level.title)} · chưa có video trong bộ dữ liệu nội bộ</span>
        <a href="${corodomoVideosUrl()}" target="_blank" rel="noreferrer">Mở Corodomo</a>
      </div>
    `;
    return;
  }

  const selected = videos.find((video) => video.id === state.videoId) || videos[0] || allVideos[0];
  if (selected && state.videoId !== selected.id) {
    state.videoId = selected.id;
    persist();
  }

  const topicButtons = [
    `<button class="topic-filter${state.videoTopic === "all" ? " active" : ""}" type="button" data-video-topic="all">Tất cả</button>`,
    ...allTopics.map(
      (topic) =>
        `<button class="topic-filter${state.videoTopic === topic ? " active" : ""}" type="button" data-video-topic="${htmlEscape(topic)}">${htmlEscape(tagLabel(topic))}</button>`
    )
  ].join("");

  const captions = videoStudyLines(selected, level)
    .map(
      ([zh, pinyin, vi], index) => `
        <div class="video-caption-line">
          <span class="caption-index">${index + 1}</span>
          <span class="caption-text">
            <strong>${htmlEscape(zh)}</strong>
            <span>${htmlEscape(pinyin)}</span>
            <small>${htmlEscape(vi)}</small>
          </span>
          <button class="speak-button speak-button-small" type="button" data-speak="${htmlEscape(zh)}" aria-label="Nghe phụ đề" title="Nghe phụ đề">
            ${speakerIcon()}
          </button>
        </div>
      `
    )
    .join("");

  const cards = videos.length
    ? videos
        .map((video) => {
          const active = video.id === selected.id ? " active" : "";
          const tags = video.tags.map((tag) => `<span class="dialogue-topic">${htmlEscape(tagLabel(tag))}</span>`).join("");
          return `
            <article class="video-card${active}">
              <button class="video-card-button" type="button" data-video-id="${htmlEscape(video.id)}" aria-label="Phát video ${htmlEscape(video.title)}">
                <span class="video-thumb">
                  <img src="${htmlEscape(video.image)}" alt="" loading="lazy" />
                  <span class="video-duration">${formatDuration(video.duration)}</span>
                </span>
                <span class="video-card-body">
                  <strong>${htmlEscape(video.title)}</strong>
                  <span class="video-meta">${formatCompactNumber(video.views)} lượt xem · ${htmlEscape(video.createdAt || "")}</span>
                  <span class="video-tags">${tags}</span>
                </span>
              </button>
              <a href="${corodomoStartUrl(video)}" target="_blank" rel="noreferrer">Corodomo</a>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">Không có video nào khớp bộ lọc hiện tại.</div>`;

  elements.contentArea.innerHTML = `
    <div class="resource-strip">
      <span>${htmlEscape(level.title)} · ${videos.length}/${allVideos.length} video HSK từ Corodomo/YouTube</span>
      <a href="${corodomoVideosUrl()}" target="_blank" rel="noreferrer">Xem thư viện Corodomo</a>
    </div>

    <section class="video-stage" aria-label="Video đang chọn">
      <div class="video-player">
        <iframe
          src="${youtubeEmbedUrl(selected.youtubeId)}"
          title="${htmlEscape(selected.title)}"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
      <aside class="video-caption-panel">
        <div class="dialogue-header">
          <div>
            <h3>${htmlEscape(selected.title)}</h3>
            <span class="dialogue-topic">${htmlEscape(level.title)}</span>
          </div>
          <a href="${youtubeWatchUrl(selected.youtubeId)}" target="_blank" rel="noreferrer">YouTube</a>
        </div>
        <div class="video-caption-list">${captions}</div>
      </aside>
    </section>

    <div class="topic-filter-row" aria-label="Chọn nhóm video">${topicButtons}</div>
    <div class="video-grid">${cards}</div>
  `;
}

function renderGrammar() {
  const level = currentLevel();
  const items = filteredGrammar(level);
  const answers = state.grammarAnswers || {};
  const cards = items.length
    ? items
        .map((item) => {
          const examples = item.examples
            .map(
              ([zh, pinyin, vi]) => `
                <div class="grammar-example">
                  <div class="example-line">
                    <strong>${htmlEscape(zh)}</strong>
                    <button class="speak-button speak-button-small" type="button" data-speak="${htmlEscape(zh)}" aria-label="Nghe ví dụ ngữ pháp" title="Nghe ví dụ">
                      ${speakerIcon()}
                    </button>
                  </div>
                  <span>${htmlEscape(pinyin)}</span>
                  <small>${htmlEscape(vi)}</small>
                </div>
              `
            )
            .join("");
          return `
            <article class="grammar-card">
              <div class="dialogue-header">
                <div>
                  <h3>${htmlEscape(item.title)}</h3>
                  <code>${htmlEscape(item.structure)}</code>
                </div>
                <span class="dialogue-topic">${htmlEscape(level.title)}</span>
              </div>
              <p>${htmlEscape(item.note)}</p>
              <div class="grammar-example-list">${examples}</div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">Không có ngữ pháp nào khớp bộ lọc hiện tại.</div>`;

  const quizItems = items;
  const quiz = quizItems.length
    ? quizItems
        .map((item, index) => {
          const selected = answers[item.id];
          const choices = item.quiz.options
            .map((choice, choiceIndex) => {
              const selectedClass = selected === choiceIndex ? " selected" : "";
              const resultClass = state.grammarChecked ? (choiceIndex === item.quiz.answer ? " correct" : selected === choiceIndex ? " wrong" : "") : "";
              return `
                <button class="quiz-choice${selectedClass}${resultClass}" type="button" data-grammar="select" data-grammar-id="${htmlEscape(item.id)}" data-choice-index="${choiceIndex}">
                  ${htmlEscape(choice)}
                </button>
              `;
            })
            .join("");
          return `
            <article class="grammar-quiz-item">
              <span class="quiz-count">Câu ${index + 1}</span>
              <strong>${htmlEscape(item.quiz.question)}</strong>
              <div class="quiz-options">${choices}</div>
            </article>
          `;
        })
        .join("")
    : "";
  const score = quizItems.reduce((total, item) => total + (answers[item.id] === item.quiz.answer ? 1 : 0), 0);
  const status = state.grammarChecked ? `Kết quả: ${score}/${quizItems.length} câu đúng.` : `Đã chọn ${Object.keys(answers).filter((id) => quizItems.some((item) => item.id === id)).length}/${quizItems.length} câu.`;

  elements.contentArea.innerHTML = `
    <div class="resource-strip">
      <span>${htmlEscape(level.title)} · ${items.length}/${levelGrammar(level).length} cấu trúc ngữ pháp</span>
      <span class="stat-pill">Quiz theo cấp HSK hiện tại</span>
    </div>
    <div class="grammar-grid">${cards}</div>
    <section class="grammar-quiz-panel">
      <div class="dialogue-header">
        <div>
          <h3>Quiz ngữ pháp ${htmlEscape(level.title)}</h3>
          <p>${htmlEscape(status)}</p>
        </div>
        <div class="action-row">
          <button class="action-button" type="button" data-grammar="check">Kiểm tra</button>
          <button class="ghost-button" type="button" data-grammar="reset">Làm lại</button>
        </div>
      </div>
      <div class="grammar-quiz-list">${quiz || `<div class="empty-state">Không có câu hỏi quiz trong bộ lọc hiện tại.</div>`}</div>
    </section>
  `;
}

function renderTranslate() {
  const targetLabel = translationState.target === "en" ? "Anh" : "Việt";
  const hasSource = Boolean(translationState.source.trim());
  const hasResult = Boolean(translationState.result.trim());
  elements.contentArea.innerHTML = `
    <section class="translate-panel google-translate-panel" aria-label="Công cụ dịch">
      <div class="translate-mode-row" role="tablist" aria-label="Kiểu dịch">
        <button class="translate-mode-button${translationState.mode === "text" ? " active" : ""}" type="button" data-translate="mode" data-mode="text" role="tab" aria-selected="${translationState.mode === "text"}">
          ${translateToolIcon("text")}
          <span>Văn bản</span>
        </button>
        <button class="translate-mode-button${translationState.mode === "image" ? " active" : ""}" type="button" data-translate="mode" data-mode="image" role="tab" aria-selected="${translationState.mode === "image"}">
          ${translateToolIcon("image")}
          <span>Hình ảnh</span>
        </button>
        <button class="translate-mode-button" type="button" disabled>
          ${translateToolIcon("file")}
          <span>Tài liệu</span>
        </button>
        <button class="translate-mode-button" type="button" disabled>
          ${translateToolIcon("web")}
          <span>Trang web</span>
        </button>
      </div>

      <div class="translate-language-row">
        <div class="language-tabs" aria-label="Ngôn ngữ nguồn">
          <button class="language-tab active" type="button">Phát hiện ngôn ngữ</button>
          <button class="language-tab" type="button" disabled>Anh</button>
          <button class="language-tab" type="button" disabled>Việt</button>
          <button class="language-tab" type="button" disabled>Pháp</button>
          <button class="language-more" type="button" disabled aria-label="Thêm ngôn ngữ nguồn">⌄</button>
        </div>
        <button class="translate-swap-button" type="button" data-translate="swap" aria-label="Đổi chiều dịch" title="Đổi chiều dịch">
          ${translateToolIcon("swap")}
        </button>
        <div class="language-tabs target-tabs" aria-label="Ngôn ngữ đích">
          <button class="language-tab${translationState.target === "vi" ? " active" : ""}" type="button" data-translate="target" data-target="vi">Việt</button>
          <button class="language-tab${translationState.target === "en" ? " active" : ""}" type="button" data-translate="target" data-target="en">Anh</button>
          <button class="language-tab" type="button" disabled>Trung (Giản thể)</button>
          <button class="language-more" type="button" disabled aria-label="Thêm ngôn ngữ đích">⌄</button>
        </div>
      </div>

      <div class="translate-board">
        <article class="translate-card translate-source-card">
          <div class="translate-card-body">
            <textarea id="translateSource" aria-label="Nhập tiếng Trung" placeholder="Nhập chữ Trung cần dịch...">${htmlEscape(translationState.source)}</textarea>
            <button class="translate-clear-button${hasSource ? " show" : ""}" type="button" data-translate="clear" aria-label="Xóa nội dung" title="Xóa">
              ${translateToolIcon("close")}
            </button>
            <div class="image-upload-pane${translationState.mode === "image" ? " show" : ""}">
              <label class="upload-dropzone">
                <input id="translateImage" type="file" accept="image/*" />
                ${translateToolIcon("image")}
                <span>Upload ảnh</span>
              </label>
              <p class="image-name">${htmlEscape(translationState.imageName)}</p>
              <p id="translateExtracted">${translationState.extracted ? htmlEscape(translationState.extracted) : ""}</p>
            </div>
          </div>
          <div class="translate-card-footer">
            <button class="translate-round-button" type="button" data-translate="speak-source" aria-label="Nghe nội dung nguồn" title="Nghe">
              ${translateToolIcon("mic")}
            </button>
            <button class="translate-round-button primary" type="button" data-translate="text" aria-label="Dịch" title="Dịch">
              ${translateToolIcon("edit")}
            </button>
          </div>
        </article>

        <article class="translate-card translate-result-card">
          <div class="translate-card-body">
            <h3 class="${hasResult ? "" : "empty"}">${hasResult ? htmlEscape(targetLabel) : ""}</h3>
            <p id="translateResult" class="${hasResult ? "" : "placeholder"}">${hasResult ? htmlEscape(translationState.result) : "Bản dịch"}</p>
          </div>
          <div class="translate-card-footer">
            <button class="translate-round-button" type="button" data-translate="speak-result" aria-label="Nghe bản dịch" title="Nghe">
              ${translateToolIcon("mic")}
            </button>
          </div>
        </article>
      </div>

      <div class="translate-feedback-row">
        <p id="translateStatus" class="translate-status">${htmlEscape(translationState.status)}</p>
        <p id="translateError" class="message-error${translationState.error ? " show" : ""}">${htmlEscape(translationState.error)}</p>
        <span>Gửi ý kiến phản hồi</span>
      </div>
    </section>
  `;
}

function setTranslateStatus({ status = translationState.status, error = translationState.error, result = translationState.result, extracted = translationState.extracted } = {}) {
  translationState.status = status;
  translationState.error = error;
  translationState.result = result;
  translationState.extracted = extracted;
  const statusElement = document.querySelector("#translateStatus");
  const errorElement = document.querySelector("#translateError");
  const resultElement = document.querySelector("#translateResult");
  const extractedElement = document.querySelector("#translateExtracted");
  if (statusElement) statusElement.textContent = status;
  if (errorElement) {
    errorElement.textContent = error;
    errorElement.classList.toggle("show", Boolean(error));
  }
  if (resultElement) {
    resultElement.textContent = result || "Bản dịch";
    resultElement.classList.toggle("placeholder", !result);
  }
  const resultTitle = document.querySelector(".translate-result-card h3");
  if (resultTitle) {
    resultTitle.textContent = result ? (translationState.target === "en" ? "Anh" : "Việt") : "";
    resultTitle.classList.toggle("empty", !result);
  }
  if (extractedElement) extractedElement.textContent = extracted || "";
}

async function translateChineseText(text = translationState.source, target = translationState.target) {
  const source = text.trim();
  if (!source) {
    setTranslateStatus({ error: "Vui lòng nhập tiếng Trung hoặc upload ảnh trước khi dịch.", status: "" });
    return;
  }
  setTranslateStatus({ status: "Đang dịch...", error: "" });
  try {
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "zh-CN");
    url.searchParams.set("tl", target);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", source);
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("translate failed");
    const data = await response.json();
    const translated = (data?.[0] || []).map((part) => part?.[0] || "").join("").trim();
    if (!translated) throw new Error("empty translation");
    setTranslateStatus({ status: "Dịch xong.", result: translated, error: "" });
  } catch {
    setTranslateStatus({
      status: "",
      error: "Không dịch được lúc này. Vui lòng kiểm tra mạng hoặc thử lại sau."
    });
  }
}

function loadTesseractScript() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (tesseractScriptLoading) return tesseractScriptLoading;
  tesseractScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.onload = () => resolve(window.Tesseract);
    script.onerror = () => reject(new Error("tesseract load failed"));
    document.head.appendChild(script);
  });
  return tesseractScriptLoading;
}

async function translateImageFile(file) {
  if (!file) return;
  translationState.mode = "image";
  translationState.imageName = file.name;
  setTranslateStatus({ status: "Đang tải OCR...", error: "", extracted: "", result: "" });
  try {
    const Tesseract = await loadTesseractScript();
    setTranslateStatus({ status: "Đang nhận diện chữ trong ảnh..." });
    const result = await Tesseract.recognize(file, "chi_sim+eng", {
      logger(message) {
        if (message.status === "recognizing text") {
          const progress = Math.round((message.progress || 0) * 100);
          setTranslateStatus({ status: `Đang OCR ảnh... ${progress}%` });
        }
      }
    });
    const text = (result?.data?.text || "").trim();
    if (!text) throw new Error("empty ocr");
    translationState.source = text;
    const sourceInput = document.querySelector("#translateSource");
    if (sourceInput) sourceInput.value = text;
    setTranslateStatus({ status: "OCR xong, đang dịch...", extracted: text, error: "" });
    await translateChineseText(text, translationState.target);
  } catch {
    setTranslateStatus({
      status: "",
      error: "Không nhận diện được ảnh. Hãy thử ảnh rõ hơn hoặc nhập text trực tiếp."
    });
  }
}

function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function corodomoVideosUrl() {
  return "https://corodomo.com/en/videos?lang=zh-CN";
}

function corodomoStartUrl(video) {
  return `https://corodomo.com/en/videos/start/${encodeURIComponent(video.id)}`;
}

function youtubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

function youtubeEmbedUrl(videoId) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    cc_load_policy: "1",
    cc_lang_pref: "zh-Hans"
  });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

function formatDuration(seconds) {
  const total = Number(seconds) || 0;
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

function formatCompactNumber(value) {
  const number = Number(value) || 0;
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 1 : 1).replace(/\.0$/, "")}K`;
  return String(number);
}

function tagLabel(tag) {
  const labels = {
    ai: "AI",
    anime: "Hoạt hình",
    beginner: "Beginner",
    business: "Công việc",
    culture: "Văn hóa",
    film: "Phim",
    motivation: "Tư duy",
    news: "Tin tức",
    other: "Khác",
    podcast: "Podcast"
  };
  return labels[tag] || tag;
}

function videoStudyLines(video, level) {
  const tag = video.tags.find((item) => item !== "beginner") || video.tags[0] || "other";
  if (level.id <= 2) {
    return [
      ["你好，我们今天一起学习中文。", "Nǐ hǎo, wǒmen jīntiān yìqǐ xuéxí Zhōngwén.", "Xin chào, hôm nay chúng ta cùng học tiếng Trung."],
      ["这个视频有很多简单的句子。", "Zhège shìpín yǒu hěn duō jiǎndān de jùzi.", "Video này có nhiều câu đơn giản."],
      ["请听一遍，然后跟着说。", "Qǐng tīng yí biàn, ránhòu gēnzhe shuō.", "Hãy nghe một lần, sau đó nói theo."]
    ];
  }

  const templates = {
    ai: [
      ["人工智能正在改变我们的学习方式。", "Réngōng zhìnéng zhèngzài gǎibiàn wǒmen de xuéxí fāngshì.", "Trí tuệ nhân tạo đang thay đổi cách chúng ta học."],
      ["我们需要判断信息是否可靠。", "Wǒmen xūyào pànduàn xìnxī shìfǒu kěkào.", "Chúng ta cần đánh giá thông tin có đáng tin cậy hay không."],
      ["新技术带来机会，也带来挑战。", "Xīn jìshù dàilái jīhuì, yě dàilái tiǎozhàn.", "Công nghệ mới mang lại cơ hội và cả thách thức."]
    ],
    anime: [
      ["故事里的角色正在解决一个小问题。", "Gùshi lǐ de juésè zhèngzài jiějué yí ge xiǎo wèntí.", "Nhân vật trong câu chuyện đang giải quyết một vấn đề nhỏ."],
      ["他们先商量办法，然后一起行动。", "Tāmen xiān shāngliang bànfǎ, ránhòu yìqǐ xíngdòng.", "Họ bàn cách trước rồi cùng hành động."],
      ["这样的内容适合反复听和模仿。", "Zhèyàng de nèiróng shìhé fǎnfù tīng hé mófǎng.", "Nội dung như vậy phù hợp để nghe lặp lại và bắt chước."]
    ],
    business: [
      ["我们先确认目标、时间和负责人。", "Wǒmen xiān quèrèn mùbiāo, shíjiān hé fùzérén.", "Trước tiên chúng ta xác nhận mục tiêu, thời gian và người phụ trách."],
      ["如果条件有变化，请及时通知客户。", "Rúguǒ tiáojiàn yǒu biànhuà, qǐng jíshí tōngzhī kèhù.", "Nếu điều kiện thay đổi, vui lòng báo kịp thời cho khách hàng."],
      ["会议结束后，我会整理重点。", "Huìyì jiéshù hòu, wǒ huì zhěnglǐ zhòngdiǎn.", "Sau khi cuộc họp kết thúc, tôi sẽ tổng hợp ý chính."]
    ],
    culture: [
      ["这个故事和中国文化有密切关系。", "Zhège gùshi hé Zhōngguó wénhuà yǒu mìqiè guānxi.", "Câu chuyện này có liên hệ mật thiết với văn hóa Trung Quốc."],
      ["理解背景以后，句子的意思会更清楚。", "Lǐjiě bèijǐng yǐhòu, jùzi de yìsi huì gèng qīngchu.", "Sau khi hiểu bối cảnh, nghĩa câu sẽ rõ hơn."],
      ["学习文化也能帮助我们自然表达。", "Xuéxí wénhuà yě néng bāngzhù wǒmen zìrán biǎodá.", "Học văn hóa cũng giúp chúng ta diễn đạt tự nhiên hơn."]
    ],
    film: [
      ["这段对话的语气很自然。", "Zhè duàn duìhuà de yǔqì hěn zìrán.", "Giọng điệu của đoạn hội thoại này rất tự nhiên."],
      ["注意人物之间的反应和停顿。", "Zhùyì rénwù zhījiān de fǎnyìng hé tíngdùn.", "Hãy chú ý phản ứng và khoảng dừng giữa các nhân vật."],
      ["看完以后，可以复述主要情节。", "Kàn wán yǐhòu, kěyǐ fùshù zhǔyào qíngjié.", "Sau khi xem xong, có thể kể lại nội dung chính."]
    ],
    motivation: [
      ["遇到困难的时候，不要马上放弃。", "Yùdào kùnnan de shíhou, búyào mǎshàng fàngqì.", "Khi gặp khó khăn, đừng vội bỏ cuộc."],
      ["保持稳定的练习，比一次学很多更重要。", "Bǎochí wěndìng de liànxí, bǐ yí cì xué hěn duō gèng zhòngyào.", "Duy trì luyện tập đều đặn quan trọng hơn học quá nhiều một lần."],
      ["每天进步一点点，长期会有明显变化。", "Měitiān jìnbù yì diǎndiǎn, chángqī huì yǒu míngxiǎn biànhuà.", "Mỗi ngày tiến bộ một chút, lâu dài sẽ thấy thay đổi rõ rệt."]
    ],
    news: [
      ["今天我们关注一个新的社会话题。", "Jīntiān wǒmen guānzhù yí ge xīn de shèhuì huàtí.", "Hôm nay chúng ta chú ý tới một chủ đề xã hội mới."],
      ["报道中提到原因、影响和后续安排。", "Bàodào zhōng tídào yuányīn, yǐngxiǎng hé hòuxù ānpái.", "Bản tin nhắc tới nguyên nhân, ảnh hưởng và kế hoạch tiếp theo."],
      ["听新闻时，可以先抓关键词。", "Tīng xīnwén shí, kěyǐ xiān zhuā guānjiàncí.", "Khi nghe tin tức, có thể nắm từ khóa trước."]
    ],
    podcast: [
      ["今天的话题和日常生活有关。", "Jīntiān de huàtí hé rìcháng shēnghuó yǒuguān.", "Chủ đề hôm nay liên quan đến đời sống hằng ngày."],
      ["说话人会用例子解释自己的想法。", "Shuōhuàrén huì yòng lìzi jiěshì zìjǐ de xiǎngfǎ.", "Người nói dùng ví dụ để giải thích suy nghĩ của mình."],
      ["你可以暂停视频，跟读关键句。", "Nǐ kěyǐ zàntíng shìpín, gēndú guānjiàn jù.", "Bạn có thể tạm dừng video và đọc theo câu quan trọng."]
    ],
    other: [
      ["先听整体意思，再听细节。", "Xiān tīng zhěngtǐ yìsi, zài tīng xìjié.", "Nghe ý tổng thể trước, rồi nghe chi tiết."],
      ["遇到生词时，可以结合画面理解。", "Yùdào shēngcí shí, kěyǐ jiéhé huàmiàn lǐjiě.", "Khi gặp từ mới, có thể kết hợp hình ảnh để hiểu."],
      ["最后用自己的话复述内容。", "Zuìhòu yòng zìjǐ de huà fùshù nèiróng.", "Cuối cùng dùng lời của mình để kể lại nội dung."]
    ]
  };
  return templates[tag] || templates.other;
}

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

function resetFlashQuiz() {
  flashQuiz = null;
}

function shuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function wordFromKey(words, levelId, key) {
  return words.find((word) => wordKey(levelId, word) === key);
}

function startFlashQuiz(deck = filteredWords(currentLevel())) {
  const level = currentLevel();
  if (!deck.length) return;
  const selectedWords = shuffle(deck).slice(0, Math.min(5, deck.length));
  const fallbackChoices = level.words.length > 1 ? level.words : allWords();
  flashQuiz = {
    levelId: level.id,
    search: state.search,
    index: 0,
    checked: false,
    answers: {},
    items: selectedWords.map((word) => {
      const correctKey = wordKey(level.id, word);
      const wrongPool = shuffle(fallbackChoices.filter((candidate) => wordKey(level.id, candidate) !== correctKey));
      const wrong = wrongPool[0] || word;
      const wrongKey = wordKey(level.id, wrong);
      const choices = shuffle([
        { key: correctKey, label: word.meaning },
        { key: wrongKey, label: wrong.meaning }
      ]);
      return { key: correctKey, choices };
    })
  };
  state.flashFlipped = false;
  persist();
  renderFlashcards();
}

function flashQuizMatches() {
  return flashQuiz && flashQuiz.levelId === state.levelId && flashQuiz.search === state.search && flashQuiz.items.length > 0;
}

function quizScore() {
  if (!flashQuiz) return 0;
  return flashQuiz.items.reduce((score, item) => score + (flashQuiz.answers[item.key] === item.key ? 1 : 0), 0);
}

function handleQuizCommand(button) {
  const command = button.dataset.quiz;
  const level = currentLevel();
  const deck = filteredWords(level);
  if (command === "start") {
    startFlashQuiz(deck);
    return;
  }
  if (!flashQuizMatches()) return;

  if (command === "card") {
    resetFlashQuiz();
    renderFlashcards();
    return;
  }
  if (command === "select") {
    flashQuiz.answers[button.dataset.quizKey] = button.dataset.choiceKey;
    flashQuiz.checked = false;
  }
  if (command === "prev") {
    flashQuiz.index = wrapIndex(flashQuiz.index - 1, flashQuiz.items.length);
  }
  if (command === "next") {
    flashQuiz.index = wrapIndex(flashQuiz.index + 1, flashQuiz.items.length);
  }
  if (command === "check") {
    flashQuiz.checked = true;
  }
  renderFlashcards();
}

function renderFlashQuiz(level, deck) {
  if (!flashQuizMatches()) return;

  flashQuiz.index = wrapIndex(flashQuiz.index, flashQuiz.items.length);
  const item = flashQuiz.items[flashQuiz.index];
  const word = wordFromKey(level.words, level.id, item.key) || wordFromKey(deck, level.id, item.key) || deck[0];
  const selected = flashQuiz.answers[item.key];
  const answered = Object.keys(flashQuiz.answers).length;
  const scoreText = flashQuiz.checked ? `Kết quả: ${quizScore()}/${flashQuiz.items.length} câu đúng.` : `Đã chọn ${answered}/${flashQuiz.items.length} câu.`;
  const choices = item.choices
    .map((choice) => {
      const selectedClass = selected === choice.key ? " selected" : "";
      const resultClass = flashQuiz.checked ? (choice.key === item.key ? " correct" : selected === choice.key ? " wrong" : "") : "";
      return `
        <button class="quiz-choice${selectedClass}${resultClass}" type="button" data-quiz="select" data-quiz-key="${htmlEscape(item.key)}" data-choice-key="${htmlEscape(choice.key)}">
          ${htmlEscape(choice.label)}
        </button>
      `;
    })
    .join("");

  elements.contentArea.innerHTML = `
    <div class="flashcard-layout">
      <section class="deck-panel">
        <h3>${htmlEscape(level.title)} Quiz</h3>
        <p>Câu ${flashQuiz.index + 1}/${flashQuiz.items.length}. Chọn nghĩa đúng của chữ Hán.</p>
      </section>

      <article class="quiz-card" aria-label="Câu hỏi quiz hiện tại">
        <span class="quiz-count">Câu ${flashQuiz.index + 1}</span>
        <strong class="quiz-hanzi">${htmlEscape(word.hanzi)}</strong>
        <span class="quiz-pinyin">${htmlEscape(word.pinyin)}</span>
        <div class="quiz-options">${choices}</div>
      </article>

      <section class="flash-actions-panel" aria-label="Điều khiển quiz">
        <div class="action-row">
          <button class="ghost-button" type="button" data-quiz="prev">Trước</button>
          <button class="ghost-button" type="button" data-quiz="next">Sau</button>
          <button class="action-button" type="button" data-quiz="check">Kiểm tra</button>
          <button class="ghost-button" type="button" data-quiz="card">Thẻ</button>
        </div>
        <p class="quiz-status">${htmlEscape(scoreText)}</p>
      </section>
    </div>
  `;
}

function renderContent() {
  if (state.tab === "flashcards") {
    renderFlashcards();
  } else if (state.tab === "writing") {
    renderWriting();
  } else if (state.tab === "dialogues") {
    renderDialogues();
  } else if (state.tab === "videos") {
    renderVideos();
  } else if (state.tab === "grammar") {
    renderGrammar();
  } else if (state.tab === "translate") {
    renderTranslate();
  } else {
    renderWords();
  }
}

function render() {
  const level = currentLevel();
  if (!level) return;
  elements.wordSearch.value = state.search;
  renderNav();
  renderHeader();
  renderOverallProgress();
  renderTabs();
  renderContent();
}

function setLevel(levelId) {
  if (levelId === state.levelId) return;
  resetFlashQuiz();
  resetPracticeState("");
  state.levelId = levelId;
  state.wordPage = 1;
  state.dialoguePage = 1;
  state.flashIndex = 0;
  state.flashFlipped = false;
  state.dialogueTopic = "all";
  state.videoTopic = "all";
  state.videoId = "";
  state.grammarAnswers = {};
  state.grammarChecked = false;
  state.writingWord = "";
  state.writingChar = "";
  persist();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleFlashCommand(command) {
  const deck = filteredWords(currentLevel());
  if (!deck.length) return;
  if (command === "flip") {
    state.flashFlipped = !state.flashFlipped;
  }
  if (command === "next") {
    state.flashIndex = wrapIndex(state.flashIndex + 1, deck.length);
    state.flashFlipped = false;
  }
  if (command === "prev") {
    state.flashIndex = wrapIndex(state.flashIndex - 1, deck.length);
    state.flashFlipped = false;
  }
  if (command === "random") {
    const next = Math.floor(Math.random() * deck.length);
    state.flashIndex = deck.length > 1 && next === state.flashIndex ? wrapIndex(next + 1, deck.length) : next;
    state.flashFlipped = false;
  }
  if (command === "known") {
    const word = deck[wrapIndex(state.flashIndex, deck.length)];
    toggleKnown(currentLevel().id, word);
  }
  persist();
  render();
}

function handleWritingCommand(command) {
  const status = document.querySelector("#writerStatus");
  if (command === "undo") {
    undoPracticeStroke();
    return;
  }
  if (command === "redo") {
    redoPracticeStroke();
    return;
  }
  if (command === "evaluate-canvas") {
    evaluatePracticeCompletion(true);
    redrawPracticeCanvas();
    return;
  }
  if (command === "clear-canvas") {
    clearPracticeCanvas();
    return;
  }
  if (command === "animate") {
    if (writer && typeof writer.animateCharacter === "function") {
      writer.animateCharacter();
      setWriterStatus("Đang chạy thứ tự nét.");
    } else {
      pulseFallback();
      setWriterStatus("Đang dùng chữ mẫu offline.");
    }
  }
  if (command === "quiz") {
    startPracticeQuizMode();
    if (writer && typeof writer.quiz === "function") {
      if (typeof writer.showCharacter === "function") writer.showCharacter();
      writer.quiz({
        onMistake() {
          setWriterStatus("Nét này chưa đúng, hãy thử lại.");
        },
        onCorrectStroke() {
          setWriterStatus("Đúng nét. Tiếp tục nét kế tiếp.");
        },
        onComplete() {
          practiceState.completed = practiceState.strokes.length === 0 ? true : practiceState.completed;
          setPracticeWarning("");
          updatePracticeStatus();
          setWriterStatus("Hoàn thành một lượt tập theo nét.");
        }
      });
      setWriterStatus("Tập viết theo nét trong khung bên trái.");
    } else {
      pulseFallback();
      setWriterStatus("Chế độ theo nét cần Hanzi Writer online.");
    }
  }
  if (command === "show") {
    if (writer && typeof writer.showCharacter === "function") {
      writer.showCharacter();
      setWriterStatus("Đã hiện chữ mẫu.");
    } else if (status) {
      setWriterStatus("Đang hiện chữ mẫu offline.");
    }
  }
}

function setWriterStatus(text) {
  const status = document.querySelector("#writerStatus");
  if (status) status.textContent = text;
}

function setupWriter(char) {
  const target = document.querySelector("#writerTarget");
  if (!target) return;
  writer = null;
  loadExpectedStrokeCount(char);

  if (window.HanziWriter) {
    createWriter(char);
    return;
  }

  if (writerScriptFailed) {
    setWriterStatus("Offline: dùng chữ mẫu và ô luyện tay.");
    return;
  }

  setWriterStatus("Đang tải Hanzi Writer cho thứ tự nét.");
  if (!writerScriptLoading) {
    writerScriptLoading = true;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hanzi-writer/dist/hanzi-writer.min.js";
    script.async = true;
    script.onload = () => {
      writerScriptLoading = false;
      if (state.tab === "writing") createWriter(state.writingChar);
    };
    script.onerror = () => {
      writerScriptLoading = false;
      writerScriptFailed = true;
      setWriterStatus("Offline: dùng chữ mẫu và ô luyện tay.");
    };
    document.head.appendChild(script);
  }
}

function createWriter(char) {
  const target = document.querySelector("#writerTarget");
  if (!target || !window.HanziWriter) return;

  target.innerHTML = "";
  const size = Math.max(260, Math.min(340, target.clientWidth || 320));
  writer = HanziWriter.create("writerTarget", char, {
    width: size,
    height: size,
    padding: 18,
    showOutline: true,
    showCharacter: false,
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 350,
    drawingWidth: 34,
    radicalColor: "#c2410c"
  });
  setWriterStatus(`Sẵn sàng luyện chữ ${char}.`);
  loadExpectedStrokeCount(char);
}

function pulseFallback() {
  const fallback = document.querySelector(".fallback-char");
  if (!fallback) return;
  fallback.animate(
    [
      { transform: "scale(1)", opacity: 0.65 },
      { transform: "scale(1.05)", opacity: 1 },
      { transform: "scale(1)", opacity: 0.85 }
    ],
    { duration: 520, easing: "ease-out" }
  );
}

function setupPracticeCanvas(clearOnly = false) {
  const canvas = document.querySelector("#practiceCanvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(280, Math.floor(rect.width * dpr));
  canvas.height = Math.max(280, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  if (clearOnly) {
    clearPracticeCanvas();
    return;
  }

  function point(event) {
    const box = canvas.getBoundingClientRect();
    return {
      x: event.clientX - box.left,
      y: event.clientY - box.top
    };
  }

  canvas.onpointerdown = (event) => {
    practiceState.drawing = true;
    practiceState.completed = false;
    practiceState.activeStroke = {
      points: [point(event)],
      color: "#172124",
      result: "pending"
    };
    canvas.setPointerCapture(event.pointerId);
    setPracticeWarning("");
  };

  canvas.onpointermove = (event) => {
    if (!practiceState.drawing || !practiceState.activeStroke) return;
    practiceState.activeStroke.points.push(point(event));
    redrawPracticeCanvas();
  };

  canvas.onpointerup = () => {
    if (!practiceState.drawing || !practiceState.activeStroke) return;
    const stroke = practiceState.activeStroke;
    practiceState.drawing = false;
    practiceState.activeStroke = null;
    if (stroke.points.length > 1) {
      const result = practiceState.quizActive ? classifyPracticeStroke(stroke, practiceState.strokes.length) : "correct";
      stroke.result = result;
      stroke.color = result === "correct" ? "#172124" : "#dc2626";
      practiceState.strokes.push(stroke);
      practiceState.redoStack = [];
      if (practiceState.quizActive) evaluatePracticeCompletion();
      updatePracticeStatus();
    }
    redrawPracticeCanvas();
  };

  canvas.onpointercancel = () => {
    practiceState.drawing = false;
    practiceState.activeStroke = null;
    redrawPracticeCanvas();
  };
  redrawPracticeCanvas();
}

function speakChinese(text) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find((voice) => /zh|Chinese|Mandarin/i.test(`${voice.lang} ${voice.name}`));
  if (zhVoice) utterance.voice = zhVoice;
  utterance.lang = zhVoice ? zhVoice.lang : "zh-CN";
  utterance.rate = 0.82;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

elements.levelNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-level]");
  if (button) setLevel(Number(button.dataset.level));
});

elements.loginForm.addEventListener("submit", handleLogin);

elements.loginFillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const username = button.dataset.loginFill;
    elements.loginUsername.value = username;
    elements.loginPassword.value = defaultAccounts[username] || "";
    setLoginError("");
    elements.loginPassword.focus();
  });
});

elements.logoutButton.addEventListener("click", logout);

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resetFlashQuiz();
    state.tab = button.dataset.tab;
    state.flashFlipped = false;
    persist();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

elements.wordSearch.addEventListener("input", () => {
  resetFlashQuiz();
  state.search = elements.wordSearch.value;
  state.wordPage = 1;
  state.dialoguePage = 1;
  state.flashIndex = 0;
  state.flashFlipped = false;
  state.videoId = "";
  state.grammarAnswers = {};
  state.grammarChecked = false;
  persist();
  renderContent();
});

elements.contentArea.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  const flashCard = event.target.closest("[data-flash-card]");
  if (!button && flashCard) {
    handleFlashCommand(flashCard.dataset.flashCard);
    return;
  }
  if (!button) return;

  if ("markKey" in button.dataset) {
    toggleKnown(Number(button.dataset.levelId), button.dataset.markKey);
    render();
    return;
  }

  if ("flash" in button.dataset) {
    handleFlashCommand(button.dataset.flash);
    return;
  }

  if ("quiz" in button.dataset) {
    handleQuizCommand(button);
    return;
  }

  if ("pageScope" in button.dataset) {
    const scope = button.dataset.pageScope;
    const command = button.dataset.page;
    const key = scope === "dialogues" ? "dialoguePage" : "wordPage";
    const items = scope === "dialogues" ? filteredDialogues(currentLevel()) : filteredWords(currentLevel());
    const perPage = scope === "dialogues" ? dialoguesPerPage : wordsPerPage;
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));
    if (command === "prev") state[key] = clampPage(state[key] - 1, items.length, perPage);
    else if (command === "next") state[key] = clampPage(state[key] + 1, items.length, perPage);
    else state[key] = clampPage(Number(command), items.length, perPage);
    persist();
    renderContent();
    return;
  }

  if ("grammar" in button.dataset) {
    const command = button.dataset.grammar;
    if (command === "select") {
      state.grammarAnswers = { ...(state.grammarAnswers || {}), [button.dataset.grammarId]: Number(button.dataset.choiceIndex) };
      state.grammarChecked = false;
    }
    if (command === "check") state.grammarChecked = true;
    if (command === "reset") {
      state.grammarAnswers = {};
      state.grammarChecked = false;
    }
    persist();
    renderGrammar();
    return;
  }

  if ("translate" in button.dataset) {
    const command = button.dataset.translate;
    if (command === "text") translateChineseText();
    if (command === "mode") {
      translationState.mode = button.dataset.mode || "text";
      translationState.error = "";
      renderTranslate();
    }
    if (command === "target") {
      translationState.target = button.dataset.target || "vi";
      translationState.result = "";
      translationState.error = "";
      renderTranslate();
      if (translationState.source.trim()) translateChineseText();
    }
    if (command === "swap") {
      setTranslateStatus({ status: "", error: "Hiện tại công cụ này hỗ trợ dịch từ tiếng Trung sang tiếng Việt hoặc tiếng Anh." });
    }
    if (command === "speak-source") {
      if (translationState.source.trim()) speakChinese(translationState.source);
      else setTranslateStatus({ status: "", error: "Vui lòng nhập nội dung trước khi nghe." });
    }
    if (command === "speak-result") {
      if (translationState.result.trim()) speakChinese(translationState.result);
      else setTranslateStatus({ status: "", error: "Chưa có bản dịch để nghe." });
    }
    if (command === "clear") {
      translationState.source = "";
      translationState.extracted = "";
      translationState.result = "";
      translationState.status = "";
      translationState.error = "";
      translationState.imageName = "";
      translationState.mode = "text";
      renderTranslate();
    }
    return;
  }

  if ("dialogueTopic" in button.dataset) {
    state.dialogueTopic = button.dataset.dialogueTopic;
    state.dialoguePage = 1;
    persist();
    renderDialogues();
    return;
  }

  if ("videoTopic" in button.dataset) {
    state.videoTopic = button.dataset.videoTopic;
    state.videoId = "";
    persist();
    renderVideos();
    return;
  }

  if ("videoId" in button.dataset) {
    state.videoId = button.dataset.videoId;
    persist();
    renderVideos();
    return;
  }

  if ("char" in button.dataset) {
    if (button.dataset.char !== state.writingChar && !guardWritingSwitch()) return;
    state.writingChar = button.dataset.char;
    persist();
    renderWriting();
    return;
  }

  if ("writingWord" in button.dataset) {
    if (button.dataset.writingWord !== state.writingWord && !guardWritingSwitch()) return;
    state.writingWord = button.dataset.writingWord;
    state.writingChar = "";
    persist();
    renderWriting();
    return;
  }

  if ("writing" in button.dataset) {
    handleWritingCommand(button.dataset.writing);
    return;
  }

  if ("speak" in button.dataset) {
    speakChinese(button.dataset.speak);
  }
});

elements.contentArea.addEventListener("input", (event) => {
  if (event.target.id === "translateSource") {
    translationState.source = event.target.value;
    setTranslateStatus({ error: "" });
  }
});

elements.contentArea.addEventListener("change", (event) => {
  if (event.target.id === "translateTarget") {
    translationState.target = event.target.value;
    return;
  }
  if (event.target.id === "translateImage") {
    translateImageFile(event.target.files?.[0]);
  }
});

elements.contentArea.addEventListener("keydown", (event) => {
  if (event.target.closest("button")) return;
  const flashCard = event.target.closest("[data-flash-card]");
  if (!flashCard) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  handleFlashCommand(flashCard.dataset.flashCard);
});

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (state.tab === "writing") {
      setupPracticeCanvas();
      setupWriter(state.writingChar);
    }
  }, 160);
});

window.addEventListener("storage", (event) => {
  if (event.key !== activeAccountsKey && event.key !== activeAccountKey) return;
  const session = activeSession();
  if (session) {
    showApp(session);
    return;
  }
  showLogin("");
});

window.addEventListener("pagehide", clearCurrentActiveAccount);
window.addEventListener("beforeunload", clearCurrentActiveAccount);
window.addEventListener("pageshow", () => {
  if (readTabSession()) refreshActiveSession();
});

document.addEventListener("visibilitychange", () => {
  if (readTabSession()) refreshActiveSession();
});

window.speechSynthesis?.addEventListener?.("voiceschanged", () => {});

initializeAuth();
