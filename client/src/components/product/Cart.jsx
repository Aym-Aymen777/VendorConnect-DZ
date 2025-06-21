import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Heart, Tag, CreditCard, Truck, ShieldCheck, ArrowRight, X } from 'lucide-react';

const Cart = ({ cartItems = [], onRemoveFromCart, onUpdateQuantity }) => {
  const [quantities, setQuantities] = useState({});
  const [removingItems, setRemovingItems] = useState(new Set());
  const [showCheckout, setShowCheckout] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Initialize quantities from cart items
  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
    onUpdateQuantity?.(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    setRemovingItems(prev => new Set(prev).add(id));
    setTimeout(() => {
      onRemoveFromCart?.(id);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo({ code: 'SAVE10', discount: 0.1, type: 'percentage' });
    } else if (promoCode.toLowerCase() === 'free5') {
      setAppliedPromo({ code: 'FREE5', discount: 5, type: 'fixed' });
    }
    setPromoCode('');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      const quantity = quantities[item.id] || 1;
      return total + (price * quantity);
    }, 0);
  };

  const calculateDiscount = (subtotal) => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percentage') {
      return subtotal * appliedPromo.discount;
    }
    return appliedPromo.discount;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const QuantityButton = ({ onClick, children, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-lg bg-[#f4f2ed] hover:bg-[#e1a95f] hover:text-white text-[#1f3b73] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
    >
      {children}
    </button>
  );

  const EmptyCart = () => (
    <div className="text-center py-16">
      <div className="w-32 h-32 bg-[#f4f2ed] rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart className="text-[#e1a95f]" size={48} />
      </div>
      <h3 className="text-2xl font-bold text-[#1f3b73] mb-3">Your cart is empty</h3>
      <p className="text-[#1f3b73]/60 mb-8 max-w-md mx-auto">
        Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
      </p>
      <button className="bg-gradient-to-r from-[#e1a95f] to-[#d4953f] hover:from-[#d4953f] hover:to-[#c8874b] text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
        Start Shopping
      </button>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl border border-[#1f3b73]/10 overflow-hidden">
            <EmptyCart />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ed] py-8 ">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#1f3b73] rounded-2xl">
            <ShoppingCart className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1f3b73]">Shopping Cart</h1>
            <p className="text-[#1f3b73]/60">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-[#1f3b73]/10 overflow-hidden">
              <div className="p-6 border-b border-[#f4f2ed]">
                <h2 className="text-xl font-bold text-[#1f3b73]">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-[#f4f2ed]">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 transition-all duration-300 ${
                      removingItems.has(item.id) 
                        ? 'opacity-0 transform scale-95' 
                        : 'opacity-100 transform scale-100'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-[#f4f2ed] rounded-2xl overflow-hidden flex-shrink-0 border border-[#e1a95f]/20">
                        <img
                          src={item.image || '/api/placeholder/96/96'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/96/96';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-[#1f3b73] text-lg leading-tight">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-xl transition-all duration-200 transform hover:scale-110"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <p className="text-[#1f3b73]/60 text-sm mb-4 line-clamp-2">
                          {item.description || "Premium quality product with excellent features"}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[#1f3b73]">Qty:</span>
                            <div className="flex items-center gap-2 bg-[#f4f2ed] rounded-2xl p-1">
                              <QuantityButton
                                onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) - 1)}
                                disabled={quantities[item.id] <= 1}
                              >
                                <Minus size={14} />
                              </QuantityButton>
                              <span className="w-12 text-center font-semibold text-[#1f3b73]">
                                {quantities[item.id] || 1}
                              </span>
                              <QuantityButton
                                onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)}
                              >
                                <Plus size={14} />
                              </QuantityButton>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#e1a95f]">
                              ${(parseFloat(item.price.replace('$', '')) * (quantities[item.id] || 1)).toFixed(2)}
                            </div>
                            <div className="text-sm text-[#1f3b73]/60">
                              {item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="p-6 border-t border-[#f4f2ed] bg-gradient-to-r from-[#f4f2ed]/30 to-transparent">
                <div className="flex items-center gap-3">
                  <Tag className="text-[#e1a95f]" size={20} />
                  <input
                    type="text"
                    placeholder="Enter promo code (try: SAVE10 or FREE5)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-2xl border border-[#e1a95f]/30 focus:border-[#e1a95f] focus:outline-none bg-white text-[#1f3b73]"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-[#e1a95f] hover:bg-[#d4953f] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 flex items-center gap-2 text-green-600">
                    <ShieldCheck size={16} />
                    <span className="text-sm font-medium">
                      Promo code "{appliedPromo.code}" applied!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-[#1f3b73]/10 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-[#f4f2ed]">
                <h2 className="text-xl font-bold text-[#1f3b73]">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-[#1f3b73]">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-[#1f3b73]">
                  <span className="flex items-center gap-1">
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Free shipping on orders over $50!
                  </div>
                )}
                
                <div className="flex justify-between text-[#1f3b73]">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <hr className="border-[#f4f2ed]" />
                
                <div className="flex justify-between text-xl font-bold text-[#1f3b73]">
                  <span>Total</span>
                  <span className="text-[#e1a95f]">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-6 pt-0 space-y-3">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-gradient-to-r from-[#e1a95f] to-[#d4953f] hover:from-[#d4953f] hover:to-[#c8874b] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
                
                <button className="w-full border-2 border-[#e1a95f] text-[#e1a95f] hover:bg-[#e1a95f] hover:text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Save for Later
                </button>
              </div>
              
              {/* Security Badge */}
              <div className="p-4 bg-[#f4f2ed]/50 border-t border-[#f4f2ed] flex items-center justify-center gap-2 text-sm text-[#1f3b73]/70">
                <ShieldCheck size={16} className="text-green-500" />
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 transform animate-in zoom-in-50 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1f3b73]">Checkout</h3>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors"
                >
                  <X size={20} className="text-[#1f3b73]" />
                </button>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#e1a95f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="text-white" size={24} />
                </div>
                <p className="text-[#1f3b73] mb-4">
                  This is a demo checkout. In a real application, this would integrate with a payment processor.
                </p>
                <div className="text-2xl font-bold text-[#e1a95f] mb-6">
                  Total: ${total.toFixed(2)}
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="bg-[#e1a95f] hover:bg-[#d4953f] text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
                >
                  Close Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;