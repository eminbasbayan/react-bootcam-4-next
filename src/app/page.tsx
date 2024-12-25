
import Image from 'next/image';
import Link from 'next/link';

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
  const res = await fetch('https://fakestoreapi.com/products');
  
  if (!res.ok) {
    throw new Error('Ürünler yüklenirken bir hata oluştu');
  }
  
  return res.json();
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Ürünlerimiz</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            href={`/products/${product.id}`} 
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-blue-600">{product.price} TL</span>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{product.rating.rate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
