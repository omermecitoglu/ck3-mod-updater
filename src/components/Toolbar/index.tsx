import Form from "react-bootstrap/Form";
import React from "react";

export default function Toolbar() {
  return (
    <div className="p-3">
      <div className="row">
        <div className="col-10">
          <Form.Control type="text" placeholder="Mods Folder" />
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
