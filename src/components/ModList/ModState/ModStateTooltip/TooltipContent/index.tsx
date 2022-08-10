import React from "react";
import { useTranslation, withTranslation } from "react-i18next";

export type ModStateTooltipProps = {
  info: string,
  extraInfo?: string,
};

function TooltipContent({
  info,
  extraInfo,
}: ModStateTooltipProps) {
  const { t } = useTranslation();
  if (extraInfo) {
    return <>{t("mod.states." + info)}<br />({extraInfo})</>;
  }
  return <>{t("mod.states." + info)}</>;
}

export default withTranslation()(TooltipContent);
