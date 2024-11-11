import { NavLink } from "@remix-run/react"

export default function Nav(){
return(
    <ul className="mb-4 flex gap-4">
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/account">Account</NavLink>
    </li>
    <li>
      <NavLink to="/account/login">Login</NavLink>
    </li>
    <li>
      <NavLink to="/account/register">Register</NavLink>
    </li>
    <li>
      <NavLink to="/account/dashboard">Dashboard</NavLink>
    </li>
  </ul>
)
}