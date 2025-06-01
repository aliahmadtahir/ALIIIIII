"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useProduct } from '../../context/ProductContext';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

// Dynamically import ProductDetailModal
const ProductDetailModal = dynamic(() => import('../[slug]/ProductDetailModal'), {
  loading: () => <LoadingSpinner />
});

const frequentlyBought = [
  { name: 'Brim Box Chicken', old: 1095, price: 985.5 },
  { name: 'Dynamite Fries', old: 820, price: 738 },
  { name: 'Chicken Tenders', old: 825, price: 742.5 },
  { name: 'Onion Rings', old: 655, price: 589.5 },
  { name: 'Pepperi Bites', old: 655, price: 589.5 },
  { name: 'Nutella Shake', old: 875, price: 787.5 },
  { name: 'Oreo Shake', old: 875, price: 787.5 },
];

export default function ProductDetailPage() {
  const { selectedProduct, setSelectedProduct } = useProduct();
  const router = useRouter();

  if (!selectedProduct) {
    return null;
  }

  const handleClose = () => {
    router.back();
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col md:flex-row w-full max-w-full md:max-w-5xl h-[90vh] md:h-[80vh] overflow-hidden relative mx-2 my-4 md:mx-auto md:my-0">
        <button onClick={handleClose} className="absolute -top-3 -right-3 z-20">
          <span className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black shadow-lg text-2xl md:text-3xl text-white font-bold hover:bg-gray-900 transition cursor-pointer select-none">
            ×
          </span>
        </button>

        <div className="w-full md:w-1/2 h-60 md:h-full flex flex-col justify-end relative bg-black">
          <Image
            src={selectedProduct.imageUrl}
            alt={`Product image of ${selectedProduct.Name}`}
            fill
            className="object-cover object-center"
            style={{ zIndex: 1 }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            loading="eager"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-black/0 p-4 md:p-6 z-10">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{selectedProduct.Name}</h2>
            <p className="text-white text-sm md:text-base font-medium leading-snug">
              {selectedProduct.Description}
            </p>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <ProductDetailModal product={selectedProduct} frequentlyBought={frequentlyBought} />
        </Suspense>
      </div>
    </div>
  );
} 