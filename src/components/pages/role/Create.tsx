import React, { useState } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Modal'
import Modal, { showModal, closeModal } from '../Modal';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

function CreateRole() {
  const [roleData, setRoleData] = useState({ code: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new APP
    axios.post(`http://localhost:${backendServerPort}/api/role`, roleData)
      .then((response) => {
        console.log('Role created:', response.data);
        showModal("Result", "Role created successfully");
        
        setTimeout(() => {
          closeModal();

          setRoleData({ code: '', description: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "Role created failed with the following error: "+error);
        console.error('Error creating Role:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create - Role</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={roleData.code}
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
                            value={roleData.description}
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
export default CreateRole;
