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
      console.log('Airtable Record:', record);

      // Retrieve the ID from Airtable
      const airtableId = record[0].fields.id;

      // Fetch the data from Airtable using the retrieved ID
      const fetchedRecord = await base('formulaire').find(record[0].id);
      console.log('Fetched Record:', fetchedRecord);

      // Prepare the data for the simulation request
      const simulationData = {
        id: fetchedRecord.fields.id,
        filename: 'data_exemple', // This should be adapted to match your filename logic
        prix_achat: fetchedRecord.fields.prix_achat_elec,
        type_centrale: fetchedRecord.fields.type,
        montant_pret: fetchedRecord.fields.montant,
        taux_pret: fetchedRecord.fields.taux,
        duree_pret: 10, // Hardcoded for example; adapt as needed
        devis_installation: false, // Hardcoded for example; adapt as needed
        localisation: fetchedRecord.fields.orientation, // Example mapping
        annee: 2022, // Example hardcoded value; adapt as needed
        puissances: fetchedRecord.fields.scenarios.split(',').map(Number), // Assuming scenarios are comma-separated
      };

      // Make the API call to calculate the simulation
      const response = await fetch('http://127.0.0.1:8000/calc_simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simulationData),
      });

      const result = await response.json();
      console.log('Simulation Result:', result);

      alert('Form submitted and simulation calculated successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white m-4 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Nouvelle étude</h2>
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
