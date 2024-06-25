'use client'

import { useState } from "react";
import ChannelServersModal from "./ChannelServersModal";

export default function ChannelDetails({ channel }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [channelServers, setchannelServers]=useState({});

    const channelDetal=(eachChannel)=>{
        setchannelServers(eachChannel);
        setIsOpen(true);
    }

  return (
        <div class="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{channel.channelCategory}</h5>
            </a>
            <div className="flex flex-row gap-2">
                {
                    channel.channels.map(eachChannel => {
                        return (
                            // <p onClick={()=>channelDetal(eachChannel)}>{eachChannel.channelName}</p>
                            <div onClick={()=>channelDetal(eachChannel)} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <img class="rounded-t-lg w-32 h-32" src={eachChannel.channelImage} alt="" />
                                </a>
                                <div class="p-2">
                                    <a>
                                        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{eachChannel.channelName}</h5>
                                    </a>
                                </div>
                            </div> 
                        )
                    
                    })
                }                
            </div>

            {
                isOpen &&
                    <ChannelServersModal channelServers={channelServers} isOpen={isOpen} setIsOpen={setIsOpen} />
            }
            
        </div>        
  );
}
