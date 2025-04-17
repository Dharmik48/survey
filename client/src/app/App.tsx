import { Suspense } from 'react'
import { AppRouter } from './router'
import { HeroUIProvider } from "@heroui/system"
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const App = () => {
	const queryClient = new QueryClient()

	return (
		<Suspense fallback={'Loading...'}>
			<QueryClientProvider client={queryClient}>
				<HeroUIProvider>
					<AppRouter />
					<Toaster richColors closeButton />
				</HeroUIProvider>
			</QueryClientProvider>
		</Suspense>
	)
}

export default App
