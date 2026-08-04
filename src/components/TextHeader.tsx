"use client";

import React from "react";
import clsx from "clsx";

interface TextHeaderProps {
  title: string;
  fontSize?:
    | "text-xs"
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl";
  fontWeight?:
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold";
  textAlign?: "text-left" | "text-center" | "text-right";
  textColor?: string;
  bgColor?: string;
  letterSpacing?: string;
  marginY?: string;
  marginX?: string;
  textDecoration?: "underline" | "line-through" | "overline" | "none";
}

const TextHeader: React.FC<TextHeaderProps> = ({
  title,
  fontSize = "text-xl",
  fontWeight = "font-bold",
  textAlign = "text-center",
  textColor = "text-black",
  bgColor = "bg-inherit",
  letterSpacing = "tracking-normal",
  marginY = "my-0",
  marginX = "mx-0",
  textDecoration = "none",
}) => {
  return (
    <p
      className={clsx(
        fontSize,
        fontWeight,
        textAlign,
        textColor,
        letterSpacing,
        marginY,
        marginX,
        bgColor,
        textDecoration !== "none" && textDecoration
      )}
    >
      {title}
    </p>
  );
};

export default TextHeader;
