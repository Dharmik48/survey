import { useMutation } from '@tanstack/react-query'
import { Response } from '@/types/api'
import { toast } from 'sonner'
import { z } from 'zod'
import { loginFormSchema, registerFormSchema } from '@/types/auth'

export const useRegister = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof registerFormSchema>) => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/signup`,
				{
					method: 'POST',
					body: JSON.stringify(data),
				}
			)

			const json: Response = await res.json()

			if (json.status === 'error') throw Error(json.message)

			return json
		},
		onError: error => toast.error(error.message),
		onSuccess: data => toast.success(data.message),
	})
}

export const useLogin = () => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
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
