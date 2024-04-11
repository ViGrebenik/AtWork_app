/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
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
	const dropdownRef = useRef(null)

	const handleArchive = () => {
		dispatch(archiveUser(user))
		dispatch(removeUser(user))
		setIsDropdownOpen(false)
	}

	const handleUnarchiveUser = user => {
		dispatch(unarchiveUser(user))
		dispatch(addUser(user))
		setIsDropdownOpen(false)
	}

	const handleHide = () => {
		dispatch(removeUser(user))
		setIsDropdownOpen(false)
	}

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

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
						ref={dropdownRef}
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
						ref={dropdownRef}
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
