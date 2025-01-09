type AuthLayoutProps = {
	children: React.ReactNode
	heading: string
	subheading: string
}

const AuthLayout = ({ children, heading, subheading }: AuthLayoutProps) => {
	return (
		<div className='h-dvh flex'>
			<div className='my-auto text-center mx-auto space-y-8 p-2'>
				<div>
					<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tighter leading-normal lg:leading-relaxed'>
						{heading} to{' '}
						<span className='bg-gradient-to-b from-background via-primary to-primary bg-clip-text text-transparent'>
							SurveySphere
						</span>
					</h1>
					<p className='leading-7 [&:not(:first-child)]:mt-2'>{subheading}</p>
				</div>
				{children}
			</div>
		</div>
	)
}

export default AuthLayout
