"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from "react";
import { t } from "../locales";

import BottomSheet from "../components/BottomSheet";
import MapControl from "../components/MapView";
import FindView from '../components/shared/FindView';
import FindRide from '../components/shared/FindRide';


interface MyLocation {
    lat: number;
    lon: number;
}

type Driver = {
    id: number;
    name: string;
    lat: number;
    lng: number;
};

const drivers: Driver[] = [
    { id: 1, name: "محمد", lat: 30.032, lng: 31.260 },
    { id: 2, name: "أشرف", lat: 30.029, lng: 31.258 },
    { id: 3, name: "سائق 3", lat: 30.035, lng: 31.255 },
    { id: 4, name: "سائق 4", lat: 30.040, lng: 31.270 },
];

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const toRad = (value: number) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // المسافة بالكيلومتر
}

function findNearestDrivers(userLat: number, userLng: number, count = 3) {
    return drivers
        .map(driver => ({
            ...driver,
            distance: haversineDistance(userLat, userLng, driver.lat, driver.lng)
        }))
        .sort((a, b) => a.distance - b.distance) // ترتيب من الأقرب للأبعد
        .slice(0, count); // رجع أقرب count سواقين
}

type TabsProps = {
    id: number;                 // 👈 رقم الشيت
    activeTabId: number | null;    // 👈 الشيت المفتوح حاليًا
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
};


export default function Tabs({ id, activeTabId, onClose, title, children }: TabsProps) {

    const [query, setQuery] = useState<string>("");


    const [location, setLocation] = useState<MyLocation | null>(null);
    const [nearestDrivers, setNearestDrivers] = useState<Driver[]>([]);


    const egyptBounds = {
        south: 22.0,
        west: 25.0,
        north: 31.7,
        east: 35.9
    };

    const handleSearch = async () => {
        if (!query.trim()) {
            alert("من فضلك اكتب عنوان صحيح");
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=eg&q=${encodeURIComponent(query)}`
            );

            const data = await response.json();

            if (data.length === 0) {
                alert("العنوان غير موجود، حاول تكتب عنوان آخر");
                return;
            }

            const bestResult = data[0];
            const { lat, lon } = bestResult;

            let clampedLat = Math.min(Math.max(parseFloat(lat), egyptBounds.south), egyptBounds.north);
            let clampedLon = Math.min(Math.max(parseFloat(lon), egyptBounds.west), egyptBounds.east);

            setLocation({ lat: clampedLat, lon: clampedLon });

            // حساب السائقين الأقرب
            const nearest = findNearestDrivers(clampedLat, clampedLon);
            setNearestDrivers(nearest);

        } catch (error) {
            console.error("خطأ في جلب البيانات:", error);
            alert("حصل خطأ أثناء البحث، حاول مرة أخرى");
        }
    };

    useEffect(() => {
        setActiveId(0);
    }, []);

    const [pickup, setPickup] = useState<any>(null);
    const [dropoff, setDropoff] = useState<any>(null);
    const open = activeTabId === id;

    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    // initial={{ x: "100%" }}   // بداية الحركة
                    // animate={{ x: 0 }}     // أثناء الظهور
                    // exit={{ x: "100%" }}      // عند الاختفاء
                    // transition={{ duration: 0.2, ease: "easeInOut" }} // سرعة ونعومة
                    className="z-[999999] absolute top-0 left-0 w-full h-full bg-background dark:bg-background_dark"
                >

                    <div className="z-[999999] absolute flex items-center top-0 left-0 w-full p-4">
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-background"
                        >
                            <Icon icon="solar:arrow-right-linear"
                                color="black"
                                opacity={1}
                                width={20}
                                height={20}
                                strokeWidth={2}
                            />
                        </button>
                    </div>
                    <MapControl
                        userLocation={location}
                        drivers={nearestDrivers}
                    />

                    <BottomSheet
                        id={0}
                        activeId={activeId}
                        onClose={() => setActiveId(null)}
                    >
                        <FindView
                            planRide={() => setActiveId(1)}
                            onClose={onClose}
                            pickup={pickup}
                            dropoff={dropoff}
                        />
                    </BottomSheet>

                    {/* شاشة تحديد */}
                    <BottomSheet
                        id={1}
                        activeId={activeId}
                        onClose={() => setActiveId(null)}
                    >
                        <FindRide
                            onClose={onClose}
                            pickup={pickup}
                            setPickup={setPickup}
                            dropoff={dropoff}
                            setDropoff={setDropoff}
                        />
                    </BottomSheet>


                    {/* <div className="relative">
                        <div className="absolute top-0 left-0 w-full">
                            <div className="flex items-center justify-between p-4">
                                <button
                                    className="flex items-center justify-center  w-[38px] h-[38px] rounded-full"
                                >
                                    <Icon icon="solar:arrow-right-linear"
                                        color="black"
                                        opacity={1}
                                        width={20}
                                        height={20}
                                        strokeWidth={2}
                                    />
                                </button>

                            </div>
                        </div>
                    </div> */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}