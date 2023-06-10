const data = require("./assets/hourlySteps_merged.json");
const { parse, format } = require("date-fns");
const { writeFileSync } = require("fs");
const { join } = require("path");

const devices = {};

for (let index = 0; index < data.length; index++) {
  const element = data[index];

  if (element[0] == "Id") continue;

  if (typeof devices[element[0]] === "undefined") {
    devices[element[0]] = [];
  }

  devices[element[0]].push({
    timestamp: parse(element[1], "M/d/y h:mm:ss a", new Date()),
    steps: parseInt(element[2]),
  });
}

// devices = {
//     '7007744171': [
//         { timestamp: '2016-04-11T18:30:00.000Z', steps: 320 },
//         { timestamp: '2016-04-11T19:30:00.000Z', steps: 234 },
//     ]
// }
// console.log(devices);

const deviceDailySteps = Object.keys(devices)
  .map((deviceId) => {
    const entries = devices[deviceId];

    const dailySteps = entries.reduce((obj, curr) => {
      const date = format(curr.timestamp, "yyyy/MM/dd");

      if (typeof obj[date] === "undefined") {
        obj[date] = curr.steps;
      } else {
        obj[date] = obj[date] + curr.steps;
      }

      return obj;
    }, {});

    return {
      [deviceId]: dailySteps,
    };
  })
  .reduce((obj, curr) => Object.assign(obj, curr), {});

writeFileSync(
  join(__dirname, "assets", "dailySteps.json"),
  //   JSON.stringify(deviceDailySteps, null, 2)
  JSON.stringify(deviceDailySteps)
);
