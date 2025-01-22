import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { useRegister } from '@/hooks/auth'
import { registerFormSchema } from '@/types/auth'
import { Button } from '@nextui-org/button'
import { Link, Navigate } from 'react-router'
import { z } from 'zod'

const defaultValues = {
	username: '',
	email: '',
	password: '',
}

const RegisterForm = () => {
	const register = useRegister()

	const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
		register.mutate(values)
	}

	if (register.isSuccess) return <Navigate to={'/auth/login'} />

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
						type='text'
						name='username'
						label='Username'
						control={form.control}
						variant='dashed'
					/>
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
					<Button type='submit' isLoading={register.isPending} color='primary'>
						Register
					</Button>
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
