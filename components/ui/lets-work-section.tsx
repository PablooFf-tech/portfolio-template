"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ArrowUpRight, Calendar, Mail, Copy } from "lucide-react";
import { sileo, Toaster } from "sileo";
import { siteConfig } from "@/site.config";

export function LetsWorkTogether() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const getTheme = (): 'dark' | 'light' => {
      const attr = document.documentElement.getAttribute('data-theme');
      return attr === 'light' ? 'light' : 'dark';
    };

    setTheme(getTheme());

    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  };

  const handleBookCall = () => {
    const win = window.open(siteConfig.calBookingUrl, "_blank", "noopener,noreferrer");
    if (win) win.opener = null;
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(siteConfig.mailtoSubject);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}`;
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const email = siteConfig.email;
    navigator.clipboard.writeText(email).then(() => {
      sileo.success({
        title: "Correo copiado",
        description: email,
        position: "top-center",
        duration: 1800,
      });
    }).catch(() => {
      sileo.error({
        title: "Error al copiar",
        description: email,
        position: "top-center",
        duration: 1800,
      });
    });
  };

  return (
    <section className="flex min-h-[480px] items-center justify-center px-4 py-8">
      <div className="relative flex flex-col items-center gap-10">
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showSuccess ? 1 : 0,
            transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          {/* Elegant heading */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              ¡Excelente!
            </span>
            <h3
              className="text-2xl font-light tracking-tight text-zinc-100 transition-all duration-500 sm:text-4xl"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              ¿Cómo prefieres contactar?
            </h3>
          </div>

          {/* Action buttons grid: Cal.com vs Email sleek compact horizontal buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
            {/* Cal.com Book Call button */}
            <button
              onClick={handleBookCall}
              className="group relative flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 border border-zinc-200/80 whitespace-nowrap"
            >
              <Calendar className="size-4 text-blue-600 sm:size-4.5 shrink-0 transition-transform group-hover:scale-110" strokeWidth={2} />
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900 whitespace-nowrap">
                Agendar llamada
              </span>
              <ArrowUpRight className="size-4 text-zinc-700 sm:size-4.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </button>

            {/* Direct Email button */}
            <button
              onClick={handleSendEmail}
              className="group relative flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 border border-zinc-200/80 whitespace-nowrap"
            >
              <Mail className="size-4 text-emerald-600 sm:size-4.5 shrink-0 transition-transform group-hover:scale-110" strokeWidth={2} />
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900 whitespace-nowrap">
                Enviar correo directo
              </span>
              <ArrowUpRight className="size-4 text-zinc-700 sm:size-4.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </button>
          </div>

          {/* Subtle subtext */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-widest uppercase text-zinc-400 transition-all duration-500 mt-2 text-center"
            style={{
              transform: showSuccess ? "translateY(0)" : "translateY(10px)",
              opacity: showSuccess ? 1 : 0,
              transitionDelay: "450ms",
            }}
          >
            <button
              onClick={handleCopyEmail}
              className="hover:text-emerald-400 transition-colors cursor-pointer underline underline-offset-4 decoration-zinc-700"
              title="Copiar email"
            >
              {siteConfig.email}
            </button>
          </div>
        </div>

        <div
          className="flex items-center gap-3 transition-all duration-500"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 sm:text-sm">
            Disponible para proyectos
          </span>
        </div>

        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          style={{
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <div className="flex flex-col items-center gap-5">
            <h2
              className="relative text-center text-4xl font-light tracking-tight text-zinc-100 sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
              }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                  }}
                >
                  Trabajemos
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                  }}
                >
                  <span className="text-zinc-500">juntos</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-2 flex size-14 items-center justify-center sm:size-20">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                style={{
                  borderColor: isClicked ? "#ffffff" : isHovered ? "#ffffff" : "#3f3f46",
                  backgroundColor: isClicked ? "transparent" : isHovered ? "#ffffff" : "transparent",
                  transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
              <ArrowUpRight
                className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                style={{
                  transform: isClicked
                    ? "translate(100px, -100px) scale(0.5)"
                    : isHovered
                      ? "translate(2px, -2px)"
                      : "translate(0, 0)",
                  opacity: isClicked ? 0 : 1,
                  color: isHovered && !isClicked ? "#0c0c0e" : "#ffffff",
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
            </div>
          </div>

          <div className="absolute -left-6 top-1/2 -translate-y-1/2 sm:-left-16">
            <div
              className="h-px w-6 bg-zinc-700 transition-all duration-500 sm:w-12"
              style={{
                transform: isClicked ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
              }}
            />
          </div>
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 sm:-right-16">
            <div
              className="h-px w-6 bg-zinc-700 transition-all duration-500 sm:w-12"
              style={{
                transform: isClicked ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
              }}
            />
          </div>
        </div>

        <div
          className="mt-6 flex flex-col items-center gap-3 text-center transition-all duration-500 delay-100"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-zinc-400">
            ¿Tienes un proyecto en mente? Me encantaría escucharlo. Creemos algo excepcional juntos.
          </p>
          <button
            onClick={handleCopyEmail}
            className="font-mono text-xs sm:text-sm tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer border-b border-zinc-600 hover:border-white pb-0.5 mt-1"
            style={{ fontFamily: "'Fira Code', monospace" }}
            title="Haz clic para copiar el correo"
          >
            {siteConfig.email}
          </button>
        </div>
      </div>
    </section>
  );
}
