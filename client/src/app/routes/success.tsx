const Success = () => {
	return (
		<div className='p-4 md:p-8 lg:p-16 max-w-screen-lg mx-auto min-h-screen grid place-items-center'>
			<div className='bg-card border border-dashed rounded-md p-4 lg:p-8 space-y-6 mb-4'>
				<h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
					Your Response has been recorded successfully.
				</h1>
				<p className='leading-7'>
					Thank you for taking part in this survey presented by{' '}
					<span className='text-primary font-semibold tracking-tighter'>
						SurveySphere
					</span>
				</p>
			</div>
		</div>
	)
}

export default Success
