import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { Separator } from "@/shared/ui/kit/separator";
import { useCurrentUser } from "@/shared/model/use-current-user";
import {
    IconUser,
    IconMail,
    IconPhone,
    IconCalendar,
    IconEdit,
    IconShield,
    IconChartBar,
    IconActivity,
    IconSettings
} from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/shared/lib/css";

type AccountSection = 'profile' | 'statistics' | 'activity';

interface SidebarItem {
    id: AccountSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}

const sidebarItems: SidebarItem[] = [
    {
        id: 'profile',
        label: 'Profile Information',
        icon: IconUser,
        description: 'Personal details and account info'
    },
    {
        id: 'statistics',
        label: 'Performance & Stats',
        icon: IconChartBar,
        description: 'Role-based metrics and analytics'
    },
    {
        id: 'activity',
        label: 'Recent Activity',
        icon: IconActivity,
        description: 'Login history and account activity'
    },
];

function AccountPage() {
    const { user: currentUser, isLoading, error } = useCurrentUser();
    const [activeSection, setActiveSection] = useState<AccountSection>('profile');

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="flex gap-6">
                    <div className="w-64">
                        <Skeleton className="h-8 w-32 mb-4" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full mb-2" />
                        ))}
                    </div>
                    <Separator orientation="vertical" className="h-96" />
                    <div className="flex-1">
                        <Skeleton className="h-8 w-40 mb-4" />
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
            </div>
        );
    }

    if (error || !currentUser) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
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

    const renderProfileSection = () => (
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

                <Separator />

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

                <Separator />

                <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                        <IconEdit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const renderStatisticsSection = () => {
        const getRoleSpecificStats = () => {
            switch (currentUser.role) {
                case 'buyer':
                    return (
                        <Card>
                            <CardHeader>
                                <CardTitle>Buyer Performance</CardTitle>
                                <CardDescription>
                                    Your campaign metrics and conversion data
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">--</div>
                                        <div className="text-sm text-blue-600/70 dark:text-blue-400/70">Active Campaigns</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">--</div>
                                        <div className="text-sm text-green-600/70 dark:text-green-400/70">Total Conversions</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">--</div>
                                        <div className="text-sm text-purple-600/70 dark:text-purple-400/70">Total Spent</div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                <div className="space-y-4">
                                    <h4 className="font-medium">Campaign Performance</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Average CTR</Label>
                                            <div className="text-2xl font-semibold text-muted-foreground">--%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Conversion Rate</Label>
                                            <div className="text-2xl font-semibold text-muted-foreground">--%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Average CPA</Label>
                                            <div className="text-2xl font-semibold text-muted-foreground">$--</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>ROI</Label>
                                            <div className="text-2xl font-semibold text-muted-foreground">--%</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );

                case 'manager':
                    return (
                        <Card>
                            <CardHeader>
                                <CardTitle>Manager Performance</CardTitle>
                                <CardDescription>
                                    Your offer management metrics and team performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">--</div>
                                        <div className="text-sm text-orange-600/70 dark:text-orange-400/70">Active Offers</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
                                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">--</div>
                                        <div className="text-sm text-emerald-600/70 dark:text-emerald-400/70">Total Revenue</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
                                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">--</div>
                                        <div className="text-sm text-indigo-600/70 dark:text-indigo-400/70">Managed Users</div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                <div className="space-y-4">
                                    <h4 className="font-medium">Team Performance</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Top Performing Offer</Label>
                                            <div className="text-lg font-medium text-muted-foreground">No data</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Average Offer Performance</Label>
                                            <div className="text-lg font-medium text-muted-foreground">--%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Monthly Growth</Label>
                                            <div className="text-lg font-medium text-muted-foreground">--%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Team Efficiency</Label>
                                            <div className="text-lg font-medium text-muted-foreground">--%</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );

                case 'admin':
                    return (
                        <Card>
                            <CardHeader>
                                <CardTitle>Administrator Overview</CardTitle>
                                <CardDescription>
                                    System-wide statistics and platform health metrics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
                                        <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">--</div>
                                        <div className="text-sm text-slate-600/70 dark:text-slate-400/70">Total Users</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900">
                                        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">--</div>
                                        <div className="text-sm text-cyan-600/70 dark:text-cyan-400/70">Active Offers</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900">
                                        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">--</div>
                                        <div className="text-sm text-teal-600/70 dark:text-teal-400/70">Total Revenue</div>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">--</div>
                                        <div className="text-sm text-red-600/70 dark:text-red-400/70">System Health</div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                <div className="space-y-4">
                                    <h4 className="font-medium">Platform Analytics</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Daily Active Users</Label>
                                            <div className="text-2xl font-semibold text-muted-foreground">--</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>System Uptime</Label>
                                            <div className="text-2xl font-semibold text-green-600">99.9%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Platform Growth</Label>
                                            <div className="text-2xl font-semibold text-muted-foreground">--%</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );

                default:
                    return (
                        <Card>
                            <CardHeader>
                                <CardTitle>User Statistics</CardTitle>
                                <CardDescription>
                                    Basic performance metrics for your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center p-8 text-muted-foreground">
                                    No statistics available for your role
                                </div>
                            </CardContent>
                        </Card>
                    );
            }
        };

        return getRoleSpecificStats();
    };

    const renderActivitySection = () => (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Your login history and account activity timeline
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h4 className="font-medium">Login Sessions</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div>
                                    <div className="font-medium">Current Session</div>
                                    <div className="text-sm text-muted-foreground">
                                        Chrome on macOS • Active now
                                    </div>
                                </div>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                Active
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div>
                                    <div className="font-medium">Previous Session</div>
                                    <div className="text-sm text-muted-foreground">
                                        Firefox on Windows • 2 hours ago
                                    </div>
                                </div>
                            </div>
                            <Badge variant="secondary">
                                Ended
                            </Badge>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h4 className="font-medium">Recent Actions</h4>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <IconUser className="h-4 w-4 text-blue-500" />
                            <div>
                                <div className="font-medium">Profile viewed</div>
                                <div className="text-sm text-muted-foreground">Just now</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <IconSettings className="h-4 w-4 text-gray-500" />
                            <div>
                                <div className="font-medium">Settings updated</div>
                                <div className="text-sm text-muted-foreground">1 hour ago</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <IconActivity className="h-4 w-4 text-green-500" />
                            <div>
                                <div className="font-medium">Login successful</div>
                                <div className="text-sm text-muted-foreground">2 hours ago</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label>Account Security</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm">Two-Factor Authentication</span>
                            <Badge variant="destructive">Disabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm">Password Last Changed</span>
                            <span className="text-sm text-muted-foreground">Never</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const renderCurrentSection = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSection();
            case 'statistics':
                return renderStatisticsSection();
            case 'activity':
                return renderActivitySection();
            default:
                return renderProfileSection();
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Account Profile</h1>
                <p className="text-muted-foreground">
                    Manage your account information and view your performance metrics
                </p>
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-64 space-y-1">
                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex flex-col items-start gap-1 px-3 py-3 text-left rounded-lg transition-colors",
                                        activeSection === item.id
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-4 w-4" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </div>
                                    <span className={cn(
                                        "text-xs ml-7",
                                        activeSection === item.id
                                            ? "text-primary-foreground/70"
                                            : "text-muted-foreground"
                                    )}>
                                        {item.description}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Divider */}
                <Separator orientation="vertical" className="h-auto" />

                {/* Main Content */}
                <div className="flex-1">
                    {renderCurrentSection()}
                </div>
            </div>
        </div>
    );
}

export const Component = AccountPage;
