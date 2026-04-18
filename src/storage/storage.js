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
    store.projects.push({ id: Date.now(), name, desc, todos: [] });
    save();
}

export function deleteProject(id) {
    const index = store.projects.findIndex(p => p.id === id);
    if (index !== -1) store.projects.splice(index, 1);
    save();
}

export function editProject(id, newName, newDesc) {
    const project = store.projects.find(p => p.id === id);
    if (project) {
        project.name = newName;
        project.desc = newDesc;
    }
    save();
}

export function addTodo(projectId, title, desc, due, rawDue, priority) {
    const target = projectId === "default"
        ? store.default
        : store.projects.find(p => p.id === projectId);
    target.todos.push({ title, desc, due, rawDue, priority, done: false, projectId });
    save();
}

export function deleteTodo(projectId, todoIndex) {
    const target = projectId === "default"
        ? store.default
        : store.projects.find(p => p.id === projectId);
    target.todos.splice(todoIndex, 1);
    save();
}

export function editTodo(projectId, todoIndex, title, desc, due, rawDue, priority) {
    const target = projectId === "default"
        ? store.default
        : store.projects.find(p => p.id === projectId);
    const done = target.todos[todoIndex].done;
    target.todos[todoIndex] = { title, desc, due, rawDue, priority, done, projectId };
    save();
}   

export function toggleDone(projectId, todoIndex) {
    const target = projectId === "default"
        ? store.default
        : store.projects.find(p => p.id === projectId);
    target.todos[todoIndex].done = !target.todos[todoIndex].done;
    save();
}

function save() {
    localStorage.setItem("todoStore", JSON.stringify(store));
}


// The data on first load
if (store.projects.length === 0 && store.default.todos.length === 0) {
    store.default.todos.push(
        { title: "Buy groceries", desc: "Milk, eggs, bread", due: "Apr 20 2026", rawDue: "2026-04-20", priority: "low", done: false, projectId: "default" },
        { title: "Call the dentist", desc: "Schedule a checkup", due: "Apr 22 2026", rawDue: "2026-04-22", priority: "medium", done: false, projectId: "default" },
        { title: "Pay electricity bill", desc: "Due end of month", due: "Apr 30 2026", rawDue: "2026-04-30", priority: "high", done: false, projectId: "default" }
    );

    const projectId = Date.now();
    store.projects.push({
        id: projectId,
        name: "Work",
        desc: "Work related tasks",
        todos: [
            { title: "Prepare meeting notes", desc: "For the Monday standup", due: "Apr 21 2026", rawDue: "2026-04-21", priority: "high", done: false, projectId }
        ]
    });

    save();
}