import React, { createContext, useContext, useEffect, useState } from "react";
import * as RNLocalize from "react-native-localize";
import { countryCodeMap } from "../locales/countryCodeMap";
import { countryMap } from "../locales/countryMap";
import { countryDialCodes } from "../locales/countryDialCodes";
import { getLang } from "../locales";

type CountryData = {
  code: string;
  name: string;
  flagCode: string;
  dial: string;
};

type CountryContextType = {
  countries: CountryData[];
  loading: boolean;
  currentCountry?: CountryData;
};

const CountryContext = createContext<CountryContextType>({
  countries: [],
  loading: true,
  currentCountry: undefined,
});

export const CountriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCountry, setCurrentCountry] = useState<CountryData>();

  useEffect(() => {
    const loadData = () => {
      const lang = getLang().startsWith("ar") ? "ar" : "en";

      const merged: CountryData[] = Object.keys(countryMap).map((code) => ({
        code,
        name: countryMap[code][lang],
        flagCode: countryCodeMap[code]?.toLowerCase() || code,
        dial: countryDialCodes[code],
      }));

      setCountries(merged);

      // 🟢 تحديد البلد الحالي من الجهاز
      const deviceCode = RNLocalize.getCountry(); // مثال: "EG"
      const found = merged.find((c) => c.code === deviceCode);
      setCurrentCountry(found);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, loading, currentCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountries = () => useContext(CountryContext);
