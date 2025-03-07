import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
      const { id } = params; // Get the id of the URL
      const { name, price, dueDate } = await request.json();
  
      //convert id to number
      const subscriptionId = parseInt(id, 10);
      
      
      if (!name || !price || !dueDate) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        );
      }
  
      const updatedSubscription = await prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          name,
          price: parseFloat(price),
          dueDate: new Date(dueDate),
        },
      });
  
      return NextResponse.json(updatedSubscription);
    } catch (error) {
      console.error('Error updating subscription:', error);
      return NextResponse.json(
        { error: 'Error updating subscription' },
        { status: 500 }
      );
    }
  }

  //DELETE
  export async function DELETE(request, { params }) {
    try {
      const { id } = params; // Get the id of the URL
  
      await prisma.subscription.delete({
        where: { id: parseInt(id, 10) }, // Convert id to number
      });
  
      return NextResponse.json({ message: 'Subscription removed' });
    } catch (error) {
      console.error('Error deleting subscription:', error);
      return NextResponse.json(
        { error: 'Error deleting subscription' },
        { status: 500 }
      );
    }
  }