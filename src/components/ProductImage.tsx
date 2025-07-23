import React, { useState } from 'react';

interface ProductImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const FallbackJSX = ({ alt }: { alt?: string }) => (
  <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-400 w-full h-full min-h-[80px] min-w-[80px] rounded gap-1">
    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15l-5-5L5 21" />
    </svg>
    <span className="text-xs mt-1">No Image</span>
  </div>
);

const ProductImage: React.FC<ProductImageProps> = ({ src, alt = 'Product Image', className = '' }) => {
  const [error, setError] = useState(false);
  if (!src || src.trim() === '' || error) {
    return <FallbackJSX alt={alt} />;
  }
  // encode URI untuk menghindari error spasi
  const safeSrc = encodeURI(src);
  return (
    <img
      src={safeSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ProductImage; 