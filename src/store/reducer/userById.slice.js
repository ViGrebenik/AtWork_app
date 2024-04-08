import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const userByIdSlice = createSlice({
	name: 'userById',
	initialState: {},
	reducers: {
		setUserById(state, action) {
			const { id, data } = action.payload
			return { ...state, [id]: data }
		}
	}
})

export const fetchUserById = id => async dispatch => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${id}`
		)
		dispatch(userByIdSlice.actions.setUserById({ id, data: response.data }))
	} catch (error) {
		console.error(`Error fetching user with id ${id}:`, error)
	}
}

export const { setUserById } = userByIdSlice.actions

export default userByIdSlice.reducer
