import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";



const Register = () => {
    const [errorElement, setErrorElement] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, SetShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        //    const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name, email, password, terms);

        //    reset user
        setErrorElement('')
        setSuccess('')

        if (password.length < 6) {
            setErrorElement('password should be 6 character')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorElement('please, at least one capital latter')
            return;
        }
        else if (!terms) {
            setErrorElement('please accepted our terms and condition ')
            return
        }

        //    create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                console.log(result.user)
                setSuccess('Congrats!! User Create Successfully')
                // email verification
                sendEmailVerification(result.user)
                .then(()=>{
                    alert('please check your email')
                })
                .catch(error=>{
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
                setErrorElement(error.message)
            })
    }

    return (
        <>
            <div className=" w-1/2 mx-auto border border-amber-800 rounded shadow-lg">
                <form onSubmit={handleSubmit} className="w-3/4 mx-auto py-5 space-y-3" >
                    {/* <input className=" block w-full border px-3 py-2 rounded-lg" type="text" name="name" id="" placeholder="Enter your Name"/> */}

                    <input className=" block w-full border px-3 py-2 rounded-lg" type="email" name="email" id="" placeholder="Enter your email" required />

                    <div className="flex relative">
                        <input
                            className=" w-full border px-3 py-2 rounded-lg"
                            type={showPassword ? "text" : "password"}
                            name="password" id=""
                            placeholder="Password" required />
                        <span onClick={() => SetShowPassword(!showPassword)} className="absolute mt-2 right-2">
                            {
                                showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                            }
                        </span>
                    </div>
                    <div className="my-4 space-x-2">
                        <input type="checkbox" name="terms" id="" />
                        <label htmlFor="terms">Accept terms and <a href="">condition</a></label>
                    </div>
                   
                        <input className="btn-primary btn w-full text-white" type="submit" value="Register" />
                   
                </form>

            </div>
            {
                errorElement && <p className=" text-2xl text-red-700 text-center">{errorElement}</p>
            }
            {
                success && <p className=" text-2xl text-center text-cyan-700">{success}</p>
            }
        </>

    );
};

export default Register;