"use client";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from 'react-feather';
import { t } from "../locales";


type BottomSheetProps = {
    open: boolean;
    onClose: () => void; // 👈 دالة إغلاق
};

export default function BottomSheet({ open, onClose }: BottomSheetProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ y: "100%" }}   // بداية الحركة
                    animate={{ y: 0 }}     // أثناء الظهور
                    exit={{ y: "100%" }}      // عند الاختفاء
                    transition={{ duration: 0.2, ease: "easeInOut" }} // سرعة ونعومة
                    className="z-[999999] absolute bottom-0 left-0 w-full bg-background_dark rounded-tl-3xl rounded-tr-3xl shadow-lg p-4 "
                >
                    <div className="flex items-center justify-center p-2">
                    <span className="text-lg text-background font-bold">{t("common.langs.show_fare")}</span>
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <input className="relative flex items-center text-center w-full h-[58px] p-4 rounded-2xl bg-background_dark dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] outline-none text-lg text-background font-normal placeholder:text-background/60"
                            placeholder={`5.00 جنيه`}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <button
                            className="flex items-center justify-center w-[76px] h-[38px] bg-primary rounded-full"
                        >
                            <Icon.Check className="w-[24px] h-[24px] dark:stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                        </button>

                        <button
                        onClick={onClose}
                            className="flex items-center justify-center w-[76px] h-[38px] bg-background/10 rounded-full"
                        >
                            <Icon.X className="w-[24px] h-[24px] dark:stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
