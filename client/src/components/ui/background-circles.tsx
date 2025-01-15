'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const BackgroundCircles = React.memo(
	({ className }: { className?: string }) => {
		const [colorScheme, setColorScheme] = useState(
			window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		)

		useEffect(() => {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

			const handleChange = (e: MediaQueryListEvent) => {
				setColorScheme(e.matches ? 'dark' : 'light')
			}

			mediaQuery.addEventListener('change', handleChange)

			return () => {
				mediaQuery.removeEventListener('change', handleChange)
			}
		}, [])

		const paths = [
			'm399.99999,350c-27.62431,0 -50,-22.37569 -50,-50c0,-27.62431 22.37569,-50 50,-50c27.62431,0 50,22.37569 50,50c0,27.62431 -22.37569,50 -50,50z',
			'm400,385c-46.96132,0 -85,-38.03867 -85,-85c0,-46.96132 38.03867,-85 85,-85c46.96132,0 85,38.03867 85,85c0,46.96132 -38.03867,85 -85,85z',
			'm400,422.99999c-67.9558,0 -122.99999,-55.0442 -122.99999,-122.99999c0,-67.9558 55.0442,-122.99999 122.99999,-122.99999c67.9558,0 122.99999,55.0442 122.99999,122.99999c0,67.9558 -55.0442,122.99999 -122.99999,122.99999z',
			'm400,556.49998c-141.7127,0 -256.49999,-114.78729 -256.49999,-256.49999c0,-141.7127 114.78729,-256.49999 256.49999,-256.49999c141.7127,0 256.49999,114.78729 256.49999,256.49999c0,141.7127 -114.78729,256.49999 -256.49999,256.49999z',
			'm400.00001,484.99999c-102.20994,0 -184.99999,-82.79005 -184.99999,-184.99999c0,-102.20994 82.79005,-184.99999 184.99999,-184.99999c102.20994,0 184.99999,82.79005 184.99999,184.99999c0,102.20994 -82.79005,184.99999 -184.99999,184.99999z',
		]
		return (
			<div
				className={cn(
					'absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center',
					className
				)}
			>
				<div className='h-2/3 mt-auto w-full bg-gradient-to-b from-transparent via-background to-background z-[1]'></div>
				<svg
					className='z-0 h-full w-full pointer-events-none absolute -translate-y-[20%] scale-125 lg:scale-100 lg:-translate-y-[5%]'
					width='100%'
					height='100%'
					viewBox='0 0 800 500'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					{paths.map(path => (
						<path
							key={path}
							d={path}
							strokeOpacity={colorScheme === 'dark' ? '0.05' : '0.25'}
							className='stroke-2 md:stroke-[0.5]'
							stroke='url(#paint0_radial_242_278)'
						></path>
					))}

					{paths.map((path, index) => (
						<motion.path
							key={`path-` + index}
							d={path}
							stroke={`url(#linearGradient-${index})`}
							strokeOpacity='0.4'
							strokeWidth='0.5'
						></motion.path>
					))}
					<defs>
						{paths.map((_path, index) => (
							<motion.linearGradient
								id={`linearGradient-${index}`}
								key={`gradient-${index}`}
								initial={{
									x1: '0%',
									x2: '0%',
									y1: '0%',
									y2: '0%',
								}}
								animate={{
									x1: ['0%', '100%'],
									x2: ['0%', '95%'],
									y1: ['0%', '100%'],
									y2: ['0%', `${93 + Math.random() * 8}%`],
								}}
								transition={{
									duration: Math.random() * 10 + 10,
									ease: 'easeInOut',
									repeat: Infinity,
									delay: Math.random() * 10,
								}}
							>
								<stop stopColor='#e11d48' stopOpacity='0'></stop>
								<stop stopColor='#e11d48'></stop>
								<stop offset='32.5%' stopColor='#ae1637'></stop>
								<stop offset='100%' stopColor='#7b0f26' stopOpacity='0'></stop>
							</motion.linearGradient>
						))}

						<radialGradient
							id='paint0_radial_242_278'
							cx='0'
							cy='0'
							r='1'
							gradientUnits='userSpaceOnUse'
							gradientTransform='translate(352 34) rotate(90) scale(555 1560.62)'
						>
							<stop offset='0.0666667' stopColor='var(--neutral-300)'></stop>
							<stop offset='0.243243' stopColor='var(--neutral-300)'></stop>
							<stop offset='0.43594' stopColor='white' stopOpacity='0'></stop>
						</radialGradient>
					</defs>
				</svg>
			</div>
		)
	}
)

BackgroundCircles.displayName = 'BackgroundCircles'
