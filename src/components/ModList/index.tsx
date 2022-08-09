import ModState, { ValidModState } from "./ModState";
import React from "react";
import Table from "react-bootstrap/Table";

export type Mod = {
  id: string,
  name: string,
  version: string,
  state: ValidModState,
  updateVersion: string,
};

type ModListProps = {
  mods: Mod[],
};

export default function ModList({
  mods,
}: ModListProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Update</th>
          <th>&nbsp;</th>
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
