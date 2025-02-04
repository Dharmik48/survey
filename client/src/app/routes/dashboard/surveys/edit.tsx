import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { useGetSurvey } from '@/hooks/survey'
import { surveySchema } from '@/types/survey'
import { useParams } from 'react-router'

const EditSurvey = () => {
	const params = useParams()
	const { data, isPending } = useGetSurvey(params.id!)

	// TODO: replace with skeleton
	if (isPending) return <h1>loading...</h1>

	return (
		<>
			<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-8'>
				Editing {data?.title}
			</h2>
			<Form
				schema={surveySchema}
				defaultValues={{ title: data?.title, description: '' }}
				onSubmit={() => {}}
			>
				{form => (
					<>
						<div className='bg-card border border-dashed rounded-md p-4'>
							<Input label='Title' name='title' control={form.control} />
							<Input
								label='Description'
								name='description'
								control={form.control}
								type='textarea'
							/>
						</div>
					</>
				)}
			</Form>
		</>
	)
}

export default EditSurvey
