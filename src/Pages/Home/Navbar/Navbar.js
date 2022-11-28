import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../utilities/Loading';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json();
            return data;
        }
    })

    const currentUser = users.find(us => us?.email === user?.email)

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="navbar bg-base-100 my-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li tabIndex={0}>
                            <a className="justify-between"> Parent </a>
                            <ul className="p-2">
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case md:text-3xl text-xl  text-green-600 font-bold">Phone Garage</Link>
            </div>
            <div className="navbar-center hidden lg:flex items-center">
                <ul className="menu menu-horizontal p-0">
                    <li tabIndex={0}>
                        <Link className='btn btn-ghost'>Phones</Link>
                        <ul className="p-2">
                        </ul>
                    </li>
                    <li><Link className='btn btn-ghost'>Dashboard</Link></li>
                    <li><Link to='/blog' className='btn btn-ghost'>Blog</Link></li>

                    {
                        currentUser?.role === 'customer' ?
                            <li><Link to='/myorders' className='btn btn-ghost'>My Orders</Link></li>
                            : <></>
                    }
                    {
                        currentUser?.role === 'seller' ?
                            <>
                                <li><Link to='/addproduct' className='btn btn-ghost'>Add A Product</Link></li>
                                <li><Link to='/myproducts' className='btn btn-ghost'>My Products</Link></li>
                            </>
                            : <></>

                    }

                    {
                        currentUser?.role === 'admin' ?
                            <>
                                <li><Link to='/allseller' className='btn btn-ghost'>All Seller</Link></li>
                                <li><Link to='/allbuyers' className='btn btn-ghost'>All Buyers</Link></li>
                            </>
                            : <></>
                    }
                </ul>
            </div>
            <div className="navbar-end px-10">
                <p className="text-xl">{user?.displayName}</p>
                <div title={user?.displayName} className='mx-8'>
                    {
                        user?.photoURL ?
                            <img src={user.photoURL} alt="" />
                            :
                            <FaUser className='text-2xl' />
                    }
                </div>
                <div>
                    {
                        user ?
                            <Link onClick={handleLogOut} className="btn btn-outline btn-warning">Sign Out</Link>
                            :
                            <Link to='/login' className="btn btn-outline btn-warning">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;