import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const privilegePassBackendPort = process.env.REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND;

interface AppFeatures {
  code: string;
  description: string;
  appCode: string;
  appDescription: string;
}

function AppFeaturesList() {
  const [appFeatures, setAppFeatures] = useState<AppFeatures[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/app_features`).then((response) => {
      setAppFeatures(response.data);
    });
  }, []);

  const handleDelete = (code: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${privilegePassBackendPort}/api/app_features/${code}`)
      .then((response) => {
        // Remove the deleted appFeatures from the state
        setAppFeatures(appFeatures.filter((appFeatures) => appFeatures.code !== code));
      })
      .catch((error) => {
        console.error('Error deleting appFeatures:', error);
      });
  };

  return (
    <div className='container'>
      <div className="text container-table">App Features List</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>App</th>
            <th>Description<br/><p>(Code)</p></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appFeatures.map((appFeatures) => (
            <tr key={appFeatures.code}>
              <td>{appFeatures.appDescription}</td>
              <td>{appFeatures.description}<br/><p>({appFeatures.code})</p></td>
              <td><button className="button-62" onClick={() => handleDelete(appFeatures.code)}>Delete</button></td>
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

export default AppFeaturesList;
