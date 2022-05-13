import { jsx, Component } from "../core/framework/index.js";
import { statuses } from "../constans/statuses.js";

export default class FilterByStatuses extends Component {

  constructor(props) {
    super(props);
    this.initState({ currentIndex: 0 });
  }

  setIndex = (i) => {
    this.state.currentIndex = i;
    this.props.changeStatus(statuses[i].name);
  }

  render() {
    const { currentIndex } = this.state;

    return jsx`<div className="section">
        <h3 className="title">Statuses:</h3>
        <div className="section-statuses">
          ${statuses.map(
            (status, index) =>
              jsx`<div className="status ${currentIndex === index ? 'active' : ''}" onClick="${() => this.setIndex(index)}">
              <i className="status-circle" style="background-color: ${status.color};"></i>
              ${status.name}
            </div>`
          )}
        </div>
      </div>`;
  }
}
