import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModsPathProps = {
  initialValue: string,
  check: () => Promise<void>,
};

export default function ModsPath({
  initialValue,
  check,
}: ModsPathProps) {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [validation, setValidation] = useState(0);

  const commit = async (val: string) => {
    if (window.electronAPI) {
      const result = await window.electronAPI.setModsPath(val);
      setValidation(result ? 1 : -1);
      if (result) await check();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (initialized) {
      setValidation(0);
      timer = setTimeout(() => commit(value), 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [value]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <InputGroup>
      <InputGroup.Text>
        <FontAwesomeIcon icon={faFolderOpen} className="fa-fw" />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Mods Folder"
        value={value}
        onChange={handleChange}
        isValid={validation === 1}
        isInvalid={validation === -1}
      />
    </InputGroup>
  );
}
