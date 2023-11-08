import { useState } from "react"
import AvatarEdit from "./AvatarEdit"

const ImageUpload = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [image, setImage] = useState(null)

  const handleImageChange = (e) =>{
    const img = e.target.files[0]

    if(img){
      if(img.type === 'image/png' || img.type === 'image/jpeg' || img.type === 'image/jpg'){
        if(img.size <= 1048576){
          setImage(image)
        }
        else{
          alert("More than 1MB")
          e.target.value = null;
        }
      }
      else{
        alert("PNG, JPEG, JPG only")
        e.target.value = null;
      }
    }
  } 

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/api/person/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle a successful response here
        console.log('Data uploaded successfully.');
      } else {
        // Handle errors or failed responses here
        console.error('Error uploading data.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"100%"}}>
      <div style={{width:"100%"}}>
        <h1>Image Upload</h1>
      </div>

      <div>
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="text" name="age" onChange={e=>setAge(e.target.value)} value={age} />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            {/* <input type="file" id="image" accept="image/*" onChange={handleImageChange}/> */}
            <AvatarEdit
              // src={image} 
              // setSrc={setImage}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ImageUpload