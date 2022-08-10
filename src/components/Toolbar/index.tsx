import Language from "./Language";
import ModsPath from "./ModsPath";
import React, { useEffect, useState } from "react";

type ToolbarProps = {
  check: () => Promise<void>,
};

export default function Toolbar({
  check,
}: ToolbarProps) {
  const [modsPath, setModsPath] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getModsPath().then(setModsPath).catch(e => alert(e.message));
      window.electronAPI.getLanguage().then(setLanguage).catch(e => alert(e.message));
    } else {
      setTimeout(() => {
        setModsPath("xxxx");
        setLanguage("en");
      }, 2000);
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
          {language &&
            <Language
              initialValue={language}
              check={check}
            />
          }
        </div>
      </div>
    </div>
  );
}
