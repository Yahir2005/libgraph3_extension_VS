export class CanvasRenderer {
    constructor(canvasElement) {
        this.canvas = canvasElement;
    }

    render(components) {
        // Limpiar el canvas manteniendo el fondo
        this.canvas.innerHTML = '';

        components.forEach(comp => {
            const div = document.createElement('div');
            div.className = 'componente-canvas';
            if (comp.type === 'rectangulo') div.classList.add('rectangulo');
            if (comp.type === 'texto') div.classList.add('texto');
            if (comp.type === 'campo') div.classList.add('campo');

            div.textContent = comp.text;
            div.style.left = comp.x + 'px';
            div.style.top = comp.y + 'px';
            div.style.width = comp.width + 'px';
            div.style.height = comp.height + 'px';
            div.dataset.id = comp.id;

            // Los eventos de doble clic se pueden manejar aquí o con delegación en el controlador
            this.canvas.appendChild(div);
        });
    }
}