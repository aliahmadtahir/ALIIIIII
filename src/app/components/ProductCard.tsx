import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  imageUrl: string;
}

export default function ProductCard({
  name,
  description,
  price,
  discountPrice,
  discountPercent,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href="/products/detail" className="block">
      <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow p-2 sm:p-3 hover:shadow-lg transition max-w-full sm:max-w-5xl mx-auto cursor-pointer">
        {/* Image Section */}
        <div className="relative w-full sm:w-36 h-40 sm:h-40 flex-shrink-0 rounded-lg overflow-hidden mx-auto sm:mx-0">
          {discountPercent && (
            <span className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
          <Image
            src={imageUrl}
            alt={name}
            width={144}
            height={144}
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between mt-3 sm:mt-0 sm:ml-5 flex-grow">
          <div>
            <h3 className="font-black text-base sm:text-lg text-black leading-tight">{name}</h3>
            <p
              className="font-medium text-[#222] text-sm sm:text-[15px] mt-1 line-clamp-2"
              style={{ maxWidth: 270 }}
            >
              {description}
            </p>
          </div>

          <div className="mt-2 sm:mt-3">
            <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-sm sm:text-base font-bold rounded">
              <span>
                Rs. {(discountPrice ?? price).toLocaleString("en-PK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {discountPrice && (
                <span className="line-through text-xs sm:text-sm text-gray-300">
                  {price.toLocaleString("en-PK", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              )}
            </span>
          </div>
          <div className="mt-3 sm:mt-4 flex justify-between items-center">
            <button className="font-black text-sm sm:text-base text-black hover:bg-black hover:text-white transition px-0 py-0 rounded shadow-none">
              Add To Cart
            </button>
            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </Link>
  );
}
