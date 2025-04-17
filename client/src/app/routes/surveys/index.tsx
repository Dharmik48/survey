import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { useGetPublishedSurvey } from '@/hooks/survey'
import { useParams } from 'react-router'
import { z } from 'zod'
import { defaultValues, inputTypeToSchemaType } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useNewResponse } from '@/hooks/response'

const Survey = () => {
	const params = useParams()
	const { data, isPending } = useGetPublishedSurvey(params.id!)
	const newResponse = useNewResponse()

	// TODO: replace with skeleton
	if (isPending || !data) return <h1>loading...</h1>

	const schema = z.object(
		Object.fromEntries(
			data.questions.map(q => [q.id, inputTypeToSchemaType[q.type]])
		)
	)

	const handleSubmit = (values: z.infer<typeof schema>) => {
		const responseData = Object.keys(values).map(key => ({
			id: key,
			value: values[key],
		}))

		newResponse.mutate({ survey: data, data: responseData })
	}

	return (
		<div className='p-4 md:p-8 lg:p-16 max-w-screen-md mx-auto min-h-screen'>
			<div className='bg-card border border-dashed rounded-md p-4 space-y-2 mb-4'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					{data.title}
				</h1>
				<p className='leading-7 [&:not(:first-child)]:mt-6'>
					{data.description}
				</p>
			</div>
			<div>
				<div className='border-2 border-dashed rounded-md p-4 space-y-2'>
					<Form
						schema={schema}
						onSubmit={handleSubmit}
						defaultValues={Object.fromEntries(
							data.questions.map(q => [q.id, defaultValues[q.type]])
						)}
					>
						{form => (
							<>
								{data.questions.map(
									(field, i) =>
										field.name !== null && (
											<div
												className='space-y-2 group flex items-end gap-2 flex-col sm:flex-row'
												key={field.id + i}
											>
												<div className='space-y-2 w-full'>
													{/* <Label className=''>{field.label}</Label> */}
													{/* <InputWrapper variant='default' type={field.type} /> */}
													<Input
														label={field.label}
														name={field.id}
														type={field.type}
														control={form.control}
													/>
												</div>
											</div>
										)
								)}
								<Button className='mt-4'>Submit</Button>
							</>
						)}
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Survey
