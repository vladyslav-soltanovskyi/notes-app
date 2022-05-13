import { jsx, Component } from "../core/framework/index.js";

export default class Preview extends Component {

  render() {
    return jsx`<div className="screen preview">
      <div className="circle"></div>
      <div className="title">NOTES MOTICH</div>
      <div className="boy"></div>
      <div className="girl"></div>
      <div className="btn-container">
          <a href="#dashboard">
              <button className="btn full-width white">Get Started</button>
          </a>
      </div>
    </div>`
  }
}