import SignInForm from "../signInForm/signInForm"
import SignUpPage from "../signUpPage/signUpPage"
import { useState } from "react";


const SignInPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  if (showSignUp) {
    return <SignUpPage />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="mt-2 text-gray-600">Login to your account</p>
      </div>
      <SignInForm />
      <div className="mt-4 text-center">
      <p className="text-gray-600">
        Don&apos;t have an account?{' '}
        <button
          className="text-blue-500 underline"
          onClick={() => setShowSignUp(true)}
        >
          Sign Up
        </button>
      </p>
    </div>
    </div>
  </div>
  )
}

export default SignInPage