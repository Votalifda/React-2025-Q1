import React, { Component, Fragment } from 'react';
import '../App.css';

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
          <Fragment key={`${item.name}_${item.gender}_${item.birth_year}`}>
            <div className="tableCol">{item.name}</div>
            <div className="tableCol">{item.gender}</div>
            <div className="tableCol">{item.birth_year}</div>
          </Fragment>
        ))}
      </div>
    );
  }
}

export default Table;
