import React from 'react';

const memories = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46',
    caption: 'Nuestro primer día juntos'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486',
    caption: 'Aquella tarde especial'
  },
  // Add more memories
];

export default function Memories() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Nuestros Recuerdos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.map((memory, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={memory.url}
              alt={memory.caption}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-700 text-center">{memory.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}