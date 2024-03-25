import React, { useState } from "react";
import { addOneBatch } from "../apis/backend";
import { useNavigate } from "react-router-dom";

export const Batch = () => {
    const navigate = useNavigate();
  const [batchData, setBatchData] = useState({ name: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    addOneBatch(batchData);
    navigate('/');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center "
      >
        <h3 className="m-4">Batch</h3>
        <div className="my-4 d-flex w-40 align-items-center">
          <label htmlFor="name" className="me-2 w-50">
            Batch Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="p-2 form-control w-100 text-uppercase"
            onChange={(e) =>
              setBatchData({ ...batchData, [e.target.name]: e.target.value.toUpperCase() })
            }
          />
        </div>
        <div className="d-flex  justify-content-center">

        <button type="submit" className="btn btn-primary ms-4">
            Create Batch
        </button>
        <button type="cancel" className="btn btn-secondary ms-4" onClick={()=>{navigate('/')}}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};
