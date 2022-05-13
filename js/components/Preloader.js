import { jsx, Component } from "../core/framework/index.js";

export default class Preloader extends Component {
    render() {
        return jsx`<div className="preloader"><div className="lds-dual-ring"></div></div>`
    }
}