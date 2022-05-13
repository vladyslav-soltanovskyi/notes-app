import { jsx, Component } from "../core/framework/index.js";
import { convertDate, convertFullDate } from "../utils/date.js";

export default class LastNoteItem extends Component {
  render() {
    
    if (!this.props.note) {
      return jsx`<div></div>`;
    }

    const { note } = this.props;
    const { date, content } = note;

    return (
      jsx`<div className="section">
        <h3 className="title">Last Note</h3>
        <div className="block">
            <div className="block-poster">
                <img src="images/Rectangle 6.png" alt="" />
            </div>
            <div className="block-info">
                <h3 className="title">Important information</h3>
                <p className="date" title="${convertFullDate(date)}">${convertDate(date)}</p>
                <p className="text">${content.length > 60 ? `${content}...` : content}</p>
            </div>
        </div>
      </div>`
    )
  }
  
}
