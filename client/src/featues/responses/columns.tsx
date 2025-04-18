'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Response = {
	// index: number
	value: string | number
}

export const columns: ColumnDef<Response>[] = [
	// {
	// 	accessorKey: 'index',
	// 	header: 'Sr No.',
	// },
	{
		accessorKey: 'value',
		header: 'Value',
	},
]
