"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface SlideshowProps {
  images: { url: string; id: string }[]; // Assuming images is an array of objects containing URL and ID
}

const Slideshow = ({ images }: SlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image URL

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [images.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMainImageClick = () => {
    setSelectedImage(images[currentImageIndex].url);
    setIsModalOpen(true); // Open modal when the main image is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedImage(null); // Reset selected image
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative w-[500px] h-[400px]" onClick={handleMainImageClick}>
        <Image
          src={images[currentImageIndex].url}
          alt={`House Image ${currentImageIndex + 1}`}
          width={600}
          height={400}
          className="w-full h-full object-cover rounded-md cursor-pointer" // Add cursor pointer
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-4 mt-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`w-16 h-16 cursor-pointer ${
              currentImageIndex === index ? "border-2 border-blue-500" : ""
            }`}
            onMouseEnter={() => handleThumbnailClick(index)} // Hover to change main image
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              width={60}
              height={60}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Modal for large image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-md">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
            >
              X
            </button>
            <Image
              src={selectedImage!}
              alt="Large House Image"
              width={800}
              height={800}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
