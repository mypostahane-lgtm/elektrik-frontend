```javascript

import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import axios from "axios";

import ContactModal from "../components/ContactModal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API = `${BACKEND_URL}/api`;
const PHONE = "05513683020";

const PHONE_DISPLAY = "0551 368 30 20";

const ServiceDetailPage = () => {

const { serviceId } = useParams();

const [service, setService] = useState(null);

const [loading, setLoading] = useState(true);

const [showContactModal, setShowContactModal] = useState(false);

useEffect(() => {

loadServiceDetail();

}, [serviceId]);

const loadServiceDetail = async () => {

try {

const response = await axios.get(`${API}/services/${serviceId}`);

setService(response.data.service);

setLoading(false);

} catch (error) {

console.error("Hizmet detayı yüklenemedi:", error);

setLoading(false);

}

};

const handleCallClick = () => {

window.location.href = `tel:${PHONE}`;

};

if (loading) {

return (

<div className="min-h-screen flex items-center justify-center">

<div className="text-2xl text-gray-600">Yükleniyor...</div>

</div>

);

}

if (!service) {

return (

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h2 className="text-2xl text-gray-600 mb-4">Hizmet bulunamadı</h2>

<Link

to="/"

className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"

>

Ana Sayfaya Dön

</Link>

</div>

</div>

);

}

return (

<div className="min-h-screen bg-gray-50">

{/* Header */}

<header className="bg-white shadow-md sticky top-0 z-50">

<div className="container mx-auto px-4 py-3">

<div className="flex justify-between items-center">

{/* Logo */}

<Link to="/" className="flex items-center space-x-3">

<img src="/logo.png" alt="Logo" className="h-12 w-auto" />

<div>

<h1 className="text-xl md:text-2xl font-bold text-blue-900">

Ankara Elektrik Uzmanı

</h1>

<p className="text-xs text-gray-600 hidden md:block">

Klima & Elektrik Hizmetleri

</p>

</div>

</Link>

{/* Phone */}

<a

href={`tel:${PHONE}`}

className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center space-x-2"

>

<span>📞</span>

<span className="hidden sm:inline">{PHONE_DISPLAY}</span>

</a>

</div>

</div>

</header>

{/* Service Detail */}

<div className="container mx-auto px-4 py-8">

{/* Breadcrumb */}

<div className="mb-6 text-gray-600">

<Link to="/" className="hover:text-blue-900">

Ana Sayfa

</Link>

<span className="mx-2">/</span>

<span className="text-gray-800">{service.title}</span>

</div>

{/* Service Header */}

<div className="bg-white rounded-xl shadow-lg p-8 mb-8">

<div className="flex items-start gap-4 mb-6">

<div className="text-6xl">{service.icon}</div>

<div className="flex-1">

<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">

{service.title}

</h1>

<p className="text-lg text-gray-600 mb-6">{service.full_desc}</p>

<div className="flex flex-col sm:flex-row gap-4">

<button

onClick={handleCallClick}

className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"

data-testid="detail-call-button"

>

📞 Hemen Ara

</button>

<button

onClick={() => setShowContactModal(true)}

className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition"

data-testid="detail-quote-button"

>

Ücretsiz Teklif Al

</button>

</div>

</div>

</div>

</div>

{/* Before/After Images */}

<div className="bg-white rounded-xl shadow-lg p-8 mb-8">

<h2 className="text-2xl font-bold text-gray-800 mb-6">

Çalışma Örneklerimiz

</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{service.images.map((image, index) => (

<div

key={index}

className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"

>

<img

src={image}

alt={`${service.title} - Örnek ${index + 1}`}

className="w-full h-64 object-cover"

loading="lazy"

/>

</div>

))}

</div>

</div>

{/* Customer Reviews */}

<div className="bg-white rounded-xl shadow-lg p-8 mb-8">

<h2 className="text-2xl font-bold text-gray-800 mb-6">

Müşteri Yorumları

</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{service.reviews.map((review, index) => (

<div

key={index}

className="bg-gray-50 rounded-lg p-6 border border-gray-200"

data-testid={`review-${index}`}

>

<div className="flex items-center mb-3">

<div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">

{review.name.charAt(0)}

</div>

<div className="ml-3">

<h4 className="font-bold text-gray-800">{review.name}</h4>

<div className="flex text-yellow-400">

{[...Array(review.rating)].map((_, i) => (

<span key={i}>⭐</span>

))}

</div>

</div>

</div>

<p className="text-gray-600 italic">"{review.comment}"</p>

</div>

))}

</div>

</div>

{/* CTA */}

<div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl shadow-lg p-8 text-center">

<h2 className="text-2xl md:text-3xl font-bold mb-4">

{service.title} için Teklif Alın

</h2>

<p className="text-lg mb-6">

Profesyonel hizmet ve uygun fiyatlar için hemen iletişime geçin

</p>

<button

onClick={() => setShowContactModal(true)}

className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition"

>

Ücretsiz Teklif Formu

</button>

</div>

{/* Back to Home */}

<div className="mt-8 text-center">

<Link

to="/"

className="text-blue-900 hover:underline font-semibold"

>

← Tüm Hizmetlere Geri Dön

</Link>

</div>

</div>

{/* Footer */}

<footer className="bg-gray-900 text-white py-8 mt-12">

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

{/* Contact Modal */}

{showContactModal && (

<ContactModal

isOpen={showContactModal}

onClose={() => setShowContactModal(false)}

selectedService={service.title}

/>

)}

</div>

);

};

export default ServiceDetailPage;

```