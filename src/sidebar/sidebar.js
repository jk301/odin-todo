/* sidebar.js */ 
import "./sidebar.css"
import plusIcon from "../icons/add.svg"
import deleteIcon from "../icons/delete.svg"
import editIcon from "../icons/edit.svg"

export const sidebar = (() => {
    const sidebarContainer = document.createElement("div");
    sidebarContainer.classList.add("sidebar-container");

    const defaultTabs = document.createElement("div");
    defaultTabs.classList.add("default-tabs");

    const tabs = ["Default", "Today", "Upcoming"];
    tabs.forEach(tab => {
        const tabDiv = document.createElement("div");
        tabDiv.textContent = tab;
        tabDiv.classList.add("tab-div");
        defaultTabs.appendChild(tabDiv);
    });

    const projectsTitle = document.createElement("h2");
    projectsTitle.classList.add("project-title");
    projectsTitle.textContent = "Your projects";

    const projectsList = document.createElement("div");
    projectsList.classList.add("projects-list");

    sidebarContainer.appendChild(defaultTabs);
    sidebarContainer.appendChild(projectsTitle);
    sidebarContainer.appendChild(projectsList);

    function addProject(name, onClick = () => {}, onEdit = () => {}, onDelete = () => {}) {
        const newProj = document.createElement("div");
        newProj.classList.add("project-divs");

        const projName = document.createElement("span");
        projName.textContent = name;

        const projIcons = document.createElement("div");
        projIcons.classList.add("project-icons");

        const projEdit = document.createElement("img");
        projEdit.src = editIcon;
        projEdit.title = "Edit Project";

        const projDelete = document.createElement("img");
        projDelete.src = deleteIcon;
        projDelete.title = "Delete Project";

        projIcons.appendChild(projEdit);
        projIcons.appendChild(projDelete);

        newProj.appendChild(projName);
        newProj.appendChild(projIcons);

        newProj.addEventListener("click", (e) => {
            if (e.target.closest(".project-icons")) return;
            onClick();
        });

        projEdit.addEventListener("click", () => onEdit((newName) => {
            projName.textContent = newName;
        }));

        projDelete.addEventListener("click", () => {
            onDelete();
            newProj.remove();
        });

        projectsList.appendChild(newProj);
        }

    return { container: sidebarContainer, addProject };
})()

const addIcon = document.createElement("img");
addIcon.src = plusIcon;
addIcon.classList.add("add-project-icon");
addIcon.title = "Add Project";

sidebar.container.appendChild(addIcon);