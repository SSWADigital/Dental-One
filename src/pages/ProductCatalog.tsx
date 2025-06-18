import React from 'react';
import ProductCatalogHeader from '../components/ProductCatalogHeader';
import ProductCatalogFilters from '../components/ProductCatalogFilters';
import ProductGrid from '../components/ProductGrid';

const ProductCatalog: React.FC = () => {
  return (
    <>
      <ProductCatalogHeader />
      
      <div className="flex flex-1">
        <ProductCatalogFilters />
        <div className="flex-1 overflow-y-auto">
          <ProductGrid />
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;