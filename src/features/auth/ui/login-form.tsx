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
import { useLogin } from "../model/use-login"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes"

const loginSchema = z.object({
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
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  })

  const { errorMessage, isPending, login } = useLogin()

  const onSubmit = form.handleSubmit(login)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Sign in with Telegram or use your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.175-1.784 4.065-1.147 1.147-2.933 2.4-6.053 2.4C5.82 14.625 2.051 10.732 2.051 6c0-4.732 3.769-8.625 8.516-8.625 2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C16.827 -0.76 14.213-2.2 10.56-2.2 3.947-2.2-1.613 3.187-1.613 9.8s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H10.56z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign in with Telegram
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
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

                {errorMessage && (
                  <p className="text-destructive text-sm text-center">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to={ROUTES.REGISTER} className="underline underline-offset-4">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking "Sign In", you agree to our{" "}
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
