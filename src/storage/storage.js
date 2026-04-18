/* storage.js */

const saved = localStorage.getItem("todoStore");

export const store = saved
    ? JSON.parse(saved)
    : {
        default: {
            name: "Default",
            desc: "",
            todos: []
        },
        projects: []
    };

if (!store.default) {
    store.default = { name: "Default", desc: "", todos: [] };
}

if (!store.projects) {
    store.projects = [];
}

export function addProject(name, desc) {
    store.projects.push({ name, desc, todos: [] });
    save();
}

export function deleteProject(index) {
    store.projects.splice(index, 1);
    save();
}

export function editProject(index, newName, newDesc) {
    store.projects[index].name = newName;
    store.projects[index].desc = newDesc;
    save();
}

export function addTodo(projectIndex, title, desc, due, priority) {
    const target = projectIndex === "default" 
        ? store.default 
        : store.projects[projectIndex];
    target.todos.push({ title, desc, due, priority, done: false });
    save();
}

export function deleteTodo(projectIndex, todoIndex) {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    target.todos.splice(todoIndex, 1);
    save();
}

export function editTodo(projectIndex, todoIndex, title, desc, due, priority) {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    target.todos[todoIndex] = { title, desc, due, priority, done: false };
    save();
}

export function toggleDone(projectIndex, todoIndex) {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    target.todos[todoIndex].done = !target.todos[todoIndex].done;
    save();
}

function save() {
    localStorage.setItem("todoStore", JSON.stringify(store));
}