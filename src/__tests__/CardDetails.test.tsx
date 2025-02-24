import {act, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardDetails from '../parts/CardDetails';
import { vi } from 'vitest';
import { store } from "../store/store.ts";
import { Provider } from "react-redux";

global.fetch = vi.fn();

const mockResponse = {
  id: 1,
  name: 'Luke Skywalker',
  gender: 'male',
  birth_year: '19BBY',
  eye_color: 'blue',
  hair_color: 'blond',
  skin_color: 'fair',
  height: '172',
  mass: '77',
  url: 'https://swapi.dev/api/people/1/',
};

const mockFetchResponse = {
  ok: true,
  json: async () => mockResponse,
  clone: function() {
    return { ...this };
  },
};

describe('CardDetails', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders loader while fetching data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);

    await act(async () => {
      render(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/details/1']}>
              <Routes>
                <Route path="/details/:id" element={<CardDetails />} />
              </Routes>
            </MemoryRouter>
          </Provider>
      );
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  // it('displays fetched data', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);
  //
  //   await act(async () => {
  //     render(
  //         <Provider store={store}>
  //           <MemoryRouter initialEntries={['/details/1']}>
  //             <Routes>
  //               <Route path="/details/:id" element={<CardDetails />} />
  //             </Routes>
  //           </MemoryRouter>
  //         </Provider>
  //     );
  //   });
  //
  //   await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());
  //
  //   expect(screen.getByText('Name:')).toBeInTheDocument();
  //   expect(screen.getByText('Gender:')).toBeInTheDocument();
  //   expect(screen.getByText('Birth Year:')).toBeInTheDocument();
  // });

  it('navigates back on close button click', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);

    await act(async () => {
      render(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/details/1']}>
              <Routes>
                <Route path="/details/:id" element={<CardDetails />} />
                <Route path="/" element={<div>Home</div>} />
              </Routes>
            </MemoryRouter>
          </Provider>
      );
    });

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

    userEvent.click(screen.getByTestId('close-btn'));
    expect(await screen.findByText('Home')).toBeInTheDocument();
  });

  it('handles fetch errors gracefully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      clone: function() {
        return { ...this };
      },
    });

    await act(async () => {
      render(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/details/1']}>
              <Routes>
                <Route path="/details/:id" element={<CardDetails />} />
              </Routes>
            </MemoryRouter>
          </Provider>
      );
    });

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

  });


  it('displays fetched data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);

    await act(async () => {
      render(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/details/1']}>
              <Routes>
                <Route path="/details/:id" element={<CardDetails />} />
              </Routes>
            </MemoryRouter>
          </Provider>
      );
    });

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Gender/)).toBeInTheDocument();
    expect(screen.getByText(/Birth/)).toBeInTheDocument();
    expect(screen.getByText(/Hair/)).toBeInTheDocument();
    expect(screen.getByText(/Mass/)).toBeInTheDocument();
  });

});
