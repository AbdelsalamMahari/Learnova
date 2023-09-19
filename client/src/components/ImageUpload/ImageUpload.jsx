import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        alert('File uploaded successfully.');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <form encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      <img src="../../assets/courseimages/blackphoto.jpg" alt="hi" />
      </form>
    </div>
  );
};

export default ImageUpload;
