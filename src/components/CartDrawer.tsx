import React, { useState } from 'react';
import type { CartItem } from '../types';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

const AVAILABLE_PRODUCTS: CartItem[] = [
  {
    id: 'standard-deck',
    name: 'MADE YOU SAY IT — Standard Edition',
    edition: '1st Edition · 80 Cards · Rigid Tuck Box',
    price: 350,
    quantity: 1,
    badge: 'LAUNCH PRICE',
    imageUrl: '/brand/box-mockup.png'
  },
  {
    id: 'duo-pack',
    name: 'The Dual Host Bundle (2x Decks)',
    edition: '2x 80 Cards (160 Total) · Save ₱50',
    price: 650,
    quantity: 0,
    badge: 'SAVE ₱50',
    imageUrl: '/brand/box-mockup.png'
  },
  {
    id: 'digital-pnp',
    name: 'Print & Play Sampler PDF',
    edition: '6 Flagship Cards · Immediate Print Ready',
    price: 0,
    quantity: 0,
    badge: 'FREE SAMPLE',
    imageUrl: '/cards/EXPOSE 1point.png'
  }
];

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, soundEnabled }) => {
  const [items, setItems] = useState<CartItem[]>(AVAILABLE_PRODUCTS);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('104829');

  if (!isOpen) return null;

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
    if (soundEnabled) playSound('click');
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'MEMORIES' || code === 'FIRSTROUND' || code === 'BARKADA') {
      setDiscountPercent(15);
      setPromoMessage('15% VIP DISCOUNT APPLIED');
      if (soundEnabled) playSound('score');
    } else {
      setDiscountPercent(0);
      setPromoMessage('INVALID CODE (TRY: BARKADA)');
      if (soundEnabled) playSound('pass');
    }
  };

  const activeItems = items.filter((i) => i.quantity > 0);
  const subtotal = activeItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const shippingThreshold = 700;
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 80;
  const total = Math.max(0, subtotal - discount + (activeItems.length > 0 && subtotal > 0 ? shipping : 0));

  const handleCheckout = () => {
    setIsCheckingOut(true);
    if (soundEnabled) playSound('score');

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderNumber(String(Math.floor(100000 + Math.random() * 900000)));
      setOrderComplete(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (soundEnabled) playSound('score');
    }, 1200);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.headerTag}>YOUR CART</span>
            <h3 className={styles.title}>ORDER DISPATCH</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className={styles.shippingBar}>
          {subtotal >= shippingThreshold ? (
            <span className={styles.shippingAchieved}>✓ YOU UNLOCKED FREE SHIPPING (METRO MANILA & NATIONWIDE)</span>
          ) : (
            <span>ADD ₱{(shippingThreshold - subtotal).toLocaleString()} MORE FOR FREE SHIPPING</span>
          )}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Order Completed View */}
        {orderComplete ? (
          <div className={styles.successView}>
            <div className={styles.successBadge}>ORDER CONFIRMED</div>
            <h3 className={styles.successTitle}>GET READY TO PLAY.</h3>
            <p className={styles.successDesc}>
              Your copy of <strong>MADE YOU SAY IT</strong> is queued for delivery. A tracking link will be sent to your email.
            </p>
            <div className={styles.successOrderSummary}>
              <span>ORDER NO: #MYSI-{orderNumber}</span>
              <span>TOTAL BILLED: ₱{total.toLocaleString()}</span>
            </div>
            <button
              className={styles.continueBtn}
              onClick={() => {
                setOrderComplete(false);
                onClose();
              }}
            >
              CONTINUE EXPLORING
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className={styles.itemsList}>
              {items.map((item) => {
                return (
                  <div key={item.id} className={`${styles.itemCard} ${item.quantity > 0 ? styles.itemCardActive : ''}`}>
                    <div className={styles.itemContentLeft}>
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className={styles.itemThumb} />
                      )}
                      <div className={styles.itemMeta}>
                        <div className={styles.itemTitleRow}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          {item.badge && <span className={styles.itemBadge}>{item.badge}</span>}
                        </div>
                        <p className={styles.itemEdition}>{item.edition}</p>
                        <span className={styles.itemPrice}>
                          {item.price === 0 ? 'FREE' : `₱${item.price.toLocaleString()}`}
                        </span>
                      </div>
                    </div>

                    <div className={styles.qtyControls}>
                      {item.quantity === 0 ? (
                        <button
                          className={styles.addBtn}
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          + ADD TO CART
                        </button>
                      ) : (
                        <div className={styles.counter}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span className={styles.qtyNum}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className={styles.promoForm}>
              <input
                type="text"
                placeholder="PROMO CODE (e.g. BARKADA)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promoInput}
              />
              <button type="submit" className={styles.promoBtn}>
                APPLY
              </button>
            </form>
            {promoMessage && (
              <span className={`${styles.promoMsg} ${discountPercent > 0 ? styles.promoSuccess : styles.promoError}`}>
                {promoMessage}
              </span>
            )}

            {/* Order Summary Calculations */}
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>SUBTOTAL</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>VIP DISCOUNT ({discountPercent}%)</span>
                  <span>-₱{discount.toLocaleString()}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>SHIPPING</span>
                <span>{shipping === 0 ? 'FREE' : `₱${shipping.toLocaleString()}`}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>TOTAL ESTIMATED</span>
                <span>₱{total.toLocaleString()} PHP</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className={styles.actionFooter}>
              <button
                className={styles.checkoutBtn}
                disabled={activeItems.length === 0 || isCheckingOut}
                onClick={handleCheckout}
              >
                {isCheckingOut ? 'PROCESSING ORDER...' : `CHECKOUT • ₱${total.toLocaleString()}`}
              </button>
              <div className={styles.guaranteeRow}>
                <span>COD & GCASH ACCEPTED</span>
                <span>•</span>
                <span>FAST NATIONWIDE SHIPPING</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
