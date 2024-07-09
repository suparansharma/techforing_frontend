import { useEffect, useState } from 'react';
import AuthUser from "../components/AuthUser";

export default function Dashboard() {
  const { http,token } = AuthUser();
  const [userdetail, setUserdetail] = useState('');
console.log("userdetail",userdetail)
  useEffect(() => {
    fetchUserDetail();
  }, [token]);

  const fetchUserDetail = () => {
    http.post('/me').then((res) => {
      console.log(res.data)
      setUserdetail(res.data);
    });
  }

  function renderElement() {
    if (userdetail) {
      return <div>
        <h4>Name</h4>
        <p>{userdetail.name}</p>
        <h4>Email</h4>
        <p>{userdetail.email}</p>
      </div>
    } else {
      return <p>Loading.....</p>
    }

  }

  return (
    <div>
      <h1 className='mb-4 mt-4'>Dashboard page</h1>
      {renderElement()}
    </div>
  )
}