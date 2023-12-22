import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import CreateNote from './Components/CreateNote';
import DisplayNotes from './Components/DisplayNotes';


const App = () => {
  const [notes, setNotes]=useState([]);
  const [searchQuery, setSearchQuery]=useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || []
    setNotes(storedNotes)
  }, [])

  const addNote = (newNote) => {
    setNotes((prevNote) => {
      const updatedNotes = [newNote, ...prevNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  const isNoteMatchSearch = (note) => {
    const queryWords = searchQuery.toLowerCase().split(' ');

    return queryWords.every(word =>
      note.title.toLowerCase().includes(word) ||
      note.content.toLowerCase().includes(word)
    );
  };

  const editNote = (editedNote) => {
    setNotes((prevNote) => {
      const updatedNotes = prevNote.map((note) => (note.id === editedNote.id ? editedNote : note));
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    }
    )
  }

  const deleteNote = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if(confirmDelete){
      setNotes((prevNote) => {
        const updatedNotes = prevNote.filter((note) => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        return updatedNotes;
      })
    }
  }

  return (
    <>
      <Header setSearchQuery={setSearchQuery}/>
      <CreateNote addNote={addNote} />
      {
        notes.length===0?(
          <div className='msg'>No notes. Add a note to get started.</div>
        ) : (
          notes.filter(note=>isNoteMatchSearch(note)).length === 0 ? (
            <div className='msg'>No matching notes found.</div>
          ) : (
          notes.filter(note=>isNoteMatchSearch(note))
          .map((note)=>(
            <DisplayNotes 
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))
        )
        )
      }
    </>
  );
}

export default App;
