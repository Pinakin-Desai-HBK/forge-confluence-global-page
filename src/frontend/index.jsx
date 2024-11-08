import React, { useEffect, useState } from "react";
import ForgeReconciler, { Box, Button, Heading, Inline, Stack, Strong, Text } from "@forge/react";
import { invoke } from "@forge/bridge";
import {
  rowStyle,
  labelStyle,
  valueStyle,
  updateStyle,
  totalPadding1Style,
  totalPadding2Style,
  styleTrafficLightsContainer,
  styleRedOn,
  styleRedOff,
  styleGreenOn,
  styleGreenOff,
  styleOrangeOn,
  styleOrangeOff
} from "./styles";

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
