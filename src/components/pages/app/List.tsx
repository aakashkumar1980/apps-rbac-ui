import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Table.css';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

interface App {
  code: string;
  description: string;
}

function AppList() {
  const [app, setApp] = useState<App[]>([]);

  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/app`).then((response) => {
      setApp(response.data);
    });
  }, []);

  const handleDelete = (code: string) => {
    // Send a DELETE request to delete the APP with the given code
    axios.delete(`http://localhost:${backendServerPort}/api/app/${code}`)
      .then((response) => {
        // Remove the deleted app from the state
        setApp(app.filter((app) => app.code !== code));
      })
      .catch((error) => {
        console.error('Error deleting app:', error);
      });
  };

  return (
    <div className='container'>
      <div className="text container-table">List - Apps</div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Description<br/><p>(Code)</p></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {app.map((app) => (
            <tr key={app.code}>
              <td>{app.description}<br/><p>({app.code})</p></td>
              <td><button className="button-62" onClick={() => handleDelete(app.code)}>Delete</button></td>
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

export default AppList;
