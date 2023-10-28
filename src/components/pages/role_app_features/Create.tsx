import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Modal'
import '../Select.css';
import Modal, { showModal, closeModal } from '../Modal';

const privilegePassBackendPort = process.env.REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND;

interface Role {
  code: string;
  description: string;
}
interface AppFeatures {
  code: string;
  description: string;
  appDescription: string;
}
function CreateRoleAppFeatures() {
  const [roleAppFeaturesData, setRoleAppFeaturesData] = useState({roleCode: '', appFeaturesCode: ''});

  const [role, setRole] = useState<Role[]>([]);
  const [appFeatures, setAppFeatures] = useState<AppFeatures[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>(''); // Initialize as an empty string
  const [selectedAppFeatures, setSelectedAppFeatures] = useState<string>(''); // Initialize as an empty string
  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${privilegePassBackendPort}/api/role`).then((response) => {
      setRole(response.data);
    });
    axios.get(`http://localhost:${privilegePassBackendPort}/api/app_features`).then((response) => {
      setAppFeatures(response.data);
    });    
  }, []);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleAppFeaturesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new APP
    const createData = {
      ...roleAppFeaturesData,
      roleCode: selectedRole,
      appFeaturesCode: selectedAppFeatures,
    };    
    debugger;
    axios.post(`http://localhost:${privilegePassBackendPort}/api/role_app_features`, createData)
      .then((response) => {
        console.log('App created:', response.data);
        showModal("Result", "Role App Features created successfully");
        
        setTimeout(() => {
          closeModal();
          setRoleAppFeaturesData({ roleCode: '', appFeaturesCode: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "Role App Features created failed with the following error: "+error);
        console.error('Error creating app:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create Role App Features</div>
            <form onSubmit={handleSubmit}>
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
                <div className="form-row">
                    <div className="input-data">
                      <select className="classic" value={selectedAppFeatures} onChange={(e) => setSelectedAppFeatures(e.target.value)}>
                        <option value="">SELECT A FEATURE...</option>
                        {appFeatures.map((appFeatures) => (
                          <option key={appFeatures.code} value={appFeatures.code}>
                            {appFeatures.appDescription} :: {appFeatures.description}
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
export default CreateRoleAppFeatures;
