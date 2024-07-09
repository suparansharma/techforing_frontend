import { Routes, Route, Link } from 'react-router-dom';
import Home from '../../src/pages/Home';
import Login from '../../src/pages/Login';
import Register from '../../src/pages/Register';
import AuthUser from './AuthUser';

const Header = () => {
    // token
    const { token, getToken } = AuthUser();
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
0
                    {
                        token ?
                            <>


                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Job Dashbord</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashbord">Dashbord</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/jobmanage">Manage Jobs</Link>
                                </li>
                            </> :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>

                    }



                </ul>

            </nav>
            {/* <div className="container">
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </div> */}
        </>
    )
}

export default Header