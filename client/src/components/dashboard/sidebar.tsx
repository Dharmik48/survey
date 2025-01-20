import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { SidebarUser } from './sidebar-user'

const dashboard = [
	{
		title: 'Home',
		icon: Home,
		url: '/dashboard',
	},
]

const AppSidebar = () => {
	return (
		<Sidebar variant='floating'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{dashboard.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Surveys</SidebarGroupLabel>
					<SidebarGroupAction title='Create Survey'>
						<Plus /> <span className='sr-only'>Create Survey</span>
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu></SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarUser
					user={{
						email: 'a@a.com',
						name: 'A',
						avatar: '',
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
