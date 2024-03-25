import "../App.css";
import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UI = ({ data }) => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
 
  // console.log(data.form.blocks[0].fields);
  // console.log(data.list.fields);

  //   console.log(Object.keys(data.list.fields[0]));

  const onRowClicked = useCallback((editData) => {
    // console.log(Array.isArray(editData));
    // console.log("Editing row data:", editData); // Log row data on edit
    navigate(`/form/${editData.id}`)
  }, []);


  const addStudent = () =>{
    navigate("/form")
  }


  const deleteData = async (id) => {
    try {
      // Make a DELETE request to your API endpoint
      await axios.delete(`${baseURL}/api/${id}`);
      // await axios.delete(`${baseURL}/api/${id}`
      
      // If deletion is successful, update the state (rowData)
      const res = await axios.get(`${baseURL}/api`);
    setRowData(res.data.data);
    } catch (error) {
      console.error("Error deleting data:", error);
      // Handle error as needed (e.g., show a notification)
    }
  };
  const actionButtons = (params) => {
    const value  = params.node.data; // Access row data
    if (!value) {
      return <div>Loading...</div>; // Display loading indicator while data fetches
    }
    return (
      <div>
        <button
          className="Edit-btn"
          onClick={() => onRowClicked(value)} // Pass row data to onRowClicked
        >
          Edit
        </button>
        <button className="Delete-btn" onClick={() => deleteData(value.id)}>
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      const headers = data.list.fields.map(
        (col) => {
          return {
            field: col.name,
            headerName: col.heading,
            sortable: col.sortable,
            flex: 1,
          };
        },
        [data]
      );

      setColDefs([
        ...headers,
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          cellRenderer: actionButtons,
        },
      ]);
    }}, []);
    

    useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api`);
        setRowData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed (e.g., show a notification)  
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz App" // applying the grid theme
      style={{ width: "100%", height: "500px" }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />

      <button className="student-btn" onClick={addStudent}>
        Add New Student
      </button>
    </div>
  );
};

export default UI;