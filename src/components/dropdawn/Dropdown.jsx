/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	archiveUser,
	unarchiveUser
} from '../../store/reducer/archivedUsers.slice'
import { addUser, removeUser } from '../../store/reducer/users.slice'
import styles from './Dropdown.module.scss'

const Dropdown = ({ user, type }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dispatch = useDispatch()

	const handleArchive = () => {
		dispatch(archiveUser(user))
		dispatch(removeUser(user))
		setIsDropdownOpen(!isDropdownOpen)
	}
	const handleUnarchiveUser = user => {
		dispatch(unarchiveUser(user))
		dispatch(addUser(user))
		setIsDropdownOpen(!isDropdownOpen)
	}
	const handleHide = () => {
		dispatch(removeUser(user))
		setIsDropdownOpen(!isDropdownOpen)
	}
	return (
		<div className={styles.activeProfile}>
			<img
				src='/icons/active.svg'
				alt='activeProfile'
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			/>
			{isDropdownOpen &&
				(type !== 'Unarchive' ? (
					<div
						className={`${styles.dropdown} ${
							isDropdownOpen ? styles.active : ''
						}`}
					>
						<Link to={`/user/${user.id}`}>
							<button>Редактировать</button>
						</Link>
						<button onClick={handleArchive}>Архивировать</button>
						<button onClick={handleHide}>Скрыть</button>
					</div>
				) : (
					<div
						className={`${styles.dropdown} ${
							isDropdownOpen ? styles.active : ''
						}`}
					>
						<button onClick={() => handleUnarchiveUser(user)}>
							Активировать
						</button>
					</div>
				))}
		</div>
	)
}

export default Dropdown
