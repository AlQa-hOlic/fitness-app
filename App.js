import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";

import rawData from "./assets/dailySteps.json";
import { addDays, format, parse } from "date-fns";
import Stats from "./components/Stats";

export default function App() {
  const [dailyGoal, setDailyGoal] = useState("14000");
  const [deviceId, setDeviceId] = useState("1503960366");
  const [startDate, setStartDate] = useState(
    parse("2016/04/12", "yyyy/MM/dd", new Date())
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showGraphs, setShowGraphs] = useState(false);
  const [data, setData] = useState([]);
  const [averageCompletionPercentage, setAvgCPercent] = useState(25);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  useEffect(() => {
    if (typeof rawData[deviceId] === "undefined") {
      setShowGraphs(false);
    } else {
      const data = [];
      let completionPercents = 0;
      for (let index = 0; index < 28; index++) {
        const date = addDays(startDate, index);

        let steps = rawData[deviceId]?.[format(date, "yyyy/MM/dd")];
        if (typeof steps === "undefined") {
          steps = 0;
        }

        let dailyPercentComplete = Math.min((steps * 100) / dailyGoal, 100);
        data.push(dailyPercentComplete);
        completionPercents += dailyPercentComplete;
      }

      setAvgCPercent(completionPercents / 28);
      setData(data);
      setShowGraphs(true);
    }
  }, [deviceId, startDate, dailyGoal]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Daily Steps</Text>
      <TextInput
        style={styles.input}
        placeholder="Daily Steps"
        value={dailyGoal}
        onChangeText={setDailyGoal}
        keyboardType="numeric"
      />
      <View style={styles.inputRow}>
        <View style={styles.section}>
          <Text>Device ID</Text>
          <TextInput
            style={styles.input}
            placeholder="1503960366"
            value={deviceId}
            onChangeText={setDeviceId}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.section}>
          <Text>Start Date</Text>
          <Text style={styles.input} onPress={(e) => setShowDatePicker(true)}>
            {startDate.toDateString()}
          </Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            onChange={onDateChange}
          />
        )}
      </View>
      <Stats
        show={showGraphs}
        data={data}
        averageCompletionPercentage={averageCompletionPercentage}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    width: "100%",
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 36,
    borderWidth: 1,
    textAlign: "center",
    borderColor: "transparent",
    borderBottomColor: "#ccc",
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
