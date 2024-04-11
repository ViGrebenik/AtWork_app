/* eslint-disable react/prop-types */
import { ErrorMessage, Field } from 'formik'
import { useEffect, useRef, useState } from 'react'
import styles from './CustomInput.module.scss'

const CustomInput = ({
	name,
	label,
	placeholder,
	errors,
	touched,
	setFieldValue,
	values,
	activeInput,
	setActiveInput
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const containerRef = useRef(null)

	useEffect(() => {
		const handleFocus = e => {
			if (containerRef.current && containerRef.current.contains(e.target)) {
				setIsFocused(true)
				setActiveInput(name)
			} else {
				setIsFocused(false)
			}
		}
		document.addEventListener('focus', handleFocus, true)
		return () => {
			document.removeEventListener('focus', handleFocus, true)
		}
	}, [name, setActiveInput])

	return (
		<div ref={containerRef} className={styles.blockInput}>
			<div className={styles.inputName}>{label}</div>
			<div className={styles.inputAction}>
				<Field
					className={`${styles.input} ${
						touched[name] && errors[name] ? styles.invalid : ''
					}`}
					type='text'
					placeholder={placeholder}
					name={name}
				/>
				{isFocused && values[name] && activeInput === name && (
					<button
						type='button'
						onClick={() => {
							setFieldValue(name, '')
							setIsFocused(false)
						}}
						className={styles.clearButton}
						onFocus={() => {
							setIsFocused(true)
							setActiveInput(name)
						}}
					>
						<img src='/icons/clear.svg' alt='clearIcon' />
					</button>
				)}
			</div>
			<ErrorMessage name={name} component='div' className={styles.error} />
		</div>
	)
}

export default CustomInput
