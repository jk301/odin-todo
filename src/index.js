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

// current filter state
let currentFilter = "default";
let activeProject = null;

// initial render
main_content.render(store, currentFilter, activeProject);

// tab switching
const tabs = document.querySelectorAll(".tab-div");
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        currentFilter = tab.textContent.toLowerCase();
        activeProject = null;
        main_header.setContent(tab.textContent, "");
        main_content.render(store, currentFilter, activeProject);
    });
});

// add project
const addProjectIcon = document.querySelector(".add-project-icon");
addProjectIcon.addEventListener("click", () => {
    modal.open("add");
    modal.onConfirm((name, desc) => {
        addProject(name, desc);
        const index = store.projects.length - 1;
        sidebar.addProject(name,
            () => {
                currentFilter = "project";
                activeProject = index;
                main_header.setContent(name, desc);
                main_content.render(store, "project", index);
            },
            (updateName) => {
                modal.open("edit", name, desc);
                modal.onConfirm((newName, newDesc) => {
                    editProject(index, newName, newDesc);
                    updateName(newName);
                    main_header.setContent(newName, newDesc);
                    main_content.render(store, currentFilter, activeProject);
                });
            },
            () => {
                deleteProject(index);
                currentFilter = "default";
                activeProject = null;
                main_header.setContent("Default", "");
                main_content.render(store, currentFilter, activeProject);
            }
        );
    });
});

// add todo
main_content.onAddTodo((projectIndex) => {
    todoModal.open("add", store.projects);
    todoModal.onConfirm((title, desc, due, priority, projectIndex) => {
        addTodo(projectIndex, title, desc, due, priority);
        main_content.render(store, currentFilter, activeProject);
    });
});

// edit todo
main_content.onEditTodo((projectIndex, todoIndex) => {
    const target = projectIndex === "default"
        ? store.default
        : store.projects[projectIndex];
    const todo = target.todos[todoIndex];
    todoModal.open("edit", store.projects, todo);
    todoModal.onConfirm((title, desc, due, priority, projectIndex) => {
        editTodo(projectIndex, todoIndex, title, desc, due, priority);
        main_content.render(store, currentFilter, activeProject);
    });
});

// delete todo
main_content.onDeleteTodo((projectIndex, todoIndex) => {
    deleteTodo(projectIndex, todoIndex);
    main_content.render(store, currentFilter, activeProject);
});

// done todo
main_content.onDoneTodo((projectIndex, todoIndex, card) => {
    toggleDone(projectIndex, todoIndex);
    card.classList.toggle("card-done");
});