import React from "react";
import { Text } from "react-native";

type countryFlagProps = {
    code: string,
    size: number,
}

const CountryFlag = ({ code, size = 32 } : countryFlagProps) => {
    const flag = code
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
        );

    return <Text style={{ fontSize: size }}>{flag}</Text>;
};

export default CountryFlag;