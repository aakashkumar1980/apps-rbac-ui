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
interface Role {
  code: string;
  description: string;
}
function CreateUserAppsRoles() {
  const [userAppsRolesData, setUserAppsRolesData] = useState({email: '', appCode: '', roleCode: ''});

  const [app, setApp] = useState<App[]>([]);
  const [role, setRole] = useState<Role[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>(''); // Initialize as an empty string
  const [selectedRole, setSelectedRole] = useState<string>(''); // Initialize as an empty string
  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/app`).then((response) => {
      setApp(response.data);
    });
    axios.get(`http://localhost:${backendServerPort}/api/role`).then((response) => {
      setRole(response.data);
    });    
  }, []);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAppsRolesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new object
    const createData = {
      ...userAppsRolesData,
      appCode: selectedApp,
      roleCode: selectedRole
    };    
    debugger;
    axios.post(`http://localhost:${backendServerPort}/api/user_apps_roles`, createData)
      .then((response) => {
        console.log('User-Apps-Roles created:', response.data);
        showModal("Result", "User-Apps-Roles created successfully");
        
        setTimeout(() => {
          closeModal();
          setUserAppsRolesData({email: '', appCode: '', roleCode: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "User-Apps-Roles created failed with the following error: "+error);
        console.error('Error creating User-Apps-Roles:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create - User :: Apps :: Roles</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={userAppsRolesData.email}
                            onChange={handleChange}
                        />
                        <div className="underline"></div>
                        <label htmlFor="code">User Email:</label>
                    </div>
                </div>              
                <div className="form-row">
                    <div className="input-data">
                      <select className="classic" value={selectedApp} onChange={(e) => setSelectedApp(e.target.value)}>
                        <option value="">SELECT AN APP...</option>
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
                      <select className="classic" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">SELECT A ROLE...</option>
                        {role.map((role) => (
                          <option key={role.code} value={role.code}>
                            {role.description}
                          </option>
                        ))}
                      </select>
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
export default CreateUserAppsRoles;
