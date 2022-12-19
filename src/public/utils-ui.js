import { deleteNote, getNoteById, saveNote, updateNote } from './socket.js';

const notesList = document.querySelector('#notes');
const name = document.querySelector('#name');
const quantity = document.querySelector('#quantity');
const text = document.querySelector('#text');

let saveId = '';

const noteUI = note => {
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${note.name}</h1>
            <p>${note.quantity}</p>
            <p>${note.text}</p>
            <div>
                <button class="update" data-id="${note._id}">Update</button>
                <button class="delete" data-id="${note._id}">Delete</button>
            </div>
        </div>
    `;

    const btnDelete = div.querySelector('.delete');
    btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id));

    const btnUpdate = div.querySelector('.update');    
    btnUpdate.addEventListener('click', e => getNoteById(btnUpdate.dataset.id));

    return div;
};

export const renderNotes = notes => {
    notesList.innerHTML = '';
    notes.forEach(note => notesList.append(noteUI(note)));
};

export const fillForm = note => {
    name.value = note.name;
    quantity.value = note.quantity;
    text.value = note.text;

    saveId = note._id;
};

export const onHandleSubmit = event => {
    event.preventDefault();

    if (saveId) {
        updateNote(saveId, name.value, quantity.value, text.value);
    } else {
        
        saveNote(name.value, quantity.value, text.value);
    }   

    name.value = '';
    quantity.value = '';
    text.value = '';
    saveId = '';
};

export const appendNote = note => {
    notesList.append(noteUI(note));
};