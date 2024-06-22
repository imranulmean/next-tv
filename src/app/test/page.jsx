'use client'

import { useEffect, useState } from "react";
import { app } from '@/firebase';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
} from 'firebase/firestore';

const TestPage = () => {

  const [channelCategory, setchannelCategory]=useState('');
  const [channelCategories, setchannelCategories]=useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, 'channelCategory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(categories)
      setchannelCategories(categories);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db]);

  async function createChannelCategory(){
    console.log(channelCategory.trim());
    const docRef = await addDoc(collection(db, 'channelCategory'), {
      channelCategory:channelCategory.trim()
    });
    console.log(docRef);
    setchannelCategory('');
  }
  return (
    <div>
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Channel Category</label>
    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Category Name" required
        onChange={(e) => setchannelCategory(e.target.value)} value={channelCategory}
      />
      <button onClick={createChannelCategory} disabled={channelCategory.trim() === ''} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Channel</label>
      <select id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4">
        {channelCategories.map(category => (
          <option key={category.id} value={category.channelCategory}>
            {category.channelCategory}
          </option>
        ))}
      </select>
      <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Channel Name" required
        
      />      
    </div>
  );
};

export default TestPage;
