import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const privilegePassBackendPort = process.env.REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND;

interface EmployeeAppsRoles {
  email: string;
  appCode: string;
  appDescription: string;  
  roleCode: string;
  roleDescription: string;
}

function EmployeeAppsRolesList() {
  const [employeeAppsRoles, setEmployeeAppsRoles] = useState<EmployeeAppsRoles[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/employee_apps_roles`).then((response) => {
      setEmployeeAppsRoles(response.data);
    });
  }, []);

  const handleDelete = (email: string, appCode: string, roleCode: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${privilegePassBackendPort}/api/employee_apps_roles/${email}/${appCode}/${roleCode}`)
      .then((response) => {
        // Remove the deleted employeeAppsRoles from the state
        setEmployeeAppsRoles(employeeAppsRoles.filter((employeeAppsRoles) => employeeAppsRoles.email !== email));
        setEmployeeAppsRoles(employeeAppsRoles.filter((employeeAppsRoles) => employeeAppsRoles.appCode !== appCode));
        setEmployeeAppsRoles(employeeAppsRoles.filter((employeeAppsRoles) => employeeAppsRoles.roleCode !== roleCode));
      })
      .catch((error) => {
        console.error('Error deleting employeeAppsRoles:', error);
      });
  };  

  return (
    <div className='container'>
      <div className="text container-table">Employee Apps Roles</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{width: '40%'}}>Employee Email</th>
            <th>Apps</th>
            <th>Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeeAppsRoles.map((employeeAppsRoles) => (
            <tr key={`${employeeAppsRoles.email}-${employeeAppsRoles.appCode}-${employeeAppsRoles.roleCode}`}>
              <td  style={{width: '40%'}}>{employeeAppsRoles.email}</td>
              <td>{employeeAppsRoles.appDescription}</td>
              <td>{employeeAppsRoles.roleDescription}</td>
              <td><button className="button-62" onClick={() => handleDelete(employeeAppsRoles.email, employeeAppsRoles.appCode, employeeAppsRoles.roleCode)}>Delete</button></td>
            </tr>
          ))}
          <tr>
            <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeAppsRolesList;
