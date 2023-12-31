import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SignUp_img from './SignUp_img';
import './Style.css';
import { toast } from 'react-toastify';

const SignUp = () => {
  const history = useNavigate();
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const [inpval, setInpval] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    CategoryPrefernce: '',
  });

  const getData = (e) => {
    const { name, value } = e.target;
    setInpval({
      ...inpval,
      [name]: value,
    });
  };

  const addData = async () => {
    // Validate input fields
    if (inpval.name === '' || inpval.email === '' || inpval.password === '' || inpval.password2 === '') {
      toast.warning("All fields are required", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        toastId: "customId4"
      })
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
      }
      let result = await fetch('https://news-api-nine-iota.vercel.app/api/users/register', {
        method: 'POST',
        body: JSON.stringify(inpval),
        headers: headers,
      });
      result = await result.json();

      // Assuming the result contains necessary information
      if ('success' in result) {
        toast.success("Registered Successfully!!!", {
          theme: "colored",
          position: toast.POSITION.TOP_CENTER,
          toastId: "180"
        })
        console.log(result.user, 'sfrsfr');
        localStorage.setItem('user-info', JSON.stringify(result.user));
        await delay(4000);
        history('/');
      }
      // history.push('/login');
      else {
        let keys = ['email', 'password', 'password2', 'name', 'error'];
        let errors = keys.filter(e => e in result);
        toast.info(result[errors[0]], {
          theme: "colored",
          position: toast.POSITION.TOP_CENTER,
          toastId: "130"
        })
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error("Registration failed. Please try again.", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
        toastId: "customId10"
      })
    }
  };

  return (
    <div className="container">
      <div className="left_detail">
        <h2>Sign Up</h2>
        <input type="text" onChange={getData} name="name" placeholder="Name" />
        <input type="text" onChange={getData} name="email" placeholder="Email" />
        <input type="password" onChange={getData} name="password" placeholder="Password" />
        <input type="password" onChange={getData} name="password2" placeholder="Confirm Your Password.." />
        <input type="text" onChange={getData} name="Category" placeholder="Enter your Preferred Category.." />
        <button onClick={addData}>Sign Up</button>

        <p>
          Already Have An Account?{' '}
          <span>
            <NavLink to="/login" className="signIn">
              Sign In
            </NavLink>
          </span>
        </p>
      </div>
      <SignUp_img />
    </div>
  );
};

export default SignUp;
