import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header"
import { Navigation } from "./components/navigation/Navigation"
import { Footer } from "./components/footer/Footer"

import AppList from "./components/pages/app/List";
import AppCreate from "./components/pages/app/Create";
import FeatureList from "./components/pages/feature/List";
import FeatureCreate from "./components/pages/feature/Create";
import RoleList from "./components/pages/role/List";
import RoleCreate from "./components/pages/role/Create";
import RoleFeaturesList from "./components/pages/role_features/List";
import RoleFeaturesCreate from "./components/pages/role_features/Create";
import UserAppsRolesList from "./components/pages/user_apps_roles/List";
import UserAppsRolesCreate from "./components/pages/user_apps_roles/Create";

function App() {
  return (
    <section className="maincontainer">
        <div className="headercontainer">
          <Header />
        </div>

        <div className="bodycontainer">
          <section className="bodysection">
            <div className="navigationcontainer">
              <Navigation />
            </div>
            <div className="contentcontainer">
              <BrowserRouter>
                <Routes>
                  <Route path="/app/list" element={<AppList/>}></Route>
                  <Route path="/app/create" element={<AppCreate/>}></Route>
                  <Route path="/feature/list" element={<FeatureList/>}></Route>
                  <Route path="/feature/create" element={<FeatureCreate/>}></Route> 

                  <Route path="/role/list" element={<RoleList/>}></Route>
                  <Route path="/role/create" element={<RoleCreate/>}></Route>
                  <Route path="/role_features/list" element={<RoleFeaturesList/>}></Route>
                  <Route path="/role_features/create" element={<RoleFeaturesCreate/>}></Route>  

                  <Route path="/user_apps_roles/list" element={<UserAppsRolesList/>}></Route>
                  <Route path="/user_apps_roles/create" element={<UserAppsRolesCreate/>}></Route>                                                                      
                </Routes>          
              </BrowserRouter>
            </div>
          </section>
        </div>

        <div className="footercontainer">
          <Footer />
        </div>
    </section>
  );
}

export default App;
