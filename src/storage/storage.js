/* storage.js */

export let projects = [];

export function addProject(name, desc) {
    projects.push({ name, desc, todos: [] });
}

export function deleteProject(index) {
    projects.splice(index, 1);
}

export function editProject(index, newName) {
    projects[index].name = newName;
}