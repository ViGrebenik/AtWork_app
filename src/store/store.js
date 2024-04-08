import { configureStore } from '@reduxjs/toolkit'
import archivedUsersReducer from './reducer/archivedUsers.slice'
import popupReducer from './reducer/popup.slice'
import userByIdReducer from './reducer/userById.slice'
import usersReducer from './reducer/users.slice'

const store = configureStore({
	reducer: {
		users: usersReducer,
		selectedUser: archivedUsersReducer,
		popup: popupReducer,
		userById: userByIdReducer
	}
})

export default store
