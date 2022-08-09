import ModStateTooltip, { ModStateTooltipProps } from "./ModStateTooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { faCircleCheck, faCircleMinus, faQuestion, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ValidModState = "not_installed" | "updated" | "needs_update";

type ModStateProps = {
  state: ValidModState,
  extraInfo?: string,
};

export default function ModState({
  state,
  extraInfo,
}: ModStateProps) {
  const [tooltip, setTooltip] = useState<ModStateTooltipProps>({
    info: "Kontrol ediliyor...",
  });
  const [icon, setIcon] = useState(faQuestion);
  const [iconColor, setIconColor] = useState("text-secondary");

  useEffect(() => {
    switch (state) {
    case "not_installed":
      setTooltip({
        info: "Not Installed",
      });
      setIcon(faCircleMinus);
      setIconColor("text-danger");
      break;
    case "updated":
      setTooltip({
        info: "Bu mod güncel durumda",
      });
      setIcon(faCircleCheck);
      setIconColor("text-success");
      break;
    case "needs_update":
      setTooltip({
        info: "Yeni bir güncelleme var",
        extraInfo: extraInfo,
      });
      setIcon(faTriangleExclamation);
      setIconColor("text-warning");
      break;
    default:
      setTooltip({
        info: "Kontrol ediliyor...",
      });
      setIcon(faQuestion);
      setIconColor("text-secondary");
      break;
    }
  }, [state]);


  return (
    <OverlayTrigger placement="left" overlay={injection => <ModStateTooltip {...injection} {...tooltip} />}>
      <FontAwesomeIcon icon={icon} size="lg" className={classNames("fa-fw", iconColor)} />
    </OverlayTrigger>
  );
}
