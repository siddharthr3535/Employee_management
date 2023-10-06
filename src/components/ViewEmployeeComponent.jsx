import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ViewEmployeeComponent = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setEmployee(res.data);
        });
    }, [id]);

    return (
        <div>
            <br />
            <div className='card col-md-6 offset-md-3'>
                <h3 className='card-header text-center'>Employee Details</h3>
                <div className='card-body'>
                    <div className='row'>
                        <label className='col-sm-3'>First name:</label>
                        <div className='col-sm-9'>{employee.firstName}</div>
                    </div>
                    <div className='row'>
                        <label className='col-sm-3'>Last name:</label>
                        <div className='col-sm-9'>{employee.lastName}</div>
                    </div>
                    <div className='row'>
                        <label className='col-sm-3'>Email id:</label>
                        <div className='col-sm-9'>{employee.emailId}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeComponent;
