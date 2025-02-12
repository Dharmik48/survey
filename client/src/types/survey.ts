import { HTMLInputTypeAttribute } from 'react'
import { z } from 'zod'

export type FieldTypes = HTMLInputTypeAttribute | 'textarea'

export type Field = {
	label: string
	name: string
	type: FieldTypes
}

export type Survey = {
	id: string
	title: string
	createdAt: string
	deletedAt: string
	updatedAt: string
}

export const surveySchema = z.object({
	title: z
		.string()
		.min(3, 'Title must be atleast 3 characters')
		.max(50, 'Title cannot be more than 50 characters'),
	description: z
		.string()
		.max(500, 'Description cannot be more than 500 characters'),
})
