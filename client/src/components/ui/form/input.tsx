import { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../form'
import { Input as ShadcnInput } from '../input'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HTMLInputTypeAttribute, useState } from 'react'
import { Button } from '../button'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type InputWrapperProps = {
	label: string
	name: string
	control: Control<FieldValues>
	className?: { container?: string; input?: string }
	type?: HTMLInputTypeAttribute | 'textarea'
	variant?: 'default' | 'dashed'
	options?: string
	placeholder?: string
}

type InputProps = {
	type?: HTMLInputTypeAttribute | 'textarea'
	variant?: 'default' | 'dashed'
	className?: string
	options?: string
	label: string
	field?: ControllerRenderProps<FieldValues, string>
	placeholder?: string
}

const variants = {
	default: '',
	dashed: 'border-dashed focus-visible:border-solid border-2',
}

export const Input = ({
	type,
	variant = 'default',
	className,
	options,
	label,
	field,
	placeholder,
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	switch (type) {
		case 'password':
			return (
				<div className='flex relative'>
					<ShadcnInput
						type={showPassword ? 'text' : 'password'}
						{...field}
						className={cn(className, variants[variant], 'pr-10')}
					/>
					<Button
						title={showPassword ? 'Hide password' : 'Show password'}
						variant={'ghost'}
						className='absolute right-0 ml-full group hover:bg-transparent'
						onClick={() => setShowPassword(prev => !prev)}
						type='button'
					>
						{!showPassword ? (
							<Eye className='group-hover:scale-110 group-hover:text-primary transition-transform-colors' />
						) : (
							<EyeOff className='group-hover:scale-110 group-hover:text-primary transition-transform-colors' />
						)}
					</Button>
				</div>
			)
		case 'textarea':
			return <Textarea {...field} />
		case 'dropdown':
			return (
				<Select onValueChange={field?.onChange} defaultValue={field?.value}>
					<SelectTrigger>
						<SelectValue placeholder={`Select ${label}`} />
					</SelectTrigger>
					<SelectContent>
						{options?.split(',').map(option => (
							<SelectItem value={option}>{option}</SelectItem>
						))}
					</SelectContent>
				</Select>
			)

		default:
			return (
				<ShadcnInput
					type={type}
					placeholder={placeholder}
					{...field}
					className={cn(className, variants[variant])}
				/>
			)
	}
}

const InputWrapper = ({
	label,
	name,
	control,
	className,
	...props
}: InputWrapperProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(className?.container, 'text-left')}>
					<>
						<FormLabel>{label}</FormLabel>
						{/* {['dropdown', 'radio', 'multichoice'].includes(type) && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Info className='inline size-4 !mt-0 ml-2' />
									</TooltipTrigger>
									<TooltipContent>
										<p>Seperate by comma(,)</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)} */}
					</>
					<FormControl>
						<Input
							// type={type}
							// variant={variant}
							className={className?.input}
							// options={options}
							label={label}
							field={field}
							// placeholder={placeholder}
							{...props}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		></FormField>
	)
}

export default InputWrapper
