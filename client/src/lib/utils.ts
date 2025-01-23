import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
