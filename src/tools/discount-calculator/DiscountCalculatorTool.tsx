"use client";
import { useState } from "react";

export function DiscountCalculatorTool() {
  const [price, setPrice] = useState("100");
  const [discount, setDiscount] = useState("20");
  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const saved = p * d / 100;
  const final_ = p - saved;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
          <input type="number" className="input-field" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount (%)</label>
          <input type="number" className="input-field" value={discount} onChange={e => setDiscount(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-1 text-sm">
        <p className="text-gray-700 dark:text-gray-300">You save: <strong className="text-green-600">${saved.toFixed(2)}</strong></p>
        <p className="text-gray-700 dark:text-gray-300">Final price: <strong className="text-gray-900 dark:text-gray-100 text-lg">${final_.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
