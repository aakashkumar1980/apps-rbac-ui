import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const privilegePassBackendPort = process.env.REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND;

interface RoleAppFeatures {
  roleCode: string;
  roleDescription: string;  
  appDescription: string;
  appFeaturesCode: string;
  appFeaturesDescription: string;
}

function RoleAppFeaturesList() {
  const [roleAppFeatures, setRoleAppFeatures] = useState<RoleAppFeatures[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/role_app_features`).then((response) => {
      setRoleAppFeatures(response.data);
    });
  }, []);

  const handleDelete = (roleCode: string, appFeaturesCode: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${privilegePassBackendPort}/api/role_app_features/${roleCode}/${appFeaturesCode}`)
      .then((response) => {
        // Remove the deleted roleAppFeatures from the state
        setRoleAppFeatures(roleAppFeatures.filter((roleAppFeatures) => roleAppFeatures.roleCode !== roleCode));
        setRoleAppFeatures(roleAppFeatures.filter((roleAppFeatures) => roleAppFeatures.appFeaturesCode !== appFeaturesCode));
      })
      .catch((error) => {
        console.error('Error deleting roleAppFeatures:', error);
      });
  };  

  return (
    <div className='container'>
      <div className="text container-table">Role App Features List</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Role</th>
            <th style={{width:"50%"}}>(App) App Features</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roleAppFeatures.map((roleAppFeatures) => (
            <tr key={`${roleAppFeatures.roleCode}-${roleAppFeatures.appFeaturesCode}`}>
              <td>{roleAppFeatures.roleDescription}</td>
              <td style={{width:"50%"}}>({roleAppFeatures.appDescription}) {roleAppFeatures.appFeaturesDescription}</td>
              <td><button className="button-62" onClick={() => handleDelete(roleAppFeatures.roleCode, roleAppFeatures.appFeaturesCode)}>Delete</button></td>
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

export default RoleAppFeaturesList;
