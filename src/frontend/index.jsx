import React, { useEffect, useState } from "react";
import ForgeReconciler, { Box, Button, Heading, Inline, Stack, Strong, Text, xcss } from "@forge/react";
import { invoke } from "@forge/bridge";

/* Border */
const allBorder = {
  borderColor: "color.border.discovery",
  borderWidth: "border.width",
  borderStyle: "solid"
};

/* Styles */
const rowStyle = xcss({ ...allBorder, padding: "space.100", marginBottom: "space.200", width: "600px" });
const labelStyle = xcss({ width: "160px", padding: "space.100" });
const valueStyle = xcss({ width: "40px", padding: "space.100" });
const updateStyle = xcss({ marginTop: "space.200" });
const totalPadding1Style = xcss({ width: "153px" });
const totalPadding2Style = xcss({ width: "118px" });

/* Traffic Lights */
const styleTrafficLightsContainer = xcss({
  backgroundColor: "color.background.accent.teal.bolder.pressed",
  borderRadius: "border.radius",
  padding: "space.050"
});
const trafficLightBase = { width: "20px", height: "20px", borderRadius: "border.radius" };

const styleRedOn = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.red.subtle"
});
const styleRedOff = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.red.bolder.pressed"
});
const styleGreenOn = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.lime.subtle"
});
const styleGreenOff = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.lime.bolder.pressed"
});
const styleOrangeOn = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.orange.subtle"
});
const styleOrangeOff = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.orange.bolder.pressed"
});

const TrafficLights = ({ value }) => {
  return (
    <Box xcss={styleTrafficLightsContainer}>
      <Stack space="space.050">
        <Box xcss={[2, 1].includes(value) ? styleRedOn : styleRedOff}></Box>
        <Box xcss={[4, 3, 2].includes(value) ? styleOrangeOn : styleOrangeOff}></Box>
        <Box xcss={[5, 4].includes(value) ? styleGreenOn : styleGreenOff}></Box>
      </Stack>
    </Box>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [newData, setNewData] = useState(null);

  const changeNewValue = (key, increase) => {
    let newValue = 0;
    if (increase && newData.teamHealth[key] !== 5) {
      newValue = newData.teamHealth[key] + 1;
    } else if (!increase && newData.teamHealth[key] !== 0) {
      newValue = newData.teamHealth[key] - 1;
    }

    if (!!newValue) {
      setNewData({
        ...newData,
        teamHealth: {
          ...newData.teamHealth,
          [key]: newValue
        }
      });
    }
  };

  useEffect(() => {
    invoke("getData").then((data) => {
      console.log(data);
      setData(data);
      setNewData(data);
    });
  }, []);

  return (
    <>
      {data && data.teamHealth && newData && newData.teamHealth && (
        <>
          {Object.keys(data.teamHealth).map((key) => (
            <Box xcss={rowStyle}>
              <Inline key={key} alignBlock="center" space="space.200">
                <Box xcss={labelStyle} alignBlock="center">
                  <Heading as="h4">{key.replaceAll("_", " ")}</Heading>
                </Box>
                <TrafficLights value={data.teamHealth[key]}></TrafficLights>
                <Box xcss={valueStyle} alignBlock="center">
                  <Text>{data.teamHealth[key]}</Text>
                </Box>
                <Button onClick={() => changeNewValue(key, true)}>+</Button>
                <Button onClick={() => changeNewValue(key, false)}>-</Button>
                <TrafficLights value={newData.teamHealth[key]}></TrafficLights>
                <Box xcss={valueStyle} alignBlock="center">
                  <Text>
                    <Strong>{newData.teamHealth[key]}</Strong>
                  </Text>
                </Box>
              </Inline>
            </Box>
          ))}
          <Box xcss={rowStyle}>
            <Inline alignBlock="center" space="space.200">
              <Box xcss={totalPadding1Style}></Box>
              <Box alignBlock="center">
                <Text>
                  {Object.keys(data.teamHealth).reduce((p, c) => p + data.teamHealth[c], 0)} /{" "}
                  {Object.keys(data.teamHealth).length * 5}
                </Text>
              </Box>
              <Box xcss={totalPadding2Style}></Box>
              <Box alignBlock="center">
                <Text>
                  <Strong>
                    {Object.keys(data.teamHealth).reduce((p, c) => p + newData.teamHealth[c], 0)} /{" "}
                    {Object.keys(data.teamHealth).length * 5}
                  </Strong>
                </Text>
              </Box>
            </Inline>
          </Box>
          <Box xcss={updateStyle}>
            <Button onClick={() => invoke("setData", newData)}>Update</Button>
          </Box>
        </>
      )}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
