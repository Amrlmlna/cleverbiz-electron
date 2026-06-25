import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store/hooks';
import { createTransaction } from '../store/slices/transactionsSlice';

interface CartItem {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
}

const POSView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris'>('cash');

  const total = cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    await dispatch(createTransaction({
      store_id: 'local',
      total_amount: total,
      payment_method: paymentMethod,
      items: cart.map((item) => ({
        id: '',
        transaction_id: '',
        product_id: item.productId,
        qty: item.qty,
        unit_price: item.unitPrice,
      })),
    }));
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('pos.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Product Grid */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              className="input-field"
              placeholder={t('pos.searchPlaceholder')}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              className="rounded-lg p-4 text-center text-body-sm"
              style={{
                border: '2px dashed var(--color-outline-variant)',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              {t('pos.scanHint')}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div className="card flex flex-col">
          <h2 className="text-title-sm font-semibold mb-4" style={{ color: 'var(--color-on-surface)' }}>
            {t('pos.cart')}
          </h2>

          {cart.length === 0 ? (
            <p className="text-body-sm flex-1" style={{ color: 'var(--color-on-surface-variant)' }}>
              {t('pos.cartEmpty')}
            </p>
          ) : (
            <div className="flex-1 space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-body-sm"
                  style={{ color: 'var(--color-on-surface)' }}>
                  <span>{item.name} x{item.qty}</span>
                  <span>Rp {(item.qty * item.unitPrice).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 mt-4 space-y-3"
            style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
            <div className="flex justify-between font-semibold text-body-lg"
              style={{ color: 'var(--color-on-surface)' }}>
              <span>{t('pos.total')}</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>

            <div>
              <label className="block text-label-sm mb-1"
                style={{ color: 'var(--color-on-surface-variant)' }}>
                {t('pos.paymentMethod')}
              </label>
              <select
                className="input-field"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'qris')}
              >
                <option value="cash">{t('pos.cash')}</option>
                <option value="qris">{t('pos.qris')}</option>
              </select>
            </div>

            <button
              className="btn-primary w-full"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              {t('pos.payNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSView;
