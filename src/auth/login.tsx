import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {t, setLang } from "../locales";

const loginSchema = z.object({
  email: z.string().email("صيغة الإيميل غير صحيحة"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AuthLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("بيانات تسجيل الدخول:", data);
    // هنا ممكن ترسل البيانات لـ API
    // await axios.post("/api/login", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{t("login.title")}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">البريد الإلكتروني</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">كلمة المرور</label>
          <input
            {...register("password")}
            type="password"
            placeholder="******"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#8b5cf6] text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
