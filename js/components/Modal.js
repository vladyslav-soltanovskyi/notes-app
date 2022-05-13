import Validator from "../core/Validator.js";
import { jsx, Component, createPortal } from "../core/framework/index.js";
import { statuses } from "../constans/statuses.js";

const modal = document.querySelector('#modal');

const rules = {
  title: ["require", "minLength|3"],
  status: ["require"],
  text: ["require", "minLength|3"],
};

export default class Modal extends Component {

  constructor(props) {
    super(props);
    
    const { note = { title: '', status: '', text: '' } } = this.props;

    this.initState({
      errors: {},
      isLoading: false,
      data: note
    });
  }

  submitForm = (e) => {
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    const validator = new Validator();

    this.state.data = data;
    
    validator.make(data, rules);

    const errors = validator.fails();

    if (!errors.status) {
      this.state.errors = errors.messages;
      return;
    }

    data = { ...data, date: new Date()};

    this.state.isLoading = true;
    this.props.onSubmit(data).then(() => {
      this.state.data = { title: '', status: '', text: '' };
      this.props.hideModal();
    }).finally(() => {
      this.state.isLoading = false;
    });
  };

  render() {
    const { hideModal, isOpen } = this.props;
    const { errors, data, isLoading } = this.state;

    return createPortal(isOpen ? jsx`<div className="overlay" onClick="${hideModal}">
      <div className="modal" onClick="${(e) => e.stopPropagation()}">
        <div className="modal-header">
            <h3 className="title">New Note</h3>
        </div>
        <div className="modal-main">
            <div className="modal-content">
                <form onSubmit="${this.submitForm}">
                    <div className="form-group">
                        <label for="title">TITLE</label>
                        <input className="form-input ${!!errors.title ? 'error' : ''}" type="text" id="title" name="title" value="${data.title}" />
                        <div className="error-text">${!!errors.title ? errors.title : ''}</div>
                    </div>
                    <div className="form-group">
                        <label for="status">STATUS</label>
                        <select className="form-input ${!!errors.status ? 'error' : ''}" id="status" name="status" value="${data.status}">
                          ${statuses.slice(1).map((status) => jsx`<option>${status.name}</option>`)}
                        </select>
                        <div className="error-text">${!!errors.status ? errors.status : ''}</div>
                    </div>
                    <div className="form-group">
                        <label for="text">CONTENT</label>
                        <input className="form-input ${!!errors.text ? 'error' : ''}" type="text" id="text" name="text" value="${data.text}" />
                        <div className="error-text">${!!errors.text ? errors.text : ''}</div>
                    </div>
                    <div className="modal-btn-actions">
                        <button className="btn cancle" type="button" onClick="${hideModal}">Cancle</button>
                        <button className="btn sx orange ${ isLoading ? 'disabled' : ''}" disabled="${isLoading}" id="submit" type="submit">${ isLoading ? '...Sending' : 'Send'}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>` : jsx`<div></div>`, modal);
  }
}