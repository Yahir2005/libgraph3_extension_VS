import { ProjectManager } from './application/ProjectManager.js';
import { FileExporter } from './application/FileExporter.js';

// --- Navegación hacia el Editor ---
document.getElementById('nuevo').addEventListener('click', () => {
    ProjectManager.guardarCodigoLocal(ProjectManager.getPlantillaPorDefecto());
    window.location.href = 'index.html'; // Te manda al editor
});

document.getElementById('cargar').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        ProjectManager.guardarCodigoLocal(ev.target.result);
        window.location.href = 'index.html'; // Te manda al editor
    };
    reader.readAsText(file);
});

// --- Manejo del Modal de Proyecto ---
const modal = document.getElementById('modal-proyecto');
const btnCrearProyecto = document.getElementById('crearProyecto');
const btnCancelar = document.getElementById('btn-cancelar-modal');
const useDbCheckbox = document.getElementById('use-db');
const dbOptions = document.getElementById('db-options');

btnCrearProyecto.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById('proj-name').value = '';
    useDbCheckbox.checked = false;
    dbOptions.style.display = 'none';
});

btnCancelar.addEventListener('click', () => modal.style.display = 'none');
useDbCheckbox.addEventListener('change', () => dbOptions.style.display = useDbCheckbox.checked ? 'block' : 'none');

// --- Generar y descargar Proyecto ZIP ---
document.getElementById('btn-generar-proyecto').addEventListener('click', () => {
    const nombre = document.getElementById('proj-name').value.trim();
    const usarBD = useDbCheckbox.checked;
    const tipoBD = document.querySelector('input[name="db-type"]:checked')?.value || '';

    if (!nombre) return alert('Ingresa un nombre para el proyecto.');
    if (usarBD && !tipoBD) return alert('Selecciona un tipo de base de datos.');

    const mapaArchivos = ProjectManager.generarEstructuraProyectoC(nombre, usarBD, tipoBD);

    // Usamos el FileExporter que construimos antes
    FileExporter.descargarProyectoZip(mapaArchivos, nombre).then(() => {
        modal.style.display = 'none';
    }).catch(err => {
        console.error(err);
        alert('Error al generar el ZIP. Verifica que JSZip esté cargado.');
    });
});