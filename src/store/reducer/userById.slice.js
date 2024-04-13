import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserById = createAsyncThunk(
	'userById/fetchUserById',
	async (id, { dispatch }) => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${id}`
			)
			dispatch(userByIdSlice.actions.setUserById({ id, data: response.data }))
		} catch (error) {
			console.error(`Error fetching user with id ${id}:`, error)
		}
	}
)

const userByIdSlice = createSlice({
	name: 'userById',
	initialState: {},
	reducers: {
		setUserById(state, action) {
			const { id, data } = action.payload
			return { ...state, [id]: data }
		},
		removeUserById(state, action) {
			const id = action.payload
			const newState = { ...state }
			delete newState[id]
			return newState
		},
		updateUserById(state, action) {
			const { id, data } = action.payload
			return { ...state, [id]: { ...state[id], ...data } }
		}
	}
})

export const { setUserById, removeUserById, updateUserById } =
	userByIdSlice.actions

export default userByIdSlice.reducer
