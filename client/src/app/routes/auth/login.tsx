import AuthLayout from '@/components/layouts/auth-layout'
import LoginForm from '@/featues/auth/components/login-form'
import { useUser } from '@/hooks/auth'
import { Navigate } from 'react-router'

const Login = () => {
	const user = useUser()

	if (user.isSuccess) return <Navigate to={'/'} replace />

	return (
		<AuthLayout heading='Login' subheading='Your Insights Await Login Now'>
			<LoginForm />
		</AuthLayout>
	)
}

export default Login
