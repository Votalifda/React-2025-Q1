import { Component } from 'react';
import '../App.css';

interface State {
  isError: boolean;
}

class ThrowError extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  handleThrowError = () => {
    this.setState(() => ({
      ...this.state,
      isError: true,
    }));
  };
  render() {
    if (this.state.isError) {
      throw new Error('Testing error boundary!');
    }

    return <button onClick={this.handleThrowError}>Throw Error</button>;
  }
}

export default ThrowError;
