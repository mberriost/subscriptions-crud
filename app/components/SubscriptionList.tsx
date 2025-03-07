"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import type { Subscription } from "@/app/page";

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id:number) => void;
}

export default function SubscriptionList({
  subscriptions,
  onEdit,
  onDelete,
}: SubscriptionListProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        There are no subscriptions added yet.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const DeleteConfirmDialog = ({ id, name }: { id: number; name: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove subscription?</AlertDialogTitle>
          <AlertDialogDescription>
          Are you sure you want to delete {name}'s subscription? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  // Mobile view: Card layout
  const MobileView = () => (
    <div className="space-y-4 sm:hidden">
      {subscriptions.map((subscription) => (
        <div
          key={subscription.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-2"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{subscription.name}</h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(subscription)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <DeleteConfirmDialog id={subscription.id} name={subscription.name} />
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>{formatPrice(subscription.price)}</p>
            <p>{formatDate(subscription.dueDate)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop view: Table layout
  const DesktopView = () => (
    <div className="hidden sm:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Expiration date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium">{subscription.name}</TableCell>
              <TableCell>{formatPrice(subscription.price)}</TableCell>
              <TableCell>{formatDate(subscription.dueDate)}</TableCell>
              <TableCell>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(subscription)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <DeleteConfirmDialog id={subscription.id} name={subscription.name} />
              </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}