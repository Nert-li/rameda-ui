import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Switch } from "@/shared/ui/kit/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import { Separator } from "@/shared/ui/kit/separator";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { useConfig } from "@/shared/model/config";
import { useCurrentUser } from "@/shared/model/current-user";
import { useTheme } from "@/shared/model/use-theme";
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
    IconSettings2
} from "@tabler/icons-react";
import { useState } from "react";

export function Component() {
    const { config, isLoading: configLoading } = useConfig();
    const { user: currentUser, isLoading: userLoading } = useCurrentUser();
    const { theme, setTheme } = useTheme();

    // Local state for settings
    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [language, setLanguage] = useState("en");
    const [autoSave, setAutoSave] = useState(true);

    const isLoading = configLoading || userLoading;

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
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your account preferences and application settings
                        </p>
                    </div>
                    <Button>
                        <IconDeviceFloppy className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>

                {/* Application Configuration */}
                {config && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <IconDatabase className="h-5 w-5" />
                                Application Configuration
                            </CardTitle>
                            <CardDescription>
                                Current application settings and version information
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
                        </CardContent>
                    </Card>
                )}

                {/* Appearance Settings */}
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
                    </CardContent>
                </Card>

                {/* Notification Settings */}
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

                {/* Security Settings */}
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
                    </CardContent>
                </Card>

                {/* User Preferences */}
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
            </div>
        </div>
    );
}