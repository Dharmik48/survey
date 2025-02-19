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

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import FieldTypeSelecor from '@/components/field-type-selector'
import NewFieldForm from './new-field-form'
import { Field, FieldTypes } from '@/types/survey'
import { Label } from '@/components/ui/label'
import { z } from 'zod'

type NewFieldDialogProps = {
	setFields: React.Dispatch<React.SetStateAction<Field[]>>
	fields: Field[]
	children: React.ReactNode
}

const NewFieldDialog = ({
	children,
	setFields,
	fields,
}: NewFieldDialogProps) => {
	const [step, setStep] = useState(1)
	const [isOpen, setIsOpen] = useState(false)
	const [fieldType, setFieldType] = useState<FieldTypes>('text')

	const handleSubmit = (values: z.infer<z.Schema>) => {
		console.log(fieldType)

		setFields((prev: Field[]) => [...prev, { ...values, type: fieldType }])
		setIsOpen(false)
	}

	const stepContent = [
		{
			title: 'Field Type',
			component: <FieldTypeSelecor setFieldType={setFieldType} />,
		},
		{
			title: 'Customizable Components',
			component: (
				<NewFieldForm
					type={fieldType}
					fields={fields}
					handleSubmit={handleSubmit}
					action='create'
				/>
			),
		},
	]

	const totalSteps = stepContent.length

	const handleContinue = () => {
		if (step < totalSteps) {
			setStep(step + 1)
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={open => {
				if (open) setStep(1)
				if (open) setFieldType('text')
				setIsOpen(open)
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='[&>button:last-child]:text-white'>
				<DialogHeader>
					<DialogTitle>{stepContent[step - 1].title}</DialogTitle>
				</DialogHeader>
				{stepContent[step - 1].component}
				<div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
					<div className='flex justify-center space-x-1.5 max-sm:order-1'>
						{[...Array(totalSteps)].map((_, index) => (
							<div
								key={index}
								className={cn(
									'h-1.5 w-1.5 rounded-full bg-primary',
									index + 1 === step ? 'bg-primary' : 'opacity-20'
								)}
							/>
						))}
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='ghost'>
								Cancel
							</Button>
						</DialogClose>
						{step < totalSteps ? (
							<Button className='group' type='button' onClick={handleContinue}>
								Next
								<ArrowRight
									className='-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5'
									size={16}
									strokeWidth={2}
									aria-hidden='true'
								/>
							</Button>
						) : (
							<Label
								htmlFor={`formField`}
								className='bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer'
								tabIndex={0}
							>
								Okay
							</Label>
						)}
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default NewFieldDialog
