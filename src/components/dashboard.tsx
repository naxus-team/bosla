

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { t, setLang } from "../locales";
import React, { useState } from "react";
import { MapPin, Pencil, Sliders, CreditCard } from "lucide-react"; // مكتبة أيقونات خفيفة وجميلة


const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 30.0444, // خط العرض (القاهرة كمثال)
  lng: 31.2357  // خط الطول
};

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
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "landscape",
    stylers: [{ visibility: "simplified" }]
  }
];

function Dashboard() {

  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>(mapOptions);


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[rgba(247,242,221,1)] font-cairo">
        <div className="relative w-[393px] h-screen bg-white">

          {/* Mobile Platform */}
          <div className="z-[99999999] absolute bottom-0 left-0 w-full bg-white rounded-tl-3xl rounded-tr-3xl shadow-md flex items-center justify-between p-4">
            <div className="relative flex flex-col items-center justify-center w-full space-y-3">
              <div className="w-full">
                <div className="shadow-[0_0_0_1px_rgba(0,0,0,.05)] bg-white rounded-xl">
                  <div className="relative flex items-center space-x-2 rtl:space-x-reverse h-[38px] rounded-tl-2xl rounded-tr-2xl px-4 w-full overflow-hidden">
                    <span className="flex items-center text-xs text-primary dark:text-white/50 font-normal">الزاوية الحمراء (القاهرة)</span>
                  </div>
                  <div className="w-full h-[1px] bg-[rgba(0,0,0,.05)]"></div>
                  <div className="relative flex items-center justify-between h-[48px] px-4 rounded-bl-2xl rounded-br-2xl w-full">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <svg width="18" height="18" viewBox="0 0 24 24">

                        <g>
                          <rect className="fill-transparent" width="24" height="24"
                          />

                          <path
                            className="stroke-[2.5px] stroke-black dark:stroke-white fill-transparent"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.19,9.1c0,3.92-3.18,7.1-7.1,7.1S2,13.02,2,9.1S5.18,2,9.1,2S16.19,5.18,16.19,9.1z M14.11,14.11L22,22" />

                        </g>
                      </svg>
                      <span className="flex items-center text-sm  text-black/50 dark:text-white/50 font-normal">{t("common.to")}</span>
                      <span className="flex items-center text-sm font-semibold text-primary-dark dark:text-white rounded-xl">مدينة السلام</span>
                    </div>
                    <button className="relative">
                      <Sliders className="w-4 h-4 text-black dark:text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between w-full h-[52px] px-4 bg-[rgba(0,0,0,.05)] rounded-xl w-full ">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-black dark:text-white font-bold text-base">£E</span>
                  <span className="flex items-center text-sm text-black/50 dark:text-white/50 font-normal">{t("common.langs.show_fare")}</span>
                  <span className="flex items-center text-sm font-semibold px-3 h-[28px] bg-primary/20 dark:bg-white/10 text-primary dark:text-white rounded-xl">50 £E</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button className="relative min-w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white shadow-md">
                    <Pencil className="w-4 h-4 text-black dark:text-white" />
                  </button>
                  <div className="h-[16px] w-[2px] rounded-full bg-black/10"></div>
                  <button className="relative min-w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white shadow-md">
                    <CreditCard className="w-4 h-4 text-black dark:text-white" />
                  </button>
                </div>
              </div>

              <button className="w-full justify-center bg-black rounded-full px-4 h-[52px]  flex items-center">
                <span className="text-white font-semibold text-base">{t("common.langs.find_driver")}</span>
              </button>
            </div>
          </div>

          <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
              options={{
                styles: mapStyle,
                disableDefaultUI: true,
                zoomControl: false,
                streetViewControl: false
              }}

            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>

        </div>
      </div>
    </>
  )
}

export default Dashboard
