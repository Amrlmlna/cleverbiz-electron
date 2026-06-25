import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductsView: React.FC = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
          {t('products.title')}
        </h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? t('products.cancel') : t('products.addProduct')}
        </button>
      </div>

      {showForm && (
        <div className="card max-w-lg">
          <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
            {t('products.newProduct')}
          </h2>
          <form className="space-y-3">
            <input className="input-field" placeholder={t('products.productName')} />
            <input className="input-field" placeholder={t('products.sku')} />
            <input className="input-field" type="number" placeholder={t('products.price')} />
            <input className="input-field" type="number" placeholder={t('products.initialStock')} />
            <input className="input-field" placeholder={t('products.category')} />
            <button type="submit" className="btn-primary">{t('products.saveProduct')}</button>
          </form>
        </div>
      )}

      <div className="card">
        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('products.noProducts')}
        </p>
      </div>
    </div>
  );
};

export default ProductsView;
