import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { Button } from '@nextui-org/button'
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
	const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
		console.log(values)
	}

	return (
		<Form
			onSubmit={onSubmit}
			schema={loginFormSchema}
			defaultValues={defaultValues}
			className='space-y-4 bg-card p-8 rounded-lg border shadow'
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
					<Button type='submit' color='primary'>
						Submit
					</Button>
				</>
			)}
		</Form>
	)
}

export default LoginForm
