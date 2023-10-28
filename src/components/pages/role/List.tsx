import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const privilegePassBackendPort = process.env.REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND;

interface Role {
  code: string;
  description: string;
}

function RoleList() {
  const [role, setRole] = useState<Role[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/role`).then((response) => {
      setRole(response.data);
    });
  }, []);

  const handleDelete = (code: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${privilegePassBackendPort}/api/role/${code}`)
      .then((response) => {
        // Remove the deleted role from the state
        setRole(role.filter((role) => role.code !== code));
      })
      .catch((error) => {
        console.error('Error deleting role:', error);
      });
  };

  return (
    <div className='container'>
      <div className="text container-table">Role List</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Description<br/><p>(Code)</p></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {role.map((role) => (
            <tr key={role.code}>
              <td>{role.description}<br/><p>({role.code})</p></td>
              <td><button className="button-62" onClick={() => handleDelete(role.code)}>Delete</button></td>
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

export default RoleList;