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
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import {
	Command,
	Forward,
	Home,
	MoreHorizontal,
	Pen,
	Plus,
	Trash2,
} from 'lucide-react'
import { Link } from 'react-router'
import { SidebarUser } from './sidebar-user'
import { useUser } from '@/hooks/auth'
import { useCreateSurvey } from '@/hooks/survey'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const dashboard = [
	{
		title: 'Home',
		icon: Home,
		url: '/dashboard',
	},
]

const AppSidebar = () => {
	const { data } = useUser()
	const { isMobile } = useSidebar()
	const createSurvey = useCreateSurvey()

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
						<SidebarMenu>
							{data!.surveys?.map(survey => (
								<SidebarMenuItem key={survey.id}>
									<SidebarMenuButton asChild>
										<Link to={`/dashboard/surveys/${survey.id}`}>
											<span>{survey.title}</span>
										</Link>
									</SidebarMenuButton>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<SidebarMenuAction showOnHover>
												<MoreHorizontal />
												<span className='sr-only'>More</span>
											</SidebarMenuAction>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											className='w-48 rounded-lg'
											side={isMobile ? 'bottom' : 'right'}
											align={isMobile ? 'end' : 'start'}
										>
											<DropdownMenuItem asChild>
												<Link to={`/dashboard/surveys/${survey.id}/edit`}>
													<Pen className='text-muted-foreground' />
													<span>Edit Survey</span>
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Forward className='text-muted-foreground' />
												<span>Share Survey</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem className='text-danger'>
												<Trash2 className='text-danger' />
												<span>Delete Survey</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarUser
					user={{
						email: data!.email,
						name: data!.username,
						avatar: '',
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
