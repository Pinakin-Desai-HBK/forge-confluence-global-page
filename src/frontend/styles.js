import { xcss } from "@forge/react";

/* Border */
const allBorder = {
  borderColor: "color.border.discovery",
  borderWidth: "border.width",
  borderStyle: "solid"
};

/* Styles */
export const rowStyle = xcss({ ...allBorder, padding: "space.100", marginBottom: "space.200", width: "500px" });
export const labelStyle = xcss({ width: "160px", padding: "space.100" });
export const valueStyle = xcss({ width: "40px", padding: "space.100" });
export const updateStyle = xcss({ marginTop: "space.200" });
export const totalPadding1Style = xcss({ width: "153px" });
export const totalPadding2Style = xcss({ width: "118px" });

/* Traffic Lights */
export const styleTrafficLightsContainer = xcss({
  backgroundColor: "color.background.accent.teal.bolder.pressed",
  borderRadius: "border.radius",
  padding: "space.050"
});

const trafficLightBase = { width: "20px", height: "20px", borderRadius: "border.radius" };

export const styleRedOn = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.red.subtle"
});
export const styleRedOff = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.red.bolder.pressed"
});

export const styleGreenOn = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.lime.subtle"
});
export const styleGreenOff = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.lime.bolder.pressed"
});

export const styleOrangeOn = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.orange.subtle"
});
export const styleOrangeOff = xcss({
  ...trafficLightBase,
  backgroundColor: "color.background.accent.orange.bolder.pressed"
});

/* Change */
