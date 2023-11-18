import React, { Component, ErrorInfo, ReactNode, ReactElement } from 'react';
import { Result } from '../../styles';
import Button from '../Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactElement | ReactNode {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="Unexpected error has occurred in the application."
          extra={<Button onClick={this.handleRefresh}>Refresh Page</Button>}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
