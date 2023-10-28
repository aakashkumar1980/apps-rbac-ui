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
interface Role {
  code: string;
  description: string;
}
function CreateEmployeeAppsRoles() {
  const [employeeAppsRolesData, setEmployeeAppsRolesData] = useState({email: '', appCode: '', roleCode: ''});

  const [app, setApp] = useState<App[]>([]);
  const [role, setRole] = useState<Role[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>(''); // Initialize as an empty string
  const [selectedRole, setSelectedRole] = useState<string>(''); // Initialize as an empty string
  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/app`).then((response) => {
      setApp(response.data);
    });
    axios.get(`http://localhost:${privilegePassBackendPort}/api/role`).then((response) => {
      setRole(response.data);
    });    
  }, []);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeAppsRolesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new object
    const createData = {
      ...employeeAppsRolesData,
      appCode: selectedApp,
      roleCode: selectedRole
    };    
    debugger;
    axios.post(`http://localhost:${privilegePassBackendPort}/api/employee_apps_roles`, createData)
      .then((response) => {
        console.log('App created:', response.data);
        showModal("Result", "Employee Apps Roles created successfully");
        
        setTimeout(() => {
          closeModal();
          setEmployeeAppsRolesData({email: '', appCode: '', roleCode: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "Employee Apps Roles created failed with the following error: "+error);
        console.error('Error creating app:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Employee Apps Roles</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={employeeAppsRolesData.email}
                            onChange={handleChange}
                        />
                        <div className="underline"></div>
                        <label htmlFor="code">Employee Email:</label>
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
export default CreateEmployeeAppsRoles;
