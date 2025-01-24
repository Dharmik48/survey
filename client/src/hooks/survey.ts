import { Response } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export const useCreateSurvey = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/survey`,
				{
					method: 'POST',
				}
			)

			const json: Response = await res.json()

			if (json.status === 'error') throw new Error(json.message)

			return json.data as { id: string }
		},
		onSuccess: data => navigate(`/dashboard/surveys/${data.id}`),
	})
}
