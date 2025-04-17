import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FieldTypes } from '@/types/survey'
import { useId } from 'react'

type FieldTypeSelectorProps = {
	setFieldType: (val: FieldTypes) => void
}

export default function FieldTypeSelecor({
	setFieldType,
}: FieldTypeSelectorProps) {
	const id = useId()

	const items = [
		{ value: 'text', label: 'Text' },
		{ value: 'textarea', label: 'Textarea' },
		{ value: 'number', label: 'Number' },
	]

	return (
		<RadioGroup
			className='grid-cols-2'
			defaultValue='text'
			onValueChange={setFieldType}
		>
			{items.map(item => (
				<div
					key={`${id}-${item.value}`}
					className='relative flex gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring'
				>
					<div className='flex justify-between gap-2'>
						<RadioGroupItem
							id={`${id}-${item.value}`}
							value={item.value}
							className='order-1 after:absolute after:inset-0'
						/>
					</div>
					<Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
				</div>
			))}
		</RadioGroup>
	)
}
