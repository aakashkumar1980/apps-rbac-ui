import React, { useState } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Modal'
import Modal, { showModal, closeModal } from '../Modal';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

function CreateApp() {
  const [appData, setAppData] = useState({ code: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new APP
    axios.post(`http://localhost:${backendServerPort}/api/app`, appData)
      .then((response) => {
        console.log('App created:', response.data);
        showModal("Result", "App created successfully");
        
        setTimeout(() => {
          closeModal();

          setAppData({ code: '', description: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "App created failed with the following error: "+error);
        console.error('Error creating app:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create - App</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={appData.code}
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
                            value={appData.description}
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
export default CreateApp;
