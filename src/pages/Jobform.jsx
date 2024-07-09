import React, { useState, useEffect } from "react"
import toast from "../components/Toast/index";
import AuthUser from "../components/AuthUser";
const Jobform = () => {
    const { http} = AuthUser();

    const [job,setJob] = useState();
    console.log("job",job)
    const handleChange = (e) => {
        setJob((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };

      const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);
      const submitForm = async () => {
        try {
            const res = await http.post('/addJob', job);
            console.log("res",res)
            if (res?.status === 201) {
                notify("success", "Successfully logged in");
                
            } else {
                notify("error", "Something went wrong");
            }
        } catch (error) {
            notify("error", "Something went wrong: " + error.message);
        }
    }
  return (
    <>
    <div>Jobform</div>
    <div className="col-sm-6  offset-sm-3">
        <br />
        <input className='form-control' onChange={handleChange} type="text" name="dept" id="dept" placeholde="Enter the dept" /> <br />
        <input className='form-control' onChange={handleChange} type="text" name="category" id="category" placeholde="Enter the category" /><br />
        <input className='form-control' onChange={handleChange} type="number" name="vacancy" id="vacancy" placeholde="Enter the vacancy" /><br />
        <button  className="btn btn-primary" onClick={submitForm} type="button">Add job</button><br />
    </div>
    
    </>
  )
}

export default Jobform