import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { useGetSurvey } from '@/hooks/survey'
import { Field, surveySchema } from '@/types/survey'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import NewFieldDialog from '@/featues/survyes/new-field-dialog'

const EditSurvey = () => {
	const params = useParams()
	const { data, isPending } = useGetSurvey(params.id!)

	const [fields, setFields] = useState<Field[]>([])

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

							<div className='flex gap-4 items-center justify-center mt-8'>
								<Separator className='flex-1' />
								<NewFieldDialog setFields={setFields}>
									<Button variant={'outline'}>
										<PlusCircle />
										Add Field
									</Button>
								</NewFieldDialog>
								<Separator className='flex-1' />
							</div>
						</div>
					</>
				)}
			</Form>
		</>
	)
}

export default EditSurvey
