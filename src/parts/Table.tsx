import React, { Component } from 'react';
import '../App.css';
import Row from './Row.tsx';

interface AppState {
  items: Array<{
    name: string;
    gender: string;
    birth_year: string;
  }>;
}

class Table extends Component<AppState, Record<string, never>> {
  render() {
    return (
      <div className="table">
        <div className="tableCol tableHeader">Name</div>
        <div className="tableCol tableHeader">Gender</div>
        <div className="tableCol tableHeader">Birth Year</div>
        {this.props.items.map((item) => (
          <Row
            key={`${item.name}_${item.gender}_${item.birth_year}`}
            item={item}
          />
        ))}
      </div>
    );
  }
}

export default Table;
