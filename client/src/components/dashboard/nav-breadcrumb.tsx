import { useLocation } from 'react-router'
import {
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
	Breadcrumb,
} from '../ui/breadcrumb'
import React from 'react'
import { getPathFromBreadcrumb } from '@/lib/utils'

const NavBreadcrumb = () => {
	const location = useLocation()

	const split = location.pathname.split('/')
	const paths = split.map((path, i) => {
		return {
			path,
			url: getPathFromBreadcrumb(split, i),
		}
	})

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{paths.slice(1, -1).map(path => (
					<React.Fragment key={path.path}>
						<BreadcrumbItem>
							<BreadcrumbLink
								href={path.url}
								className='capitalize hidden md:block'
							>
								{path.path}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className='hidden md:block mt-0.5' />
					</React.Fragment>
				))}
				<BreadcrumbItem>
					<BreadcrumbPage className='capitalize'>
						{split[split.length - 1]}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default NavBreadcrumb
