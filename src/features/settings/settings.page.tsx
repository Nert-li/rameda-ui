import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Switch } from "@/shared/ui/kit/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import { Separator } from "@/shared/ui/kit/separator";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { useConfig } from "@/shared/model/use-config";
import { useCurrentUser } from "@/shared/model/use-current-user";
import { useTheme } from "@/shared/lib/react/use-theme";
import {
    IconMoon,
    IconSun,
    IconBell,
    IconLock,
    IconLanguage,
    IconPalette,
    IconDeviceFloppy,
    IconDatabase,
    IconShield,
    IconSettings2,
    IconUser
} from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/shared/lib/css";

type SettingsSection =
    | 'account'
    | 'appearance'
    | 'notifications'
    | 'security'
    | 'preferences'
    | 'application';

interface SidebarItem {
    id: SettingsSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    adminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
    { id: 'account', label: 'Account & Profile', icon: IconUser },
    { id: 'appearance', label: 'Appearance', icon: IconPalette },
    { id: 'notifications', label: 'Notifications', icon: IconBell },
    { id: 'security', label: 'Security & Privacy', icon: IconLock },
    { id: 'preferences', label: 'User Preferences', icon: IconSettings2 },
    { id: 'application', label: 'Application', icon: IconDatabase, adminOnly: true },
];

