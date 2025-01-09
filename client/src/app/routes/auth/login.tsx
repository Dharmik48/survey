import AuthLayout from '@/components/layouts/auth-layout'
import LoginForm from '@/featues/auth/components/login-form'

const Login = () => {
	return (
		<AuthLayout heading='Login' subheading='Your Insights Await Login Now'>
			<LoginForm />
		</AuthLayout>
	)
}

export default Login
