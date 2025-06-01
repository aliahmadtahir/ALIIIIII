import { getProductsByCategory } from "../lib/api";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Dynamically import components
const ProductCard = dynamic(() => import('../components/ProductCard'), {
  loading: () => <LoadingSpinner />
});
const Categories = dynamic(() => import('../components/Categories'), {
  loading: () => <LoadingSpinner />
});
const Header = dynamic(() => import('../components/Header'), {
  loading: () => <LoadingSpinner />
});
const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), {
  loading: () => <LoadingSpinner />
});
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <LoadingSpinner />
});

// Remove force-dynamic and add better caching
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductsPage() {
  const productsByCategory = await getProductsByCategory();
  const categoryNames = Object.keys(productsByCategory);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Categories initialCategories={categoryNames} />
      </Suspense>
      <div className="px-2 sm:px-8 py-6 sm:py-8">
        <div className="space-y-8 sm:space-y-12">
          {categoryNames.length === 0 ? (
            <div className="text-center py-8 sm:pb-12">
              <h2 className="font-black text-xl sm:text-2xl">No products available</h2>
              <p className="text-black mt-2">Check back later for new products!</p>
            </div>
          ) : (
            categoryNames.map((catName) =>
              productsByCategory[catName]?.length ? (
                <div
                  key={catName}
                  id={catName.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-8 sm:mb-12 last:mb-0 scroll-mt-20"
                >
                  <div className="mb-4 sm:mb-6">
                    <h2 className="font-black text-lg sm:text-2xl">{catName}</h2>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full">
                    {productsByCategory[catName].map((product) => (
                      <Suspense key={product.id} fallback={<LoadingSpinner />}>
                        <ProductCard
                          id={product.id}
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
                          category={product.category}
                        />
                      </Suspense>
                    ))}
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollToTop />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
}