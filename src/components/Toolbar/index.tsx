import Form from "react-bootstrap/Form";
import ModsPath from "./ModsPath";
import React, { useEffect, useState } from "react";

type ToolbarProps = {
  check: () => Promise<void>,
};

export default function Toolbar({
  check,
}: ToolbarProps) {
  const [modsPath, setModsPath] = useState("");

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getModsPath().then(setModsPath).catch(e => alert(e.message));
    } else {
      setTimeout(() => setModsPath("xxxx"), 2000);
    }
  }, []);

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-10">
          {modsPath &&
            <ModsPath
              initialValue={modsPath}
              check={check}
            />
          }
        </div>
        <div className="col-2">
          <Form.Select aria-label="Language">
            <option value="en">EN</option>
            <option value="tr">TR</option>
          </Form.Select>
        </div>
      </div>
    </div>
  );
}
