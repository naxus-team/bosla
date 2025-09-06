import BottomSheet from "../../components/BottomSheet";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



type FindViewProps = {
    pickup: any;
    dropoff: any;
    planRide: () => void;
    onClose: () => void;
};


function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (x: number) => x * Math.PI / 180;

    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // المسافة بالكيلومتر
}


interface Place {
    name: string;
    details: string;
    lat: string;
    lon: string;
    distance?: number;
}

export default function FindView({ pickup, dropoff, planRide, onClose }: FindViewProps) {

    const [query, setQuery] = useState(""); // نخزن النص اللي المستخدم بيكتبه
    const [results, setResults] = useState<any[]>([]); // نخزن نتائج البحث
    const [selectedPlace, setSelectedPlace] = useState<null | {
        name: string;
        details: string;
        lat: string;
        lon: string;
    }>(null);
    const [showSearch, setShowSearch] = useState<boolean>(true);

    const lat = 30.0444; // Latitude للقاهرة
    const lon = 31.2357; // Longitude للقاهرة

    async function searchPlace(q: string) {
        if (!q) {
            setResults([]);
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&accept-language=ar&countrycodes=EG&limit=50&q=${encodeURIComponent(q)}&lat=${lat}&lon=${lon}`
            );

            if (!res.ok) {
                throw new Error("مشكلة في الاتصال بالخدمة");
            }

            const data = await res.json();

            const formattedResults = data.map((item: any) => {
                // display_name غالبًا بيكون "الاسم, التفاصيل, الدولة"
                const parts = item.display_name.split(",");
                return {
                    name: parts[0].trim(), // الاسم الأول
                    details: parts.slice(1).join(",").trim(), // باقي التفاصيل
                    lat: item.lat,
                    lon: item.lon
                };
            });
            const nearestResults = formattedResults
                .map((item: any) => ({
                    ...item,
                    distance: haversineDistance(lat, lon, parseFloat(item.lat), parseFloat(item.lon))
                }))
                .sort((a: Place, b: Place) => (a.distance! - b.distance!));

            setResults(nearestResults);
            console.log(data);
        } catch (err) {
            console.error("خطأ في البحث:", err);
            setResults([]); // تفضي النتائج بدل ما يحصل crash
            // ممكن كمان تعمل state لرسالة تنبيه حلوة:
            // setErrorMessage("حصلت مشكلة في البحث، جرّب تاني ✨");
        }
    }


    return (
        <AnimatePresence>
            <motion.div className="z-[9999] absolute bottom-0 left-0 w-full bg-white dark:bg-black p-4">
                <div className="flex flex-col space-y-2 px-2 pt-2">
                    <div className="flex items-center">

                    </div>
                    <div className="flex w-full shadow-[0_0_0_2.5px_inset_rgba(0,0,0,1)] rounded-xl">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-center w-8 h-full">
                                <Icon icon="solar:map-point-linear"
                                    color="black"
                                    opacity={1}
                                    width={18}
                                    height={18}
                                    strokeWidth={2}
                                />
                            </div>
                            <div className="flex items-center justify-center w-8 h-full">
                                <Icon icon="solar:map-point-add-linear"
                                    color="black"
                                    opacity={1}
                                    width={18}
                                    height={18}
                                    strokeWidth={2}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full p-2">
                            <input placeholder={`نقطة الألتقات`} value={`الزاوية الحمراء`} className="h-8" />
                            <div className="w-full h-[1px] bg-black/10 my-2"></div>
                            <input
                                value={query || ''}
                                onChange={(e) => {
                                    setQuery(e.target.value); // تحديث النص
                                    searchPlace(e.target.value); // بحث كل ما المستخدم يكتب
                                }}
                                className="h-8"
                                placeholder="نقطة الوصول"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col p-4 space-y-2 overflow-auto">
                        {results.map((place, i) => (
                            <button
                                key={i}
                                className="px-2 py-2 h-auto bg-black/10 flex flex-col text-left hover:bg-black/20"
                                onClick={() => {
                                    // 1️⃣ حفظ بيانات المكان
                                    setSelectedPlace({
                                        name: place.name,
                                        details: place.details,
                                        lat: place.lat,
                                        lon: place.lon,
                                    });

                                    // 2️⃣ اخفاء نافذة البحث

                                    planRide();

                                    // 3️⃣ لاحقًا، تقدر تستخدم selectedPlace لتطبيقه على الخريطة
                                }}
                            >
                                <span className="font-bold">{place.name}</span>
                                <span className="text-sm text-gray-600">{place.details}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
