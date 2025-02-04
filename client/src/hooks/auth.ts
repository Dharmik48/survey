import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Response } from '@/types/api'
import { toast } from 'sonner'
import { z } from 'zod'
import { loginFormSchema, registerFormSchema } from '@/types/auth'
import { User } from '@/types/user'
import { useCallback } from 'react'

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
	const queryClient = useQueryClient()

	const setUser = useCallback(
		(data: User) => queryClient.setQueryData(['user'], data),
		[queryClient]
	)

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
		onSuccess: data => {
			setUser(data.data as User)
			toast.success(data.message)
		},
	})
}

export const useUser = () => {
	return useQuery({
		queryFn: async () => {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
				credentials: 'include',
			})

			const json: Response = await res.json()

			if (json.status === 'error') throw Error(json.message)

			return json.data as User
		},
		queryKey: ['user'],
		staleTime: Infinity,
		gcTime: Infinity,
	})
}

export const useLogout = () => {
	const queryClient = useQueryClient()

	const setUserNull = useCallback(() => {
		queryClient.setQueryData(['user'], null)
		queryClient.invalidateQueries({ queryKey: ['user'] })
	}, [queryClient])

	return useMutation({
		mutationFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/logout`,
				{
					credentials: 'include',
				}
			)

			const json: Response = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json
		},
		onError: error => toast.error(error.message),
		onSuccess: setUserNull,
	})
}
