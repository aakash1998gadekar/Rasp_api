import React, { useState, useContext, useEffect } from "react";
import '../App.css'
import FormContext  from '../context/FormContext'; 
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/constants";

const FormInput = ({data}) => {
  const { id } = useParams();
  const [component, setComponent] = useState("");

  const options = [
    { value: "1998", text: "Year 1998" },
    { value: "2017", text: "Year 2017" },
    { value: "2018", text: "Year 2018" },
    { value: "2019", text: "Year 2019" },
    
    { value: "2020", text: "Year 2020" },
    { value: "2021", text: "Year 2021" },
    { value: "2022", text: "Year 2022" },
  ];

  const { formData, handleDataChange } = useContext(FormContext); // Access context values

  const handleChange = (event) => {
    
    handleDataChange({ ...formData, [event.target.name]: event.target.value }); // Update data using context function
  };


  useEffect(() => {
    setComponent(data.component);      
    
  }, [data]); // Only run when data changes


  useEffect(()=>{
    if (id) {
      axios.get(`${baseURL}/api/${id}`)
        .then((res) => {
          handleDataChange({
            ...formData,
            // Update formData with values from API response:
            ...res.data, // Assuming res.data holds the key-value pairs
          });
          // console.log(res.data);
        })
        .catch((error) => {
          console.error('Error fetching article:', error);
        });
    }
  },[id])

  return (
    <div className="form-children" >
      <label htmlFor={data.name}>{data.label}</label>

      {component === "textbox" && (
        <input
          type={data.type}
          required={data.required}
          id={data.name}
          name={data.name}
          value={formData[data.name]}
          onChange={handleChange} // Attach handleChange for input updates
        />
      )}
      {component === "dropdown" && (
        <select name={data.name} id={data.name}  onChange={handleChange}>
          {options.map((option) => {
            return <option key={option.value} value={option.value} >{option.text} </option>;
          })}
        </select>
      )}
    </div>
  );
};

export default FormInput;