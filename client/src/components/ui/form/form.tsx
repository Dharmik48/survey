import { Form as FormProvider } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

type FormProps = {
	schema: z.Schema
	defaultValues: object
	onSubmit: (values: z.infer<z.Schema>) => void
	children: (methods: UseFormReturn) => React.ReactNode
	className?: string
}

const Form = ({
	schema,
	defaultValues,
	children,
	onSubmit,
	className,
}: FormProps) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues,
	})

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={className}>
				{children(form)}
			</form>
		</FormProvider>
	)
}

export default Form
