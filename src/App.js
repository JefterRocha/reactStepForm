import React from 'react'
import StepForm from './StepForm'

export default () => {

	return <main className='page company-registration-page'>
		<section className='clean-block clean-form dark'>
			<div className='container'>
				<div className='block-heading'>
					<h2 className='text-info'>Juddi</h2>
					<p>Cadastre sua empresa.</p>
				</div>
				<StepForm
					attributesArray={[{
						fantasyName: '',
						companyName: '',
						cnpj: '',
						phone: ''
					},
					{
						cep: '',
						publicPlace: '',
						number: '',
						neighborhood: '',
						city: '',
						state: ''
					}]}
				/>
			</div>
		</section>
	</main>
}
