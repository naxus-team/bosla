

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { t, setLang } from "../locales";
import React, { useState } from "react";
import { MapPin, Pencil, SlidersHorizontal, Banknote, X, MapPinPen, MapPinXInside, CircleQuestionMark, UsersRound, CircleAlert } from "lucide-react"; // مكتبة أيقونات خفيفة وجميلة


const containerStyle = {
  width: "100%",
  height: "calc(100vh - 331px)" // تعديل الارتفاع ليكون أقل من ارتفاع الشاشة
};

const center = {
  lat: 30.0444, // خط العرض (القاهرة كمثال)
  lng: 31.2357  // خط الطول
};

const services = [
  { id: 1, name: "سيارة", icon: "/images/car.png", seats: 4, price: 25, select: true },
  { id: 2, name: "دراجة نارية", icon: "/images/bike.png", seats: 1, price: 10 },
  { id: 3, name: "فان", icon: "/images/van.png", seats: 7, price: 50 },
  { id: 4, name: "تاكسي", icon: "/images/taxi.png", seats: 4, price: 30 },
  { id: 5, name: "ليموزين", icon: "/images/limousine.png", seats: 6, price: 100 },
  { id: 6, name: "حافلة صغيرة", icon: "/images/minibus.png", seats: 12, price: 80 },
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
        <div className="relative w-[393px] h-screen bg-background overflow-hidden">
          {/* Mobile Platform */}

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

          <div className="z-[99999999] absolute bottom-0 left-0 w-full bg-background dark:bg-background_dark rounded-tl-3xl rounded-tr-3xl shadow-[0_-8px_16px_rgba(0,0,0,0.2)] flex items-center justify-between p-4">
            <div className="relative flex flex-col items-center justify-center w-full space-y-3">

              <div className="relative inline-flex items-center justify-start space-x-3 rtl:space-x-reverse overflow-x-auto w-full">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`flex flex-col items-center h-[72px] min-w-[140px] p-3 rounded-2xl relative ${service.select ? "bg-secondary/20" : "bg-background dark:bg-background_dark"}  hover:shadow-[0_0_0_2px_inset_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer`}
                  >
                    {/* صورة الخدمة */}
                    <img src={service.icon} alt={service.name} className="w-[38px] h-[38px] object-contain" />

                    <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
                      {/* اسم الخدمة */}
                      <span className="text-[10px] text-background_dark/60 dark:text-background/60">{service.name}</span>
                      {/* عدد الركاب */}
                      <div className="flex items-center text-[10px] text-background_dark/60 dark:text-background/60 space-x-1 rtl:space-x-reverse"><UsersRound className="w-[12px] h-[12px] stroke-background_dark/60 dark:stroke-background/60 stroke-[2px] dark:text-background" /> <span>{service.seats}</span></div>
                    </div>

                    {/* زر المعلومات الصغير */}
                    <button className="absolute top-2 right-2 w-5 h-5 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                      <CircleAlert className="stroke-background stroke-[2px]" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full">
                <div className=" shadow-[0_0_0_2px_inset_rgba(26,26,26,.1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
                  <div className="relative flex items-center justify-between h-[52px] rounded-tl-2xl rounded-tr-2xl px-2 w-full overflow-hidden">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="flex items-center justify-center min-w-[38px]">
                        <svg width="24" height="12" viewBox="0 0 24 12">

                          <g>
                            <rect className="fill-transparent" width="24" height="12"
                            />
                            <circle className="fill-transparent stroke-[2px] stroke-background_dark/60 dark:stroke-background/60" cx="12" cy="6" r="5" />

                          </g>
                        </svg>
                      </div>
                      <span className="flex items-center text-sm  text-background_dark dark:text-background/60 font-normal">{t("common.from")}</span>
                      <div className="h-[16px] w-[2px] rounded-full bg-background_dark/10 dark:bg-background/10"></div>
                      <span className="flex items-center text-md text-secondary font-normal">الزاوية الحمراء &nbsp; <span className="font-semibold">(القاهرة)</span></span>
                    </div>
                    <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-secondary/20 rounded-full active:scale-95 active:bg-secondary/30">
                      <MapPinXInside className="w-[18px] h-[18px] stroke-secondary stroke-[2px] dark:text-background" />
                    </button>
                  </div>
                  <div className="relative flex items-center justify-between h-[52px] rounded-3xl w-full shadow-[0_0_0_2px_inset_rgba(26,26,26,.1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)] bg-background dark:bg-background_dark">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse px-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex items-center justify-center min-w-[38px]">
                          <svg width="18" height="18" viewBox="0 0 24 24">

                            <g>
                              <rect className="fill-transparent" width="24" height="24"
                              />

                              <path
                                className="stroke-[2.5px] stroke-background_dark dark:stroke-background fill-transparent"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.19,9.1c0,3.92-3.18,7.1-7.1,7.1S2,13.02,2,9.1S5.18,2,9.1,2S16.19,5.18,16.19,9.1z M14.11,14.11L22,22" />

                            </g>
                          </svg>
                        </div>
                        <span className="flex items-center text-sm  text-background_dark dark:text-background/60 font-normal">{t("common.to")}</span>
                        <div className="h-[16px] w-[2px] rounded-full bg-background_dark/10 dark:bg-background/10"></div>
                        <span className="flex items-center text-md font-semibold text-background_dark dark:text-background rounded-xl">مدينة السلام</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse h-[52px] px-2 rounded-full  shadow-[0_0_0_2px_inset_rgba(26,26,26,.1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)]">

                      <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-secondary rounded-full active:scale-95">
                        <MapPinPen className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between w-full h-[52px] shadow-[0_0_0_2px_inset_rgba(0,0,0,1)] dark:shadow-[0_0_0_2px_inset_rgba(247,242,221,1)] rounded-full w-full ">
                <div className="flex items-center space-x-2 rtl:space-x-reverse  px-3 ">
                  <span className="flex items-center justify-center text-background_dark dark:text-background font-bold text-base min-w-[38px]">
                    EGP
                  </span>
                  <span className="flex items-center text-sm text-background_dark dark:text-background/60 font-normal">{t("common.langs.show_fare")}</span>
                  <div className="h-[16px] w-[2px] rounded-full bg-background_dark/10 dark:bg-background/10"></div>
                  <span className="flex items-center text-md font-semibold px-3 h-[28px] bg-background_dark dark:bg-background text-background dark:text-background_dark rounded-xl">
                    <span>50</span>
                    &nbsp;
                    <span>EGP</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse h-[52px] px-2 rounded-full shadow-[0_0_0_2px_inset_rgba(0,0,0,1)] dark:shadow-[0_0_0_2px_inset_rgba(247,242,221,1)]">
                  <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-secondary rounded-full active:scale-95">
                    <Pencil className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
                  </button>
                  {/* <div className="h-[16px] w-[2px] rounded-full bg-background_dark"></div>
                  <button className="relative min-w-[38px] h-[38px] flex items-center justify-center">
                    <Banknote className="w-[18px] h-[18px] text-secondary dark:text-background" />
                  </button> */}
                </div>
              </div>

              <button className="w-full justify-center bg-secondary rounded-xl px-4 h-[58px] flex items-center">
                <span className="text-background font-bold text-base">{t("common.langs.find_driver")}</span>
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Dashboard
