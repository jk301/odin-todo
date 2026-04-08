/* index.js */
import "./styles.css";
import { sidebar } from "./sidebar/sidebar.js";

const sidebarContent = sidebar;
document.body.append(sidebarContent.container);

