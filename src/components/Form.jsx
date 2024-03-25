import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import FormInput from "./FormInput";
import { baseURL } from "../utils/constants";
import FormContext from "../context/FormContext";
import { useNavigate, useParams } from "react-router-dom";

const dataJson = require("../student.json");
const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
 
  const handleDataChange = (newData) => {
    setFormData(newData); // Update local state
    if (newData.batch_id !== undefined) {
      const batch = parseInt(newData.batch_id);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      setFormData({
        // Update formData with new key-value pair
        ...newData,
        current_in_status: batch + 4 >= currentYear ? "In" : "Out",
        id: newData.roll_no + newData.batch_id,
      });
    }
  };

 
  console.log(" form data ", formData);
  console.log(
    "My form data which is want to send to server",
    JSON.stringify(formData)
  );
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Editing an existing article
        const response = await axios.put(`${baseURL}/api/${id}`, formData);
        console.log("Data updated successfully:", response.data);
      } else {
        // Creating a new article
        console.log("Sending new data to server");
        const response = await axios.post(`${baseURL}/api`, formData);
        console.log("Data sent successfully:", response.data);
      }

      // Move navigation outside conditional blocks
      navigate("/");
    } catch (error) {
      console.error("Error submitting Article:", error);
    }
  };

 
  return (
    <>
      <FormContext.Provider value={{ formData, handleDataChange }}>
        <div className="App">
          <form onSubmit={handleSubmit} className="form-container">
            {dataJson.form.blocks[0].fields.map((data) => (
              <FormInput key={data._id} data={data} />
            ))}
            <div className="form-btn">
              <button type="submit">Submit</button>
              <button
                type=""
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </FormContext.Provider>
    </>
  );
};

export default Form;