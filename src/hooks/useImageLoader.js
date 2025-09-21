import { useState, useEffect, useCallback } from 'react';

// Cache for storing preloaded images
const imageCache = new Map();
const preloadBatchSize = 5;

export const useImageLoader = (projectFolder) => {
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [loadedCount, setLoadedCount] = useState(0);

  // Memoized image loading function
  const preloadImage = useCallback((src) => {
    if (imageCache.has(src)) {
      return Promise.resolve(src);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.set(src, true);
        resolve(src);
      };
      img.onerror = () => reject(new Error(`Failed to load ${src}`));
    });
  }, []);

  // Batch load images
  const loadImageBatch = useCallback(
    async (imagePaths, startIndex) => {
      const batch = imagePaths.slice(startIndex, startIndex + preloadBatchSize);
      if (batch.length === 0) return;

      try {
        const loadedBatch = await Promise.all(
          batch.map((path) => preloadImage(path).catch(() => null))
        );
        const validImages = loadedBatch.filter(Boolean);

        setImages((prev) => [...prev, ...validImages]);
        setLoadedCount((prev) => prev + validImages.length);

        // Start loading next batch if available
        if (startIndex + preloadBatchSize < imagePaths.length) {
          setTimeout(() => {
            loadImageBatch(imagePaths, startIndex + preloadBatchSize);
          }, 100); // Small delay to prevent UI blocking
        }
      } catch (err) {
        console.error('Error loading image batch:', err);
      }
    },
    [preloadImage]
  );

  useEffect(() => {
    setImagesLoaded(false);
    setError(null);
    setLoadedCount(0);
    setImages([]);

    const loadImages = async () => {
      if (!projectFolder) {
        setImagesLoaded(true);
        return;
      }

      try {
        // Fast check for existence using HEAD request
        const checkImageExists = async (path) => {
          try {
            const response = await fetch(path, {
              method: 'HEAD',
              cache: 'force-cache', // Use browser cache aggressively
            });
            return response.ok;
          } catch {
            return false;
          }
        };

        const potentialImages = Array.from(
          { length: 30 },
          (_, i) => `${projectFolder}/${i + 1}.jpg`
        );

        // Check existence in parallel
        const existenceChecks = await Promise.all(
          potentialImages.map((path) => checkImageExists(path))
        );
        const validPaths = potentialImages.filter((_, i) => existenceChecks[i]);

        // Start loading images in batches
        if (validPaths.length > 0) {
          await loadImageBatch(validPaths, 0);
          // Only set imagesLoaded to true after first batch is loaded
          setImagesLoaded(true);
        } else {
          setTimeout(() => {
            setImagesLoaded(true);
          }, 500); // Add a small delay to prevent flash
        }
      } catch (err) {
        setError(err.message);
        setImages([]);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [projectFolder, loadImageBatch]);

  return { images, imagesLoaded, error };
};
