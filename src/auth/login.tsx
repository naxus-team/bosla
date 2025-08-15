import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "../locales";
import { GoogleMap, LoadScript } from "@react-google-maps/api";


const loginSchema = z.object({
  email: z.string().email(t("login.enter.email")).min(1, "البريد الإلكتروني مطلوب."),
  password: z.string().min(6, t("login.enter.password")).max(50, "كلمة المرور يجب أن تكون أقل من 50 حرفًا."),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AuthLogin() {
  useEffect(() => {
    document.title = `${t("app.name")} | ${t("common.langs.login")}`;
  }, []);
  // useEffect(() => {
  //   setLang("ar");
  // }, []);
  const cleanMapStyle = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }]
    }
  ];
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 30.0444, // مثلاً: القاهرة
    lng: 31.2357,
  };


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
    <div className="flex items-center min-h-screen font-cairo">
      <div className="flex items-center justify-center w-[calc(100%)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[426px]"

        >
          <div className="flex items-center justify-center mb-6">
            <svg width="155.38px" height="48px" viewBox="0 0 155.38 48" className="fill-black/70">
              <g>
                <g>
                  <path d="M25.95,30.75c2.64,0,4.8-2.16,4.8-4.8c0-1.98-1.17-3.72-2.97-4.47c-0.6-0.24-1.2-0.36-1.83-0.36h-4.8v4.83
			C21.15,28.59,23.31,30.75,25.95,30.75z"/>
                  <path d="M24,0c-0.96,0-1.92,0.06-2.85,0.18v0v16.44h4.8c1.23,0,2.4,0.24,3.54,0.72c3.48,1.44,5.76,4.8,5.76,8.61
			c0,5.13-4.17,9.3-9.3,9.3c-5.13,0-9.3-4.17-9.3-9.3v-4.83H0.18h0c0,0,0,0,0,0C0.06,22.08,0,23.04,0,24c0,13.23,10.74,24,24,24
			c13.26,0,24-10.77,24-24C48,10.74,37.26,0,24,0z"/>
                  <path d="M16.65,16.62V1.14v0C9.29,3.51,3.51,9.3,1.17,16.62c0,0,0,0,0,0H16.65z" />
                </g>
              </g>
              <g>
                <path d="M85.15,24c2.13,1.08,3.19,2.82,3.19,5.23c0,2.06-0.75,3.75-2.26,5.07c-1.51,1.33-3.41,1.99-5.7,1.99H69.33V11.92h10.65
		c2.27,0,4.17,0.66,5.7,1.97c1.53,1.31,2.29,3,2.29,5.06C87.98,21.17,87.03,22.85,85.15,24z M80.05,16.33h-6.13v5.7h6.13
		c1,0,1.8-0.27,2.4-0.81c0.6-0.54,0.9-1.23,0.9-2.06c0-0.81-0.29-1.49-0.88-2.03C81.89,16.6,81.08,16.33,80.05,16.33z M80.45,31.92
		c1,0,1.8-0.27,2.4-0.82c0.6-0.55,0.9-1.24,0.9-2.08c0-0.84-0.29-1.52-0.88-2.04c-0.59-0.53-1.39-0.79-2.42-0.79h-6.53v5.74H80.45z"
                />
                <path d="M100.67,36.76c-2.63,0-4.86-0.91-6.7-2.74c-1.84-1.83-2.76-4.06-2.76-6.69c0-2.63,0.92-4.86,2.76-6.69
		c1.84-1.83,4.08-2.74,6.7-2.74c2.6,0,4.82,0.92,6.65,2.76c1.83,1.84,2.74,4.06,2.74,6.67c0,2.61-0.91,4.83-2.74,6.67
		C105.49,35.84,103.28,36.76,100.67,36.76z M100.67,32.43c1.36,0,2.51-0.49,3.44-1.47c0.93-0.98,1.4-2.19,1.4-3.62
		c0-1.46-0.47-2.67-1.4-3.64c-0.93-0.97-2.08-1.45-3.44-1.45c-1.41,0-2.58,0.48-3.51,1.45c-0.93,0.97-1.4,2.18-1.4,3.64
		c0,1.46,0.47,2.67,1.4,3.64C98.09,31.94,99.26,32.43,100.67,32.43z"/>
                <path d="M126.81,30.99c0,1.77-0.71,3.18-2.12,4.23c-1.41,1.05-3.14,1.58-5.2,1.58c-1.91,0-3.53-0.47-4.86-1.4
		c-1.33-0.93-2.16-2.17-2.49-3.73l3.8-1.15c0.19,0.74,0.61,1.33,1.25,1.77c0.65,0.44,1.46,0.66,2.44,0.66
		c0.81,0,1.49-0.15,2.04-0.45c0.55-0.3,0.82-0.68,0.82-1.13c0-0.48-0.29-0.87-0.88-1.18c-0.59-0.31-1.48-0.62-2.67-0.93
		c-0.81-0.21-1.49-0.42-2.04-0.63c-0.55-0.2-1.17-0.51-1.86-0.93c-0.69-0.42-1.23-0.97-1.6-1.65c-0.37-0.68-0.56-1.49-0.56-2.42
		c0-1.74,0.65-3.14,1.95-4.18c1.3-1.04,2.92-1.56,4.86-1.56c1.79,0,3.3,0.47,4.54,1.4c1.23,0.93,2.01,2.18,2.35,3.73l-3.66,1.15
		c-0.19-0.72-0.57-1.31-1.15-1.77c-0.57-0.47-1.28-0.7-2.12-0.7c-0.69,0-1.28,0.16-1.76,0.47c-0.48,0.31-0.72,0.7-0.72,1.18
		c0,0.45,0.24,0.82,0.73,1.09c0.49,0.27,1.25,0.56,2.28,0.84c0.62,0.17,1.06,0.29,1.31,0.36s0.7,0.22,1.36,0.45
		c0.66,0.23,1.16,0.47,1.51,0.72c0.35,0.25,0.74,0.57,1.18,0.97c0.44,0.39,0.76,0.86,0.95,1.4
		C126.71,29.72,126.81,30.32,126.81,30.99z"/>
                <path d="M130.86,11.2h4.55v25.1h-4.55V11.2z" />
                <path d="M147.68,17.9c2.22,0,4.06,0.7,5.52,2.1c1.46,1.4,2.19,3.21,2.19,5.43V36.3h-4.37v-2.08c-0.69,0.74-1.54,1.34-2.55,1.81
		c-1,0.47-2.06,0.71-3.16,0.74c-1.6,0-2.96-0.5-4.07-1.49c-1.11-0.99-1.67-2.31-1.67-3.96c0-1.58,0.54-2.85,1.61-3.82
		c1.08-0.97,2.56-1.64,4.45-2.03l5.27-1c-0.19-0.79-0.57-1.43-1.13-1.92c-0.56-0.49-1.26-0.73-2.1-0.73c-0.84,0-1.64,0.23-2.4,0.68
		c-0.77,0.45-1.4,1.04-1.9,1.76l-3.3-2.4c0.84-1.19,1.95-2.15,3.33-2.87C144.79,18.26,146.22,17.9,147.68,17.9z M146.49,32.96
		c1.2,0,2.25-0.4,3.16-1.2c0.91-0.8,1.36-1.79,1.36-2.96v-0.82l-4.59,0.9c-1.65,0.38-2.47,1.11-2.47,2.19c0,0.55,0.23,1,0.7,1.36
		C145.11,32.78,145.73,32.96,146.49,32.96z"/>
              </g>
            </svg>





          </div>

          <h2 className="text-3xl font-bold my-10 text-center">{t("login.welcome_back")}</h2>

          <div className="space-y-4 ">
            <button
              className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(0,0,0,.15)] text-white w-full py-2 rounded-full min-h-[42px] hover:bg-[rgba(0,0,0,0.04)] transition space-x-2 rtl:space-x-reverse"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>

              </svg>
              <span className="text-black text-sm font-semibold">{t("login.continue.google")}</span>
            </button>

            <div className="flex items-center space-x-4  rtl:space-x-reverse">
              <button
                className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(0,0,0,.15)] text-white w-full py-2 rounded-full min-h-[42px] hover:bg-[rgba(0,0,0,0.04)] transition"
              >
                <svg width="18" height="18" viewBox="0 0 50 50" fill="none">
                  <path fill="#1877F2" d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                </svg>
              </button>
              <button
                className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(0,0,0,.15)] text-white w-full py-2 rounded-full min-h-[42px] hover:bg-[rgba(0,0,0,0.04)] transition"
              >
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <path fill="black" d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-[1px] rounded-full bg-black/10 my-8"><span className="bg-white px-4 text-sm font-normal">{t("common.or")}</span></div>

          <div className="mb-4">
            <input
              {...register("email")}
              type="email"
              placeholder={t("login.enter.email")}
              className="block bg-black/10 w-full rounded-2xl min-h-[48px] px-4 focus:shadow-[0_0_0_2px_rgba(0,0,0,1)] transiton duration-200 focus:outline-none placeholder:text-black/50 text-black text-md"
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-semibold mt-2">{errors.email.message}</p>
            )}
          </div>
          {/* 
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
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white w-full py-2 rounded-full min-h-[48px] hover:bg-black/90 transition"
          >
            {isSubmitting ? "جاري التحقق..." : t("login.continue.default")}
          </button>
          <div className="flex items-center justify-center mt-4 text-[12px] text-black/50">
            <span>{`${t("app.footer.auth")} ${t("app.name")}`}&nbsp;</span>
            <Link to={`/terms`} className="underline hover:text-black/80 transition" target="_blank" rel="noopener noreferrer">
              {t("app.footer.terms")}
            </Link>
            <span>&nbsp;{t("common.and")}&nbsp;</span>
            <Link to={`/privacy`} className="underline hover:text-black/80 transition" target="_blank" rel="noopener noreferrer">
              {t("app.footer.privacy")}
            </Link>
            <span>.</span>
          </div>
        </form>
      </div>

    </div>
  );
}
