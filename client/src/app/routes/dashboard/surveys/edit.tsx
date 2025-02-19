import Form from '@/components/ui/form/form'
import Input, { Input as InputWrapper } from '@/components/ui/form/input'
import { useGetSurvey, useUpdateSurvey } from '@/hooks/survey'
import { Field, surveySchema } from '@/types/survey'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { LoaderCircle, Pencil, PlusCircle, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import NewFieldDialog from '@/featues/survyes/new-field-dialog'
import { z } from 'zod'
import EditFieldDialog from '@/featues/survyes/edit-field-dialog'
import { Label } from '@/components/ui/label'

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
					</>
				)}
			</Form>
			<div>
				{!!fields.length && (
					<div className='border-2 border-dashed rounded-md p-4 space-y-2'>
						{fields.map((field, i) => (
							<div
								className='space-y-2 group flex items-end gap-2 flex-col sm:flex-row'
								key={field.name + i}
							>
								<div className='space-y-2 w-full'>
									<Label className=''>{field.label}</Label>
									<InputWrapper variant='default' type={field.type} />
								</div>
								<div className='flex gap-2'>
									<EditFieldDialog
										field={field}
										index={i}
										fields={fields}
										setFields={setFields}
									>
										<Button variant='secondary' type='button' size={'icon'}>
											<Pencil />
										</Button>
									</EditFieldDialog>
									<Button variant='destructive' type='button' size={'icon'}>
										<Trash />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
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
