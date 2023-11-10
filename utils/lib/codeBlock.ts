const zws = String.fromCharCode(8203);

interface Stringifiable {
	toString(): string;
}

/**
	* Makes a codeblock markup string.
	* @since 0.1.1
	* @param language The codeblock language.
	* @param expression The expression to be wrapped in the codeblock. */
export function codeBlock(language: string, expression: Stringifiable): string {
	return `\`\`\`${language}\n${expression || zws}\`\`\``; 
}
