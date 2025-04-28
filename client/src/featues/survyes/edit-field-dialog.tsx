import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { useState } from 'react'
import NewFieldForm from './new-field-form'
import { Label } from '@/components/ui/label'
import { FieldWithSurveyID } from '@/types/survey'
import { z } from 'zod'

type EditFieldDialogProps = {
	setFields: React.Dispatch<React.SetStateAction<FieldWithSurveyID[]>>
	fields: FieldWithSurveyID[]
	field: FieldWithSurveyID
	index: number
	children: React.ReactNode
}

const EditFieldDialog = ({
	setFields,
	field,
	fields,
	index,
	children,
}: EditFieldDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = (values: z.infer<z.Schema>) => {
		setFields(prev =>
			prev.map((f, i) => (i !== index ? f : { ...f, ...values }))
		)
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='[&>button:last-child]:text-white'>
				<DialogHeader>
					<DialogTitle>Edit Field</DialogTitle>
				</DialogHeader>
				<NewFieldForm
					type={field.type}
					defaultValues={field}
					fields={fields}
					handleSubmit={handleSubmit}
					action='edit'
					index={index}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='ghost'>
							Cancel
						</Button>
					</DialogClose>
					<Label
						htmlFor={`formField`}
						className='bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer'
						tabIndex={0}
					>
						Okay
					</Label>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditFieldDialog
