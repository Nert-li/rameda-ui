import React from 'react';
import { useBuyersList } from "@/features/buyers/model/use-buyers-list";
import { CreateBuyerForm } from "@/features/buyers/ui/create-buyer-form";
import { UpdateBuyerForm } from "@/features/buyers/ui/update-buyer-form";
import { useDeleteBuyer } from "@/features/buyers/model/use-delete-buyer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { components } from "@/shared/api/schema/generated";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";

type Buyer = components["schemas"]["Buyer"];

export const Component = () => {
    const { buyers, isLoading, isError } = useBuyersList();
    const { deleteBuyer, isPending: isDeleting } = useDeleteBuyer();
    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const [editingBuyer, setEditingBuyer] = React.useState<Buyer | null>(null);

    if (isLoading) {
        return <div>Loading buyers...</div>;
    }

    if (isError) {
        return <div>Error loading buyers.</div>;
    }

    const handleDelete = (buyerId: number) => {
        if (window.confirm("Are you sure you want to delete this buyer?")) {
            deleteBuyer({ params: { path: { buyerId } } });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Buyers</h1>
                <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Buyer</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new buyer</DialogTitle>
                        </DialogHeader>
                        <CreateBuyerForm onSuccess={() => setCreateModalOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <Dialog
                open={!!editingBuyer}
                onOpenChange={(isOpen) => !isOpen && setEditingBuyer(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Buyer</DialogTitle>
                    </DialogHeader>
                    {editingBuyer && (
                        <UpdateBuyerForm
                            buyer={editingBuyer}
                            onSuccess={() => setEditingBuyer(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {buyers.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground">No buyers found.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Get started by creating a new buyer.
                    </p>
                </div>
            ) : (
                <ul className="border rounded-lg">
                    {buyers.map((buyer, index) => (
                        <li
                            key={buyer.id}
                            className={`p-4 flex justify-between items-center ${index < buyers.length - 1 ? "border-b" : ""
                                }`}
                        >
                            <span className="font-medium">{buyer.name}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setEditingBuyer(buyer)}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleDelete(buyer.id)}
                                        disabled={isDeleting}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}; 