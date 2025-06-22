import { ApiSchemas } from "../../schema";
import { http } from "../http";
import { delay, HttpResponse } from "msw";
import {
  generateTokens,
} from "../session";

const mockUsers: ApiSchemas["User"][] = [
  {
    id: "1",
    email: "admin@gmail.com",
    first_name: "Admin",
    last_name: "User",
    phone_number: "+1234567890",
    role: "admin",
  },
];

const userPasswords = new Map<string, string>();
userPasswords.set("admin@gmail.com", "123456");

export const authHandlers = [
  http.post("/users/sign_in", async ({ request }) => {
    const { user: body } = await request.json();

    const user = mockUsers.find((u) => u.email === body.email);
    const storedPassword = userPasswords.get(body.email);

    await delay();

    if (!user || !storedPassword || storedPassword !== body.password) {
      return HttpResponse.json(
        {
          message: "Неверный email или пароль",
          code: "INVALID_CREDENTIALS",
        },
        { status: 401 },
      );
    }

    const { accessToken } = await generateTokens({
      userId: user.id,
      email: user.email,
    });

    return HttpResponse.json(user, {
      status: 200,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }),
  http.delete("/users/sign_out", async () => {
    await delay();
    return HttpResponse.json(
      { message: "Signed out successfully", code: "SIGNED_OUT" },
      { status: 200 },
    );
  }),
];
