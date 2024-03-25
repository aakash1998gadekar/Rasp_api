export const getAllStudents = async () => {
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
    const studentsData = jsonData.resource;
    return studentsData;
    //   const data = await response.json();
    //   setStudents(data);
    //   setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const addOneStudent = async (st) => {
  console.log(st)
  try {
    const params = new URLSearchParams();
    // JSON object
// const jsonObj = {"student_name":st.student_name,"student_batch_id":st.student_batch_id,"student_email_id":st.student_email_id,"student_phone_number":st.student_phone_number,"student_roll_number":st.student_roll_number};
// const jsonObj ={"student_name":"Aakash Gadekar Aakash","student_batch_id":"b7578632-cf6b-41ed-a2ac-2e47d5e3edef-10","student_email_id":"aakash1998gadekar@gmail.com","student_phone_number":"07000568809","student_roll_number":"ug"}
// const jsonObj ={student_name: 'scfds', student_batch_id: 'dvs', student_email_id: 'dsv@gmail', student_phone_number: 'esfef', student_roll_number: '3234'}
const jsonObj=st;
// Convert JSON object to string
const jsonString = JSON.stringify(jsonObj);

// Encode string to Base64
const base64Encoded = btoa(jsonString);

console.log(`Base Encoding of adding student: ${base64Encoded}`);


    params.append(
      "resource",
      base64Encoded
    );
    params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");

    const response = await fetch("api/student?" + params.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    
    

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const getAllBatches = async () => {
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
    const batches = jsonData.resource;
    return batches;
    //   const data = await response.json();
    //   setStudents(data);
    //   setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const addOneBatch = async (batch) => {
  console.log(batch)
  try {
    const params = new URLSearchParams();
   
const jsonObj=batch;
// Convert JSON object to string
const jsonString = JSON.stringify(jsonObj);
// console.log(jsonString);

// Encode string to Base64
const base64Encoded = btoa(jsonString);

console.log(`Base Encoding of adding batch: ${base64Encoded}`);


    params.append(
      "resource",
      base64Encoded
    );
    params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");

    const response = await fetch("api/batch?" + params.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log(response);
    
    

  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const updateOrDeleteStudent = async (studentId, newData, action) => {
  try {
    const params = new URLSearchParams();
    params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    params.append("action", action); // Set the action based on input

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    const base64EncodedData = action === "DELETE" ? btoa(studentId) : btoa(JSON.stringify(newData));

    params.append("resource", base64EncodedData);

    const response = await fetch(`api/student?${params.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to ${action === "DELETE" ? "delete" : "update"} student.`);
    }

    // Optionally, you can handle the response according to your requirements
  } catch (error) {
    console.error(`Error ${action === "DELETE" ? "deleting" : "updating"} student:`, error);
    throw error;
  }
};

export const deleteOneStudent = async (studentId) => {
  try {
    const params = new URLSearchParams();
    params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    params.append("action", "DELETE"); // Indicate the action as DELETE
 
    const base64EncodedId = btoa(studentId); // Encode the student ID to base64
 
    params.append("resource", base64EncodedId); // Set the resource parameter to the encoded ID
 
    const response = await fetch(`api/student?${params.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
 
    if (!response.ok) {
      throw new Error("Failed to delete student.");
    }
 
    // Optionally, you can handle the response according to your requirements
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
