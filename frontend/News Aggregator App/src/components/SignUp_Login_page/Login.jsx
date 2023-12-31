import { useState } from 'react';
import SignUp_img from './SignUp_img';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: '',
    password: '',
  });

  const getData = (e) => {
    const { value, name } = e.target;
    setInpval(() => ({
      ...inpval,
      [name]: value,
    }));
  };
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const addData = async () => {
    const { email, password } = inpval;

    if (email === '') {
      toast.error("Email field is required", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        toastId: "100"
      })
      return;
    }

    if (password === '') {
      toast.error("Password field is required", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        toastId: "101"
      })
      return;
    }
    try {
      let result = await fetch('https://news-api-nine-iota.vercel.app/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(inpval),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!result.ok) {
        // Handle the case where the request was not successful
        throw new Error('Login failed');
      }

      result = await result.json();
      result = { user: result }
      localStorage.setItem('user-info', JSON.stringify(result.user));
      //alert('Logged in Successfully');
      toast.success("Successfully signed!!!", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        toastId: "customId3"
      })
      await delay(4000);
      history('/')
      //
    } catch (error) {
      console.error('Error occurred during login:', error);
      toast.error("Invalid Credentials!!!", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        toastId: "120"
      })
    }
  };

  return (
    <div className="container">
      <div className="left_detail">
        <h2>Sign In</h2>
        <input type="text" onChange={getData} name="email" placeholder="Email" />
        <input type="password" onChange={getData} name="password" placeholder="Password" />
        <button onClick={addData}>Sign In</button>

      </div>
      <SignUp_img />
    </div>
  );
};

export default Login;
