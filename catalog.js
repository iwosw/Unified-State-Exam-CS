const taskUrl = (number) => `tasks/${String(number).padStart(2, "0")}.html`;
const state = { query: "", type: "all" };
const grid = document.getElementById("task-grid");
const counter = document.getElementById("tasks-counter");
const tags = document.getElementById("type-tags");

tasks.forEach((task) => {
  const link = document.createElement("a");
  link.href = taskUrl(task.number);
  link.textContent = task.number;
  link.setAttribute("aria-label", `Задание ${task.number}: ${task.title}`);
  document.getElementById("quick-nav").appendChild(link);
});

function renderTypes() {
  tags.replaceChildren();
  [["all", "Все"], ...new Set(tasks.map((task) => task.type))].forEach((entry) => {
    const [type, label] = Array.isArray(entry) ? entry : [entry, typeLabels[entry]];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${state.type === type ? " is-active" : ""}`;
    button.textContent = label;
    button.setAttribute("aria-pressed", state.type === type);
    button.addEventListener("click", () => {
      state.type = type;
      renderTypes();
      renderTasks();
    });
    tags.appendChild(button);
  });
}

function renderTasks() {
  grid.replaceChildren();
  const visible = tasks.filter((task) => {
    if (state.type !== "all" && task.type !== state.type) return false;
    const photos = pythonExamples.filter((example) => example.number === task.number);
    const searchText = [task.number, task.title, task.summary, typeLabels[task.type],
      ...task.points, ...task.condition, ...task.steps,
      ...photos.flatMap((example) => [example.title, example.task, example.category])].join(" ").toLowerCase();
    const words = searchText.match(/[\p{L}\p{N}]+/gu) || [];
    return state.query.split(/\s+/).every((part) => words.some((word) => word.startsWith(part)));
  });
  counter.textContent = `Показано: ${visible.length} из ${tasks.length}`;

  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "task-summary";
    empty.textContent = "Ничего не найдено. Попробуй другой номер или сбрось фильтр.";
    grid.appendChild(empty);
  }

  visible.forEach((task) => {
    const fragment = document.getElementById("task-card-template").content.cloneNode(true);
    const card = fragment.querySelector(".task-card");
    card.id = `task-${task.number}`;
    fragment.querySelector(".task-number").textContent = `Задание ${task.number}`;
    fragment.querySelector(".task-title").textContent = task.title;
    fragment.querySelector(".task-type").textContent = typeLabels[task.type];
    fragment.querySelector(".task-summary").textContent = task.summary;
    const points = fragment.querySelector(".task-points");
    task.points.forEach((point) => {
      const badge = document.createElement("span");
      badge.textContent = point;
      points.appendChild(badge);
    });
    fragment.querySelector(".task-card__link").href = taskUrl(task.number);
    grid.appendChild(fragment);
  });
}

document.getElementById("task-search").addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  renderTasks();
});

renderTypes();
renderTasks();
