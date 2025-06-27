import React from 'react';
import { useAdsManagersList } from "@/features/ads-managers/model/use-ads-managers-list";
import { CreateAdsManagerForm } from "@/features/ads-managers/ui/create-ads-manager-form";
import { UpdateAdsManagerForm } from "@/features/ads-managers/ui/update-ads-manager-form";
import { CreateReportForm } from "@/features/ads-managers/ui/create-report-form";
import { AssignOfferForm } from "@/features/ads-managers/ui/assign-offer-form";
import { AdsManagerMetrics } from "@/features/ads-managers/ui/ads-manager-metrics";
import { useDeleteAdsManager } from "@/features/ads-managers/model/use-delete-ads-manager";
import { DataGrid } from "@/shared/ui/data-grid";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { components } from "@/shared/api/schema/generated";
import { MoreHorizontal, Plus, TrendingUp, Eye, Link, FileText, PlusCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { useNavigate } from "react-router-dom";

type AdsManager = components["schemas"]["AdsManagerRecord"];

export const Component = () => {
    const navigate = useNavigate();
    const { adsManagers, isLoading, isError } = useAdsManagersList();
    const { deleteAdsManager, isPending: isDeleting } = useDeleteAdsManager();

    const [editingAdsManager, setEditingAdsManager] = React.useState<AdsManager | null>(null);
    const [creatingReportFor, setCreatingReportFor] = React.useState<AdsManager | null>(null);
    const [assigningOfferFor, setAssigningOfferFor] = React.useState<AdsManager | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this ads manager?")) {
            deleteAdsManager({ params: { path: { adsManagerId: id } } });
        }
    };

    const handleViewReports = (adsManager: AdsManager) => {
        if (adsManager.id) {
            navigate(`/ads-managers/${adsManager.id}/reports`);
        }
    };

    // Render function for card mode
    const renderAdsManagerCard = (adsManager: AdsManager, index: number) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg line-clamp-1">
                            {adsManager.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                            {adsManager.buyer_name} • ID: {adsManager.id_rc}
                        </CardDescription>
                        {adsManager.offer_name && (
                            <CardDescription className="text-xs text-muted-foreground line-clamp-1">
                                Offer: {adsManager.offer_name}
                            </CardDescription>
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
                            <DropdownMenuItem onClick={() => setAssigningOfferFor(adsManager)}>
                                <Link className="w-4 h-4 mr-2" />
                                Assign Offer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCreatingReportFor(adsManager)}>
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Create Report
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewReports(adsManager)}>
                                <FileText className="w-4 h-4 mr-2" />
                                View Reports
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => adsManager.id && handleDelete(adsManager.id)}
                                disabled={isDeleting || !adsManager.id}
                                className="text-red-500"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                {/* Daily Stats */}
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 text-center">Today's Performance</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="text-center">
                            <p className="text-muted-foreground">Clicks</p>
                            <p className="font-bold text-blue-600">{adsManager.daily_clicks || 0}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Regs</p>
                            <p className="font-bold text-green-600">{adsManager.daily_registrations || 0}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Deposits</p>
                            <p className="font-bold text-orange-600">{adsManager.daily_deposits || 0}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">FD Sum</p>
                            <p className="font-bold text-purple-600">${Number(adsManager.daily_fd_sum || 0).toFixed(0)}</p>
                        </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-muted text-center">
                        <p className="text-muted-foreground text-xs">Revenue</p>
                        <p className="font-bold text-lg text-emerald-600">
                            ${Number(adsManager.daily_revenue || 0).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* General Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Has Offer</p>
                        <p className="font-medium">{adsManager.has_offer ? "Yes" : "No"}</p>
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
                        onClick={() => handleViewReports(adsManager)}
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        View Reports
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

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

    return (
        <div className="@container/main flex flex-col h-full overflow-hidden">
            {/* Header with action buttons */}
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold">Ads Managers</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/reports')}
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        View All Reports
                    </Button>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Create Ads Manager
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Ads Manager</DialogTitle>
                            </DialogHeader>
                            <CreateAdsManagerForm
                                onSuccess={() => setIsCreateDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-auto">
                <div className="p-6">
                    {/* Metrics */}
                    <div className="mb-8">
                        <AdsManagerMetrics
                            totalAdsManagers={adsManagers.length}
                            totalOffers={adsManagers.filter(am => am.has_offer).length}
                            totalSpend={adsManagers.reduce((sum, am) => sum + Number(am.total_spend || 0), 0)}
                            totalReports={adsManagers.reduce((sum, am) => sum + (am.reports_count || 0), 0)}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Ads Managers Grid using DataGrid */}
                    {adsManagers.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                    <TrendingUp className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No ads managers yet</h3>
                                <p className="text-muted-foreground mb-6">
                                    Get started by creating your first ads manager to organize your campaigns.
                                </p>
                                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="lg">
                                            <Plus className="w-5 h-5 mr-2" />
                                            Create Your First Ads Manager
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create New Ads Manager</DialogTitle>
                                        </DialogHeader>
                                        <CreateAdsManagerForm
                                            onSuccess={() => setIsCreateDialogOpen(false)}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ) : (
                        <DataGrid
                            data={adsManagers as AdsManager[]}
                            viewMode="cards"
                            renderCard={renderAdsManagerCard}
                            cardsPerRow={3}
                            searchPlaceholder="Search ads managers..."
                            emptyMessage="No ads managers found"
                            isLoading={isLoading}
                            loadingItemCount={6}
                            enableGlobalFilter={true}
                            enablePagination={true}
                        />
                    )}
                </div>
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

            {/* Assign Offer Modal */}
            <Dialog
                open={!!assigningOfferFor}
                onOpenChange={(isOpen) => !isOpen && setAssigningOfferFor(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Offer to {assigningOfferFor?.title}</DialogTitle>
                    </DialogHeader>
                    {assigningOfferFor && assigningOfferFor.id && (
                        <AssignOfferForm
                            adsManagerId={assigningOfferFor.id}
                            onSuccess={() => setAssigningOfferFor(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}; 