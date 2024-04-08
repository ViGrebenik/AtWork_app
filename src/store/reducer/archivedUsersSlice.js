import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const archivedUsersSlice = createSlice({
	name: 'archivedUsers',
	initialState,
	reducers: {
		archiveUser(state, action) {
			return [...state, action.payload]
		},
		unarchiveUser(state, action) {
			return state.filter(user => user.id !== action.payload.id)
		}
	}
})

export const { archiveUser, unarchiveUser } = archivedUsersSlice.actions

export default archivedUsersSlice.reducer
