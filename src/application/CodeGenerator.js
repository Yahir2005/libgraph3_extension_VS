export class CodeGenerator {
    static generate(components) {
        if (components.length === 0) return '    // No hay componentes en el bloque actual\n';

        let lines = [];

        components.forEach(comp => {
            const { x, y, width, height, text, type, command, varName, color, fontSize } = comp;
            const x1 = Math.round(x), y1 = Math.round(y);
            const x2 = Math.round(x + width), y2 = Math.round(y + height);

            switch (type) {
                case 'boton':
                    lines.push(`    // Botón Nativo Interactivo: "${text}"`);
                    lines.push(`    if (button(${x1}, ${y1}, ${x2}, ${y2}, "${text}")) {`);
                    if (command) {
                        // Indentar cada línea del script provisto por el usuario
                        command.split('\n').forEach(lineaCmd => {
                            lines.push(`        ${lineaCmd}`);
                        });
                    } else {
                        lines.push(`        setcolor(YELLOW);`);
                        lines.push(`        outtextxy(${x1}, ${y2 + 10}, "¡Accion Ejecutada!");`);
                    }
                    lines.push(`    }`);
                    lines.push('');
                    break;

                case 'campo':
                    lines.push(`    // Bloque de Entrada de Texto (Estilo NetBeans)`);
                    lines.push(`    setfillstyle(SOLID_FILL, ${color === 'WHITE' ? 'WHITE' : color});`);
                    lines.push(`    bar(${x1}, ${y1}, ${x2}, ${y2});`);
                    lines.push(`    setcolor(BLACK);`);
                    lines.push(`    rectangle(${x1}, ${y1}, ${x2}, ${y2});`);
                    lines.push(`    outtextxy(${x1 + 6}, ${y1 + 12}, "${text}");`);
                    lines.push(`    // TODO: Procesar buffer en la variable asignada: ${varName || 'input_buffer'}`);
                    lines.push('');
                    break;

                case 'texto':
                    lines.push(`    // Renderizado de Texto`);
                    lines.push(`    setcolor(${color});`);
                    lines.push(`    settextstyle(DEFAULT_FONT, HORIZ_DIR, ${fontSize});`);
                    lines.push(`    outtextxy(${x1}, ${y1}, "${text}");`);
                    lines.push('');
                    break;

                case 'rectangulo':
                    lines.push(`    // Figura Geométrica`);
                    lines.push(`    setcolor(${color});`);
                    lines.push(`    rectangle(${x1}, ${y1}, ${x2}, ${y2});`);
                    lines.push('');
                    break;
            }
        });

        return lines.join('\n');
    }
}