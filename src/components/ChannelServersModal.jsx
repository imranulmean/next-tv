'use client'

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

export default function ChannelServersModal({channel, isOpen, setIsOpen}){     
    console.log(channel)
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
                All The Servers will be here
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