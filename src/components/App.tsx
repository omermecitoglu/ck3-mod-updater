import Button from "react-bootstrap/Button";
import ModList, { Mod } from "./ModList";
import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import classNames from "classnames";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const dummy_mod_list: Mod[] = [
  {
    id: "111",
    name: "Multiplayer Tweaks",
    version: "8 Ağustos 2022 22:08",
    state: "needs_update",
    updateVersion: "8 Ağustos 2022 22:08",
  },
  {
    id: "222",
    name: "Less Shattered Britannia",
    version: "8 Ağustos 2022 22:08",
    state: "updated",
    updateVersion: "",
  },
  {
    id: "333",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "444",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "555",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "666",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "777",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "888",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
];

export default function App() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [checking, setChecking] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setMods(dummy_mod_list);
  }, []);

  const check = () => {
    console.log("check");
    setChecking(true);
  };

  const update = () => {
    console.log("update");
    setUpdating(true);
  };

  return (
    <div className="vh-100 w-100 d-flex flex-column overflow-hidden">
      <div>
        <Toolbar />
      </div>
      <div id="mod-list">
        <ModList mods={mods} />
      </div>
      <div className="d-flex flex-row-reverse my-3">
        <Button variant="primary" className="me-3" disabled={checking || updating} onClick={update}>
          <FontAwesomeIcon icon={faDownload} className={classNames("fa-fw me-2", { "fa-beat": updating })} />
          Update
        </Button>
        <Button variant="secondary" className="me-3" disabled={checking || updating} onClick={check}>
          <FontAwesomeIcon icon={faRotate} className={classNames("fa-fw me-2", { "fa-spin": checking })} />
          Check
        </Button>
      </div>
    </div>
  );
}
