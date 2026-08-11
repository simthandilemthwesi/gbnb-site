import React, { useState, useEffect } from 'react';

interface VerseOfTheDayProps {
  className?: string;
}

interface Verse {
  verse: string;
  reference: string;
  translation?: string;
}

const VerseOfTheDay: React.FC<VerseOfTheDayProps> = ({ className = '' }) => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchVerse();
  }, []);

  const fetchVerse = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const response = await fetch('https://labs.bible.org/api/?passage=random', {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        },
      });

      if (response.ok) {
        const text = await response.text();
        setVerse({
          verse: text.replace(/<[^>]*>/g, '').trim(),
          reference: 'Random Verse',
        });
      } else {
        throw new Error('Failed to fetch verse');
      }
    } catch (err) {
      const fallbackVerses = [
        { verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16" },
        { verse: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
        { verse: "The Lord is my shepherd, I shall not want.", reference: "Psalm 23:1" },
        { verse: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
        { verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
        { verse: "For where two or three gather in my name, there am I with them.", reference: "Matthew 18:20" },
        { verse: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
        { verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4" },
        { verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", reference: "Ephesians 4:32" },
        { verse: "The prayer of a righteous person is powerful and effective.", reference: "James 5:16" },
      ];
      
      const randomVerse = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
      setVerse(randomVerse);
    } finally {
      setLoading(false);
    }
  };

  const handleNewVerse = () => {
    fetchVerse();
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-primary to-blue-900 text-white p-8 rounded-lg shadow-xl ${className}`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-2">Loading verse...</p>
        </div>
      </div>
    );
  }

  if (!verse) return null;

  return (
    <div className={`bg-gradient-to-br from-primary to-blue-900 text-white p-8 rounded-lg shadow-xl ${className}`}>
      <div className="text-center">
        <div className="text-4xl mb-4">📖</div>
        <h3 className="font-serif text-xl font-bold mb-4">Verse of the Day</h3>
        <blockquote className="text-lg italic mb-4 leading-relaxed">
          "{verse.verse}"
        </blockquote>
        <cite className="text-accent font-semibold not-italic">
          — {verse.reference}
        </cite>
        <button
          onClick={handleNewVerse}
          className="mt-6 bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent transition-colors"
        >
          New Verse
        </button>
      </div>
    </div>
  );
};

export default VerseOfTheDay;
