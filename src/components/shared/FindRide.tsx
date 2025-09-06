import BottomSheet from "../BottomSheet";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";




type FindRideProps = {
    pickup: any;
    setPickup: (place: any) => void;
    dropoff: any;
    setDropoff: (place: any) => void;
    onClose: () => void;
};

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (x: number) => x * Math.PI / 180;

    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}


interface Place {
    name: string;
    details: string;
    lat: string;
    lon: string;
    distance?: number;
}

export default function FindRide({ pickup, setPickup, dropoff, setDropoff, onClose }: FindRideProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    return (
        <AnimatePresence>
            <motion.div className="z-[999999] absolute bottom-0 left-0 w-full bg-background dark:bg-background_dark">
                {}
                <div className="flex flex-col p-4 space-y-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ابحث عن مكان"
                        className="h-10 border rounded px-2"
                    />

                    {}
                    {results.map((place, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                if (!pickup) {
                                    setPickup(place);
                                } else {
                                    setDropoff(place);
                                    onClose(); 
                                }
                            }}
                            className="px-2 py-2 bg-black/10 rounded hover:bg-black/20 text-left"
                        >
                            <span className="font-bold">{place.name}</span>
                            <span className="text-sm text-gray-600">{place.details}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}