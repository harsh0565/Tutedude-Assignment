import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import axios from 'axios';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = async () => {
    try {
      setAuth({
        ...auth,
        user: null,
        token: ""
      });
  
      localStorage.clear();
  
      
      await axios.delete("http://localhost:8080https://tutedude-backend-jj38.onrender.com/api/v1/auth/logout", {
        withCredentials: true 
      });
  
      
    } catch (error) {
      console.log("Logout failed: ", error);
  
    }
  };
  
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link class="navbar-brand align-content-center" to="/">Tutedude</Link>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/">Home</Link>
              </li>
              {!auth.user ? (<>
                {/* <li class="nav-item">
                  <Link class="nav-link" to="/register">Register</Link>
                </li> */}
                <li class="nav-item">
                  <Link class="nav-link" to="/login" >Login</Link>
                </li>
              </>
              ) : (
                <li className="nav-item dropdown pe-5">
                  <Link className="nav-link dropdown-toggle pe-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={`/pendingReq`}>Pending Requests</Link></li>
                    <li><Link className="dropdown-item" to={`/friendList`}>Friend List</Link></li>
                    <li><Link className="dropdown-item" onClick={handleLogout} to={'/login'}>Logout</Link></li>
                    
                  </ul>
                </li>
              )}
             
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
