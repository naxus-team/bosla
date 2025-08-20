

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// import Map from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

import { t, setLang } from "../locales";
import React, { useState } from "react";
import { MapPin, Pencil, SlidersHorizontal, Banknote, X, MapPinPen, MapPinXInside, CircleQuestionMark, UsersRound, CircleAlert, ArrowLeft } from "lucide-react"; // مكتبة أيقونات خفيفة وجميلة
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from 'react-feather';


// Components
import Navigation from "../components/Navigation";
import BottomSheet from "../components/BottomSheet";



const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 30.0444, // خط العرض (القاهرة كمثال)
  lng: 31.2357  // خط الطول
};

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

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);


  const [openControl, setOpenControl] = useState(true);

  const [showFare, setShowFare] = useState([]);



  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[rgba(193,196,197,1)] font-noto-arabic">
        <div className="relative w-[393px] h-screen bg-background_dark overflow-hidden shadow-xl select-none">
          {/* Mobile Platform */}

          <Navigation open={open} onClose={() => setOpen(false)} />
          <BottomSheet open={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)} />


          <motion.div
            initial={false}
            animate={!open ? "open" : "closed"}
            variants={{
              open: { opacity: 1, x: 0, pointerEvents: "auto" },
              closed: { opacity: 0, x: 50, pointerEvents: "none" },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative outline-none shadow-none">

            <motion.div
              initial={false}
              animate={true ? "open" : "closed"}
              variants={{
                open: { y: 0, pointerEvents: "auto" },
                closed: { y: "-100%", pointerEvents: "none" },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="z-[9999] absolute top-0 left-0 w-full bg-background dark:bg-background_dark rounded-bl-3xl rounded-br-3xl shadow-[0_8px_16px_rgba(26,26,26,.2)] flex items-center justify-between p-4">
              <div className="relative flex flex-col items-center justify-center w-full space-y-3">
                <div className="relative inline-flex items-center justify-between w-full px-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <svg width="32px" height="26.78px" viewBox="0 0 48 26.78" className="fill-background dark:fill-background">
                      <path d="M45.37,10.72l-0.73-0.73l-7.37-7.37c-3.5-3.5-9.21-3.5-12.71,0l-4.25,4.25l-4.25-4.25
    c-3.51-3.5-9.21-3.5-12.71,0L2.63,3.35l0,0c-3.5,3.5-3.5,9.21,0,12.71l0.72,0.72c0,0,0,0,0,0l7.37,7.37
    c1.75,1.75,4.05,2.63,6.36,2.63c2.3,0,4.6-0.88,6.36-2.63l4.25-4.25l4.25,4.25c1.75,1.75,4.05,2.63,6.36,2.63s4.6-0.88,6.36-2.63
    l0.73-0.72l0,0C48.88,19.93,48.88,14.22,45.37,10.72z"/>
                      <path className="fill-background_dark" d="M5.46,6.18l0.73-0.72c1.94-1.94,5.11-1.94,7.05,0l4.25,4.25l-4.25,4.25c-1.94,1.94-5.11,1.95-7.05,0l-0.72-0.72
    C3.51,11.29,3.51,8.13,5.46,6.18z"/>
                      <path className="fill-background_dark" d="M20.6,21.33c-1.94,1.94-5.11,1.94-7.05,0l-2.08-2.08c1.69-0.33,3.3-1.15,4.6-2.45l7.08-7.08l0,0l4.25-4.25
    c1.94-1.94,5.11-1.94,7.05,0l2.08,2.08c-1.69,0.33-3.3,1.15-4.6,2.45l-7.08,7.08l0,0L20.6,21.33z"/>
                      <path className="fill-background_dark" d="M42.54,20.6l-0.73,0.72c-1.95,1.94-5.11,1.94-7.05,0l-4.25-4.25l4.25-4.25c1.95-1.94,5.11-1.94,7.05,0
    l0.73,0.73C44.49,15.49,44.49,18.66,42.54,20.6z"/>
                    </svg>
                  </div>
                  <div className="flex items-center px-12 h-[32px] bg-[rgba(255,255,255,.04)] rounded-full space-x-2 rtl:space-x-reverse dark:shadow-[0_0_0_1px_rgba(59,59,60,1)]">
                    <Icon.Search className="w-[18px] h-[18px] dark:stroke-background dark:stroke-background/60 stroke-[2px] dark:text-background" />
                    <span className="text-sm text-background/60 font-normal">
                      {t("common.search")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => setOpen(!open)} className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full cursor-default active:scale-95 transition duration-100 ease-in-out">
                      {/* <Icon.HelpCircle className="w-[24px] h-[24px] stroke-background_dark/70 dark:stroke-background/70 stroke-[2px] dark:text-background" /> */}
                      <div className="relative w-[38px] h-[38px] rounded-full overflow-hidden">
                        <img src="./mo.jpg" />
                      </div>
                    </button>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={openControl ? "open" : "closed"}
                  variants={{
                    open: { height: "116px", pointerEvents: "auto" },
                    closed: { height: 0, paddingTop: 0, paddingBottom: 0, margin: 0, pointerEvents: "none" },
                  }}
                  className="relative flex items-center justify-center w-full overflow-hidden">
                  <div className="absolute inset-0 top-0 left-0 w-full p-1">

                    <div className="w-full shadow-[0_0_0_2px_inset_rgba(224,224,224,1)] dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
                      <div className="relative flex items-center justify-between h-[52px] rounded-tl-2xl rounded-tr-2xl px-2 w-full overflow-hidden">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center min-w-[32px]">
                              <Icon.Target className="w-[18px] h-[18px] stroke-background_dark/60 dark:stroke-background/60 stroke-[2px] dark:text-background/60" />

                            </div>
                            <div className="h-[16px] w-[2px] rounded-full bg-gray dark:bg-[rgba(77,77,77,1)]"></div>
                          </div>
                          <span className="flex items-center text-md text-background_dark/60 dark:text-background/60 font-normal">الزاوية الحمراء &nbsp; <span className="text-background">(القاهرة)</span></span>
                        </div>
                        <div className="flex items-center px-1 space-x-2 rtl:space-x-reverse">
                          <button className="relative min-w-[32px] h-[32px] flex items-center justify-center dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active:scale-95 transition all duration-100 active:duration-0 rounded-full active:scale-95 active:bg-background transition duration-100 ease-in-out ">
                            <Icon.Navigation className="w-[16px] h-[16px] stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                          </button>
                          <button className="relative min-w-[32px] h-[32px] flex items-center justify-center dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active:scale-95 transition all duration-100 active:duration-0 rounded-full active:scale-95 active:bg-background transition duration-100 ease-in-out cursor-default">
                            <Icon.Repeat className="w-[16px] h-[16px] stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                          </button>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-between h-[52px] rounded-full w-full shadow-[0_0_0_1px_rgba(59,59,60,1)] dark:shadow-[0_0_0_1px_rgba(59,59,60,1)]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse px-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center min-w-[32px]">
                                {/* <svg width="18" height="18" viewBox="0 0 24 24">

                            <g>
                              <rect className="fill-transparent" width="24" height="24"
                              />

                              <path
                                className="stroke-[2.5px] stroke-background_dark dark:stroke-background fill-transparent"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.19,9.1c0,3.92-3.18,7.1-7.1,7.1S2,13.02,2,9.1S5.18,2,9.1,2S16.19,5.18,16.19,9.1z M14.11,14.11L22,22" />

                            </g>
                          </svg> */}
                                <Icon.CornerLeftDown className="w-[18px] h-[18px] stroke-background_dark dark:stroke-background stroke-[2px] dark:text-background" />
                              </div>
                              <div className="h-[16px] w-[2px] rounded-full bg-[rgba(193,196,197,1)] dark:bg-[rgba(77,77,77,1)]"></div>
                            </div>
                            <span className="flex items-center text-md font-normal text-background_dark dark:text-background rounded-xl">مدينة السلام &nbsp; <span className="text-background/60">(القاهرة)</span></span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse h-[52px] px-2 rounded-full ">

                          <button className="relative min-w-[76px] h-[38px] flex items-center justify-center bg-primary rounded-full active:scale-95 transition duration-100 ease-in-out hover:bg-primary/80">
                            <Icon.MapPin strokeLinecap="round" className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

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


            <motion.div
              initial={false}
              animate={openControl && !bottomSheetOpen ? "open" : "closed"}
              variants={{
                open: { y: 0, pointerEvents: "auto" },
                closed: { bottom: "0" },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute  bottom-[204px] left-0 flex flex-col items-center justify-center p-3 space-y-3">
              <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-primary rounded-full active:scale-95 shadow-md transition duration-100 ease-in-out">
                <Icon.Navigation2 className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
              </button>
              <button onClick={() => setOpenControl(!openControl)} className="relative min-w-[52px] h-[52px] flex items-center justify-center bg-primary rounded-full active:scale-95 shadow-md transition duration-100 ease-in-out">
                <Icon.Map className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
              </button>
            </motion.div>


            <motion.div
              initial={false}
              animate={openControl && !bottomSheetOpen ? "open" : "closed"}
              variants={{
                open: { y: 0, pointerEvents: "auto" },
                closed: { y: "100%", pointerEvents: "none" },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="z-[9999] absolute bottom-0 left-0 w-full bg-background dark:bg-background_dark rounded-tl-3xl rounded-tr-3xl shadow-[0_-8px_16px_rgba(26,26,26,.2)] flex items-center justify-between p-4">
              <div className="relative flex flex-col items-center justify-center w-full space-y-3">

                <div className="relative flex items-center justify-between w-full">
                  <div>
                    <div
                      key={services[0].id}
                      className={`flex items-center h-[38px] p-2 rtl:pr-3 rounded-full relative dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                    >
                      {/* صورة الخدمة */}
                      <Icon.Truck className="w-[18px  ] h-[18px] stroke-background dark:stroke-background stroke-[2px] dark:text-background/70" />


                      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
                        {/* اسم الخدمة */}
                        <span className="text-sm font-semibold text-background_dark dark:text-background">{services[0].name}</span>
                        {/* عدد الركاب */}
                        <div className="flex items-center justify-center text-sm bg-background text-background_dark rounded-xl w-[42px] h-[24px] px-2"><Icon.User className="min-w-[16px] h-[16px] stroke-background_dark dark:text-background_dark stroke-[2px]" /><span>{services[0].seats}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div>
                      <div

                        className={`flex items-center justify-center h-[38px] w-[64px] rounded-full relative dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                      >
                        {/* صورة الخدمة */}
                        <Icon.CreditCard className="w-[18px] h-[18px] stroke-background dark:stroke-background stroke-[2px] dark:text-background/70" />
                      </div>
                    </div>
                    <div>
                      <div

                        className={`flex items-center justify-center h-[38px] w-[64px] rounded-full relative dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                      >
                        {/* صورة الخدمة */}
                        <Icon.Sliders className="w-[18px] h-[18px] stroke-background dark:stroke-background stroke-[2px] dark:text-background/70" />
                      </div>
                    </div>

                    <div>
                      <div

                        className={`flex items-center justify-center h-[38px] w-[64px] rounded-full relative shadow-[0_0_0_2px_rgba(193,196,197,1)] dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                      >
                        {/* صورة الخدمة */}
                        <Icon.Clock className="w-[18px] h-[18px] stroke-background dark:stroke-background  stroke-[2px] dark:text-background/70" />
                      </div>
                    </div>
                  </div>
                </div>

                <div onClick={() => setBottomSheetOpen(!bottomSheetOpen)} className="relative flex items-center justify-center w-full h-[52px] dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(238,15,56,1)] active: rounded-full w-full active:scale-[.98] transition duration-100 ease-in-out">
                  <div className="flex items-center h-[52px] px-2 rounded-full">
                    <button className="relative h-[38px] flex items-center rounded-full space-x-3 rtl:space-x-reverse">
                      <div className="flex items-center">
                        {!showFare ? (
                          <span className="flex items-center text-lg font-semibold h-[28px] text-background_dark dark:text-background rounded-3xl">
                            <span>50</span>
                            &nbsp;
                            <span>جنيه</span>
                          </span>
                        ) : (
                          <span className="flex items-center text-base font-normal h-[28px] text-background_dark/60 dark:text-background/60 rounded-3xl">
                            {t("common.langs.show_fare")}
                          </span>
                        )}
                      </div>
                      <Icon.Edit3 className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
                    </button>
                    {/* <div className="h-[16px] w-[2px] rounded-full bg-background_dark"></div>
                  <button className="relative min-w-[38px] h-[38px] flex items-center justify-center">
                    <Banknote className="w-[18px] h-[18px] text-primary dark:text-background" />
                  </button> */}
                  </div>
                </div>

                <button className="w-full justify-center bg-primary rounded-2xl px-4 h-[58px] flex items-center space-x-2 rtl:space-x-reverse active:scale-95 transition duration-100  active:duration-0 ease-in-out active:bg-primary/80">
                  <span className="text-background font-bold text-base">{t("common.langs.find_driver")}</span>
                  <ArrowLeft className="w-[24px] h-[24px] stroke-background stroke-[2.5px] dark:text-background_dark" />

                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div >
    </>
  )
}

export default Application
