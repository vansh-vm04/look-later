import { useRouter } from 'expo-router';
import { useEffect } from 'react'
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

export default function ShareReceiverScreen() {
    const router = useRouter()
    useEffect(()=>{
        // Logic to handle received shared content goes here
        ReceiveSharingIntent.getReceivedFiles((files:any)=>{
            const receivedText = files?.[0]?.text;
            if(receivedText){
                router.replace({
                    pathname: '/',
                    params: { link: receivedText }
                })
            }
        },
        (error:any) => console.log(error)
    )
    },[router]);
  return null;
}