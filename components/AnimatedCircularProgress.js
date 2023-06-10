import React from "react";
import { View } from "react-native";
import Svg, { G, Circle, Text as SvgText } from "react-native-svg";
import { Spring, animated, useSpring, config } from "@react-spring/native";

const AnimatedCircle = animated(Circle);
const AnimatedSvgText = animated(SvgText);

const AnimatedCircularProgress = ({
  value = 25,
  radius = 40,
  strokeWidth = 10,
  color = "tomato",
  max = 100,
}) => {
  const { value: animatedValue } = useSpring({
    value,
    config: config.stiff,
  });
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <AnimatedCircle
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            strokeDasharray={circleCircumference}
            strokeDashoffset={animatedValue.to(
              (val) => (circleCircumference * (max - val)) / max
            )}
            strokeLinecap="round"
          />
        </G>
        <G origin={`${halfCircle}, ${halfCircle}`}>
          <AnimatedSvgText
            x="53%"
            y="57%"
            textAnchor="middle"
            fontSize={42}
            fill={color}
          >
            {animatedValue.to((value) => `${Math.ceil(value)}%`)}
          </AnimatedSvgText>
        </G>
      </Svg>
    </View>
  );
};

export default AnimatedCircularProgress;
