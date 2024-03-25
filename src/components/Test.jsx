import React, { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData();()
    // login();
    // getAllStudents();
    addBatch();
    getAllBatch();
    // addStudent();
    
  }, []);

  const login = async () => {
    try {
      const params = new URLSearchParams();
      //   params.append('queryId', 'GET_ALL');
      //   params.append('session_id', 'c64e3bda-7205-4a63-ac37-2d14ab7474bd-15');
      params.append(
        "resource",
        "eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ=="
      );

      const response = await fetch("api/login?" + params.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.resource[0].id);
      //   const data = await response.json();
      //   setStudents(data);
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllStudents = async () => {
    try {
      const params = new URLSearchParams();
      params.append("queryId", "GET_ALL");
      params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
      // params.append('resource', 'eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ==');

      const response = await fetch("api/student?" + params.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.resource);
      //   const data = await response.json();
      //   setStudents(data);
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllBatch = async () => {
    try {
      const params = new URLSearchParams();
      params.append("queryId", "GET_ALL");
      params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
      // params.append('resource', 'eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ==');

      const response = await fetch("api/batch?" + params.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.resource);
      //   const data = await response.json();
      //   setStudents(data);
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addStudent = async () => {
    try {
      const params = new URLSearchParams();

      params.append(
        "resource",
        "eyJzdHVkZW50X25hbWUiOiJEdW1teSIsInN0dWRlbnRfYmF0Y2hfaWQiOiJiNzU3ODYzMi1jZjZiLTQxZWQtYTJhYy0yZTQ3ZDVlM2VkZWYtMTAiLCJzdHVkZW50X2VtYWlsX2lkIjoiZHVtbXlAZ21haWwuY29tIiwic3R1ZGVudF9waG9uZV9udW1iZXIiOiIxMjM0NTY3ODkwIiwic3R1ZGVudF9yb2xsX251bWJlciI6IklNVDIwMjMwMDEifQ=="
      );
      params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
      // params.append('resource', 'eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ==');

      const response = await fetch("api/student?" + params.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.resource[0]);
      //   const data = await response.json();
      //   setStudents(data);
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const addBatch = async () => {
    try {
      const params = new URLSearchParams();
      params.append(
        "resource",
        "eyJuYW1lIjoiSU1UMjAyMiJ9"
      );
      params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
      // params.append('resource', 'eyJlbWFpbF9pZCI6ImFkbWluQHJhc3AuY29tIiwicGFzc3dvcmQiOiJhZG1pbkAxMjMifQ==');

      const response = await fetch("api/student?" + params.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.resource[0]);
      //   const data = await response.json();
      //   setStudents(data);
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Students</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.grade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
