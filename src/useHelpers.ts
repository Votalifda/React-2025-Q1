export const useHelpers = () => {
  const getIdFromUrl = (url: string) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : '';
  };

  return {
    getIdFromUrl,
  };
};
