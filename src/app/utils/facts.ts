export const brazilFacts = [
  'A Operação Lava Jato, iniciada em 2014, foi uma das maiores investigações de corrupção da história do Brasil, envolvendo políticos de diversos partidos e grandes empresas.',
  'O Índice de Percepção da Corrupção da Transparência Internacional frequentemente posiciona o Brasil em uma colocação desfavorável entre os países avaliados.',
  'Estima-se que a corrupção custe bilhões de reais anualmente aos cofres públicos, afetando investimentos em áreas essenciais como saúde e educação.',
  'O "jeitinho brasileiro", embora muitas vezes visto como uma característica cultural, às vezes é criticado por normalizar pequenos atos de corrupção no cotidiano.',
  'Nos últimos anos, foram implementadas leis anticorrupção mais rigorosas, como a Lei da Ficha Limpa e a Lei Anticorrupção, visando combater essas práticas.',
];

export function getRandomFact(): string {
  const randomIndex = Math.floor(Math.random() * brazilFacts.length);
  return brazilFacts[randomIndex];
}