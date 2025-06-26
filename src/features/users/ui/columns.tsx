import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"
import { SortableHeader } from "@/shared/ui/sortable-header"

export type User = components["schemas"]["UserRecord"]

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<User>[] => [
    {
        accessorKey: "id",
        header: () => {
            return (
                <SortableHeader field="id" sorting={sortingState} onSort={onSort}>
                    ID
                </SortableHeader>
            )
        },
    },
    {
        accessorKey: "email",
        header: () => {
            return (
                <SortableHeader field="email" sorting={sortingState} onSort={onSort}>
                    Email
                </SortableHeader>
            )
        },
    },
    {
        accessorKey: "first_name",
        header: () => {
            return (
                <SortableHeader field="first_name" sorting={sortingState} onSort={onSort}>
                    First Name
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const firstName = row.getValue("first_name")
            return firstName ? firstName : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "last_name",
        header: () => {
            return (
                <SortableHeader field="last_name" sorting={sortingState} onSort={onSort}>
                    Last Name
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const lastName = row.getValue("last_name")
            return lastName ? lastName : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "phone_number",
        header: () => {
            return (
                <SortableHeader field="phone_number" sorting={sortingState} onSort={onSort}>
                    Phone
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const phone = row.getValue("phone_number")
            return phone ? phone : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "country",
        header: () => {
            return (
                <SortableHeader field="country" sorting={sortingState} onSort={onSort}>
                    Country
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const country = row.getValue("country")
            return country ? country : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "role",
        header: () => {
            return (
                <SortableHeader field="role" sorting={sortingState} onSort={onSort}>
                    Role
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            return (
                <Badge variant={role === "admin" ? "default" : role === "manager" ? "secondary" : "outline"}>
                    {role}
                </Badge>
            )
        },
    },
    {
        accessorKey: "account_status",
        header: () => {
            return (
                <SortableHeader field="account_status" sorting={sortingState} onSort={onSort}>
                    Status
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("account_status") as string
            return (
                <Badge variant={status === "active" ? "default" : status === "suspended" ? "destructive" : "secondary"}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "buyer_name",
        header: () => {
            return (
                <SortableHeader field="buyer_name" sorting={sortingState} onSort={onSort}>
                    Buyer Name
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const buyerName = row.getValue("buyer_name")
            return buyerName ? buyerName : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "offers_count",
        header: () => {
            return (
                <SortableHeader field="offers_count" sorting={sortingState} onSort={onSort}>
                    Offers
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const offersCount = row.getValue("offers_count")
            return typeof offersCount === "number" ? (
                offersCount
            ) : (
                <span className="text-muted-foreground">0</span>
            )
        },
    },
    {
        accessorKey: "confirmed_at",
        header: () => {
            return (
                <SortableHeader field="confirmed_at" sorting={sortingState} onSort={onSort}>
                    Confirmed
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const confirmedAt = row.getValue("confirmed_at")
            return confirmedAt ? (
                <Badge variant="default">Yes</Badge>
            ) : (
                <Badge variant="outline">No</Badge>
            )
        },
    },
    {
        accessorKey: "last_online",
        header: () => {
            return (
                <SortableHeader field="last_online" sorting={sortingState} onSort={onSort}>
                    Last Online
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const lastOnline = row.getValue("last_online")
            if (!lastOnline) return <span className="text-muted-foreground">Never</span>

            const date = new Date(lastOnline as string)
            return (
                <span className="text-sm">
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </span>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: () => {
            return (
                <SortableHeader field="created_at" sorting={sortingState} onSort={onSort}>
                    Created At
                </SortableHeader>
            )
        },
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at")
            const date = new Date(createdAt as string)
            return (
                <span className="text-sm">
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </span>
            )
        },
    },
] 