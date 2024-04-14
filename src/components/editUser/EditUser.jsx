import { Form, Formik } from 'formik'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hidePopup, showPopup } from '../../store/reducer/popup.slice'
import { fetchUserById } from '../../store/reducer/userById.slice'
import Breadcrumbs from '../breadCrumbs/BreadCrumbs'
import Loader from '../loader/Loader'
import styles from './EditUser.module.scss'
import CustomInput from './customInput/CustomInput'

const EditUser = () => {
	const dispatch = useDispatch()
	const { userId } = useParams()
	const timeoutRef = useRef(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [activeInput, setActiveInput] = useState(null)

	const user = useSelector(state => state.userById[userId])

	useEffect(() => {
		if (!user) {
			dispatch(fetchUserById(userId))
		}
	}, [dispatch, userId, user])

	const handleSubmit = useCallback(() => {
		setIsSubmitting(true)
		dispatch(showPopup({ message: 'Изменения сохранены!' }))

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			setIsSubmitting(false)
			dispatch(hidePopup())
		}, 4000)
	}, [dispatch, setIsSubmitting])

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
			errors.email = 'Введите почту!'
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
						{({ errors, touched, setFieldValue, values }) => (
							<Form className={styles.editingProfileData}>
								<div className={styles.editingTitle}>Данные профиля</div>
								<div className={styles.containerInputs}>
									<CustomInput
										name='name'
										label='Имя'
										placeholder='Введите имя'
										errors={errors}
										touched={touched}
										setFieldValue={setFieldValue}
										values={values}
										activeInput={activeInput}
										setActiveInput={setActiveInput}
									/>
									<CustomInput
										name='username'
										label='Никнейм'
										placeholder='Введите никнейм'
										errors={errors}
										touched={touched}
										setFieldValue={setFieldValue}
										values={values}
										activeInput={activeInput}
										setActiveInput={setActiveInput}
									/>
									<CustomInput
										name='email'
										label='Почта'
										placeholder='Введите email'
										errors={errors}
										touched={touched}
										setFieldValue={setFieldValue}
										values={values}
										activeInput={activeInput}
										setActiveInput={setActiveInput}
									/>
									<CustomInput
										name='city'
										label='Город'
										placeholder='Введите город'
										errors={errors}
										touched={touched}
										setFieldValue={setFieldValue}
										values={values}
										activeInput={activeInput}
										setActiveInput={setActiveInput}
									/>
									<CustomInput
										name='phone'
										label='Телефон'
										placeholder='Введите телефон'
										errors={errors}
										touched={touched}
										setFieldValue={setFieldValue}
										values={values}
										activeInput={activeInput}
										setActiveInput={setActiveInput}
									/>
									<CustomInput
										name='companyName'
										label='Название компании'
										placeholder={'Введите название компании'}
										errors={errors}
										touched={touched}
										setFieldValue={setFieldValue}
										values={values}
										activeInput={activeInput}
										setActiveInput={setActiveInput}
									/>
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
