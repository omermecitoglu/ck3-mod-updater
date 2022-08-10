import Form from "react-bootstrap/Form";
import React, { ChangeEvent, useState } from "react";

type LanguageProps = {
  initialValue: string,
  check: () => Promise<void>,
};

export default function Language({
  initialValue,
  check,
}: LanguageProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (window.electronAPI) {
      const result = await window.electronAPI.setLanguage(e.target.value);
      if (result) await check();
    }
  };

  return (
    <Form.Select
      aria-label="Language"
      value={value}
      onChange={handleChange}
    >
      <option value="en">EN</option>
      <option value="tr">TR</option>
    </Form.Select>
  );
}
