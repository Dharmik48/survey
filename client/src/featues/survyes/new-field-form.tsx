import { Button } from '@/components/ui/button'
import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { FieldTypes, FieldWithSurveyID } from '@/types/survey'
import { z } from 'zod'

type NewFieldFormProps = {
	type: FieldTypes
	fields: FieldWithSurveyID[]
	handleSubmit: (values: z.infer<z.Schema>) => void
	defaultValues?: FieldWithSurveyID
	action: 'edit' | 'create'
	index?: number
}

const NewFieldForm = ({
	type,
	fields,
	handleSubmit,
	defaultValues,
	action,
	index,
}: NewFieldFormProps) => {
	const newFieldSchema = z.object({
		label: z
			.string()
			.min(3, 'Must be atleast 3 characters')
			.max(35, 'Cannot be more than 35 characters'),
		name: z
			.string()
			.min(3, 'Must be atleast 3 characters')
			.max(35, 'Cannot be more than 35 characters')
			.refine(val => {
				if (action === 'create')
					return !fields.some(field => field.name === val)

				return !fields.some((field, i) => {
					if (i === index) return false
					return field.name === val
				})
			}, 'Already assigned to another field'),
		options: z
			.string()
			.refine(val => {
				if (!['dropdown', 'radio', 'multichoice'].includes(type)) return true

				if (val.split(',').length < 2) return false

				return true
			}, 'Must include ateast 2 options')
			.refine(val => {
				if (!['dropdown', 'radio', 'multichoice'].includes(type)) return true
				if (val.split(',').length > 10) return false

				return true
			}, 'Cannot add more than 10 options'),
	})

	switch (type) {
		default:
			return (
				<Form
					defaultValues={{
						label: defaultValues?.label ?? '',
						name: defaultValues?.name ?? '',
						options: defaultValues?.options ?? '',
					}}
					onSubmit={handleSubmit}
					schema={newFieldSchema}
					id='new-field-form'
				>
					{form => (
						<>
							<Input control={form.control} label='Label' name='label' />
							<Input control={form.control} label='Name' name='name' />
							{['dropdown', 'radio', 'multichoice'].includes(type) && (
								<Input
									control={form.control}
									label='Options'
									name='options'
									type={'text'}
									placeholder='Seperate by comma(,)'
								/>
							)}
							<Button
								type='submit'
								form='new-field-form'
								id={`formField`}
								className='hidden'
							>
								Hidden
							</Button>
						</>
					)}
				</Form>
			)
	}
}

export default NewFieldForm
