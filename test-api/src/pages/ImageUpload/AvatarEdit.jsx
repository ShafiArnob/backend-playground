import { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import Img from '../../assets/ae.png'
const AvatarEdit = () => {
  const [preview, setPreview] = useState(null)
  const [src, setSrc] = useState(null)
  
  useEffect(()=>{
    console.log(Img);
  }, [src])

  const handleImage = (e) => {
    e.preventDefault()
    const image = e.target.files[0]
    
    if(image){
      const reader = new FileReader()

      reader.onload = e =>{
        setSrc(e.target.result)
      }

      reader.readAsDataURL(image)
    }
  }
  const onClose = () => {
    setPreview(null)
  }

  const onCrop = (view) => {
    // console.log(view);
    setPreview(view)
  }

  return (
    <div>
      <p>
        Image: 
        <input type="file" id="image" accept="image/*" onChange={handleImage}/>
      </p>
      <Avatar
        width={300}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={null}
      />
      {preview && <img src={src} alt='preview'/>}
    </div>
  )
}

export default AvatarEdit