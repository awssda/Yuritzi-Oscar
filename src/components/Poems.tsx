import React from 'react';

const poems = [
  {
    title: "Mi Amor Por Ti",
    content: "En cada amanecer pienso en ti,\nEn cada estrella veo tu sonrisa,\nEres el amor que siempre soñé,\nLa razón de mi alegría."
  },
  {
    title: "Nuestro Amor",
    content: "Como el sol y la luna,\nAsí somos tú y yo,\nDiferentes pero perfectos,\nEn nuestra propia constelación."
  },
  // Add more poems here
];

export default function Poems() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Poemas de Amor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {poems.map((poem, index) => (
          <div key={index} className="card">
            <div className="card-info">
              <div className="p-6 text-center">
                <h3 className="title text-xl mb-4">{poem.title}</h3>
                <p className="whitespace-pre-line">{poem.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}