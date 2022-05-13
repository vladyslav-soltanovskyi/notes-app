import { show } from "../utils/animation.js";
import { jsx, render } from "./framework/index.js";
import { template } from "../utils/template.js";

export class Router {
  constructor(selector = ".app", routes) {

    this.app = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.selector = selector;
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  parseUrl(url, routes) {
    let acceptableSymbols = '([0-9a-zA-Z-_]+)';
    
    for(const route of routes) {
      let params = [];

      if (route.path === "*") {
        return [route, params];
      }

      const regExp = route.path.replace(/\{(.*?)\}/g, (match, name) => {
        const key = name.trim();
        params.push([key]);
        return acceptableSymbols;
      });

      const pathRegExp = new RegExp(`^${regExp}$`);
      if (pathRegExp.test(url)) {
        let valuesParams = (url.match(pathRegExp)).slice(1);
        valuesParams.forEach((value, index) => params[index].push(value));
        params = Object.fromEntries(params);
        return [route, params];
      }
    }
  }

  changePageHandler() {
    this.app.innerHTML = '';

    let { hash } = window.location;
    const url = hash.slice(1);
    
    const [route, params] = this.parseUrl(url, this.routes); 
    document.title = template(route.title, params);
    
    render(jsx`<${route.component} params="${params}" />`, this.app);
    
    if (!!this.app?.children?.length) {
      show({
          box: this.app.children[0],
          enter_active: 'enter-active-component',
          enter: 'enter-component'
      });  
    }

  }
}
