// Adapted from https://stackoverflow.com/questions/64607975/react-query-getquerydata-and-setquerydata-with-pagination
const getRelatedCacheKeys = (queryClient, targetKey) => {
  return queryClient
    .getQueryCache()
    .getAll()
    .map((query) => query.queryKey)
    .filter((key) =>
      Array.isArray(key) ? key.includes(targetKey) : key === targetKey,
    );
};

export { getRelatedCacheKeys };
