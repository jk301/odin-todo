/* index.js */
import "./styles.css";
import { sidebar } from "./sidebar/sidebar.js";
import { main_header, main_content } from "./main_page/main_page.js";

const sidebarContent = sidebar;
const mainHeader = main_header;
const mainContent = main_content;

document.body.append(sidebarContent.container);

const mainBody = document.createElement("div");
mainBody.classList.add("main-body");
document.body.appendChild(mainBody);

sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");
sidebarContent.addProject("projects 1");   




mainBody.appendChild(mainHeader.container);
mainBody.appendChild(mainContent.container);

mainContent.createCard("title", "description", "due", "priority");
mainContent.createCard("title", "description", "due", "priority");
mainContent.createCard("title", "description", "due", "priority");
mainContent.createCard("title", "description this is a long one that might break the link barrier of the card", "due", "priority");
mainContent.createCard("title", "description", "due", "priority");
mainContent.createCard("title", "description", "due", "priority");
mainContent.createCard("title", "description", "due", "priority");
mainContent.createCard("title", "description", "due", "priority");

