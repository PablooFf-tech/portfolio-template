'use client';

import career from '@/data/career.json';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/ui/timeline';

type CareerEntry = {
  step: number;
  date: string;
  title: string;
  content: string;
};

export function WorkExperienceTimeline() {
  const experiences = career.work as CareerEntry[];

  return (
    <Timeline defaultValue={1} className="w-full max-w-2xl">
      {experiences.map((item) => (
        <TimelineItem
          key={item.step}
          step={item.step}
          className="group/timeline-item relative flex flex-1 flex-col gap-2 ms-6 sm:ms-8 mb-10 last:mb-0 sm:mb-12"
        >
          <TimelineIndicator className="border-blue-500 bg-blue-500/20 text-blue-400 size-5" />
          <TimelineSeparator className="bg-zinc-800/80" />
          <div className="rounded-xl border border-zinc-800/80 bg-[#141417] p-3.5 sm:p-4 shadow-md transition-all duration-200 hover:border-zinc-700 hover:bg-[#1a1a1e]">
            <TimelineHeader>
              <TimelineDate className="text-blue-400 font-semibold text-[11px] tracking-wider uppercase mb-1">
                {item.date}
              </TimelineDate>
              <TimelineTitle className="text-sm sm:text-base font-bold text-zinc-100 mb-1.5 leading-snug">
                {item.title}
              </TimelineTitle>
            </TimelineHeader>
            <TimelineContent className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {item.content}
            </TimelineContent>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export function EducationTimeline() {
  const education = career.education as CareerEntry[];

  return (
    <Timeline defaultValue={1} className="w-full max-w-2xl">
      {education.map((item) => (
        <TimelineItem
          key={item.step}
          step={item.step}
          className="group/timeline-item relative flex flex-1 flex-col gap-2 ms-6 sm:ms-8 mb-10 last:mb-0 sm:mb-12"
        >
          <TimelineIndicator className="border-emerald-500 bg-emerald-500/20 text-emerald-400 size-5" />
          <TimelineSeparator className="bg-zinc-800/80" />
          <div className="rounded-xl border border-zinc-800/80 bg-[#141417] p-3.5 sm:p-4 shadow-md transition-all duration-200 hover:border-zinc-700 hover:bg-[#1a1a1e]">
            <TimelineHeader>
              <TimelineDate className="text-emerald-400 font-semibold text-[11px] tracking-wider uppercase mb-1">
                {item.date}
              </TimelineDate>
              <TimelineTitle className="text-sm sm:text-base font-bold text-zinc-100 mb-1.5 leading-snug">
                {item.title}
              </TimelineTitle>
            </TimelineHeader>
            <TimelineContent className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {item.content}
            </TimelineContent>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
