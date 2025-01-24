import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Command, Home, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { SidebarUser } from './sidebar-user'
import { useUser } from '@/hooks/auth'
import { User } from '@/types/user'
import { useCreateSurvey } from '@/hooks/survey'

const dashboard = [
	{
		title: 'Home',
		icon: Home,
		url: '/dashboard',
	},
]

const AppSidebar = () => {
	const { data } = useUser()
	const createSurvey = useCreateSurvey()
	const user = data as User

	return (
		<Sidebar variant='floating'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<Link to='/'>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground'>
									<Command className='size-4' />
								</div>
								<span className='truncate font-semibold'>SurveySphere</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
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
					<SidebarGroupAction
						title='Create Survey'
						onClick={() => createSurvey.mutate()}
					>
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
						email: user.email,
						name: user.username,
						avatar: '',
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
