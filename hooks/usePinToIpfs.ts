// @ts-nocheck
import {create} from "ipfs-http-client"
import {useState} from 'react'
import {Buffer} from 'buffer'
export const usePinToIpfs = () => {
    const [isUploading, setisUploading] = useState(false)
    const [isUploadingError, setisUploadingError] = useState(false)
    const [fileCID, setfileCID] = useState()

    const projectId =    "2DClJGZe7gt4xvK5ptGTyyFq1pw"   //process.env.PROJECT_ID;
    const secret =    "e9d5f0790bcf561e07f7a4779589f4c7" //process.env.API_SECRET;
    console.log("the app id")
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: `Basic ${Buffer.from(`${projectId}:${secret}`, 'utf-8').toString('base64')}`,
        },
      });

      const uploadToIpfs = async (file) => {
        try {
          setisUploading(true)
         const uploadedfile = await client.add(file) 
         setisUploading(false)
         setfileCID(uploadedfile?.path)
         return uploadedfile
  
      } catch (error){
        setisUploading(false)
        setisUploadingError(true)
        
      }}
  
   return {
    uploadToIpfs,
    isUploading,
    isUploadingError,
    fileCID,
    client
   }
}
