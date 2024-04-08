import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
const Header = () => {
	const isMobile = useMediaQuery({ maxWidth: 726 })
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<div className={styles.blockLogo}>
						<img src='/icons/logo.svg' alt='logoCompany' />
						<Link to={'/'} className={styles.breadcrumb}>
							<div className={styles.logoName}>
								at-<span>work</span>
							</div>
						</Link>
					</div>
					<div className={styles.containerUserPanel}>
						{isMobile ? (
							<>
								<div className={styles.userBlock}>
									<img src='/public/img/userPanelV2.png' alt='userPanelImg' />
								</div>
							</>
						) : (
							<>
								<div className={styles.userPanel}>
									<img src='/icons/Favorite.svg' alt='Favorite' />
									<img
										src='/public/icons/Notification.svg'
										alt='Notification'
									/>
								</div>
								<div className={styles.userBlock}>
									<img src='/public/img/userPanelV2.png' alt='userPanelImg' />
									<div className={styles.userName}></div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
