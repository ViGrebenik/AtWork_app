import styles from './Header.module.scss'
const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<div className={styles.blockLogo}>
						<img src='/icons/logo.svg' alt='logoCompany' />
						<div className={styles.logoName}>
							at-<span>work</span>
						</div>
					</div>
					<div className={styles.containerUserPanel}>
						<div className={styles.userPanel}>
							<img src='/icons/Favorite.svg' alt='Favorite' />
							<img src='/public/icons/Notification.svg' alt='Notification' />
						</div>
						<div className={styles.userBlock}>
							<img src='/public/img/userPanelV2.png' alt='userPanelImg' />
							<div className={styles.userName}></div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
