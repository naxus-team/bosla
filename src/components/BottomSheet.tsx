"use client";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from 'react-feather';
import { t } from "../locales";


type BottomSheetProps = {
    id: number;                 // 👈 رقم الشيت
    activeId: number | null;    // 👈 الشيت المفتوح حاليًا
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
};


export default function BottomSheet({ id, activeId, onClose, title, children }: BottomSheetProps) {
    const open = activeId === id;
    if (!open) return null;
    return (
        <>
            {children}
        </>
    );
}