import { Suspense } from 'react'
import { AppRouter } from './router'
import { NextUIProvider } from '@nextui-org/system'
import { Toaster } from '@/components/ui/sonner'

const App = () => {
	return (
		<Suspense fallback={'Loading...'}>
			<NextUIProvider>
				<AppRouter />
				<Toaster richColors closeButton />
			</NextUIProvider>
		</Suspense>
	)
}

export default App
