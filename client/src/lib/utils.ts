import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z, ZodString } from 'zod'

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

export const inputTypeToSchemaType: { [key: string]: ZodString } = {
	text: z.string().min(3, 'Minimum 3 characters'),
	textarea: z.string().min(3, 'Minimum 3 characters'),
}

export const defaultValues: { [key: string]: unknown } = {
	text: '',
}
