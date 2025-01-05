import { Suspense } from 'react'
import { AppRouter } from './router'

const App = () => {
	return (
		<Suspense fallback={'Loading...'}>
			<AppRouter />
		</Suspense>
	)
}

export default App
