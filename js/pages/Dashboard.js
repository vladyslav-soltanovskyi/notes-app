import LastNoteItem from "../components/LastNoteItem.js";
import FilterByStatutes from "../components/FilterByStatutes.js";
import Notes from "../components/Notes.js";
import Message from "../utils/Message.js";
import Modal from "../components/Modal.js";
import noteApi from "../api//notes.service.js";
import { jsx, Component } from "../core/framework/index.js";

const initialState = {
    notes: [],
    isLoading: true,
    isOpenModal: false,
    status: 'All'
}

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.initState(initialState);
    }
    
    componentDidMount() {
        this.fetchNotes();
    }

    addNote = async (data) => {
        try {
            const note = await noteApi.create(data);
            this.state.notes.push(note);
            new Message({ message: "Note added" });
        } catch (e) {
            new Message({ message: "Error sending" });
        }
    }

    fetchNotes = async () => {
        try {
            this.state.isLoading = true;
            const notes = await noteApi.getAll();
            this.state.notes = notes;
        } catch (e) {
            new Message({ message: "Error on receipt" });
        } finally {
            this.state.isLoading = false;
        }
    }

    handleDeleteNote = async (id) => {
        try {
            await noteApi.delete(id);
            new Message({ message: "Note delete" });
            this.state.notes = this.state.notes.filter(note => note.id !== id);
        } catch (e) {
            new Message({ message: "Error sending" });
        }
    }

    handleEditNote = async (id, data) => {
        try {
            const changedNote = await noteApi.edit(id, data);
            new Message({ message: "Note changed" });
            this.state.notes = this.state.notes.map(note => note.id === id ? changedNote : note);
        } catch (e) {
            new Message({ message: "Error sending" });
        }
    }
    
    setStatus = (status) => {
        this.state.status = status;
    }
    
    showModal = () => {
        this.state.isOpenModal = true;
    }

    toggleModal = () => {
        this.state.isOpenModal = !this.state.isOpenModal;
    }

    hideModal = () => {
        this.state.isOpenModal = false;
    }

    getLastNote() {
        return this.state.notes.at(-1);
    }

    getFilteredNotes = () => {
        return this.state.notes.filter(note => {
            if (this.state.status === "All") {
                return true
            }

            return this.state.status === note.status;
        })
    }

    render() {
        const { isLoading, isOpenModal, status } = this.state;
        
        if (isLoading) {
            return jsx`<div className="preloader"><div className="lds-dual-ring"></div></div>`
        }

        const filteredNotes = this.getFilteredNotes();

        return (
            jsx`<div className="screen">
                <div className="container">
                    <${Modal} onSubmit="${this.addNote}" hideModal="${this.hideModal}" isOpen="${isOpenModal}" />
                    <h2 className="title">My Notes</h2>
                    <${LastNoteItem} note="${this.getLastNote()}" />
                    <${FilterByStatutes} changeStatus="${this.setStatus}" />
                    <div className="section">
                        <h3 className="title">${status} Notes</h3>
                        <${Notes} notes="${filteredNotes}" onDelete="${this.handleDeleteNote}" onEdit="${this.handleEditNote}" />
                    </div>
                    <div className="btn-container">
                        <button className="btn full-width orange" id="add-note" onClick="${this.showModal}">Add Note</button>
                    </div>
                </div>
        </div>`
        )
    }

}