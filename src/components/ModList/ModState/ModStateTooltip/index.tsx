import React, { useEffect } from "react";
import Tooltip, { TooltipProps } from "react-bootstrap/Tooltip";
import TooltipContent, { ModStateTooltipProps } from "./TooltipContent";

export { ModStateTooltipProps };

const ModStateTooltip = React.forwardRef<HTMLDivElement, TooltipProps & ModStateTooltipProps>(
  ({ popper, info, extraInfo, ...props }, ref) => {
    useEffect(() => {
      if (popper && popper.scheduleUpdate) {
        popper.scheduleUpdate();
      }
    }, [popper, extraInfo]);

    if (extraInfo) {
      return (
        <Tooltip ref={ref} {...props}>
          <TooltipContent
            info={info}
            extraInfo={extraInfo}
          />
        </Tooltip>
      );
    }
    return (
      <Tooltip ref={ref} {...props}>
        <TooltipContent info={info} />
      </Tooltip>
    );
  },
);

export default ModStateTooltip;
