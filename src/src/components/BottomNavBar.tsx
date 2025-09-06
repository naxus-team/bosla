"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';

import { t } from "../locales";


type MenuProps = {
    openTab: boolean;
    onCloseTab: () => void; 
};

export default function BottomNavBar({ openTab, onCloseTab }: MenuProps) {
    return (
        <AnimatePresence>
            {openTab && (
                <motion.div
                    animate={{ x: 0 }}     
                    exit={{ x: 50 }}      
                    transition={{ duration: 0.4, ease: "easeInOut" }} 
                    className="z-[9999] absolute bottom-0 left-0 right-0"
                >
                    <div className="relative w-full flex items-center bg-background h-[72px]  dark:bg-background_dark shadow-top-xl">
                        <button className="flex items-center px-8 w-[48px] h-[72px]">
                            <div className="flex flex-col justify-center space-y-1">
                                <div className="flex items-center justify-center">
                                    <Icon icon="solar:home-angle-bold"
                                        color="black"
                                        opacity={1}
                                        width={24}
                                        height={24}
                                        strokeWidth={1}
                                    />
                                </div>
                                <span className="text-xs text-black font-semibold">رئيسية</span>
                            </div>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
