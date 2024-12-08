import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';

export default function Diary() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'diary-entries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;

    try {
      await addDoc(collection(db, 'diary-entries'), {
        content: entry,
        createdAt: new Date(),
        author: auth.currentUser?.email,
        authorId: auth.currentUser?.uid
      });
      setEntry('');
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-[#f8f4e5] p-8 rounded-lg shadow-lg border-2 border-[#a39f8b]">
        <h2 className="text-3xl font-serif mb-6 text-center text-[#2c2c2c]">Nuestro Diario</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full h-40 p-4 bg-[#f8f4e5] border-2 border-[#a39f8b] rounded-lg font-serif text-lg leading-relaxed focus:outline-none focus:border-[#8b8570]"
            placeholder="Escribe tus pensamientos aquí..."
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-[#a39f8b] text-white rounded-lg hover:bg-[#8b8570] transition-colors"
          >
            Guardar entrada
          </button>
        </form>

        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="border-b-2 border-[#a39f8b] pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#666]">
                  {format(entry.createdAt.toDate(), 'dd/MM/yyyy HH:mm')}
                </span>
                <span className="text-sm text-[#666]">{entry.author}</span>
              </div>
              <p className="font-serif text-lg leading-relaxed">{entry.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}