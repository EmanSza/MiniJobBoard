/**
 * Converts a string into a URL-safe slug.
 * @param {string} slugContent - The string to slugify
 * @returns {string} Lowercase hyphen-separated slug with non-URL characters removed
 */
const slug = (slugContent) => {
    return slugContent
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[\s]+/g, "-")
        .replace(/-+/g, "-");
};

export default slug;
