'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { sileo } from 'sileo';
import ContactCards, { copyText } from '@/components/ui/contact-cards';
import { siteConfig } from '@/site.config';

const dockShell =
	'fixed bottom-6 right-16 z-50 flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-[#1f2123] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] max-[480px]:right-3 max-[480px]:bottom-4';

const iconBtn =
	'z-10 inline-flex size-10 items-center justify-center rounded-[12px] text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25';

export default function FloatingContactCards() {
	const { github, githubSecondary, linkedin, fullName, email } = siteConfig;
	const personalAvatar = `https://github.com/${github.username}.png`;
	const secondaryAvatar = githubSecondary.enabled
		? `https://github.com/${githubSecondary.username}.png`
		: personalAvatar;

	const extraLinks = [];

	if (githubSecondary.enabled) {
		extraLinks.push({
			label: githubSecondary.panelLabel,
			href: githubSecondary.url,
			icon: <SecondaryGithubIcon />,
			card: (
				<div className="w-72 overflow-hidden rounded-[14px] border border-white/[0.1] bg-[#1f2123] shadow-2xl">
					<div className="h-12 border-b border-white/[0.08] bg-[#161718]" />
					<div className="flex flex-col gap-1 px-4 pt-2 pb-4">
						<div className="-mt-8 mb-1 w-fit">
							<img
								src={secondaryAvatar}
								alt={githubSecondary.displayName}
								className="block size-14 rounded-full object-cover ring-2 ring-[#1f2123]"
							/>
						</div>
						<span className="text-base font-semibold text-white">{githubSecondary.displayName}</span>
						<span className="text-xs font-medium text-white/55">{githubSecondary.description}</span>
						<span className="break-all font-mono text-[11px] text-white/40">{githubSecondary.url}</span>
					</div>
				</div>
			),
		});
	}

	extraLinks.push({
		label: 'LinkedIn',
		href: linkedin.url,
		icon: <LinkedinOutlineIcon />,
		card: (
			<div className="w-72 overflow-hidden rounded-[14px] border border-white/[0.1] bg-[#1f2123] shadow-2xl">
				<div className="h-12 border-b border-[#0A66C2]/35 bg-[#161718]" />
				<div className="flex flex-col gap-1 px-4 pt-2 pb-4">
					<div className="-mt-8 mb-1 w-fit">
						<img
							src={personalAvatar}
							alt={fullName}
							className="block size-14 rounded-full object-cover ring-2 ring-[#1f2123]"
						/>
					</div>
					<span className="text-base font-semibold text-white">{fullName}</span>
					<span className="text-xs font-medium text-[#7eb6e8]">{linkedin.headline}</span>
					<span className="text-xs text-white/45">{linkedin.subtitle}</span>
				</div>
			</div>
		),
	});

	return (
		<div className={dockShell}>
			<ContactCards
				className="gap-1.5"
				email={email}
				labels={{
					copy: 'Contactar',
					copied: '¡Copiado!',
					contributions: 'contribuciones en el último año',
				}}
				locale="es-ES"
				github={{
					username: github.username,
					url: github.url,
					label: github.label,
					icon: <PersonalGithubIcon />,
					avatar: (
						<img
							src={personalAvatar}
							alt={fullName}
							className="block size-10 shrink-0 rounded-full object-cover ring-1 ring-white/15"
						/>
					),
				}}
				links={extraLinks}
			/>
			<ContactInfoButton />
		</div>
	);
}

