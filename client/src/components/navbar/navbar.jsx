import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <ul className="flex justify-center space-x-6 py-4">
        <li>
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        </li>
        <li>
          <Link href="/feeds" className="text-gray-700 hover:text-gray-900">Feeds</Link>
        </li>
        <li>
          <Link href="/members" className="text-gray-700 hover:text-gray-900">Members</Link>
        </li>
        <li>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar