'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { HiCamera } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { app } from '@/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const filePickerRef = useRef(null);
  const db = getFirestore(app);

  return (
    // <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
    <div className='sticky top-0 bg-white z-30 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* logo */}

        <Link href='/' className='inline-flex'>
            <h1>Next Blog</h1>
        </Link>

        {/* search input */}
        <input type='text' placeholder='Search' className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]' />

        {/* menu items */}
        <Link href='/test' className='inline-flex'>
            <h1>Admin Panel</h1>
        </Link>
        {session ? (
          <div className='flex gap-2 items-center'>
            <img
              src={session.user.image}
              alt={session.user.name}
              className='h-10 w-10 rounded-full cursor-pointer'
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={signIn} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Login
          </button>
        )}        
      </div>
    </div>
  );
}
