import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { HiSearch, HiUser } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../../redux/user/userSlice";
import { CiCircleChevRight } from "react-icons/ci";

function SideBarComp() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    currentUser && (
      <>
        <div className='flex items-center h-full ml-0 md:ml-2 '>
          <button
            onClick={() => setIsOpen(true)}
            className='p-1 rounded-full bg-gray-300 dark:bg-gray-400 flex justify-center items-center'
          >
            <CiCircleChevRight className='h-7 w-7' />
          </button>
        </div>
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header title='MENU' titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label='Sidebar with multi-level dropdown example'
              className='[&>div]:bg-transparent [&>div]:p-0'
            >
              <div className='flex h-full flex-col justify-between py-2'>
                <div>
                  <form className='pb-3 md:hidden'>
                    <TextInput
                      icon={HiSearch}
                      type='search'
                      placeholder='Search'
                      required
                      size={32}
                    />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Link to='/dashboard?tab=dash'>
                        <Sidebar.Item
                          active={tab === "dash"}
                          icon={MdDashboard}
                          className='cursor-pointer'
                          as='div'
                        >
                          Dashboard
                        </Sidebar.Item>
                      </Link>
                      <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                          active={tab === "profile"}
                          icon={HiUser}
                          className='cursor-pointer'
                          as='div'
                        >
                          Profile
                        </Sidebar.Item>
                      </Link>
                      <Sidebar.Item
                        icon={FaSignOutAlt}
                        className='cursor-pointer'
                        onClick={() => {
                          handleSignout();
                          dispatch(signoutSuccess());
                          navigate("/");
                        }}
                      >
                        Sign Out
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </>
    )
  );
}

export default SideBarComp;
