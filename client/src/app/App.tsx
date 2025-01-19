import { Suspense } from 'react'
import { AppRouter } from './router'
import { NextUIProvider } from '@nextui-org/system'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const App = () => {
	const queryClient = new QueryClient()

	return (
		<Suspense fallback={'Loading...'}>
			<QueryClientProvider client={queryClient}>
				<NextUIProvider>
					<AppRouter />
					<Toaster richColors closeButton />
				</NextUIProvider>
			</QueryClientProvider>
		</Suspense>
	)
}

export default App
