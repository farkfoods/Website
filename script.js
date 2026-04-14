document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let mouseX = 50;
    let mouseY = 50;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    sections.forEach((section, index) => {
        let time = 0;
        const speed = 0.01 + index * 0.005; // Different speeds for each section

        function animate() {
            time += speed;
            const baseX1 = 50 + 20 * Math.sin(time);
            const baseY1 = 50 + 15 * Math.cos(time * 1.5);
            const baseX2 = 50 + 15 * Math.sin(time * 0.7 + index * Math.PI / 2);
            const baseY2 = 50 + 20 * Math.cos(time * 1.2 + index * Math.PI / 2);
            const baseX3 = 50 + 25 * Math.sin(time * 1.3 + index * Math.PI);
            const baseY3 = 50 + 18 * Math.cos(time * 0.8 + index * Math.PI / 4);
            const baseX4 = 50 + 22 * Math.sin(time * 0.5 + index * Math.PI * 1.5);
            const baseY4 = 50 + 16 * Math.cos(time * 1.7 + index * Math.PI / 3);

            // Repulsion from mouse
            const repulsionRadius = 30; // in %
            const maxForce = 15;

            let x1 = baseX1, y1 = baseY1;
            let x2 = baseX2, y2 = baseY2;
            let x3 = baseX3, y3 = baseY3;
            let x4 = baseX4, y4 = baseY4;

            const applyRepulsion = (baseX, baseY) => {
                const distX = mouseX - baseX;
                const distY = mouseY - baseY;
                const dist = Math.sqrt(distX ** 2 + distY ** 2);
                if (dist < repulsionRadius && dist > 0) {
                    const force = (repulsionRadius - dist) / repulsionRadius * maxForce;
                    return {
                        x: baseX - (distX / dist) * force,
                        y: baseY - (distY / dist) * force
                    };
                }
                return { x: baseX, y: baseY };
            };

            ({ x: x1, y: y1 } = applyRepulsion(baseX1, baseY1));
            ({ x: x2, y: y2 } = applyRepulsion(baseX2, baseY2));
            ({ x: x3, y: y3 } = applyRepulsion(baseX3, baseY3));
            ({ x: x4, y: y4 } = applyRepulsion(baseX4, baseY4));

            section.style.setProperty('--x1', `${Math.max(0, Math.min(100, x1))}%`);
            section.style.setProperty('--y1', `${Math.max(0, Math.min(100, y1))}%`);
            section.style.setProperty('--x2', `${Math.max(0, Math.min(100, x2))}%`);
            section.style.setProperty('--y2', `${Math.max(0, Math.min(100, y2))}%`);
            section.style.setProperty('--x3', `${Math.max(0, Math.min(100, x3))}%`);
            section.style.setProperty('--y3', `${Math.max(0, Math.min(100, y3))}%`);
            section.style.setProperty('--x4', `${Math.max(0, Math.min(100, x4))}%`);
            section.style.setProperty('--y4', `${Math.max(0, Math.min(100, y4))}%`);

            requestAnimationFrame(animate);
        }

        animate();
    });
});