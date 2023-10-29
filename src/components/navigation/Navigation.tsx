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
            <li><a href="#">Feature</a>
              <ul>
                <li><a href="/feature/list">List - Feature</a></li>
                <li><a href="/feature/create">Create - Feature</a></li>
              </ul>
            </li>   

            <li style={{marginTop: 15}}><a href="#">Role</a>
              <ul>
                <li><a href="/role/list">List - Roles</a></li>
                <li><a href="/role/create">Create - Role</a></li>
              </ul>
            </li> 

            <li style={{marginTop: 30}}><a href="#">Role :: Feature</a>
              <ul>
                <li><a href="/role_features/list">List - Roles :: Feature</a></li>
                <li><a href="/role_features/create">Create - Role :: Feature</a></li>
              </ul>
            </li>
            <li><a href="#">User :: Apps :: Roles</a>
              <ul>
                <li><a href="/user_apps_roles/list">List - Users :: Apps :: Roles</a></li>
                <li><a href="/user_apps_roles/create">Create - User :: App :: Role</a></li>
              </ul>
            </li>                                                        
          </ul>
        </div>  

      </div>
    </div>
  )
}