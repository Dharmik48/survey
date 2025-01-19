import AuthLayout from '@/components/layouts/auth-layout'
import RegisterForm from '@/featues/auth/components/register-form'
import { useUser } from '@/hooks/auth'
import { Navigate } from 'react-router'

const Register = () => {
	const user = useUser()

	if (user.isSuccess) return <Navigate to={'/'} replace />

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
