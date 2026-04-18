/* todo_modal.js */
import "../modal/modal.css";
import { format } from "date-fns";

export const todoModal = (() => {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const modalTitle = document.createElement("h2");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("modal-input");
    titleInput.placeholder = "Todo title...";

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.classList.add("modal-input");
    descInput.placeholder = "Description...";

    const dueInput = document.createElement("input");
    dueInput.type = "date";
    dueInput.classList.add("modal-input");

    const prioritySelect = document.createElement("select");
    prioritySelect.classList.add("modal-select");

    const priorities = ["Low", "Medium", "High"];
    priorities.forEach(p => {
        const option = document.createElement("option");
        option.value = p.toLowerCase();
        option.textContent = p;
        prioritySelect.appendChild(option);
    });

    const projectSelect = document.createElement("select");
    projectSelect.classList.add("modal-select");

    const modalBtns = document.createElement("div");
    modalBtns.classList.add("modal-btns");

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("modal-cancel");

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Add";
    confirmBtn.classList.add("modal-confirm");

    modalBtns.appendChild(cancelBtn);
    modalBtns.appendChild(confirmBtn);

    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(titleInput);
    modalContainer.appendChild(descInput);
    modalContainer.appendChild(dueInput);
    modalContainer.appendChild(prioritySelect);
    modalContainer.appendChild(projectSelect);
    modalContainer.appendChild(modalBtns);

    overlay.appendChild(modalContainer);

    function open(mode, projects = [], todo = {}) {
        projectSelect.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "default";
        defaultOption.textContent = "Default";
        projectSelect.appendChild(defaultOption);

        projects.forEach((p) => {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.name;
            projectSelect.appendChild(option);
        });

        if (mode === "edit") {
            modalTitle.textContent = "Edit Todo";
            confirmBtn.textContent = "Save";
            titleInput.value = todo.title || "";
            descInput.value = todo.desc || "";
            dueInput.value = todo.rawDue || "";
            prioritySelect.value = todo.priority || "low";
            projectSelect.value = todo.projectId ?? "default";
        } else {
            modalTitle.textContent = "Add Todo";
            confirmBtn.textContent = "Add";
            titleInput.value = "";
            descInput.value = "";
            dueInput.value = "";
            prioritySelect.value = "low";
            projectSelect.value = "default";
        }
        document.body.appendChild(overlay);
        titleInput.focus();
    }

    function close() {
        overlay.remove();
        titleInput.value = "";
        descInput.value = "";
        dueInput.value = "";
        prioritySelect.value = "low";
        projectSelect.value = "default";
    }

    cancelBtn.addEventListener("click", close);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    function onConfirm(callback) {
        confirmBtn.onclick = () => {
            if (titleInput.value.trim() === "") return;
            const rawDue = dueInput.value;
            const formattedDue = rawDue
                ? format(new Date(rawDue), "MMM dd yyyy")
                : "No due date";
            const newProjectId = projectSelect.value === "default"
                ? "default"
                : parseInt(projectSelect.value);
            callback(
                titleInput.value.trim(),
                descInput.value.trim(),
                formattedDue,
                rawDue,
                prioritySelect.value,
                newProjectId
            );
            close();
        }
    }

    return { open, close, onConfirm };
})();