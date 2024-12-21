import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
  <div className="container mx-auto flex items-center justify-between">
    {/* Logo Section */}
    <div className="flex items-center">
      <Link href="/" className="flex items-center text-purple-700 font-bold text-xl hover:text-indigo-900">
        <img 
          src="//logo.png" 
          alt="" 
          className="h-8 w-auto mr-2" 
        />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 ">
       Community Feed 
       </h1>
      </Link>
    </div>

    {/* Navigation Links */}
    <ul className="flex space-x-6">
      <li>
        <Link
          href="/"
          className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/feeds"
          className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
        >
          Feeds
        </Link>
      </li>
      <li>
        <Link
          href="/members"
          className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
        >
          Members
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
        >
          About
        </Link>
      </li>
    </ul>

    {/* Call to Action Buttons */}
    <div className="space-x-4">
      <button className="px-4 py-2 bg-purple-700 text-white font-bold rounded-md hover:bg-indigo-900 transition">
        Sign In
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition">
        Sign Up
      </button>
    </div>
  </div>
</nav>

  
  )
}

export default Navbar