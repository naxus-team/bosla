

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// import Map from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

import { t, setLang } from "../locales";
import React, { useState } from "react";
import { MapPin, Pencil, SlidersHorizontal, Banknote, X, MapPinPen, MapPinXInside, CircleQuestionMark, UsersRound, CircleAlert, ArrowLeft, Radius } from "lucide-react"; // مكتبة أيقونات خفيفة وجميلة
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';


// Style Mobile
import { StatusBarMobile } from '../components/shared/StatusBarMobile';


// Components
import Navigation from "../components/Navigation";
import Tabs from "../components/Tabs";
import BottomSheet from "../components/BottomSheet";
import BottomNavBar from "../components/BottomNavBar";

const services = [
  { id: 1, name: "سيارة", icon: "/images/car.png", seats: 4, price: 25, select: true },
  { id: 2, name: "دراجة نارية", icon: "/images/bike.png", seats: 1, price: 10 },
  { id: 3, name: "فان", icon: "/images/van.png", seats: 7, price: 50 },
];

const mapOptions: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { visibility: "on" },
      { color: "#383838" } // لون الطرق داكن
    ]
  },
  {
    featureType: "landscape",
    stylers: [
      { visibility: "simplified" },
      { color: "#212121" } // لون الأرضية
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }] // لون المياه أسود
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }]
  }
];


function Application() {

  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>(mapOptions);
  const [open, setOpen] = useState(false);

  const [activeId, setActiveId] = useState<number | null>(null);


  const [openSheet, setOpenSheet] = useState(true);
  const [openTab, setOpenTab] = useState(true);

  const [showFare, setShowFare] = useState([]);


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[#2c2c2c] font-noto-arabic">
        <div className="relative w-[393px] h-[calc(100%-28px)]  dark:bg-background_dark rounded-2xl overflow-hidden">
          {/* Status Bar */}
          <StatusBarMobile />
          {/* Mobile Platform */}
          <div className="relative w-full h-[calc(100%-28px)] bg-background dark:bg-background_dark select-none overflow-hidden">



            <Navigation open={open} onClose={() => setOpen(false)} />
            {/* <BottomSheet id={1} activeId={activeId} onClose={() => setActiveId(null)} title="الأجرة" /> */}
            <Tabs id={1} activeTabId={activeId} onClose={() => setActiveId(null)} title="" />


            {/* Content Main */}
            <div className="flex items-center p-4">
              <p className="text-black text-3xl font-bold">Bosla</p>
            </div>

            <div className="flex items-center p-4 pt-0">
              <button onClick={() => setActiveId(1)} className="flex items-center w-full h-[48px] bg-black/10 rounded-full">
                <div className="px-4">
                  <Icon icon="solar:magnifer-linear"
                    color="black"
                    opacity={1}
                    width={20}
                    height={20}
                    strokeWidth={2}
                  />
                </div>
                <span className="text-base text-black/60 font-semibold">{t("where_to.placeholder")}</span>
              </button>
            </div>

            {/* End Content Main */}

            <motion.div
              initial={false}
              animate={!open ? "open" : "closed"}
              variants={{
                open: { opacity: 1, x: 0, pointerEvents: "auto" },
                closed: { opacity: 0, x: 50, pointerEvents: "none" },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative outline-none shadow-none">

            </motion.div >
            <BottomNavBar openTab={!open && openTab} onCloseTab={() => setOpenTab(false)} />

          </div >
        </div>
      </div >
    </>
  )
}

export default Application
