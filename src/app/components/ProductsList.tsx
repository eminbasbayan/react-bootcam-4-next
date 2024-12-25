import React from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Ürünler yüklenirken bir hata oluştu');
  }
  return res.json();
}

export default async function ProductList() {
  const products: Product[] = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-64 mb-4">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain' }}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
          <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.title}</h2>
          <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">{product.price} TL</span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{product.rating.rate}</span>
            <span className="text-gray-500 text-sm ml-2">({product.rating.count} değerlendirme)</span>
          </div>
        </div>
      ))}
    </div>
  );
} 