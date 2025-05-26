import { getProductsByCategory, Product } from "../lib/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

// Disable static page generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const productsByCategory = await getProductsByCategory();
  const searchTerm = searchParams?.search?.toLowerCase() || '';

  // Filter products based on search term
  const filteredProducts: Record<string, Product[]> = {};
  Object.entries(productsByCategory).forEach(([category, products]) => {
    const filteredCategoryProducts = products.filter(
      (product) =>
        product.Name.toLowerCase().includes(searchTerm) ||
        category.toLowerCase().includes(searchTerm)
    );
    if (filteredCategoryProducts.length > 0) {
      filteredProducts[category] = filteredCategoryProducts;
    }
  });

  const categoryNames = Object.keys(filteredProducts);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Header />
      <Categories initialCategories={categoryNames} />
      <div className="px-2 sm:px-8 py-6 sm:py-8">
        <SearchBar />
        <div className="space-y-8 sm:space-y-12">
          {categoryNames.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              {searchTerm ? (
                <h2 className="font-black text-xl sm:text-2xl">No products found for &quot;{searchTerm}&quot;</h2>
              ) : (
                <>
                  <h2 className="font-black text-xl sm:text-2xl">No products available</h2>
                  <p className="text-black mt-2">Check back later for new products!</p>
                </>
              )}
            </div>
          ) : (
            categoryNames.map((catName) =>
              filteredProducts[catName]?.length ?
                <div 
                  key={catName} 
                  id={catName.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-8 sm:mb-12 last:mb-0 scroll-mt-20"
                >
                  <div className="mb-4 sm:mb-6">
                    <h2 className="font-black text-lg sm:text-2xl">{catName}</h2>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full">
                    {filteredProducts[catName].map((product) => (
                      <ProductCard
                        key={product.id}
                        name={product.Name}
                        description={product.Description}
                        price={product.Price}
                        discountPrice={product.discountPrice}
                        discountPercent={
                          product.discountPrice
                            ? Math.round(((product.Price - product.discountPrice) / product.Price) * 100)
                            : undefined
                        }
                        imageUrl={product.imageUrl}
                      />
                    ))}
                  </div>
                </div>
              : null
            )
          )}
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
