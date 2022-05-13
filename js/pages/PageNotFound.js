import { Component, jsx } from "../core/framework/index.js";

export default class PageNotFound extends Component {
    render() {
        return (
            jsx`<div className="screen page-not-found">
                <h2>404 Page Not Found</h2>
            </div>`
        )
    }
}