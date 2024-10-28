'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

interface Fact {
  _id: string; // Mudado para string pois MongoDB usa ObjectId
  fact: string;  // Certifique-se que está usando 'fact' aqui
}

async function getFacts(): Promise<Fact[]> {
  try {
    const res = await fetch('/api/facts');
    if (!res.ok) {
      throw new Error('Failed to fetch facts');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching facts:', error);
    return [];
  }
}

export default function Home() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFacts() {
      try {
        const fetchedFacts = await getFacts();
        setFacts(fetchedFacts);
        if (fetchedFacts.length > 0) {
          // Seleciona um fato aleatório ao invés do primeiro
          const randomIndex = Math.floor(Math.random() * fetchedFacts.length);
          setCurrentFact(fetchedFacts[randomIndex]);
        }
      } catch (error) {
        console.error('Failed to load facts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFacts();
  }, []);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setCurrentFact(facts[randomIndex]);
  };

  if (isLoading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Fatos sobre Corrupção no Brasil</h1>
        <div className={styles.buttonContainer}>
          <Link href="/admin">
            <button className={`${styles.button} ${styles.adminButton}`}>
              Área Administrativa
            </button>
          </Link>
          <button 
            className={`${styles.button} ${styles.blueButton}`}
            onClick={getRandomFact}
          >
            Ver outro
          </button>
        </div>
        {/* Container do fato */}
        <div className={styles.factContainer}>
          {currentFact ? currentFact.fact : 'Nenhum fato disponível. Clique no botão para ver um fato.'}
        </div>
      </main>
    </div>
  );
}
