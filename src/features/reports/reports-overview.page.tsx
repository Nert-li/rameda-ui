import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAdsManagersList } from "@/features/ads-managers/model/use-ads-managers-list";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Badge } from "@/shared/ui/kit/badge";
import { FileText, TrendingUp, BarChart3, DollarSign } from "lucide-react";

export const Component = () => {
    const navigate = useNavigate();
    const { adsManagers, isLoading, isError } = useAdsManagersList();

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

    const totalReports = adsManagers.reduce((sum, am) => sum + (am.reports_count || 0), 0);
    const totalSpend = adsManagers.reduce((sum, am) => sum + Number(am.total_spend || 0), 0);
    const totalOffers = adsManagers.reduce((sum, am) => sum + (am.offers_count || 0), 0);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b">
                <div>
                    <h1 className="text-2xl font-bold">Reports Overview</h1>
                    <p className="text-muted-foreground">
                        Select an ads manager to view their reports
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                {/* Summary metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalReports}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalSpend.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ads Managers</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{adsManagers.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOffers}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Ads Managers List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Ads Managers</h2>
                    
                    {adsManagers.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                    <FileText className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No ads managers yet</h3>
                                <p className="text-muted-foreground mb-6">
                                    Create ads managers to generate reports.
                                </p>
                                <Button onClick={() => navigate("/ads-managers")}>
                                    Go to Ads Managers
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {adsManagers.map((adsManager) => (
                                <Card key={adsManager.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">{adsManager.title}</CardTitle>
                                            <Badge variant="outline">
                                                {adsManager.reports_count || 0} reports
                                            </Badge>
                                        </div>
                                        <CardDescription>
                                            {adsManager.buyer_name} • {adsManager.offers_count || 0} offers
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Total Spend:</span>
                                                <span className="font-medium">
                                                    ${Number(adsManager.total_spend || 0).toFixed(2)}
                                                </span>
                                            </div>
                                            
                                            <Button 
                                                className="w-full" 
                                                onClick={() => navigate(`/ads-managers/${adsManager.id}/reports`)}
                                                disabled={!adsManager.id}
                                            >
                                                <FileText className="w-4 h-4 mr-2" />
                                                View Reports
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 