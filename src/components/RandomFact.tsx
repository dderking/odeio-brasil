import styles from './RandomFact.module.css';

interface Fact {
  id: number;
  text: string;
}

interface RandomFactProps {
  fact: Fact;
}

export default function RandomFact({ fact }: RandomFactProps) {
  return (
    <div className={styles.factContainer}>
      <p className={styles.factText}>{fact.text}</p>
    </div>
  );
}
