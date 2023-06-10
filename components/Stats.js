import React from "react";

import { animated, useTransition, useSpring } from "@react-spring/native";
import AnimatedCircularProgress from "./AnimatedCircularProgress";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import WeekBarChart from "./WeekBarChart";

const AnimatedView = animated(View);

function groupArray(array, groupSize) {
  var groups = [];
  var i = 0;

  while (i < array.length) {
    groups.push(array.slice(i, i + groupSize));
    i += groupSize;
  }

  return groups;
}

export default function Stats({ show, data, averageCompletionPercentage }) {
  const graphTransition = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const groupedData = groupArray(data, 7);

  return (
    <View>
      {graphTransition(
        (style, item) =>
          item && (
            <AnimatedView style={{ ...style, ...styles.outputWrapper }}>
              <AnimatedCircularProgress
                radius={120}
                strokeWidth={12}
                value={averageCompletionPercentage}
                color={"tomato"}
              />
              <View style={styles.graphWrapper}>
                {groupedData.map((weekData, i) => (
                  <WeekBarChart
                    key={`week-${i}`}
                    width={60}
                    data={weekData}
                    label={`Week ${i + 1}`}
                    color={"tomato"}
                  />
                ))}
              </View>
              {/* <ScrollView>
                <Text>{JSON.stringify(data, null, 2)}</Text>
              </ScrollView> */}
            </AnimatedView>
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outputWrapper: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  graphWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
});
