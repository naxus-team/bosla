// Default imports.
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Icon from 'react-feather';


// Components.
import { t } from "../locales";

// Tools.
import ErrorMessage from "../devTools/ErrorMessage";




const loginSchema = z.object({
  email: z.string().email(t("login.enter.email")).min(1, "البريد الإلكتروني مطلوب."),
  password: z.string().min(6, t("login.enter.password")).max(50, "كلمة المرور يجب أن تكون أقل من 50 حرفًا."),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AuthLogin() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();


  useEffect(() => {
    document.title = `${t("app.name")} | ${t("common.langs.login")}`;
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setAuthorized(false);
          return;
        }

        const res = await axios.get("http://192.168.1.3:8000/v1/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status === true) {
          setAuthorized(true);
          navigate("/app", { replace: true }); // 👈 ده الصح
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);
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

  const [errorLog, setErrorLog] = useState<{ operation: string; response?: string } | null>(null);




  const onSubmit = async (data: LoginForm) => {
    // عرض بيانات الفورم مؤقتًا
    const operation = "Sending data to server...";

    setErrorLog({ operation: JSON.stringify(data, null, 2) });


    try {
      // إرسال البيانات للـ API
      const res = await axios.post("http://192.168.1.3:8000/v1/login", data, {
        withCredentials: true
      });

      console.log(res.data.access_token);

      localStorage.setItem("token", res.data.access_token);
      // عرض الرد مباشرة في JSX
      setErrorLog({ operation: JSON.stringify(data, null, 2), response: JSON.stringify(res.data, null, 2) });
    } catch (err: any) {
      setErrorLog({ operation, response: "حدث خطأ أثناء الاتصال بالخادم" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[rgba(238,238,238,1)] font-changa">
      {errorLog && (
        <ErrorMessage
          operation={errorLog.operation}
          isError={true}
          response={errorLog.response}
          onClose={() => setErrorLog(null)}
        />
      )}


      <div className="relative w-[393px] h-screen bg-background overflow-hidden select-none flex justify-center">
        <div className="flex items-center min-h-screen font-noto-arabic">
          <div className="absolute top-0 left-0 rtl:right-0 flex items-center justify-between w-full p-8">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg width="38px" height="26.78px" viewBox="0 0 48 26.78" className="fill-primary dark:fill-primary">
                <path className="fill-primary" d="M45.37,10.72l-0.73-0.73l-7.37-7.37c-3.5-3.5-9.21-3.5-12.71,0l-4.25,4.25l-4.25-4.25
	c-3.51-3.5-9.21-3.5-12.71,0L2.63,3.35l0,0c-3.5,3.5-3.5,9.21,0,12.71l0.72,0.72c0,0,0,0,0,0l7.37,7.37
	c1.75,1.75,4.05,2.63,6.36,2.63c2.3,0,4.6-0.88,6.36-2.63l4.25-4.25l4.25,4.25c1.75,1.75,4.05,2.63,6.36,2.63s4.6-0.88,6.36-2.63
	l0.73-0.72l0,0C48.88,19.93,48.88,14.22,45.37,10.72z"/>
                <path className="fill-white" d="M5.46,6.18l0.73-0.72c1.94-1.94,5.11-1.94,7.05,0l4.25,4.25l-4.25,4.25c-1.94,1.94-5.11,1.95-7.05,0l-0.72-0.72
	C3.51,11.29,3.51,8.13,5.46,6.18z"/>
                <path className="fill-white" d="M20.6,21.33c-1.94,1.94-5.11,1.94-7.05,0l-2.08-2.08c1.69-0.33,3.3-1.15,4.6-2.45l7.08-7.08l0,0l4.25-4.25
	c1.94-1.94,5.11-1.94,7.05,0l2.08,2.08c-1.69,0.33-3.3,1.15-4.6,2.45l-7.08,7.08l0,0L20.6,21.33z"/>
                <path className="fill-white" d="M42.54,20.6l-0.73,0.72c-1.95,1.94-5.11,1.94-7.05,0l-4.25-4.25l4.25-4.25c1.95-1.94,5.11-1.94,7.05,0
	l0.73,0.73C44.49,15.49,44.49,18.66,42.54,20.6z"/>
              </svg>
              <span className="text-2xl text-primary font-bold">{`${t("app.name")}`}</span>
            </div>
            <button className="flex items-center justify-center w-[32px] h-[32px] rounded-full">
              <Icon.MoreHorizontal className="w-[24px] h-[24px] stroke-background_dark stroke-[1.5px]" />
            </button>
          </div>
          <div className="flex justify-center w-[346px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-[426px]"

            >
              <h2 className="text-3xl font-semibold my-10 text-center">{t("login.welcome_back")}</h2>

              <div className="space-y-4 ">
                <button
                  className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(26,26,26,.4)] transition all duration-100 text-white w-full py-2 rounded-full min-h-[42px] space-x-2 rtl:space-x-reverse"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>

                  </svg>
                  <span className="text-black text-sm font-normal">{t("login.continue.google")}</span>
                </button>

                <button
                  className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(26,26,26,.4)] transition all duration-100 text-white w-full py-2 rounded-full min-h-[42px] space-x-2 rtl:space-x-reverse"
                >
                  <svg width="18" height="18" viewBox="0 0 50 50" fill="none">
                    <path fill="#1877F2" d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                  </svg>
                  <span className="text-black text-sm font-normal">{t("login.continue.facebook")}</span>

                </button>
                <button
                  className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(26,26,26,.4)] transition all duration-100 text-white w-full py-2 rounded-full min-h-[42px] space-x-2 rtl:space-x-reverse"
                >
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                    <path fill="black" d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"></path>
                  </svg>
                  <span className="text-black text-sm font-normal">{t("login.continue.x")}</span>

                </button>
              </div>

              <div className="flex items-center justify-center w-full h-[1px] rounded-full bg-black/10 my-8"><span className="bg-background px-4 text-sm font-normal">{t("common.or")}</span></div>

              <button
                className="flex items-center justify-center shadow-[0_0_0_1px_inset_rgba(26,26,26,.4)] transition all duration-100 text-white w-full py-2 rounded-full min-h-[42px] space-x-2 rtl:space-x-reverse"
              >
                <Icon.Mail className="w-[18px] h-[18px] stroke-background_dark stroke-[1.5px]" />

                <span className="text-black text-sm font-normal">{t("login.continue.mail")}</span>

              </button>

              <div className="relative mb-4 hidden">
                <input
                  {...register("email")}
                  type="email"
                  defaultValue="raff@bosla.com"
                  placeholder={t("login.enter.email")}
                  className="overflow-hidden block shadow-[0_0_0_1px_inset_rgba(26,26,26,.4)] w-full rounded-xl min-h-[42px] px-4 focus:shadow-[0_0_0_2px_inset_rgba(26,26,26,1)] transiton duration-200 focus:outline-none placeholder:text-black/50 text-black text-md pl-[48px] rtl:pr-[48px]"
                />
                <div className="absolute top-0 left-0 rtl:right-0 w-[48px] h-[42px] flex items-center justify-center p-1">
                  <div className="min-w-[32px] h-[32px] flex items-center justify-center rounded-full">
                    <Icon.AtSign className="w-[18px] h-[18px] stroke-background_dark stroke-[2px]" />
                  </div>
                </div>
                {errors.email && (
                  <p className="text-xs text-primary font-normal mt-2">{errors.email.message}</p>
                )}
              </div>

              <div className="relative mb-4 hidden">
                <input
                  {...register("password")}
                  type="password"
                  defaultValue={"123456"}
                  placeholder={t("login.enter.password")}
                  className="overflow-hidden block shadow-[0_0_0_1px_inset_rgba(26,26,26,.4)] w-full rounded-xl min-h-[42px] px-4 focus:shadow-[0_0_0_2px_inset_rgba(26,26,26,1)] transiton duration-100 focus:outline-none placeholder:text-black/50 text-black text-md pl-[48px] rtl:pr-[48px]"
                />
                <div className="absolute top-0 left-0 rtl:right-0 w-[48px] h-[42px] flex items-center justify-center p-1">
                  <div className="min-w-[32px] h-[32px] flex items-center justify-center rounded-full">
                    <Icon.Lock className="w-[18px] h-[18px] stroke-background_dark stroke-[2px]" />
                  </div>
                </div>
                {errors.password && (
                  <p className="text-xs text-primary font-normal mt-2">{errors.password.message}</p>
                )}
              </div>


              <div className="absolute left-0 bottom-0 w-full p-5">
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-secondary_light w-full rounded-full min-h-[42px] transition duration-50 active:scale-[.98]"
                  >
                    <span className="text-background text-base font-bold">
                      {isSubmitting ? "جاري التحقق..." : t("login.default")}
                    </span>
                  </button>
                </div>
                {/* <div className="flex items-center justify-center mt-4 text-[12px] text-black/50">
                  <span>{`${t("app.footer.auth")} ${t("app.name")}`}&nbsp;</span>
                  <Link to={`/terms`} className="underline hover:text-black/80 transition" target="_blank" rel="noopener noreferrer">
                    {t("app.footer.terms")}
                  </Link>
                  <span>&nbsp;{t("common.and")}&nbsp;</span>
                  <Link to={`/privacy`} className="underline hover:text-black/80 transition" target="_blank" rel="noopener noreferrer">
                    {t("app.footer.privacy")}
                  </Link>
                  <span>.</span>
                </div> */}
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
