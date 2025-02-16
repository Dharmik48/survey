import { Response } from '@/types/api'
import { FieldWithSurveyID, Survey } from '@/types/survey'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

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

export const useUpdateSurvey = () => {
	const queryClient = useQueryClient()

	const invalidateSurvey = useCallback(
		(id: string) => queryClient.invalidateQueries({ queryKey: ['survey', id] }),
		[queryClient]
	)

	return useMutation({
		mutationFn: async (data: {
			survey: Survey
			questions: FieldWithSurveyID[]
		}) => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/surveys/${data.survey.id}`,
				{
					method: 'PUT',
					credentials: 'include',
					body: JSON.stringify(data),
				}
			)
			const json = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json.data as { survey: Survey; questions: FieldWithSurveyID[] }
		},
		onSuccess: data => {
			toast.success('Save Successful')
			invalidateSurvey(data.survey.id)
		},
		onError: err => {
			toast.error(err.message)
		},
	})
}
