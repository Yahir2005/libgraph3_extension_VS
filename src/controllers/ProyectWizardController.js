// src/controllers/ProjectWizardController.js
import { ProjectGenerator } from '../application/ProjectGenerator.js';
import { ZipExporter } from '../application/ZipExporter.js'; // servicio de empaquetado

export class ProjectWizardController {
    constructor(modalElement) {
        this.modal = modalElement;
        this._bindEvents();
    }

    _bindEvents() {
        document.getElementById('btn-generar-proyecto').addEventListener('click', () => {
            const name = document.getElementById('proj-name').value.trim();
            const useDB = document.getElementById('use-db').checked;
            const dbType = document.querySelector('input[name="db-type"]:checked')?.value || '';

            if (!name) { alert('Ingresa un nombre de proyecto'); return; }
            if (useDB && !dbType) { alert('Selecciona un tipo de base de datos'); return; }

            // Generar los archivos
            const files = ProjectGenerator.generate(name, useDB, dbType);

            // Empaquetar en ZIP y descargar
            ZipExporter.downloadZip(files, `${name}.zip`);
        });
    }
}