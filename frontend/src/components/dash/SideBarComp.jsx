import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../../redux/user/userSlice";

function SideBarComp() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <Sidebar
      className='w-full md:w-56 my-5 bg-gray-400 dark:bg-[#1f2937] opacity-85'
      aria-label='Sidebar'
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && (
            <>
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
                  dispatch(signoutSuccess());
                  navigate("/");
                }}
              >
                Sign Out
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBarComp;
