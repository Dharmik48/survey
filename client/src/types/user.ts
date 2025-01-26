import { Survey } from './survey'

export type User = {
	username: string
	id: string
	email: string
	surveys: Survey[]
	createdAt: string
	updatedAt: string
	deletedAt: string
}
