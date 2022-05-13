import Dashboard from "../pages/Dashboard.js";
import Preview from "../pages/Preview.js";
import Note from "../pages/Note.js";
import PageNotFound from "../pages/PageNotFound.js";

export const routes = [
    {
        path: '',
        component: Preview,
        title: "Preview page"
    },
    {
        path: "dashboard",
        component: Dashboard,
        title: "Dashboard"
    },
    {
        path: "note/{id}",
        component: Note,
        title: "Note {id}"
    },
    {
        path: "*",
        component: PageNotFound,
        title: "404 Page not found"
    }
]