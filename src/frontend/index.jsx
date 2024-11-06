import React, { useEffect, useState } from "react";
import ForgeReconciler, { Box, Button, Heading, Inline, Strong, Text, xcss } from "@forge/react";
import { invoke } from "@forge/bridge";

const allBorder = { borderColor: "color.border.discovery", borderWidth: "border.width", borderStyle: "solid" };

const rowStyle = xcss({ ...allBorder, padding: "space.100", marginBottom: "space.200", width: "800px" });
const labelStyle = xcss({ width: "160px", padding: "space.100" });
const valueStyle = xcss({ width: "40px", padding: "space.100" });
const updateStyle = xcss({ marginTop: "space.200" });

const styleTrafficLightsContainer = xcss({ ...allBorder });
const trafficLightBase = { width: "20px", height: "20px" };
const lightsBorder = {
  borderBottomColor: "color.border.discovery",
  borderBottomWidth: "border.width",
  borderBottomStyle: "solid"
};
const styleRedOn = xcss({
  ...trafficLightBase,
  ...lightsBorder,
  backgroundColor: "color.background.accent.red.subtle"
});
const styleRedOff = xcss({
  ...trafficLightBase,
  ...lightsBorder,
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
  ...lightsBorder,
  backgroundColor: "color.background.accent.orange.subtle"
});
const styleOrangeOff = xcss({
  ...trafficLightBase,
  ...lightsBorder,
  backgroundColor: "color.background.accent.orange.bolder.pressed"
});

const TrafficLights = ({ value }) => {
  return (
    <Box xcss={styleTrafficLightsContainer}>
      <Box xcss={[2, 1].includes(value) ? styleRedOn : styleRedOff}></Box>
      <Box xcss={[4, 3, 2].includes(value) ? styleOrangeOn : styleOrangeOff}></Box>
      <Box xcss={[5, 4].includes(value) ? styleGreenOn : styleGreenOff}></Box>
    </Box>
  );
};

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke("getData").then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {data && data.teamHealth && (
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
                <Button>+</Button>
                <Button>-</Button>
                <TrafficLights value={data.teamHealth[key]}></TrafficLights>
                <Box xcss={valueStyle} alignBlock="center">
                  <Text>
                    <Strong>{data.teamHealth[key]}</Strong>
                  </Text>
                </Box>
              </Inline>
            </Box>
          ))}
          <Box xcss={updateStyle}>
            <Button onClick={() => invoke("setData")}>Update</Button>
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
