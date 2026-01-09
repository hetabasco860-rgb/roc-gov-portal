(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Config ----------
  const SITE_NOTICE = {
    title: "重要提醒",
    items: [
      "兩地區制度：台北（台灣地區）／南京（大陸地區）分區治理，便民服務依地區分類提供。",
      "身分銜接：原中共國大陸及港澳地區國民身分銜接，請依公告時程與應備文件辦理。",
      "港澳瓊戒嚴區：請留意旅行、通訊與人身安全風險，並依最新公告審慎規劃。"
    ]
  };

  // Search index (simple demo; add more entries as needed)
  const SEARCH_INDEX = [
    { title: "原中共國大陸及港澳地區國民身分銜接", url: "policies.html#identity-bridge", keywords: "身分 銜接 轉換 轉移 原中共國 原大陸 港澳 居民 文件 流程 申請" },
    { title: "政治過渡公告專區", url: "news.html#transition", keywords: "政治 過渡 制度 轉換 公告 會議 結論 法案 進度" },
    { title: "兩地區服務入口", url: "regions.html", keywords: "兩地區 台灣 大陸 台北 南京 服務 入口" },
    { title: "戶政服務", url: "regions.html#service-civil", keywords: "戶政 戶籍 出生 遷徙 申請 證明" },
    { title: "稅務與繳費", url: "regions.html#service-tax", keywords: "稅 務 繳費 報稅 發票" },
    { title: "健康與社福", url: "regions.html#service-welfare", keywords: "健保 社福 補助 福利" },
    { title: "交通與車駕", url: "regions.html#service-transport", keywords: "交通 駕照 車籍 違規 查詢" },
    { title: "就業與勞動", url: "regions.html#service-labor", keywords: "就業 勞動 勞保 申訴 求職" },
    { title: "常見問答", url: "faq.html", keywords: "FAQ 常見 問答 申辦 查詢" },
    { title: "聯絡與陳情", url: "contact.html", keywords: "聯絡 陳情 反映 申訴 表單" },
  ];

  // News items (used for rendering on index and filtering on news page)
  const NEWS_ITEMS = [
    { title: "【公告】兩地區便民服務入口整合上線", date: "2026-01-09", tag: "公告", section: "general" },
    { title: "【公告】原中共國大陸及港澳地區國民身分銜接：受理指引（第一版）", date: "2026-01-08", tag: "身分銜接", section: "identity" },
    { title: "【公告】政治過渡會議結論彙整（第一期）", date: "2026-01-07", tag: "政治過渡", section: "transition" },
    { title: "【新聞】台灣地區公共服務數位化進度報告", date: "2026-01-05", tag: "新聞", section: "general" },
    { title: "【公告】港澳瓊戒嚴區旅行安全提醒（更新）", date: "2026-01-03", tag: "安全提醒", section: "alert" },
    { title: "【公告】大陸地區地方行政服務窗口試行名單", date: "2025-12-28", tag: "大陸地區", section: "mainland" }
  ];

  // Region services model (toggle affects ONLY the services section on index/regions)
  const REGION_SERVICES = {
    tw: {
      name: "台灣地區（首府台北）",
      chips: ["民生服務", "快速查詢", "線上申辦"],
      services: [
        { kicker: "戶政", title: "戶政服務", desc: "戶籍、出生、遷徙、證明", url: "regions.html#service-civil" },
        { kicker: "稅務", title: "稅務與繳費", desc: "報稅、繳費、查詢", url: "regions.html#service-tax" },
        { kicker: "社福", title: "健康與社福", desc: "健保、補助、福利", url: "regions.html#service-welfare" },
        { kicker: "教育", title: "教育服務", desc: "學籍、補助、升學資訊", url: "regions.html#service-edu" },
        { kicker: "交通", title: "交通與車駕", desc: "駕照、車籍、違規查詢", url: "regions.html#service-transport" },
        { kicker: "勞動", title: "就業與勞動", desc: "求職、勞保、勞資申訴", url: "regions.html#service-labor" },
        { kicker: "特別專區", title: "身分銜接（指引）", desc: "原中共國大陸及港澳地區國民身分銜接", url: "policies.html#identity-bridge" },
        { kicker: "公告專區", title: "政治過渡公告", desc: "制度轉換、法案與會議結論", url: "news.html#transition" },
      ]
    },
    ml: {
      name: "大陸地區（首府南京）",
      chips: ["重建治理", "公共服務", "地方窗口"],
      services: [
        { kicker: "行政", title: "行政服務", desc: "證件、遷徙、基礎申辦", url: "regions.html#ml-admin" },
        { kicker: "就業", title: "就業安置", desc: "職訓、媒合、保障", url: "regions.html#ml-jobs" },
        { kicker: "民生", title: "民生修復", desc: "供應公告、公共服務", url: "regions.html#ml-livelihood" },
        { kicker: "教育", title: "教育安置", desc: "學籍銜接、就學支持", url: "regions.html#ml-edu" },
        { kicker: "社福", title: "社福救助", desc: "補助、救助、轉介", url: "regions.html#ml-welfare" },
        { kicker: "地方", title: "地方治理窗口", desc: "市縣服務、窗口名單", url: "regions.html#ml-local" },
        { kicker: "特別專區", title: "身分銜接（指引）", desc: "原中共國大陸及港澳地區國民身分銜接", url: "policies.html#identity-bridge" },
        { kicker: "公告專區", title: "政治過渡公告", desc: "制度轉換、法案與會議結論", url: "news.html#transition" },
      ]
    }
  };

  // ---------- Helpers ----------
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getParam(name) {
    const u = new URL(location.href);
    return u.searchParams.get(name) || "";
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  // ---------- Global: year, last updated ----------
  setText("#year", String(new Date().getFullYear()));
  const last = $("#lastUpdated");
  if (last) last.textContent = `最後更新：${new Date().toLocaleString("zh-TW")}`;

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  // ---------- Mobile nav ----------
  const nav = $("#primary-nav");
  const toggleBtn = $(".nav-toggle");
  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggleBtn.setAttribute("aria-expanded", String(!open));
    });
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const action = t.getAttribute("data-action");

    if (action === "toggle-theme") {
      const cur = root.getAttribute("data-theme") || "light";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    }

    if (action === "search") {
      const q = ($("#q")?.value || "").trim();
      if (!q) {
        alert("請輸入關鍵字");
        return;
      }
      location.href = `news.html?q=${encodeURIComponent(q)}`;
    }

    if (action === "region" && t instanceof HTMLElement) {
      const region = t.getAttribute("data-region");
      if (region === "tw" || region === "ml") {
        localStorage.setItem("region", region);
        applyRegion(region);
      }
    }

    if (action === "fake-submit") {
      e.preventDefault();
      const ok = validateContactForm();
      if (!ok) return;
      const box = $("#formToast");
      if (box) {
        box.hidden = false;
        box.innerHTML =
          `<strong>已收到您的提交（示範）</strong><div class="help">此為純前端示範網站，未連接後端。你可以把資料接到表單服務或 API。</div>`;
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  // ---------- Notice bar ----------
  const noticeTitle = $("#noticeTitle");
  const noticeList = $("#noticeList");
  if (noticeTitle && noticeList) {
    noticeTitle.textContent = SITE_NOTICE.title;
    noticeList.innerHTML = SITE_NOTICE.items.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  }

  // ---------- Region application (index/regions) ----------
  function applyRegion(region) {
    // Tabs state
    $$(".tab[data-region]").forEach((b) => {
      const r = b.getAttribute("data-region");
      b.setAttribute("aria-selected", String(r === region));
    });

    const model = REGION_SERVICES[region];
    const regionNameEl = $("#regionName");
    if (regionNameEl) regionNameEl.textContent = model.name;

    const chipsEl = $("#regionChips");
    if (chipsEl) {
      chipsEl.innerHTML = model.chips.map((c) => `<span class="pill">${escapeHtml(c)}</span>`).join("");
    }

    const servicesEl = $("#servicesGrid");
    if (servicesEl) {
      servicesEl.innerHTML = model.services.map((s) => `
        <a class="tile" href="${escapeHtml(s.url)}">
          <div class="tile__kicker">${escapeHtml(s.kicker)}</div>
          <div class="tile__title">${escapeHtml(s.title)}</div>
          <div class="tile__desc">${escapeHtml(s.desc)}</div>
        </a>
      `).join("");
    }
  }

  const regionSaved = localStorage.getItem("region");
  const defaultRegion = (regionSaved === "ml" || regionSaved === "tw") ? regionSaved : "tw";
  applyRegion(defaultRegion);

  // ---------- Latest list on index ----------
  const latestList = $("#latestList");
  if (latestList) {
    const top = NEWS_ITEMS.slice(0, 4);
    latestList.innerHTML = top.map((it) => `
      <div class="item" role="listitem">
        <div>
          <div class="item__title">${escapeHtml(it.title)}</div>
          <div class="item__meta">${escapeHtml(it.date)}</div>
        </div>
        <span class="tag">${escapeHtml(it.tag)}</span>
      </div>
    `).join("");
  }

  // ---------- News page filtering ----------
  const newsContainer = $("#newsList");
  if (newsContainer) {
    const q = getParam("q").trim();
    const filter = getParam("filter").trim(); // tag/section quick filter
    const qInput = $("#q");
    if (qInput && q) qInput.value = q;

    let items = [...NEWS_ITEMS];

    if (filter) {
      items = items.filter(x => x.tag === filter || x.section === filter);
    }

    if (q) {
      const qq = q.toLowerCase();
      items = items.filter(x =>
        (x.title + " " + x.tag + " " + x.section).toLowerCase().includes(qq)
      );

      // Also include SEARCH_INDEX hits (as “site results”)
      const hits = SEARCH_INDEX
        .filter(x => (x.title + " " + x.keywords).toLowerCase().includes(qq))
        .slice(0, 6)
        .map(x => ({
          title: `【站內】${x.title}`,
          date: "",
          tag: "站內導覽",
          section: "site",
          url: x.url
        }));

      renderNews(items, hits);
      setText("#newsHint", `搜尋結果：${items.length + hits.length} 項`);
    } else {
      renderNews(items, []);
      setText("#newsHint", filter ? `已套用篩選：${filter}` : "提示：可使用上方搜尋快速查找公告與服務");
    }
  }

  function renderNews(items, siteHits) {
    const newsContainer = $("#newsList");
    if (!newsContainer) return;

    const sitePart = siteHits.length
      ? `<div class="panel panel--soft" style="margin-bottom:12px">
           <div class="panel__row">
             <div><strong>站內快速導覽</strong><div class="help">依關鍵字匹配的服務與專區</div></div>
             <span class="pill">站內導覽</span>
           </div>
           <div class="list" style="margin-top:10px">
             ${siteHits.map(h => `
               <div class="item">
                 <div>
                   <div class="item__title"><a href="${escapeHtml(h.url)}">${escapeHtml(h.title)}</a></div>
                   <div class="item__meta">—</div>
                 </div>
                 <span class="tag">${escapeHtml(h.tag)}</span>
               </div>
             `).join("")}
           </div>
         </div>`
      : "";

    const listPart = items.length
      ? `<div class="list">
           ${items.map(it => `
             <div class="item" role="listitem">
               <div>
                 <div class="item__title">${escapeHtml(it.title)}</div>
                 <div class="item__meta">${escapeHtml(it.date)}</div>
               </div>
               <span class="tag">${escapeHtml(it.tag)}</span>
             </div>
           `).join("")}
         </div>`
      : `<div class="panel"><strong>沒有找到相符項目。</strong><div class="help">請嘗試更換關鍵字或移除篩選。</div></div>`;

    newsContainer.innerHTML = sitePart + listPart;
  }

  // ---------- Contact form demo validation ----------
  function validateContactForm() {
    const name = ($("#name")?.value || "").trim();
    const email = ($("#email")?.value || "").trim();
    const topic = ($("#topic")?.value || "").trim();
    const msg = ($("#message")?.value || "").trim();

    const errors = [];
    if (!name) errors.push("請填寫姓名");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("請填寫有效的電子郵件");
    if (!topic) errors.push("請選擇主題");
    if (msg.length < 10) errors.push("內容請至少 10 字");

    const box = $("#formErrors");
    if (box) {
      if (errors.length) {
        box.hidden = false;
        box.innerHTML = `<strong>請修正以下問題：</strong><ul>${errors.map(e => `<li>${escapeHtml(e)}</li>`).join("")}</ul>`;
      } else {
        box.hidden = true;
        box.innerHTML = "";
      }
    }
    return errors.length === 0;
  }
})();
