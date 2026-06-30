// src/application/ZipExporter.js
export class ZipExporter {
    static downloadZip(files, zipName) {
        const zip = new JSZip();
        for (const [path, content] of Object.entries(files)) {
            zip.file(path, content);
        }
        zip.generateAsync({ type: 'blob' }).then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = zipName;
            link.click();
            URL.revokeObjectURL(link.href);
        });
    }
}