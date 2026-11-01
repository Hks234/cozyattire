import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Lock,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBoutique } from '../context/BoutiqueContext';
import { BOUTIQUE_INFO } from '../data/products';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotalINR,
    formatPrice,
    showNotification,
  } = useBoutique();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: 'India',
    address: '',
    city: '',
    state: 'Chhattisgarh',
    pincode: '',
    deliveryMethod: 'express', // 'express' | 'local_pickup' | 'intl'
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod' | 'whatsapp'>('upi');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const shippingCost = shippingData.country === 'India' ? 0 : 1800;
  const grandTotalINR = cartSubtotalINR + shippingCost;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(BOUTIQUE_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.pincode) {
      alert('Please fill in all mandatory shipping address fields.');
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `COZY-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(orderId);
      setIsProcessing(false);
      setStep('success');

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#be123c', '#e11d48', '#fda4af', '#f43f5e', '#d97706'],
        });
      } catch {
        // confetti safe fallback
      }

      showNotification(`Order ${orderId} confirmed successfully!`);
      clearCart();
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleWhatsAppReceipt = () => {
    const text = encodeURIComponent(
      `Hello Cozy Attire Boutique! 🎀\n\nI just placed Order *#${confirmedOrderId}* on your website.\n\nCustomer: ${shippingData.fullName}\nPhone: ${shippingData.phone}\nAddress: ${shippingData.address}, ${shippingData.city}, ${shippingData.state} - ${shippingData.pincode}\nPayment: ${paymentMethod.toUpperCase()}\nTotal: ${formatPrice(grandTotalINR)}\n\nPlease acknowledge receipt and dispatch date. Thank you!`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-950 via-[#8A1538] to-rose-950 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎀</span>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold tracking-tight">
                Secure Quick Checkout
              </h2>
              <p className="text-xs text-rose-200">
                Cozy Attire Boutique · Baloda Bazar, Chhattisgarh
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="p-1.5 text-rose-200 hover:text-white rounded-full hover:bg-rose-900/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        {step !== 'success' && (
          <div className="bg-rose-50/70 border-b border-rose-100 px-6 py-3 flex items-center justify-center gap-8 text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-rose-800' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 'shipping' ? 'bg-rose-700 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {step === 'payment' ? '✓' : '1'}
              </span>
              <span>1. Shipping &amp; Delivery</span>
            </div>
            <div className="w-8 h-px bg-rose-200" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-rose-800' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 'payment' ? 'bg-rose-700 text-white' : 'bg-stone-300 text-stone-600'
              }`}>
                2
              </span>
              <span>2. Payment Gateway</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* STEP 1: SHIPPING INFORMATION */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Shipping Destination &amp; Contact Details
                </h3>
                <p className="text-xs text-stone-500">
                  We ship across India &amp; Worldwide with tracked courier delivery.
                </p>
              </div>

              {/* Country & Delivery Option */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Country</label>
                  <select
                    value={shippingData.country}
                    onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  >
                    <option value="India">India (Free Express Shipping)</option>
                    <option value="United States">United States (DHL / FedEx Tracked)</option>
                    <option value="United Arab Emirates">United Arab Emirates (Dubai / Abu Dhabi)</option>
                    <option value="United Kingdom">United Kingdom (DHL Express)</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Preference</label>
                  <select
                    value={shippingData.deliveryMethod}
                    onChange={(e) => setShippingData({ ...shippingData, deliveryMethod: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  >
                    <option value="express">Standard Express Courier (3-5 Business Days)</option>
                    <option value="local_pickup">Baloda Bazar Boutique Store Pickup (Instant/Same Day)</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient name"
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99816 26248"
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="order@example.com"
                    value={shippingData.email}
                    onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat No., Apartment, Street, Landmark"
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Baloda Bazar / Raipur / Mumbai"
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State / Province</label>
                  <input
                    type="text"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Pincode / Postal Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 493332"
                    value={shippingData.pincode}
                    onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-stone-800">
                    Items in Bag ({cart.length}) · Delivery: {shippingData.country === 'India' ? 'FREE' : '₹1,800 Worldwide'}
                  </p>
                  <p className="text-stone-500">All prices include GST &amp; boutique packaging.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Total Payable:</span>
                  <span className="text-lg font-bold text-rose-950 tabular-nums">
                    {formatPrice(grandTotalINR)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Secure Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT GATEWAY */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Choose Integrated Payment Method
                  </h3>
                  <p className="text-xs text-stone-500">
                    Bank-grade 256-bit SSL encrypted transaction
                  </p>
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-rose-700 hover:underline font-semibold"
                >
                  ← Edit Address
                </button>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'border-rose-600 bg-rose-50/80 text-rose-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-rose-600" />
                  <span className="text-xs">UPI / QR (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-rose-600 bg-rose-50/80 text-rose-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-rose-600" />
                  <span className="text-xs">Debit / Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'border-rose-600 bg-rose-50/80 text-rose-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-rose-600" />
                  <span className="text-xs">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'border-rose-600 bg-rose-50/80 text-rose-900 font-bold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <Truck className="w-5 h-5 text-rose-600" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="p-5 bg-white border border-rose-100 rounded-2xl shadow-xs">
                {/* UPI Flow */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Dynamic Simulated QR */}
                      <div className="p-3 bg-white border-2 border-stone-800 rounded-xl shadow-xs text-center shrink-0">
                        <div className="w-36 h-36 bg-stone-900 flex flex-col items-center justify-center p-2 rounded-lg text-white">
                          <QrCode className="w-24 h-24 text-rose-200" />
                          <span className="text-[10px] tracking-widest uppercase mt-1 font-mono">
                            SCAN &amp; PAY
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 font-semibold block mt-1.5">
                          Google Pay · PhonePe · Paytm · BHIM
                        </span>
                      </div>

                      {/* UPI ID & Details */}
                      <div className="space-y-3 flex-1 text-xs">
                        <p className="text-stone-700">
                          Scan the QR code with any UPI app on your phone to complete your payment of{' '}
                          <span className="font-bold text-rose-900 text-sm">
                            {formatPrice(grandTotalINR)}
                          </span>
                          .
                        </p>

                        <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase font-medium">
                              Boutique Official UPI VPA:
                            </span>
                            <span className="font-mono font-bold text-stone-900">
                              {BOUTIQUE_INFO.upiId}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-rose-300 rounded-lg text-rose-700 hover:bg-rose-50 flex items-center gap-1 shadow-xs"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy VPA'}</span>
                          </button>
                        </div>

                        <p className="text-stone-500 italic">
                          Reference: &quot;Cozy Attire Boutique - Baloda Bazar&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Flow */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Enter Card Information</span>
                      <div className="flex items-center gap-1 font-semibold text-stone-700">
                        <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Encrypted
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4532 ···· ···· 8924"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full text-sm font-mono px-3.5 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Valid Thru</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM / YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full text-sm font-mono px-3.5 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full text-sm font-mono px-3.5 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        placeholder="As embossed on card"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="w-full text-sm px-3.5 py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Net Banking Flow */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-stone-700">Select Banking Institution</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(
                        (bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                              selectedBank === bank
                                ? 'bg-rose-50 border-rose-500 font-bold text-rose-900 shadow-xs'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            {bank}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* COD Flow */}
                {paymentMethod === 'cod' && (
                  <div className="space-y-3 text-xs text-stone-700">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="font-semibold text-amber-900">Cash on Delivery Available</p>
                      <p className="text-amber-800 mt-1">
                        Pay cash or UPI upon delivery at your doorstep. Our courier executive will carry a mobile QR terminal for easy payment.
                      </p>
                    </div>
                    <p className="text-stone-500">
                      Destination: <span className="font-medium text-stone-800">{shippingData.city}, {shippingData.state} ({shippingData.pincode})</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Total & Place Order Button */}
              <div className="pt-2 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500">Total Payable Amount:</span>
                  <p className="text-2xl font-bold text-rose-950 tabular-nums">
                    {formatPrice(grandTotalINR)}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteOrder}
                  className="w-full sm:w-auto px-8 py-3.5 bg-rose-700 hover:bg-rose-800 disabled:bg-rose-400 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Verifying &amp; Securing Order...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay &amp; Confirm Order ({formatPrice(grandTotalINR)})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-stone-400 text-[11px] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by RBI Compliant Payment Gateway &amp; Cozy Attire Boutique Guarantee</span>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS / INVOICE */}
          {step === 'success' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                  Thank You, {shippingData.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  Your order is confirmed and is being hand-inspected at our Baloda Bazar boutique for shipment.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 text-left text-xs space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-rose-200/60 font-semibold">
                  <span>Order Number:</span>
                  <span className="font-mono text-rose-900">{confirmedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Delivery:</span>
                  <span className="font-medium text-stone-800">
                    {shippingData.country === 'India' ? '3–5 Business Days' : '5–8 Days Worldwide DHL'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping Address:</span>
                  <span className="font-medium text-stone-800 text-right">
                    {shippingData.address}, {shippingData.city}, {shippingData.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment Mode:</span>
                  <span className="font-medium uppercase text-stone-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-rose-200/60 font-bold text-sm text-rose-950">
                  <span>Total Amount Paid:</span>
                  <span className="tabular-nums">{formatPrice(grandTotalINR)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppReceipt}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#1fa952] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp (+91 99816 26248)</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto px-5 py-3 border border-stone-300 text-stone-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-stone-50 flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 bg-stone-900 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-stone-800"
                >
                  Continue Browsing
                </button>
              </div>

              <p className="text-[11px] text-stone-500">
                A copy of this receipt has been logged. Our dispatch team in Baloda Bazar will send tracking links once handed over to the courier.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
