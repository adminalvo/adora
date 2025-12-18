'use client';

import { useState } from 'react';

export default function AdminTable() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Məhsul 1', price: 49.99, stock: 10 },
    { id: 2, name: 'Məhsul 2', price: 39.99, stock: 5 },
  ]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Məhsullar</h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Yeni Məhsul Əlavə Et
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-yellow-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-semibold">ID</th>
              <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-semibold">Ad</th>
              <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-semibold">Qiymət</th>
              <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-semibold">Stok</th>
              <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-semibold">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-yellow-50">
                <td className="border border-gray-300 px-4 py-3">{product.id}</td>
                <td className="border border-gray-300 px-4 py-3">{product.name}</td>
                <td className="border border-gray-300 px-4 py-3">{product.price} ₼</td>
                <td className="border border-gray-300 px-4 py-3">{product.stock}</td>
                <td className="border border-gray-300 px-4 py-3">
                  <button className="text-yellow-600 hover:text-yellow-700 mr-3">Düzəlt</button>
                  <button className="text-red-600 hover:text-red-700">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

