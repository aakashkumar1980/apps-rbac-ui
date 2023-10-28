import React, {useEffect} from 'react';
import './Navigation.css';


export const Navigation = () => {
  useEffect(() => {
    const storage = window.sessionStorage;
  }, []);

  return (
    <div>
      <div className="navigation">

        <div id="swimbi-vertical">
          <ul>
            <li><a href="#">App</a>
              <ul>
                <li><a href="/app/list">List - Apps</a></li>
                <li><a href="/app/create">Create - App</a></li>
              </ul>
            </li>  
            <li><a href="#">App Features</a>
              <ul>
                <li><a href="/app_features/list">List - App Features</a></li>
                <li><a href="/app_features/create">Create - App Features</a></li>
              </ul>
            </li>   

            <li style={{marginTop: 15}}><a href="#">Role</a>
              <ul>
                <li><a href="/role/list">List - Roles</a></li>
                <li><a href="/role/create">Create - Role</a></li>
              </ul>
            </li> 
            <li><a href="#">Role :: App Features</a>
              <ul>
                <li><a href="/role_app_features/list">List - Role App Features</a></li>
                <li><a href="/role_app_features/create">Create - Role App Features</a></li>
              </ul>
            </li> 

            <li style={{marginTop: 15}}><a href="#">User :: Apps :: Roles</a>
              <ul>
                <li><a href="/user_apps_roles/list">List - User Apps Roles</a></li>
                <li><a href="/user_apps_roles/create">Create - User Apps Roles</a></li>
              </ul>
            </li>                                                        
          </ul>
        </div>  

      </div>
    </div>
  )
}