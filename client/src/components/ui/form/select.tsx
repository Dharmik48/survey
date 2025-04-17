import { Control, FieldValues } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../form'

import {
	Select as SelectShadcn,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type InputProps = {
	label: string
	name: string
	control: Control<FieldValues>
	className?: { container?: string; input?: string }
	placeholder?: string
	variant?: 'default' | 'dashed'
	children: React.ReactNode
}

const Select = ({
	label,
	name,
	control,
	placeholder = 'Select',
	children,
}: InputProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<SelectShadcn
						onValueChange={field.onChange}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>{children}</SelectContent>
					</SelectShadcn>
					<FormMessage />
				</FormItem>
			)}
		></FormField>
	)
}

export default Select
