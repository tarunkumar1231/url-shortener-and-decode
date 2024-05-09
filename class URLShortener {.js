class URLShortener {
    constructor() {
        this.urlMap = new Map(); // Map to store long URL to short URL mapping
        this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters for generating hash
        this.base = this.chars.length;
        this.shortURLLength = 6; // Length of shortened URL
    }

    encodeURL(longURL) {
        if (!longURL || typeof longURL !== 'string') {
            throw new Error('Invalid input URL');
        }

        let hash = '';
        do {
            for (let i = 0; i < this.shortURLLength; i++) {
                hash += this.chars.charAt(Math.floor(Math.random() * this.base));
            }
        } while (this.urlMap.has(hash)); // Ensure uniqueness of the hash

        this.urlMap.set(hash, longURL);
        return 'https://short.url/' + hash; // Example short URL format
    }

    decodeURL(shortURL) {
        const hash = shortURL.slice(-this.shortURLLength);
        if (!this.urlMap.has(hash)) {
            throw new Error('Invalid or expired short URL');
        }

        const longURL = this.urlMap.get(hash);
        window.location.href = longURL;
    }
}

// Function to prompt user for choice
function askChoice() {
    const choice = prompt('Enter your choice:\n1. Shorten URL\n2. Expand shortened URL');

    if (choice === '1') {
        shortenURL();
    } else if (choice === '2') {
        expandURL();
    } else {
        alert('Invalid choice! Please enter 1 or 2.');
        askChoice();
    }
}

// Function to shorten URL
function shortenURL() {
    const longURL = prompt('Enter the long URL to shorten:');
    const shortenedURL = shortener.encodeURL(longURL);
    console.log('Shortened URL:', shortenedURL);
}

// Function to expand shortened URL
function expandURL() {
    const shortURL = prompt('Enter the shortened URL to expand:');
    try {
        shortener.decodeURL(shortURL);
    } catch (error) {
        console.error(error.message);
    }
}

// Example usage
const shortener = new URLShortener();
askChoice();
