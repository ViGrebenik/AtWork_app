import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditUser from '../components/editUser/EditUser'
import Header from '../components/header/Header'
import Home from '../components/home/Home'
import SaveProfile from '../components/modal/saveProfile/SaveProfile'
import NotFoundScreen from '../screens/notFound/NotFoundScreen'

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user/:userId' element={<EditUser />} />
				<Route path='*' element={<NotFoundScreen />} />
			</Routes>
			<SaveProfile />
		</BrowserRouter>
	)
}

export default Router
