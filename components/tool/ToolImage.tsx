"use client";

import { useState } from "react";
import Image from "next/image";

interface ToolImageProps {
  toolName: string;
  images: string[];  // Array de URLs de imágenes
  className?: string;
  showGallery?: boolean;
  maxImages?: number;
  aspectRatio?: "square" | "panoramic";
}

export default function ToolImage({ 
  toolName, 
  images, 
  className = "",
  showGallery = true,
  maxImages = 3,
  aspectRatio = "square"
}: ToolImageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 rounded-lg ${className}`}>
        <div className="text-center text-gray-400 p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Sin imágenes disponibles</p>
        </div>
      </div>
    );
  }

  const displayImages = images.slice(0, maxImages);
  const hasMoreImages = images.length > maxImages;

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className={`space-y-2 ${className}`}>
        {/* Imagen principal */}
      <div
        className={`relative group cursor-pointer overflow-hidden rounded-lg bg-gray-800 ${
          aspectRatio === "panoramic" ? "aspect-[16/10]" : "aspect-square"
        }`}
        onClick={() => handleImageClick(0)}
      >
          <Image
            src={images[0]}
            alt={`${toolName} - Imagen principal`}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Galería de miniaturas */}
        {showGallery && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {displayImages.slice(1).map((image, index) => (
              <div
                key={index + 2}
                className="relative group cursor-pointer flex-shrink-0"
                onClick={() => handleImageClick(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${toolName} - Imagen ${index + 2}`}
                  width={80}
                  height={60}
                  className="w-20 h-15 object-cover rounded transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded" />
              </div>
            ))}
            
            {/* Indicador de más imágenes */}
            {hasMoreImages && (
              <div className="flex-shrink-0 w-20 h-15 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs font-medium">
                +{images.length - maxImages}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de imagen completa */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <Image
              src={images[selectedImage]}
              alt={`${toolName} - Imagen ${selectedImage + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
              priority
            />

            {/* Navegación */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicador de imagen actual */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1 text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
