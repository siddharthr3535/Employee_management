import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployeeComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Access the id parameter
    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[emailId,setEmailId] = useState('');
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value)
    }
    const changeLastNameHandler = (event) => {
        setLastName(event.target.value)
    }
    const changeEmailIdHandler = (event) =>{
        setEmailId(event.target.value)
    }
    const saveEmployee = (e) => {
        e.preventDefault()
        let employee = {firstName:firstName,lastName:lastName,emailId:emailId};
        console.log("employe dargesh " , JSON.stringify(employee))
        EmployeeService.updateEmployee(employee,id).then(res=>navigate("/employees"));
    }
    const cancel = () => {
        navigate('/employees')
    }
    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            let employee = res.data;
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmailId(employee.emailId);
        });
    }, []);
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update Employee</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>First Name: </label>
                                <input placeholder='Enter firstname' name="firstName" className='form-control' value={firstName} onChange={changeFirstNameHandler}/>

                            </div>
                            <div className='form-group'>
                                <label>Last Name: </label>
                                <input placeholder='Enter lastname' name="lastName" className='form-control' value={lastName} onChange={changeLastNameHandler}/>

                            </div>
                            <div className='form-group'>
                                <label>Email ID: </label>
                                <input placeholder='Enter email id' name="emailId" className='form-control' value={emailId} onChange={changeEmailIdHandler}/>

                            </div>
                            <button className='btn btn-success' onClick={saveEmployee}>Save</button>
                            <button className='btn btn-danger' onClick={cancel} style={{marginLeft:"10px"}}>cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateEmployeeComponent