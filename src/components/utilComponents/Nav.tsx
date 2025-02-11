import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Nav : React.FC = () => {
    return (
        <nav className='pt-4 pb-4 border-b-2'>
            <div className="container flex justify-between align-middle">
                <div className="left ">
                    <Link to="/">
                        <img src="/assets/icons/logo.svg" alt="logo" className='w-12' />
                    </Link>
                </div>
                <div className="right flex space-x-4 items-end" >
                    <p className='text-sm'>Need help?</p>
                 <Link to="contact">
                    <Button variant="outline"> 
                        <img src="/assets/icons/headphone-line.svg" alt="" className='w-5 pr-1'/> 
                        Contact us
                    </Button>
                </Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
