import React, { useState } from "react";
import { View, Image, Text, FlatList, Dimensions, TouchableOpacity, Modal } from "react-native";
import {
    State,
    GestureHandlerRootView,
    PinchGestureHandler,
    PanGestureHandler,
    TapGestureHandler,
    PinchGestureHandlerGestureEvent,
    PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { colors as color } from "../../theme/colors";
import { styles } from "../utils/styles";

interface GalleryProps {
    images: string[];
    initialIndex?: number;
    showThumbnails?: boolean;
}

const { width, height } = Dimensions.get("window");

const Gallery: React.FC<GalleryProps> = ({ images = [""], initialIndex = 0, showThumbnails = true }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [modalVisible, setModalVisible] = useState(false);

    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const resetTransforms = () => {
        scale.value = withTiming(1, { duration: 100 });
        translateX.value = withTiming(0, { duration: 100 });
        translateY.value = withTiming(0, { duration: 100 });
    };

    // Pinch-to-zoom
    const pinchHandler = (event: PinchGestureHandlerGestureEvent) => {
        scale.value = event.nativeEvent.scale;
    };

    // Pan during zoom
    const panHandler = (event: PanGestureHandlerGestureEvent) => {
        translateX.value = event.nativeEvent.translationX;
        translateY.value = event.nativeEvent.translationY;
    };

    // Double-tap zoom
    const doubleTapHandler = (event: any) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (scale.value > 1) {
                resetTransforms();
            } else {
                scale.value = withTiming(2, { duration: 150 });
            }
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
            resetTransforms();
        }
    };

    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

    return (
        <GestureHandlerRootView style={styles.Gallery}>
            <View style={styles.ContentGallery}>
                {/* Main Image */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                        source={{ uri: images[currentIndex] }}
                        style={{ width: "100%", height: 300, borderRadius: 8 }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                {/* Thumbnails */}
                {showThumbnails && (
                    <FlatList
                        data={images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 8 }}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => setCurrentIndex(index)}>
                                <Image
                                    source={{ uri: item }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 8,
                                        marginRight: 8,
                                        borderWidth: currentIndex === index ? 2 : 0,
                                        borderColor: currentIndex === index ? color.primary.hex[6] : "transparent",
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}

                {/* Modal full-screen */}
                <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modal}>
                        <FlatList
                            data={images}
                            horizontal
                            pagingEnabled
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <PanGestureHandler onGestureEvent={panHandler}>
                                    <Animated.View>
                                        <PinchGestureHandler onGestureEvent={pinchHandler}>
                                            <Animated.View>
                                                <TapGestureHandler onHandlerStateChange={doubleTapHandler} numberOfTaps={2}>
                                                    <Animated.Image
                                                        source={{ uri: item }}
                                                        style={[{ width, height }, animatedStyle]}
                                                        resizeMode="contain"
                                                    />
                                                </TapGestureHandler>
                                            </Animated.View>
                                        </PinchGestureHandler>
                                    </Animated.View>
                                </PanGestureHandler>
                            )}
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={viewabilityConfig}
                            getItemLayout={(_, index) => ({
                                length: width,
                                offset: width * index,
                                index,
                            })}
                            initialScrollIndex={currentIndex}
                        />

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: "#fff", fontSize: 18 }}>×</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </GestureHandlerRootView>
    );
};

export default Gallery;
