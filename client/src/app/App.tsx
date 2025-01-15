import { Suspense } from 'react'
import { AppRouter } from './router'
import { NextUIProvider } from '@nextui-org/system'

const App = () => {
	return (
		<Suspense fallback={'Loading...'}>
			<NextUIProvider>
				<AppRouter />
			</NextUIProvider>
		</Suspense>
	)
}

export default App
