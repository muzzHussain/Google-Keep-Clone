import React, { useState } from "react";
import {v4 as uuid} from 'uuid'
import { IoIosAdd } from "react-icons/io";

const CreateNote = ({ addNote }) => {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  const handleExpanded = () => {
    setExpanded(true);
  }

  const setDefaultValues=()=>{
    setNote({
      title: "",
      content: "",
    });
  }

  const shrink = () => {
    setExpanded(false);
  }

  const submitButton = (event) => {
    event.preventDefault();

    if(!note.title.trim() || !note.content.trim()){
      alert('Title or Content cannot be empty');
      setDefaultValues();
      shrink();
      return;
    }

    addNote({
      id:uuid(),
      ...note
    });
    setDefaultValues();
    shrink();
  }

  return (
    <div onDoubleClick={shrink}>
      <form>
        {isExpanded && (
          <>
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <button onClick={submitButton}>
          <IoIosAdd size={35} />
        </button>
          </>
          
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
      </form>
    </div>
  );
}

export default CreateNote;