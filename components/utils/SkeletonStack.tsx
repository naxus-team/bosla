import React from "react";
import { View } from "react-native";

type SkeletonRowProps = {
    opacity: number;
};

const SkeletonRow: React.FC<SkeletonRowProps> = ({ opacity }) => (
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
            opacity, // درجة الشفافية
        }}
    >
        <View style={{ flexDirection: "row", gap:16 }}>
            <View
                style={{
                    width: 32,
                    height: 24,
                    borderRadius: 8,
                    backgroundColor: "rgba(0,0,0,0.08)",
                    marginRight: 8,
                }}
            />
            <View
                style={{
                    width: 72,
                    height: 24,
                    borderRadius: 8,
                    backgroundColor: "rgba(0,0,0,0.08)",
                }}
            />
        </View>
        <View>
            <View
                style={{
                    width: 58,
                    height: 24,
                    borderRadius: 8,
                    backgroundColor: "rgba(0,0,0,0.08)",
                }}
            />
        </View>
    </View>
);

const SkeletonList = () => {
    return (
        <View style={{ padding: 8 }}>
            {Array.from({ length: 8 }).map((_, i) => {
                const opacity = 1 - i * 0.15; // كل سطر أضعف
                return <SkeletonRow key={i} opacity={opacity} />;
            })}
        </View>
    );
};

export default SkeletonList;
