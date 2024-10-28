import clientPromise from './mongodb'

export async function getRandomFact() {
  try {
    const client = await clientPromise
    const db = client.db()
    
    // Ajuste o nome da collection conforme seu banco de dados
    const facts = db.collection('facts')
    
    const fact = await facts.aggregate([
      { $sample: { size: 1 } }
    ]).toArray()
    
    return fact[0]
  } catch (error) {
    console.error('Erro ao buscar fato:', error)
    return null
  }
}
