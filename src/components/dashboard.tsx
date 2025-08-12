import { t, setLang } from "../locales";
import React from 'react';

function Dashboard() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[rgba(247,242,221,1)] font-noto font-noto-arabic">
        <span className="opacity-[.5] mb-4">Mobile View</span>
        <div className="w-[375px] h-[667px] bg-white rounded-3xl shadow-lg">

          {/* Mobile Platform */}

          <div className="relative top-0 left-0 w-full h-full flex flex-col bg-white rounded-3xl shadow-[0_0_0_2px_rgba(255,255,255,1)] overflow-hidden">
            <div className="relative flex items-center w-full h-[60px] px-4">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path className="fill-white" d="M18.46,0h-4.92C6.07,0,0,6.06,0,13.54v4.92C0,25.93,6.06,32,13.54,32h4.92C25.93,32,32,25.94,32,18.46v-4.92
	C32,6.07,25.93,0,18.46,0z"/>
                <g>
                  <path className="fill-black" d="M24.18,13.06V9.7c0-1.04-0.85-1.89-1.88-1.89h-3.36c-1.62,0-3.06,0.73-4.02,1.89c-0.67-1.11-1.88-1.85-3.27-1.85H9.7
		c-1.04,0-1.88,0.85-1.88,1.88v1.95c0,1.39,0.75,2.59,1.85,3.27c-1.13,0.96-1.85,2.39-1.85,3.99v3.35c0,1.04,0.85,1.88,1.88,1.88
		h3.35c1.6,0,3.03-0.72,3.99-1.85c0.67,1.11,1.88,1.85,3.27,1.85h1.95c1.04,0,1.88-0.85,1.88-1.88v-1.95c0-1.39-0.75-2.6-1.86-3.27
		C23.44,16.11,24.18,14.66,24.18,13.06z M18.94,9.91h3.14v3.14c0,1.73-1.41,3.14-3.14,3.14c-0.77,0-1.46-0.29-2.01-0.75
		c-0.12-0.13-0.24-0.26-0.38-0.38c-0.46-0.55-0.75-1.24-0.75-2.01C15.81,11.32,17.21,9.91,18.94,9.91z M9.91,9.94h1.74
		c0.96,0,1.74,0.78,1.74,1.74s-0.78,1.74-1.74,1.74s-1.74-0.78-1.74-1.74V9.94z M13.06,22.09H9.91v-3.14c0-1.73,1.41-3.14,3.14-3.14
		c0.77,0,1.46,0.29,2.01,0.75c0.12,0.13,0.24,0.26,0.38,0.38c0.46,0.55,0.75,1.24,0.75,2.01C16.19,20.68,14.79,22.09,13.06,22.09z
		 M22.06,22.09h-1.74c-0.96,0-1.74-0.78-1.74-1.74s0.78-1.74,1.74-1.74s1.74,0.78,1.74,1.74V22.09z"/>
                </g>

              </svg>
            </div>
            <div className="flex flex-col w-full p-4 pt-0 overflow-y-auto">
              <div className="flex flex-col space-y-4 mb-4 bg-[rgba(0,0,0,.08)] rounded-3xl p-6 overflow-hidden">
                <span className="text-black/50 text-xs font-normal px-2">العنوان الحالي ━</span>
                <div className="relative flex flex-col mb-4 bg-white p-4 rounded-2xl space-y-4 ">
                  <div className="flex flex-col items-center space-y-2 rtl:space-x-reverse">
                    <span className="text-black/50 text-sm font-normal">القاهرة, الزاوية الحمراء</span>
                    <span className="text-black text-lg font-semibold">شارع ام حمالات كبيرة</span>
                  </div>
                  <div className="w-full h-[1px] bg-[rgba(0,0,0,.08)]"></div>
                  <div className="space-x-2 rtl:space-x-reverse flex items-center">
                    <span className="text-blue-500/70 text-xs font-normal">
                      خط العرض: ‎30.10174° N</span>
                    <div className="h-full min-w-[2px] bg-[rgba(0,0,0,.08)] rounded-xl"></div>
                    <span className="text-blue-500/70 text-xs font-normal">
                      خط الطول: ‎31.26592° E
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-[38px]">
                  <button className="flex items-center justify-center px-6 h-[38px] bg-black/25 rounded-xl">
                    <span className="text-white text-xs font-semibold">
                      تحديث العنوان
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-4 mb-4 bg-[rgba(0,0,0,.08)] rounded-3xl p-6 overflow-hidden">
                <div className="flex flex-col space-y-4">

                  <div className="relative flex items-center justify-between bg-white p-4 rounded-2xl ">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="shadow-[0_0_0_1px_inset_rgba(0,0,0,.1)] flex items-center justify-center w-[38px] h-[38px] rounded-2xl">
                        <svg width="18" height="18" viewBox="0 0 24 24">

                          <g>
                            <rect className="fill-transparent" width="24" height="24"
                            />

                            <path
                              className="stroke-[2px] stroke-black fill-transparent"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.94,8.96c0,1.62-1.32,2.94-2.94,2.94s-2.94-1.32-2.94-2.94S10.38,6.02,12,6.02S14.94,7.34,14.94,8.96z
	 M16.92,4.04L16.92,4.04c-2.72-2.72-7.13-2.72-9.85,0l0,0c-2.72,2.72-2.72,7.13,0,9.85L12,18.81l4.92-4.92
	C19.64,11.17,19.64,6.76,16.92,4.04z M7.09,20.88C7.09,21.5,9.29,22,12,22s4.91-0.5,4.91-1.12"/>

                          </g>
                        </svg>
                      </div>
                      <span className="text-black/50 text-md font-semibold">{t('where_to.placeholder')}</span>
                    </div>

                    <div className="bg-blue-500 flex items-center justify-center w-[42px] h-[42px] rounded-xl">
                      <svg width="18" height="18" viewBox="0 0 24 24">

                        <g>
                          <rect className="fill-transparent" width="24" height="24"
                          />

                          <path
                            className="stroke-[2.5px] stroke-white fill-transparent"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.19,9.1c0,3.92-3.18,7.1-7.1,7.1S2,13.02,2,9.1S5.18,2,9.1,2S16.19,5.18,16.19,9.1z M14.11,14.11L22,22" />

                        </g>
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard
