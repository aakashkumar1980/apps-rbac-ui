import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header"
import { Navigation } from "./components/navigation/Navigation"
import { Footer } from "./components/footer/Footer"

import AppList from "./components/pages/app/List";
import AppCreate from "./components/pages/app/Create";
import AppFeaturesList from "./components/pages/app_features/List";
import AppFeaturesCreate from "./components/pages/app_features/Create";
import RoleList from "./components/pages/role/List";
import RoleCreate from "./components/pages/role/Create";
import RoleAppFeaturesList from "./components/pages/role_app_features/List";
import RoleAppFeaturesCreate from "./components/pages/role_app_features/Create";
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
                  <Route path="/app_features/list" element={<AppFeaturesList/>}></Route>
                  <Route path="/app_features/create" element={<AppFeaturesCreate/>}></Route> 

                  <Route path="/role/list" element={<RoleList/>}></Route>
                  <Route path="/role/create" element={<RoleCreate/>}></Route>
                  <Route path="/role_app_features/list" element={<RoleAppFeaturesList/>}></Route>
                  <Route path="/role_app_features/create" element={<RoleAppFeaturesCreate/>}></Route>  

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
