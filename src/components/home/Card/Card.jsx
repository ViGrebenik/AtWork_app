/* eslint-disable react/prop-types */
import Dropdown from '../../dropdawn/Dropdown'
import styles from './Card.module.scss'

const Card = ({ user, type }) => {
	return (
		<div
			className={`${styles.containerCard} ${
				type === 'Unarchive' ? styles.unarchive : ''
			}`}
		>
			<div className={styles.imgProfile}>
				<img src='/img/userImgProfile.png' alt='userImgProfile' />
			</div>
			<div className={styles.dataCard}>
				<div className={styles.blockProfileData}>
					<div className={styles.containerProfile}>
						<div className={styles.profileBlock}>
							<div className={styles.profileName}>{user.name}</div>
							<div className={styles.profileWork}>{user.company.name}</div>
						</div>
						<Dropdown user={user} type={type} />
					</div>
					<div>
						<div className={styles.profileCity}>{user.address.city}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
