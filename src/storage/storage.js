/* storage.js */

export const store = {
    default: {
        name: "Default",
        desc: "",
        todos: []
    },
    projects: []
};

export function addProject(name, desc) {
    store.projects.push({ name, desc, todos: [] });
}

export function deleteProject(index) {
    store.projects.splice(index, 1);
}

export function editProject(index, newName, newDesc) {
    store.projects[index].name = newName;
    store.projects[index].desc = newDesc;
}

export function addTodo(projectIndex, title, desc, due, priority) {
    const target = projectIndex === "default" 
        ? store.default 
        : store.projects[projectIndex];
    target.todos.push({ title, desc, due, priority, done: false });
}

export function deleteTodo(projectIndex, todoIndex) {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    target.todos.splice(todoIndex, 1);
}

export function editTodo(projectIndex, todoIndex, title, desc, due, priority) {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    target.todos[todoIndex] = { title, desc, due, priority, done: false };
}

export function toggleDone(projectIndex, todoIndex) {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    target.todos[todoIndex].done = !target.todos[todoIndex].done;
}