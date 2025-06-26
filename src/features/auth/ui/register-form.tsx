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
        required_error: "Email обязателен",
      })
      .email("Неверный email"),
    password: z
      .string({
        required_error: "Пароль обязателен",
      })
      .min(6, "Пароль должен быть не менее 6 символов"),
    password_confirmation: z
      .string({
        required_error: "Подтверждение пароля обязательно",
      })
      .min(6, "Пароль должен быть не менее 6 символов"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Пароли не совпадают",
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
          <CardTitle className="text-xl">Создать аккаунт</CardTitle>
          <CardDescription>
            Зарегистрируйтесь через Google или создайте новый аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Регистрация через Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Или создайте аккаунт
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
                  <Label htmlFor="password">Пароль</Label>
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
                  <Label htmlFor="password_confirmation">Подтвердите пароль</Label>
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
                  {isPending ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Уже есть аккаунт?{" "}
                <Link to={ROUTES.LOGIN} className="underline underline-offset-4">
                  Войти
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        Нажимая "Зарегистрироваться", вы соглашаетесь с нашими{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Условиями использования
        </a>{" "}
        и{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Политикой конфиденциальности
        </a>.
      </div>
    </div>
  )
}
