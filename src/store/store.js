import { configureStore } from '@reduxjs/toolkit'
import archivedUsersReducer from './reducer/archivedUsersSlice'
import usersReducer from './reducer/usersSlice'
import popupReducer from './reducer/popup.slice'

const store = configureStore({
	reducer: {
		users: usersReducer,
		selectedUser: archivedUsersReducer,
		popup: popupReducer
	}
})

export default store
