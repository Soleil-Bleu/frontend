import React, { useState } from 'react';
import Airtable from 'airtable';

export function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    inclinaison: '',
    orientation: '',
    type: '',
    prix_achat_elec: '',
    surface: '',
    pret_bancaire: false,
    montant: '',
    taux: '',
    scenarios: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const base = new Airtable({ apiKey: 'patwxX9gwQO9Y9r4W.a6a47fe6a1f9e00d45f30edf2f4b81b9c8e22acfe3ca76e14abc9a98191b7dfb' }).base('appD8J2JeI5KBNKvL');

    const data = [
      {
        fields: {
          Name: formData.name,
          id: formData.id,
          inclinaison: formData.inclinaison ? Number(formData.inclinaison) : 0,
          orientation: formData.orientation,
          type: formData.type,
          prix_achat_elec: formData.prix_achat_elec ? Number(formData.prix_achat_elec) : 0,
          surface: formData.surface ? Number(formData.surface) : 0,
          pret_bancaire: formData.pret_bancaire,
          montant: formData.montant ? Number(formData.montant) : 0,
          taux: formData.taux ? Number(formData.taux) : 0,
          scenarios: formData.scenarios,
        },
      },
    ];

    try {
      const record = await base('formulaire').create(data);
      console.log(record);
      alert('Form submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Submit Form</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'ID', name: 'id', type: 'text' },
            { label: 'Inclinaison', name: 'inclinaison', type: 'number' },
            { label: 'Orientation', name: 'orientation', type: 'text' },
            { label: 'Type', name: 'type', type: 'text' },
            { label: 'Prix Achat Elec', name: 'prix_achat_elec', type: 'number' },
            { label: 'Surface', name: 'surface', type: 'number' },
            { label: 'Montant', name: 'montant', type: 'number' },
            { label: 'Taux', name: 'taux', type: 'number' },
            { label: 'Scenarios', name: 'scenarios', type: 'text' },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700">Pret Bancaire</label>
            <input
              type="checkbox"
              name="pret_bancaire"
              checked={formData.pret_bancaire}
              onChange={handleChange}
              className="mt-1 block"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
