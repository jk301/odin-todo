/* sidebar.js */ 
import "./sidebar.css"
import plusIcon from "../icons/add.svg"

export const sidebar = (() => {
    const sidebarContainer = document.createElement("div");
    sidebarContainer.classList.add("sidebar-container");

    const title = document.createElement("h1");
    title.textContent = "Todalo";

    const defaults = document.createElement("div");
    defaults.textContent = "Defaults";
    defaults.classList.add("project-divs");

    const projectsList = document.createElement("div");
    projectsList.classList.add("projects-list");

    projectsList.appendChild(defaults);
    // append projects to projectsList instead of sidebarContainer

    sidebarContainer.appendChild(title);
    sidebarContainer.appendChild(projectsList);
    // icon appended to sidebarContainer directly, not projectsList

    function addProject(name) {
        const newProj = document.createElement("div");
        newProj.textContent = name;
        newProj.classList.add("project-divs");
        projectsList.appendChild(newProj);
    }

    return { container: sidebarContainer, addProject};
})()

const addIcon = document.createElement("img");
addIcon.src = plusIcon;
addIcon.classList.add("add-project-icon");

sidebar.container.appendChild(addIcon);

