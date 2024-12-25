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

type PageProps = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// SSG için tüm olası yolları önceden oluştur
export async function generateStaticParams() {
  const products = await fetch('https://fakestoreapi.com/products').then((res) =>
    res.json()
  );

  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

// Sayfa içeriğini oluştur
async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 } // 1 saat önbelleğe alma
  });
  
  if (!res.ok) {
    throw new Error('Ürün yüklenirken bir hata oluştu');
  }
  
  return res.json();
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  const product: Product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold mb-2">Kategori: {product.category}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{product.rating.rate}</span>
                <span className="text-gray-400 ml-2">({product.rating.count} değerlendirme)</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">{product.price} TL</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}