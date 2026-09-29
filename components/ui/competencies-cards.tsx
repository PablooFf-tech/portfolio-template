"use client"

import * as React from "react"
import { ShieldCheck, HardDrive, LayoutGrid, ChevronRight } from "lucide-react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"

export interface CompetencyItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export const defaultCompetencies: CompetencyItem[] = [
  {
    id: "seguridad",
    title: "[Competencia 1 — título]",
    description: "Texto de ejemplo. Edita defaultCompetencies en components/ui/competencies-cards.tsx.",
    icon: <ShieldCheck className="size-5 sm:size-6 text-blue-600 dark:text-blue-400" strokeWidth={1.75} />,
  },
  {
    id: "fullstack-ui",
    title: "[Competencia 2 — título]",
    description: "Describe aquí un área en la que destacas (comunicación, liderazgo, técnica, etc.).",
    icon: <LayoutGrid className="size-5 sm:size-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.75} />,
  },
  {
    id: "sistemas",
    title: "[Competencia 3 — título]",
    description: "Otra área que quieras destacar en la sección Sobre mí.",
    icon: <HardDrive className="size-5 sm:size-6 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />,
  },
]

type CompetenciesCardsProps = {
  items?: CompetencyItem[]
  className?: string
}

export function CompetenciesCards({ items = defaultCompetencies, className = "" }: CompetenciesCardsProps) {
  return (
    <div className={`flex flex-col gap-2.5 sm:gap-3 w-full ${className}`}>
      {items.map((item) => (
        <Card
          key={item.id}
          className="group relative flex items-center justify-between p-3.5 sm:p-4 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1c1c1e] hover:bg-zinc-100/80 dark:hover:bg-[#232326] border border-zinc-200/90 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
        >
          {/* Left Icon & Content Block */}
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
            {/* Left Icon Badge Container */}
            <div className="flex size-11 sm:size-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-[#262629] border border-zinc-200/80 dark:border-zinc-700/40 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              {item.icon}
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <CardTitle className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white tracking-tight">
                {item.title}
              </CardTitle>
              <CardDescription className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug font-normal">
                {item.description}
              </CardDescription>
            </div>
          </div>

          {/* Right Chevron Arrow */}
          <ChevronRight className="size-4.5 sm:size-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" strokeWidth={2} />
        </Card>
      ))}
    </div>
  )
}

export default CompetenciesCards
