import { useUser } from '@/hooks/auth'
import { Navigate } from 'react-router'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useUser()

	if (!user.data) return <Navigate to={'/auth/login'} replace />

	return children
}
