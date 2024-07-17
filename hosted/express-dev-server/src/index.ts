import app from './app';

const port = validateAndConvertPortToNumber(process.env.PORT);

// Create HTTP server.
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});

/**
 * Convert port to number
 * @param value Port value
 * @returns Port number
 */
function validateAndConvertPortToNumber(value: string | undefined): number {
    const defaultPort = 3000;

    if (value === undefined) {
        return defaultPort;
    }

    const parsedPort = Number.parseInt(value, 10);

    return Number.isNaN(parsedPort) ? defaultPort : parsedPort;
}
