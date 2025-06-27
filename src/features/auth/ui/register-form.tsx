import { cn } from "@/shared/lib/css"
import { Button } from "@/shared/ui/kit/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card"
import { Input } from "@/shared/ui/kit/input"
import { Label } from "@/shared/ui/kit/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "../model/use-register"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"

const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: z
      .string({
        required_error: "Password confirmation is required",
      })
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  })

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  })

  const { errorMessage, isPending, register } = useRegister()

  const onSubmit = form.handleSubmit((data) => {
    register({
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>
            Sign up with Telegram or create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.175-1.784 4.065-.834.837-1.909 1.301-3.047 1.301-.444 0-.864-.103-1.247-.28-.027-.013-.056-.024-.082-.04-.026-.016-.05-.035-.076-.05-.362-.238-.655-.596-.655-1.041v-.001c0-.644.489-1.167 1.08-1.167.326 0 .607.151.802.365.035.039.071.078.104.118.259.308.639.501 1.062.501.627 0 1.152-.366 1.152-1.001v-.001c0-.267-.092-.51-.239-.707-.05-.067-.105-.132-.162-.195-.242-.267-.582-.437-.963-.437-.411 0-.783.18-1.043.463-.038.041-.079.08-.118.121-.267.284-.639.461-1.054.461-.627 0-1.152-.365-1.152-1.001v-.001c0-.267.092-.51.239-.707.05-.067.105-.132.162-.195.242-.267.582-.437.963-.437.411 0 .783.18 1.043.463.038.041.079.08.118.121.267.284.639.461 1.054.461.627 0 1.152-.365 1.152-1.001v-.001c0-.267-.092-.51-.239-.707-.05-.067-.105-.132-.162-.195-.242-.267-.582-.437-.963-.437-.907 0-1.644.74-1.644 1.644v.001c0 .444.177.846.463 1.139.038.041.079.08.118.121.284.296.461.695.461 1.134v.001c0 .907-.74 1.644-1.644 1.644-.907 0-1.644-.74-1.644-1.644v-.001c0-.444.177-.846.463-1.139.038-.041.079-.08.118-.121.284-.296.461-.695.461-1.134v-.001c0-.907-.74-1.644-1.644-1.644z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Telegram
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or create an account
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    {...form.register("email")}
                    disabled={isPending}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    {...form.register("password")}
                    disabled={isPending}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    placeholder="******"
                    {...form.register("password_confirmation")}
                    disabled={isPending}
                  />
                  {form.formState.errors.password_confirmation && (
                    <p className="text-sm text-red-500">{form.formState.errors.password_confirmation.message}</p>
                  )}
                </div>

                {errorMessage && (
                  <p className="text-destructive text-sm text-center">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Registering..." : "Sign Up"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={ROUTES.LOGIN} className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking "Sign Up", you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>.
      </div>
    </div>
  )
}
