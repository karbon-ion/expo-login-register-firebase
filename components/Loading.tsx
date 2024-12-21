import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const Loading = () => {
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;

  const createPulse = (animation: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      {delay}
    ).start();
  };

  useEffect(() => {
    createPulse(scaleAnim1, 0);
    createPulse(scaleAnim2, 300);
    createPulse(scaleAnim3, 600);
  }, [scaleAnim1, scaleAnim2, scaleAnim3]);

  return (
    <View className="flex-row justify-center items-center h-full bg-gray-100">
      <Animated.View
        style={{ transform: [{ scale: scaleAnim1 }] }}
        className="w-4 h-4 bg-blue-500 rounded-full mx-1"
      />
      <Animated.View
        style={{ transform: [{ scale: scaleAnim2 }] }}
        className="w-4 h-4 bg-green-500 rounded-full mx-1"
      />
      <Animated.View
        style={{ transform: [{ scale: scaleAnim3 }] }}
        className="w-4 h-4 bg-purple-500 rounded-full mx-1"
      />
    </View>
  );
};

export default Loading;
