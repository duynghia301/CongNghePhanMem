import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch a specific house by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const house = await prisma.house.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!house) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }

    return NextResponse.json(house, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch house' }, { status: 500 });
  }
}

// PUT: Update a specific house by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updatedHouse = await prisma.house.update({
      where: { id: parseInt(params.id) },
      data,
    });

    return NextResponse.json(updatedHouse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update house' }, { status: 500 });
  }
}

// DELETE: Delete a specific house by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.house.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'House deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete house' }, { status: 500 });
  }
}
