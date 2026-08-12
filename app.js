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
    expressionIndex: 0
  };

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
    state.mic = "idle";
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
    const scale = Math.min(
      1.08,
      Math.max(0.72, (productStage.clientHeight - 52) / 852),
      Math.max(0.72, (productStage.clientWidth - 32) / 393)
    );
    phoneExhibit.style.width = `${393 * scale}px`;
    phoneExhibit.style.height = `${852 * scale}px`;
    phoneShell.style.transform = `scale(${scale})`;
  }

  function fitFeedHeadline() {
    const headline = screenRoot.querySelector(".news-body h2");
    if (!headline) return;
    const lines = headline.querySelectorAll("span");
    if (!lines.length) return;
    lines.forEach((line) => { line.style.fontSize = "32px"; });
    const longest = Math.max(...Array.from(lines, (line) => line.scrollWidth));
    const fontSize = longest > headline.offsetWidth
      ? Math.max(16, Math.floor(32 * (headline.offsetWidth / longest)))
      : 32;
    lines.forEach((line) => { line.style.fontSize = `${fontSize}px`; });
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

  function renderFeedCard(item, buttonText) {
    return `
      <section class="app-screen feed-screen" style="--feed-bg:${item.bg};--feed-header:${item.header};--feed-header-text:${item.headerText};--feed-accent:${item.accent};--feed-accent-dark:#1a1a1a">
        <header class="feed-header"><strong>每日胡说</strong><span>${escapeHTML(displayName().slice(0, 1))}</span></header>
        <div class="feed-container">
          <article class="news-card">
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
              <div class="news-meta"><span>2.3k人围观</span><i></i><span>128条评论</span></div>
            </div>
            <button class="join-button" type="button" data-feed-next>${buttonText}</button>
            <p class="swipe-hint">⌃&nbsp; 上划看下一条</p>
            </div>
          </article>
        </div>
      </section>`;
  }

  function chatHeader() {
    return `<header class="chat-header"><button type="button" data-back aria-label="返回">‹</button><div><strong>${escapeHTML(data.room.groupName)}</strong><span>${escapeHTML(data.room.members)}</span></div><b>LIVE</b></header>`;
  }

  function contextBlock() {
    return `<div class="chat-context"><p>📌 ${escapeHTML(data.room.notice)}</p><p>${escapeHTML(data.room.inviter)}</p><div><i></i><span>You're <strong>${escapeHTML(data.room.role)}</strong></span><i></i></div></div>`;
  }

  function messageHTML(message, kind, delay = 0) {
    if (kind === "user") {
      return `<div class="user-row animate-in" style="--delay:${delay}ms"><div><strong>${escapeHTML(displayName())}</strong><p>${escapeHTML(message)}</p></div></div>`;
    }
    const english = String(message.en || "").replaceAll("@Momo", `@${displayName()}`);
    const chinese = String(message.zh || "").replaceAll("@Momo", `@${displayName()}`);
    return `<div class="npc-row animate-in" style="--delay:${delay}ms"><span style="background:${message.color}">${escapeHTML(message.avatar)}</span><div><strong style="color:${message.color}">${escapeHTML(message.speaker)}</strong><article><p>${escapeHTML(english)}</p><small>${escapeHTML(chinese)}</small></article></div></div>`;
  }

  function visibleMessages(untilTurn, includeReplies) {
    const list = [...data.opening.map((message) => ({ kind: "npc", value: message }))];
    for (let index = 0; index < untilTurn; index += 1) {
      list.push({ kind: "user", value: data.turns[index].user });
      if (index < untilTurn - 1 || includeReplies) {
        data.turns[index].replies.forEach((message) => list.push({ kind: "npc", value: message }));
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
    return `<section class="app-screen chat-screen">${chatHeader()}<main class="chat-history">${contextBlock()}<div class="system-pill">你已加入群聊</div></main><div class="chat-bottom"><button class="warm-button" type="button" data-next>看看他们在吵什么</button></div></section>`;
  }

  function renderOpening() {
    return `<section class="app-screen chat-screen">${chatHeader()}<main class="chat-history">${contextBlock()}${renderMessages(data.opening.map((value) => ({ kind: "npc", value })), 2)}</main><div class="chat-bottom"><button class="warm-button" type="button" data-next>轮到你了</button></div></section>`;
  }

  function micIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/></svg>`;
  }

  function renderSpeak(turnIndex) {
    const turn = data.turns[turnIndex];
    const history = turnIndex === 0 ? data.opening.map((value) => ({ kind: "npc", value })) : visibleMessages(turnIndex, true).slice(-3);
    const micLabel = state.mic === "recording" ? "录音中… 0:03" : state.mic === "transcribing" ? "识别中…" : "按住说话";
    return `
      <section class="app-screen chat-screen speak-screen">${chatHeader()}
        <main class="chat-history compact">${contextBlock()}${renderMessages(history)}</main>
        <div class="drag-handle"><i></i></div>
        <section class="speak-panel">
          ${state.hintOpen ? `<div class="cue-card"><span>💡 参考说法</span><p>${escapeHTML(turn.example)}</p><small>${escapeHTML(turn.cue)}</small></div>` : ""}
          <div class="mic-wrap ${state.mic === "recording" ? "recording" : ""}"><i></i><i></i><button type="button" data-mic aria-label="${micLabel}">${state.mic === "transcribing" ? '<span class="spinner"></span>' : micIcon()}</button></div>
          <strong class="mic-label">${micLabel}</strong>
          <div class="speak-tools"><button type="button">⌨ 文字输入</button><button type="button" class="${state.hintOpen ? "active" : ""}" data-toggle-hint>💡 ${state.hintOpen ? "提示已展开" : "提示"}</button></div>
        </section>
      </section>`;
  }

  function renderReply(turnIndex) {
    const messages = [
      { kind: "user", value: data.turns[turnIndex].user },
      ...data.turns[turnIndex].replies.map((value) => ({ kind: "npc", value }))
    ];
    const button = turnIndex === 2 ? "查看结算" : "继续聊";
    return `<section class="app-screen chat-screen">${chatHeader()}<main class="chat-history reply-history"><div class="turn-marker">第 ${turnIndex + 1} 轮 · 你的表达推动了讨论</div>${renderMessages(messages, 3)}</main><div class="chat-bottom"><button class="warm-button" type="button" data-next>${button}</button></div></section>`;
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
        <span class="expression-category">${escapeHTML(card.label)}</span>
        <small>你说的</small>
        <p class="raw-expression">${escapeHTML(card.raw)}</p>
        <b>更地道的说法</b>
        <p class="better-expression">${highlightText(card.better, card.highlights)}</p>
        <div class="pattern-block"><span>可复用句型</span><strong>${escapeHTML(card.pattern)}</strong></div>
      </article>`;
  }

  function renderExpression(index) {
    return `
      <section class="app-screen expression-screen">
        <header><button type="button" data-back>‹</button><div class="paper-rules"><i></i><i></i></div></header>
        <div class="expression-title"><h2>表达提升</h2><span>${index + 1} / ${data.expressions.length}</span></div>
        <main>${expressionCard(index, true)}<div class="page-dots">${data.expressions.map((_, i) => `<i class="${i === index ? "active" : ""}"></i>`).join("")}</div><p>左右滑动，查看每轮表达</p></main>
        <div class="expression-actions"><button class="dark-button" type="button" data-next>${index === 2 ? "查看表达本" : "下一条"}</button></div>
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
      case "feed": return renderFeedCard(data.feed.find((item) => item.id === "room-001"), "Join Chat");
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
      dots.innerHTML = `<i class="active"></i>${Array.from({ length: 14 }, () => "<i></i>").join("")}`;
      phoneExhibit.appendChild(dots);
    }
    fitFeedHeadline();
    stageControls.textContent = `PAGE ${String(index).padStart(2, "0")} / ${flow.length} · ${screen.title}`;
    pageLabel.textContent = screen.title;
    navContent.querySelectorAll("[data-go]").forEach((button) => {
      button.classList.toggle("active", button.dataset.go === state.screenId);
    });
    const history = screenRoot.querySelector(".chat-history");
    if (history) history.scrollTop = history.scrollHeight;
  }

  function handleMic() {
    if (state.mic !== "idle") return;
    state.mic = "recording";
    render();
    micTimer = window.setTimeout(() => {
      state.mic = "transcribing";
      render();
      micTimer = window.setTimeout(next, 850);
    }, 1100);
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, [data-next]");
    if (!target) return;
    if (target.matches("[data-go]")) return go(target.dataset.go);
    if (target.matches("[data-next]")) return next();
    if (target.matches("[data-feed-next]")) return go("chat-context");
    if (target.matches("[data-mic]")) return handleMic();
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
      return go("splash");
    }
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
