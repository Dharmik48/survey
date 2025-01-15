import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { Button } from '@nextui-org/button'
import { Link } from 'react-router'
import { z } from 'zod'

const registerFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Requires min 8 characters.'),
})

const defaultValues = {
	email: '',
	password: '',
}

const RegisterForm = () => {
	const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
		const res = await fetch('http://localhost:3000/api/signup', {
			method: 'POST',
			body: JSON.stringify(values),
		})

		const json = await res.json()
		console.log(json)
	}

	return (
		<Form
			schema={registerFormSchema}
			onSubmit={onSubmit}
			defaultValues={defaultValues}
			className='space-y-4 bg-background border rounded-lg px-8 py-12 shadow'
		>
			{form => (
				<>
					<Input
						type='email'
						name='email'
						label='Email'
						control={form.control}
						variant='dashed'
					/>
					<Input
						type='password'
						name='password'
						label='Password'
						control={form.control}
						variant='dashed'
					/>
					<Button type='submit'>Register</Button>
					<p className='!mt-8'>
						Already have an account?{' '}
						<Link to={'/auth/login'} className='text-primary underline'>
							Login
						</Link>
					</p>
				</>
			)}
		</Form>
	)
}

export default RegisterForm
