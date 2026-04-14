/* main_page */
import "../modal/modal.css";
import "./main_page.css"
import doneIcon from "../icons/done.svg";
import editIcon from "../icons/edit.svg";
import addIcon from "../icons/add.svg";

export const main_header = (() => {
    const header = document.createElement("div");
    header.classList.add("header");

    const main_title = document.createElement("h1");
    const main_desc = document.createElement("p");

    function setContent(title, desc) {
        main_title.textContent = title;
        main_desc.textContent = desc;
    }
    setContent("example title", "example description yes")

    header.appendChild(main_title);
    header.appendChild(main_desc);

    return { container : header, setContent };
})();

export const main_content = (() => {
    const content = document.createElement("div");
    content.classList.add("content");

    const priorityColors = {
        low: "#4caf50",
        medium: "#ff9800",
        high: "#f44336"
    };

    function createCard(title, desc, due, priority) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.borderLeft = `4px solid ${priorityColors[priority]}`;

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const cardTitle = document.createElement("h2");
        cardTitle.textContent = title;

        const cardDesc = document.createElement("p");
        cardDesc.textContent = `Description : ${desc}`;

        const cardDue = document.createElement("p");
        cardDue.textContent = `Due : ${due}`;

        cardText.appendChild(cardTitle);
        cardText.appendChild(cardDesc);
        cardText.appendChild(cardDue);

        const cardIcons = document.createElement("div");
        cardIcons.classList.add("card-icons");

        const cardCheck = document.createElement("img");
        cardCheck.src = doneIcon;

        const cardEdit = document.createElement("img");
        cardEdit.src = editIcon;

        cardIcons.appendChild(cardEdit);
        cardIcons.appendChild(cardCheck);

        card.appendChild(cardText);
        card.appendChild(cardIcons);

        content.insertBefore(card, addBtn);
    }

    const addBtn = document.createElement("img");
    addBtn.src = addIcon;
    addBtn.classList.add("add-card-icon");
    addBtn.title = "Add ToDo";
    content.appendChild(addBtn);

    return { container: content, createCard, addBtn }
})();