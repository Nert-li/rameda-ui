import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { useCurrentUser } from "@/shared/model/current-user";
import { IconUser, IconMail, IconPhone, IconCalendar, IconEdit, IconShield } from "@tabler/icons-react";

export function Component() {
    const { user: currentUser, isLoading, error } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-32" />
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (error || !currentUser) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center text-muted-foreground">
                            Failed to load user data
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const userName = currentUser.name || `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || currentUser.email;
    const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    const getRoleBadgeVariant = (role?: string) => {
        switch (role) {
            case 'admin': return 'destructive';
            case 'manager': return 'default';
            case 'buyer': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Account Profile</h1>
                    <Button variant="outline" size="sm">
                        <IconEdit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>

                {/* Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Your account details and current role in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={currentUser.avatar} alt={userName} />
                                <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">{userName}</h3>
                                <div className="flex items-center space-x-2">
                                    <Badge variant={getRoleBadgeVariant(currentUser.role)}>
                                        <IconShield className="mr-1 h-3 w-3" />
                                        {currentUser.role?.toUpperCase() || 'USER'}
                                    </Badge>
                                    {currentUser.role === 'admin' && (
                                        <Badge variant="outline">
                                            Super Admin
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <IconMail className="h-4 w-4" />
                                    Email Address
                                </Label>
                                <Input id="email" value={currentUser.email} readOnly />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role" className="flex items-center gap-2">
                                    <IconUser className="h-4 w-4" />
                                    User Role
                                </Label>
                                <Input id="role" value={currentUser.role || 'User'} readOnly />
                            </div>

                            {currentUser.first_name && (
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input id="first_name" value={currentUser.first_name} readOnly />
                                </div>
                            )}

                            {currentUser.last_name && (
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input id="last_name" value={currentUser.last_name} readOnly />
                                </div>
                            )}

                            {currentUser.phone_number && (
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <IconPhone className="h-4 w-4" />
                                        Phone Number
                                    </Label>
                                    <Input id="phone" value={currentUser.phone_number} readOnly />
                                </div>
                            )}

                            {currentUser.created_at && (
                                <div className="space-y-2">
                                    <Label htmlFor="joined" className="flex items-center gap-2">
                                        <IconCalendar className="h-4 w-4" />
                                        Member Since
                                    </Label>
                                    <Input
                                        id="joined"
                                        value={new Date(currentUser.created_at).toLocaleDateString()}
                                        readOnly
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Role-specific Statistics */}
                {currentUser.role === 'buyer' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Buyer Statistics</CardTitle>
                            <CardDescription>
                                Your performance metrics and campaign data
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Active Campaigns</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Total Conversions</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Total Spent</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {currentUser.role === 'manager' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Manager Statistics</CardTitle>
                            <CardDescription>
                                Your performance metrics and managed offers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Active Offers</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Managed Users</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {currentUser.role === 'admin' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrator Overview</CardTitle>
                            <CardDescription>
                                System-wide statistics and management data
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Total Users</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Active Offers</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold text-primary">--</div>
                                    <div className="text-sm text-muted-foreground">System Health</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 