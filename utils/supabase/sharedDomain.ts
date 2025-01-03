export const getSharedDomain = () => {
	const url = process.env.NEXT_PUBLIC_URL;
	if (!url) {
		throw new Error("NEXT_PUBLIC_URL is not defined");
	}
	console.log('NEXT_PUBLIC_URL', url)

	try {
		const parsedUrl = new URL(url);
		const hostname = parsedUrl.hostname;
		console.log('hostname', hostname)

		// For localhost, return null or a default value
		if (hostname === "localhost") {
			return ".localhost"; // Or you can return '.localhost' for development
		}

		// For production domains, return the shared domain
		const domainParts = hostname.split(".");
		console.log('Domain Parts:', domainParts);

		if (domainParts.length > 2) {
			// Handle subdomains like "auth.rey.co"
			return `.${domainParts.slice(-2).join(".")}`;
		}

		return `.${hostname}`;
	} catch (error) {
		console.error("Error parsing URL:", error);
		throw new Error(`Invalid URL in NEXT_PUBLIC_URL: ${url}`);
	}
};

// Usage
export const sharedDomain = getSharedDomain();
console.log('sharedDomain22', sharedDomain);
