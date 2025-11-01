import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactModal = ({ isOpen, onClose, selectedService = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: selectedService,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const services = [
    "Elektrik Arıza Tamiri",
    "Ev Elektrik Tesisatı",
    "Tadilat İşleri",
    "Klima Montaj, Bakım ve Onarım",
    "Güvenlik Kamerası Sistemleri",
    "Sıcak Su Boyler Bakım Onarım ve Anot Değişimi",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setStatus({
        type: "success",
        message: response.data.message,
      });
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.detail ||
          "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="contact-modal"
      >
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Ücretsiz Teklif Alın</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl font-bold"
              data-testid="close-modal-button"
            >
              ×
            </button>
          </div>
          <p className="text-gray-200 mt-2">
            Bilgilerinizi bırakın, size en kısa sürede dönelim
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Ad Soyad *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Adınız ve soyadınız"
                data-testid="contact-name-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0505 123 45 67"
                data-testid="contact-phone-input"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ornek@email.com"
                data-testid="contact-email-input"
              />
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="block text-gray-700 font-semibold mb-2"
              >
                Hizmet Seçin *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-service-select"
              >
                <option value="">Hizmet seçiniz...</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="İhtiyaçlarınızı detaylı bir şekilde yazabilirsiniz..."
                data-testid="contact-message-textarea"
              ></textarea>
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`p-4 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
                data-testid="contact-status-message"
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
              }`}
              data-testid="contact-submit-button"
            >
              {loading ? "Gönderiliyor..." : "Teklif Talebi Gönder"}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <p className="text-gray-600 text-sm text-center">
            📧 Talebiniz <strong>info@elektrikuzmani.com</strong> adresine
            iletilecektir
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;