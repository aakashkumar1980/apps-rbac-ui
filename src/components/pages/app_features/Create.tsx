import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Modal'
import '../Select.css';
import Modal, { showModal, closeModal } from '../Modal';

const privilegePassBackendPort = process.env.REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND;

interface App {
  code: string;
  description: string;
}
function CreateAppFeatures() {
  const [appFeaturesData, setAppFeaturesData] = useState({code: '', description: '', appCode: ''});

  const [app, setApp] = useState<App[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>(''); // Initialize as an empty string
  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/app`).then((response) => {
      setApp(response.data);
    });
  }, []);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppFeaturesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new APP
    const createData = {
      ...appFeaturesData,
      appCode: selectedApp,
    };    
    debugger;
    axios.post(`http://localhost:${privilegePassBackendPort}/api/app_features`, createData)
      .then((response) => {
        console.log('App created:', response.data);
        showModal("Result", "App created successfully");
        
        setTimeout(() => {
          closeModal();
          setAppFeaturesData({ code: '', description: '', appCode: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "App created failed with the following error: "+error);
        console.error('Error creating app:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create App Features</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                      <select className="classic" value={selectedApp} onChange={(e) => setSelectedApp(e.target.value)}>
                        <option value="">SELECT AN  APP...</option>
                        {app.map((app) => (
                          <option key={app.code} value={app.code}>
                            {app.description}
                          </option>
                        ))}
                      </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={appFeaturesData.code}
                            onChange={handleChange}
                        />
                        <div className="underline"></div>
                        <label htmlFor="code">Code:</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={appFeaturesData.description}
                            onChange={handleChange}
                        />
                        <div className="underline"></div>
                        <label htmlFor="description">Description:</label>
                    </div>
                </div>
                <div className="submit-btn input-data">
                    <input type="submit" className="link-1" value="submit"/>
                </div>
            </form>

            <Modal />
        </div>

  );
}
export default CreateAppFeatures;
