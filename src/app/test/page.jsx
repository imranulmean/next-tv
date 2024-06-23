'use client'

import { useEffect, useState } from "react";
import { app } from '@/firebase';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
} from 'firebase/firestore';

const TestPage = () => {

  const [channelCategory, setChannelCategory] = useState('');
  const [channelCategories, setChannelCategories] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelServers, setChannelServers] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });

  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, 'channelCategory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(categories)
      setChannelCategories(categories);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db]);

  async function createChannelCategory() {
    const docRef = await addDoc(collection(db, 'channelCategory'), {
      channelCategory: channelCategory.trim()
    });
    setChannelCategory('');
  }
  
  async function createChannel() {
    // Add your code here to save the new channel to Firestore
    await addDoc(collection(db, 'channelCategory', selectedCategory.id, 'channel'), {
      channelName,
      channelServers,
      timestamp: serverTimestamp(),
    });
    alert("Channel Added");
  }

  return (
    <div>
      <label htmlFor="channelCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Channel Category</label>
      <input 
        type="text" 
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
        placeholder="Enter Category Name" 
        onChange={(e) => setChannelCategory(e.target.value)} 
        value={channelCategory}
      />
      <button 
        onClick={createChannelCategory} 
        disabled={channelCategory.trim() === ''} 
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Channel Category
      </button>

      <label htmlFor="channelName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Channel</label>

      <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Channel Category</label>
      <select 
        id="categories" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
        value={selectedCategory.id}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedName = channelCategories.find(cat => cat.id === selectedId)?.channelCategory || '';
          setSelectedCategory({ id: selectedId, name: selectedName });
        }}
      >
        <option value="" disabled>Select a category</option>
        {channelCategories.map(category => (
          <option key={category.id} value={category.id}>
            {category.channelCategory}
          </option>
        ))}
      </select>

      <label htmlFor="channelName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Channel Name:</label>
      <input 
        type="text" 
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
        placeholder="Enter Channel Name" 
        onChange={(e) => setChannelName(e.target.value)}  
        value={channelName} 
      />

      <label htmlFor="channelServers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Servers:</label>
      <input 
        type="text" 
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
        placeholder="Enter Servers (comma separated)" 
        onChange={(e) => setChannelServers(e.target.value)}  
        value={channelServers} 
      />        

      <button 
        onClick={createChannel} 
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Channel
      </button>
    </div>
  );
};

export default TestPage;