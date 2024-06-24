'use client';

import { useState } from 'react';
import { getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../firebase';

export default function EditChannelDetails({ selectedCategory, c }) {
  console.log(c.channelName)  
  const [editedChannelName, setEditedChannelName] = useState(c.channelName);
  const [editedChannelServers, setEditedChannelServers] = useState(c.channelServers);
  const [isEditing, setIsEditing] = useState(false);

  const db = getFirestore(app);

  const handleUpdate = async () => {
    const channelDocRef = doc(db, 'channelCategory', selectedCategory.id, 'channel', c.id);

    await updateDoc(channelDocRef, {
      channelName: editedChannelName,
      channelServers: editedChannelServers,
    });

    alert('Channel updated successfully');
    setIsEditing(false);
  };


  const handleDelete = async () => {
    const channelDocRef = doc(db, 'channelCategory', selectedCategory.id, 'channel', c.id);
    await deleteDoc(channelDocRef);
    alert('Channel deleted successfully');
    // Optional: You can also remove the channel from the state here to update the UI immediately
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        {isEditing ? (
          <input 
            type="text" 
            value={editedChannelName} 
            onChange={(e) => setEditedChannelName(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        ) : (
          editedChannelName
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <input 
            type="text" 
            value={editedChannelServers} 
            onChange={(e) => setEditedChannelServers(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        ) : (
          editedChannelServers
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <button 
            onClick={handleUpdate}
            className="font-medium text-green-600 dark:text-green-500 hover:underline"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </button>
        )}
      </td>
      <td className="px-6 py-4">
        <button 
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}