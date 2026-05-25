/** Non-digits removed; not capped. */
const digitsOnly = (input: string): string => {
  	return input.replace(/\D/g, '');
}

// Remove country code and extract raw digits
export const getRawDigits = (input: string): string => {
	// Remove country code if present
	if (input.startsWith('+1')) {
		input = input.slice(2);
	}

	let d = digitsOnly(input);
	return d.slice(0, 10);
}


// Format raw digits for phone display
export const formatPhoneDisplay = (input: string): string => {

	if (input.length === 0) {
		return "+1";
	}

	if (input.length < 4) {
		return `+1 (${input}`;
	}

	if (input.length < 7) {
		return `+1 (${input.slice(0, 3)}) ${input.slice(3)}`;
	}

	return `+1 (${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
}


// Format raw digits for api (ex. +15551231234)
export const formatPhoneApi = (input: string): string => {
	return `+1${input}`;
}
