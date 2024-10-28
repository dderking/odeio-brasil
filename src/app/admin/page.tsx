'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from './Admin.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Admin() {
  const { data: session } = useSession();
  const [factText, setFactText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/facts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: factText }),
      });
      
      if (response.ok) {
        setFactText('');
        alert('Fato cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar fato');
      }
    } catch (error) {
      console.error('Erro ao cadastrar fato:', error);
      alert('Erro ao cadastrar fato');
    }
  };

  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Link href="/" className={styles.backButton}>
              ← Voltar
            </Link>
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>Área Administrativa</h1>
            <p className={styles.description}>
              Faça login para gerenciar os fatos sobre corrupção
            </p>
            <button
              className={styles.googleButton}
              onClick={() => signIn('google')}
            >
              <Image 
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span>Entrar com Google</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.backButton}>
            ← Voltar
          </Link>
          <button
            onClick={() => signOut()}
            className={styles.logoutButton}
          >
            Sair
          </button>
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.title}>Adicionar Novo Fato</h1>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              value={factText}
              onChange={(e) => setFactText(e.target.value)}
              placeholder="Digite o novo fato aqui..."
              required
            />
            <button className={styles.submitButton} type="submit">
              Adicionar Fato
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
