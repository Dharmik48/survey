import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { useGetSurvey, useUpdateSurvey } from '@/hooks/survey'
import { Field, surveySchema } from '@/types/survey'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { LoaderCircle, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import NewFieldDialog from '@/featues/survyes/new-field-dialog'
import { z } from 'zod'

const EditSurvey = () => {
	const params = useParams()
	const [fields, setFields] = useState<Field[]>([])
	const { data, isPending } = useGetSurvey(params.id!)
	const updateSurvey = useUpdateSurvey()

	useEffect(() => {
		if (!data) return
		setFields(data.questions)
	}, [data])

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault()
		}
		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	// TODO: replace with skeleton
	if (isPending || !data) return <h1>loading...</h1>

	const handleSubmit = (values: z.infer<typeof surveySchema>) => {
		const updatedData = {
			survey: { ...data, ...values },
			questions: fields.map(field => ({ ...field, surveyID: data.id })),
		}
		updateSurvey.mutate(updatedData)
	}

	return (
		<>
			<div className='flex flex-col md:flex-row gap-4 justify-between scroll-m-20 border-b pb-2  first:mt-0 mb-8'>
				<h2 className='text-3xl font-semibold tracking-tight'>
					Editing {data?.title}
				</h2>
				<Button form='save' disabled={updateSurvey.isPending}>
					{updateSurvey.isPending ? (
						<>
							<LoaderCircle className='animate-spin' /> Saving
						</>
					) : (
						'Save'
					)}
				</Button>
			</div>
			<Form
				schema={surveySchema}
				defaultValues={{
					title: data?.title,
					description: data?.description ?? '',
				}}
				onSubmit={handleSubmit}
				id='save'
			>
				{form => (
					<>
						<div className='bg-card border border-dashed rounded-md p-4 space-y-2 mb-4'>
							<Input label='Title' name='title' control={form.control} />
							<Input
								label='Description'
								name='description'
								control={form.control}
								type='textarea'
							/>
						</div>
						<div>
							{!!fields.length && (
								<div className='border-2 border-dashed rounded-md p-4 space-y-2'>
									{fields.map((field, i) => (
										<Input
											key={field.name + i}
											label={field.label}
											name={field.name}
											control={form.control}
											type={field.type}
										/>
									))}
								</div>
							)}
						</div>
					</>
				)}
			</Form>
			<div className='flex gap-4 items-center justify-center mt-8'>
				<Separator className='flex-1' />
				<NewFieldDialog setFields={setFields} fields={fields}>
					<Button variant={'outline'} type='button'>
						<PlusCircle />
						Add Field
					</Button>
				</NewFieldDialog>
				<Separator className='flex-1' />
			</div>
		</>
	)
}

export default EditSurvey
