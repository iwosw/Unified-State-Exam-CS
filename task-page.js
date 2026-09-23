const number = Number(document.body.dataset.task);
const task = tasks.find((item) => item.number === number);
const walkthrough = walkthroughs.find((item) => item.number === number);
const relatedExamples = pythonExamples.filter((item) => item.number === number);
const root = document.getElementById("task-page");

if (!task || !walkthrough) {
  root.textContent = "Задание не найдено. Вернись в каталог.";
} else {
  document.title = `Задание ${number}: ${task.title} — ЕГЭ Информатика`;
  const url = (n) => `${String(n).padStart(2, "0")}.html`;
  root.innerHTML = `
    <nav class="topbar detail-topbar" aria-label="Основная навигация">
      <a class="brand" href="../index.html">EGE CS Cheat Sheets</a>
      <a href="../index.html#tasks">← Все задания</a>
    </nav>
    <div class="detail-layout__grid">
      <aside class="detail-sidebar panel" aria-label="Номера заданий">
        <h2>Задания 1–27</h2>
        <div class="quick-nav" id="detail-nav"></div>
      </aside>
      <div class="detail-content">
        <header class="panel detail-hero">
          <p class="section-label" id="task-category"></p>
          <h1 id="task-heading"></h1>
          <p class="hero__lead" id="task-summary"></p>
          <div class="task-points" id="task-points"></div>
        </header>
        <section class="panel detail-section">
          <h2>Что встречается в задании</h2>
          <ul class="task-list" id="task-condition"></ul>
          <h2>Алгоритм решения</h2>
          <ol class="task-list" id="task-steps"></ol>
          <p class="task-answer" id="task-answer"></p>
        </section>
        <section class="panel detail-section" id="walkthrough">
          <p class="section-label">Разбор на Python</p>
          <h2 id="worked-title"></h2>
          <p id="worked-question"></p>
          <ol class="task-list" id="worked-steps"></ol>
          <div class="example-code-heading"><span>solution.py</span><button class="copy-button" type="button" id="worked-copy">Скопировать код</button></div>
          <pre class="code-block"><code id="worked-code"></code></pre>
          <p class="worked-example__result" id="worked-result"></p>
          <p class="task-answer" id="worked-adapt"></p>
        </section>
        <section class="panel detail-section" id="variations" hidden>
          <p class="section-label">Практика по этому номеру</p>
          <h2>Другие варианты и примеры с фото</h2>
          <div class="detail-variations" id="variation-list"></div>
        </section>
        <section class="panel detail-section" id="templates">
          <p class="section-label">Каркас алгоритма</p>
          <h2>Шаблон на четырёх языках</h2>
          <p class="task-summary">Это заготовка для похожих условий. Полный запускаемый Python-пример и его ответ — выше.</p>
          <div class="task-tabs" id="code-tabs" role="group" aria-label="Язык шаблона"></div>
          <pre class="code-block"><code id="template-code"></code></pre>
        </section>
        <section class="panel detail-section example-guide">
          <h2>Как запустить код</h2>
          <ol class="task-list">
            <li>Скопируй полный пример из блока «Разбор на Python» или один из вариантов с фото в файл <code>solution.py</code>.</li>
            <li>Запусти файл в PyCharm или выполни <code>python solution.py</code> (иногда <code>python3 solution.py</code>). Нужен Python 3.10+ без сторонних пакетов.</li>
            <li>Сравни вывод с контрольным ответом. Затем поменяй данные и условия согласно своему варианту.</li>
          </ol>
          <p>Для шаблонов, которые читают файл, положи файл задания в рабочую папку. Если на фото часть условия неразборчива, пример помечен как адаптация.</p>
        </section>
        <nav class="detail-pagination" aria-label="Соседние задания" id="pagination"></nav>
      </div>
    </div>`;

  const setText = (selector, value) => { root.querySelector(selector).textContent = value; };
  const fillList = (selector, items) => {
    const list = root.querySelector(selector);
    items.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
  };
  const wireCopy = (button, code) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Скопировано!";
      } catch {
        button.textContent = "Выдели код вручную";
      }
    });
  };

  tasks.forEach((item) => {
    const link = document.createElement("a");
    link.href = url(item.number);
    link.textContent = item.number;
    link.title = item.title;
    if (item.number === number) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
    root.querySelector("#detail-nav").appendChild(link);
  });

  setText("#task-category", `Задание ${number} • ${typeLabels[task.type]}`);
  setText("#task-heading", task.title);
  setText("#task-summary", task.summary);
  task.points.forEach((point) => {
    const badge = document.createElement("span");
    badge.textContent = point;
    root.querySelector("#task-points").appendChild(badge);
  });
  fillList("#task-condition", task.condition);
  fillList("#task-steps", task.steps);
  setText("#task-answer", `Что в ответе: ${task.answer}`);

  setText("#worked-title", walkthrough.title);
  setText("#worked-question", walkthrough.question);
  fillList("#worked-steps", walkthrough.reasoning);
  setText("#worked-code", walkthrough.code);
  setText("#worked-result", `Проверка: ${walkthrough.expected}`);
  setText("#worked-adapt", `Для своего варианта: ${walkthrough.adapt}`);
  wireCopy(root.querySelector("#worked-copy"), walkthrough.code);

  if (relatedExamples.length) {
    root.querySelector("#variations").hidden = false;
    relatedExamples.forEach((example) => {
      const article = document.createElement("article");
      article.className = "detail-variation";
      article.id = `example-${example.id}`;
      article.innerHTML = `<p class="section-label"></p><h3></h3><p class="example-task"></p>
        <p class="example-idea"></p><p class="example-change"></p>
        <div class="example-code-heading"><span>solution.py</span><button class="copy-button" type="button">Скопировать код</button></div>
        <pre class="code-block"><code></code></pre><p class="worked-example__result"></p>`;
      article.querySelector(".section-label").textContent = example.origin;
      article.querySelector("h3").textContent = example.title;
      article.querySelector(".example-task").textContent = example.task;
      article.querySelector(".example-idea").textContent = `Как работает: ${example.idea}`;
      article.querySelector(".example-change").textContent = `Что менять: ${example.change}`;
      article.querySelector("code").textContent = example.code;
      article.querySelector(".worked-example__result").textContent = `Проверка: ${example.expected}`;
      wireCopy(article.querySelector("button"), example.code);
      root.querySelector("#variation-list").appendChild(article);
    });
  }

  let language = "python";
  const renderTemplate = () => {
    setText("#template-code", codeTemplates[task.codeKey][language]);
    root.querySelectorAll("#code-tabs button").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active);
    });
  };
  languages.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "task-tab";
    button.dataset.language = item.key;
    button.textContent = item.label;
    button.addEventListener("click", () => {
      language = item.key;
      renderTemplate();
    });
    root.querySelector("#code-tabs").appendChild(button);
  });
  renderTemplate();

  [[number - 1, "← Предыдущее"], [number + 1, "Следующее →"]].forEach(([n, label]) => {
    if (n < 1 || n > tasks.length) return;
    const link = document.createElement("a");
    link.className = "button button--ghost";
    link.href = url(n);
    link.textContent = `${label}: ${n}`;
    root.querySelector("#pagination").appendChild(link);
  });
}
