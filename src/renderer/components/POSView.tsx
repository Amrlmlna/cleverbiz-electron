import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store/hooks';
import { createTransaction } from '../store/slices/transactionsSlice';

// ─── Types ────────────────────────────────────────────────
interface CartItem {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
}

interface ProductTile {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const MOCK_PRODUCTS: ProductTile[] = [
  { id: 'P1', name: 'Americano', price: 25000, stock: 48, category: 'Beverage' },
  { id: 'P2', name: 'Cappuccino', price: 30000, stock: 32, category: 'Beverage' },
  { id: 'P3', name: 'Iced Coffee', price: 28000, stock: 5, category: 'Beverage' },
  { id: 'P4', name: 'Matcha Latte', price: 32000, stock: 18, category: 'Beverage' },
  { id: 'P5', name: 'Croissant', price: 15000, stock: 22, category: 'Food' },
  { id: 'P6', name: 'Sandwich', price: 35000, stock: 0, category: 'Food' },
  { id: 'P7', name: 'Mineral Water', price: 5000, stock: 100, category: 'Beverage' },
  { id: 'P8', name: 'Espresso', price: 20000, stock: 55, category: 'Beverage' },
];

// ─── Helpers ──────────────────────────────────────────────
function formatPrice(n: number): string {
  return `Rp ${n.toLocaleString('id-ID')}`;
}

// ─── Component ────────────────────────────────────────────
const POSView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris'>('cash');
  const [search, setSearch] = useState('');

  const total = cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  // Add product to cart
  const handleAddProduct = useCallback(
    (product: ProductTile) => {
      if (product.stock <= 0) return;

      setCart((prev) => {
        const existing = prev.find((c) => c.productId === product.id);
        if (existing) {
          return prev.map((c) =>
            c.productId === product.id ? { ...c, qty: c.qty + 1 } : c
          );
        }
        return [
          ...prev,
          { productId: product.id, name: product.name, qty: 1, unitPrice: product.price },
        ];
      });
    },
    []
  );

  // Update cart item qty
  const handleQtyChange = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.productId === productId ? { ...c, qty: Math.max(0, c.qty + delta) } : c
        )
        .filter((c) => c.qty > 0)
    );
  }, []);

  // Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    await dispatch(
      createTransaction({
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
      })
    );
    setCart([]);
  };

  return (
    <div className="space-y-space-lg">
      <h1 className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
        {t('pos.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-gutter" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* ─── Products Panel (3/5) ──────────────────────── */}
        <div className="lg:col-span-3 card" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Search */}
          <div className="mb-space-md">
            <input
              type="text"
              className="input-field"
              placeholder={t('pos.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm flex-1" style={{ alignContent: 'start' }}>
            {filteredProducts.map((product) => {
              const outOfStock = product.stock <= 0;
              const lowStock = product.stock > 0 && product.stock <= 10;
              return (
                <button
                  key={product.id}
                  className="product-tile"
                  disabled={outOfStock}
                  onClick={() => handleAddProduct(product)}
                  title={
                    outOfStock
                      ? 'Out of stock'
                      : `${product.name} — ${formatPrice(product.price)}`
                  }
                >
                  {/* Category chip */}
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'var(--color-surface-container)',
                      color: 'var(--color-on-surface-variant)',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {product.category}
                  </span>

                  {/* Name */}
                  <span className="text-body-md font-semibold mt-space-xs" style={{ color: 'var(--color-on-surface)' }}>
                    {product.name}
                  </span>

                  {/* Price */}
                  <span className="text-title-sm font-semibold" style={{ color: 'var(--color-tertiary)' }}>
                    {formatPrice(product.price)}
                  </span>

                  {/* Stock indicator */}
                  {lowStock && (
                    <span className="text-label-sm" style={{ color: 'var(--color-warning)' }}>
                      {t('dashboard.lowStockItems')}: {product.stock}
                    </span>
                  )}
                  {outOfStock && (
                    <span className="text-label-sm" style={{ color: 'var(--color-error)' }}>
                      Out of stock
                    </span>
                  )}
                </button>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-space-xl">
                <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {t('pos.scanHint')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ─── Cart Panel (2/5) ──────────────────────────── */}
        <div className="lg:col-span-2 card" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Cart header */}
          <h2 className="text-title-sm font-semibold mb-space-md" style={{ color: 'var(--color-on-surface)' }}>
            {t('pos.cart')}
            {itemCount > 0 && (
              <span className="ml-2 badge badge-info">{itemCount}</span>
            )}
          </h2>

          {/* Cart items */}
          <div className="flex-1 space-y-space-sm" style={{ minHeight: 0, overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {t('pos.cartEmpty')}
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="cart-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-medium truncate" style={{ color: 'var(--color-on-surface)' }}>
                      {item.name}
                    </p>
                    <p className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {formatPrice(item.unitPrice)} × {item.qty}
                    </p>
                  </div>

                  <div className="flex items-center gap-space-xs">
                    <button
                      className="qty-btn"
                      onClick={() => handleQtyChange(item.productId, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span
                      className="text-body-md font-semibold"
                      style={{ color: 'var(--color-on-surface)', minWidth: 28, textAlign: 'center' }}
                    >
                      {item.qty}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQtyChange(item.productId, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-body-md font-semibold" style={{ color: 'var(--color-on-surface)', minWidth: 80, textAlign: 'right' }}>
                    {formatPrice(item.qty * item.unitPrice)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Checkout section */}
          <div
            className="pt-space-md mt-space-md"
            style={{ borderTop: '1px solid var(--color-outline-variant)' }}
          >
            {/* Total */}
            <div className="flex items-center justify-between mb-space-md">
              <span className="text-title-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>
                {t('pos.total')}
              </span>
              <span className="text-headline-md font-semibold" style={{ color: 'var(--color-on-surface)' }}>
                {formatPrice(total)}
              </span>
            </div>

            {/* Payment method */}
            <div className="mb-space-md">
              <label className="block text-label-sm mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                {t('pos.paymentMethod')}
              </label>
              <div className="flex gap-space-sm">
                <button
                  className={`payment-option ${paymentMethod === 'cash' ? 'payment-option-active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  💵 {t('pos.cash')}
                </button>
                <button
                  className={`payment-option ${paymentMethod === 'qris' ? 'payment-option-active' : ''}`}
                  onClick={() => setPaymentMethod('qris')}
                >
                  📱 {t('pos.qris')}
                </button>
              </div>
            </div>

            {/* Pay button */}
            <button
              className="btn-primary w-full"
              onClick={handleCheckout}
              disabled={cart.length === 0}
              style={{ fontSize: 16, padding: '12px 24px' }}
            >
              {t('pos.payNow')} — {formatPrice(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSView;
