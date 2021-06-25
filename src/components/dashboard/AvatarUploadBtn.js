import React, { useState, useRef } from 'react'
import { Modal, Button, Alert } from 'rsuite';
import { useModalState } from '../../misc/custom.hooks';
import AvatarEditor from 'react-avatar-editor'
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';


const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg']

const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if(blob){
        resolve(blob);
      }
      else{
        reject(new Error('file process error'))
      }
    })
  })
}

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();

  const {profile} = useProfile();

  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();

  const onFileInputChange = (ev) => {
    const currentFiles = ev.target.files;
    if(currentFiles.length === 1){
      const file = currentFiles[0];

      if(isValidFile(file))
      {
        setImg(file);
        open();  
      }

      else{
        Alert.warning(`oops you selected a wrong file type ${file.type}`, 4000);
      }
    }
  }

  const onUploadClick = async () => {

     const canvas = avatarEditorRef.current.getImageScaledToCanvas();


     setIsLoading(true);

     try{
       const blob = await getBlob(canvas);

       const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');

       const uploadAvatarResult = await avatarFileRef.put(blob, {
         cacheControl : `public, max-age=${3600 * 24 * 3}` 
       })

       const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()
       const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');

      await userAvatarRef.set(downloadUrl);
       setIsLoading(false);

       Alert.info('Avatar uploaded!', 4000);

     }
     catch(err){
       setIsLoading(false);
       Alert.error('error bc', 4000);

     }
  }

  return (
    <div className="mt-3 text-center">

      <div style={{ marginTop: "5px"}}>
      <ProfileAvatar
      src={profile.avatar} name={profile.name} className="width-200 height-200 img-fullsize font-huge"/>
      </div>

       <div>
         
         <label htmlFor="avatar-upload" className="d-block cursor-pointer padded">
           Edit your display 

           <input id="avatar-upload" type="file" 
           className="d-none" accept={fileInputTypes}
           onChange={onFileInputChange}
           />

         </label>
        

         <Modal show={isOpen} onHide={close}>

           <Modal.Header>

             <Modal.Title>
               Change Avatar
             </Modal.Title>

           </Modal.Header>

           <Modal.Body>
             <div className="d-flex justify-content-center align-items-center">
              { img && 
              <AvatarEditor
              ref={avatarEditorRef}
              image={img}
              width={200}
              height={200}
              border={10}
              borderRadius={100}
              rotate={0}
            />}
            </div>
           </Modal.Body>

           <Modal.Footer>
              <Button appearance="ghost" block onClick={onUploadClick} disabled={isLoading}>
                Upload Avatar
              </Button>
           </Modal.Footer>

    </Modal>
       </div>
    </div>
  )
}

export default AvatarUploadBtn
