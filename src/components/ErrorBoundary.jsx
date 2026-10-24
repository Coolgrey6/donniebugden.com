import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-panel p-6 rounded-2xl border border-rose-900/50 bg-rose-950/20 text-center space-y-3 my-6">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="text-slate-100 font-bold text-sm font-mono">
            Visualizer Encountered an Execution Anomaly
          </h4>
          <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
            {this.state.error?.message || "WebGL render state recovered."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono inline-flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Visualizer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
