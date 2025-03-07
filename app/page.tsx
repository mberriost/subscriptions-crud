"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import SubscriptionForm from "@/app/components/SubscriptionForm";
import SubscriptionList from "@/app/components/SubscriptionList";

export type Subscription = {
  id: number;
  name: string;
  price: number;
  dueDate: string;
};

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  // Getting subscriptions from the API
  useEffect(() => {
    fetch('/api/subscriptions')
      .then((res) => res.json())
      .then((data) => setSubscriptions(data));
  }, []);
  
  
// Add a new subscription
const handleAddSubscription = async (subscription: Omit<Subscription, 'id'>) => {
  try {
  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });

  if (response.ok) {
    const newSubscription = await response.json();
    setSubscriptions([...subscriptions, newSubscription]);
    setIsAddingNew(false);
  } else {
    const errorData = await response.json();
    alert(errorData.error || 'Error al crear la suscripción');
  }
} catch (error) {
  console.error('Error al crear la suscripción:', error);
  alert('Error al crear la suscripción');
}
};

// Edit an existing subscription
const handleEditSubscription = async (subscriptionData: Omit<Subscription, "id">) => {
  if (!editingSubscription) return;
  try {
    const response = await fetch(`/api/subscriptions/${editingSubscription.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData),
    });

    if (response.ok) {
      const updatedSubscription = await response.json();
      setSubscriptions(subscriptions.map((s) =>
        s.id === updatedSubscription.id ? updatedSubscription : s
      ));
      setEditingSubscription(null);
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Error updating subscription');
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    alert('Error updating subscription');
  }
};

const handleDeleteSubscription = async (id: number) => {
  try {
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove subscription from the list
      setSubscriptions(subscriptions.filter((s) => s.id !== id));
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Error deleting subscription');
    }
  } catch (error) {
    console.error('Error deleting subscription:', error);
    alert('Error deleting subscription');
  }
};

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Subscriptions
            </h1>
            <Button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <PlusCircle className="w-5 h-5" />
              Add Subscription
            </Button>
          </div>

          {isAddingNew && (
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">New Subscription</h2>
              <SubscriptionForm
                onSubmit={handleAddSubscription}
                onCancel={() => setIsAddingNew(false)}
              />
            </Card>
          )}

          {editingSubscription && (
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Subscription</h2>
              <SubscriptionForm
                subscription={editingSubscription}
                onSubmit={handleEditSubscription}
                onCancel={() => setEditingSubscription(null)}
              />
            </Card>
          )}

          <SubscriptionList
            subscriptions={subscriptions}
            onEdit={setEditingSubscription}
            onDelete={handleDeleteSubscription}
          />
        </div>
      </div>
    </main>
  );
}