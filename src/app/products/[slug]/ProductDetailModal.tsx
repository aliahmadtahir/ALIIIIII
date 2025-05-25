'use client';
import { useState, useEffect } from 'react';
import { Product } from '../../lib/api';

interface ProductDetailModalProps {
  product: Product;
  frequentlyBought: { name: string; old: number; price: number }[];
}

export default function ProductDetailModal({ product, frequentlyBought }: ProductDetailModalProps) {
  const [mealOpen, setMealOpen] = useState(true);
  const [fbtOpen, setFbtOpen] = useState(true);
  const [mainQty, setMainQty] = useState(1);
  const [fbtQty, setFbtQty] = useState(Array(frequentlyBought.length).fill(0));
  const [selectedMeal, setSelectedMeal] = useState<null | { name: string; old: number; price: number }>(null);

  useEffect(() => {
    setFbtQty(Array(frequentlyBought.length).fill(0));
  }, [frequentlyBought]);

  // Meal options
  const mealOptions = [
    { name: 'Classic Fries & Soft Drink', old: 505, price: 454.5 },
    { name: 'Curly Fries & Soft Drink', old: 610, price: 549 },
  ];

  // Calculate totals
  const mealTotal = selectedMeal ? selectedMeal.price * mainQty : 0;
  const mealOldTotal = selectedMeal ? selectedMeal.old * mainQty : 0;
  const fbtTotal = fbtQty.reduce((sum, qty, i) => sum + qty * frequentlyBought[i].price, 0);
  const fbtOldTotal = fbtQty.reduce((sum, qty, i) => sum + qty * frequentlyBought[i].old, 0);
  const mainTotal = (product.discountPrice ?? product.Price) * mainQty;
  const mainOldTotal = product.Price * mainQty;
  const grandTotal = mainTotal + mealTotal + fbtTotal;
  const grandOldTotal = mainOldTotal + mealOldTotal + fbtOldTotal;

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col bg-white text-black">
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Make It A Meal Section */}
        <div className="p-3 md:p-4 pb-0">
          <div className="font-bold text-base md:text-[17px] mb-2 md:mb-3 bg-gray-100 rounded px-3 md:px-4 py-2 md:py-3 flex items-center justify-between select-none cursor-pointer" onClick={() => setMealOpen(v => !v)}>
            <span>Make It A Meal</span>
            <button className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black text-xl font-bold transition-transform ${mealOpen ? '' : 'rotate-180'}`} type="button">
              <span>⌄</span>
            </button>
          </div>
          {mealOpen && (
            <div className="mt-1 md:mt-2 mb-2 md:mb-3 divide-y">
              {mealOptions.map((opt, idx) => (
                <label key={opt.name} className="flex items-center py-3 md:py-4 cursor-pointer text-sm md:text-base">
                  <input
                    type="radio"
                    name="meal"
                    checked={selectedMeal?.name === opt.name}
                    onChange={() => setSelectedMeal(opt)}
                    className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5 accent-black"
                  />
                  <span className="flex-1">{opt.name}</span>
                  <span className="text-red-400 line-through mr-1 md:mr-2">{opt.old.toLocaleString('en-PK', {minimumFractionDigits:2})}</span>
                  <span className="font-semibold">Rs. {opt.price.toLocaleString('en-PK', {minimumFractionDigits:2})}</span>
                </label>
              ))}
            </div>
          )}
          {/* Frequently Bought Together Section */}
          <div className="flex items-center gap-2 mt-2 mb-1 md:mb-2">
            <span className="font-bold text-sm md:text-[16px]">Frequently Bought Together.</span>
            <span className="bg-black text-white text-xs rounded px-2 py-1 ml-2">maximum 9</span>
            <button
              onClick={() => setFbtOpen(v => !v)}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black text-xl font-bold ml-auto transition-transform ${fbtOpen ? '' : 'rotate-180'}`}
              type="button"
            >
              <span>⌄</span>
            </button>
          </div>
          {fbtOpen && (
            <div className="divide-y">
              {frequentlyBought.map((item, i) => (
                <div key={item.name} className="flex items-center py-2 md:py-3 text-sm md:text-base">
                  <span className="flex-1">{item.name}</span>
                  <span className="text-red-400 font-semibold line-through mr-1 md:mr-2 min-w-[48px] md:min-w-[60px] text-right">{item.old.toLocaleString('en-PK', {minimumFractionDigits:2})}</span>
                  <span className="font-semibold min-w-[60px] md:min-w-[70px] text-right">Rs. {item.price.toLocaleString('en-PK', {minimumFractionDigits:2})}</span>
                  {fbtQty[i] > 0 ? (
                    <>
                      <button
                        onClick={() => setFbtQty(qty => qty.map((q, idx) => idx === i ? Math.max(0, q - 1) : q))}
                        className="ml-2 md:ml-3 w-8 md:w-9 h-8 md:h-9 bg-black text-white flex items-center justify-center"
                        style={{ borderRadius: 0 }}
                      >
                        <span className="text-xl md:text-2xl leading-none">-</span>
                      </button>
                      <span className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center bg-white text-black text-base font-bold border border-gray-200 mx-1" style={{ borderRadius: 0 }}>{fbtQty[i]}</span>
                      <button
                        onClick={() => setFbtQty(qty => qty.map((q, idx) => idx === i ? Math.min(9, q + 1) : q))}
                        className="w-8 md:w-9 h-8 md:h-9 bg-black text-white flex items-center justify-center"
                        style={{ borderRadius: 0 }}
                        disabled={fbtQty[i] >= 9}
                      >
                        <span className="text-xl md:text-2xl leading-none">+</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setFbtQty(qty => qty.map((q, idx) => idx === i ? 1 : q))}
                      className="ml-2 md:ml-3 w-8 md:w-9 h-8 md:h-9 bg-black text-white flex items-center justify-center"
                      style={{ borderRadius: 0 }}
                    >
                      <span className="text-xl md:text-2xl leading-none">+</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 left-0 w-full bg-white p-0 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-white p-3 md:p-4">
          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setMainQty(q => Math.max(1, q - 1))} className="w-8 md:w-10 h-8 md:h-10 bg-black text-white text-xl md:text-2xl flex items-center justify-center" style={{ borderRadius: 0 }}>-</button>
            <span className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-white text-black text-base md:text-lg font-bold border border-gray-200" style={{ borderRadius: 0 }}>{mainQty}</span>
            <button onClick={() => setMainQty(q => q + 1)} className="w-8 md:w-10 h-8 md:h-10 bg-black text-white text-xl md:text-2xl flex items-center justify-center" style={{ borderRadius: 0 }}>+</button>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-base md:text-lg text-black">Rs. {grandTotal.toLocaleString('en-PK', {minimumFractionDigits:2})}</span>
            <span className="line-through text-red-400 text-sm md:text-base">{grandOldTotal.toLocaleString('en-PK', {minimumFractionDigits:2})}</span>
          </div>
          <button className="bg-black text-white font-bold rounded w-full sm:w-40 h-10 md:h-12 text-base mt-2 sm:mt-0">Add To Cart</button>
        </div>
      </div>
    </div>
  );
} 