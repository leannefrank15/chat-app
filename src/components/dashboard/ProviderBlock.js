import React, {useState} from 'react'
import { Tag , Icon, Alert} from 'rsuite'
import { auth } from '../../misc/firebase'


const ProviderBlock = () => {

  const [isConnected, setIsConnected] = useState ({
    'google.com' : auth.currentUser.providerData.some(data => data.providerId === 'google.com')
  })

  const updateIsConnected = (providerId, value) => {
   setIsConnected(p => {
     return {
       ...p,
       [providerId] : value,
     }
   })
  }


  const unlink = async (providerId) => {
      try{
         if (auth.currentUser.providerData.length ===1){
           throw new Error (`sorry! cannot disconnect from ${providerId}`);
         }

         await auth.currentUser.unlink(providerId);
         updateIsConnected(providerId, false);
      }
      catch(err){

        Alert.error(err.message, 4000);

      }
  }
    
  const unLinkGoogle = () => {
    unlink('google.com');
  }

  return (
    <div>

      {isConnected["google.com"] &&
      <Tag closable color="green" onClose={unLinkGoogle}>
          <Icon icon="google"> connected</Icon>
      </Tag>
      } 
      </div>

  )
}

export default ProviderBlock
