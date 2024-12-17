import SignInForm from "../signInForm/signInForm"


const SignInPage = () => {
  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-200 via blue-300 via-purple-300 via-yellow-200 via-orange-200 to-blue-200">
  <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-blue-700">Sign In</h1>
      <p className="mt-2 text-blue-900 via-purple-900">Login to your account</p>
    </div>
    <SignInForm />
  </div>
</div>

  )
}

export default SignInPage