export const downloadFile = (data: string, type: string, filename: string): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
        const blob = new Blob([data], {type})
        const path = URL.createObjectURL(blob)

        // Create a new link
        const anchor = document.createElement('a');
        anchor.href = path;
        anchor.download = filename;

        // Append to the DOM
        document.body.appendChild(anchor);

        // Trigger `click` event
        anchor.click();

        // Remove element from DOM
        document.body.removeChild(anchor);
        URL.revokeObjectURL(path)

        resolve(true)
    })