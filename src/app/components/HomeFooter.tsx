import Link from 'next/link';
import Image from 'next/image';

export default function HomeFooter() {
  return (
    <footer className="bg-black text-white pt-12 pb-8 relative overflow-hidden">
      {/* Decorative burger SVGs (optional, can be replaced with actual SVGs if available) */}
      <div className="absolute left-0 bottom-0 opacity-10 w-64 h-64 hidden md:block">
        <Image src="/burgers.webp" alt="burger" fill style={{objectFit:'contain'}} sizes="256px" />
      </div>
      {/* Centered BRIM logo and horizontal line */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <h1 className="text-6xl font-extrabold tracking-widest mb-2">BRIM</h1>
        <hr className="border-t border-white/30 w-4/5 max-w-5xl mx-auto" />
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* Site Links */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Site Links</h2>
          <ul className="space-y-2 text-base">
            <li><Link href="/" className="hover:underline">HOME</Link></li>
            <li><Link href="/products" className="hover:underline">MENU</Link></li>
            <li><Link href="#franchising" className="hover:underline">FRANCHISING</Link></li>
            <li><Link href="#contact" className="hover:underline">CONTACT</Link></li>
            <li><Link href="#join" className="hover:underline">JOIN US</Link></li>
          </ul>
        </div>
        {/* Explore Menu */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Explore Menu</h2>
          <ul className="space-y-2 text-base">
            <li><Link href="/products?search=burgers" className="hover:underline">BURGERS</Link></li>
            <li><Link href="/products?search=fries" className="hover:underline">FRIES</Link></li>
            <li><Link href="/products?search=sides" className="hover:underline">SIDES</Link></li>
            <li><Link href="/products?search=drinks" className="hover:underline">DRINKS</Link></li>
          </ul>
        </div>
        {/* Useful Links */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Useful Links</h2>
          <ul className="space-y-2 text-base mb-4">
            <li><Link href="/terms" className="hover:underline">TERMS AND CONDITIONS</Link></li>
            <li><Link href="/privacy" className="hover:underline">PRIVACY POLICY</Link></li>
          </ul>
          <div className="flex flex-col gap-3">
            <a href="#" className="inline-block"><Image src="/google.svg" alt="Google Play" width={150} height={44} sizes="150px" /></a>
            <a href="#" className="inline-block"><Image src="/apple.svg" alt="App Store" width={150} height={44} sizes="150px" /></a>
          </div>
        </div>
        {/* Contact Us */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Contact Us</h2>
          <div className="mb-2 text-base">For Complaints/Suggestions:</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-lg">call</span>
            <span>0302 8102529</span>
          </div>
          <div className="mb-2 text-base">To Order:</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-lg">call</span>
            <span>0304 1112746</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-icons text-lg">mail</span>
            <span>info@brimburger.pk</span>
          </div>
          <div className="mt-4">
            <div className="font-semibold">Opening Hours</div>
            <div className="text-base"><span className="font-bold">Lahore:</span> 12:00 PM to 3:00 AM</div>
            <div className="text-base"><span className="font-bold">Islamabad:</span> 11:00 AM to 2:00 AM</div>
          </div>
        </div>
      </div>
    </footer>
  );
} 