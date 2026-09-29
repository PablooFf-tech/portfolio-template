'use client';

import ContactCards, { type ContributionDay } from '@/components/ui/contact-cards';

/** A year of made-up activity, deterministic so it renders the same everywhere. */
function sampleDays(): ContributionDay[] {
	const start = new Date();
	start.setUTCDate(start.getUTCDate() - 370);

	return Array.from({ length: 371 }, (_, index) => {
		const date = new Date(start);
		date.setUTCDate(date.getUTCDate() + index);
		const wave = Math.sin(index / 9) + Math.sin(index / 23) + Math.sin(index / 3.5);
		const weekday = date.getUTCDay();
		const quieter = weekday === 0 || weekday === 6 ? 0.35 : 1;
		return {
			date: date.toISOString().slice(0, 10),
			count: Math.max(0, Math.round((wave + 1.4) * 3 * quieter)),
		};
	});
}

export default function ContactCardsDemo() {
	return (
		<div className="flex items-end p-8 pt-72">
			<ContactCards
				email="hello@example.com"
				github={{ username: 'your-handle', url: 'https://github.com', days: sampleDays() }}
				links={[
					{
						label: 'LinkedIn',
						href: 'https://www.linkedin.com/in/example',
						icon: <LinkedinIcon />,
						card: (
							<div className="w-72">
								<div className="h-16 bg-gradient-to-br from-[#0A66C2] to-[#0A66C2]/30" />
								<div className="flex flex-col gap-1 px-4 pt-2 pb-4">
									<div className="-mt-11 mb-1 w-fit">
										<span className="block size-14 rounded-full bg-gradient-to-br from-orange-300 to-red-500 ring-4 ring-white dark:ring-zinc-900" />
									</div>
									<span className="font-medium">Your Name</span>
									<span className="text-sm text-zinc-500">Full-Stack Engineer · Remote</span>
								</div>
							</div>
						),
					},
					{
						label: 'X',
						href: 'https://x.com/example',
						icon: <XIcon />,
						card: (
							<div className="flex w-72 flex-col gap-1 p-4">
								<span className="font-medium">@example</span>
								<span className="text-sm text-zinc-500">
									Building things for the web, mostly in TypeScript.
								</span>
							</div>
						),
					},
				]}
			/>
		</div>
	);
}

function LinkedinIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-6 fill-current">
			<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.4 4.4 5.6V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 2.99V21h-4V9Z" />
		</svg>
	);
}

function XIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-6 fill-current">
			<path d="M18.9 2H22l-7 8 8.2 12H17l-5-7.3L6.5 22H3.4l7.5-8.6L3 2h6.3l4.6 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
		</svg>
	);
}
