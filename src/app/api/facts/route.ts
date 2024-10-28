import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'O texto do fato é obrigatório' },
        { status: 400 }
      );
    }

    const result = await db.collection('facts').insertOne({ fact: text }); // Mudado de text para fact
    
    return NextResponse.json(
      { message: 'Fato criado com sucesso', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Falha ao criar fato' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const facts = await db.collection('facts').find({}).toArray();
    console.log('Facts from DB:', facts); // Debug log
    
    // Se não houver fatos, retornar array vazio
    if (!facts || facts.length === 0) {
      return NextResponse.json([]);
    }

    // Garantir que estamos retornando os campos corretos
    const formattedFacts = facts.map(fact => ({
      _id: fact._id,
      fact: fact.fact || fact.text // tenta pegar fact ou text como fallback
    }));

    return NextResponse.json(formattedFacts);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar fatos' },
      { status: 500 }
    );
  }
}
