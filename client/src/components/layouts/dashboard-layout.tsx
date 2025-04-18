import AppSidebar from '../dashboard/sidebar'
import { Separator } from '../ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import NavBreadcrumb from '../dashboard/nav-breadcrumb'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider
			style={
				{
					'--sidebar-background': 'var(--card)',
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 px-4'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<NavBreadcrumb />
				</header>
				<main className='p-4'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default DashboardLayout
