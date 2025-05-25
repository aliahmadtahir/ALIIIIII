'use client';

import { useEffect, useState } from 'react';

interface CategoriesProps {
  initialCategories: string[];
}

export default function Categories({ initialCategories }: CategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    if (initialCategories.length > 0) {
      setActiveCategory(initialCategories[0]);
    }
  }, [initialCategories]);

  useEffect(() => {
    const handleScroll = () => {
      if (initialCategories.length === 0) return;

      const sections = initialCategories.map(cat => {
        const element = document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'));
        if (!element) return { id: cat, top: Infinity };
        const rect = element.getBoundingClientRect();
        return { id: cat, top: Math.abs(rect.top) };
      });

      // Filter out sections with Infinity top value
      const validSections = sections.filter(section => section.top !== Infinity);
      if (validSections.length === 0) return;

      const closest = validSections.reduce((prev, curr) => 
        prev.top < curr.top ? prev : curr, validSections[0]
      );

      setActiveCategory(closest.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialCategories]);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (initialCategories.length === 0) return null;

  return (
    <div className="sticky top-0 w-full bg-white z-50 shadow-md">
      <div className="flex justify-start px-4 md:px-[1in] py-4 overflow-x-auto no-scrollbar cursor-pointer">
        {initialCategories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className={`text-sm font-bold px-4 first:pl-0 last:pr-0 whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === category
                ? 'text-black border-b-[3px] border-black pb-4 -mb-4'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
} 