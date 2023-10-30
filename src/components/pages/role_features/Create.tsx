import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages.css';
import '../Modal'
import '../Select.css';
import Modal, { showModal, closeModal } from '../Modal';

const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

interface Role {
  code: string;
  description: string;
}
interface Feature {
  code: string;
  description: string;
  appDescription: string;
}
function CreateRoleFeatures() {
  const [roleFeaturesData, setRoleFeaturesData] = useState({roleCode: '', featureCode: ''});

  const [role, setRole] = useState<Role[]>([]);
  const [feature, setFeature] = useState<Feature[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>(''); // Initialize as an empty string
  const [selectedFeature, setSelectedFeature] = useState<string>(''); // Initialize as an empty string
  useEffect(() => {
    // Fetch the list of APPS from your API and update the state
    axios.get(`http://localhost:${backendServerPort}/api/role`).then((response) => {
      setRole(response.data);
    });
    axios.get(`http://localhost:${backendServerPort}/api/feature`).then((response) => {
      setFeature(response.data);
    });    
  }, []);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleFeaturesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    showModal("Processing", "Please wait...");

    // Send a POST request to create a new APP
    const createData = {
      ...roleFeaturesData,
      roleCode: selectedRole,
      featureCode: selectedFeature,
    };    
    debugger;
    axios.post(`http://localhost:${backendServerPort}/api/role_features`, createData)
      .then((response) => {
        console.log('Role_Features created:', response.data);
        showModal("Result", "Role_Features created successfully");
        
        setTimeout(() => {
          closeModal();
          setRoleFeaturesData({ roleCode: '', featureCode: '' });
        }, 5000);        
      })
      .catch((error) => {
        showModal("Result", "Role_Features created failed with the following error: "+error);
        console.error('Error creating Role_Features:', error);
        
      });
  };

  return (
        <div className="container">
            <div className="text">Create - Role : Features</div>
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
                      <select className="classic" value={selectedFeature} onChange={(e) => setSelectedFeature(e.target.value)}>
                        <option value="">SELECT A FEATURE...</option>
                        {feature.map((feature) => (
                          <option key={feature.code} value={feature.code}>
                            {feature.description} ({feature.appDescription})
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
export default CreateRoleFeatures;
