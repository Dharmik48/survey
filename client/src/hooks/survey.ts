import { Response } from '@/types/api'
import { Survey } from '@/types/survey'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'

export const useCreateSurvey = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const invalidateUser = useCallback(
		() => queryClient.invalidateQueries({ queryKey: ['user'] }),
		[queryClient]
	)

	return useMutation({
		mutationFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/survey`,
				{
					method: 'POST',
					credentials: 'include',
				}
			)

			const json: Response = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json.data as { id: string }
		},
		onSuccess: data => {
			invalidateUser()
			navigate(`/dashboard/surveys/${data.id}/edit`)
		},
	})
}

export const useGetSurvey = (id: string) => {
	return useQuery({
		queryFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/surveys/${id}`,
				{
					credentials: 'include',
				}
			)

			const json: Response = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json.data as Survey
		},
		queryKey: ['survey', id],
		staleTime: Infinity,
	})
}

export const useGetSurveys = () => {
	return useQuery({
		queryFn: async () => {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/surveys`)

			const json: Response = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json.data as Survey[]
		},
		queryKey: ['surveys'],
	})
}
