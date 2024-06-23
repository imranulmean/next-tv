'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore';
import { app } from '../firebase';
import ChannelDetails from './ChannelDetails';

export default function Channels() {
  const [data, setData] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCategories = async () => {
      const q = query(collection(db, 'channelCategory'));
      const querySnapshot = await getDocs(q);     
      let categories = [];

      for (const doc of querySnapshot.docs) {
        const categoryData = doc.data();
        const categoryId = doc.id;
    
        // Fetch channels for each category
        const channelsSnapshot = await getDocs(collection(db, `channelCategory/${categoryId}/channel`));
        const channels = channelsSnapshot.docs.map(channelDoc => ({ id: channelDoc.id, ...channelDoc.data() }));
    
        categories.push({ id: categoryId, channelCategory: categoryData.channelCategory, channels });
      }

      setData(categories);
    }

    fetchCategories();
  }, [db]);

  return (
    <div className='flex flex-col md:flex-row'>
      {data.map((category) => (
        <ChannelDetails key={category.id} channel={category} />
      ))}
    </div>
  );
}