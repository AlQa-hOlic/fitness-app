import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Circle, Text as SvgText, Rect } from "react-native-svg";
import {
  Spring,
  animated,
  useSprings,
  useSpring,
  config,
} from "@react-spring/native";

const AnimatedRect = animated(Rect);

export default function WeekBarChart({
  width = 50,
  data,
  color = "tomato",
  label = "Label",
}) {
  const height = 70;
  const graphHeight = height - 20;
  const barWidth = 3;
  const barGap = 4;

  const springs = useSprings(
    data.length,
    data.map((v, index) => ({
      x:
        index * (barWidth + barGap) +
        (width / 2 - (barWidth + barGap) * (data.length / 2)),
      y: graphHeight - (graphHeight * Math.max(v, 1)) / 100,
      height: (graphHeight * Math.max(v, 1)) / 100,
    }))
  );

  return (
    <View
    // style={
    //   StyleSheet.create({
    //     t: { borderColor: "black", borderWidth: 2, borderStyle: "solid" },
    //   }).t
    // }
    >
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {springs.map((props, index) => {
          const v = data[index];
          return (
            <AnimatedRect
              key={`${v}-${index}`}
              x={props.x}
              y={props.y}
              height={props.height}
              rx={barWidth / 2}
              ry={barWidth / 2}
              fill={color}
              width={barWidth}
            ></AnimatedRect>
          );
        })}
        <SvgText fill={color} x="50%" y="90%" textAnchor="middle">
          {label}
        </SvgText>
      </Svg>
    </View>
  );
}
