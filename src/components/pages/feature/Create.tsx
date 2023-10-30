import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Modal'
import '../Select.css';
import Modal, { showModal, closeModal } from '../Modal';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

interface App {
  code: string;
  description: string;
}
function CreateFeature() {
  const [featureData, setFeatureData] = useState({code: '', description: '', appCode: ''});

  const [app, setApp] = useState<App[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>(''); // Initialize as an empty string
  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/app`).then((response) => {
      setApp(response.data);
    });
  }, []);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeatureData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new APP
    const createData = {
      ...featureData,
      appCode: selectedApp,
    };    
    debugger;
    axios.post(`http://localhost:${backendServerPort}/api/feature`, createData)
      .then((response) => {
        console.log('Feature created:', response.data);
        showModal("Result", "Feature created successfully");
        
        setTimeout(() => {
          closeModal();
          setFeatureData({ code: '', description: '', appCode: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "Feature created failed with the following error: "+error);
        console.error('Error creating Feature:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create - Feature</div>
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
                            value={featureData.code}
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
                            value={featureData.description}
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
export default CreateFeature;
