/* eslint-disable react/prop-types */
import cn from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	archiveUser,
	unarchiveUser
} from '../../store/reducer/archivedUsers.slice'
import { addUser, removeUser } from '../../store/reducer/users.slice'
import styles from './Dropdown.module.scss'
import SvgDropDown from './SvgDropDown'

const Dropdown = ({ user, type }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dispatch = useDispatch()

	const handleArchive = useCallback(() => {
		dispatch(archiveUser(user))
		dispatch(removeUser(user))
		setIsDropdownOpen(false)
	}, [dispatch, user, setIsDropdownOpen])

	const handleUnarchiveUser = useCallback(() => {
		dispatch(unarchiveUser(user))
		dispatch(addUser(user))
		setIsDropdownOpen(false)
	}, [dispatch, user, setIsDropdownOpen])

	const handleHide = useCallback(() => {
		dispatch(removeUser(user))
		setIsDropdownOpen(false)
	}, [dispatch, user, setIsDropdownOpen])

	// Костыль
	const dropdownRef = useRef(null)
	const editButtonRef = useRef(null)
	const archiveButtonRef = useRef(null)
	const hideButtonRef = useRef(null)
	const unArchiveButtonRef = useRef(null)

	const handleClickOutside = useCallback(
		event => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				event.target !== editButtonRef.current &&
				event.target !== archiveButtonRef.current &&
				event.target !== hideButtonRef.current &&
				event.target !== unArchiveButtonRef.current
			) {
				setIsDropdownOpen(false)
			}
		},
		[setIsDropdownOpen]
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleToggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	return (
		<div className={styles.activeProfile}>
			<div ref={dropdownRef} onClick={handleToggleDropdown}>
				<SvgDropDown />
			</div>

			{isDropdownOpen && (
				<div
					className={cn(styles.dropdown, {
						[styles.active]: isDropdownOpen
					})}
				>
					{type !== 'Unarchive' ? (
						<>
							<Link to={`/user/${user.id}`}>
								<button ref={editButtonRef}>Редактировать</button>
							</Link>
							<button onClick={handleArchive} ref={archiveButtonRef}>
								Архивировать
							</button>
							<button onClick={handleHide} ref={hideButtonRef}>
								Скрыть
							</button>
						</>
					) : (
						<button onClick={handleUnarchiveUser} ref={unArchiveButtonRef}>
							Активировать
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default Dropdown
