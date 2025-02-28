import React from 'react';
import { Link} from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <h1>Welcome to Codelet!</h1>
            <ul>
              <li><Link to="/sign-in">Sign in</Link></li> 
              <li><Link to="/new-user">New User</Link></li>
            </ul>
        </div>
    );
}

export default LandingPage;