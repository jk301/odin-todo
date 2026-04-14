/* modal.js */
import "./modal.css";

export const modal = (() => {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const modalTitle = document.createElement("h2");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("modal-input");
    input.placeholder = "Project name...";

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.classList.add("modal-input");
    descInput.placeholder = "Project description...";

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
    modalContainer.appendChild(input);
    modalContainer.appendChild(descInput);
    modalContainer.appendChild(modalBtns);

    overlay.appendChild(modalContainer);

    function open(mode, currentName = "", currentDesc = "") {
        if (mode === "edit") {
            modalTitle.textContent = "Edit Project";
            confirmBtn.textContent = "Save";
            input.value = currentName;
            descInput.value = currentDesc;
        } else {
            modalTitle.textContent = "Add Project";
            confirmBtn.textContent = "Add";
            input.value = "";
            descInput.value = "";
        }
        document.body.appendChild(overlay);
        input.focus();
    }
    
    function close() {
        overlay.remove();
        input.value = "";
        descInput.value = "";
    }

    cancelBtn.addEventListener("click", close);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    function onConfirm(callback) {
        confirmBtn.onclick = () => {
            if (input.value.trim() === "") return;
            callback(input.value.trim(), descInput.value.trim());
            close();
        }
    }

    return { open, close, onConfirm };
})();