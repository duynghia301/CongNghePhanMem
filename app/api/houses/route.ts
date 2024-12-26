import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all houses with optional keyword filter
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';

    const houses = await prisma.house.findMany({
      where: {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { address: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });

    return NextResponse.json(houses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch houses' }, { status: 500 });
  }
}

// POST: Create a new house
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newHouse = await prisma.house.create({ data });
    return NextResponse.json(newHouse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create house' }, { status: 500 });
  }
}
