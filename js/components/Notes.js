import { jsx, Component } from "../core/framework/index.js";
import NoteItem from "./NoteItem.js";

export default class Notes extends Component {

  render() {
    const { notes, onDelete = () => {}, onEdit = () => {} } = this.props;

    return jsx`<div className="block" id="block-notes">
      ${
        !notes.length
          ? jsx`You dont't have any notes yet`
          : notes.map(
              (note) =>
                jsx`<${NoteItem} note="${note}" onDelete="${onDelete}" onEdit="${onEdit}" />`
            )
      }
      </div>`;
  }
}
