import React, { Component, Fragment } from 'react';
import '../App.css';

interface Props {
  item: {
    name: string;
    gender: string;
    birth_year: string;
  };
}

class Row extends Component<Props, Record<string, never>> {
  render() {
    const { name, gender, birth_year } = this.props.item;
    return (
      <Fragment>
        <div className="tableCol">{name}</div>
        <div className="tableCol">{gender}</div>
        <div className="tableCol">{birth_year}</div>
      </Fragment>
    );
  }
}

export default Row;
