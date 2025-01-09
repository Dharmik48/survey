import { createBrowserRouter, RouterProvider } from 'react-router'

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
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
