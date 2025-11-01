import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const PHONE = "05513683020";
const PHONE_DISPLAY = "0551 368 30 20";

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await axios.get(`${API}/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error("Hizmetler yüklenemedi:", error);
    }
  };

  const handleCallClick = () => {
    window.location.href = `tel:${PHONE}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/9${PHONE}`, "_blank");
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setFormStatus({
        type: "success",
        message: response.data.message,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error.response?.data?.detail ||
          "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const completedProjects = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600",
    "https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=600",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600",
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-blue-900">
                  Ankara Elektrik Uzmanı
                </h1>
                <p className="text-xs text-gray-600 hidden md:block">
                  Klima & Elektrik Hizmetleri
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <button
                onClick={() => scrollToSection("hizmetler")}
                className="text-gray-700 hover:text-blue-900 font-medium transition"
              >
                Hizmetlerimiz
              </button>
              <button
                onClick={() => scrollToSection("neden-biz")}
                className="text-gray-700 hover:text-blue-900 font-medium transition"
              >
                Neden Biz
              </button>
              <button
                onClick={() => scrollToSection("projeler")}
                className="text-gray-700 hover:text-blue-900 font-medium transition"
              >
                Projelerimiz
              </button>
              <button
                onClick={() => scrollToSection("iletisim")}
                className="text-gray-700 hover:text-blue-900 font-medium transition"
              >
                İletişim
              </button>
            </nav>

            {/* Phone */}
            <a
              href={`tel:${PHONE}`}
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center space-x-2"
            >
              <span>📞</span>
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            </a>
          </div>

          {/* Mobile Navigation */}
          <nav className="lg:hidden flex justify-around mt-3 border-t pt-3">
            <button
              onClick={() => scrollToSection("hizmetler")}
              className="text-sm text-gray-700 hover:text-blue-900"
            >
              Hizmetler
            </button>
            <button
              onClick={() => scrollToSection("neden-biz")}
              className="text-sm text-gray-700 hover:text-blue-900"
            >
              Neden Biz
            </button>
            <button
              onClick={() => scrollToSection("projeler")}
              className="text-sm text-gray-700 hover:text-blue-900"
            >
              Projeler
            </button>
            <button
              onClick={() => scrollToSection("iletisim")}
              className="text-sm text-gray-700 hover:text-blue-900"
            >
              İletişim
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 64, 175, 0.9)), url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ankara'nın Güvenilir Elektrik Ustası
          </h2>
          <p className="text-lg md:text-xl mb-2 text-gray-200">
            ⚡ Elektrik Arıza Tamiri | ❄️ Klima Montaj & Bakım | 💡 Aydınlatma Sistemleri
          </p>
          <p className="text-base md:text-lg mb-8 text-gray-300">
            7/24 Profesyonel Hizmet | Hızlı, Güvenli ve Uygun Fiyatlı Çözümler
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCallClick}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition flex items-center justify-center space-x-2"
              data-testid="hero-call-button"
            >
              <span>📞</span>
              <span>Hemen Ara</span>
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
              data-testid="hero-whatsapp-button"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hizmetlerimiz
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ankara genelinde tüm elektrik, klima ve aydınlatma hizmetleriniz için profesyonel çözümler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/hizmet/${service.id}`}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-500 hover:-translate-y-1 cursor-pointer"
                data-testid={`service-card-${service.id}`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600">{service.short_desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="neden-biz" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Neden Bizi Seçmelisiniz?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Hızlı Hizmet
              </h4>
              <p className="text-gray-600">
                7/24 acil müdahale ve aynı gün hizmet garantisi
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-5xl mb-4">👨‍🔧</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Uzman Ekip
              </h4>
              <p className="text-gray-600">
                15+ yıl tecrübeli ve sertifikalı elektrik ustaları
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-5xl mb-4">💰</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Uygun Fiyat
              </h4>
              <p className="text-gray-600">
                Şeffaf fiyatlandırma, gizli maliyet yok
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-5xl mb-4">✅</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Garanti
              </h4>
              <p className="text-gray-600">
                Tüm işlerimizde 1 yıl garanti
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="teklif" className="py-16 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Ücretsiz Teklif Alın
              </h3>
              <p className="text-gray-600">
                Bilgilerinizi bırakın, size en kısa sürede dönelim
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0551 368 30 20"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hizmet Seçin *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Hizmet seçiniz...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="İhtiyaçlarınızı detaylı yazabilirsiniz..."
                ></textarea>
              </div>

              {formStatus && (
                <div
                  className={`p-4 rounded-lg ${
                    formStatus.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
                }`}
              >
                {loading ? "Gönderiliyor..." : "Teklif Talebi Gönder"}
              </button>

              <p className="text-gray-600 text-sm text-center mt-4">
                📧 Talebiniz <strong>info@elektrikuzmanı.com</strong> adresine iletilecektir
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Completed Projects Section */}
      <section id="projeler" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Bitirilen Projeler
            </h3>
            <p className="text-gray-600">
              Başarıyla tamamladığımız projelerden örnekler
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              {completedProjects.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 h-60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <img
                    src={image}
                    alt={`Proje ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              İletişim
            </h3>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                İletişim Bilgileri
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">📞</span>
                  <div>
                    <p className="text-gray-600 text-sm">Telefon</p>
                    <a
                      href={`tel:${PHONE}`}
                      className="text-blue-900 font-bold text-lg hover:underline"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-3xl">💬</span>
                  <div>
                    <p className="text-gray-600 text-sm">WhatsApp</p>
                    <a
                      href={`https://wa.me/9${PHONE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 font-bold text-lg hover:underline"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-3xl">📧</span>
                  <div>
                    <p className="text-gray-600 text-sm">E-posta</p>
                    <a
                      href="mailto:info@elektrikuzmanı.com"
                      className="text-blue-900 font-bold text-lg hover:underline"
                    >
                      info@elektrikuzmanı.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-3xl">📍</span>
                  <div>
                    <p className="text-gray-600 text-sm">Bölge</p>
                    <p className="text-blue-900 font-bold text-lg">Ankara</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                <p className="text-yellow-800 font-semibold text-center text-lg">
                  ⚡ Acil Durumlarda 7/24 Hizmet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 w-auto mx-auto mb-2"
            />
            <h5 className="text-xl font-bold">Ankara Elektrik Uzmanı</h5>
          </div>
          <p className="text-gray-400 mb-2">
            📞 {PHONE_DISPLAY} | 📧 info@elektrikuzmanı.com
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2025 Ankara Elektrik Uzmanı. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;