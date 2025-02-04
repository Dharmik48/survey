import { useGetSurvey } from '@/hooks/survey'
import { useParams } from 'react-router'

const EditSurvey = () => {
	const params = useParams()
	const { data } = useGetSurvey(params.id!)

	return (
		<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
			Editing {data?.title}
		</h2>
	)
}

export default EditSurvey
