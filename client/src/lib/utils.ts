import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z, ZodType } from 'zod'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getPathFromBreadcrumb(paths: string[], index: number): string {
	let path = ''

	for (let i = 0; i <= index; i++) {
		path += `${paths[i]}/`
	}

	return path
}

export const inputTypeToSchemaType: { [key: string]: ZodType } = {
	text: z.string().min(3, 'Minimum 3 characters'),
	textarea: z.string().min(3, 'Minimum 3 characters'),
	number: z
		.string()
		.min(1, 'Required')
		.refine(val => !isNaN(Number(val)), { message: 'Please enter a number' }),
	dropdown: z.string().min(1, 'Required'),
}

export const defaultValues: { [key: string]: unknown } = {
	text: '',
	texarea: '',
	dropdown: '',
}

export const groupBy = <T>(
	array: T[],
	predicate: (value: T, index: number, array: T[]) => string
) => {
	if (!array) return {}
	return array.reduce((acc, value, index, array) => {
		;(acc[predicate(value, index, array)] ||= []).push(value)
		return acc
	}, {} as { [key: string]: T[] })
}
