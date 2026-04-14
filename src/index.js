/* index.js */
import "./styles.css";
import { sidebar } from "./sidebar/sidebar.js";
import { main_header, main_content } from "./main_page/main_page.js";
import { modal } from "./modal/modal.js";
import { todoModal } from "./todo_modal/todo_modal.js";
import { projects, addProject, deleteProject, editProject } from "./storage/storage.js";

document.body.append(sidebar.container);

const mainBody = document.createElement("div");
mainBody.classList.add("main-body");
document.body.appendChild(mainBody);

mainBody.appendChild(main_header.container);
mainBody.appendChild(main_content.container);

// add project
const addProjectIcon = document.querySelector(".add-project-icon");
addProjectIcon.addEventListener("click", () => {
    modal.open("add");
    modal.onConfirm((name, desc) => {
        addProject(name, desc);
        const index = projects.length - 1;
        sidebar.addProject(name,
            () => main_header.setContent(name, desc),
            (updateName) => {
                modal.open("edit", name, desc);
                modal.onConfirm((newName, newDesc) => {
                    editProject(index, newName, newDesc);
                    updateName(newName);
                    main_header.setContent(newName, newDesc);
                });
            },
            () => deleteProject(index)
        );
    });
});

// add todo
main_content.addBtn.addEventListener("click", () => {
    todoModal.open("add");
    todoModal.onConfirm((title, desc, due, priority) => {
        main_content.createCard(title, desc, due, priority);
    });
});