export type Response = {
	status: 'success' | 'error'
	message: string
	data?: object | object[]
}
