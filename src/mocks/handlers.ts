import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/people/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      url: `https://swapi.dev/api/people/${id}/`,
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
      eye_color: 'blue',
      hair_color: 'blond',
      skin_color: 'fair',
      height: '172',
      mass: '77',
    });
  }),
];
