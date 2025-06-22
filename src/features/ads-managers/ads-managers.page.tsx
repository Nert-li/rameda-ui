import React from 'react';
import { useAdsManagersList } from "@/features/ads-managers/model/use-ads-managers-list";
import { CreateAdsManagerForm } from "@/features/ads-managers/ui/create-ads-manager-form";
import { UpdateAdsManagerForm } from "@/features/ads-managers/ui/update-ads-manager-form";
import { CreateReportForm } from "@/features/ads-managers/ui/create-report-form";
import { AdsManagerMetrics } from "@/features/ads-managers/ui/ads-manager-metrics";
import { useDeleteAdsManager } from "@/features/ads-managers/model/use-delete-ads-manager";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Badge } from "@/shared/ui/kit/badge";
import { components } from "@/shared/api/schema/generated";
import { MoreHorizontal, Plus, TrendingUp, Users, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";

type AdsManager = components["schemas"]["AdsManagerRecord"];

export const Component = () => {
    const { adsManagers, isLoading, isError } = useAdsManagersList();
    const { deleteAdsManager, isPending: isDeleting } = useDeleteAdsManager();
    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
    const [editingAdsManager, setEditingAdsManager] = React.useState<AdsManager | null>(null);
    const [creatingReportFor, setCreatingReportFor] = React.useState<AdsManager | null>(null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading ads managers...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 text-lg font-medium">Error loading ads managers</p>
                    <p className="text-muted-foreground mt-2">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    const handleDelete = (adsManagerId: string | undefined) => {
        if (!adsManagerId) return;
        if (window.confirm("Are you sure you want to delete this ads manager?")) {
            deleteAdsManager({ params: { path: { adsManagerId } } });
        }
    };

    return (
        <div className="max-w-7xl p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Ads Managers</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your advertising campaigns and create reports
                    </p>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Ads Manager
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new ads manager</DialogTitle>
                        </DialogHeader>
                        <CreateAdsManagerForm onSuccess={() => setCreateModalOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Metrics Cards */}
            <div className="mb-6">
                <AdsManagerMetrics
                    totalAdsManagers={adsManagers.length}
                    totalOffers={adsManagers.reduce((sum, am) => sum + (am.offers_count || 0), 0)}
                    totalSpend={adsManagers.reduce((sum, am) => sum + Number(am.total_spend || 0), 0)}
                    totalReports={adsManagers.reduce((sum, am) => sum + (am.reports_count || 0), 0)}
                    isLoading={isLoading}
                />
            </div>

            {/* Edit Ads Manager Modal */}
            <Dialog
                open={!!editingAdsManager}
                onOpenChange={(isOpen) => !isOpen && setEditingAdsManager(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Ads Manager</DialogTitle>
                    </DialogHeader>
                    {editingAdsManager && (
                        <UpdateAdsManagerForm
                            adsManager={editingAdsManager}
                            onSuccess={() => setEditingAdsManager(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Create Report Modal */}
            <Dialog
                open={!!creatingReportFor}
                onOpenChange={(isOpen) => !isOpen && setCreatingReportFor(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Report for {creatingReportFor?.title}</DialogTitle>
                    </DialogHeader>
                    {creatingReportFor && creatingReportFor.id && (
                        <CreateReportForm
                            adsManagerId={creatingReportFor.id}
                            onSuccess={() => setCreatingReportFor(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {adsManagers.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No ads managers found</h3>
                    <p className="text-muted-foreground mb-6">
                        Get started by creating your first ads manager to manage campaigns and track performance.
                    </p>
                    <Button onClick={() => setCreateModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create your first ads manager
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adsManagers.map((adsManager) => (
                        <Card key={adsManager.id} className="relative hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-1">{adsManager.title}</CardTitle>
                                        <CardDescription className="text-sm">
                                            Buyer: {adsManager.buyer_name}
                                        </CardDescription>
                                        {adsManager.id_rc && (
                                            <Badge variant="outline" className="mt-2">
                                                RC: {adsManager.id_rc}
                                            </Badge>
                                        )}
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setEditingAdsManager(adsManager)}>
                                                <Eye className="w-4 h-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setCreatingReportFor(adsManager)}>
                                                <TrendingUp className="w-4 h-4 mr-2" />
                                                Create Report
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(adsManager.id)}
                                                disabled={isDeleting}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Offers</p>
                                        <p className="font-medium">{adsManager.offers_count || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Reports</p>
                                        <p className="font-medium">{adsManager.reports_count || 0}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-muted-foreground">Total Spend</p>
                                        <p className="font-medium text-lg text-green-600">
                                            ${Number(adsManager.total_spend || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setCreatingReportFor(adsManager)}
                                    >
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Create Report
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}; 