function ContactInfoButton() {
	const { email, github, githubSecondary } = siteConfig;
	const [open, setOpen] = useState(false);
	const titleId = useId();
	const descId = useId();
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				setOpen(false);
				triggerRef.current?.focus();
				return;
			}

			if (event.key !== 'Tab' || !panelRef.current) return;

			const focusable = panelRef.current.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled])',
			);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement as HTMLElement | null;

			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		const onPointerDown = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				panelRef.current?.contains(target) ||
				triggerRef.current?.contains(target)
			) {
				return;
			}
			setOpen(false);
		};

		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('mousedown', onPointerDown);
		closeRef.current?.focus();

		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('mousedown', onPointerDown);
		};
	}, [open]);

	return (
		<div className="relative">
			<button
				ref={triggerRef}
				type="button"
				aria-label="Información de contacto"
				title="Información de contacto"
				aria-expanded={open}
				aria-controls={open ? titleId : undefined}
				aria-haspopup="dialog"
				onClick={() => setOpen((value) => !value)}
				className={iconBtn}
			>
				<InfoOutlineIcon />
			</button>

			{open && (
				<div
					ref={panelRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby={titleId}
					aria-describedby={descId}
					className="absolute bottom-[calc(100%+0.75rem)] right-0 z-50 w-[min(21rem,calc(100vw-1.5rem))] rounded-[14px] border border-white/[0.1] bg-[#1f2123] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
				>
					<div className="mb-4 flex items-start justify-between gap-3">
						<div>
							<h2 id={titleId} className="text-sm font-medium tracking-tight text-white">
								Contacto
							</h2>
							<p id={descId} className="mt-1 text-xs text-white/45">
								Email y cuentas de GitHub
							</p>
						</div>
						<button
							ref={closeRef}
							type="button"
							aria-label="Cerrar información de contacto"
							onClick={() => {
								setOpen(false);
								triggerRef.current?.focus();
							}}
							className="inline-flex size-8 items-center justify-center rounded-[10px] border border-white/[0.08] text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
						>
							✕
						</button>
					</div>

					<ul className="space-y-2.5">
						<li className="rounded-[12px] border border-[#3B82F6]/35 bg-[#161718] px-3.5 py-3">
							<p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7eb6e8]">
								Email
							</p>
							<div className="mt-2 flex items-center gap-2">
								<a
									href={`mailto:${email}`}
									className="min-w-0 flex-1 break-all text-sm text-white/90 underline-offset-2 hover:underline"
								>
									{email}
								</a>
								<button
									type="button"
									onClick={async () => {
										const copied = await copyText(email);
										if (copied) {
											sileo.success({
												title: 'Correo copiado',
												description: email,
												position: 'top-center',
												duration: 1800,
											});
										} else {
											sileo.error({
												title: 'Error al copiar',
												description: email,
												position: 'top-center',
												duration: 1800,
											});
										}
									}}
									className="inline-flex shrink-0 items-center gap-1.5 rounded-[12px] border border-white/[0.1] bg-[#1f2123] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/[0.06]"
								>
									<MailOutlineIcon className="size-3.5" />
									Copiar
								</button>
							</div>
						</li>

						<li className="rounded-[12px] border border-white/[0.08] bg-[#161718] px-3.5 py-3">
							<p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7eb6e8]">
								GitHub personal
							</p>
							<a
								href={github.url}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-2 block break-all text-sm text-white/85 underline-offset-2 hover:underline"
							>
								{github.url}
							</a>
						</li>

						{githubSecondary.enabled && (
							<li className="rounded-[12px] border border-white/[0.08] bg-[#161718] px-3.5 py-3">
								<p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
									{githubSecondary.panelLabel}
								</p>
								<a
									href={githubSecondary.url}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-2 block break-all text-sm text-white/85 underline-offset-2 hover:underline"
								>
									{githubSecondary.url}
								</a>
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
}

function PersonalGithubIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true">
			<path
				d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
				fill="#3B82F6"
			/>
		</svg>
	);
}

function SecondaryGithubIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true">
			<path
				d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
				fill="currentColor"
				className="text-white/75"
			/>
		</svg>
	);
}

function LinkedinOutlineIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true">
			<rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
			<path
				d="M8 10.5V16M8 8v.01M12 16v-3.2c0-1.2.8-2 2-2s2 .8 2 2V16"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function MailOutlineIcon({ className = 'size-4' }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
			<path
				d="m4.5 7.5 7.5 5.5 7.5-5.5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function InfoOutlineIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden="true">
			<circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
			<path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
			<circle cx="12" cy="8" r="0.9" fill="currentColor" />
		</svg>
	);
}

export { MailOutlineIcon };
