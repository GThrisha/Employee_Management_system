import React,{useEffect, useState} from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

const EmployeeListComponent = () => {

  const [employees,setEmployees]=useState([]);
  useEffect(()=>{
    getAllEployees();
  },[])

const getAllEployees=()=>{
  EmployeeService.getAllEployees().then((response)=>{
    setEmployees(response.data)
    console.log(response.data)
  }).catch(err=>{
    console.log(err)
  })

}

  const deleteEmployee=(employeeId)=>{
    EmployeeService.deleteEmployee(employeeId).then(()=>{
        getAllEployees();
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <Link to="/add-employee" className='btn btn-primary'> Add Employee</Link>
      <table className='table table-bordered'>
        <thead>
          <th>Employee Id</th>
          <th>Employee First Name</th>
          <th>Employee Last Name</th>
          <th>Employee Email Id</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            employees.map(employee=> <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.emailId}</td>
              <td>
                <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>
                <button className='btn btn-danger' onClick={()=>deleteEmployee(employee.id)} style={{marginLeft:"10px"}}>Delete</button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
      
    </div>
  )
}

export default EmployeeListComponent
