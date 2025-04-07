import { ProtectedRoute } from '@/lib/auth'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Dashboard from './routes/dashboard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (data: any) => {
	const { clientLoader, clientAction, default: Component, ...rest } = data

	return {
		...rest,
		loader: clientLoader,
		action: clientAction,
		Component,
	}
}

const router = createBrowserRouter([
	{
		path: '/',
		lazy: () => import('./routes/Home').then(convert),
	},
	{
		path: '/auth/login',
		lazy: () => import('./routes/auth/login').then(convert),
	},
	{
		path: '/auth/register',
		lazy: () => import('./routes/auth/register').then(convert),
	},
	{
		path: '/dashboard',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
		children: [
			{
				path: '/dashboard',
				lazy: () => import('./routes/dashboard/dashboard').then(convert),
			},
			{
				path: '/dashboard/surveys/:id',
				lazy: () => import('./routes/dashboard/surveys').then(convert),
			},
			{
				path: '/dashboard/surveys/:id/edit',
				lazy: () => import('./routes/dashboard/surveys/edit').then(convert),
			},
		],
	},
	{
		path: '/surveys/:id',
		lazy: () => import('./routes/surveys').then(convert),
	},
	{
		path: '/success',
		lazy: () => import('./routes/success').then(convert),
	},
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
