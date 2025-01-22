import { z } from 'zod'

export const registerFormSchema = z.object({
	username: z
		.string()
		.min(3, 'Requires min 3 characters.')
		.max(50, 'Max 50 characters allowed.'),
	email: z.string().email(),
	password: z.string().min(8, 'Requires min 8 characters.'),
})

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Requires min 8 characters.'),
})
