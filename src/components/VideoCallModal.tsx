import React, { useState } from 'react';
import { X, Video, Calendar, Clock, MessageSquare, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { useBoutique } from '../context/BoutiqueContext';
import { BOUTIQUE_INFO } from '../data/products';

export const VideoCallModal: React.FC = () => {
  const { isVideoCallModalOpen, closeVideoCallModal, videoCallProduct, showNotification } = useBoutique();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '04:30 PM - 05:00 PM IST',
    platform: 'WhatsApp Video Call',
    collectionInterest: videoCallProduct ? videoCallProduct.name : 'Heritage Sarees & Bridal Wear',
    customNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isVideoCallModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and WhatsApp phone number.');
      return;
    }
    setIsSubmitted(true);
    showNotification('Video call shopping appointment scheduled successfully!');
  };

  const handleInstantWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Cozy Attire Boutique (Baloda Bazar)! 🛍️\n\nI would like to start an instant Live Video Call shopping session.\n\nProduct of interest: ${
        videoCallProduct ? videoCallProduct.name : 'Showroom Collection'
      }\nPhone: ${BOUTIQUE_INFO.phone}\nLooking forward to viewing your authentic collection!`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-rose-950 via-[#8A1538] to-rose-950 text-white px-6 py-5 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-800/80 rounded-xl border border-rose-600/40">
                <Video className="w-5 h-5 text-rose-200" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                  Live Video Call Shopping
                </h2>
                <p className="text-xs text-rose-200">
                  Direct personal showroom tour from Baloda Bazar, Chhattisgarh
                </p>
              </div>
            </div>
            <button
              onClick={closeVideoCallModal}
              aria-label="Close modal"
              className="p-1.5 text-rose-200 hover:text-white hover:bg-rose-900/50 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto border border-rose-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Appointment Requested!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-rose-900">{formData.name}</span>. Our Baloda Bazar boutique styling advisor will reach out to you on{' '}
                <span className="font-semibold text-rose-900">{formData.phone}</span> for your scheduled slot on{' '}
                <span className="font-semibold text-rose-900">{formData.date}</span> at{' '}
                <span className="font-semibold text-rose-900">{formData.timeSlot}</span>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleInstantWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send WhatsApp Confirmation (+91 99816 26248)</span>
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    closeVideoCallModal();
                  }}
                  className="w-full sm:w-auto px-5 py-3 border border-stone-300 text-stone-700 text-sm font-semibold rounded-xl hover:bg-stone-50"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* If initiated from specific product */}
              {videoCallProduct && (
                <div className="mb-6 p-3.5 bg-rose-50/70 rounded-xl border border-rose-200/60 flex items-center gap-3">
                  <img
                    src={videoCallProduct.image}
                    alt={videoCallProduct.name}
                    className="w-12 h-12 rounded-lg object-cover border border-rose-200"
                  />
                  <div className="text-xs">
                    <span className="text-rose-700 font-semibold uppercase tracking-wider">
                      Selected Item for Video Inspection
                    </span>
                    <p className="font-bold text-stone-800 text-sm">{videoCallProduct.name}</p>
                    <p className="text-stone-500">{videoCallProduct.fabric} · {videoCallProduct.origin}</p>
                  </div>
                </div>
              )}

              {/* Instant WhatsApp Quick Call Option */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                      Boutique Staff Online Now
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 mt-0.5">
                    Need to see it right this second?
                  </p>
                  <p className="text-xs text-stone-600">
                    Connect instantly with our Baloda Bazar team via WhatsApp video.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleInstantWhatsApp}
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1fa952] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +91 99816 26248</span>
                </button>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99816 26248 or your country code"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-600" /> Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rose-600" /> Preferred Time Slot (IST) *
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                    >
                      <option value="11:30 AM - 12:00 PM IST">11:30 AM – 12:00 PM IST</option>
                      <option value="02:00 PM - 02:30 PM IST">02:00 PM – 02:30 PM IST</option>
                      <option value="04:30 PM - 05:00 PM IST">04:30 PM – 05:00 PM IST</option>
                      <option value="06:30 PM - 07:00 PM IST">06:30 PM – 07:00 PM IST</option>
                      <option value="07:45 PM - 08:15 PM IST">07:45 PM – 08:15 PM IST</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Platform Preference
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                    >
                      <option value="WhatsApp Video Call">WhatsApp Video Call (Recommended)</option>
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom">Zoom Meeting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email for Calendar Invite (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-sm px-3.5 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special notes (e.g. match blouse, see border fall, custom bridal sizing)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us what you'd like to inspect during the call..."
                    value={formData.customNotes}
                    onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                    className="w-full text-sm px-3.5 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Live Video Shopping Slot</span>
                  </button>
                </div>
              </form>

              {/* Boutique Reassurance */}
              <div className="mt-6 pt-4 border-t border-rose-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-stone-500">
                <div className="p-2 bg-rose-50/50 rounded-lg">
                  <p className="font-semibold text-rose-900">360° Real-time Inspection</p>
                  <p>View true drape &amp; color under showroom lighting</p>
                </div>
                <div className="p-2 bg-rose-50/50 rounded-lg">
                  <p className="font-semibold text-rose-900">Custom Sizing Advice</p>
                  <p>Direct assistance from master Baloda Bazar tailors</p>
                </div>
                <div className="p-2 bg-rose-50/50 rounded-lg">
                  <p className="font-semibold text-rose-900">Worldwide Shipping 📦</p>
                  <p>Express tracked dispatch to your doorstep</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
