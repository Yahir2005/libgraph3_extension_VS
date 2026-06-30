// Caso de uso: Generar string en C a partir de los componentes.
export class CodeGenerator {
    static generate(components) {
        if (components.length === 0) return '    // No hay componentes\n';

        let lines = [];
        let hasButtons = false;
        let hasCampos = false;

        components.forEach(comp => {
            const { x, y, width, height, text, type, command, varName } = comp;
            const x1 = Math.round(x), y1 = Math.round(y);
            const x2 = Math.round(x + width), y2 = Math.round(y + height);

            switch (type) {
                case 'boton':
                    hasButtons = true;
                    lines.push(`    // Botón: "${text}"`);
                    lines.push(`    setcolor(BLACK);`);
                    lines.push(`    setfillstyle(SOLID_FILL, LIGHTBLUE);`);
                    lines.push(`    bar(${x1}, ${y1}, ${x2}, ${y2});`);
                    lines.push(`    setcolor(BLACK);`);
                    lines.push(`    outtextxy(${x1 + 6}, ${y1 + 6}, "${text}");`);
                    if (command) {
                        lines.push(`    // Comando asociado: ${command}`);
                    }
                    lines.push('');
                    break;
                case 'campo':
                    hasCampos = true;
                    const varNameClean = varName || `campo_${comp.id}`;
                    lines.push(`    // Campo: "${text}" (variable: ${varNameClean})`);
                    lines.push(`    setcolor(BLACK);`);
                    lines.push(`    outtextxy(${x1 - 60}, ${y1 + 6}, "${text}");`);
                    lines.push(`    setcolor(BLACK);`);
                    lines.push(`    rectangle(${x1}, ${y1}, ${x2}, ${y2});`);
                    lines.push(`    setfillstyle(EMPTY_FILL, WHITE);`);
                    lines.push(`    bar(${x1 + 1}, ${y1 + 1}, ${x2 - 1}, ${y2 - 1});`);
                    lines.push(`    // Guardar entrada del usuario en: ${varNameClean}`);
                    lines.push('');
                    break;
                case 'texto':
                    lines.push(`    // Texto: "${text}"`);
                    lines.push(`    setcolor(BLACK);`);
                    lines.push(`    outtextxy(${x1}, ${y1}, "${text}");`);
                    lines.push('');
                    break;
                case 'rectangulo':
                    lines.push(`    // Rectángulo`);
                    lines.push(`    setcolor(RED);`);
                    lines.push(`    rectangle(${x1}, ${y1}, ${x2}, ${y2});`);
                    lines.push('');
                    break;
            }
        });

        // Si hay botones o campos, añadir advertencia de eventos (opcional)
        if (hasButtons || hasCampos) {
            lines.push('    // NOTA: Para interactividad, añade un bucle SDL_Event manualmente.');
        }

        return lines.join('\n');
    }
}