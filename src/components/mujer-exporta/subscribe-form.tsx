"use client";
import { useState } from "react";
import { createSubscriber } from "@/services/mujer-exporta/subscribers/service";
import { Icon } from "@iconify/react";

const SECTORES = [
  "Agroindustria",
  "Manufactura",
  "Servicios",
  "Tecnología",
  "Turismo",
  "Comercio",
  "Otro",
];

interface SubscribeFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function SubscribeForm({ onClose, isModal = false }: SubscribeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setLoading(true);

    const result = await createSubscriber({
      name,
      email,
      company: company || undefined,
      phone: phone || undefined,
      sector: sector || undefined,
    });

    setLoading(false);

    if (result) {
      setSuccess(true);
      // Reset form
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setSector("");
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon icon="ph:check-bold" className="text-green-600" width={32} />
        </div>
        <h3 className="text-xl font-bold text-me-navy mb-2">
          ¡Registro exitoso!
        </h3>
        <p className="text-gray-600 mb-6">
          Te has suscrito correctamente a Mujer Exporta. Pronto recibirás
          información sobre nuevas iniciativas y recursos.
        </p>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2 bg-me-coral text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Cerrar
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-me-coral focus:ring-2 focus:ring-me-coral/20 outline-none transition-all"
          required
          onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Por favor, completa este campo")}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-me-coral focus:ring-2 focus:ring-me-coral/20 outline-none transition-all"
          required
          onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Por favor, ingresa un correo electrónico válido")}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empresa u organización
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Nombre de tu empresa (opcional)"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-me-coral focus:ring-2 focus:ring-me-coral/20 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="809-000-0000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-me-coral focus:ring-2 focus:ring-me-coral/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector de interés
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-me-coral focus:ring-2 focus:ring-me-coral/20 outline-none transition-all bg-white"
          >
            <option value="">Seleccionar sector</option>
            {SECTORES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-me-coral text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icon icon="ph:spinner" className="animate-spin" width={20} />
              Registrando...
            </>
          ) : (
            <>
              <Icon icon="ph:user-plus-bold" width={20} />
              Suscribirme
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Al suscribirte, aceptas recibir información sobre iniciativas y recursos
        de Mujer Exporta. Puedes darte de baja en cualquier momento.
      </p>
    </form>
  );
}

// Modal wrapper
export function SubscribeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Icon icon="ph:x-bold" width={20} className="text-gray-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-me-coral-pale rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon icon="ph:envelope-simple-bold" className="text-me-coral" width={28} />
          </div>
          <h2 className="text-xl font-bold text-me-navy">
            Suscríbete a Mujer Exporta
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Recibe información sobre nuevas iniciativas y recursos para mujeres
            emprendedoras y exportadoras.
          </p>
        </div>

        {/* Form */}
        <SubscribeForm onClose={onClose} isModal />
      </div>
    </div>
  );
}
