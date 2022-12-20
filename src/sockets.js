import Note from './database/models/Note';

export default (io) => {
    io.on('connection', (socket) => {

        const emitNotes = async () => {
            const notes = await Note.find();

            io.emit('server:loadnotes', notes)
        };
        emitNotes();

        socket.on('client:newnote', async data => {
            const newNote = new Note({
                name: data.name,
                quantity: data.quantity,
                text: data.text
            });

            const savedNote = await newNote.save();
            // socket.emit('server:newnote', savedNote);    // Socket solo re responderia a ese cocket cliente
            io.emit('server:newnote', savedNote);       // io le reenvia a toodos los clientes!
        });

        socket.on('client:deletenote', async (id) => {
            await Note.findByIdAndDelete(id);
            emitNotes();
        });

        socket.on('client:getnote', async (id) => {
            const note = await Note.findById(id);
            io.emit('server:selectednote', note);
        });

        socket.on('client:updatenote', async (updatedNote) => {
            await Note.findByIdAndUpdate(updatedNote._id, {
                name: updatedNote.name,
                quantity: updatedNote.quantity,
                text: updatedNote.text
            });

            emitNotes();
        });
    });
};