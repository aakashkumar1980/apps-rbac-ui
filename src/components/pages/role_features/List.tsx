import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

interface RoleFeatures {
  roleCode: string;
  roleDescription: string;  
  appDescription: string;
  featureCode: string;
  featureDescription: string;
}

function RoleFeaturesList() {
  const [roleFeatures, setRoleFeatures] = useState<RoleFeatures[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/role_features`).then((response) => {
      setRoleFeatures(response.data);
    });
  }, []);

  const handleDelete = (roleCode: string, featureCode: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${backendServerPort}/api/role_features/${roleCode}/${featureCode}`)
      .then((response) => {
        // Remove the deleted roleFeatures from the state
        setRoleFeatures(roleFeatures.filter((roleFeatures) => roleFeatures.roleCode !== roleCode));
        setRoleFeatures(roleFeatures.filter((roleFeatures) => roleFeatures.featureCode !== featureCode));
      })
      .catch((error) => {
        console.error('Error deleting roleFeatures:', error);
      });
  };  

  return (
    <div className='container'>
      <div className="text container-table">List - Roles :: Features</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Role</th>
            <th style={{width:"50%", textAlign:"center"}} colSpan={2}>Feature <p>(App)</p></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roleFeatures.map((roleFeatures) => (
            <tr key={`${roleFeatures.roleCode}-${roleFeatures.featureCode}`}>
              <td>{roleFeatures.roleDescription}</td>
              <td style={{width:"30%"}}>{roleFeatures.featureDescription}</td><td style={{width:"30%"}}><p>({roleFeatures.appDescription})</p></td>
              <td><button className="button-62" onClick={() => handleDelete(roleFeatures.roleCode, roleFeatures.featureCode)}>Delete</button></td>
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

export default RoleFeaturesList;
