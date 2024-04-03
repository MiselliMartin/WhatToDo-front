import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Navbar = () => {
  const { isAuthenticated, user, logOut } = useAuth()
  return (
    <nav className="bg-zinc-800 flex justify-between px-5 py-3">
      <Link to='/'>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-500">To Do App</h1>
      </Link>

      <ul className="flex gap-x-1 md:gap-x-2 lg:gap-x-3 items-center">
        {!isAuthenticated ? <li className="text-sm lg:text-base hover:bg-zinc-900 p-1 rounded-lg"><Link to="/login">Login</Link></li> : <><li className="hover:cursor-pointer hidden md:inline text-sm lg:text-base hover:bg-zinc-900 p-1 rounded-lg"><Link to='/profile' className="text-sm md:text-base lg:text-xl p-1 rounded-lg">Hola, {user.username}</Link></li> <li className=" text-sm lg:text-base hover:bg-zinc-900 p-1 rounded-lg"><Link to="/tasks">Tasks</Link></li> </>}
        <li className="text-sm lg:text-base hover:bg-zinc-900 p-1 rounded-lg transition-colors duration-100 delay-75">
          {
            !isAuthenticated ?
              <Link to="/register">Register</Link>
              :
              <Link to="/add-tasks">Add Task</Link>
          }
        </li>
        {isAuthenticated &&
          <li onClick={logOut} className="hover:cursor-pointer text-sm lg:text-base hover:bg-zinc-900 p-1 rounded-lg transition-colors duration-100 delay-75">
            Logout
          </li>
        }
      </ul>
    </nav>
  )
}
