import { Control, FieldValues } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../form'
import { Input as ShadcnInput } from '../input'
import { cn } from '@/lib/utils'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
	label: string
	name: string
	control: Control<FieldValues>
	className?: { container?: string; input?: string }
	type?: HTMLInputTypeAttribute
	variant?: 'default' | 'dashed'
}

const variants = {
	default: '',
	dashed: 'border-dashed focus-visible:border-solid border-2',
}

const Input = ({
	label,
	name,
	control,
	className,
	type = 'text',
	variant = 'default',
}: InputProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={field => (
				<FormItem className={cn(className?.container, 'text-left')}>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<ShadcnInput
							type={type}
							{...field}
							className={cn(className?.input, variants[variant])}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		></FormField>
	)
}

export default Input
