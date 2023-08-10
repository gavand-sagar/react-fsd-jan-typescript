import React, { useEffect } from 'react'
import { deleteNote, getAllNotes } from '../../data/notesSlice'
import NoteItem from './NoteItem'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../shared/components/Spinner'

export default function ListNote() {
    const { notes, areNotesBeingFetched } = useSelector((state:any) => state.notes)

    const dispatch = useDispatch()

    function deleteItem(_id:string) {
        // if (window.confirm("Are you sure want to delete this note?")) {
        // }
        dispatch(deleteNote(_id))
    }

    function getNotes() {
        dispatch(getAllNotes())
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div>
            <h1>Your Notes</h1>
            <button onClick={getNotes}>Refresh</button>
            <hr />
            {
                areNotesBeingFetched ?
                    <Spinner />
                    :
                    notes.map((x:any) =>
                        <NoteItem key={x._id} noteColor={x.noteColor} noteText={x.noteText} _id={x._id} deleteNote={deleteItem} />
                    )
            }
        </div>
    )
}
