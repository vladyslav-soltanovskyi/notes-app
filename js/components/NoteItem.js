import { jsx, Component } from "../core/framework/index.js";
import { convertTime, convertFullDate } from "../utils/date.js";
import { statuses } from "../constans/statuses.js";

export default class NoteItem extends Component {
  constructor(props) {
    super(props);
    this.initState({ isOpenedActions: false });
  }

  getColorByStatus = () => {
    const status = statuses.find(status => status.name === this.props.note.status);
    return status?.color;
  }

  handleDelete = (id) => {
    this.props.onDelete(id).then(() => {
      this.toggleActions();
    });
  }

  toggleActions = () => {
    this.state.isOpenedActions = !this.state.isOpenedActions;
  }

  render() {
    const { note } = this.props;
    const { date, title, id } = note;
    const { isOpenedActions } = this.state;


    return (
      jsx`<div className="block-item">
        <div className="date" title="${convertFullDate(date)}">${convertTime(date)}</div>
        <div className="status" style="background: ${this.getColorByStatus()}"></div>
        <div className="text"><a className="text" href="#note/${id}">${title}</a></div>
        <div className="block-item-actions ${isOpenedActions ? 'show' : ''}">
            <button className="btn-dots" onClick="${this.toggleActions}">
                <svg xmlns="http://www.w3.org/2000/svg"><path d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4zm0 9.6a2.2 2.2 0 1 0 0 4.402 2.2 2.2 0 0 0 0-4.402z"/></svg>
            </button>
            <div className="block-actions">
                <div className="action" onClick="${() => this.handleDelete(id)}">Delete</div>
            </div>
        </div>
      </div>`
    )
  }
}
