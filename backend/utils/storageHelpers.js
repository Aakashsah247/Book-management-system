const supabase = require("../config/supabase");

const bucketName = process.env.SUPABASE_BUCKET || "books";

// Extracts a Storage path such as "covers/example.jpg"
// from the full public Supabase URL.
const getStoragePathFromUrl = (fileUrl) => {
  if (!fileUrl) return null;

  try {
    const parsedUrl = new URL(fileUrl);
    const marker = `/storage/v1/object/public/${bucketName}/`;

    const markerPosition = parsedUrl.pathname.indexOf(marker);

    // Ignore old localhost files or URLs from another storage system.
    if (markerPosition === -1) {
      return null;
    }

    const filePath = parsedUrl.pathname.substring(
      markerPosition + marker.length
    );

    return decodeURIComponent(filePath);
  } catch (error) {
    console.error("Invalid Storage URL:", error.message);
    return null;
  }
};

// Deletes one or more files from the Supabase bucket.
const removeStorageFiles = async (fileUrls = []) => {
  const filePaths = fileUrls
    .map(getStoragePathFromUrl)
    .filter(Boolean);

  if (filePaths.length === 0) {
    return {
      deleted: false,
      paths: [],
    };
  }

  const { error } = await supabase.storage
    .from(bucketName)
    .remove(filePaths);

  if (error) {
    console.error("Supabase file cleanup failed:", error.message);

    return {
      deleted: false,
      paths: filePaths,
      error: error.message,
    };
  }

  return {
    deleted: true,
    paths: filePaths,
  };
};

module.exports = {
  getStoragePathFromUrl,
  removeStorageFiles,
};