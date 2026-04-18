/* main_page */
import "../modal/modal.css";
import "./main_page.css"
import doneIcon from "../icons/done.svg";
import editIcon from "../icons/edit.svg";
import addIcon from "../icons/add.svg";
import deleteIcon from "../icons/delete.svg"

export const main_header = (() => {
    const header = document.createElement("div");
    header.classList.add("header");

    const main_title = document.createElement("h1");
    const main_desc = document.createElement("p");

    function setContent(title, desc) {
        main_title.textContent = title;
        main_desc.textContent = desc;
    }
    setContent("Default", "")

    header.appendChild(main_title);
    header.appendChild(main_desc);

    return { container: header, setContent };
})();

export const main_content = (() => {
    const content = document.createElement("div");
    content.classList.add("content");

    const priorityColors = {
        low: "#4caf50",
        medium: "#ff9800",
        high: "#f44336"
    };

    function createCard(todo, onEdit, onDelete, onDone) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.borderLeft = `4px solid ${priorityColors[todo.priority]}`;

        if (todo.done) card.classList.add("card-done");

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const cardTitle = document.createElement("h2");
        cardTitle.textContent = todo.title;

        const cardDesc = document.createElement("p");
        cardDesc.textContent = `Description : ${todo.desc}`;

        const cardDue = document.createElement("p");
        cardDue.textContent = `Due : ${todo.due}`;

        cardText.appendChild(cardTitle);
        cardText.appendChild(cardDesc);
        cardText.appendChild(cardDue);

        const cardIcons = document.createElement("div");
        cardIcons.classList.add("card-icons");

        const cardEdit = document.createElement("img");
        cardEdit.src = editIcon;
        cardEdit.title = "Edit";

        const cardCheck = document.createElement("img");
        cardCheck.src = doneIcon;
        cardCheck.title = "Done";

        const cardDelete = document.createElement("img");
        cardDelete.src = deleteIcon;
        cardDelete.title = "Delete";

        cardEdit.addEventListener("click", () => onEdit && onEdit());
        cardCheck.addEventListener("click", () => onDone && onDone(card));
        cardDelete.addEventListener("click", () => {
            onDelete && onDelete();
            card.remove();
        });

        cardIcons.appendChild(cardEdit);
        cardIcons.appendChild(cardDelete);
        cardIcons.appendChild(cardCheck);

        card.appendChild(cardText);
        card.appendChild(cardIcons);

        return card;
    }

    function createGroup(name, todos, onAddTodo, onEdit, onDelete, onDone, showTitle = true) {
        const group = document.createElement("div");
        group.classList.add("card-group");

        if (showTitle) {
            const groupTitle = document.createElement("h3");
            groupTitle.classList.add("group-title");
            groupTitle.textContent = name;
            group.appendChild(groupTitle);
        }

        todos.forEach((todo, i) => {
            const card = createCard(
                todo,
                () => onEdit && onEdit(i),
                () => onDelete && onDelete(i),
                () => onDone && onDone(i, card)
            );
            group.appendChild(card);
        });

        if (onAddTodo) {
            const addTodoBtn = document.createElement("img");
            addTodoBtn.src = addIcon;
            addTodoBtn.classList.add("add-card-icon");
            addTodoBtn.title = "Add Todo";
            addTodoBtn.addEventListener("click", onAddTodo);
            group.appendChild(addTodoBtn);
        }

        return group;
    }

    function render(store, filter = "default", activeProjectId = null) {
        content.innerHTML = "";

        const today = new Date().toDateString();

        if (filter === "project" && activeProjectId !== null) {
            const project = store.projects.find(p => p.id === activeProjectId);
            const group = createGroup(
                project.name,
                project.todos,
                () => addTodoCallback(activeProjectId),
                (i) => editTodoCallback(activeProjectId, i),
                (i) => deleteTodoCallback(activeProjectId, i),
                (i, card) => doneTodoCallback(activeProjectId, i, card),
                false
            );
            content.appendChild(group);
            return;
        }

        const allGroups = [
            { name: store.default.name, todos: store.default.todos, id: "default" },
            ...store.projects.map((p) => ({ name: p.name, todos: p.todos, id: p.id }))
        ];

        allGroups.forEach(({ name, todos, id }) => {
            let filteredTodos = todos;

            if (filter === "today") {
                filteredTodos = todos.filter(t =>
                    t.due !== "No due date" && new Date(t.due).toDateString() === today
                );
            } else if (filter === "upcoming") {
                filteredTodos = todos.filter(t =>
                    t.due !== "No due date" && new Date(t.due) > new Date()
                );
            }

            if (filter !== "default" && filteredTodos.length === 0) return;

            const group = createGroup(
                name,
                filteredTodos,
                filter === "default" ? () => addTodoCallback(id) : null,
                (i) => editTodoCallback(id, i),
                (i) => deleteTodoCallback(id, i),
                (i, card) => doneTodoCallback(id, i, card)
            );

            content.appendChild(group);
        });
    }

    let addTodoCallback = () => {};
    let editTodoCallback = () => {};
    let deleteTodoCallback = () => {};
    let doneTodoCallback = () => {};

    function onAddTodo(cb) { addTodoCallback = cb; }
    function onEditTodo(cb) { editTodoCallback = cb; }
    function onDeleteTodo(cb) { deleteTodoCallback = cb; }
    function onDoneTodo(cb) { doneTodoCallback = cb; }

    return { container: content, render, onAddTodo, onEditTodo, onDeleteTodo, onDoneTodo };
})();