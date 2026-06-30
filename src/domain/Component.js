// Entidad pura. Solo contiene datos y validaciones básicas.
export class Component {
    constructor({ id, type, x, y, width, height, text, command, varName }) {
        this.id = id;
        this.type = type; // 'boton', 'texto', 'rectangulo', 'campo'
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text || this.getDefaultText();
        this.command = command || ''; // Para botones
        this.varName = varName || ''; // Para campos de texto
    }

    getDefaultText() {
        const map = { boton: 'Botón', texto: 'Texto', rectangulo: 'Rect', campo: 'Campo' };
        return map[this.type] || 'Componente';
    }

    // Método de negocio: saber si un punto está dentro del componente
    contains(px, py) {
        return px >= this.x && px <= this.x + this.width &&
            py >= this.y && py <= this.y + this.height;
    }
}