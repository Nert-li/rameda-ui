import { Button } from "@/shared/ui/kit/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBuyer } from "../model/use-create-buyer";

const createBuyerSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
        })
        .min(2, "Name must be at least 2 characters"),
});

export function CreateBuyerForm({
    onSuccess,
}: {
    onSuccess?: () => void;
}) {
    const form = useForm({
        resolver: zodResolver(createBuyerSchema),
        defaultValues: {
            name: "",
        }
    });

    const { isPending, createBuyer } = useCreateBuyer();

    const onSubmit = form.handleSubmit(async (data) => {
        await createBuyer({ body: data }, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            }
        });
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Buyer Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter buyer name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit">
                    {isPending ? "Creating..." : "Create Buyer"}
                </Button>
            </form>
        </Form>
    );
} 