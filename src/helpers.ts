export const getIdFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : '';
};
