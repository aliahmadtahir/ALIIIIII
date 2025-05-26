import Image from 'next/image';
import Link from 'next/link';
import ProductDetailModal from '../[slug]/ProductDetailModal';

// Static product data
const product = {
  id: 1,
  Name: "Classic Brim Burger",
  Price: 1295,
  Description: "Our signature burger featuring a juicy beef patty, melted cheese, fresh lettuce, tomatoes, and our special Brim sauce, all served in a toasted brioche bun.",
  discountPrice: 1095,
  imageUrl: "/burgers.webp",
  category: "BURGERS"
};

// Array of random images from public folder
const randomImages = [
  '/burgers.webp',
  '/hot dogs.webp',
  '/loaded fries.webp',
  '/brim which.webp',
  '/brim jounier.webp'
];

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
  // Get a random image from the array
  const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col md:flex-row w-full max-w-full md:max-w-5xl h-[90vh] md:h-[80vh] overflow-hidden relative mx-2 my-4 md:mx-auto md:my-0">
        <Link href="/products" className="absolute -top-3 -right-3 z-20">
          <span className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black shadow-lg text-2xl md:text-3xl text-white font-bold hover:bg-gray-900 transition cursor-pointer select-none">
            ×
          </span>
        </Link>

        <div className="w-full md:w-1/2 h-60 md:h-full flex flex-col justify-end relative bg-black">
          <Image
            src={randomImage}
            alt={product.Name}
            fill
            className="object-cover object-center"
            style={{ zIndex: 1 }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-black/0 p-4 md:p-6 z-10">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{product.Name}</h2>
            <p className="text-white text-sm md:text-base font-medium leading-snug">
              {product.Description}
            </p>
          </div>
        </div>

        <ProductDetailModal product={product} frequentlyBought={frequentlyBought} />
      </div>
    </div>
  );
} 