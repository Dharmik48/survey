import { Button } from '@/components/ui/button'
import Form from '@/components/ui/form/form'
import Input from '@/components/ui/form/input'
import { Field, FieldTypes } from '@/types/survey'
import { z } from 'zod'

type NewFieldFormProps = {
	setFields: React.Dispatch<React.SetStateAction<Field[]>>
	type: FieldTypes
	setDialogOpen: (open: boolean) => void
	fields: Field[]
}

const FieldForm = ({
	type,
	setFields,
	setDialogOpen,
	fields,
}: NewFieldFormProps) => {
	const handleSubmit = (values: z.infer<typeof newFieldSchema>) => {
		setFields((prev: Field[]) => [...prev, { ...values, type }])
		setDialogOpen(false)
	}

	const newFieldSchema = z.object({
		label: z
			.string()
			.min(3, 'Must be atleast 3 characters')
			.max(35, 'Cannot be more than 35 characters'),
		name: z
			.string()
			.min(3, 'Must be atleast 3 characters')
			.max(35, 'Cannot be more than 35 characters')
			.refine(
				val => !fields.some(field => field.name === val),
				'Already assigned to another field'
			),
	})

	switch (type) {
		default:
			return (
				<Form
					defaultValues={{ label: '', name: '' }}
					onSubmit={handleSubmit}
					schema={newFieldSchema}
					id='new-field-form'
				>
					{form => (
						<>
							<Input control={form.control} label='Label' name='label' />
							<Input control={form.control} label='Name' name='name' />
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

const NewFieldForm = ({
	type,
	setFields,
	setDialogOpen,
	fields,
}: NewFieldFormProps) => {
	return (
		<div>
			<FieldForm
				type={type}
				setFields={setFields}
				setDialogOpen={setDialogOpen}
				fields={fields}
			/>
		</div>
	)
}

export default NewFieldForm
