"use client";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from 'react-feather';
import { t } from "../locales";


type MenuProps = {
    open: boolean;
    onClose: () => void; // 👈 دالة إغلاق
};

export default function Menu({ open, onClose }: MenuProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ x: "-100%" }}   // بداية الحركة
                    animate={{ x: 0 }}     // أثناء الظهور
                    exit={{ x: "-100%" }}      // عند الاختفاء
                    transition={{ duration: 0.2, ease: "easeInOut" }} // سرعة ونعومة
                    className="z-[999999] absolute top-0 left-0 w-full h-screen bg-background_dark shadow-lg p-4"
                >
                    <div className="flex items-center justify-between px-1">
                        <button onClick={onClose} className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                            <Icon.X className="w-[24px] h-[24px] dark:stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                        </button>
                        <button onClick={onClose} className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                            <Icon.MoreHorizontal className="w-[24px] h-[24px] dark:stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] rounded-3xl mt-2">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="./prof1.png" className=" w-[52px] h-[52px] rounded-full" />
                            <div className="flex flex-col justify-between space-y-1">
                                <span className="text-sm text-background font-semibold">عبد الرحمن أحمد</span>
                                <span className="text-sm text-background/60 font-normal">201001724808+</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="flex items-center px-4 h-[32px] rounded-xl dark:bg-primary"
                            >
                                <span className="text-sm text-background font-semibold">ترقية الحساب</span>
                            </button>
                        </div>
                    </div>
                    <div className="dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] rounded-3xl mt-4 overflow-hidden pt-2">
                        <span className="text-xs text-background/50 font-normal px-5">خيارات عامة</span>
                        <div className="w-full h-[1px] bg-background/10 mt-2"></div>
                        <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                            <Icon.Settings className="w-[20px] h-[20px] dark:stroke-primary stroke-[2px] dark:text-background" />
                            <div className="relative flex flex-col space-y-1">
                                <span className="flex text-sm text-background font-semibold">
                                    {t("common.account")}
                                </span>
                                <span className="text-sm text-background/60 font-normal">
                                    آمان الإشعارات، تغيير الرقم
                                </span>
                            </div>
                        </button>
                        <div className="w-full h-[1px] bg-background/10"></div>
                        <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                            <Icon.Layout className="w-[20px] h-[20px] dark:stroke-primary stroke-[2px] dark:text-background" />
                            <div className="relative flex flex-col space-y-1">
                                <span className="flex text-sm text-background font-semibold">
                                    المظهر
                                </span>
                                <span className="text-sm text-background/60 font-normal">
                                    تخصيص اللون أو المظهر العام
                                </span>
                            </div>
                        </button>
                        <div className="w-full h-[1px] bg-background/10"></div>
                        <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                            <Icon.Globe className="w-[20px] h-[20px] dark:stroke-primary stroke-[2px] dark:text-background" />
                            <div className="relative flex flex-col space-y-1">
                                <span className="flex text-sm text-background font-semibold">
                                    {t("common.app_language")}
                                </span>
                                <span className="text-sm text-background/60 font-normal">
                                    الإنجليزية (لغة النظام)
                                </span>
                            </div>
                        </button>
                        <div className="w-full h-[1px] bg-background/10"></div>
                        <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                            <Icon.Smartphone className="w-[20px] h-[20px] dark:stroke-primary stroke-[2px] dark:text-background" />
                            <div className="relative flex flex-col space-y-1">
                                <span className="flex text-sm text-background font-semibold">
                                    {t("common.app")}
                                </span>
                                <span className="text-sm text-background/60 font-normal">
                                    {t("common.about_app")}
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className="dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] rounded-3xl mt-4 overflow-hidden pt-2">
                        <span className="text-xs text-background/50 font-normal px-5">خيارات أخري</span>
                        <div className="w-full h-[1px] bg-background/10 mt-2"></div>
                        <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                            <Icon.Tool className="w-[20px] h-[20px] dark:stroke-primary stroke-[2px] dark:text-background" />
                            <div className="relative flex flex-col space-y-1">
                                <span className="flex text-sm text-background font-semibold">
                                    مطور
                                </span>
                                <span className="text-sm text-background/60 font-normal">
                                    خاص بالمطورين
                                </span>
                            </div>
                        </button>
                        <div className="w-full h-[1px] bg-background/10"></div>
                        <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                            <Icon.HelpCircle className="w-[20px] h-[20px] dark:stroke-primary stroke-[2px] dark:text-background" />
                            <div className="relative flex flex-col space-y-1">
                                <span className="flex text-sm text-background font-semibold">
                                    مساعدة
                                </span>
                                <span className="text-sm text-background/60 font-normal">
                                    مركز المساعدة, التواصل معنا, سياسة الخصوصية
                                </span>
                            </div>
                        </button>
                    </div>


                    <div className="relative w-full mt-2 flex items-center justify-center p-4 bg-background_dark">
                        <div className="flex flex-col items-center space-y-2">
                            <svg width="32px" height="26.78px" viewBox="0 0 48 26.78" className="fill-background dark:fill-background">
                                <path d="M45.37,10.72l-0.73-0.73l-7.37-7.37c-3.5-3.5-9.21-3.5-12.71,0l-4.25,4.25l-4.25-4.25
    c-3.51-3.5-9.21-3.5-12.71,0L2.63,3.35l0,0c-3.5,3.5-3.5,9.21,0,12.71l0.72,0.72c0,0,0,0,0,0l7.37,7.37
    c1.75,1.75,4.05,2.63,6.36,2.63c2.3,0,4.6-0.88,6.36-2.63l4.25-4.25l4.25,4.25c1.75,1.75,4.05,2.63,6.36,2.63s4.6-0.88,6.36-2.63
    l0.73-0.72l0,0C48.88,19.93,48.88,14.22,45.37,10.72z"/>
                                <path className="fill-background_dark" d="M5.46,6.18l0.73-0.72c1.94-1.94,5.11-1.94,7.05,0l4.25,4.25l-4.25,4.25c-1.94,1.94-5.11,1.95-7.05,0l-0.72-0.72
    C3.51,11.29,3.51,8.13,5.46,6.18z"/>
                                <path className="fill-background_dark" d="M20.6,21.33c-1.94,1.94-5.11,1.94-7.05,0l-2.08-2.08c1.69-0.33,3.3-1.15,4.6-2.45l7.08-7.08l0,0l4.25-4.25
    c1.94-1.94,5.11-1.94,7.05,0l2.08,2.08c-1.69,0.33-3.3,1.15-4.6,2.45l-7.08,7.08l0,0L20.6,21.33z"/>
                                <path className="fill-background_dark" d="M42.54,20.6l-0.73,0.72c-1.95,1.94-5.11,1.94-7.05,0l-4.25-4.25l4.25-4.25c1.95-1.94,5.11-1.94,7.05,0
    l0.73,0.73C44.49,15.49,44.49,18.66,42.54,20.6z"/>
                            </svg>
                            <span className="text-xs dark:text-background/60 font-semibold">{t("app.name")} (10.1.25)</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
