import { jsx, Component } from "../core/framework/index.js";
import { convertFullDate } from "../utils/date.js";
import { debounce } from "../utils/debounce.js";
import { statuses } from "../constans/statuses.js";
import Message from "../utils/Message.js";
import noteApi from "../api/notes.service.js";

const initialState = {
    note: {},
    isLoading: false,
    isNotFound: false
}

export default class Note extends Component {

    constructor(props) {
        super(props);

        this.initState(initialState);
    }

    componentDidMount() {
        this.fetchNote();
    }

    debouncedEditNote = debounce(() => this.handleEditNote(), 1000)

    onChange = (e) => {
        const target = e.target;
        this.state.note[target.name] = target.value;
        this.debouncedEditNote();
    }

    fetchNote = async () => {
        try {
            this.state.isLoading = true;
            const note = await noteApi.get(this.props.params.id);
            this.state.note = note;
        } catch (e) {
            this.state.isNotFound = true;
            new Message({ message: "Note not found" });
        } finally {
            this.state.isLoading = false;
        }
    }

    handleEditNote = async () => {
        try {
            const changedNote = await noteApi.edit(this.props.params.id, this.state.note);
            new Message({ message: "Note changed" });
            this.state.note = changedNote;
        } catch (e) {
            new Message({ message: "Error sending" });
        }
    }

    render() {
        const { note, isLoading, isNotFound } = this.state;
        
        if (isLoading) {
            return jsx`<div className="preloader"><div className="lds-dual-ring"></div></div>`
        }
        
        if (isNotFound) {
            return jsx`<div className="screen page-not-found"><h2>Note ${this.props.params.id} not found</h2></div>`
        }

        const { title, content, date, status } = note; 
        
        return (
        jsx`<div className="screen">
            <div className="container note">
                <a href="#dashboard" className="btn-back">
                    <i className="arrow left"></i>
                </a>
                <p className="date">${convertFullDate(date)}</p>
                <div className="container-select">
                    <select name="status" onChange="${this.onChange}">
                        ${statuses.slice(1).map((stat) => jsx`<option selected="${stat.name === status}">${stat.name}</option>`)}
                    </select>
                </div>
                <h2 className="title">
                    <textarea className="field title" placeholder="Any title..." name="title" onInput="${this.onChange}">${title}</textarea>
                </h2>
                <div className="block-note">
                    <textarea className="field" placeholder="Any content..." name="content" onInput="${this.onChange}">${content}</textarea>
                </div>
            </div>
        </div>`
        )
    }
}