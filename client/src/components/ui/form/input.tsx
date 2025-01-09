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
	const [showPassword, setShowPassword] = useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(className?.container, 'text-left')}>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{type !== 'password' ? (
							<ShadcnInput
								type={type}
								{...field}
								className={cn(className?.input, variants[variant])}
							/>
						) : (
							<div className='flex relative'>
								<ShadcnInput
									type={showPassword ? 'text' : 'password'}
									{...field}
									className={cn(className?.input, variants[variant], 'pr-10')}
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
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		></FormField>
	)
}

export default Input
