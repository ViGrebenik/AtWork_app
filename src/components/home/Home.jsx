import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/reducer/users.slice'
import Card from './Card/Card'
import styles from './Home.module.scss'
import Loader from '../loader/Loader'
const Home = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users.list)
	const loading = useSelector(state => state.users.loading)
	const archivedUsers = useSelector(state => state.selectedUser)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	return (
		<div className={styles.container}>
			<div className={styles.containerBlock}>
				<div className={styles.blockCards}>
					<div className={styles.blockCardsTitle}>Активные</div>
					<div className={styles.containerActiveCards}>
						{loading ? (
							<Loader />
						) : (
							users.map((user, index) => <Card user={user} key={index} />)
						)}
					</div>
				</div>
				<div className={styles.blockCards}>
					<div className={styles.blockCardsTitle}>Aрхив</div>
					<div className={styles.containerActiveCards}>
						{archivedUsers.map((user, index) => (
							<Card user={user} key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
