import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

interface Feature {
  code: string;
  description: string;
  appCode: string;
  appDescription: string;
}

function FeatureList() {
  const [feature, setFeature] = useState<Feature[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/feature`).then((response) => {
      setFeature(response.data);
    });
  }, []);

  const handleDelete = (code: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${backendServerPort}/api/feature/${code}`)
      .then((response) => {
        // Remove the deleted feature from the state
        setFeature(feature.filter((feature) => feature.code !== code));
      })
      .catch((error) => {
        console.error('Error deleting Feature:', error);
      });
  };

  return (
    <div className='container'>
      <div className="text container-table">List - Features</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>App</th>
            <th>Description<br/><p>(Code)</p></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {feature.map((feature) => (
            <tr key={feature.code}>
              <td>{feature.appDescription}</td>
              <td>{feature.description}<br/><p>({feature.code})</p></td>
              <td><button className="button-62" onClick={() => handleDelete(feature.code)}>Delete</button></td>
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

export default FeatureList;
