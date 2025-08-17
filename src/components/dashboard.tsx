

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// import Map from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

import { t, setLang } from "../locales";
import React, { useState } from "react";
import { MapPin, Pencil, SlidersHorizontal, Banknote, X, MapPinPen, MapPinXInside, CircleQuestionMark, UsersRound, CircleAlert, ArrowLeft } from "lucide-react"; // مكتبة أيقونات خفيفة وجميلة
import * as Icon from 'react-feather';


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

function Dashboard() {

  const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>(mapOptions);


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[rgba(193,196,197,1)] font-cairo">
        <div className="relative w-[393px] h-screen bg-background overflow-hidden shadow-xl select-none">
          {/* Mobile Platform */}

          <div className="z-[99999999] absolute top-0 left-0 w-full bg-background dark:bg-background_dark rounded-bl-3xl rounded-br-3xl shadow-[0_8px_16px_rgba(26,26,26,.2)] flex items-center justify-between p-4">
            <div className="relative flex flex-col items-center justify-center w-full space-y-3">
              <div className="relative inline-flex items-center justify-between w-full px-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                    <Icon.Menu className="w-[24px] h-[24px] stroke-background_dark/70 dark:stroke-background/70 stroke-[2px] dark:text-background" />
                  </button>
                  {/* <div className="flex items-center">
                    <svg width="32px" height="32px" viewBox="0 0 32 32" className="fill-primary dark:fill-background">

                      <path className="fill-secondary" d="M11.1,11.08V0.76v0C6.2,2.34,2.34,6.2,0.78,11.08c0,0,0,0,0,0H11.1z" />
                      <path d="M14.1,17.3v-3.22h3.2c0.42,0,0.82,0.08,1.22,0.24c1.2,0.5,1.98,1.66,1.98,2.98c0,1.76-1.44,3.2-3.2,3.2
	C15.54,20.5,14.1,19.06,14.1,17.3z M16,0c-0.64,0-1.28,0.04-1.9,0.12v0v10.96h3.2c0.82,0,1.6,0.16,2.36,0.48
	c2.32,0.96,3.84,3.2,3.84,5.74c0,3.42-2.78,6.2-6.2,6.2c-3.42,0-6.2-2.78-6.2-6.2v-3.22H0.12h0c0,0,0,0,0,0C0.04,14.72,0,15.36,0,16
	c0,8.82,7.16,16,16,16c8.84,0,16-7.18,16-16C32,7.16,24.84,0,16,0z"/>
                    </svg>
                  </div> */}
                  <span className="text-lg text-background font-bold">{t("app.name")} <span className="text-secondary">{t("app.types.drive")}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <button className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out">
                    <Icon.HelpCircle className="w-[24px] h-[24px] stroke-background_dark/70 dark:stroke-background/70 stroke-[2px] dark:text-background" />
                  </button>
                </div>
              </div>

              <div className="w-full">
                <div className=" shadow-[0_0_0_2px_inset_rgba(224,224,224,1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
                  <div className="relative flex items-center justify-between h-[52px] rounded-tl-2xl rounded-tr-2xl px-2 w-full overflow-hidden">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center min-w-[32px]">
                          <Icon.Target className="w-[18px] h-[18px] stroke-background_dark/60 dark:stroke-background/60 stroke-[2px] dark:text-background/60" />

                        </div>
                        <div className="h-[16px] w-[2px] rounded-full bg-gray dark:bg-[rgba(77,77,77,1)]"></div>
                      </div>
                      <span className="flex items-center text-md text-background_dark/60 dark:text-background/60 font-normal">الزاوية الحمراء &nbsp; <span className="font-semibold">(القاهرة)</span></span>
                    </div>
                    <div className="flex items-center px-1 space-x-2 rtl:space-x-reverse">
                      <button className="relative min-w-[32px] h-[32px] flex items-center justify-center dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(10,59,60,1)] active:scale-95 transition all duration-100 active:duration-0 rounded-full active:scale-95 active:bg-background transition duration-100 ease-in-out">
                        <Icon.Navigation className="w-[16px] h-[16px] stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                      </button>
                      <button className="relative min-w-[32px] h-[32px] flex items-center justify-center dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(10,59,60,1)] active:scale-95 transition all duration-100 active:duration-0 rounded-full active:scale-95 active:bg-background transition duration-100 ease-in-out">
                        <Icon.Repeat className="w-[16px] h-[16px] stroke-background dark:stroke-background stroke-[2px] dark:text-background" />
                      </button>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between h-[52px] rounded-full w-full shadow-[0_0_0_2px_inset_rgba(193,196,197,1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)]">
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
                        <span className="flex items-center text-md font-semibold text-background_dark dark:text-background rounded-xl">مدينة السلام</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse h-[52px] px-2 rounded-full  shadow-[0_0_0_2px_inset_rgba(193,196,197,1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)]">

                      <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-primary rounded-full active:scale-95 transition duration-100 ease-in-out hover:bg-primary/80">
                        <Icon.MapPin strokeLinecap="round" className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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


          <div className="absolute  bottom-[204px] left-0 flex flex-col items-center justify-center p-3 space-y-3">
            <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-primary rounded-full active:scale-95 shadow-md transition duration-100 ease-in-out">
              <Icon.Navigation2 className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
            </button>
            <button className="relative min-w-[38px] h-[38px] flex items-center justify-center bg-primary rounded-full active:scale-95 shadow-md transition duration-100 ease-in-out">
              <Icon.Map className="w-[18px] h-[18px] stroke-background stroke-[2px] dark:text-background" />
            </button>
          </div>

          <div className="z-[99999999] absolute bottom-0 left-0 w-full bg-background dark:bg-background_dark rounded-tl-3xl rounded-tr-3xl shadow-[0_-8px_16px_rgba(26,26,26,.2)] flex items-center justify-between p-4">
            <div className="relative flex flex-col items-center justify-center w-full space-y-3">

              <div className="relative flex items-center justify-between w-full">
                <div>
                  <div
                    key={services[0].id}
                    className={`flex items-center h-[38px] p-2 rtl:pr-3 rounded-full relative dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(10,59,60,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                  >
                    {/* صورة الخدمة */}
                    <Icon.Truck className="w-[18px  ] h-[18px] stroke-background dark:stroke-background stroke-[2px] dark:text-background/70" />


                    <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
                      {/* اسم الخدمة */}
                      <span className="text-sm font-semibold text-background_dark dark:text-background">{services[0].name}</span>
                      {/* عدد الركاب */}
                      <div className="flex items-center justify-center text-xs text-[10px] text-background dark:shadow-[0_0_0_2px_rgba(247,249,252,1)] rounded-xl w-[42px] h-[24px] px-2"><Icon.User className="min-w-[16px] h-[16px] stroke-background dark:text-background_dark stroke-[2px]" /><span>{services[0].seats}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div>
                    <div

                      className={`flex items-center justify-center h-[38px] w-[38px] rounded-full relative dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(10,59,60,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                    >
                      {/* صورة الخدمة */}
                      <Icon.CreditCard className="w-[18px] h-[18px] stroke-background dark:stroke-background stroke-[2px] dark:text-background/70" />
                    </div>
                  </div>
                  <div>
                    <div

                      className={`flex items-center justify-center h-[38px] w-[38px] rounded-full relative dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(10,59,60,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                    >
                      {/* صورة الخدمة */}
                      <Icon.Sliders className="w-[18px] h-[18px] stroke-background dark:stroke-background stroke-[2px] dark:text-background/70" />
                    </div>
                  </div>

                  <div>
                    <div

                      className={`flex items-center justify-center h-[38px] w-[38px] rounded-full relative shadow-[0_0_0_2px_rgba(193,196,197,1)] dark:shadow-[0_0_0_1px_rgba(59,59,60,1)] active:dark:shadow-[0_0_0_2px_rgba(10,59,60,1)] active:scale-95 transition all duration-100 active:duration-0 space-x-2 rtl:space-x-reverse }`}
                    >
                      {/* صورة الخدمة */}
                      <Icon.Clock className="w-[18px] h-[18px] stroke-background dark:stroke-background  stroke-[2px] dark:text-background/70" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center w-full h-[52px] shadow-[0_0_0_2px_inset_rgba(193,196,197,1)] dark:shadow-[0_0_0_2px_inset_rgba(77,77,77,1)] rounded-full w-full ">
                <div className="relative flex items-center space-x-2 rtl:space-x-reverse  px-3 ">
                  <span className="flex items-center justify-center text-background_dark dark:text-background font-bold text-base min-w-[38px]">
                    EGP
                  </span>
                  <div className="h-[16px] w-[2px] rounded-full bg-[rgba(193,196,197,1)] dark:bg-[rgba(77,77,77,1)]"></div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse h-[52px] px-2 rounded-full">
                  <button className="relative min-w-[38px] h-[38px] flex items-center justify-center rounded-full active:scale-95 transition duration-100 ease-in-out ">
                    <div className="relative flex items-center justify-center w-[calc(361px-124px)]">
                      <span className="flex items-center text-lg font-semibold h-[28px] text-background_dark dark:text-background rounded-3xl">
                        <span>50</span>
                        &nbsp;
                        <span>جنيه</span>
                      </span>
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
          </div>
        </div>
      </div >
    </>
  )
}

export default Dashboard
