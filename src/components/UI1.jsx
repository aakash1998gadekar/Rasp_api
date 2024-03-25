import "../App.css";
import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
// import { baseURL } from "../utils/constants";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getAllStudents,
  addOneStudent,
  getAllBatches,
  updateOrDeleteStudent,
  deleteOneStudent,
} from "../apis/backend";
import "bootstrap/dist/css/bootstrap.min.css";

const UI1 = ({ data }) => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchName, setBatchName] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [stData, setStData] = useState({
    student_name: "",
    student_batch_id: "",
    student_email_id: "",
    student_phone_number: "",
    student_roll_number: "",
  });
  // const onRowClicked = useCallback((editData) => {
  //   // navigate(`/form/${editData.id}`);
  //   console.log(`Edit row data: ${editData.data}`);
  //   // setShowTable(false);
  //   // const res =  getAllStudents();
  //   //     // Map row data to match column names
  //   //     console.log(res);
  //   //     const mappedRowData = res.map((row) => ({
  //   //       name: row.student_name,
  //   //       roll_no: row.student_roll_number,
  //   //       email_id: row.student_email_id,
  //   //       phone_no: row.student_phone_number,
  //   //       gender: "M", // This field is not present in the row data you provided
  //   //       current_in_status: "In", // This field is not present in the row data you provided
  //   //       batch_id: row.student_batch_name,
  //   //     }));
  //   //     setRowData(mappedRowData);

  //   // setStData()
  // }, []);

  const addStudent = () => {
    // navigate("/form")
    console.log("adding student");

    setShowTable(false);
    console.log(showTable);
  };
  const addBatch = () => {
    navigate("/addBatch");
    console.log("adding batch");

    // setShowTable(false);
    console.log(showTable);
  };

  // const deleteData = async (id) => {
  //   try {
  //     await axios.delete(`${baseURL}/api/${id}`);

  //     // If deletion is successful, update the state (rowData)
  //     const res = await axios.get(`${baseURL}/api`);
  //     setRowData(res.data.data);
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //     // Handle error as needed (e.g., show a notification)
  //   }
  // };
  // const actionButtons = (params) => {
  //   const value = params.data; // Access row data
  //   console.log("value", value);
  //   if (!value) {
  //     return <div>Loading...</div>; // Display loading indicator while data fetches
  //   }
  //   return (
  //     <div>
  //       <button
  //         className="Edit-btn"
  //         onClick={() => onRowClicked(value)} // Pass row data to onRowClicked
  //       >
  //         Edit
  //       </button>
  //       <button className="Delete-btn" onClick={() => deleteData(value.id)}>
  //         Delete
  //       </button>
  //     </div>
  //   );
  // };
  const myButton1 = (props) => {
    const myClickEdit = () => {
      console.log("Row Data EDIT: ", props.data);
      setShowTable(false); // Hide the table
      setStData({
        student_name: props.data.name,
        student_batch_id: props.data.batch_id,
        student_email_id: props.data.email_id,
        student_phone_number: props.data.phone_no,
        student_roll_number: props.data.roll_no,
        
        // ...props.data, // Spread existing data to retain other keys
        id: props.data.id, // Add the id key
      });
      setSelectedBatch(props.data.batch_id);
      const selectedBatchName = batches.find(batch => batch.id === stData.student_batch_id)?.name;
        setBatchName(selectedBatchName);
        console.log("My default selected Batch: ", selectedBatchName);

    };
    const myClickDelete = async () => {
      console.log("Row Data DELTE: ", props.data);
      try {
        // const res = await deleteOneStudent(props.data);
        // console.log("Response after delete: ", res);
        const res = await updateOrDeleteStudent(props.data.id, props.data, "DELETE");
        console.log("Response after delete: ", res);
        await fetchData(); // Fetch updated data after deletion
      } catch (error) {
        console.error("Error deleting data:", error);
        // Handle error as needed
      }
    };
    return (
      <>
        <button className="btn btn-primary" onClick={myClickEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={myClickDelete}>
          Delete
        </button>
      </>
    );
  };

  useEffect(() => {
    if (stData.id) {
      setSelectedBatch(stData.student_batch_id); // Set selected batch if editing
    }
  }, [stData.id]);

  useEffect(() => {
    return () => {
      const headers = data.list.fields.map(
        (col) => {
          if (col.name === "id") {
            return {
              field: col.name,
              headerName: col.heading,
              sortable: col.sortable,
              flex: 1,
              hide: true,
            };
          } else {
            return {
              field: col.name,
              headerName: col.heading,
              sortable: col.sortable,
              flex: 1,
            };
          }
        },
        [data]
      );

      setColDefs([
        ...headers,
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          // cellRenderer: actionButtons,
          cellRenderer: myButton1,
        },
      ]);
      // eslint-disable-next-line
    };
  }, []);

  //fetch data
  const fetchData = async () => {
    try {
      const res = await getAllStudents();
      // Map row data to match column names
      console.log(res);
      const mappedRowData = res.map((row) => ({
        id: row.id,
        name: row.student_name,
        roll_no: row.student_roll_number,
        email_id: row.student_email_id,
        phone_no: row.student_phone_number,
        gender: "M", // This field is not present in the row data you provided
        current_in_status: "In", // This field is not present in the row data you provided
        batch_id: row.student_batch_name,
      }));
      setRowData(mappedRowData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Handle error as needed (e.g., show a notification)
    }
  };
  useEffect(() => {
    //
    // Fetch data when the component mounts
    fetchData();
    // addStudent(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(showTable);
  //   setShowTable(true);
  //   addOneStudent(stData);
  //   console.log(stData);
  //   await fetchData();
  //   // console.log(stData)
  //   // Handle form submission here
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Editing data main:", stData);
      setShowTable(true); // Show the table after submission
      if (stData.id) {
        // If stData.id exists, it means we're editing an existing student
        await updateOrDeleteStudent(stData.id, stData, "MODIFY");
      } else {
        // If stData.id doesn't exist, it means we're adding a new student
        await addOneStudent(stData);
      }
      // setShowTable(true)
      await fetchData(); // Fetch updated data
    } catch (error) {
      console.error("Error handling form submission:", error);
      // Handle error as needed
    }
  };

  // Fetch batches from the API
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await getAllBatches();
        
        // const res = [
        //   {
        //     id: "8384cd78-129d-4267-8324-d3ecb61590a5-64",
        //     g_created_by_id: "admin@rasp.com",
        //     g_created_by_name: "Super Admin",
        //     g_creation_time: 1710913046727,
        //     g_soft_delete: "N",
        //     name: "IMT2022",
        //   },
        //   {
        //     id: "b7578632-cf6b-41ed-a2ac-2e47d5e3edef-10",
        //     g_created_by_id: "admin@rasp.com",
        //     g_created_by_name: "Super Admin",
        //     g_creation_time: 1710755824100,
        //     g_soft_delete: "N",
        //     name: "IMT2023",
        //     is_active: "TRUE",
        //   },
        // ];
        console.log("batches", res);
        setBatches(res);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchBatches();
  }, []);

  // Function to handle batch selection
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    setStData({ ...stData, [event.target.name]: event.target.value });
    console.log(`Selected Batch: ${JSON.stringify(event.target.value)}`);
    console.log(`form data: ${stData.student_batch_id}`);
  };

  return (
    // wrapping container with theme & size
    <>
      {showTable ? (
        <div
          className="ag-theme-quartz App"
          style={{ width: "100%", height: "500px" }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
          <div className="d-flex  justify-content-around my-4">
            <button className="btn btn-info" onClick={addStudent}>
              Add New Student
            </button>
            <button className="btn btn-secondary" onClick={addBatch}>
              Add New Batch
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column  gap-4 w-50"
        >
          <div className="form-group d-flex flex-column gap-2">
            <label htmlFor="student_name">Name:</label>
            <input
              type="text"
              className="form-control "
              id="student_name"
              name="student_name"
              value={stData.student_name}
              onChange={(e) =>
                setStData({ ...stData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group d-flex gap-4 align-items-center ">
            <label htmlFor="student_batch_id ">Select Batch</label>
            <select
              className="border d-flex justify-content-center p-2 w-50 "
              id="student_batch_id"
              name="student_batch_id"
              value={selectedBatch}
              // value={stData.student_batch_id}
              onChange={handleBatchChange}
            >
              <option value="">Select a Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group d-flex flex-column gap-2">
            <label htmlFor="student_email_id">Email:</label>
            <input
              type="email"
              className="form-control"
              id="student_email_id"
              name="student_email_id"
              value={stData.student_email_id}
              onChange={(e) =>
                setStData({ ...stData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group d-flex flex-column gap-2">
            <label htmlFor="student_phone_number">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              id="student_phone_number"
              name="student_phone_number"
              value={stData.student_phone_number}
              onChange={(e) =>
                setStData({ ...stData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group d-flex flex-column gap-2">
            <label htmlFor="student_roll_number">Roll Number:</label>
            <input
              type="text"
              className="form-control"
              id="student_roll_number"
              name="student_roll_number"
              value={stData.student_roll_number}
              onChange={(e) =>
                setStData({ ...stData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <button
              onClick={() => {
                setShowTable(true);
              }}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UI1;
