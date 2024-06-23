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

  const [channelCategory, setChannelCategory] = useState('');
  const [channelCategories, setChannelCategories] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelServers, setChannelServers] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
  const [editChannels, seteditChannels]= useState([]);

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

  async function fetchChannels(){
    console.log("fetching channels");
    console.log(selectedCategory)
    const q= query(collection(db, 'channelCategory',selectedCategory.id,'channel'))
    const querySnapshot = await getDocs(q);
    let channels=[];
    for (const doc of querySnapshot.docs) {
      const channelData = doc.data();
      const channelId = doc.id;
      channels.push({ id: channelId, channelName: channelData.channelName, channelServers:channelData.channelServers });
    }
    console.log(channels);
    seteditChannels(channels);
  }

  return (
    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Channel Category</h5>
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

      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Channel</h5>
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
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Channel</h5>
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
      <button 
        onClick={fetchChannels} 
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >Fetch Channels</button>
      <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Channel Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        channelServers
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Edit
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Delete
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  editChannels.map(c=>{
                  return(
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {c.channelName}
                          </th>
                          <td class="px-6 py-4">
                              {c.channelServers}
                          </td>
                          <td class="px-6 py-4">
                              Edit
                          </td>
                          <td class="px-6 py-4">
                              Delete
                          </td>
                      </tr>  
                    )
                  })
                }

              </tbody>
          </table>
      </div>      
    </div>
  );
};

export default TestPage;