import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Jobdashbord from "./pages/Jobdashbord";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashbord";
import Jobform from "./pages/Jobform";
function App() {

  return (

    <>
      <Router>
        <Layout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          />
          <Routes>
            <Route path="/" element={<Jobdashbord />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/home">
            <Protected Cmp={Home}/>
            </Route> */}
            <Route path="/home" element={<Protected><Home /></Protected> }/>
            <Route path="/dashbord"element={<Protected><Dashboard /></Protected>}/>
            <Route path="/jobmanage"element={<Protected><Jobform /></Protected>}/>
          </Routes>
        </Layout>
      </Router>
    </>

  );
}

export default App;
