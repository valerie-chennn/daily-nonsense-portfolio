(function () {
  "use strict";

  const data = window.NONSENSE_DATA;
  const screenRoot = document.getElementById("product-screen");
  const stageControls = document.getElementById("stage-controls");
  const navContent = document.getElementById("experience-nav-content");
  const sidebar = document.getElementById("experience-sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const menuButton = document.getElementById("mobile-menu-button");
  const pageLabel = document.getElementById("mobile-page-label");
  const aboutDialog = document.getElementById("about-dialog");
  const productStage = document.querySelector(".product-stage");
  const phoneExhibit = document.querySelector(".phone-exhibit");
  const phoneShell = document.querySelector(".phone-shell");
  const screenMap = new Map(data.screens.map((screen) => [screen.id, screen]));
  const flow = data.screens.map((screen) => screen.id);
  let micTimer = null;
  let chatTimer = null;
  let typingTimer = null;
  let speechRecognition = null;
  let capturedSpeech = "";
  let feedAnimating = false;
  let feedStartY = 0;
  let feedDragY = 0;
  let expressionStartX = 0;
  let expressionDragX = 0;
  let expressionDragging = false;

  const ADJ = [
    "Sleepy", "Curious", "Clueless", "Brave", "Lazy", "Dramatic",
    "Sneaky", "Reckless", "Polite", "Grumpy", "Cheerful", "Confused",
    "Bold", "Gentle", "Chaotic", "Hungry"
  ];
  const NOUN = [
    "Intern", "Diplomat", "Spy", "Accountant", "Witness", "Consultant",
    "Janitor", "CEO", "Penguin", "Lobster", "Toaster", "Astronaut",
    "Pirate", "Professor", "Detective", "Ghost"
  ];

  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function generateName() {
    const roll = Math.random();
    if (roll < 0.1) return randomItem(NOUN);
    if (roll < 0.2) return randomItem(ADJ);
    return `${randomItem(ADJ)} ${randomItem(NOUN)}`;
  }

  const state = {
    screenId: "splash",
    name: "",
    namePlaceholder: generateName(),
    feedIndex: 0,
    mic: "idle",
    hintOpen: false,
    chatPhase: "first-typing",
    userUtterances: [null, null, null],
    npcReplies: [null, null, null],
    replyStep: 0,
    typeMode: false,
    typeDraft: "",
    expressionIndex: 0
  };

  const simulatedUtterances = [
    [
      "Hold on. What happened before you put him up for sale?",
      "Fourteen years is a long time. Why are you selling him now?",
      "Wait—did anyone ask the horse what he wants?"
    ],
    [
      "Carrying everyone for fourteen years sounds like real work.",
      "I understand the food costs, but his work still matters.",
      "He sounds like a teammate, not something you can sell."
    ],
    [
      "Take down the listing and settle this fairly.",
      "Do not sell him. Pay him for the work instead.",
      "Let him choose what happens next."
    ]
  ];

  function displayName() {
    return state.name || state.namePlaceholder;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setSidebar(open) {
    sidebar.classList.toggle("open", open);
    sidebarOverlay.classList.toggle("show", open);
    sidebarOverlay.setAttribute("aria-hidden", String(!open));
    menuButton.setAttribute("aria-expanded", String(open));
  }

  function renderNav() {
    navContent.innerHTML = data.groups.map((group) => {
      const screens = data.screens.filter((screen) => screen.group === group.id);
      return `
        <section class="sidebar-group">
          <h2><span>${escapeHTML(group.index)} /</span>${escapeHTML(group.title)}</h2>
          ${screens.map((screen) => {
            const page = flow.indexOf(screen.id) + 1;
            return `<button type="button" class="sidebar-nav-item" data-go="${screen.id}"><span>${escapeHTML(screen.title)}</span><span>${String(page).padStart(2, "0")}</span></button>`;
          }).join("")}
        </section>`;
    }).join("");
  }

  function setHash(id, replace) {
    const hash = `#screen=${id}`;
    if (window.location.hash === hash) return;
    if (replace) window.history.replaceState(null, "", hash);
    else window.history.pushState(null, "", hash);
  }

  function go(id, options = {}) {
    if (!screenMap.has(id)) id = "splash";
    if (micTimer) window.clearTimeout(micTimer);
    if (chatTimer) window.clearTimeout(chatTimer);
    if (typingTimer) window.clearInterval(typingTimer);
    state.mic = "idle";
    if (id === "chat-context") state.chatPhase = "first-typing";
    if (id === "chat-opening") state.chatPhase = "second-typing";
    if (id.startsWith("reply-")) {
      state.replyStep = 0;
      const turnIndex = Number(id.slice(-1)) - 1;
      if (!state.userUtterances[turnIndex]) {
        state.userUtterances[turnIndex] = randomItem(simulatedUtterances[turnIndex]);
      }
    }
    if (id.startsWith("speak-")) {
      state.typeMode = false;
      state.typeDraft = "";
    }
    const expressionMatch = id.match(/^expression-([1-3])$/);
    if (expressionMatch) state.expressionIndex = Number(expressionMatch[1]) - 1;
    state.screenId = id;
    setHash(id, options.replace);
    render();
    setSidebar(false);
  }

  function next() {
    const index = flow.indexOf(state.screenId);
    if (index >= 0 && index < flow.length - 1) go(flow[index + 1]);
  }

  function highlightText(text, highlights) {
    let result = escapeHTML(text);
    highlights.forEach((phrase) => {
      result = result.replace(escapeHTML(phrase), `<mark>${escapeHTML(phrase)}</mark>`);
    });
    return result;
  }

  function fitPhone() {
    phoneExhibit.style.removeProperty("width");
    phoneExhibit.style.removeProperty("height");
    phoneShell.style.removeProperty("transform");
    productStage.classList.remove("stage-needs-scroll");
  }

  function fitFeedHeadline() {
    screenRoot.querySelectorAll(".news-body h2").forEach((headline) => {
      const lines = headline.querySelectorAll("span");
      if (!lines.length) return;
      lines.forEach((line) => { line.style.fontSize = "32px"; });
      const longest = Math.max(...Array.from(lines, (line) => line.scrollWidth));
      const fontSize = longest > headline.offsetWidth
        ? Math.max(16, Math.floor(32 * (headline.offsetWidth / longest)))
        : 32;
      lines.forEach((line) => { line.style.fontSize = `${fontSize}px`; });
    });
  }

  function renderSplash() {
    return `
      <section class="app-screen splash-screen">
        <div class="splash-lines top"><i></i><i></i></div>
        <div class="splash-center">
          <h2><span>The Daily</span><span>Nonsense</span></h2>
          <div class="splash-ruler"><i></i><b></b><i></i></div>
          <h3>每日胡说</h3>
          <p>边吃瓜，边开口练英语。</p>
        </div>
        <div class="splash-lines bottom"><i></i><i></i></div>
        <button class="screen-hint" type="button" data-next>点击进入</button>
      </section>`;
  }

  function renderOnboarding() {
    return `
      <section class="app-screen onboarding-screen">
        <div class="onboarding-content">
          <p class="micro-kicker">BEFORE YOU SPEAK</p>
          <h2>你的花名</h2>
          <p class="onboarding-copy">它会出现在接下来的群聊里。</p>
          <label class="name-field"><input id="nickname" value="${escapeHTML(state.name)}" placeholder="${escapeHTML(state.namePlaceholder)}" maxlength="30" autocomplete="off" aria-label="花名" /><button type="button" data-random-name aria-label="换一个花名">🎲</button></label>
          <button class="dark-button" type="button" data-start>开始胡说</button>
        </div>
      </section>`;
  }

  function renderFeedStory(item) {
    const isPlayable = item.id === "room-001";
    return `
          <article class="news-card feed-card" style="--feed-bg:${item.bg};--feed-accent:${item.accent};--feed-accent-dark:#1a1a1a;background:${item.bg}" data-feed-card="${escapeHTML(item.id)}">
            <div class="news-rules"><i></i><i></i></div>
            <div class="news-body">
            <div class="news-tags"><span>${escapeHTML(item.tags[0])}</span></div>
            <p class="news-source">${escapeHTML(item.source)}</p>
            <i class="headline-rule"></i>
            <h2>${item.headline.map((line) => `<span>${escapeHTML(line)}</span>`).join("")}</h2>
            <figure><img src="${item.cover}" alt="${escapeHTML(item.headline.join("，"))}" /></figure>
            <div class="statements-section">
              <div class="statements-label"><span>STATEMENTS</span><i></i></div>
              ${item.reactions.map((reaction, index) => `
                ${index ? '<i class="statement-separator"></i>' : ''}
                <div class="statement" style="--statement-color:${index === 0 ? reaction.color : '#1a1a1a'}">
                  <strong style="color:${index === 0 ? reaction.color : '#1a1a1a'}">${escapeHTML(reaction.name)}</strong><p>"${escapeHTML(reaction.en)}"</p><small>${escapeHTML(reaction.zh)}</small>
                </div>`).join("")}
              <div class="news-meta"><span>${escapeHTML(item.views)}人围观</span><i></i><span>${escapeHTML(item.comments)}条评论</span></div>
            </div>
            <button class="join-button" type="button" ${isPlayable ? "data-feed-next" : "disabled aria-disabled=\"true\""}>Join Chat</button>
            <p class="swipe-hint">⌃&nbsp; 上划看下一条</p>
            </div>
          </article>`;
  }

  function renderFeed() {
    const current = data.feed[state.feedIndex] || data.feed[0];
    return `
      <section class="app-screen feed-screen" style="--feed-bg:${current.bg};--feed-header:${current.header};--feed-header-text:${current.headerText};--feed-accent:${current.accent};--feed-accent-dark:#1a1a1a">
        <header class="feed-header"><strong>每日胡说</strong><span>${escapeHTML(displayName().slice(0, 1))}</span></header>
        <div class="feed-container" data-feed-container tabindex="0" aria-label="新闻 Feed，可上下滑动切换话题">
          <div class="feed-track">${data.feed.map(renderFeedStory).join("")}</div>
        </div>
      </section>`;
  }

  function syncFeedPosition({ animate = true, offset = 0 } = {}) {
    const container = screenRoot.querySelector("[data-feed-container]");
    const track = container?.querySelector(".feed-track");
    if (!container || !track) return;
    const cardHeight = container.clientHeight;
    track.querySelectorAll(".feed-card").forEach((card) => { card.style.height = `${cardHeight}px`; });
    track.style.transition = animate ? "transform .3s cubic-bezier(.25,.46,.45,.94)" : "none";
    track.style.transform = `translateY(${-state.feedIndex * cardHeight + offset}px)`;
    phoneExhibit.querySelectorAll(".feed-dots i").forEach((dot, index) => dot.classList.toggle("active", index === state.feedIndex));
    const current = data.feed[state.feedIndex];
    const feedScreen = screenRoot.querySelector(".feed-screen");
    if (feedScreen && current) {
      feedScreen.style.setProperty("--feed-bg", current.bg);
      feedScreen.style.setProperty("--feed-header", current.header);
      feedScreen.style.setProperty("--feed-header-text", current.headerText);
      feedScreen.style.setProperty("--feed-accent", current.accent);
    }
  }

  function stepFeed(direction) {
    if (feedAnimating) return;
    const nextIndex = (state.feedIndex + direction + data.feed.length) % data.feed.length;
    feedAnimating = true;
    state.feedIndex = nextIndex;
    syncFeedPosition({ animate: true });
    window.setTimeout(() => { feedAnimating = false; }, 320);
  }

  function bindFeedInteractions() {
    const container = screenRoot.querySelector("[data-feed-container]");
    if (!container) return;
    let dragging = false;

    container.addEventListener("pointerdown", (event) => {
      if (feedAnimating || event.target.closest("button")) return;
      dragging = true;
      feedStartY = event.clientY;
      feedDragY = 0;
      container.setPointerCapture?.(event.pointerId);
      container.classList.add("dragging");
    });
    container.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      feedDragY = event.clientY - feedStartY;
      syncFeedPosition({ animate: false, offset: feedDragY });
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      container.classList.remove("dragging");
      const threshold = container.clientHeight * .15;
      if (feedDragY < -threshold) stepFeed(1);
      else if (feedDragY > threshold) stepFeed(-1);
      else syncFeedPosition({ animate: true });
      feedDragY = 0;
    };
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    container.addEventListener("wheel", (event) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 30) return;
      stepFeed(event.deltaY > 0 ? 1 : -1);
    }, { passive: false });
    container.addEventListener("keydown", (event) => {
      if (!["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(event.key)) return;
      event.preventDefault();
      stepFeed(event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1);
    });
  }

  function chatHeader() {
    return `<header class="chat-header"><button type="button" data-back aria-label="返回"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg></button><div><strong>${escapeHTML(data.room.groupName)}</strong><span>${escapeHTML(data.room.members)}</span></div><b>LIVE</b></header>`;
  }

  function contextBlock() {
    return `<div class="chat-context"><p>📌 ${escapeHTML(data.room.notice)}</p><p>${escapeHTML(data.room.inviter)}</p><div><i></i><span>You're <strong>${escapeHTML(data.room.role)}</strong></span><i></i></div></div>`;
  }

  function mentionText(value) {
    const placeholder = "__PORTFOLIO_MENTION__";
    const text = String(value || "").replaceAll("@Momo", placeholder);
    return escapeHTML(text).replaceAll(placeholder, `<span class="mention">@${escapeHTML(displayName())}</span>`);
  }

  function typingText(value) {
    const raw = String(value || "");
    const mention = `@${displayName()}`;
    const text = raw.replaceAll("@Momo", mention);
    const parts = text.split(mention);
    const tokens = [];
    parts.forEach((part, index) => {
      if (index > 0) tokens.push({ text: mention, mention: true });
      Array.from(part).forEach((char) => tokens.push({ text: char, mention: false }));
    });
    return tokens.map((token) => `<span class="typing-char${token.mention ? " mention" : ""}">${escapeHTML(token.text)}</span>`).join("");
  }

  function speakerIcon() {
    return `<span class="tts-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg></span>`;
  }

  function speakerColor(message) {
    if (message.speaker === "八戒") return "#1A6A8A";
    if (message.speaker === "白龙马") return "#A05020";
    return message.color;
  }

  function messageHTML(message, kind, delay = 0, variant = "complete") {
    if (kind === "user") {
      return `<div class="user-row animate-in" style="--delay:${delay}ms"><div><strong>你</strong><p>${escapeHTML(message)}</p></div></div>`;
    }
    const typing = variant === "typing";
    const color = speakerColor(message);
    return `<div class="npc-row ${typing ? "npc-row-typing" : "animate-in"}" style="--delay:${delay}ms"><span style="background:${color}">${escapeHTML(message.avatar)}</span><div><strong style="color:${color}">${escapeHTML(message.speaker)}</strong><article class="${typing ? "npc-bubble-typing" : ""}"><p>${typing ? typingText(message.en) : mentionText(message.en)}</p><small>${mentionText(message.zh)}</small>${typing ? "" : speakerIcon()}</article></div></div>`;
  }

  function visibleMessages(untilTurn, includeReplies) {
    const list = [...data.opening.map((message) => ({ kind: "npc", value: message }))];
    for (let index = 0; index < untilTurn; index += 1) {
      if (state.userUtterances[index]) list.push({ kind: "user", value: state.userUtterances[index] });
      if (index < untilTurn - 1 || includeReplies) {
        (state.npcReplies[index] || data.turns[index].replies).forEach((message) => list.push({ kind: "npc", value: message }));
      }
    }
    return list;
  }

  function renderMessages(list, animateLast = 0) {
    return list.map((item, index) => {
      const delay = index >= list.length - animateLast ? (index - (list.length - animateLast)) * 520 : 0;
      return messageHTML(item.value, item.kind, delay);
    }).join("");
  }

  function renderChatContext() {
    const typing = state.chatPhase === "first-typing";
    return `<section class="app-screen chat-screen">${chatHeader()}<main class="chat-history">${contextBlock()}${messageHTML(data.opening[0], "npc", 0, typing ? "typing" : "complete")}</main>${typing ? `<div class="chat-status"><p><strong style="color:${data.opening[0].color}">${escapeHTML(data.opening[0].speaker)}</strong> 正在说话…</p></div>` : '<div class="chat-bottom"><button class="warm-button" type="button" data-chat-continue>点击继续</button></div>'}</section>`;
  }

  function renderOpening() {
    return `<section class="app-screen chat-screen">${chatHeader()}<main class="chat-history">${contextBlock()}${messageHTML(data.opening[0], "npc")}${messageHTML(data.opening[1], "npc", 0, "typing")}</main><div class="chat-status"><p><strong style="color:${data.opening[1].color}">${escapeHTML(data.opening[1].speaker)}</strong> 正在说话…</p></div></section>`;
  }

  function micIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/></svg>`;
  }

  function renderSpeak(turnIndex) {
    const turn = data.turns[turnIndex];
    const history = visibleMessages(turnIndex, true);
    const micLabel = state.mic === "recording" ? "录音中…" : state.mic === "transcribing" ? "识别中…" : "按住说话";
    return `
      <section class="app-screen chat-screen speak-screen">${chatHeader()}
        <main class="chat-history compact">${contextBlock()}${renderMessages(history)}</main>
        <div class="drag-handle"><i></i></div>
        <section class="speak-panel">
          ${state.hintOpen ? `<div class="cue-card"><div class="cue-strategy"><span>${escapeHTML(turn.hintLabel || "参考说法")}</span><i>·</i><strong>${escapeHTML(turn.cue)}</strong></div><p>${escapeHTML(turn.example)}</p>${turn.exampleZh ? `<small>${escapeHTML(turn.exampleZh)}</small>` : ""}</div>` : ""}
          ${state.typeMode ? `
            <div class="type-input-row"><button type="button" data-type-mode aria-label="切换到语音">${micIcon()}</button><textarea data-type-draft rows="1" placeholder="用英语回复…">${escapeHTML(state.typeDraft)}</textarea><button type="button" class="type-send" data-type-send aria-label="发送">➤</button></div>
          ` : `
            <div class="mic-wrap ${state.mic === "recording" ? "recording" : ""}"><i></i><i></i><button type="button" data-mic aria-label="${micLabel}">${state.mic === "transcribing" ? '<span class="spinner"></span>' : micIcon()}</button></div>
            <strong class="mic-label">${micLabel}</strong>
          `}
          <div class="speak-tools"><button type="button" data-type-mode aria-label="切换输入方式"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"></path></svg></button><button type="button" class="${state.hintOpen ? "active" : ""}" data-toggle-hint>💡 提示</button></div>
        </section>
      </section>`;
  }

  function renderReply(turnIndex) {
    const replies = state.npcReplies[turnIndex] || data.turns[turnIndex].replies;
    const messages = visibleMessages(turnIndex, true);
    messages.push({ kind: "user", value: state.userUtterances[turnIndex] });
    for (let index = 0; index < Math.min(state.replyStep, replies.length); index += 1) {
      messages.push({ kind: "npc", value: replies[index] });
    }
    const pending = state.replyStep < replies.length ? replies[state.replyStep] : null;
    const button = turnIndex === 2 ? "查看结算" : "点击继续";
    return `<section class="app-screen chat-screen">${chatHeader()}<main class="chat-history reply-history">${contextBlock()}${renderMessages(messages)}${pending ? messageHTML(pending, "npc", 0, "typing") : ""}</main>${pending ? `<div class="chat-status"><p><strong style="color:${speakerColor(pending)}">${escapeHTML(pending.speaker)}</strong> 正在说话…</p></div>` : `<div class="chat-bottom"><button class="warm-button" type="button" data-reply-continue>${button}</button></div>`}</section>`;
  }

  function renderSettlement() {
    const s = data.settlement;
    return `
      <section class="app-screen settlement-screen">
        <main class="settlement-scroll">
          <div class="paper-rules"><i></i><i></i></div>
          <div class="publisher-row"><strong>${escapeHTML(s.publisher)}</strong><span>西游记</span></div>
          <h2>${escapeHTML(s.headline)}</h2>
          <div class="settlement-stats"><div><strong>${s.duration}</strong><span>对话时长</span></div><div><strong>${s.words}<small> words</small></strong><span>输出词数</span></div></div>
          <article class="epilogue-card"><span>后续报道</span><ul>${s.bullets.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul><i></i><small>你获得了称号</small><strong>「${escapeHTML(s.title)}」</strong></article>
          <div class="settlement-actions"><button class="dark-button" type="button" data-next>看看更地道的说法</button><button class="outline-button" type="button" data-go="feed">回到 Feed</button></div>
        </main>
      </section>`;
  }

  function expressionCard(index, standalone) {
    const card = data.expressions[index];
    return `
      <article class="expression-card ${standalone ? "standalone" : ""}">
        <small>你说的</small>
        <p class="raw-expression">${escapeHTML(card.raw)}</p>
        <b>${escapeHTML(card.feedbackType || "更好的说法")}</b>
        <p class="better-expression">${highlightText(card.better, card.highlights)}</p>
        <div class="pattern-block"><span>核心句型</span><strong>${escapeHTML(card.pattern)}</strong></div>
        ${standalone ? `<div class="saved-divider"></div><button class="saved-entry" type="button" data-go="expression-book"><span>已收藏到表达本：#${escapeHTML(card.label)}</span><b>›</b></button>` : ""}
      </article>`;
  }

  function renderExpression(index) {
    state.expressionIndex = index;
    return `
      <section class="app-screen expression-screen">
        <div class="expression-topbar"><button type="button" data-go="settlement">‹ 返回</button></div>
        <div class="expression-header-wrap"><div class="paper-rules"><i></i><i></i></div></div>
        <div class="expression-title-row"><h2>表达提升</h2><span data-expression-count>(${index + 1}/${data.expressions.length})</span></div>
        <div class="expression-title-rule"></div>
        <main class="expression-slider-area">
          <div class="expression-slider-outer">
            <div class="expression-slider-container" tabindex="0" aria-label="表达提升卡片，可左右滑动">
              <div class="expression-slider-track" style="transform:translateX(-${index * 100}%)">
                ${data.expressions.map((_, i) => `<div class="expression-slider-item">${expressionCard(i, true)}</div>`).join("")}
              </div>
            </div>
          </div>
          <div class="page-dots">${data.expressions.map((_, i) => `<button type="button" data-expression-dot="${i}" class="${i === index ? "active" : ""}" aria-label="查看第 ${i + 1} 条表达"></button>`).join("")}</div>
          <p class="expression-swipe-hint">‹ 左滑查看更多表达</p>
        </main>
        <div class="expression-actions"><button class="dark-button" type="button" data-go="feed">回到首页</button></div>
      </section>`;
  }

  function renderExpressionBook() {
    return `
      <section class="app-screen book-screen">
        <header><div><h2>表达本</h2><p>收藏你学到的地道英语表达</p></div><span>3</span></header>
        <div class="book-stats"><div><strong>3</strong><span>积累表达</span></div><i></i><div><strong>3</strong><span>已掌握</span></div><i></i><div><strong>100%</strong><span>掌握率</span></div></div>
        <div class="book-list">${data.expressions.map((_, index) => expressionCard(index, false)).join("")}</div>
        <button class="restart-inline" type="button" data-go="feed">继续刷话题 →</button>
      </section>`;
  }

  function renderScreen() {
    switch (state.screenId) {
      case "splash": return renderSplash();
      case "onboarding": return renderOnboarding();
      case "feed": return renderFeed();
      case "chat-context": return renderChatContext();
      case "chat-opening": return renderOpening();
      case "speak-1": return renderSpeak(0);
      case "reply-1": return renderReply(0);
      case "speak-2": return renderSpeak(1);
      case "reply-2": return renderReply(1);
      case "speak-3": return renderSpeak(2);
      case "reply-3": return renderReply(2);
      case "settlement": return renderSettlement();
      case "expression-1": return renderExpression(0);
      case "expression-2": return renderExpression(1);
      case "expression-3": return renderExpression(2);
      case "expression-book": return renderExpressionBook();
      default: return renderSplash();
    }
  }

  function setExpressionSlide(index, options = {}) {
    const total = data.expressions.length;
    const nextIndex = Math.max(0, Math.min(total - 1, index));
    state.expressionIndex = nextIndex;

    const track = screenRoot.querySelector(".expression-slider-track");
    if (track) {
      track.style.transition = options.animate === false ? "none" : "transform .3s ease";
      track.style.transform = `translateX(-${nextIndex * 100}%)`;
    }

    const count = screenRoot.querySelector("[data-expression-count]");
    if (count) count.textContent = `(${nextIndex + 1}/${total})`;
    screenRoot.querySelectorAll("[data-expression-dot]").forEach((dot) => {
      dot.classList.toggle("active", Number(dot.dataset.expressionDot) === nextIndex);
    });

    const id = `expression-${nextIndex + 1}`;
    state.screenId = id;
    if (options.route !== false) setHash(id, options.replace);
    const screen = screenMap.get(id);
    const pageIndex = flow.indexOf(id) + 1;
    stageControls.textContent = `PAGE ${String(pageIndex).padStart(2, "0")} / ${flow.length} · ${screen.title}`;
    pageLabel.textContent = screen.title;
    navContent.querySelectorAll("[data-go]").forEach((button) => {
      button.classList.toggle("active", button.dataset.go === id);
    });
  }

  function bindExpressionInteractions() {
    const container = screenRoot.querySelector(".expression-slider-container");
    const track = screenRoot.querySelector(".expression-slider-track");
    if (!container || !track) return;

    const endDrag = (event) => {
      if (!expressionDragging) return;
      expressionDragging = false;
      container.classList.remove("dragging");
      if (event?.pointerId != null) container.releasePointerCapture?.(event.pointerId);
      if (expressionDragX < -40) setExpressionSlide(state.expressionIndex + 1);
      else if (expressionDragX > 40) setExpressionSlide(state.expressionIndex - 1);
      else setExpressionSlide(state.expressionIndex, { route: false });
      expressionDragX = 0;
    };

    container.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      expressionDragging = true;
      expressionStartX = event.clientX;
      expressionDragX = 0;
      container.classList.add("dragging");
      container.setPointerCapture?.(event.pointerId);
      track.style.transition = "none";
    });
    container.addEventListener("pointermove", (event) => {
      if (!expressionDragging) return;
      expressionDragX = event.clientX - expressionStartX;
      track.style.transform = `translateX(calc(-${state.expressionIndex * 100}% + ${expressionDragX}px))`;
    });
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    container.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setExpressionSlide(state.expressionIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setExpressionSlide(state.expressionIndex + 1);
      }
    });
  }

  function render() {
    const screen = screenMap.get(state.screenId);
    const index = flow.indexOf(state.screenId) + 1;
    document.body.dataset.chapter = screen.group;
    screenRoot.innerHTML = renderScreen();
    phoneExhibit.querySelector(".feed-dots")?.remove();
    if (state.screenId === "feed") {
      const dots = document.createElement("div");
      dots.className = "feed-dots";
      dots.setAttribute("aria-hidden", "true");
      dots.innerHTML = data.feed.map((_, index) => `<i class="${index === state.feedIndex ? "active" : ""}"></i>`).join("");
      phoneExhibit.appendChild(dots);
    }
    fitFeedHeadline();
    if (state.screenId === "feed") {
      window.requestAnimationFrame(() => {
        syncFeedPosition({ animate: false });
        bindFeedInteractions();
      });
    }
    if (state.screenId.startsWith("expression-")) {
      window.requestAnimationFrame(bindExpressionInteractions);
    }
    stageControls.textContent = `PAGE ${String(index).padStart(2, "0")} / ${flow.length} · ${screen.title}`;
    pageLabel.textContent = screen.title;
    navContent.querySelectorAll("[data-go]").forEach((button) => {
      button.classList.toggle("active", button.dataset.go === state.screenId);
    });
    const history = screenRoot.querySelector(".chat-history");
    if (history) history.scrollTop = history.scrollHeight;
    if (state.screenId === "chat-context" && state.chatPhase === "first-typing") startNpcTyping("first-ready");
    if (state.screenId === "chat-opening" && state.chatPhase === "second-typing") startNpcTyping("second-ready");
    if (state.screenId.startsWith("reply-")) {
      const turnIndex = Number(state.screenId.slice(-1)) - 1;
      const replies = state.npcReplies[turnIndex] || data.turns[turnIndex].replies;
      if (state.replyStep < replies.length) startReplyTyping(turnIndex);
    }
  }

  function startNpcTyping(donePhase) {
    const chars = Array.from(screenRoot.querySelectorAll(".npc-row-typing .typing-char"));
    if (!chars.length) return;
    let cursor = 0;
    typingTimer = window.setInterval(() => {
      if (!chars[cursor]) {
        window.clearInterval(typingTimer);
        typingTimer = null;
        chatTimer = window.setTimeout(() => {
          state.chatPhase = donePhase;
          if (donePhase === "second-ready") return go("speak-1", { replace: true });
          render();
        }, 420);
        return;
      }
      chars[cursor].classList.add("lit");
      cursor += 1;
    }, 42);
  }

  function continueOpeningDialogue() {
    if (state.screenId !== "chat-context" || state.chatPhase !== "first-ready") return;
    state.chatPhase = "second-typing";
    state.screenId = "chat-opening";
    setHash("chat-opening");
    render();
  }

  function conversationalReplies(turnIndex, utterance) {
    const lower = utterance.toLowerCase();
    if (turnIndex === 0 && /sing|la[- ]?ba|song/.test(lower)) {
      return [
        { speaker: "八戒", color: "#1A6A8A", avatar: "八", en: "What? Are you singing? Wake up—look at this sale.", zh: "啥？你在唱歌吗？醒醒，看看这笔买卖。" },
        { speaker: "白龙马", color: "#A05020", avatar: "白", en: "He's confused. You decide: is 20k fair for fourteen years of work?", zh: "他听糊涂了。你来说：十四年的辛苦，卖两万公平吗？" }
      ];
    }
    if (turnIndex === 0 && /fair|fourteen|14|work|horse/.test(lower)) {
      return [
        { speaker: "八戒", color: "#1A6A8A", avatar: "八", en: "He eats a lot, and the journey is over. What else should I do?", zh: "他吃得多，取经也结束了。不卖还能怎么办？" },
        { speaker: "白龙马", color: "#A05020", avatar: "白", en: "Exactly. Fourteen years of work should count for something.", zh: "正是。十四年的付出，总该算点什么。" }
      ];
    }
    return data.turns[turnIndex].replies;
  }

  function handleMic() {
    if (state.mic === "transcribing") return;
    if (state.mic === "idle") {
      state.mic = "recording";
      capturedSpeech = "";
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (Recognition) {
        speechRecognition = new Recognition();
        speechRecognition.lang = "en-US";
        speechRecognition.interimResults = false;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.onresult = (event) => {
          capturedSpeech = event.results?.[0]?.[0]?.transcript || "";
        };
        speechRecognition.onerror = () => {};
        try { speechRecognition.start(); } catch (_) {}
      }
      return render();
    }
    if (speechRecognition) {
      try { speechRecognition.stop(); } catch (_) {}
      speechRecognition = null;
    }
    state.mic = "transcribing";
    render();
    const turnIndex = Number(state.screenId.slice(-1)) - 1;
    micTimer = window.setTimeout(() => {
      submitUserTurn(turnIndex, capturedSpeech || randomItem(simulatedUtterances[turnIndex]));
    }, 650);
  }

  function submitUserTurn(turnIndex, text) {
    const utterance = String(text || "").trim();
    if (!utterance || turnIndex < 0 || turnIndex > 2) return;
    state.userUtterances[turnIndex] = utterance;
    state.npcReplies[turnIndex] = conversationalReplies(turnIndex, utterance);
    state.mic = "idle";
    state.hintOpen = false;
    go(`reply-${turnIndex + 1}`);
  }

  function startReplyTyping(turnIndex) {
    const chars = Array.from(screenRoot.querySelectorAll(".npc-row-typing .typing-char"));
    if (!chars.length) return;
    let cursor = 0;
    typingTimer = window.setInterval(() => {
      if (!chars[cursor]) {
        window.clearInterval(typingTimer);
        typingTimer = null;
        chatTimer = window.setTimeout(() => {
          state.replyStep += 1;
          render();
        }, 360);
        return;
      }
      chars[cursor].classList.add("lit");
      cursor += 1;
    }, 34);
  }

  function continueAfterReplies() {
    const turnIndex = Number(state.screenId.slice(-1)) - 1;
    if (turnIndex === 0) return go("speak-2");
    if (turnIndex === 1) return go("speak-3");
    return go("settlement");
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, [data-next]");
    if (!target) return;
    if (target.matches("[data-expression-dot]")) return setExpressionSlide(Number(target.dataset.expressionDot));
    if (target.matches("[data-go]")) return go(target.dataset.go);
    if (target.matches("[data-chat-continue]")) return continueOpeningDialogue();
    if (target.matches("[data-next]")) return next();
    if (target.matches("[data-feed-next]")) return go("chat-context");
    if (target.matches("[data-mic]")) return handleMic();
    if (target.matches("[data-type-mode]")) {
      state.typeMode = !state.typeMode;
      return render();
    }
    if (target.matches("[data-type-send]")) {
      const turnIndex = Number(state.screenId.slice(-1)) - 1;
      return submitUserTurn(turnIndex, screenRoot.querySelector("[data-type-draft]")?.value);
    }
    if (target.matches("[data-reply-continue]")) return continueAfterReplies();
    if (target.matches("[data-toggle-hint]")) {
      state.hintOpen = !state.hintOpen;
      return render();
    }
    if (target.matches("[data-back]")) {
      const index = flow.indexOf(state.screenId);
      return go(flow[Math.max(0, index - 1)]);
    }
    if (target.matches("[data-start]")) {
      const input = document.getElementById("nickname");
      state.name = input?.value.trim() || state.namePlaceholder;
      return go("feed");
    }
    if (target.matches("[data-random-name]")) {
      state.namePlaceholder = generateName();
      return render();
    }
    if (target.matches("[data-open-modal]")) return aboutDialog.showModal();
    if (target.matches("[data-close-modal]")) return aboutDialog.close();
    if (target.id === "restart-demo") {
      aboutDialog.close();
      state.name = "";
      state.namePlaceholder = generateName();
      state.hintOpen = false;
      state.userUtterances = [null, null, null];
      state.npcReplies = [null, null, null];
      return go("splash");
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-type-draft]")) state.typeDraft = event.target.value;
  });

  document.addEventListener("keydown", (event) => {
    if (!event.target.matches("[data-type-draft]") || event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    const turnIndex = Number(state.screenId.slice(-1)) - 1;
    submitUserTurn(turnIndex, event.target.value);
  });

  menuButton.addEventListener("click", () => setSidebar(!sidebar.classList.contains("open")));
  sidebarOverlay.addEventListener("click", () => setSidebar(false));
  window.addEventListener("hashchange", () => {
    const match = window.location.hash.match(/^#screen=([a-z0-9-]+)$/);
    if (match && screenMap.has(match[1]) && match[1] !== state.screenId) {
      state.screenId = match[1];
      render();
    }
  });

  renderNav();
  fitPhone();
  window.addEventListener("resize", fitPhone);
  const initial = window.location.hash.match(/^#screen=([a-z0-9-]+)$/)?.[1];
  go(screenMap.has(initial) ? initial : "splash", { replace: true });
})();
