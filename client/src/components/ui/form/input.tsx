import { Control, FieldValues } from 'react-hook-form'
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

type InputWrapperProps = {
	label: string
	name: string
	control: Control<FieldValues>
	className?: { container?: string; input?: string }
	type?: HTMLInputTypeAttribute | 'textarea'
	variant?: 'default' | 'dashed'
}

type InputProps = {
	type?: HTMLInputTypeAttribute | 'textarea'
	variant: 'default' | 'dashed'
	className?: string
}

const variants = {
	default: '',
	dashed: 'border-dashed focus-visible:border-solid border-2',
}

export const Input = ({ type, variant, className, ...field }: InputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	return type !== 'password' ? (
		type === 'textarea' ? (
			<Textarea {...field} />
		) : (
			<ShadcnInput
				type={type}
				{...field}
				className={cn(className, variants[variant])}
			/>
		)
	) : (
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
}

const InputWrapper = ({
	label,
	name,
	control,
	className,
	type = 'text',
	variant = 'default',
}: InputWrapperProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(className?.container, 'text-left')}>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							variant={variant}
							className={className?.input}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		></FormField>
	)
}

export default InputWrapper
