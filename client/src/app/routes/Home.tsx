import { Button } from '@nextui-org/button'
import { BackgroundBeams } from '../../components/ui/background-beams'
import { Link } from 'react-router'

function Home() {
	return (
		<div className='h-dvh flex'>
			<BackgroundBeams />
			<div className='h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center my-auto'>
				<div className='max-w-2xl mx-auto p-4 text-center space-y-8'>
					<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
						Discover What Matters with{' '}
						<span className='bg-gradient-to-b from-background via-primary to-primary bg-clip-text text-transparent tracking-tighter'>
							SurveySphere
						</span>
					</h1>
					<p className='leading-7 [&:not(:first-child)]:mt-6'>
						Build and share surveys that uncover insights, helping you make
						informed decisions.
					</p>
					<Link to={'/auth/login'} className='inline-block'>
						<Button color='primary' size='lg'>
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
