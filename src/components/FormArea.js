import { Fab,TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import '../styles/formArea.css'

function FormArea({ addNote }) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });
    function clickHandler() {
        if (note.title == "" && note.content == "") {
            alert("Missing Details");
            return;
        }
        addNote(note);

        setNote({
            title: "",
            content: "",
        });
        let values = JSON.parse(localStorage.getItem("notes"));
        
        values.push(note)
        localStorage.removeItem('notes')
        localStorage.setItem('notes', JSON.stringify(values))
    }
    function changeHandler(event) {
        const { name, value } = event.target;
        setNote((preValues) => {
            return {
                ...preValues,
                [name]: value,
            };
        });
    }

    return (
        <div className="formArea">
            <form>
                <TextField
                    onChange={changeHandler}
                    name="title"
                    value={note.title}
                    label="Title"
                    fullWidth
                    autoComplete="off"
                    className="text-field-1"
                />
                <TextField
                    onChange={changeHandler}
                    name="content"
                    value={note.content}
                    style={{ marginTop: "10px" }}
                    label="Content"
                    multiline
                    rows={4}
                    fullWidth
                    autoComplete="off"
                    className="text-field-1"
                />
                <Fab onClick={clickHandler} style={{ marginTop: "20px" }}>
                    <AddIcon />
                </Fab>
            </form>
        </div>
    );
}

export default FormArea;
