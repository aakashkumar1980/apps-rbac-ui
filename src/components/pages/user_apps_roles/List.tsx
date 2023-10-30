import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

interface UserAppsRoles {
  email: string;
  appCode: string;
  appDescription: string;  
  roleCode: string;
  roleDescription: string;
}

function UserAppsRolesList() {
  const [userAppsRoles, setUserAppsRoles] = useState<UserAppsRoles[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/user_apps_roles`).then((response) => {
      setUserAppsRoles(response.data);
    });
  }, []);

  const handleDelete = (email: string, appCode: string, roleCode: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${backendServerPort}/api/user_apps_roles/${email}/${appCode}/${roleCode}`)
      .then((response) => {
        // Remove the deleted userAppsRoles from the state
        setUserAppsRoles(userAppsRoles.filter((userAppsRoles) => userAppsRoles.email !== email));
        setUserAppsRoles(userAppsRoles.filter((userAppsRoles) => userAppsRoles.appCode !== appCode));
        setUserAppsRoles(userAppsRoles.filter((userAppsRoles) => userAppsRoles.roleCode !== roleCode));
      })
      .catch((error) => {
        console.error('Error deleting UserAppsRoles:', error);
      });
  };  

  return (
    <div className='container'>
      <div className="text container-table">List - Users :: Apps :: Roles</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{width: '40%'}}>User Email</th>
            <th>Apps</th>
            <th>Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userAppsRoles.map((userAppsRoles) => (
            <tr key={`${userAppsRoles.email}-${userAppsRoles.appCode}-${userAppsRoles.roleCode}`}>
              <td  style={{width: '30%'}}>{userAppsRoles.email}</td>
              <td>{userAppsRoles.appDescription}</td>
              <td>{userAppsRoles.roleDescription}</td>
              <td><button className="button-62" onClick={() => handleDelete(userAppsRoles.email, userAppsRoles.appCode, userAppsRoles.roleCode)}>Delete</button></td>
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

export default UserAppsRolesList;
