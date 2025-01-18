import { useMutation } from '@tanstack/react-query'
import { Response } from '@/types/api'
import { toast } from 'sonner'

export const useLogin = () => {
	return useMutation({
		mutationFn: async (data: unknown) => {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(data),
			})

			const json: Response = await res.json()

			if (json.status === 'error') throw Error(json.message)

			return json
		},
		onError: error => toast.error(error.message),
		onSuccess: data => toast.success(data.message),
	})
}
