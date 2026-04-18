"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in ErrorBoundary (${this.props.name || 'Unknown'}):`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 border border-destructive/50 bg-destructive/10 text-destructive rounded-xl m-4 flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <h2 className="font-bold text-lg">Something went wrong</h2>
          </div>
          <p className="text-sm opacity-90 font-mono bg-background/50 p-2 rounded w-full overflow-x-auto">
            {this.state.error?.message || "Unknown error"}
          </p>
          <button 
            className="mt-2 px-4 py-2 bg-background border border-destructive/30 hover:bg-destructive/20 text-destructive rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
            onClick={() => this.setState({ hasError: false })}
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
