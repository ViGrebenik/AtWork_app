/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'

const Breadcrumbs = () => {
	return (
		<div className={styles.containerBreadCrumbs}>
			<div className={styles.crumbs}>
				<img
					src='/public/icons/Backarrow.svg'
					alt='arrowBack'
					className={styles.arrow}
				/>

				<Link to={'/'} className={styles.breadcrumb}>
					Назад
				</Link>
			</div>
		</div>
	)
}

export default Breadcrumbs
