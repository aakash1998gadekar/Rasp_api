import '../App.css'
import React from "react";
import FormInput from "./FormInput";
const dataJson = require("../student.json");

const Form = () => {
  return (
    <div className="App">
      <form action="submit" className="form-container">
        {dataJson.form.blocks[0].fields.map((data) => {
          return <FormInput key={data._id} data={data} />;
        })}
        <div className="form-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
