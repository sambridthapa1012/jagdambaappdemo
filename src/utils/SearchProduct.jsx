export const smartSearch = (products, query) => {
  if (!query) return [];

  const q = query.toLowerCase().trim();

  return products.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.nameNepali?.includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });
};
