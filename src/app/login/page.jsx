'use client'
import { signIn, useSession, signOut } from 'next-auth/react';

const LoginPage = () => {
     
 console.log(useSession());
 const {data: session, status}=useSession();
  return (
    <div className="flex flex-col justify-between items-center margin-auto">
        <p>Welcome to Login Page</p>
         <div className="flex flex-col gap-2">
           {
             status=="authenticated" ?
              <>
                <p>You have logged in Using {session.user.email}</p>
                <button onClick={signOut} className='w-full bg-blue-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Log out</button>
              </>               
               :
              <>
                <button onClick={()=>signIn('google')} className='w-full bg-blue-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Sign in with google</button>
                <button onClick={()=>signIn('github')} className='w-full bg-white-600 text-black p-2 shadow-md rounded-lg border-w-2 border-zinc-950 hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Sign in with Github</button>
              </>
           }
         </div>   
    </div>
  );
};

export default LoginPage;