import ModState, { ValidModState } from "./ModState";
import React from "react";
import Table from "react-bootstrap/Table";
import { useTranslation, withTranslation } from "react-i18next";

export type ModTemplate = {
  id: string,
  name: string,
  version: string,
  state: ValidModState,
  updateVersion: string,
};

type ModListProps = {
  mods: ModTemplate[],
};

function ModList({
  mods,
}: ModListProps) {
  const { t } = useTranslation();
  return (
    <Table striped hover className="mb-0">
      <thead className="table-dark">
        <tr>
          <th>{t("mod.name")}</th>
          <th colSpan={2}>{t("mod.last_update")}</th>
        </tr>
      </thead>
      <tbody>
        {mods.map(mod =>
          <tr key={mod.id}>
            <td valign="middle">{mod.name}</td>
            <td valign="middle">{mod.version}</td>
            <td valign="middle" className="text-center">
              <ModState state={mod.state} extraInfo={mod.updateVersion} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default withTranslation()(ModList);
