import React from 'react'
import Spinner from '../../shared/components/Spinner'
import { useSelector } from 'react-redux'

export default function NoteItem({ noteText, noteColor, _id, deleteNote }:any) {
    const { notesBeingDeleted } = useSelector((state:any) => state.notes)
    return (
        <div className='note-item' style={{ 'background': noteColor }}>
            <div>{noteText}</div>
            <button>Mark Fav</button>
            {
                notesBeingDeleted.includes(_id)
                    ? <Spinner />
                    : <button onClick={() => deleteNote(_id)}>X</button>
            }
        </div>
    )
}
