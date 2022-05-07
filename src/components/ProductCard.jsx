import { Suspense } from 'react';
import { Image, Link } from '@shopify/hydrogen';

import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({ product }) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md mb-4 relative">
      <Link to={`/products/${product.handle}`}>
        <div className="mb-2 relative flex items-center justify-center overflow-hidden object-cover h-48">
          {selectedVariant.image ? (
            <Image
              className=" bg-[#ffffff] absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain hover:scale-110"
              data={selectedVariant.image}
            />
          ) : null}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
              Out of stock
            </div>
          )}
        </div>

        <div className='flex w-full flex-wrap flex-col items-center '>
          <div className="text-white font-semibold mb-0.5 text-xl">{product.title}</div>
          <Suspense fallback={null}>
            <MoneyPrice money={selectedVariant.priceV2} />
          </Suspense>
        </div>
      </Link>
    </div>
  );
}
