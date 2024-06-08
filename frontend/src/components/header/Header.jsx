import {
  Avatar,
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSignOutAlt, FaSun, FaUserCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { Button } from "../ui/moving-border";
import { ImProfile } from "react-icons/im";
import { signoutSuccess } from "../../redux/user/userSlice";

function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar
      fluid
      className='bg-gray-400 sticky md:top-3 md:mx-14 md:rounded-full opacity-85 z-40'
    >
      <NavbarBrand href='https://flowbite-react.com'>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white md:pl-10'>
          Blackcoffer™
        </span>
      </NavbarBrand>
      <div className='flex gap-5 md:order-2 md:pr-10'>
        <Button
          borderRadius='1.75rem'
          className='bg-tansparent text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full mr-10'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <FaSun className='w-5 h-5' />
          ) : (
            <FaMoon className='w-5 h-5' />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img='https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                rounded
                className='h-8 w-10'
              />
            }
          >
            <Dropdown.Header>
              <FaUserCheck className='w-10 h-10' color='navy' />

              <span className='block text-md font-bold text-black truncate'>
                @{currentUser.firstname + " " + currentUser.lastname}
              </span>
              <span className='block text-sm font-medium text-black truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Link to='/dashboard?tab=dash'>
              <Dropdown.Item className='text-blue-500 font-semibold'>
                <ImProfile className='w-4 h-4 mr-2' color='blue' />
                Dashboard
              </Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            <Dropdown.Item
              className='text-red-500 font-semibold'
              onClick={() => {
                dispatch(signoutSuccess());
                navigate("/");
              }}
            >
              <FaSignOutAlt className='w-4 h-4 mr-2' color='red' />
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Button
            borderRadius='1.75rem'
            className='bg-transparent border-slate-800 mr-4 text-sm font-semibold text-black dark:text-white'
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to='/'>Home</Link>
        </NavbarLink>

        <NavbarLink active={path === "/service"} as={"div"}>
          <Link to='/service'>Service</Link>
        </NavbarLink>

        <NavbarLink active={path === "/about"} as={"div"}>
          <Link to='/about'>About Us</Link>
        </NavbarLink>

        <NavbarLink active={path === "/contact"} as={"div"}>
          <Link to='/contact'>Contact Us</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
