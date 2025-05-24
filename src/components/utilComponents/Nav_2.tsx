import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'    
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "../ui/breadcrumb"
import { NavItem, navItem } from '@/data/dummydata';
type Nav2Props = {
    completed: boolean
    setCompleted: React.Dispatch<React.SetStateAction<boolean>>
    name: string
}
const Nav2: React.FC<Nav2Props> = ({completed, name }) => {
    const [isVisible, setIsVisible] = useState(!document.hidden)

    useEffect(( )=>{
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden)
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => { 
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        }
        
    },[]);
   
   
    return (
        <div>
             <nav className='pt-4 pb-4 border-b-2'>
            <div className="container flex  justify-between align-middle">
                <div className="left flex-1 ">
                    <Link to="/">
                        <img src="/assets/icons/logo.svg" alt="logo" className='w-12' />
                    </Link>
                </div>
                <div className="right flex flex-auto items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                    <ol className='list-none flex justify-center space-x-6'>
                        {navItem.map((item: NavItem,) => (
                            <li key={item.name} className='flex items-center last:children:hidden'>
                            <BreadcrumbItem >
                                <BreadcrumbLink>
                                    <NavLink to={item.path} className='hover:decoration-solid hover:underline'>
                                        { !completed && isVisible && name === item.name && <span className={`flex-shrink-0 w-4 h-4 pl-2 pr-2 rounded-full  mr-2 ${isVisible ? "bg-blue-600 text-white outline-none" : "bg-white outline border-gray-600 text-gray-500"}`}>{item.id}</span>}
                                        {completed && item.name === name ? <span className='text-white'><img src="/public/assets/icons/completed-check.svg" alt="" /></span> : null}
                                        {item.name}
                                    </NavLink>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {item.id !== navItem[navItem.length - 1].id && <BreadcrumbSeparator/> }
                            </li>
                        ))}
                    </ol>
                    </BreadcrumbList>
                </Breadcrumb>
                </div>
            </div>
        </nav>
        </div>
    );
}

export default Nav2;
