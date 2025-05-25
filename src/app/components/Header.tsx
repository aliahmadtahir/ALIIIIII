import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white w-full py-4">
      <div className="flex items-center justify-between px-4 md:px-[1in]">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-xl tracking-wider">
            BRIM
          </Link>

          <div className="flex items-center">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <div className="ml-1">
              <div className="flex items-center text-sm">
                Deliver to
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </div>
              <div className="text-[11px] leading-none">All Park, Lahore</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <svg 
              className="w-[22px] h-[22px]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
              0
            </span>
          </Link>
          
          <Link 
            href="/sign-in" 
            className="text-sm bg-transparent border border-white rounded-lg px-6 py-2 hover:bg-white hover:text-black transition-colors"
          >
            Sign in / Register
          </Link>
        </div>
      </div>
    </header>
  );
} 