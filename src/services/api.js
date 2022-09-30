import categories from './categories';

export async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const data = await response.json();
    return data;
  } catch {
    alert('Falha ao buscar categorias!');
    return categories;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId) {
    const response = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    return response.json();
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const data = await response.json();
  return data;
}
