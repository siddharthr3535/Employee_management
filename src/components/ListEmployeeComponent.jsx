import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom'; // Import useHistory
const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate(); // Get the history object
    useEffect(() => {
        EmployeeService.getEmployees().then((res) => {
            setEmployees(res.data);
        });
    }, []);
    const addEmployee = () => {
        navigate('/add-employee')
    }
    const editEmployee = (id) => {
        navigate(`/update-employee/${id}`)
    }
    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(() => {
                // Filter out the deleted employee from the employees list
                setEmployees(employees.filter(employee => employee.id !== id));
                // Navigate back to the employee list
                navigate("/employees");
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
            });

    }

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`)
    }
    return (
        <div>
            <h2 className='text-center'>Employee List</h2>
            {/* <div className='row'> */}
            <button className='btn btn-primary' onClick={addEmployee}>Add Employee</button>
            {/* </div> */}
            <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Employee first name</th>
                            <th>Employee last name</th>
                            <th>Employee email id</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <button onClick={() =>
                                                editEmployee(employee.id)}
                                                className="btn btn-info"
                                            >Update</button>
                                            <button style={{ marginLeft: 10 }} onClick={() =>
                                                deleteEmployee(employee.id)}
                                                className="btn btn-danger"
                                            >Delete</button>
                                            <button style={{ marginLeft: 10 }} onClick={() =>
                                                viewEmployee(employee.id)}
                                                className="btn btn-info"
                                            >View</button>
                                        </td>

                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ListEmployeeComponent