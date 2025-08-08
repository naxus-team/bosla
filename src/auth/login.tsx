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
    <div dir="rtl" className="flex items-center min-h-screen font-noto font-noto-arabic">
      <div className="flex items-center justify-center w-[calc(50%)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[426px]"
        >
          <div className="flex items-center justify-center mb-6">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <path fill="black" d="M16,26.05c3.89,3.89,9.06,6.03,14.57,6.03c1.84,0,3.64-0.24,5.37-0.7c4.06-1.09,5.39-6.2,2.42-9.18l-20.6-20.6
		c-2.14-2.14-5.62-2.14-7.76,0L1.61,9.99c-3.01,3.01-1.57,8.09,2.54,9.2C8.49,20.36,12.6,22.65,16,26.05z"/>
              <path className="fill-black/25" d="M22.27,37.02c-2.24-2.24-5.21-3.47-8.37-3.47c-1.06,0-2.09,0.14-3.08,0.4c-2.34,0.63-3.1,3.56-1.39,5.27
		l11.84,11.84c1.23,1.23,3.23,1.23,4.46,0l4.82-4.82c1.73-1.73,0.9-4.65-1.46-5.29C26.59,40.29,24.23,38.98,22.27,37.02z"/>
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
          <div className="flex items-center justify-center mt-6">
            <button className="flex items-center justify-center px-4 rounded-full min-h-[42px] hover:bg-[rgba(0,0,0,0.04)] transition duration-100 space-x-2 rtl:space-x-reverse">
              <img src="https://s3-iconly.sfo3.digitaloceanspaces.com/png-icons/translate%20language-134-1692683740.png" alt="Arabic" className="w-6 h-6" />
              <span className="text-sm text-black font-semibold">{t("common.langs.arabic")}</span>
            </button>
          </div>
        </form>
      </div>
      <div className=" h-screen w-[100vh] flex items-center justify-center p-2 bg-white">
        <div className="relative w-full h-full bg-[rgba(0,0,0,.04)] rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadScript googleMapsApiKey="AIzaSyCuTilAfnGfkZtIx0T3qf-eOmWZ_N2LpoY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                options={{
                  styles: cleanMapStyle, // هنا تضيف التنسيق
                  disableDefaultUI: true, // يخفي أزرار التكبير والبحث وغيره
                  draggable: false,       // يمنع تحريك الخريطة
                  scrollwheel: false,     // يمنع الزوم من الماوس
                }}

              >
                {/* ممكن تضيف ماركر هنا لو حبيت */}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}