function SettingsPage() {
    const { config, isLoading: configLoading } = useConfig();
    const { user: currentUser, isLoading: userLoading } = useCurrentUser();
    const { theme, setTheme } = useTheme();

    const [activeSection, setActiveSection] = useState<SettingsSection>('account');

    // Local state for settings
    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [language, setLanguage] = useState("en");
    const [autoSave, setAutoSave] = useState(true);

    const isLoading = configLoading || userLoading;

    const filteredSidebarItems = sidebarItems.filter(item =>
        !item.adminOnly || currentUser?.role === 'admin'
    );

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="flex gap-6">
                    <div className="w-64">
                        <Skeleton className="h-8 w-32 mb-4" />
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full mb-2" />
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
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    const renderAccountSection = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconUser className="h-5 w-5" />
                    Account & Profile
                </CardTitle>
                <CardDescription>
                    Manage your personal information and account details
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input value={currentUser?.first_name || ''} placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input value={currentUser?.last_name || ''} placeholder="Enter last name" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={currentUser?.email || ''} type="email" readOnly />
                    <p className="text-sm text-muted-foreground">
                        Email cannot be changed. Contact support if you need to update it.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                        value={currentUser?.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : ''}
                        readOnly
                    />
                </div>

                <Separator />

                <div className="flex justify-end">
                    <Button>
                        <IconDeviceFloppy className="mr-2 h-4 w-4" />
                        Save Profile Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const renderAppearanceSection = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconPalette className="h-5 w-5" />
                    Appearance
                </CardTitle>
                <CardDescription>
                    Customize the look and feel of your interface
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Theme Mode</Label>
                        <div className="text-sm text-muted-foreground">
                            Switch between light and dark modes
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IconSun className="h-4 w-4" />
                        <Switch
                            checked={theme === 'dark'}
                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        />
                        <IconMoon className="h-4 w-4" />
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                        <IconLanguage className="h-4 w-4" />
                        Language & Region
                    </Label>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label>Display Density</Label>
                    <Select defaultValue="comfortable">
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="comfortable">Comfortable</SelectItem>
                            <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );

    const renderNotificationsSection = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconBell className="h-5 w-5" />
                    Notifications
                </CardTitle>
                <CardDescription>
                    Manage your notification preferences and communication settings
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                            Receive real-time notifications in your browser
                        </div>
                    </div>
                    <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                        disabled={!config?.features?.notifications}
                    />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                            Get notified about important updates via email
                        </div>
                    </div>
                    <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                    />
                </div>

                <Separator />

                <div className="space-y-3">
                    <Label>Notification Categories</Label>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium">New conversions</span>
                                <div className="text-xs text-muted-foreground">
                                    Get notified when new conversions are recorded
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium">Campaign updates</span>
                                <div className="text-xs text-muted-foreground">
                                    Notifications about campaign status changes
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium">System maintenance</span>
                                <div className="text-xs text-muted-foreground">
                                    Important system announcements and maintenance
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium">Marketing emails</span>
                                <div className="text-xs text-muted-foreground">
                                    Product updates and promotional content
                                </div>
                            </div>
                            <Switch />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const renderSecuritySection = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconLock className="h-5 w-5" />
                    Security & Privacy
                </CardTitle>
                <CardDescription>
                    Manage your account security and privacy preferences
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                            id="current-password"
                            type="password"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <Button variant="outline" className="w-fit">
                        Update Password
                    </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Two-Factor Authentication</Label>
                            <div className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                            </div>
                        </div>
                        <Button variant="outline">
                            <IconShield className="mr-2 h-4 w-4" />
                            Enable 2FA
                        </Button>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label>Login Sessions</Label>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <div className="font-medium">Current Session</div>
                                <div className="text-sm text-muted-foreground">Chrome on MacOS • Active now</div>
                            </div>
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                        </div>
                        <Button variant="outline" size="sm">
                            View All Sessions
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const renderPreferencesSection = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconSettings2 className="h-5 w-5" />
                    User Preferences
                </CardTitle>
                <CardDescription>
                    Customize your experience and workflow settings
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Auto-save Changes</Label>
                        <div className="text-sm text-muted-foreground">
                            Automatically save changes as you make them
                        </div>
                    </div>
                    <Switch
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                    />
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label>Default Dashboard View</Label>
                    <Select defaultValue="overview">
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="overview">Overview</SelectItem>
                            <SelectItem value="campaigns">Campaigns</SelectItem>
                            <SelectItem value="reports">Reports</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label>Data Refresh Rate</Label>
                    <Select defaultValue="30">
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">Every 10 seconds</SelectItem>
                            <SelectItem value="30">Every 30 seconds</SelectItem>
                            <SelectItem value="60">Every minute</SelectItem>
                            <SelectItem value="300">Every 5 minutes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Show Advanced Metrics</Label>
                        <div className="text-sm text-muted-foreground">
                            Display additional analytics and performance metrics
                        </div>
                    </div>
                    <Switch defaultChecked />
                </div>

                {currentUser?.role === 'admin' && (
                    <>
                        <Separator />
                        <div className="space-y-2">
                            <Label className="text-destructive">Danger Zone</Label>
                            <div className="p-4 border border-destructive/50 rounded-lg">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Delete Account</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Permanently delete your account and all associated data.
                                        This action cannot be undone.
                                    </p>
                                    <Button variant="destructive" size="sm">
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );

    const renderApplicationSection = () => (
        config && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconDatabase className="h-5 w-5" />
                        Application Configuration
                    </CardTitle>
                    <CardDescription>
                        System-wide settings and configuration (Admin only)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Application Name</Label>
                            <Input value={config.app_name || 'Rameda'} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label>Version</Label>
                            <Input value={config.app_version || '1.0.0'} readOnly />
                        </div>
                    </div>

                    {config.limits && (
                        <div className="space-y-2">
                            <Label>System Limits</Label>
                            <div className="grid grid-cols-2 gap-4 p-3 border rounded-lg bg-muted/50">
                                <div className="text-sm">
                                    <span className="font-medium">Max Campaigns:</span> {config.limits.max_campaigns || 'Unlimited'}
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium">Max Offers:</span> {config.limits.max_offers || 'Unlimited'}
                                </div>
                            </div>
                        </div>
                    )}

                    {config.settings && (
                        <div className="space-y-4">
                            <Label>System Settings</Label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium">Maintenance Mode</span>
                                        <div className="text-xs text-muted-foreground">
                                            Enable maintenance mode for system updates
                                        </div>
                                    </div>
                                    <Switch checked={Boolean(config.settings.maintenance_mode)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium">Registration Enabled</span>
                                        <div className="text-xs text-muted-foreground">
                                            Allow new user registrations
                                        </div>
                                    </div>
                                    <Switch checked={Boolean(config.settings.registration_enabled)} />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    );

    const renderCurrentSection = () => {
        switch (activeSection) {
            case 'account':
                return renderAccountSection();
            case 'appearance':
                return renderAppearanceSection();
            case 'notifications':
                return renderNotificationsSection();
            case 'security':
                return renderSecuritySection();
            case 'preferences':
                return renderPreferencesSection();
            case 'application':
                return renderApplicationSection();
            default:
                return renderAccountSection();
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account preferences and application settings
                </p>
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-64 space-y-1">
                    <nav className="space-y-1">
                        {filteredSidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                                        activeSection === item.id
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
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

export const Component = SettingsPage;