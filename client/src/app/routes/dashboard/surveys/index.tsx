import { columns } from '@/featues/responses/columns'
import { DataTable } from '@/featues/responses/data-table'
import { useResponses } from '@/hooks/response'
import { useGetSurvey } from '@/hooks/survey'
import { groupBy } from '@/lib/utils'
import { useMemo } from 'react'
import { useParams } from 'react-router'

const Survey = () => {
	const params = useParams()
	const { data, isPending } = useGetSurvey(params.id!)
	const { data: responses, isPending: isResponsesPending } = useResponses(
		params.id!
	)

	const groups = useMemo(
		() => groupBy(responses!, response => response.questionID),
		[responses]
	)

	if (isPending || !data) return <h1>loading...</h1>
	if (isResponsesPending || !responses)
		return (
			<section>
				<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
					{data.title}
				</h2>
				<p>Loading Data...</p>
			</section>
		)

	return (
		<section>
			<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4'>
				{data.title} - Responses
			</h2>

			<div>
				<section className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
					{Object.keys(groups).map(question => (
						<div key={question}>
							<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-2'>
								{data.questions.find(q => q.id === question)?.label}
							</h3>
							<DataTable columns={columns} data={groups[question]} />
						</div>
					))}
				</section>
			</div>
		</section>
	)
}

export default Survey
