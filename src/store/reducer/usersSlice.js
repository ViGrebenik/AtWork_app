import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
		removeUser(state, action) {
			return state.filter(user => user.id !== action.payload.id)
		},
		addUser(state, action) {
			return [action.payload, ...state]
		}
	}
})

export const fetchUsers = () => async dispatch => {
	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users',
			{
				params: {
					_limit: 6
				}
			}
		)
		dispatch(usersSlice.actions.setUsers(response.data))
	} catch (error) {
		console.error('Error fetching users:', error)
	}
}

export const { setUsers, removeUser, addUser } = usersSlice.actions

export default usersSlice.reducer
