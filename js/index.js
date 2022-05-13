import { routes } from "./constans/routes.js";
import { Router } from "./core/Router.js";

window.addEventListener("DOMContentLoaded", () => {
  new Router(".app", routes);
});