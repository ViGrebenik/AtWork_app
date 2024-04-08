import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showPopup } from '../../store/reducer/popup.slice'
import Breadcrumbs from '../breadCrumbs/BreadCrumbs'
import styles from './EditUser.module.scss'
const EditUser = () => {
	const dispatch = useDispatch()
	const { userId } = useParams()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const user = useSelector(state =>
		state.users.find(user => user.id === parseInt(userId))
	)

	if (!user) {
		return <div>User not found</div>
	}
	const initialValues = {
		name: user.name,
		username: user.username,
		email: user.email,
		city: user.address.city,
		phone: user.phone,
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
		return errors
	}

	const handleSubmit = () => {
		setIsSubmitting(true)
		dispatch(showPopup({ message: 'Изменения сохранены!' }))
		setTimeout(() => {
			setIsSubmitting(false)
		}, 1000)
	}

	return (
		<div className={styles.container}>
			<div className={styles.containerBlock}>
				<Breadcrumbs />
				<div className={styles.blockEditUser}>
					<div className={styles.jobProfileDetails}>
						<img src='/public/img/imgProfileEdit.png' alt='profileImg' />
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
												touched.name && !errors.name
													? styles.valid
													: styles.invalid
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
												touched.username && !errors.username
													? styles.valid
													: styles.invalid
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
									<div className={styles.inputName}>Никнейм</div>
									<Field className={styles.input} type='text' name='username' />
								</div>
								<div className={styles.blockInput}>
									<div className={styles.inputName}>Почта</div>
									<Field className={styles.input} type='text' name='email' />
								</div>
								<div className={styles.blockInput}>
									<div className={styles.inputName}>Город</div>
									<Field className={styles.input} type='text' name='city' />
								</div>
								<div className={styles.blockInput}>
									<div className={styles.inputName}>Телефон</div>
									<Field className={styles.input} type='text' name='phone' />
								</div>
								<div className={styles.blockInput}>
									<div className={styles.inputName}>Название компании</div>
									<Field
										className={styles.input}
										type='text'
										name='companyName'
									/>
								</div> */
}
