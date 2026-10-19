const STORAGE_KEY = "happyaicoding-todos";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const countEl = document.querySelector("#todo-count");
const emptyHint = document.querySelector("#empty-hint");
const clearCompletedBtn = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

if (form && input && list && countEl && emptyHint && clearCompletedBtn) {
  let todos = loadTodos();
  let filter = "all";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    todos.unshift({
      id: crypto.randomUUID(),
      title,
      completed: false,
    });
    input.value = "";
    persistAndRender();
    input.focus();
  });

  list.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = item.dataset.id;

    if (event.target.matches('input[type="checkbox"]')) {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: event.target.checked } : todo
      );
      persistAndRender();
      return;
    }

    if (event.target.matches(".delete")) {
      todos = todos.filter((todo) => todo.id !== id);
      persistAndRender();
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      render();
    });
  });

  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    persistAndRender();
  });

  function persistAndRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    render();
  }

  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function render() {
    const visible = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    list.innerHTML = visible
      .map(
        (todo) => `
          <li class="todo-item${todo.completed ? " completed" : ""}" data-id="${todo.id}">
            <input type="checkbox" ${todo.completed ? "checked" : ""} aria-label="完成：${escapeHtml(todo.title)}" />
            <span class="todo-title">${escapeHtml(todo.title)}</span>
            <button type="button" class="delete" aria-label="删除：${escapeHtml(todo.title)}">删</button>
          </li>
        `
      )
      .join("");

    const remaining = todos.filter((todo) => !todo.completed).length;
    countEl.textContent = `${remaining} 项待办`;
    emptyHint.textContent = todos.length
      ? visible.length
        ? `${todos.length} 项任务`
        : "这个筛选下没有任务"
      : "还没有任务。先写一件小事。";

    filterButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  render();
}
