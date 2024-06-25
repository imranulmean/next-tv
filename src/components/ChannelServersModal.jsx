'use client'

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

export default function ChannelServersModal({channelServers, isOpen, setIsOpen}){     
    console.log(channelServers)
    let channelServers1=channelServers.channelServers.split(',');
    let parsedServers=[];
    for(let i=0; i<channelServers1.length; i++){
        let obj={'server': `server${i+1}`, 'link': channelServers1[i] }
        parsedServers.push(obj);
    }
    console.log(channelServers1)
    return(
        <>       
        {isOpen && (
            <Modal
            isOpen={isOpen}
            className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md'
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
            >
            <div className='flex flex-col justify-center items-center h-[100%]'>
               
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{channelServers.channelName}</h5>
                </a>                
                {
                    parsedServers.map((c)=>{
                        return(
                            <>
                            <a href={c.link} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {c.server}
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>                                
                            </a>                            
                            <iframe 
                                    width="100%" 
                                    height="480" 
                                    scrolling="no" 
                                    frameBorder="0" 
                                    allowTransparency="true" 
                                    marginWidth="0" 
                                    marginHeight="0" 
                                    src="https://rips.in/player.php?ch=1" 
                                    allowFullScreen
                                ></iframe>
                            </>
                        ) 
                    })
                }
            </div>  
            <AiOutlineClose
                className='cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300'
                onClick={() => setIsOpen(false)}
            />
            </Modal>
        )}
        </>
    )
}