import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/moving-border";
import { BiSolidAddToQueue } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";

const SidebarIcons = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  const DashboardIcon = () =>
    tab === "dash" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <MdDashboard className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <MdDashboard className='w-5 h-5' />
    );

  const PostQuizIcon = () =>
    tab === "post-quiz" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <BiSolidAddToQueue className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <BiSolidAddToQueue className='w-5 h-5' />
    );
  const ViewQuizIcon = () =>
    tab === "view-quiz" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <CiViewList className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <CiViewList className='w-5 h-5' />
    );
  const ProfileIcon = () =>
    tab === "profile" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <HiUser className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <HiUser className='w-5 h-5' />
    );

  const ViewStudentDashIcon = () =>
    tab === "student-dash" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <PiStudentBold className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <PiStudentBold className='w-5 h-5' />
    );

  return {
    DashboardIcon,
    ProfileIcon,
    PostQuizIcon,
    ViewQuizIcon,
    ViewStudentDashIcon,
  };
};

export default SidebarIcons;
