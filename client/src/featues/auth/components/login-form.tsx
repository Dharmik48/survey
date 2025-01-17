import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { Response } from '@/types/api'
import { Button } from '@nextui-org/button'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Requires min 8 characters.'),
})

const defaultValues = {
	email: '',
	password: '',
}

const LoginForm = () => {
	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(values),
		})

		const json: Response = await res.json()

		if (json.status === 'error') return toast.error(json.message)

		toast.success(json.message)
	}

	return (
		<Form
			onSubmit={onSubmit}
			schema={loginFormSchema}
			defaultValues={defaultValues}
			className='space-y-4 bg-background px-8 py-12 rounded-lg border shadow'
		>
			{form => (
				<>
					<Input
						control={form.control}
						name='email'
						label='Email'
						type='email'
						variant='dashed'
					/>
					<Input
						control={form.control}
						name='password'
						label='Password'
						type='password'
						variant='dashed'
					/>
					<Button type='submit'>Submit</Button>
					<p className='!mt-8'>
						Don't have an account?{' '}
						<Link to={'/auth/register'} className='text-primary underline'>
							Create now
						</Link>
					</p>
				</>
			)}
		</Form>
	)
}

export default LoginForm
