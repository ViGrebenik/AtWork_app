import { useDispatch, useSelector } from 'react-redux'
import { hidePopup } from '../../../store/reducer/popup.slice'
import styles from './SaveProfile.module.scss'

const SaveProfile = () => {
	const dispatch = useDispatch()
	const { isVisible, message } = useSelector(state => state.popup)

	const handleClose = () => {
		dispatch(hidePopup())
	}

	return (
		<div
			className={styles.container}
			style={{ display: isVisible ? 'block' : 'none' }}
		>
			<div className={styles.popup}>
				<div onClick={handleClose} className={styles.close}>
					<img src='/public/icons/close.svg' alt='iconSave' />
				</div>
				<img src='/public/icons/Checked.svg' alt='iconSave' />
				<p>{message}</p>
			</div>
		</div>
	)
}

export default SaveProfile
