import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveNote } from '../../data/notesSlice';
import Spinner from '../../shared/components/Spinner';

export default function AddNote() {
    const [noteText, setNoteText] = useState('')
    const [noteColor, setNoteColor] = useState('white');
    const isNoteBeingSaved = useSelector((state: any) => state.notes.isNoteBeingSaved)

    const dispatch = useDispatch()

    function save() {
        let noteObj = {
            noteText,
            noteColor
        }
        dispatch(saveNote(noteObj))
    }

    return (
        <div>
            <h1>Add a new Note</h1>
            <hr />
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>
            <br />
            <br />
            <input type='color' value={noteColor} onChange={e => setNoteColor(e.target.value)} />
            <br />
            <br />
            {
                isNoteBeingSaved
                    ? <Spinner />
                    : <button onClick={save}>Save</button>

            }

        </div>
    )
}
