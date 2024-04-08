import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hidePopup, showPopup } from '../../store/reducer/popup.slice'
import { fetchUserById } from '../../store/reducer/userById.slice'
import Breadcrumbs from '../breadCrumbs/BreadCrumbs'
import Loader from '../loader/Loader'
import styles from './EditUser.module.scss'
const EditUser = () => {
	const dispatch = useDispatch()
	const { userId } = useParams()

	const user = useSelector(state => state.userById[userId])

	useEffect(() => {
		if (!user) {
			dispatch(fetchUserById(userId))
		}
	}, [dispatch, userId, user])

	const [isSubmitting, setIsSubmitting] = useState(false)
	if (!user) {
		return <Loader />
	}
	const initialValues = {
		name: user.name,
		username: user.username,
		email: user.email,
		city: user.address.city,
		phone: user.phone.replace(/\sx\d+$/, ''),
		companyName: user.company.name
	}

	const validate = values => {
		const errors = {}
		if (!values.name) {
			errors.name = 'Введите имя!'
		}
		if (!values.username) {
			errors.username = 'Введите никнейм!'
		}
		if (!values.email) {
			errors.email = 'Введите email!'
		}
		if (!values.city) {
			errors.city = 'Введите город!'
		}
		if (!values.phone) {
			errors.phone = 'Введите телефон!'
		}
		if (!values.companyName) {
			errors.companyName = 'Введите название компании!'
		}
		return errors
	}

	const handleSubmit = () => {
		setIsSubmitting(true)
		dispatch(showPopup({ message: 'Изменения сохранены!' }))
		setTimeout(() => {
			setIsSubmitting(false)
			dispatch(hidePopup())
		}, 4000)
	}
	return (
		<div className={styles.container}>
			<div className={styles.containerBlock}>
				<Breadcrumbs />
				<div className={styles.blockEditUser}>
					<div className={styles.jobProfileDetails}>
						<img src='/img/imgProfileEdit.png' alt='profileImg' />
						<div className={styles.profileCategories}>
							<div className={styles.category}>Данные профиля</div>
							<div className={styles.category}>Рабочее пространство</div>
							<div className={styles.category}>Приватность</div>
							<div className={styles.category}>Безопасность</div>
						</div>
					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validate={validate}
					>
						{({ errors, touched }) => (
							<Form className={styles.editingProfileData}>
								<div className={styles.editingTitle}>Данные профиля</div>
								<div className={styles.containerInputs}>
									<div className={styles.blockInput}>
										<div className={styles.inputName}>Имя</div>
										<Field
											className={`${styles.input} ${
												touched.name && errors.name ? styles.invalid : ''
											}`}
											type='text'
											placeholder={user.name}
											name='name'
										/>
										<ErrorMessage
											name='name'
											component='div'
											className={styles.error}
										/>
									</div>
									<div className={styles.blockInput}>
										<div className={styles.inputName}>Никнейм</div>
										<Field
											className={`${styles.input} ${
												touched.username && errors.username
													? styles.invalid
													: ''
											}`}
											type='text'
											placeholder={user.username}
											name='username'
										/>
										<ErrorMessage
											name='username'
											component='div'
											className={styles.error}
										/>
									</div>
									<div className={styles.blockInput}>
										<div className={styles.inputName}>Почта</div>
										<Field
											className={`${styles.input} ${
												touched.email && errors.email ? styles.invalid : ''
											}`}
											type='text'
											name='email'
											placeholder={user.email}
										/>
										<ErrorMessage
											name='email'
											component='div'
											className={styles.error}
										/>
									</div>
									<div className={styles.blockInput}>
										<div className={styles.inputName}>Город</div>
										<Field
											className={`${styles.input} ${
												touched.city && errors.city ? styles.invalid : ''
											}`}
											type='text'
											name='city'
											placeholder={user.city}
										/>
										<ErrorMessage
											name='city'
											component='div'
											className={styles.error}
										/>
									</div>
									<div className={styles.blockInput}>
										<div className={styles.inputName}>Телефон</div>
										<Field
											className={`${styles.input} ${
												touched.phone && errors.phone ? styles.invalid : ''
											}`}
											type='text'
											name='phone'
											placeholder={user.phone.replace(/\sx\d+$/, '')}
										/>
										<ErrorMessage
											name='phone'
											component='div'
											className={styles.error}
										/>
									</div>
									<div className={styles.blockInput}>
										<div className={styles.inputName}>Название компании</div>
										<Field
											className={`${styles.input} ${
												touched.companyName && errors.companyName
													? styles.invalid
													: ''
											}`}
											type='text'
											name='companyName'
											placeholder={user.companyName}
										/>
										<ErrorMessage
											name='companyName'
											component='div'
											className={styles.error}
										/>
									</div>
								</div>
								<div className={styles.containerButton}>
									<button
										className={styles.button}
										type='submit'
										disabled={isSubmitting}
									>
										Сохранить
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default EditUser

{
	/* <div className={styles.blockInput}>
								<div className={styles.blockInput}>
									<div className={styles.inputName}>Название компании</div>
									<Field
										className={styles.input}
										type='text'
										name='companyName'
									/>
								</div> */
}
