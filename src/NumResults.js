export function NumResults({ movies, isLoading, isError }) {
  if (isLoading) {
    return <p className="num-results">Searching...</p>;
  }

  if (isError) {
    return <p className="num-results">Error: {isError}</p>;
  }

  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
