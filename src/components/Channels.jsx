import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { app } from '../firebase';
import ChannelDetails from './ChannelDetails';
    
  export default async function Channels() {
  
    const data=[
        { channelName:"Euro Cup"},
        { channelName:"Copa America"},
        { channelName:"T20 World Cup"}
    ]
     
    return (
        <div className='flex flex-col md:flex-row'>
            {
                data.map((c, index)=>{
                    return(
                        <ChannelDetails channel={c} />
                    )
                })
            }
        </div>
    );
  }
  