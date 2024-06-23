'use client'

import { useState } from "react";
import ChannelServersModal from "./ChannelServersModal";

export default function ChannelDetails({ channel }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [channelServers, setchannelServers]=useState({});
    const channelDetal=(eachChannel)=>{
        setchannelServers(eachChannel);
        setIsOpen(true);
        console.log("Clicked Details")
    }

  return (
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{channel.channelCategory}</h5>
            </a>
            {
                channel.channels.map(eachChannel => {
                    return <p onClick={()=>channelDetal(eachChannel)}>{eachChannel.channelName}</p>
                })
            }

            {
                isOpen &&
                    <ChannelServersModal channelServers={channelServers} isOpen={isOpen} setIsOpen={setIsOpen} />
            }
            
        </div>        
  );
}
