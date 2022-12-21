/// <reference types="vite-plugin-svgr/client" />
import { RowData } from "@tanstack/react-table";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion/Accordion";
import {
  accordionPrimitiveItemStyle,
  accordionPrimitiveRootStyle,
  chevronDownIconStyle,
} from "./Accordion/Accordion.css";

import { ReactComponent as ChevronDownSvg } from "../assets/chevron-down.svg";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

interface AdditionalCellProps {
  wireline?: string[];
  pason?: string[];
  heatmap?: string;
}

const AdditionalCell: React.FC<AdditionalCellProps> = ({
  wireline,
  pason,
  heatmap,
}) => {
  if (wireline || pason || heatmap)
    return (
      <Accordion
        className={accordionPrimitiveRootStyle}
        style={{ height: "unset", width: "100%" }}
        type="single"
        collapsible
      >
        <AccordionItem className={accordionPrimitiveItemStyle} value={"1"}>
          <AccordionTrigger>
            <p>Additional</p>
            <ChevronDownSvg className={chevronDownIconStyle} />
          </AccordionTrigger>
          <AccordionContent>
            <Accordion
              className={accordionPrimitiveRootStyle}
              style={{ height: "unset" }}
              type="single"
              collapsible
            >
              {wireline && (
                <AccordionItem
                  className={accordionPrimitiveItemStyle}
                  value={"sub 1"}
                >
                  <AccordionTrigger>
                    <p>Wireline</p>
                    <ChevronDownSvg className={chevronDownIconStyle} />
                  </AccordionTrigger>
                  <AccordionContent>
                    {wireline?.map((p) => (
                      <div style={{ display: "flex" }}>
                        <input type="checkbox" />
                        {p}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}

              {pason && (
                <AccordionItem
                  className={accordionPrimitiveItemStyle}
                  value={"sub 2"}
                >
                  <AccordionTrigger>
                    <p>Pason</p>
                    <ChevronDownSvg className={chevronDownIconStyle} />
                  </AccordionTrigger>
                  <AccordionContent>
                    {pason?.map((p) => (
                      <div style={{ display: "flex" }}>
                        <input type="checkbox" />
                        {p}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}

              {heatmap && (
                <div style={{ display: "flex" }}>
                  <input type="checkbox" />
                  <p>{heatmap}</p>
                </div>
              )}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  return <></>;
};

export default AdditionalCell;
