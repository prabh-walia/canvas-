import React from 'react';
import TextInput from './TextInput';

const Controls = ({ handlePlay, handlePause, addImage, addText, setText, text, images, setSelectedImage, selectedImage }) => {
  const handleImageClick = (image) => {
    // Toggle the selected image state
    if (selectedImage === image) {
      setSelectedImage(""); // Deselect the image
    } else {
      setSelectedImage(image); // Select the new image
    }
  };

  return (
    <div>
      <div className="controls mb-4">
        <button
          onClick={handlePlay}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Pause
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Select an Image:</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
            >
                <img
        src={image}
        alt={`Thumbnail ${index}`}
        className="cursor-pointer w-full h-24 object-cover"
        onClick={() => handleImageClick(image)}
        />
              {selectedImage === image && (
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addImage}
          className={`bg-green-500 text-white p-2 rounded w-full ${!selectedImage ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedImage}
        >
          Add Image
        </button>
      </div>
      <TextInput setText={setText} text={text} />
      <div className="mb-4">
        <button
          onClick={addText}
          className="bg-yellow-500 text-white p-2 rounded w-full"
        >
          Add Text
        </button>
      </div>
    </div>
  );
};

export default Controls;
