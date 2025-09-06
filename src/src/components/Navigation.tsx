"use client";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from 'react-feather';
import { t } from "../locales";


type MenuProps = {
    open: boolean;
    onClose: () => void; 
};

export default function Menu({ open, onClose }: MenuProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ x: "-100%" }}   
                    animate={{ x: 0 }}     
                    exit={{ x: "-100%" }}      
                    transition={{ duration: 0.2, ease: "easeInOut" }} 
                    className="z-[999999] absolute top-0 left-0 w-full h-screen bg-background dark:bg-background_dark"
                >
                    <div className="relative">
                        <div className="flex items-center justify-between p-2 shadow-sm">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <button onClick={onClose} className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                                    <Icon.ArrowRight className="w-[24px] h-[24px] stroke-background_dark dark:stroke-background stroke-[2px] dark:text-background" />
                                </button>
                                <span className="text-lg text-background_dark font-normal">
                                    {t("common.settings")}
                                </span>
                            </div>
                            <button className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                                <Icon.Search className="w-[24px] h-[24px] stroke-background_dark dark:stroke-background stroke-[2px] dark:text-background" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4  rounded-3xl">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src="./mo.jpg" className=" w-[64px] h-[64px] rounded-full" />
                                <div className="flex flex-col justify-between space-y-1">
                                    <span className="text-sm text-background_dark text-background font-semibold">Mohamed Reda</span>
                                    <span dir="ltr" className="text-sm text-background_dark/60 dark:text-background/60 font-normal">+20 11 41997099</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button onClick={onClose} className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                                    <Icon.MoreVertical
                                        className="w-[24px] h-[24px] text-primary dark:text-background" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-[rgba(26,26,26,.04)]"></div>

                        <div className=" rounded-3xl overflow-hidden py-1">
                            <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                                <Icon.Settings className="w-[20px] h-[20px] text-[rgba(118,118,118,1)] dark:text-background stroke-[2px]" />
                                <div className="relative flex flex-col space-y-1">
                                    <span className="flex text-md text-background_dark dark:text-background font-normal">
                                        {t("common.account")}
                                    </span>
                                    <span className="text-sm text-background_dark/60 dark:text-background/60 font-normal">
                                        آمان الإشعارات، تغيير الرقم
                                    </span>
                                </div>
                            </button>
                            <div className="w-full h-[1px] bg-background/10"></div>
                            <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                                <Icon.Layout className="w-[20px] h-[20px] text-[rgba(118,118,118,1)] dark:text-background stroke-[2px]" />
                                <div className="relative flex flex-col space-y-1">
                                    <span className="flex text-md text-background_dark dark:text-background font-normal">
                                        المظهر
                                    </span>
                                    <span className="text-sm text-background_dark/60 dark:text-background/60 font-normal">
                                        تخصيص اللون أو المظهر العام
                                    </span>
                                </div>
                            </button>
                            <div className="w-full h-[1px] bg-background/10"></div>
                            <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                                <Icon.Globe className="w-[20px] h-[20px] text-[rgba(118,118,118,1)] dark:text-background stroke-[2px]" />
                                <div className="relative flex flex-col space-y-1">
                                    <span className="flex text-md text-background_dark dark:text-background font-normal">
                                        {t("common.app_language")}
                                    </span>
                                    <span className="text-sm text-background_dark/60 dark:text-background/60 font-normal">
                                        الإنجليزية (لغة النظام)
                                    </span>
                                </div>
                            </button>
                            <div className="w-full h-[1px] bg-background/10"></div>
                            <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                                <Icon.Smartphone className="w-[20px] h-[20px] text-[rgba(118,118,118,1)] dark:text-background stroke-[2px]" />
                                <div className="relative flex flex-col space-y-1">
                                    <span className="flex text-md text-background_dark dark:text-background font-normal">
                                        {t("common.app")}
                                    </span>
                                    <span className="text-sm text-background_dark/60 dark:text-background/60 font-normal">
                                        {t("common.about_app")}
                                    </span>
                                </div>
                            </button>
                        </div>
                        <div className="w-full h-[1px] bg-[rgba(26,26,26,.04)]"></div>
                        <div className=" rounded-3xl overflow-hidden py-1">
                            <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                                <Icon.Tool className="w-[20px] h-[20px] text-[rgba(118,118,118,1)] dark:text-background stroke-[2px]" />
                                <div className="relative flex flex-col space-y-1">
                                    <span className="flex text-md text-background_dark dark:text-background font-normal">
                                        مطور
                                    </span>
                                    <span className="text-sm text-background_dark/60 dark:text-background/60 font-normal">
                                        خاص بالمطورين
                                    </span>
                                </div>
                            </button>
                            <div className="w-full h-[1px] bg-[rgba(26,26,26,.04)]"></div>
                            <button className="flex items-center w-full h-[68px] p-5 space-x-4 space-x-reverse">
                                <Icon.HelpCircle className="w-[20px] h-[20px] text-[rgba(118,118,118,1)] dark:text-background stroke-[2px]" />
                                <div className="relative flex flex-col space-y-1">
                                    <span className="flex text-md text-background_dark dark:text-background font-normal">
                                        مساعدة
                                    </span>
                                    <span className="text-sm text-background_dark/60 dark:text-background/60 font-normal">
                                        مركز المساعدة, التواصل معنا, سياسة الخصوصية
                                    </span>
                                </div>
                            </button>
                        </div>
                        <div className="w-full h-[1px] bg-[rgba(26,26,26,.04)]"></div>
                        <div className="relative w-full h-full flex items-center justify-center p-4 bg-background dark:bg-background_dark">
                            <div className="flex flex-col items-center space-y-2">
                                <svg width="32px" height="26.78px" viewBox="0 0 48 26.78" className="fill-primary dark:fill-background">
                                    <path d="M45.37,10.72l-0.73-0.73l-7.37-7.37c-3.5-3.5-9.21-3.5-12.71,0l-4.25,4.25l-4.25-4.25
    c-3.51-3.5-9.21-3.5-12.71,0L2.63,3.35l0,0c-3.5,3.5-3.5,9.21,0,12.71l0.72,0.72c0,0,0,0,0,0l7.37,7.37
    c1.75,1.75,4.05,2.63,6.36,2.63c2.3,0,4.6-0.88,6.36-2.63l4.25-4.25l4.25,4.25c1.75,1.75,4.05,2.63,6.36,2.63s4.6-0.88,6.36-2.63
    l0.73-0.72l0,0C48.88,19.93,48.88,14.22,45.37,10.72z"/>
                                    <path className="fill-background dark:fill-background_dark" d="M5.46,6.18l0.73-0.72c1.94-1.94,5.11-1.94,7.05,0l4.25,4.25l-4.25,4.25c-1.94,1.94-5.11,1.95-7.05,0l-0.72-0.72
    C3.51,11.29,3.51,8.13,5.46,6.18z"/>
                                    <path className="fill-background dark:fill-background_dark" d="M20.6,21.33c-1.94,1.94-5.11,1.94-7.05,0l-2.08-2.08c1.69-0.33,3.3-1.15,4.6-2.45l7.08-7.08l0,0l4.25-4.25
    c1.94-1.94,5.11-1.94,7.05,0l2.08,2.08c-1.69,0.33-3.3,1.15-4.6,2.45l-7.08,7.08l0,0L20.6,21.33z"/>
                                    <path className="fill-background dark:fill-background_dark" d="M42.54,20.6l-0.73,0.72c-1.95,1.94-5.11,1.94-7.05,0l-4.25-4.25l4.25-4.25c1.95-1.94,5.11-1.94,7.05,0
    l0.73,0.73C44.49,15.49,44.49,18.66,42.54,20.6z"/>
                                </svg>
                                <span className="text-xs text-background_dark/60 dark:text-background/60 font-semibold">{t("globals.app_name")}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
