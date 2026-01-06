const API_BASE_URL = "http://localhost:5001";

export const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    // Normalize path to start with /
    const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    // If path already starts with /uploads/, just prepend base URL
    if (path.startsWith("/uploads/")) {
        return `${API_BASE_URL}${path}`;
    }

    // Otherwise, insert /uploads/ between base URL and path
    return `${API_BASE_URL}/uploads${path}`;
};

export default API_BASE_URL;
