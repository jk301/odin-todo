/* index.js */
import "./styles.css";
import { sidebar } from "./sidebar/sidebar.js";
import { main_header, main_content } from "./main_page/main_page.js";
import { modal } from "./modal/modal.js";
import { todoModal } from "./todo_modal/todo_modal.js";
import { store, addProject, deleteProject, editProject, addTodo, deleteTodo, editTodo, toggleDone } from "./storage/storage.js";

document.body.append(sidebar.container);

const mainBody = document.createElement("div");
mainBody.classList.add("main-body");
document.body.appendChild(mainBody);

mainBody.appendChild(main_header.container);
mainBody.appendChild(main_content.container);

let currentFilter = "default";
let activeProjectId = null;

main_content.render(store, currentFilter, activeProjectId);

// load saved projects into sidebar
store.projects.forEach((project) => {
    sidebar.addProject(
        project.name,
        () => {
            currentFilter = "project";
            activeProjectId = project.id;
            main_header.setContent(project.name, project.desc);
            main_content.render(store, "project", project.id);
        },
        (updateName) => {
            modal.open("edit", store.projects.find(p => p.id === project.id).name, store.projects.find(p => p.id === project.id).desc);
            modal.onConfirm((newName, newDesc) => {
                editProject(project.id, newName, newDesc);
                updateName(newName);
                main_header.setContent(newName, newDesc);
                main_content.render(store, currentFilter, activeProjectId);
            });
        },
        () => {
            deleteProject(project.id);
            currentFilter = "default";
            activeProjectId = null;
            main_header.setContent("Default", "");
            main_content.render(store, currentFilter, activeProjectId);
        }
    );
});

// tab switching
const tabs = document.querySelectorAll(".tab-div");
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        currentFilter = tab.textContent.toLowerCase();
        activeProjectId = null;
        main_header.setContent(tab.textContent, "");
        main_content.render(store, currentFilter, activeProjectId);
    });
});

// add project
const addProjectIcon = document.querySelector(".add-project-icon");
addProjectIcon.addEventListener("click", () => {
    modal.open("add");
    modal.onConfirm((name, desc) => {
        addProject(name, desc);
        const project = store.projects[store.projects.length - 1];
        sidebar.addProject(name,
            () => {
                currentFilter = "project";
                activeProjectId = project.id;
                main_header.setContent(project.name, project.desc);
                main_content.render(store, "project", project.id);
            },
            (updateName) => {
                modal.open("edit", store.projects.find(p => p.id === project.id).name, store.projects.find(p => p.id === project.id).desc);
                modal.onConfirm((newName, newDesc) => {
                    editProject(project.id, newName, newDesc);
                    updateName(newName);
                    main_header.setContent(newName, newDesc);
                    main_content.render(store, currentFilter, activeProjectId);
                });
            },
            () => {
                deleteProject(project.id);
                currentFilter = "default";
                activeProjectId = null;
                main_header.setContent("Default", "");
                main_content.render(store, currentFilter, activeProjectId);
            }
        );
    });
});

// add todo
main_content.onAddTodo((projectId) => {
    todoModal.open("add", store.projects);
    todoModal.onConfirm((title, desc, due, rawDue, priority, newProjectId) => {
        addTodo(newProjectId, title, desc, due, rawDue, priority);
        main_content.render(store, currentFilter, activeProjectId);
    });
});

// edit todo
main_content.onEditTodo((projectId, todoIndex) => {
    const target = projectId === "default"
        ? store.default
        : store.projects.find(p => p.id === projectId);
    const todo = target.todos[todoIndex];
    todoModal.open("edit", store.projects, todo);
    todoModal.onConfirm((title, desc, due, rawDue, priority, newProjectId) => {
        editTodo(newProjectId, todoIndex, title, desc, due, rawDue, priority);
        main_content.render(store, currentFilter, activeProjectId);
    });
});

// delete todo
main_content.onDeleteTodo((projectId, todoIndex) => {
    deleteTodo(projectId, todoIndex);
    main_content.render(store, currentFilter, activeProjectId);
});

// done todo
main_content.onDoneTodo((projectId, todoIndex, card) => {
    toggleDone(projectId, todoIndex);
    card.classList.toggle("card-done");
});