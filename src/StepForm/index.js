import React, { useState } from 'react'

import Step from './Step'

export default ({ attributesArray }) => {
	const [datas, seDatas] = useState(attributesArray)

	const [currentStep, setCurrentStep] = useState(1)
	const [showMessage, setShowMessage] = useState(false)
	const [submitEnabled, setSubmitEnabled] = useState(false)

	function handleChange({ target }) {
		const { name, value, dataset: { index } } = target
		seDatas(prevState => {
			prevState[index] = { ...prevState[index], [name]: value }
			return prevState
		})
	}

	function submitDatas() {
		console.log(...datas)
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (submitEnabled) {
			if (Object.values(datas).every(Boolean)) submitDatas()
			else setShowMessage(true)
		}
	}

	function _next() {
		const nextStep = currentStep >= 2 ? 2 : currentStep + 1
		if (nextStep === 2) setSubmitEnabled(true)
		setCurrentStep(nextStep)
	}

	function _prev() {
		// setSubmitEnabled(false)
		const prevStep = currentStep <= 1 ? 1 : currentStep - 1
		setCurrentStep(prevStep)
	}

	/*
	* the functions for our button
	*/
	function previousButton() {
		if (currentStep !== 1) {
			return <a
				href='#previus'
				role='button'
				className='btn btn-secondary'
				onClick={_prev}>
				Anterior
		</a>
		}
		return null
	}

	function nextButton() {
		if (currentStep < 2) {
			return <a
				href='#next'
				role='button'
				className='btn btn-primary'
				onClick={_next}>
				Próximo
		</a>
		}
		return null
	}

	return <>
		<p className='text-center'>Step {currentStep} </p>

		<form onSubmit={e => handleSubmit(e, submitEnabled)} className='mt-5'>
			{showMessage && <div className='alert alert-danger' role='alert'>Todos os campos devem serem preenchidos.</div>}

			{
				datas.length && datas.map((each, step) => {
					return <Step currentStep={currentStep} step={step + 1} key={step}>
						{
							Object.keys(each).map((key, index) => {
								return <div key={index} className='form-group'>
									<label>{key}</label>
									<input
										className='form-control'
										name={key}
										type='text'
										value={datas[step][key]}
										data-index={step}
										onChange={handleChange}
									/>
								</div>
							})
						}
					</Step>
				})
			}
			<div className='btn-toolbar justify-content-between mt-5'>
				<div className='btn-group' role='group' aria-label='First group'>
					{previousButton()}
				</div>
				<div className='btn-group' role='group' aria-label='First group'>
					{currentStep === 2 ? <button className='btn btn-success btn-block'>Finalizar</button> : nextButton()}
				</div>
			</div>
		</form>
	</>
}