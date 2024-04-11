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

	//
	return (
		<div className={styles.activeProfile}>
			<div
				className={styles.svgDropDawn}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<svg
					width='24'
					height='25'
					viewBox='0 0 24 25'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g>
						<path
							d='M10 18.5C10 19.6 10.9 20.5 12 20.5C13.1 20.5 14 19.6 14 18.5C14 17.4 13.1 16.5 12 16.5C10.9 16.5 10 17.4 10 18.5ZM10 6.5C10 7.6 10.9 8.5 12 8.5C13.1 8.5 14 7.6 14 6.5C14 5.4 13.1 4.5 12 4.5C10.9 4.5 10 5.4 10 6.5ZM10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5C10.9 10.5 10 11.4 10 12.5Z'
							fill='#161616'
						/>
					</g>
					<defs>
						<clipPath id='clip0_11_6806'>
							<rect
								width='24'
								height='24'
								fill='white'
								transform='translate(0 0.5)'
							/>
						</clipPath>
					</defs>
				</svg>
			</div>

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
