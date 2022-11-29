import React, { useState, useEffect, useRef } from "react";
import FormArea from "./components/FormArea";
import Header from "./components/Header";
import Note from "./components/Note";
import "./styles/app.css";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    function callMe() {
      let values = localStorage.getItem("notes");
      if (values === null) {
        localStorage.setItem("notes", JSON.stringify(notes));
      } else {
        setNotes(JSON.parse(values));
      }
    }
    callMe();
  }, []);

  const dragItem = useRef();
  const dragOverItem = useRef();

  function addNote(note) {
    setNotes((preNotes) => {
      return [...preNotes, note];
    });
  }
  function delNote(id) {
    const updatedNotes = [...notes].filter((note, index) => {
      return index !== id;
    });
    setNotes(updatedNotes)
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const drop = (e) => {
    const copyListItems = [...notes];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setNotes(copyListItems);
    console.log(notes);
  };

  return (
    <div className="main">
      <Header />
      <FormArea addNote={addNote} />
      <div className="noteWrapper">
        {notes.map((note, index) => (
          <Note
            key={index}
            index={index}
            dragStart={dragStart}
            dragEnter={dragEnter}
            drop={drop}
            notes={notes}
            setNotes={setNotes}
            id={index}
            delNote={delNote}
            title={note.title}
            content={note.content}
          />
        ))}

      </div>
    </div>
  );
}

export default App;