import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../firebase/firebase.init";

const LogIn = () => {
    const [register, setRegister] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef()
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log('handle sub', email, password)


        // reset error and success
        setRegister('');
        setSuccess('');


        // add validation
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
            if(result.user.emailVerified){
                setSuccess('User Logged in Successfully.')
            }else{
                alert('please verify your email address')

            }
        })
        .catch(error =>{
            console.log(error)
            setRegister(error.message)
        })

    }
    const hadleForgetPassword = () =>{
        const email = emailRef.current.value;
        console.log('forget password')
        if(!email){
            console.log('provide email', emailRef.current.value)
            return
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('please write a valid email')
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('please check your email')
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                type="email" 
                                name="email" 
                                ref={emailRef}
                                placeholder="email" 
                                className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={hadleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;