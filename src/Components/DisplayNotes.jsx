import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {SketchPicker} from 'react-color';
import { IoColorPaletteOutline } from "react-icons/io5";
import Tooltip from "./tooltip";

const DisplayNotes = ({ title, content, onDelete, onEdit, id }) => {
    const [isEditing, setIsEditing]=useState(false)
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [selectedColor, setSelectedColor] = useState("#ffffff");
    const [showColorPicker, setShowColorPicker] = useState(false);

    useEffect(()=>{
        const storedColor = localStorage.getItem(`color-${id}`);
        if(storedColor){
            setSelectedColor(storedColor)
        }
    }, [id])

    const handleEdit = () => {
        setIsEditing(true);
      };

    const handleSave = () => {
        const editedNote = {
            id: id,
          title: editedTitle,
          content: editedContent,
          color:selectedColor
        };
    
        onEdit(editedNote);
        setIsEditing(false);
      };

      const handleCancel = () => {setIsEditing(false)}

      const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        localStorage.setItem(`color-${id}`, color.hex)
      }

  return (
    <div className="note" style={{backgroundColor:selectedColor}}>
        {
            isEditing ? (
                <>
                    <input
                    className="editTitle"
                    style={{backgroundColor:selectedColor}}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
          className="editContent"
          style={{backgroundColor:selectedColor}}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <button onClick={handleSave} className="btn-save">Update</button>
          <button onClick={handleCancel} className="btn-save">Cancel</button>
                </>
            ) : (
                <>
                <h1>{title}</h1>
                <p>{content}</p>
                <Tooltip text="Delete">
                  <button onClick={() => onDelete(id)} className="btn-del">
                    <MdDeleteOutline size={25} />
                  </button>
                </Tooltip>
                <Tooltip text="Edit">
                  <button onClick={handleEdit} className="btn-edit" title="Edit">
                    <FaRegEdit size={25} />
                  </button>
                </Tooltip>
                <Tooltip text="Background Options">
                  <button className="btn-color-change" onClick={() => setShowColorPicker(!showColorPicker)} title="Color Picker">
                    <IoColorPaletteOutline size={25} />
                  </button>
                </Tooltip>
                </>
            )
        }
        {
            showColorPicker && (
                <SketchPicker
                className="sketchpicker"
                    color={selectedColor}
                    onChangeComplete={handleColorChange}
                />
            )
        }
    </div>
  );
}

export default DisplayNotes;