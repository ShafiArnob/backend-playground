import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import Img from "../../assets/ae.png";
const AvatarEdit = ({src, setSrc}) => {
  const [preview, setPreview] = useState(null);
  // const [src, setSrc] = useState(null);

  useEffect(() => {
    console.log(src);
  }, [src]);

  const handleImage = (e) => {
    // e.preventDefault()
    const image = e.target.files[0];

    if (image) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSrc(e.target.result);
      };

      reader.readAsDataURL(image);
    }
  };
  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    // console.log(view);
    setPreview(view);
  };

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 7168000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  return (
    <div>
      {/* <p>
        Image:
        <input type="file" id="image" accept="image/*" onChange={handleImage} />
      </p> */}
      {src && (
        <>
          <Avatar
            width={300}
            height={300}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            src={src ?? null}
          />
          <img src={preview} alt="preview" />
          <button onClick={()=>setSrc(preview)}>Save</button>
        </>
      )}
    </div>
  );
};

export default AvatarEdit;
