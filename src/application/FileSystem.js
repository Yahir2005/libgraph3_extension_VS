export class FileSystem {
    static async openDirectory() {
        try {
            return await window.showDirectoryPicker({ mode: 'readwrite' });
        } catch (err) {
            console.error('El usuario canceló:', err);
            return null;
        }
    }

    static async getFiles(dirHandle, path = '') {
        const entries = [];
        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file') {
                if (entry.name.match(/\.(c|h|md|txt|cpp)$/i) || entry.name === 'CMakeLists.txt') {
                    entries.push({ name: entry.name, kind: 'file', handle: entry, path: `${path}/${entry.name}` });
                }
            } else if (entry.kind === 'directory') {
                if (!['.git', 'build', 'node_modules'].includes(entry.name)) {
                    entries.push({
                        name: entry.name, kind: 'directory', handle: entry, path: `${path}/${entry.name}`,
                        children: await this.getFiles(entry, `${path}/${entry.name}`)
                    });
                }
            }
        }

        entries.sort((a, b) => {
            if (a.kind === b.kind) return a.name.localeCompare(b.name);
            return a.kind === 'directory' ? -1 : 1;
        });

        return entries;
    }

    static async readFile(fileHandle) {
        const file = await fileHandle.getFile();
        return await file.text();
    }

    static async writeFile(fileHandle, content) {
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    }
}