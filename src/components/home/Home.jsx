import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/reducer/usersSlice'
import Card from './Card/Card'
import styles from './Home.module.scss'
const Home = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)
	const archivedUsers = useSelector(state => state.selectedUser)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.containerBlock}>
				<div className={styles.blockCards}>
					<div className={styles.blockCardsTitle}>Активные</div>
					<div className={styles.containerActiveCards}>
						{users.map((user, index) => (
							<div key={index} className={styles.cardWrapper}>
								<Card user={user} />
							</div>
						))}
					</div>
				</div>
				<div className={styles.blockCards}>
					<div className={styles.blockCardsTitle}>Aрхив</div>
					<div className={styles.containerActiveCards}>
						{archivedUsers.map((user, index) => (
							<div key={index} className={styles.cardWrapper}>
								<Card user={user} type={'Unarchive'} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
