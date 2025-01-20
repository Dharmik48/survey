import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Outlet } from 'react-router'

const Dashboard = () => {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	)
}

export default Dashboard
