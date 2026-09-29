import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error internally without exposing stack trace or internals to end-user
    console.error('Unhandled React Component Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1c1c1e] text-center my-4">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Ocurrió un error al cargar este componente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-1.5 text-xs font-semibold rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 transition-all hover:scale-105"
          >
            Recargar sección
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
