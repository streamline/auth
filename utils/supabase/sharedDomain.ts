export const getSharedDomain = () => {
	const url = process.env.NEXT_PUBLIC_URL;
	console.log('getSharedDomain', url)
	if (!url) {
		throw new Error("NEXT_PUBLIC_URL is not defined");
	}

	try {
		const parsedUrl = new URL(url);
		const hostname = parsedUrl.hostname;

		// For localhost, return null or a default value
		if (hostname === "localhost") {
			return ".localhost"; // Or you can return '.localhost' for development
		}

		// For production domains, return the shared domain
		const domainParts = hostname.split(".");
		if (domainParts.length > 2) {
			// Handle subdomains like "auth.rey.co"
			return `.${domainParts.slice(-2).join(".")}`;
		}

		return `.${hostname}`;
	} catch (error) {
		throw new Error(`Invalid URL in NEXT_PUBLIC_URL: ${url}`);
	}
};

// Usage
export const sharedDomain = getSharedDomain();
