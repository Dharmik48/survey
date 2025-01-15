import AuthLayout from '@/components/layouts/auth-layout'
import RegisterForm from '@/featues/auth/components/register-form'

const Register = () => {
	return (
		<AuthLayout
			heading='Register'
			subheading='Join Us Today and Transform Your Data Collection'
		>
			<RegisterForm />
		</AuthLayout>
	)
}

export default Register
