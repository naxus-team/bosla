import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import NetInfo from "@react-native-community/netinfo";

MapboxGL.setAccessToken(
    "pk.eyJ1IjoibmF4dXMiLCJhIjoiY21mOGRsOWpsMTBxMTJpcXMyOGZrYnhlNSJ9.jqc2quB65_hVUxEHlv0lzA"
);

const bounds: [[number, number], [number, number]] = [
    [31.1, 29.9], // SW القاهرة
    [31.4, 30.2], // NE القاهرة
];

export default function MapScreen() {
    const [progress, setProgress] = useState(0);
    const [offlineReady, setOfflineReady] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const initOffline = async () => {
            try {
                const packs = await MapboxGL.offlineManager.getPacks();
                const existing = packs.find((p) => p.name === "cairo-pack");

                if (!existing) {
                    console.log("⬇️ Starting Cairo offline pack download...");
                    await MapboxGL.offlineManager.createPack(
                        {
                            name: "cairo-pack",
                            styleURL: MapboxGL.StyleURL.Street,
                            bounds: bounds,
                            minZoom: 10,
                            maxZoom: 16,
                        },
                        (pack, status) => {
                            setProgress(status.percentage);
                            if (status.percentage === 100) {
                                console.log("✅ Cairo offline pack ready!");
                                setOfflineReady(true);
                            }
                        },
                        (pack, err) => {
                            console.error("❌ Error:", err);
                        }
                    );
                } else {
                    console.log("✅ Cairo offline pack already exists, skipping download!");
                    setOfflineReady(true);
                }
            } catch (error) {
                console.error("⚠️ Offline error:", error);
            }
        };

        initOffline();

        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected ?? false);
            if (!state.isConnected) {
                MapboxGL.setTelemetryEnabled(false); // يعطل إرسال بيانات usage
                console.log("📴 Offline mode: using cached Cairo map data");
            } else {
                console.log("🌐 Online mode: fetching latest tiles if available");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            {!offlineReady && (
                <Text style={styles.loading}>
                    تحميل الخريطة: {progress.toFixed(0)}%
                </Text>
            )}

            <MapboxGL.MapView
                style={styles.map}
                styleURL={MapboxGL.StyleURL.Street} // نفس الـ style بتاع الباك
                logoEnabled={false}
                compassEnabled={false}
                attributionEnabled={false}
                scaleBarEnabled={false}

            >
                <MapboxGL.Camera
                    zoomLevel={12}
                    centerCoordinate={[31.2357, 30.0444]} // القاهرة
                    pitch={60} // ميل الكاميرا = 3D
                    heading={20} // دوران الكاميرا
                />
                <MapboxGL.FillExtrusionLayer
                    id="3d-buildings"
                    sourceLayerID="building"
                    minZoomLevel={15}
                    maxZoomLevel={22}
                    style={{
                        fillExtrusionColor: "#aaa",
                        fillExtrusionHeight: ["get", "height"],
                        fillExtrusionBase: ["get", "min_height"],
                        fillExtrusionOpacity: 0.8,
                    }}
                />
            </MapboxGL.MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -30,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height + 38,
    },
    loading: {
        position: "absolute",
        top: 40,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "#fff",
        padding: 6,
        borderRadius: 8,
        zIndex: 10,
    },
});
