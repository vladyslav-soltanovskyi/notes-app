import { jsx, Component } from "../core/framework/index.js";
export default class Post extends Component {
  render() {
    const { params } = this.props;

    return (
      jsx`<div>${Object.keys(params).map(key => (
        jsx`<p>${key} = ${params[key]}</p>`
      ))}</div>`
    )
  }
}
