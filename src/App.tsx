import React, { ChangeEvent, Component } from 'react';
import Table from './parts/Table.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import ThrowError from './parts/ThrowError.tsx';
import Loader from './parts/Loader.tsx';
import './App.css';

interface AppState {
  isLoading: boolean;
  search: string;
  items: Array<{
    name: string;
    gender: string;
    birth_year: string;
  }>;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      isLoading: false,
      search: localStorage.getItem('search') || '',
      items: [],
    };
  }

  componentDidMount() {
    this.fetchEpisodes().then();
  }

  fetchEpisodes = async () => {
    try {
      this.setState({ ...this.state, isLoading: true });
      const response = await fetch(
        `https://swapi.dev/api/people?search=${this.state.search.trim()}`
      );
      if (!response.ok) {
        throw new Error('Network response error');
      }
      const data = await response.json();
      const items: Array<{ name: string; gender: string; birth_year: string }> =
        data?.results || [];
      this.setState({
        ...this.state,
        isLoading: false,
        items: items.map((item) => ({
          name: item.name,
          gender: item.gender,
          birth_year: item.birth_year,
        })),
      });
    } catch (error) {
      this.setState({ ...this.state, isLoading: false });
      console.error('Error fetching data:', error);
    }
  };

  onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      ...this.state,
      search: e.target.value,
    }));
  };
  handleOnSearch = () => {
    localStorage.setItem('search', this.state.search);
    this.fetchEpisodes();
  };

  render() {
    return (
      <div className="wrapper">
        <div className="section small">
          <label>Search:</label>
          <input
            onChange={(e) => this.onSearchInputChange(e)}
            value={this.state.search}
          />
          <button className="btnSearch" onClick={this.handleOnSearch}>
            Search
          </button>
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
        </div>
        <div className="section big">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <Table items={this.state.items} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
