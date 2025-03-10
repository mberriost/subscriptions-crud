"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import type { Subscription } from "@/app/page";

interface SubscriptionFormProps {
  subscription?: Subscription;
  onSubmit: (subscription: Omit<Subscription, "id">) => void;
  onCancel: () => void;
}

const formatDateForInput = (date: Date | string | undefined) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toISOString().split('T')[0];
};

export default function SubscriptionForm({
  subscription,
  onSubmit,
  onCancel,
}: SubscriptionFormProps) {
  const [name, setName] = useState(subscription?.name || "");
  const [price, setPrice] = useState(subscription?.price.toString() || "");
  const [dueDate, setDueDate] = useState(formatDateForInput(subscription?.dueDate) || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that the price is a valid number
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      alert("Please enter a valid price.");
      return;
    }

    // Validate that the date is not empty
    if (!dueDate) {
      alert("Please enter an expiration date.");
      return;
    }

    // Convert dueDate to a Date object
    const dueDateObj = new Date(dueDate);


    // Call onSubmit with the form data
    onSubmit({
      name,
      price: priceValue,
      dueDate: dueDateObj.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Subscription Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Netflix, Spotify, etc."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Monthly price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="9.99"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Expiration date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="w-full sm:w-auto order-1 sm:order-2"
        >
          {subscription ? "Save changes" : "Add subscription"}
        </Button>
      </div>
    </form>
  );
}