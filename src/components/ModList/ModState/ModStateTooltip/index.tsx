import React, { useEffect } from "react";
import Tooltip, { TooltipProps } from "react-bootstrap/Tooltip";

export type ModStateTooltipProps = {
  info: string,
  extraInfo?: string,
};

const ModStateTooltip = React.forwardRef<HTMLDivElement, TooltipProps & ModStateTooltipProps>(
  ({ popper, info, extraInfo, ...props }, ref) => {
    useEffect(() => {
      if (popper && popper.scheduleUpdate) {
        popper.scheduleUpdate();
      }
    }, [popper, extraInfo]);

    if (extraInfo) {
      return <Tooltip ref={ref} {...props}>{info}<br />({extraInfo})</Tooltip>;
    }
    return <Tooltip ref={ref} {...props}>{info}</Tooltip>;
  },
);

export default ModStateTooltip;
