import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { t, setLang } from "../locales";
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
    <div className="flex items-center min-h-screen font-noto font-ibm">
      <div className="flex items-center justify-center w-[calc(100%)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[426px]"
        >
          <div className="flex items-center justify-center mb-6">
            <svg width="52" height="52" viewBox="0 0 52 52">

              <g>
                <g>
                  <defs>
                    <path
                      id="SVGID_1_"
                      d="M34,0h-16C8,0,0,8,0,18v16c0,10,8,18,18,18h16c10,0,18-8,18-18V18C52,8,44,0,34,0z"
                    />
                  </defs>
                  <clipPath id="SVGID_2_">
                    <use xlinkHref="#SVGID_1_" style={{ overflow: "visible" }} />
                  </clipPath>
                  <g className="st0">
                    <g>
                      <defs>
                        <rect
                          id="SVGID_3_"
                          width="52"
                          height="52"
                          rx="20"
                          ry="20"
                        />
                      </defs>
                      <clipPath id="SVGID_4_">
                        <use xlinkHref="#SVGID_3_" style={{ overflow: "visible" }} />
                      </clipPath>
                      <g clipPath="url(#SVGID_4_)">

                        <image style={{ overflow: "visible" }} width="130" height="131" xlinkHref="data:image/jpeg;base64,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
eF//2Q==" transform="matrix(0.48 0 0 0.48 -5.2774 -5.4396)">
                        </image>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <path className="fill-white" d="M29.43,3.71h-6.86c-10.41,0-18.86,8.44-18.86,18.86v6.86c0,10.41,8.44,18.86,18.86,18.86h6.86
	c10.41,0,18.86-8.44,18.86-18.86v-6.86C48.29,12.16,39.84,3.71,29.43,3.71z"/>
              <g className="fill-black">
                <path d="M37.4,21.9v-4.67c0-1.45-1.18-2.63-2.62-2.63H30.1c-2.25,0-4.26,1.02-5.6,2.63c-0.94-1.54-2.62-2.58-4.56-2.58
	h-2.72c-1.45,0-2.62,1.18-2.62,2.62v2.72c0,1.93,1.04,3.61,2.58,4.55c-1.58,1.34-2.58,3.33-2.58,5.56v4.67
	c0,1.45,1.18,2.62,2.62,2.62h4.67c2.23,0,4.22-1.01,5.56-2.58c0.94,1.54,2.62,2.58,4.55,2.58h2.72c1.45,0,2.62-1.18,2.62-2.62v-2.72
	c0-1.93-1.04-3.62-2.59-4.56C36.37,26.15,37.4,24.14,37.4,21.9z M30.1,17.52h4.37v4.38c0,2.41-1.96,4.38-4.37,4.38
	c-1.07,0-2.04-0.4-2.8-1.04c-0.17-0.18-0.34-0.36-0.53-0.53c-0.64-0.76-1.04-1.73-1.04-2.8C25.73,19.48,27.69,17.52,30.1,17.52z
	 M17.52,17.56h2.43c1.34,0,2.43,1.09,2.43,2.43c0,1.34-1.09,2.43-2.43,2.43s-2.43-1.09-2.43-2.43V17.56z M21.9,34.48h-4.38V30.1
	c0-2.41,1.96-4.38,4.38-4.38c1.07,0,2.04,0.4,2.8,1.04c0.17,0.18,0.34,0.36,0.53,0.53c0.64,0.76,1.04,1.73,1.04,2.8
	C26.27,32.52,24.31,34.48,21.9,34.48z M34.44,34.48h-2.43c-1.34,0-2.43-1.09-2.43-2.43c0-1.34,1.09-2.43,2.43-2.43
	c1.34,0,2.43,1.09,2.43,2.43V34.48z"/>
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
