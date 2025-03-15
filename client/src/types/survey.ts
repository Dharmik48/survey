import { HTMLInputTypeAttribute } from 'react'
import { z } from 'zod'

export type FieldTypes = HTMLInputTypeAttribute | 'textarea'

export type Field = {
	label: string
	name: string | null
	type: FieldTypes
}

export type FieldWithSurveyID = {
	label: string
	name: string | null
	type: FieldTypes
	surveyID: string
}

export type Survey = {
	id: string
	title: string
	description?: string
	createdAt: string
	deletedAt: string
	updatedAt: string
	questions: FieldWithSurveyID[]
	published: boolean
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
