/* eslint-disable react/prop-types */
import cn from 'classnames'
import Dropdown from '../../dropdown/Dropdown'
import styles from './Card.module.scss'

const Card = ({ user, type, index }) => {
	return (
		<div key={index} className={styles.containerCard}>
			<div
				className={cn(styles.imgProfile, {
					[styles.unarchive]: type === 'Unarchive'
				})}
			>
				<img src='/img/userImgProfile.png' alt='userImgProfile' />
			</div>
			<div className={styles.dataCard}>
				<div className={styles.blockProfileData}>
					<div className={styles.containerProfile}>
						<div
							className={cn(styles.profileBlock, {
								[styles.unarchive]: type === 'Unarchive'
							})}
						>
							<div className={styles.profileName}>{user.name}</div>
							<div className={styles.profileWork}>{user.company.name}</div>
						</div>
						<Dropdown user={user} type={type} />
					</div>
					<div>
						<div
							className={cn(styles.profileCity, {
								[styles.unarchive]: type === 'Unarchive'
							})}
						>
							{user.address.city}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
