
import SignUpForm from '../signUpForm/signUpForm'

const SignUpPage = () => {
  return (
  <div className="flex min-h-screen items-center justify-center bg-white">
  <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 hover:from-purple-600 hover:to-blue-600">Sign Up</h1>
      <p className="mt-2 text-blue-900 via-purple-900">Create your account</p>
    </div>
    <SignUpForm />
  </div>
</div>

  )
}

export default SignUpPage
