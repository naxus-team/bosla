"use client";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOMServer from "react-dom/server";
import * as Icon from 'react-feather';
import { t } from "../locales";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap, Polyline } from "react-leaflet";
import { Icon as LeafletIcon, LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { DivIcon } from "leaflet";
import { Marker } from "react-leaflet"; // مش من "leaflet"

const markerIcon = new LeafletIcon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MyMarkerIcon = ({ userImage }: { userImage: string }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="32"
        height="32"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        style={{ overflow: "visible", position: "absolute", left: "-10px" }}
        xmlSpace="preserve"
    >
        <g>
            <image
                enableBackground="new"
                style={{ overflow: "visible" }}
                width="100"
                height="100"
                xlinkHref="data:image/png;base64,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"
            />
            <g>
                <circle className="fill-black" cx="49.54" cy="45.31" r="34.57" />
            </g>
        </g>
        <circle className="fill-primary" cx="49.54" cy="45.31" r="25.93" />
    </svg>
);

const DriverMarkIcon = ({ carType = "" }: { carType: string }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="38 "
        height="52.197"
        viewBox="0 0 91 125"
        style={{ overflow: "visible" }}
        xmlSpace="preserve"
    >
        <style type="text/css">
            {`
          .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#EE0F38;}
          .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
          .st2{fill:#EE0F38;}
        `}
        </style>
        <defs></defs>
        <g>
            <image
                style={{ overflow: "visible" }}
                width="91"
                height="125"
                xlinkHref="data:image/png;base64,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"
            />
            <g>
                <g>
                    <path className="st0" d="M45.82,105.23c-5.98,0-11.61-1.47-15.86-4.14c-10.47-6.57-10.55-14.84-10.55-22.15 c-0.38-7.74-0.14-15.57,0.14-23.2c-0.82-0.09-1.55-0.27-2.23-0.55c-3.8-1.52-5.68-5.79-4.37-9.91l0.06-0.17 c0.85-2.44,2.4-4.31,4.73-5.7c0.73-0.44,1.47-0.78,2.21-1.06c-0.03-2.66-0.14-4.93-0.32-6.94c-0.61-6.66,1.37-12.7,5.73-17.48 c4.96-5.45,12.77-8.7,20.89-8.7c7.49,0,14.18,2.67,18.84,7.51c4.54,4.72,6.79,11.16,6.5,18.61c-0.09,2.19-0.12,4.46-0.1,6.99 c0.74,0.27,1.47,0.62,2.2,1.05c2.34,1.4,3.89,3.26,4.74,5.71l0.06,0.17c1.31,4.13-0.57,8.39-4.39,9.92 c-0.71,0.29-1.43,0.44-2.08,0.53c0.25,7.4,0.38,15.06-0.24,23.29v0.83c0.02,6.38,0.04,12.41-7.4,19.11 C59.95,102.94,53.19,105.23,45.82,105.23z" />
                    <path className="st1" d="M26.49,30.77c0.37,4.06,0.42,8.6,0.32,13.42c-2.32,0.01-4.06,0.24-5.55,1.13c-0.83,0.5-1.41,1.06-1.75,2.05 c-0.23,0.72-0.06,1.25,0.39,1.43c0.76,0.31,3.81-0.05,4.78-0.26c0.42-0.09,0.76-0.22,0.92-0.39c0.09-0.11,0.17-0.24,0.23-0.39 c0.25-0.66,0.04-1.42,0.54-2.03c0.12-0.15,0.26-0.23,0.42-0.27c-0.25,10.47-1.05,22.2-0.48,33.31c0,7.31,0.17,12,7.32,16.49 c6.98,4.38,19.85,4.25,26.13-1.42c5.46-4.92,5.11-8.54,5.11-15.07c0.92-11.84,0.2-22.65-0.13-33.28 c0.12,0.05,0.22,0.12,0.32,0.24c0.5,0.61,0.29,1.37,0.54,2.03c0.06,0.15,0.13,0.28,0.23,0.39c0.15,0.18,0.5,0.3,0.92,0.39 c0.97,0.21,4.02,0.57,4.78,0.26c0.45-0.18,0.62-0.7,0.39-1.43c-0.34-0.99-0.92-1.55-1.75-2.05c-1.46-0.87-3.19-1.11-5.46-1.13 c-0.13-4.38-0.17-8.72,0-13.11C65.75,3.96,24.38,7.81,26.49,30.77z M38.21,15.48c-4.78,1.79-8.28,4.82-9.69,9.68 C32.07,22.5,36.46,18.47,38.21,15.48z M53.22,14.77c4.78,1.79,8.28,4.82,9.69,9.68C59.37,21.79,54.98,17.77,53.22,14.77 L53.22,14.77z" />
                </g>
            </g>
        </g>
    </svg>
);


// <!-- Generator: Adobe Illustrator 24.3.0, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
// 	 width="195.01px" height="62px" viewBox="0 0 195.01 62" style="overflow:visible;enable-background:new 0 0 195.01 62;"
// 	 xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#EE0F38;}
// 	.st1{fill:#FFFFFF;}
// </style>
// <defs>
// </defs>
// <g>
// 	<circle cx="169.01" cy="31" r="26"/>
// </g>
// <g>
// 	<path class="st0" d="M21,62C9.42,62,0,52.58,0,41V13C0,5.83,5.83,0,13,0h16c7.17,0,13,5.83,13,13v28C42,52.58,32.58,62,21,62z"/>
// 	<path class="st1" d="M21,57L21,57c-8.84,0-16-7.16-16-16V13c0-4.42,3.58-8,8-8h16c4.42,0,8,3.58,8,8v28C37,49.84,29.84,57,21,57z"
// 		/>
// 	<path class="st0" d="M25.31,28.66l2.62-2.62c2.28-2.28,2.28-5.98,0-8.25l-0.46-0.46c-2.28-2.28-5.98-2.28-8.25,0l-0.23,0.23
// 		l-0.23,0.23l-4.69,4.69c-2.28,2.28-2.28,5.98,0,8.25l2.62,2.62l-2.62,2.62c-1.1,1.1-1.71,2.57-1.71,4.13s0.61,3.02,1.71,4.13
// 		l0.46,0.46c1.14,1.14,2.63,1.71,4.13,1.71c1.49,0,2.99-0.57,4.13-1.71l0.46-0.46l4.69-4.69c2.28-2.28,2.28-5.98,0-8.25L25.31,28.66
// 		z M21.18,19.28c0.6-0.6,1.38-0.89,2.16-0.89s1.57,0.3,2.16,0.89l0.46,0.46c1.19,1.19,1.19,3.13,0,4.32l-2.62,2.62l-2.62-2.62
// 		c-1.19-1.19-1.19-3.13,0-4.32l0.23-0.23L21.18,19.28z M20.82,42.72c-1.19,1.19-3.13,1.19-4.32,0l-0.46-0.46
// 		c-0.58-0.58-0.9-1.35-0.9-2.16s0.32-1.58,0.9-2.16l2.62-2.62l2.62,2.62c1.19,1.19,1.19,3.13,0,4.32L20.82,42.72z M25.97,37.57
// 		l-1.19,1.19c-0.24-1.02-0.74-1.99-1.53-2.79l-4.59-4.59l0,0l-2.62-2.62c-1.19-1.19-1.19-3.13,0-4.32l1.19-1.19
// 		c0.24,1.02,0.74,1.99,1.53,2.79l3.61,3.61l0.98,0.98l2.62,2.62C27.16,34.44,27.16,36.38,25.97,37.57z"/>
// </g>
// </svg>


const myLocation = new DivIcon({
    className: "",
    html: ReactDOMServer.renderToString(
        <MyMarkerIcon userImage="https://media-mrs2-2.cdn.whatsapp.net/v/t61.24694-24/473396295_1367041767881987_5606158682805368243_n.jpg?ccb=11-4&oh=01_Q5Aa2QFXOjpcTGynPcsZtNBxZ_rhLAl1QQlsiBftaUsQFNCPoQ&oe=68C31960&_nc_sid=5e03e0&_nc_cat=104" />
    )
});

const driveLocation = new DivIcon({
    className: "",
    html: ReactDOMServer.renderToString(
        <DriverMarkIcon carType="48" />
    )
});

interface MyLocation {
    lat: number;
    lon: number;
}

interface Driver {
    id: number;
    name: string;
    lat: number;
    lng: number;
    distance?: number;
}

interface MapControlProps {
    children?: React.ReactNode;
    userLocation?: MyLocation | null;
    drivers?: Driver[]; // ← قائمة السائقين
}

function MapUpdater({ location }: { location?: MyLocation | null }) {
    const map = useMap();
    const egyptBounds = {
        south: 22.0,
        west: 25.0,
        north: 31.7,
        east: 35.9
    };

    useEffect(() => {
        if (location) {
            let lat = location.lat;
            let lon = location.lon;

            // التأكد من الحدود
            if (lat < egyptBounds.south) lat = egyptBounds.south;
            if (lat > egyptBounds.north) lat = egyptBounds.north;
            if (lon < egyptBounds.west) lon = egyptBounds.west;
            if (lon > egyptBounds.east) lon = egyptBounds.east;

            map.setView([lat, lon], 13);
        }
    }, [location, map]);

    return null;
}

type LatLng = { lat: number; lng: number };
type RouteResult = {
    coords: [number, number][];
    distance: number; // meters
    duration: number; // seconds
};

const fetchRoute = async (
    profile: "driving" | "foot",
    start: LatLng,
    end: LatLng
): Promise<RouteResult | null> => {
    const url = `https://router.project-osrm.org/route/v1/${profile}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const route = data?.routes?.[0];
    if (!route) return null;

    // OSRM بيطلع [lng, lat]، فبنقلبهم لـ [lat, lng] عشان Leaflet
    const coords: [number, number][] = route.geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
    );

    return {
        coords,
        distance: route.distance, // meters
        duration: route.duration, // seconds
    };
};

const formatDuration = (seconds?: number) => {
    if (!seconds && seconds !== 0) return "-";
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} دقيقة`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h} س ${m} د`;
};

type TravelInfo = {
    egp: number;
    usd: number;
};

function calculateTravel(distanceKm: number, usdToEgp: number = 50): TravelInfo {
    const ratePerKmEgp = 10; // سعر الكيلو بالجنيه
    const egp = distanceKm * ratePerKmEgp;
    const usd = egp / usdToEgp;
    return { egp, usd };
}
export default function MapControl({ children, userLocation, drivers }: MapControlProps) {
    const defaultPosition: LatLngExpression = [30.0444, 31.2357];
    const [activeDriver, setActiveDriver] = useState<Driver | null>(null);

    const egyptBounds: [LatLngTuple, LatLngTuple] = [
        [22.0, 25.0],
        [31.7, 35.9],
    ];

    const position: LatLngExpression = userLocation
        ? [userLocation.lat, userLocation.lon]
        : defaultPosition;

    // مسار و أزمنة الوصول
    const [route, setRoute] = useState<[number, number][]>([]);
    const [eta, setEta] = useState<{ driving?: number; walking?: number }>({});
    const [loadingRoute, setLoadingRoute] = useState(false);

    useEffect(() => {
        // لما أختار سواق ومعايا مكان العميل
        if (!activeDriver || !userLocation) return;

        const start: LatLng = { lat: activeDriver.lat, lng: activeDriver.lng }; // السواق
        const end: LatLng = { lat: userLocation.lat, lng: userLocation.lon };  // العميل

        let isCancelled = false;
        (async () => {
            setLoadingRoute(true);
            try {
                // قيادة
                const driving = await fetchRoute("driving", start, end);
                // مشي
                const walking = await fetchRoute("foot", start, end);

                if (!isCancelled) {
                    // نرسم مسار القيادة كافتراضي (أدق وأسرع غالبًا)
                    setRoute(driving?.coords ?? []);
                    setEta({
                        driving: driving?.duration,
                        walking: walking?.duration,
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                !isCancelled && setLoadingRoute(false);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, [activeDriver, userLocation]);
    const polyRef = useRef<any>(null);

    useEffect(() => {
        let offset = 0;
        const interval = setInterval(() => {
            if (polyRef.current) {
                polyRef.current.setStyle({
                    dashOffset: offset,
                });
                offset -= 0.5; // حركة خفيفة وسلسة
            }
        }, 30); // تحديث كل 30ms
        return () => clearInterval(interval);
    }, []);


    return (
        <MapContainer
            center={position}
            zoom={13}
            className="w-full h-full"
            maxBounds={egyptBounds}
            maxBoundsViscosity={1.0}
            minZoom={6}
            maxZoom={14}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* العميل */}
            <Marker position={position} icon={myLocation} />

            {/* السائقين */}
            {drivers?.map((driver) => (
                <Marker
                    key={driver.id}
                    position={[driver.lat, driver.lng]}
                    icon={driveLocation}
                    eventHandlers={{ click: () => setActiveDriver(driver) }}
                />
            ))}

            {/* مسار القيادة (أو أي مسار تاني تحب تعرضه) */}
            {route.length > 0 && (
                <Polyline
                    ref={polyRef}

                    positions={route}
                    // خط متصل وأدق (بدون dashArray)
                    weight={4}
                    // لو بتستخدم react-leaflet v4: استخدم prop "pathOptions" عشان اللون
                    // pathOptions={{ color: "#1D4ED8" }}
                    // لو v3: ممكن تفضل color
                    color="black"
                          dashArray="10, 10" // طول الفاصل وطول الفراغ

                    opacity={0.5}
                />
            )}

            {/* الشيت السفلي عند اختيار سواق + عرض ETA */}
            {activeDriver && (
                <div className="flex items-center justify-between font-noto-arabic bottom-sheet absolute bottom-8 left-4 right-4 shadow-lg p-3 px-4 rounded-xl bg-background_dark/95 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <img
                            className="w-[48px] h-[48px] rounded-full"
                            src="https://media-mrs2-2.cdn.whatsapp.net/v/t61.24694-24/473396295_1367041767881987_5606158682805368243_n.jpg?ccb=11-4&oh=01_Q5Aa2QFTRSmC8ZPdnEWv6VIxmSeE7i3yWG2AygZi0joxnGq7dg&oe=68C3C220&_nc_sid=5e03e0&_nc_cat=104"
                        />
                        <div>
                            <span className="text-base text-background font-normal">{activeDriver.name}</span>
                            {typeof activeDriver.distance === "number" && (
                                <p className="text-sm text-background/70">{activeDriver.distance.toFixed(2)} كم</p>
                            )}
                            <div className="mt-1 text-xs text-background/80">
                                {loadingRoute && typeof activeDriver.distance === "number" ? (
                                    <span>جاري احتساب الوقت…</span>
                                ) : (
                                    <>
                                        <div>🚗 بالسيارة: {formatDuration(eta.driving)}</div>
                                        <div>🚶‍♂️ مشيًا: {formatDuration(eta.walking)}</div>

                                        <div>
                                            🚶‍♂️ متوسط السعر: {calculateTravel(Number(activeDriver.distance!.toFixed(2))).egp.toFixed(2)} ج.م
                                            ({calculateTravel(Number(activeDriver.distance!.toFixed(2))).usd.toFixed(2)} $)
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <button className="flex items-center px-4 h-[38px] rounded-md bg-primary">
                        <span className="text-base text-background font-normal">طلب السائق</span>
                    </button>
                </div>
            )}

            <MapUpdater location={userLocation} />
        </MapContainer>
    );
}