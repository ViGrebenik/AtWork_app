import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users',
		{
			params: {
				_limit: 6
			}
		}
	)
	return response.data
})

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		list: [],
		loading: false,
		error: null
	},
	reducers: {
		removeUser(state, action) {
			state.list = state.list.filter(user => user.id !== action.payload.id)
		},
		addUser(state, action) {
			state.list.unshift(action.payload)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false
				state.list = action.payload
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
	}
})

export const { removeUser, addUser } = usersSlice.actions

export default usersSlice.reducer
