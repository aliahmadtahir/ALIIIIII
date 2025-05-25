// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import HomeSlider from './components/HomeSlider';
import { getProductsByCategory } from './lib/api';
import HomeFooter from './components/HomeFooter';

export default async function HomePage() {
  // Fetch products grouped by category
  const productsByCategory = await getProductsByCategory();

  // Map of category name to imageUrl (first product in each category)
  const categoryImages: Record<string, string> = {
    BURGERS: productsByCategory['BURGERS']?.[0]?.imageUrl || '/burgers.webp',
    'HOT DOGS': productsByCategory['HOT DOGS']?.[0]?.imageUrl || '/hot dogs.webp',
    'LOADED FRIES': productsByCategory['LOADED FRIES']?.[0]?.imageUrl || '/loaded fries.webp',
    BRIMWICH: productsByCategory['BRIMWICH']?.[0]?.imageUrl || '/brim which.webp',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Welcome Bar */}
      <div className="bg-black text-white text-center py-1 text-sm font-normal">
        Welcome to Brim Pakistan
      </div>
      {/* Main Nav Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-8 py-3 sm:py-4 bg-white shadow-sm gap-2 sm:gap-0">
        {/* Logo */}
        <div className="bg-black px-4 py-2 flex items-center justify-center mb-2 sm:mb-0" style={{ minWidth: 90, minHeight: 40 }}>
          <span className="text-white font-extrabold text-2xl sm:text-4xl tracking-widest" style={{ letterSpacing: '0.1em' }}>BRIM</span>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-4 sm:gap-8 justify-center">
          <Link href="/" className="font-bold text-base sm:text-lg text-black hover:text-amber-600 transition">HOME</Link>
          <Link href="/products" className="font-bold text-base sm:text-lg text-black hover:text-amber-600 transition">MENU</Link>
          <Link href="#franchising" className="font-bold text-base sm:text-lg text-black hover:text-amber-600 transition">FRANCHISING</Link>
          <Link href="#contact" className="font-bold text-base sm:text-lg text-black hover:text-amber-600 transition">CONTACT</Link>
          <Link href="#join" className="font-bold text-base sm:text-lg text-black hover:text-amber-600 transition">JOIN US</Link>
        </nav>
      </div>
      {/* Main Content - Add your home page images and content below */}
      <HomeSlider />

      {/* Hero Headings */}
      <div className="text-center mt-10 sm:mt-16">
        <h2 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 text-black">BEST BURGERS<br className="hidden sm:block" />IN PAKISTAN</h2>
        <h3 className="text-lg sm:text-3xl font-extrabold tracking-wide mb-8 sm:mb-12 mt-4 sm:mt-8 text-black">OUR CATEGORIES</h3>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 px-2 sm:px-4 mb-10 sm:mb-20">
        <CategoryCard name="BURGERS" img={categoryImages['BURGERS']} />
        <CategoryCard name="HOT DOGS" img={categoryImages['HOT DOGS']} />
        <CategoryCard name="LOADED FRIES" img={categoryImages['LOADED FRIES']} />
        <CategoryCard name="BRIMWICH" img={categoryImages['BRIMWICH']} />
        <CategoryCard name="BRIM JUNIOR" img="/brim jounier.webp" />
        <CategoryCard name="NAKED BOX" img="/naked box.webp" />
      </div>
      {/* Banner image below the boxes */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Image src="/banner.webp" alt="BRIM Delivery Banner" width={1920} height={400} className="w-full h-auto max-h-[180px] sm:max-h-[300px] md:max-h-[400px] object-cover" priority />
      </div>
      {/* Additional banners: serve and app */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Image src="/serve.webp" alt="Serve Banner" width={1920} height={400} className="w-full h-auto max-h-[180px] sm:max-h-[300px] md:max-h-[400px] object-cover" priority />
      </div>
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Image src="/app.webp" alt="App Banner" width={1920} height={400} className="w-full h-auto max-h-[180px] sm:max-h-[300px] md:max-h-[400px] object-cover" priority />
      </div>

      <HomeFooter />
    </div>
  );
}

// CategoryCard component
function CategoryCard({ name, img }: { name: string; img: string }) {
  return (
    <Link href="/products" className="block group rounded-lg border-2 border-gray-200 hover:border-black transition overflow-hidden bg-white">
      <div className="aspect-square w-full bg-black flex items-center justify-center">
        <Image
          src={img}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={name === 'BURGERS'}
        />
      </div>
      <div className="py-2 sm:py-4 text-center">
        <span className="text-lg sm:text-2xl font-extrabold tracking-wider text-black transition">{name}</span>
      </div>
    </Link>
  );
}