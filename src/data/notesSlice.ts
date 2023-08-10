import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonDeleteJson, commonGetJson, commonPostJson } from "../shared/utils/api-helpers";

export const getAllNotes: any = createAsyncThunk('getAllNotes', async () => {
    return commonGetJson('/notes')
})

export const deleteNote: any = createAsyncThunk('deleteNote', async (data) => {
    return commonDeleteJson('/notes/' + data)
})

export const saveNote: any = createAsyncThunk('saveNote', async (data) => {
    return commonPostJson('/notes', data)
})


interface INote {
    noteColor: string,
    noteText: "string",
    "_id": string
}


const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        isNoteBeingSaved: false,
        areNotesBeingFetched: false,
        notesBeingDeleted: []
    },
    reducers: {
        addNote: (state: any, action) => {
            state.notes = [...state.notes, action.payload]
        },
        removeNote: (state: any, action) => {
            const _id = action.payload;
            state.notes = state.notes.filter((x: any) => x._id != _id)
        },
        setNotes: (state: any, action) => {
            state.notes = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveNote.pending, (state: any, action) => {
            state.isNoteBeingSaved = true;
        })
        builder.addCase(saveNote.fulfilled, (state: any, action) => {
            state.isNoteBeingSaved = false;
            state.notes = [...action.payload]
        })
        builder.addCase(saveNote.rejected, (state: any, action) => {
            state.isNoteBeingSaved = false;
        })



        builder.addCase(getAllNotes.pending, (state: any, action) => {
            state.areNotesBeingFetched = true;
        })
        builder.addCase(getAllNotes.fulfilled, (state: any, action) => {
            state.areNotesBeingFetched = false;
            state.notes = [...action.payload]
        })
        builder.addCase(getAllNotes.rejected, (state: any, action) => {
            state.areNotesBeingFetched = false;
        })



        builder.addCase(deleteNote.pending, (state: any, action) => {
            let id = action.meta.arg
            state.notesBeingDeleted = [...state.notesBeingDeleted, id]
        })
        builder.addCase(deleteNote.fulfilled, (state: any, action) => {
            let id = action.meta.arg
            state.notesBeingDeleted = state.notesBeingDeleted.filter((x: any) => x != id)
            state.notes = [...action.payload]
        })
        builder.addCase(deleteNote.rejected, (state: any, action) => {
            let id = action.meta.arg
            state.notesBeingDeleted = state.notesBeingDeleted.filter((x: any) => x != id)
        })


    }
})


export const { removeNote, setNotes, addNote } = notesSlice.actions

export default notesSlice;