'use client'

import { Pie, PieChart as ReactPieChart } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart'
// const chartData = [
// 	{ browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
// 	{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
// 	{ browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
// 	{ browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
// 	{ browser: 'other', visitors: 90, fill: 'var(--color-other)' },
// ]

type PieChartProps = {
	title: string
	data: { label: string; fill: string; count: number }[]
	dataKey: string
	nameKey: string
}

export function PieChart({ title, data, dataKey, nameKey }: PieChartProps) {
	const chartConfig = {
		count: {
			label: 'Count',
		},
		...Object.fromEntries(
			data.map((c, i) => [
				c.label,
				{ label: c.label, color: `hsl(var(--chart-${i + 1}))` },
			])
		),
	} satisfies ChartConfig

	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[300px]'
				>
					<ReactPieChart>
						<Pie data={data} dataKey={dataKey} />
						<ChartLegend
							content={<ChartLegendContent nameKey={nameKey} />}
							className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
						/>
					</ReactPieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
