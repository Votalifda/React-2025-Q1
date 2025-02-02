import React, { Component } from 'react';
import '../App.css';

class Loader extends Component<Record<string, never>, Record<string, never>> {
  render() {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
}

export default Loader;
