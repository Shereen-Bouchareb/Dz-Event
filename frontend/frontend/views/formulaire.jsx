import React, { useState } from "react";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    wilaya: "",
    adresse: "",
    dateReservation: "",
    services: [],
    serviceType: "event-photography",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation pour vérifier si tous les champs sont remplis
    const { nom, prenom, email, telephone, wilaya, adresse, dateReservation } =
      formData;
    if (
      !nom ||
      !prenom ||
      !email ||
      !telephone ||
      !wilaya ||
      !adresse ||
      !dateReservation
    ) {
      alert(
        "Veuillez remplir tous les champs avant de soumettre le formulaire."
      );
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Votre formulaire a été soumis avec succès !");
  };

  return (
    <form
      className="font-sans m-10 p-10 max-w-5xl mx-auto bg-[#D08E70] rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-2 text-sm text-[#F0E5CF] block text-center">
        Formulaire De Réservation
      </div>
      <hr className="border-t-2 border-[#F0E5CF] my-4 mx-auto w-1/2" />
      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* Colonne Inputs */}
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 text-sm text-white block">Nom :</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="py-3 px-4 text-sm text-black rounded-lg bg-white border border-gray-400 w-full outline-none focus:ring-2 focus:ring-[#333]"
              />
            </div>
            <div>
              <label className="mb-2 text-sm text-white block">Prénom :</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="py-3 px-4 text-sm text-black rounded-lg bg-white border border-gray-400 w-full outline-none focus:ring-2 focus:ring-[#333]"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 text-sm text-white block">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="py-3 px-4 text-sm text-black rounded-lg bg-white border border-gray-400 w-full outline-none focus:ring-2 focus:ring-[#333]"
            />
          </div>
          <div>
            <label className="mb-2 text-sm text-white block">Téléphone :</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="py-3 px-4 text-sm text-black rounded-lg bg-white border border-gray-400 w-full outline-none focus:ring-2 focus:ring-[#333]"
            />
          </div>
          <div>
            <label className="mb-2 text-sm text-white block">Wilaya :</label>
            <input
              type="text"
              name="wilaya"
              value={formData.wilaya}
              onChange={handleChange}
              required
              className="py-3 px-4 text-sm text-black rounded-lg bg-white border border-gray-400 w-full outline-none focus:ring-2 focus:ring-[#333]"
            />
          </div>
          <div>
            <label className="mb-2 text-sm text-white block">Adresse :</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="py-3 px-4 text-sm text-black rounded-lg bg-white border border-gray-400 w-full outline-none focus:ring-2 focus:ring-[#333]"
            />
          </div>
        </div>

        {/* Colonne Options */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 text-sm text-white block">
              Sélectionner le jour de réservation :
            </label>
            <input
              type="date"
              name="dateReservation"
              value={formData.dateReservation}
              onChange={handleChange}
              required
              className="py-3 px-2 text-sm text-[#BEBEBE] rounded-lg bg-white border border-gray-400 w-1/2 outline-none focus:ring-2 focus:ring-[#333]"
            />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm text-white block">
              Services supplémentaires disponibles :
            </legend>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="service-1"
                  type="checkbox"
                  name="services"
                  value="soiree"
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="service-1"
                  className="ml-2 text-sm text-[#F0E5CF]"
                >
                  Prises de vue supplémentaires en soirée
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="service-2"
                  type="checkbox"
                  name="services"
                  value="eclairages"
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="service-2"
                  className="ml-2 text-sm text-[#F0E5CF]"
                >
                  Installation d'éclairages spéciaux
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm text-white block">
              Type de service souhaité :
            </legend>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="event-photography"
                  type="radio"
                  name="serviceType"
                  value="event-photography"
                  checked={formData.serviceType === "event-photography"}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="event-photography"
                  className="ml-2 text-sm text-[#F0E5CF]"
                >
                  Photographie événementielle
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="portrait-photography"
                  type="radio"
                  name="serviceType"
                  value="portrait-photography"
                  checked={formData.serviceType === "portrait-photography"}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="portrait-photography"
                  className="ml-2 text-sm text-[#F0E5CF]"
                >
                  Photographie portrait
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Bouton de Soumission */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          className="px-9 py-2.5 text-sm bg-[#F0E5CF] text-[#75574A] rounded hover:bg-[#75574A] hover:text-white transition-all"
        >
          Réserver
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
