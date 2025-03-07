import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Handling POST requests (creating a subscription)
export async function POST(request) {
    try {
      const { name, price, dueDate } = await request.json();
  
      if (!name || !price || !dueDate) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }
  
      // Crear la suscripción en la base de datos
      const newSubscription = await prisma.subscription.create({
        data: {
          name,
          price: parseFloat(price),
          dueDate: new Date(dueDate),
        },
      });
  
      return NextResponse.json(newSubscription, { status: 201 });
    } catch (error) {
      console.error('Error creating subscription:', error);
      return NextResponse.json(
        { error: 'Error creating subscription' },
        { status: 500 }
      );
    }
  }

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany();
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error getting subscriptions' },
      { status: 500 }
    );
  }
}