import { Project } from './domain/Project.js';
import { CanvasController } from './controllers/CanvasController.js';
import { ToolbarController } from './controllers/ToolbarController.js';
import { CodeController } from './controllers/CodeController.js';
import { ProjectManager } from './application/ProjectManager.js';

// Inicialización de Dependencias
const project = new Project(ProjectManager.cargarCodigoLocal());
const canvasController = new CanvasController(project, document.getElementById('canvas'));
const toolbarController = new ToolbarController(document.getElementById('toolbar-ui'), canvasController);
const codeController = new CodeController(project, document.getElementById('codigoTextarea'), document.getElementById('insertarComp'), document.getElementById('descargar'));

document.getElementById('codigoTextarea').value = project.baseCode;
canvasController.renderer.render(project.components);

document.getElementById('limpiarCanvas').addEventListener('click', () => {
    if (confirm('¿Eliminar todos los componentes del lienzo?')) { project.components = []; canvasController.renderer.limpiar(); }
});

// ==========================================
// LÓGICA DE INTERFAZ: MODO UI vs MODO CÓDIGO
// ==========================================
const fileInicio = document.getElementById('file-inicio');
const menuArchivo = document.getElementById('menu-archivo');

fileInicio.addEventListener('click', (e) => {
    e.stopPropagation();
    menuArchivo.style.display = 'flex';
    menuArchivo.style.left = `${e.clientX}px`;
    menuArchivo.style.top = `${e.clientY}px`;
});

document.addEventListener('click', () => { menuArchivo.style.display = 'none'; });

document.getElementById('opt-editar-ui').addEventListener('click', () => {
    document.getElementById('toolbar-ui').style.display = 'flex';
    document.getElementById('toolbar-codigo').style.display = 'none';
    document.getElementById('canvas-wrapper').style.display = 'flex';
    document.getElementById('codigo-wrapper').style.display = 'none';
});

document.getElementById('opt-ver-codigo').addEventListener('click', () => {
    document.getElementById('toolbar-ui').style.display = 'none';
    document.getElementById('toolbar-codigo').style.display = 'flex';
    document.getElementById('canvas-wrapper').style.display = 'none';
    document.getElementById('codigo-wrapper').style.display = 'flex';
});
const folders = document.querySelectorAll('.tree-folder');
folders.forEach(folder => {
    folder.addEventListener('click', function (e) {
        // Encontrar la lista <ul> que sigue a esta carpeta
        const nestedList = this.nextElementSibling;
        if (nestedList && nestedList.classList.contains('nested')) {
            nestedList.classList.toggle('active');

            // Cambiar la flecha (▶ a ▼)
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.textContent = nestedList.classList.contains('active') ? '▼' : '▶';
            }
        }
    });
});

// 2. Manejar la selección visual de archivos (quitar 'activo' del viejo, poner al nuevo)
const files = document.querySelectorAll('.tree-file');
files.forEach(file => {
    file.addEventListener('click', function (e) {
        // Evitar que el clic en main.c oculte el menú si se hace con otro botón
        // Removemos clase activo de todos
        files.forEach(f => f.classList.remove('activo'));
        // Agregamos al que recibió el clic
        this.classList.add('activo');
    });
});