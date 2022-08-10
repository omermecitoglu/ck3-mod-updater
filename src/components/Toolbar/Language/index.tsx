import Form from "react-bootstrap/Form";
import React, { ChangeEvent, useState } from "react";
import i18n from "~/core/i18n";
import { useTranslation, withTranslation } from "react-i18next";

type LanguageProps = {
  initialValue: string,
  check: () => Promise<void>,
};

function Language({
  initialValue,
  check,
}: LanguageProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setValue(language);
    i18n.changeLanguage(language);
    if (window.electronAPI) {
      const result = await window.electronAPI.setLanguage(language);
      if (result) await check();
    }
  };

  return (
    <Form.Select
      aria-label={t("app.settings.language")}
      value={value}
      onChange={handleChange}
    >
      <option value="en">EN</option>
      <option value="tr">TR</option>
    </Form.Select>
  );
}

export default withTranslation()(Language);
