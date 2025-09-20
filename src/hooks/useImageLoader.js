import { useState, useEffect } from 'react';

export const useImageLoader = (projectFolder) => {
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImagesLoaded(false);
    setError(null);

    const loadImages = async () => {
      if (!projectFolder) {
        setImagesLoaded(true);
        return;
      }

      try {
        const imageExists = async (path) => {
          try {
            const response = await fetch(path, { method: 'HEAD' });
            return response.ok;
          } catch {
            return false;
          }
        };

        const potentialImages = Array.from(
          { length: 30 }, // Reduced from 50 to 30 for better performance
          (_, i) => `${projectFolder}/${i + 1}.jpg`
        );

        const existencePromises = potentialImages.map(async (path) => {
          const exists = await imageExists(path);
          return exists ? path : null;
        });

        const imagePaths = (await Promise.all(existencePromises)).filter(Boolean);

        const imagePromises = imagePaths.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve(src);
              img.onerror = () => resolve(null);
            })
        );

        const loadedImages = (await Promise.all(imagePromises)).filter(Boolean);
        setImages(loadedImages);
      } catch (err) {
        setError(err.message);
        setImages([]);
      } finally {
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [projectFolder]);

  return { images, imagesLoaded, error };
};