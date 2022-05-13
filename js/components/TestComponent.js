import { Component, jsx } from "../core/framework/index.js";

export default class TestComponent extends Component {
    constructor(props) {
        super(props);

        this.initState({
            count: 5
        });
        // console.log(this.props, this._state)
    }

    increament = () => {
        this.state.count += 1;
    }

    render() {
        return (
            jsx`<div>
            ${this.state.count}
            <button onClick="${this.increament}">add</button>
            </div>`
        )
    }
}