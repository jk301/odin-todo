/* todo_modal.js */
import "../modal/modal.css";
import { format } from "date-fns";

export const todoModal = (() => {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Add Todo";

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
    modalContainer.appendChild(modalBtns);

    overlay.appendChild(modalContainer);

    function open(mode, todo = {}) {
        if (mode === "edit") {
            modalTitle.textContent = "Edit Todo";
            confirmBtn.textContent = "Save";
            titleInput.value = todo.title || "";
            descInput.value = todo.desc || "";
            dueInput.value = todo.due || "";
            prioritySelect.value = todo.priority || "low";
        } else {
            modalTitle.textContent = "Add Todo";
            confirmBtn.textContent = "Add";
            titleInput.value = "";
            descInput.value = "";
            dueInput.value = "";
            prioritySelect.value = "low";
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
    }

    cancelBtn.addEventListener("click", close);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    function onConfirm(callback) {
        confirmBtn.onclick = () => {
            if (titleInput.value.trim() === "") return;
            const formattedDue = dueInput.value
                ? format(new Date(dueInput.value), "MMM dd yyyy")
                : "No due date";
            callback(
                titleInput.value.trim(),
                descInput.value.trim(),
                formattedDue,
                prioritySelect.value
            );
            close();
        }
    }

    return { open, close, onConfirm };
})();