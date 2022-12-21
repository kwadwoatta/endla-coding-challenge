import { keyframes, style } from "@vanilla-extract/css";
// import { vars } from "../../theme/theme.css";

export const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

export const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

export const accordionPrimitiveRootStyle = style({
  borderRadius: 6,
  width: 224,
  height: 248,
});

export const accordionPrimitiveItemStyle = style({
  overflow: "hidden",
  marginBottom: 4,

  selectors: {
    "&:focus-within": {
      position: "relative",
      zIndex: 1,

      borderRadius: 6,
    },
  },
});

export const accordionPrimitiveHeaderStyle = style({
  all: "unset",
  display: "flex",
});

export const accordionPrimitiveTriggerStyle = style({
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "transparent",
  height: 24,
  // marginLeft: 10,
  // paddingLeft: 10,
  paddingRight: 10,
  flex: 1,
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",
  gap: 10,
  color: "black",
  fontWeight: 500,
  borderRadius: 6,

  selectors: {
    '&[data-state="closed"]': { backgroundColor: "white" },
    '&[data-state="open"]': {
      backgroundColor: "white",
      color: "black",
    },
    "&:hover": { backgroundColor: "white" },
  },
});

export const accordionPrimitiveContentStyle = style({
  overflow: "hidden",
  fontSize: 15,
  color: "black",
  backgroundColor: "white",
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
  },
});

export const ContentTextStyle = style({
  padding: "15px 20px",
});

export const chevronDownIconStyle = style({
  color: "#ABB3B9",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  selectors: {
    "[data-state=open] &": {
      transform: "rotate(180deg)",
      color: "black",
    },
  },
});

export const menuItemIconStyle = style({
  color: "#ABB3B9",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  selectors: {
    "[data-state=open] &": {
      color: "black",
    },
  },
});
