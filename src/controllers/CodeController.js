import { CodeGenerator } from '../application/CodeGenerator.js';
import { ProjectManager } from '../application/ProjectManager.js';
import { FileExporter } from '../application/FileExporter.js';

export class CodeController {
    constructor(project, textareaElement, insertBtn, downloadBtn) {
        this.project = project;
        this.textarea = textareaElement;

        // Escuchar cambios manuales en el editor
        this.textarea.addEventListener('input', (e) => {
            this.project.baseCode = e.target.value;
            ProjectManager.guardarCodigoLocal(e.target.value);
        });

        // Vincular acciones de los botones
        if (insertBtn) insertBtn.addEventListener('click', () => this.inyectarComponentes());
        if (downloadBtn) downloadBtn.addEventListener('click', () => this.descargarCodigoC());
    }

    inyectarComponentes() {
        let codigo = this.project.baseCode;

        // 1. Generamos el código nuevo envuelto en marcadores permanentes
        const codigoGenerado = CodeGenerator.generate(this.project.components);
        const bloqueC = `// === INICIO COMPONENTES ===\n${codigoGenerado}\n    // === FIN COMPONENTES ===`;

        // 2. Expresión regular para buscar un bloque previamente generado (y borrarlo)
        const regexBloqueExistente = /\/\/\s*===\s*INICIO COMPONENTES\s*===[^]*?\/\/\s*===\s*FIN COMPONENTES\s*===/g;

        if (regexBloqueExistente.test(codigo)) {
            // Si ya existe un código insertado antes, lo REEMPLAZAMOS todo
            codigo = codigo.replace(regexBloqueExistente, bloqueC);
        } else {
            // Si es la primera vez, buscamos el marcador original "//COMPONENTES"
            const marcadorOriginal = /\/\/\s*COMPONENTES/g;
            if (marcadorOriginal.test(codigo)) {
                codigo = codigo.replace(marcadorOriginal, bloqueC);
            } else {
                // Fallback de seguridad: si no hay marcador, insertar antes de getch()
                const posGetch = codigo.lastIndexOf('getch()');
                if (posGetch !== -1) {
                    codigo = codigo.substring(0, posGetch) + bloqueC + '\n    ' + codigo.substring(posGetch);
                } else {
                    codigo = codigo + '\n' + bloqueC;
                }
            }
        }

        // 3. Guardamos el estado y actualizamos la vista
        this.project.baseCode = codigo;
        this.textarea.value = codigo;
        ProjectManager.guardarCodigoLocal(codigo);
    }

    descargarCodigoC() {
        FileExporter.descargarArchivoTexto(this.project.baseCode, 'proyecto.c');
    }
}