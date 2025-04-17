import { Response, Survey } from '@/types/survey'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export const useNewResponse = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: async (data: {
			survey: Survey
			data: { id: string; value: unknown }[]
		}) => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/response/${data.survey.id}`,
				{
					method: 'POST',
					body: JSON.stringify(data.data),
				}
			)

			const json = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json
		},
		onSuccess: () => {
			navigate(`/success`)
		},
		onError: err => {
			toast.error(err.message)
		},
	})
}

export const useResponses = (surveyID: string) => {
	return useQuery({
		queryKey: [surveyID],
		queryFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/response/${surveyID}`,
				{
					credentials: 'include',
				}
			)
			const json = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json.data as Response[]
		},
	})
}
