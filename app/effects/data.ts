export const effectsData = [
    {
        id: "gravity-mesh-lines",
        title: "Gravity Mesh Interactive Grid",
        description: "A procedurally generated 3D grid that deforms in real-time. Features spring-physics for realistic relaxation and Euclidean distance calculations for the magnetic 'gravity' pull.",
        tags: ["Gravity", "Mesh", "Grid", "Interactive", "Physics", "Spacetime", "Canvas", "3D", "Procedural", "Geometric", "Lines", "Simulation", "WebGL", "Animation", "Fluid"],
        keywords: ["gravity mesh", "interactive grid", "spacetime fabric", "canvas physics", "futuristic UI"],
        code: {
            html: `<div class="mesh-container">
    <canvas id="meshCanvas"></canvas>
    <div class="content-overlay">
        <h1>SPACETIME FABRIC</h1>
        <p>Interactive Gravity Field Active</p>
    </div>
</div>`,
            css: `.mesh-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #030014; /* Deep space dark */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#meshCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    /* Key for integration: pointer-events none allows clicks to pass through to buttons/links below */
    pointer-events: none; 
}

.content-overlay {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    font-family: 'Inter', sans-serif;
    pointer-events: auto; /* Re-enable pointer events for content */
}

h1 {
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 0.2em;
    background: linear-gradient(to right, #fff, #444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}`,
            js: `const canvas = document.getElementById('meshCanvas');
const ctx = canvas.getContext('2d');

let nodes = [];
const spacing = 45; // Grid density
const mouse = { x: -1000, y: -1000, radius: 250 };

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nodes = [];

    // Create a 2D array of nodes
    for (let x = 0; x <= canvas.width + spacing; x += spacing) {
        for (let y = 0; y <= canvas.height + spacing; y += spacing) {
            nodes.push({
                baseX: x, baseY: y,
                x: x, y: y,
                vx: 0, vy: 0
            });
        }
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', init);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw horizontal and vertical lines would be expensive in loops
    // Instead, we draw dots and let the logic handle the "bending"
    
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.2)';
    ctx.lineWidth = 1;

    // Update Physics
    nodes.forEach(node => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            // Gravity Pull
            node.vx += Math.cos(angle) * force * 4;
            node.vy += Math.sin(angle) * force * 4;
        }

        // Spring Physics (Return to home)
        node.vx += (node.baseX - node.x) * 0.04;
        node.vy += (node.baseY - node.y) * 0.04;
        
        // Friction
        node.vx *= 0.88;
        node.vy *= 0.88;

        node.x += node.vx;
        node.y += node.vy;
    });

    // Drawing Grid Lines beautifully
    const rows = Math.ceil(canvas.height / spacing) + 1;
    const cols = Math.ceil(canvas.width / spacing) + 1;

    for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
            const node = nodes[i * rows + j];
            if (j === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
    }

    for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
            const node = nodes[i * rows + j];
            if (i === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();`
        }
    },
    {
        id: "solar-gravity-well",
        title: "Solar Gravity Well",
        description: "A heavy-mass gravity simulation featuring a glowing central orb. Grid lines are thickened and use proximity-based luminance to simulate light reflection on a 3D spacetime fabric.",
        tags: ["Gravity", "Solar", "Orb", "Glow", "Space", "Physics", "Canvas", "3D", "Interactive", "Simulation", "Cosmic", "Star", "Field", "Orbit", "System"],
        keywords: ["gravity well", "solar effect", "glowing orb", "spacetime mesh", "3D grid animation"],
        code: {
            html: `<div class="space-container">
    <canvas id="solarCanvas"></canvas>
    <div class="sun-orb" id="sunOrb"></div>
</div>`,
            css: `.space-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #020008;
    overflow: hidden;
}

#solarCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.sun-orb {
    position: absolute;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10;
    /* The Glow: Multi-layered box shadow for a 'heat' effect */
    box-shadow: 
        0 0 20px #e05757ff,
        0 0 60px #f59e0b,
        0 0 100px #ea580c,
        0 0 200px rgba(234, 88, 12, 0.4);
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
}`,
            js: `const canvas = document.getElementById('solarCanvas');
const ctx = canvas.getContext('2d');
const orb = document.getElementById('sunOrb');

let nodes = [];
const spacing = 50; 
const mouse = { x: -1000, y: -1000, radius: 350, strength: 12 };

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nodes = [];
    for (let x = -spacing; x <= canvas.width + spacing; x += spacing) {
        for (let y = -spacing; y <= canvas.height + spacing; y += spacing) {
            nodes.push({ baseX: x, baseY: y, x: x, y: y, vx: 0, vy: 0 });
        }
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Move the DOM orb with the mouse
    orb.style.left = e.clientX + 'px';
    orb.style.top = e.clientY + 'px';
});

window.addEventListener('resize', init);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Line Aesthetics: Thicker and slightly brighter
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.3)'; 
    ctx.lineWidth = 2;

    nodes.forEach(node => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            // Heavier pull for that "Sun" feel
            node.vx += Math.cos(angle) * force * mouse.strength;
            node.vy += Math.sin(angle) * force * mouse.strength;
        }

        node.vx += (node.baseX - node.x) * 0.05;
        node.vy += (node.baseY - node.y) * 0.05;
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
    });

    const rows = Math.ceil(canvas.height / spacing) + 2;
    const cols = Math.ceil(canvas.width / spacing) + 2;

    // Drawing Vertical Bends
    for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
            const node = nodes[i * rows + j];
            if (!node) continue;
            if (j === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
    }

    // Drawing Horizontal Bends
    for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
            const node = nodes[i * rows + j];
            if (!node) continue;
            if (i === 0) ctx.moveTo(node.x, node.y);
            else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();`
        }
    },
    {
        id: "orbital-flux-field",
        title: "Orbital Flux Field",
        description: "A high-density interactive particle system. Thousands of colorful dots react to the cursor with a physical repulsion effect, mimicking the Google Antigravity project's landing page.",
        tags: ["Particles", "Flux", "Orbital", "Interactive", "Repulsion", "Physics", "Canvas", "Google Style", "Colorful", "Scatter", "Force", "Field", "Motion", "Web Interaction"],
        keywords: ["particle system", "antigravity", "cursor interaction", "canvas animation", "physics"],
        code: {
            html: `<div class="ag-container">
    <canvas id="agCanvas"></canvas>
    <div class="ag-content">
        <h1>ORBITAL FLUX</h1>
        <p>Interactive Particle Field Active</p>
    </div>
</div>`,
            css: `.ag-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #ffffff; /* White background like Google's site */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#agCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.ag-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: #3c4043;
    font-family: 'Google Sans', Arial, sans-serif;
}

h1 { font-size: 3rem; font-weight: 400; letter-spacing: -1px; }`,
            js: `const canvas = document.getElementById('agCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: -100, y: -100, radius: 150 };
const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Google Colors

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    
    // High density: approx 1 particle per 400 pixels
    const numberOfParticles = (canvas.width * canvas.height) / 400;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
            x: x, y: y,
            baseX: x, baseY: y,
            size: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            density: (Math.random() * 30) + 1
        });
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', init);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Calculate interaction
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        // Max distance, past that the force is 0
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * p.density;
        let directionY = forceDirectionY * force * p.density;

        if (distance < mouse.radius) {
            p.x -= directionX;
            p.y -= directionY;
        } else {
            // Return to home position
            if (p.x !== p.baseX) {
                let dx = p.x - p.baseX;
                p.x -= dx / 10;
            }
            if (p.y !== p.baseY) {
                let dy = p.y - p.baseY;
                p.y -= dy / 10;
            }
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

init();
animate();`
        }
    },
    {
        id: "3d-snowfall",
        title: "3D Snowfall",
        description: "An advanced 3D snowfall simulation where each particle possesses unique physical properties, resulting in randomized, non-uniform drifting patterns.",
        tags: ["Snow", "3D", "Weather", "Particles", "Atmospheric", "Winter", "Canvas", "Physics", "Procedural", "Animation", "Storm", "Cold", "Effect", "Visuals"],
        keywords: ["random motion", "atmospheric snow", "canvas physics", "3d particles", "procedural drift"],
        code: {
            html: `<div class="snow-scene">
    <canvas id="snowCanvas"></canvas>
    <div class="snow-ui">
        <h1>WINTER ARCHIVE</h1>
    </div>
</div>`,
            css: `.snow-scene {
    position: relative;
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at top, #0f172a, #020617);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
#snowCanvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
}
.snow-ui {
    position: relative;
    z-index: 10;
    color: white;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.8em;
    opacity: 0.4;
    pointer-events: none;
}`,
            js: `const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let flakes = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flakes = Array.from({ length: 130 }, () => new Snowflake());
}

class Snowflake {
    constructor() { this.reset(); }

    reset() {
        this.z = Math.random(); 
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = (this.z * 5) + 1.5; 
        this.speedY = (this.z * 0.6) + 0.3; 
        
        // RANDOMIZATION LOGIC:
        // Each flake gets a unique 'swing' speed and offset
        this.swingSpeed = Math.random() * 0.02 + 0.005; 
        this.swingRadius = Math.random() * 1.5 + 0.5;
        this.swingStep = Math.random() * Math.PI * 2; // Random starting phase
        
        this.opacity = (this.z * 0.5) + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.015;
        this.isCrystal = Math.random() > 0.65;
    }

    update() {
        this.y += this.speedY;
        
        // Apply individualized sine-wave horizontal motion
        this.swingStep += this.swingSpeed;
        this.x += Math.sin(this.swingStep) * this.swingRadius;
        
        // Add a slight constant drift based on size (simulating wind)
        this.x += (this.z * 0.2); 

        this.rotation += this.spin;
        if (this.y > canvas.height + 20) this.reset();
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.x < -20) this.x = canvas.width + 20;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.isCrystal) {
            ctx.scale(1, Math.abs(Math.cos(this.rotation * 0.3)));
            ctx.strokeStyle = \`rgba(255, 255, 255, \${this.opacity})\`;
            ctx.lineWidth = 0.8;
            for (let i = 0; i < 6; i++) {
                ctx.rotate(Math.PI / 3);
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, this.size);
                ctx.moveTo(0, this.size * 0.4); ctx.lineTo(this.size * 0.3, this.size * 0.6);
                ctx.stroke();
            }
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = \`rgba(255, 255, 255, \${this.opacity * 0.7})\`;
            ctx.fill();
        }
        ctx.restore();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flakes.sort((a, b) => a.z - b.z).forEach(f => {
        f.update();
        f.draw(ctx);
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();`
        }
    },
    {
        id: "neural-3d-constellation",
        title: "3D Neural Constellation",
        description: "A localized 3D particle mesh that drifts autonomously. Features depth-based perspective projection and elastic cursor interaction where lines 'snap' based on proximity.",
        tags: ["Neural", "Network", "Constellation", "3D", "Mesh", "Connections", "Canvas", "Interactive", "Geometric", "Nodes", "Data", "Visualization", "Graph", "Lines"],
        keywords: ["3D mesh", "neural network", "kinetic geometry", "canvas 3d", "interactive constellation"],
        code: {
            html: `<div class="constellation-container">
    <canvas id="neuralCanvas"></canvas>
</div>`,
            css: `.constellation-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #030014;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#neuralCanvas {
    /* Ensures the canvas occupies the space provided by the flex container */
    width: 100%;
    height: 100%;
    max-width: 800px;
    max-height: 600px;
    display: block;
    pointer-events: auto; 
}`,
            js: `const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let points = [];
const numPoints = 50;
const mouse = { x: 0, y: 0, active: false };
const center = { x: 0, y: 0 };

function init() {
    // FIX: Using window dimensions or explicit parent client rect ensures rendering in previews
    canvas.width = canvas.clientWidth || 800;
    canvas.height = canvas.clientHeight || 600;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
    points = [];

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            z: (Math.random() - 0.5) * 400,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            vz: (Math.random() - 0.5) * 0.5
        });
    }
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left - center.x;
    mouse.y = e.clientY - rect.top - center.y;
    mouse.active = true;
});

canvas.addEventListener('mouseleave', () => { mouse.active = false; });

function project(p) {
    const focalLength = 400;
    const scale = focalLength / (focalLength + p.z);
    return {
        x: p.x * scale + center.x,
        y: p.y * scale + center.y,
        scale: scale
    };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const projected = points.map(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > 200) p.vx *= -1;
        if (Math.abs(p.y) > 200) p.vy *= -1;
        if (Math.abs(p.z) > 200) p.vz *= -1;

        if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                p.x += dx * 0.02;
                p.y += dy * 0.02;
            }
        }
        return project(p);
    });

    ctx.lineWidth = 0.5;
    for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
            const dx = projected[i].x - projected[j].x;
            const dy = projected[i].y - projected[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = \`rgba(99, 102, 241, \${1 - dist/100})\`;
                ctx.moveTo(projected[i].x, projected[i].y);
                ctx.lineTo(projected[j].x, projected[j].y);
                ctx.stroke();
            }
        }
    }

    projected.forEach(p => {
        ctx.fillStyle = p.scale > 1 ? '#fff' : '#bbbac5ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

// Ensure init is called before animation starts
init();
animate();
window.addEventListener('resize', init);`
        }
    },
    {
        id: "aether-core-elastic",
        title: "Elastic Aether-Core",
        description: "A stable 3D constellation that deforms under cursor pressure and elastically restores its shape. Features restorative vector physics and depth-sorted crystalline facets.",
        tags: ["Elastic", "Aether", "Core", "3D", "Physics", "Deformation", "Holographic", "Canvas", "Interactive", "Geometry", "Crystalline", "Facet", "Structure", "Web UI"],
        keywords: ["restorative physics", "3D mesh", "elastic interaction", "holographic UI", "kinetic geometry"],
        code: {
            html: `<div class="aether-container">
    <canvas id="elasticAetherCanvas"></canvas>
</div>`,
            css: `.aether-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at center, #050510, #000);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#elasticAetherCanvas {
    width: 100%;
    height: 100%;
    display: block;
    cursor: crosshair;
}`,
            js: `const canvas = document.getElementById('elasticAetherCanvas');
const ctx = canvas.getContext('2d');

let points = [];
const numPoints = 60;
const mouse = { x: 0, y: 0, active: false };
let rotationAngle = 0;

function init() {
    // Fix: Force window dimensions for preview rendering
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * 450;
        const y = (Math.random() - 0.5) * 450;
        const z = (Math.random() - 0.5) * 450;
        points.push({
            x: x, y: y, z: z,
            homeX: x, homeY: y, homeZ: z,
            color: Math.random() > 0.8 ? '#06b6d4' : '#6366f1'
        });
    }
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left - canvas.width/2;
    mouse.y = e.clientY - rect.top - canvas.height/2;
    mouse.active = true;
});

canvas.addEventListener('mouseleave', () => { mouse.active = false; });

function project(p) {
    const cos = Math.cos(rotationAngle);
    const sin = Math.sin(rotationAngle);
    const rx = p.x * cos - p.z * sin;
    const rz = p.x * sin + p.z * cos;

    const focalLength = 500;
    const scale = focalLength / (focalLength + rz);
    return {
        x: rx * scale + canvas.width/2,
        y: p.y * scale + canvas.height/2,
        z: rz,
        scale: scale,
        baseColor: p.color
    };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rotationAngle += 0.002; 

    const projected = points.map(p => {
        if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 180) {
                const force = (180 - dist) / 180;
                p.x += dx * force * 0.1;
                p.y += dy * force * 0.1;
            }
        }
        p.x += (p.homeX - p.x) * 0.05;
        p.y += (p.homeY - p.y) * 0.05;
        p.z += (p.homeZ - p.z) * 0.05;
        return project(p);
    });

    projected.sort((a, b) => b.z - a.z);

    ctx.lineWidth = 0.5;
    for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
            const dist = Math.hypot(projected[i].x - projected[j].x, projected[i].y - projected[j].y);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = \`rgba(99, 102, 241, \${(1 - dist/100) * 0.2})\`;
                ctx.moveTo(projected[i].x, projected[i].y);
                ctx.lineTo(projected[j].x, projected[j].y);
                ctx.stroke();

                for (let k = j + 1; k < projected.length; k++) {
                    const dist2 = Math.hypot(projected[j].x - projected[k].x, projected[j].y - projected[k].y);
                    if (dist2 < 70) {
                        ctx.beginPath();
                        ctx.fillStyle = \`rgba(6, 182, 212, \${(1 - dist/100) * 0.04})\`;
                        ctx.moveTo(projected[i].x, projected[i].y);
                        ctx.lineTo(projected[j].x, projected[j].y);
                        ctx.lineTo(projected[k].x, projected[k].y);
                        ctx.fill();
                        break; 
                    }
                }
            }
        }
    }

    projected.forEach(p => {
        ctx.fillStyle = p.scale > 1.1 ? '#fff' : p.baseColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener('resize', init);`
        }
    },
    {
        id: "Earth-rotation-dark-mode-toggle",
        title: "Cinematic Earth - Dark Mode Toggle Button",
        description: "A full-screen cinematic day-night simulation controlled by a compact Earth toggle. Features animated sky transitions, city skyline, starry night background and smooth planet rotation.",
        tags: ["Earth", "Toggle", "Dark Mode", "Cinematic", "Planet", "Animation", "UI Component", "Switch", "Day/Night", "CSS", "Environment", "Global", "World", "Interactive"],
        keywords: ["dark mode toggle", "earth animation button", "cinematic theme switch", "starry night ui"],
        code: {
            html: `<div class="earth-wrapper">
    <button class="earth-toggle" id="earthToggle">

        <!-- SKY -->
        <div class="sky">
            <div class="day-sky"></div>
            <div class="night-sky"></div>
        </div>

        <!-- GROUND -->
        <div class="ground">
            <div class="landscape"></div>
            <div class="city">
                <div class="building"></div>
                <div class="building tall"></div>
                <div class="building small"></div>
            </div>
        </div>

        <!-- SUN + MOON -->
        <div class="sun"></div>
        <div class="moon"></div>

        <!-- EARTH -->
        <div class="earth">
            <div class="earth-core"></div>
            <div class="clouds"></div>
            <div class="atmosphere"></div>
        </div>

    </button>
</div>`,
            css: `* { margin:0; padding:0; box-sizing:border-box; }

/* ============================= */
/* FULL SCREEN CONTAINER */
/* ============================= */

.earth-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 1.2s ease;
}

/* LIGHT MODE BACKGROUND */
.earth-wrapper {
    background:
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%),
        linear-gradient(to top, #dbeafe, #93c5fd);
}

/* DARK MODE BACKGROUND */
.earth-wrapper.active {
    background:
        radial-gradient(circle at 70% 20%, rgba(255,255,255,0.05), transparent 40%),
        linear-gradient(to top, #020617, #000);
}

/* STAR FIELD (FULL SCREEN) */
.earth-wrapper.active::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        radial-gradient(2px 2px at 20% 30%, #fff, transparent),
        radial-gradient(1px 1px at 60% 70%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 80% 20%, #fff, transparent),
        radial-gradient(1px 1px at 30% 80%, #fff, transparent);
    opacity: 0.5;
    animation: twinkle 4s infinite alternate;
    pointer-events: none;
}

@keyframes twinkle {
    from { opacity: 0.3; }
    to { opacity: 0.7; }
}

/* ============================= */
/* TOGGLE BUTTON */
/* ============================= */

.earth-toggle {
    position: relative;
    width: 140px;
    height: 60px;
    border-radius: 60px;
    border: 2px solid rgba(255,255,255,0.5);
    backdrop-filter: blur(8px);
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    transition: border 0.6s ease, box-shadow 0.6s ease;
}

/* Dark glow border */
.earth-wrapper.active .earth-toggle {
    border: 2px solid rgba(255,255,255,0.15);
    box-shadow:
        0 0 15px rgba(56,189,248,0.5),
        0 10px 30px rgba(0,0,0,0.6);
}

/* ============================= */
/* SKY INSIDE BUTTON */
/* ============================= */

.sky {
    position: absolute;
    inset: 0;
}

.day-sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #93c5fd, #e0f2fe);
}

.night-sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #020617, #000);
    opacity: 0;
    transition: opacity 1s ease;
}

/* ============================= */
/* GROUND INSIDE BUTTON */
/* ============================= */

.ground {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
}

.landscape {
    width: 100%;
    height: 20px;
    background: #166534;
    clip-path: polygon(0% 100%, 15% 70%, 30% 85%, 50% 65%, 70% 80%, 85% 60%, 100% 100%);
    transition: opacity 1s ease;
}

.city {
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: 0;
    opacity: 0;
    transition: opacity 1s ease;
}

.building {
    position: absolute;
    bottom: 0;
    width: 8px;
    height: 16px;
    background: #111827;
}

.building::after {
    content:"";
    position:absolute;
    inset:2px;
    background: repeating-linear-gradient(
        to bottom,
        #facc15 0px,
        #facc15 2px,
        transparent 2px,
        transparent 4px
    );
}

.tall { left: 50px; height: 20px; }
.small { left: 80px; height: 12px; }

/* ============================= */
/* SUN & MOON */
/* ============================= */

.sun {
    position: absolute;
    width: 26px;
    height: 26px;
    top: 16px;
    left: 18px;
    border-radius: 50%;
    background: radial-gradient(circle, #fde047, #f97316);
    box-shadow: 0 0 20px #facc15;
    transition: opacity 1s ease;
}

.moon {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 18px;
    right: 18px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #fff, #d1d5db);
    box-shadow: inset -4px -4px 0 #9ca3af;
    opacity: 0;
    transition: opacity 1s ease;
}

/* ============================= */
/* EARTH */
/* ============================= */

.earth {
    position: absolute;
    width: 42px;
    height: 42px;
    top: 9px;
    left: 9px;
    border-radius: 50%;
    overflow: hidden;
    transition: transform 1.2s cubic-bezier(0.65,0,0.35,1);
}

.earth-core {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 40%),
        linear-gradient(180deg, #1e90ff, #0f172a);
    animation: spin 25s linear infinite;
}

.clouds {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
        radial-gradient(circle at 40% 50%, rgba(255,255,255,0.5) 8%, transparent 20%);
    animation: spinReverse 40s linear infinite;
}

.atmosphere {
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(56,189,248,0.8);
}

/* ============================= */
/* ACTIVE STATES */
/* ============================= */

.earth-toggle.active .night-sky { opacity: 1; }
.earth-toggle.active .city { opacity: 1; }
.earth-toggle.active .landscape { opacity: 0; }
.earth-toggle.active .sun { opacity: 0; }
.earth-toggle.active .moon { opacity: 1; }

.earth-toggle.active .earth {
    transform: translateX(75px) rotate(360deg);
}

/* Animations */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes spinReverse {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
}`,
            js: `const earthToggle = document.getElementById('earthToggle');
const wrapper = document.querySelector('.earth-wrapper');

earthToggle.addEventListener('click', () => {
    earthToggle.classList.toggle('active');
    wrapper.classList.toggle('active');
});`
        }
    },
    {
        id: "bioluminescent-tendrils",
        title: "Bioluminescent Tendril Field",
        description: "An organic, reactive background where glowing fiber-optic tendrils sprout from the cursor. Uses inverse kinematics and spring physics to simulate life-like movement and fluid decay.",
        tags: ["Tendrils", "Bioluminescent", "Organic", "Inverse Kinematics", "Canvas", "Interactive", "Procedural", "Glow", "Nature", "Deep Sea", "Fiber Optic", "Simulation", "Fluid"],
        keywords: ["procedural animation", "bioluminescence", "interactive background", "canvas physics", "inverse kinematics"],
        code: {
            html: `<div class="tendril-container">
    <canvas id="tendrilCanvas"></canvas>
    <div class="tendril-ui">
        <h1>NEURAL BLOOM</h1>
        <p>Move your cursor to spark life</p>
    </div>
</div>`,
            css: `.tendril-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #010208; /* Deep abyss blue */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#tendrilCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.tendril-ui {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    font-family: 'Inter', sans-serif;
    pointer-events: none;
    text-shadow: 0 0 20px rgba(0,0,0,0.5);
}

h1 {
    font-size: 3rem;
    font-weight: 200;
    letter-spacing: 15px;
    margin-bottom: 10px;
    background: linear-gradient(to bottom, #fff, #444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

p {
    font-size: 0.9rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    opacity: 0.4;
}`,
            js: `const canvas = document.getElementById('tendrilCanvas');
const ctx = canvas.getContext('2d');

let tendrils = [];
const mouse = { x: 0, y: 0, moved: false };

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', init);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.moved = true;
    // Spawn a new tendril on move
    if (Math.random() > 0.5) {
        tendrils.push(new Tendril(mouse.x, mouse.y));
    }
});

class Tendril {
    constructor(x, y) {
        this.segments = [];
        this.numSegments = Math.floor(Math.random() * 15 + 10);
        this.length = Math.random() * 8 + 4;
        this.angle = Math.random() * Math.PI * 2;
        this.v = { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 };
        this.life = 1.0;
        this.decay = Math.random() * 0.01 + 0.005;
        this.color = \`hsl(\${Math.random() * 40 + 180}, 100%, 60%)\`; // Cyan/Blue range

        for (let i = 0; i < this.numSegments; i++) {
            this.segments.push({ x: x, y: y });
        }
    }

    update() {
        this.life -= this.decay;
        
        // Head movement
        this.segments[0].x += this.v.x;
        this.segments[0].y += this.v.y;
        
        // Waving motion
        this.v.x += Math.sin(this.life * 10) * 0.2;
        this.v.y += Math.cos(this.life * 10) * 0.2;

        // Follow the leader logic (Inverse Kinematics)
        for (let i = 1; i < this.numSegments; i++) {
            const seg = this.segments[i];
            const prev = this.segments[i - 1];
            const dx = prev.x - seg.x;
            const dy = prev.y - seg.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            if (distance > this.length) {
                seg.x = prev.x - Math.cos(angle) * this.length;
                seg.y = prev.y - Math.sin(angle) * this.length;
            }
        }
    }

    draw() {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = this.life;
        ctx.strokeStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15 * this.life;

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);

        for (let i = 1; i < this.numSegments; i++) {
            ctx.lineWidth = (this.numSegments - i) * 0.8 * this.life;
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }
}

function animate() {
    // Slight trail effect by not clearing fully
    ctx.fillStyle = 'rgba(1, 2, 8, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    tendrils = tendrils.filter(t => t.life > 0);
    tendrils.forEach(t => {
        t.update();
        t.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();`
        }
    },
    {
        id: "Solar-System-Navbar",
        title: "Solar System Inspired Navbar",
        description: "A high-fidelity spatial navbar. Planets feature procedural light-tracking, holographic telemetry, and a cinematic 'Warp' transition that stretches the starfield on click.",
        tags: ["Solar System", "Navbar", "Space", "Warp", "Cinematic", "Planets", "Navigation", "UI Component", "Canvas", "Animation", "Futuristic", "Menu", "Interface", "Stars"],
        keywords: ["cinematic navbar", "warp speed transition", "spatial ui", "nasa aesthetics", "canvas physics"],
        code: {
            html: `
<div class="space-viewport" id="viewport">
    <div class="warp-tunnel"></div>
    <div class="starfield-v2"></div>
    <canvas id="voidCanvas"></canvas>
    <div id="ui-labels"></div>
</div>
`,
            css: `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

.space-viewport {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #000;
    overflow: hidden;
    cursor: crosshair;
}

/* Starfield with depth */
.starfield-v2 {
    position: absolute;
    inset: -10%;
    background: 
        radial-gradient(1px 1px at 10% 10%, #fff, transparent),
        radial-gradient(2px 2px at 50% 50%, #fff 50%, transparent),
        radial-gradient(1px 1px at 80% 30%, #fff, transparent);
    background-size: 300px 300px;
    opacity: 0.4;
    transition: transform 0.5s cubic-bezier(0.2, 0, 0.2, 1);
}

/* Warp Animation Class */
.warping .starfield-v2 {
    transform: scale(4) rotate(5deg) !important;
    filter: blur(2px) contrast(2);
    opacity: 0;
    transition: all 1.2s cubic-bezier(0.7, 0, 0.3, 1);
}

#voidCanvas { position: absolute; inset: 0; z-index: 5; }

/* Futuristic Labels */
.nav-tag {
    position: absolute;
    padding: 10px;
    border-left: 1px solid rgba(0, 255, 255, 0.5);
    color: #fff;
    font-family: 'Orbitron', sans-serif;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 10;
}

.nav-tag .title {
    font-size: 14px;
    letter-spacing: 4px;
    text-transform: uppercase;
    display: block;
}

.nav-tag .coord {
    font-size: 8px;
    color: #0ff;
    opacity: 0.7;
}
`,
            js: `
const canvas = document.getElementById("voidCanvas");
const ctx = canvas.getContext("2d");
const uiLayer = document.getElementById("ui-labels");
const viewport = document.getElementById("viewport");

let width, height;
let planets = [];
const mouse = { x: 0, y: 0 };

// High-end planetary colors
const system = [
  { name: "Terminal", radius: 180, speed: 0.003, size: 25, color: "#1a2c42", detail: "#4facfe" },
  { name: "Sector-7", radius: 280, speed: 0.002, size: 45, color: "#2d1b42", detail: "#f093fb" },
  { name: "Nexus", radius: 400, speed: 0.0015, size: 35, color: "#1b4231", detail: "#43e97b" },
  { name: "Void", radius: 550, speed: 0.001, size: 55, color: "#42281b", detail: "#fa709a" }
];

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  uiLayer.innerHTML = '';
  
  planets = system.map(data => {
    const el = document.createElement('div');
    el.className = 'nav-tag';
    el.innerHTML = \`<span class="title">\${data.name}</span><span class="coord">VECT_0\${Math.floor(Math.random()*9)}</span>\`;
    uiLayer.appendChild(el);
    
    return { ...data, angle: (Math.random()-0.5) * Math.PI, el, hover: 0 };
  });
}

// Click to Warp Transition
canvas.addEventListener('mousedown', () => {
  viewport.classList.add('warping');
  setTimeout(() => viewport.classList.remove('warping'), 2000);
});

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawSun() {
  const sunX = 0, sunY = height/2;
  const g = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 150);
  g.addColorStop(0, "#fff");
  g.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
  g.addColorStop(0.4, "rgba(0, 255, 255, 0.1)");
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 150, 0, Math.PI*2);
  ctx.fill();
}

function drawPlanet(p) {
  p.angle += p.speed * (1 - p.hover * 0.7);
  if(p.angle > Math.PI/2) p.angle = -Math.PI/2;

  const x = Math.cos(p.angle) * p.radius;
  const y = height/2 + Math.sin(p.angle) * p.radius;

  const dist = Math.hypot(mouse.x - x, mouse.y - y);
  p.hover += (dist < p.size * 1.5 ? 1 - p.hover : 0 - p.hover) * 0.1;

  // Orbit path
  ctx.strokeStyle = \`rgba(255,255,255, \${0.05 + p.hover * 0.1})\`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, height/2, p.radius, -Math.PI/2, Math.PI/2);
  ctx.stroke();

  // Planet Shading
  ctx.save();
  ctx.translate(x, y);
  
  const grad = ctx.createRadialGradient(-p.size*0.3, -p.size*0.3, 0, 0, 0, p.size);
  grad.addColorStop(0, "#fff");
  grad.addColorStop(0.4, p.color);
  grad.addColorStop(1, "#000");

  ctx.shadowBlur = 20 * p.hover;
  ctx.shadowColor = p.detail;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, p.size * (1 + p.hover * 0.1), 0, Math.PI*2);
  ctx.fill();

  // Atmosphere Rim
  ctx.strokeStyle = \`rgba(0, 255, 255, \${0.2 + p.hover * 0.3})\`;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // UI Placement
  p.el.style.opacity = p.hover > 0.1 ? 1 : 0;
  p.el.style.left = \`\${x + 40}px\`;
  p.el.style.top = \`\${y}px\`;
}

function animate() {
  ctx.clearRect(0,0,width,height);
  
  const sX = (mouse.x - width/2) * 0.02;
  const sY = (mouse.y - height/2) * 0.02;
  document.querySelector('.starfield-v2').style.transform = \`translate(\${sX}px, \${sY}px)\`;
  
  drawSun();
  planets.forEach(drawPlanet);
  requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener("resize", init);
`
        }
    },
    {
        id: "neon-button",
        title: "Cyberpunk Neon Glow Button Effect",
        description: "Create a futuristic cyberpunk-style button with pulsating neon glow effects using pure CSS box-shadow and text-shadow. Perfect for gaming websites and modern dark-mode UIs. This effect utilizes CSS keyframes for smooth animation and hover states.",
        tags: ["Neon", "Button", "Cyberpunk", "Glow", "CSS", "UI Component", "Animation", "Hover Effect", "Light", "Web Design", "Interactive", "Pulsating", "Electric"],
        keywords: ["css neon button", "cyberpunk css", "glowing button", "css3 animation", "web design effects", "box-shadow glow"],
        code: {
            html: `<button class="neon-button">
    HOVER ME
</button>`,
            css: `/* Define the custom font family in your project if needed */
.neon-button {
    font-size: 1.5rem;
    padding: 1rem 3rem;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px; /* Slightly rounded */
    position: relative;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 0 10px rgba(3, 233, 244, 0.2);
    /* Neon accent */
}

/* Container for consistency */
body {
    background: #030014;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    position: relative;
}

/* Tech Grid Background */
body::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    pointer-events: none;
    z-index: -1;
}

.neon-button:hover {
    background: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 200px #03e9f4;
     -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}`,
            js: `// No JavaScript needed for this CSS-only effect!`
        }
    },
    {
        id: "glass-morphism",
        title: "Modern Glassmorphism Card UI",
        description: "Implement the popular Glassmorphism design trend using CSS backdrop-filter: blur(). This card features a frosted glass look with semi-transparent background, subtle borders, and smooth noise texture, suitable for modern dashboard designs and overlay cards.",
        tags: ["Glassmorphism", "Card", "UI", "CSS", "Frosted Glass", "Modern", "Transparency", "Blur", "Backdrop Filter", "Web Trend", "Overlay", "Visual Effect", "Clean"],
        keywords: ["glassmorphism css", "backdrop-filter", "frosted glass effect", "ui design trend", "css card design", "transparency"],
        code: {
            html: `<div class="glass-container">
    <div class="glass-card">
        <h2>Glass Card</h2>
        <p>This is a modern glassmorphism effect using backdrop-filter. It creates a frosted glass look.</p>
        <button class="glass-btn">Read More</button>
    </div>
</div>`,
            css: `.glass-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #030014; /* Deep space dark */
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
}

/* Grid Background */
.glass-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    pointer-events: none;
}

/* Floating Orb for visual interest */
.glass-container::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    filter: blur(80px);
    border-radius: 50%;
    z-index: 0;
    opacity: 0.4;
    animation: float 10s infinite ease-in-out;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, -50px); }
}

.glass-card {
    background: rgba(255, 255, 255, 0.05); /* Lighter glass */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding: 40px;
    border-radius: 20px;
    color: white;
    max-width: 350px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    z-index: 1;
}

.glass-card h2 {
    margin-top: 0;
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, #fff, #aaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.glass-card p {
    font-weight: 400;
    opacity: 0.7;
    line-height: 1.6;
    font-size: 0.95rem;
    margin-bottom: 2rem;
}

.glass-btn {
    padding: 12px 24px;
    border: none;
    background: linear-gradient(45deg, #ec4899, #8b5cf6);
    color: white;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

.glass-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(236, 72, 153, 0.5);
}`,
            js: `// No JavaScript needed! pure CSS magic.`
        }
    },
    {
        id: "magnetic-button",
        title: "Magnetic Button Interaction",
        description: "A highly interactive button that magnetically attracts to the user's cursor movement. This advanced JavaScript effect calculates mouse position relative to the element to create a fluid, organic feel. Ideal for call-to-action buttons that demand attention.",
        tags: ["Magnetic", "Button", "Interaction", "Mouse Effect", "UI Component", "JavaScript", "Physics", "Attraction", "Cursor", "Web Interaction", "Fluid", "Organic"],
        keywords: ["magnetic button", "javascript interaction", "mousemove effect", "interactive ui", "cursor effect", "gsap alternative"],
        code: {
            html: `<div class="container">
    <button class="magnetic-btn">
        <span class="text">Catch Me</span>
    </button>
</div>`,
            css: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: #030014; /* Deep space dark */
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
}

/* Tech Grid Background */
.container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    pointer-events: none;
}

.magnetic-btn {
    padding: 25px 50px;
    font-size: 18px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05); /* Glassy base */
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.1s ease; /* Smooth reset, JS handles active move */
    position: relative;
    overflow: hidden;
    z-index: 1;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Gradient text or glow */
.magnetic-btn .text {
    position: relative;
    z-index: 2;
    pointer-events: none;
}

/* Magnetic Hover Gradient */
.magnetic-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
    z-index: -1;
    transition: opacity 0.3s;
    opacity: 0;
    border-radius: 50px;
}

.magnetic-btn:hover {
    box-shadow: 
        0 0 30px rgba(99, 102, 241, 0.4),
        0 0 60px rgba(139, 92, 246, 0.2);
    border-color: rgba(255,255,255,0.2);
}

.magnetic-btn:hover::before {
    opacity: 1;
}`,
            js: `const btn = document.querySelector('.magnetic-btn');

// Config
const strength = 0.5; // How strong the magnet is

btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    
    // Calculate distance from center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move button towards mouse
    btn.style.transform = \`translate(\${x * strength}px, \${y * strength}px)\`;
});

btn.addEventListener('mouseleave', () => {
    // Reset position
    btn.style.transform = 'translate(0px, 0px)';
});`
        }
    },
    {
        id: "uncatchable-button",
        title: "Uncatchable Button",
        description: "A playful button that intelligently evades your cursor! It calculates the approach vector and moves in the opposite direction, ensuring it never leaves the screen area. Try to corner it if you can!",
        tags: ["Uncatchable", "Button", "Game", "Interactive", "Prank", "Dodging", "JavaScript", "Fun", "Mouse Interaction", "Evasion", "Web Game", "Challenge", "Playful"],
        keywords: ["uncatchable button", "dodging button", "javascript game", "interactive ui", "prank ui", "mouse interaction", "vector math"],
        code: {
            html: `<div class="game-container">
    <button class="dodging-btn">Can't Touch This</button>
</div>`,
            css: `.game-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: #030014; /* Deep space dark */
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
}

/* Optional grid background for tech feel */
.game-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    pointer-events: none;
}

.dodging-btn {
    position: absolute;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 
        0 0 20px rgba(168, 85, 247, 0.2),
        inset 0 0 20px rgba(168, 85, 247, 0.1);
    transition: all 0.05s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    z-index: 10;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 1px;
    overflow: hidden;
}

/* Gradient border effect */
.dodging-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1px; 
    background: linear-gradient(45deg, #ec4899, #8b5cf6, #06b6d4);
    -webkit-mask: 
       linear-gradient(#fff 0 0) content-box, 
       linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

/* Hover glow */
.dodging-btn:hover {
    box-shadow: 
        0 0 30px rgba(236, 72, 153, 0.4),
        0 0 60px rgba(139, 92, 246, 0.2);
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.1);
}

.dodging-btn:active {
    transform: scale(0.95);
}`,
            js: `const btn = document.querySelector('.dodging-btn');
const container = document.querySelector('.game-container');

// Configuration
const padding = 250; // Detection radius
const speed = 4.0; // Evasion speed

let btnX = 0;
let btnY = 0;

// Initialize to center
const init = () => {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    btnX = (containerRect.width - btnRect.width) / 2;
    btnY = (containerRect.height - btnRect.height) / 2;
    updatePosition();
};

const updatePosition = () => {
    btn.style.left = \`\${btnX}px\`;
    btn.style.top = \`\${btnY}px\`;
};

container.addEventListener('mousemove', (e) => {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    // Mouse position relative to container
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Button center
    const btnCenterX = btnX + btnRect.width / 2;
    const btnCenterY = btnY + btnRect.height / 2;
    
    // Distance
    const dx = mouseX - btnCenterX;
    const dy = mouseY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < padding) {
        // TELEPORT IF CORNERED
        // If we are close to ANY wall (not just corners) and mouse is very close
        const isNearWall = btnX <= 10 || btnX >= maxX - 10 || btnY <= 10 || btnY >= maxY - 10;
        
        if (isNearWall && distance < 100) {
            // Teleport to a safer spot (opposite side of mouse)
            // Or just random center area to be safe
             btnX = Math.random() * (maxX * 0.6) + (maxX * 0.2);
             btnY = Math.random() * (maxY * 0.6) + (maxY * 0.2);
             updatePosition();
             return; // Skip normal movement
        }

        // Standard Move
        const moveX = -(dx / distance) * (padding - distance) * speed;
        const moveY = -(dy / distance) * (padding - distance) * speed;
        
        let newX = btnX + moveX;
        let newY = btnY + moveY;
        
        // Boundaries
        newX = Math.min(Math.max(0, newX), maxX);
        newY = Math.min(Math.max(0, newY), maxY);
        
        btnX = newX;
        btnY = newY;
        
        updatePosition();
    }
});

window.addEventListener('resize', init);
setTimeout(init, 100);

btn.addEventListener('click', () => {
    alert("Impossible! You caught me! 🤯");
});`
        }
    },
    {
        id: "neon-typewriter",
        title: "Glow-Flow Typewriter",
        description: "A high-end text rotation effect with a rhythmic blinking cursor. Features a multi-layered text-shadow for a neon 'bloom' effect that matches modern dark-mode aesthetics.",
        tags: ["Typewriter", "Neon", "Text", "Glow", "Animation", "Modern", "UI", "Effect", "Typing", "Retro", "Cyber", "Input", "Dynamic"],
        keywords: ["typewriter", "neon text", "blinking cursor", "modern ui"],
        code: {
            html: `<div class="tw-wrapper">
    <h1 class="tw-title">
        Always <span id="tw-target" class="tw-accent"></span><span class="tw-cursor">_</span>
    </h1>
</div>`,
            css: `/* Update your Typewriter Effect CSS to this */
.tw-wrapper {
    /* Ensure the container is always full-width/height of the iframe */
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    
    /* Centralize content */
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* This forces the background color to fill the entire preview area */
    background-color: #030014; 
    overflow: hidden;
    position: relative;
}

.tw-title {
    color: #fff;
    font-size: 3.5rem;
    font-weight: 800;
    text-align: center;
    white-space: nowrap;
    /* Use flex here to keep "Always", the text, and cursor in one line */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2em; /* This controls the gap between "Always" and your changing text */
}

.tw-accent {
    /* Remove the large min-width that was pushing the cursor away */
    display: inline-block;
    min-width: 20px; 
    text-align: left;
    background: linear-gradient(to right, #f472b6, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.tw-cursor {
    color: #f472b6;
    /* Use margin-left to pull it slightly closer to the text if needed */
    margin-left: -0.1em; 
    font-weight: 200;
    animation: blink 0.8s step-end infinite;
}
@keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
}`,
            js: `const target = document.getElementById('tw-target');
const words = ["Evolving", "Coding", "Scaling", "Refining"];
let wordIdx = 0, charIdx = 0, deleting = false;

function play() {
    const word = words[wordIdx];
    target.innerText = word.substring(0, charIdx + (deleting ? -1 : 1));
    charIdx += deleting ? -1 : 1;

    let speed = deleting ? 100 : 200;
    if (!deleting && charIdx === word.length) {
        deleting = true;
        speed = 2000;
    } else if (deleting && charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 500;
    }
    setTimeout(play, speed);
}
play();`
        }
    },
    {
        id: "magnetic-social-icons",
        title: "Gravity-Flex Social Dock",
        description: "A liquid-interaction social bar where icons exhibit gravitational pull. Icons are wrapped in anchor tags, making it a fully functional navigation component for your portfolio or landing page.",
        tags: ["Social Icons", "Magnetic", "Dock", "Navigation", "Links", "Interactive", "JavaScript", "UI Component", "Floating", "Web Dock", "Menu", "Physics", "Icons"],
        keywords: ["magnetic icons", "social media links", "navigation dock", "javascript interaction", "vector math"],
        code: {
            html: `<div class="social-dock">
    <a href="/" target="_blank" class="magnetic-item" data-platform="github" title="GitHub">
        <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </div>
    </a>
    <a href="/" target="_blank" class="magnetic-item" data-platform="youtube" title="YouTube">
        <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
        </div>
    </a>
    <a href="/" target="_blank" class="magnetic-item" data-platform="instagram" title="Instagram">
        <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
        </div>
    </a>
    <a href="/" target="_blank" class="magnetic-item" data-platform="twitter" title="X (Twitter)">
        <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </div>
    </a>
    <a href="/" target="_blank" class="magnetic-item" data-platform="linkedin" title="LinkedIn">
        <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </div>
    </a>
</div>`,
            css: `/* (Keeping the same CSS as before) */
body {
    background: #030014;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.social-dock {
    display: flex;
    gap: 1.5rem;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.magnetic-item {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none; /* Important for links */
    cursor: pointer;
    position: relative;
}

.icon-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #64748b;
    transition: color 0.3s ease, transform 0.15s ease-out;
}

.icon-wrapper svg {
    width: 22px;
    height: 22px;
}

.magnetic-item[data-platform="github"]:hover .icon-wrapper { color: #fff; filter: drop-shadow(0 0 8px #fff); }
.magnetic-item[data-platform="youtube"]:hover .icon-wrapper { color: #ff0000; filter: drop-shadow(0 0 8px #ff0000); }
.magnetic-item[data-platform="instagram"]:hover .icon-wrapper { color: #f472b6; filter: drop-shadow(0 0 8px #f472b6); }
.magnetic-item[data-platform="twitter"]:hover .icon-wrapper { color: #38bdf8; filter: drop-shadow(0 0 8px #38bdf8); }
.magnetic-item[data-platform="linkedin"]:hover .icon-wrapper { color: #60a5fa; filter: drop-shadow(0 0 8px #60a5fa); }`,
            js: `const items = document.querySelectorAll('.magnetic-item');

items.forEach(item => {
    const wrapper = item.querySelector('.icon-wrapper');
    
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        wrapper.style.transform = \`translate(\${dx * 0.4}px, \${dy * 0.4}px) scale(1.2)\`;
    });
    
    item.addEventListener('mouseleave', () => {
        wrapper.style.transform = 'translate(0px, 0px) scale(1)';
    });
});`
        }
    },
    {
        id: "3d-confetti-burst",
        title: "Cosmic Burst 3D Confetti",
        description: "A high-performance, canvas-based 3D confetti system. Particles feature realistic gravity, wind resistance, and 3D flip-rotation. Designed with a non-blocking pointer layer to work seamlessly over existing UI.",
        tags: ["Confetti", "3D", "Celebration", "Burst", "Particles", "Canvas", "Animation", "Physics", "Button Trigger", "Party", "Effect", "Visuals", "Explosion"],
        keywords: ["3d confetti", "canvas animation", "physics particles", "react compatible", "ui interaction"],
        code: {
            html: `<div class="confetti-wrapper">
    <canvas id="confettiCanvas"></canvas>
    <div class="ui-content">
        <h1>Celebration Ready</h1>
        <p>Click the button below to trigger the burst.</p>
        <button id="triggerBtn">Blast Confetti</button>
    </div>
</div>`,
            css: `.confetti-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #030014;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#confettiCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    /* The Magic: This allows clicks to pass through to the buttons below */
    pointer-events: none; 
    z-index: 50;
}

.ui-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    font-family: 'Inter', sans-serif;
}

#triggerBtn {
    padding: 12px 28px;
    background: linear-gradient(45deg, #ec4899, #8b5cf6);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(236, 72, 153, 0.3);
    transition: transform 0.2s;
}

#triggerBtn:active { transform: scale(0.95); }`,
            js: `const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('triggerBtn');

let particles = [];
const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#fbbf24', '#ffffff'];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 3D Velocity
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 1) * 20;
        
        // 3D Rotation physics
        this.rotation = Math.random() * 360;
        this.rSpeed = (Math.random() - 0.5) * 0.2;
        this.wobble = Math.random() * 10;
        this.gravity = 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.99; // Air resistance
        this.rotation += this.rSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Simulate 3D flip by scaling width based on wobble/rotation
        const scaleX = Math.cos(this.rotation + this.wobble);
        ctx.scale(scaleX, 1);
        
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

function burst() {
    for(let i=0; i<100; i++) {
        particles.push(new Particle(canvas.width/2, canvas.height/2));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.y < canvas.height + 100);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

btn.addEventListener('click', burst);
animate();`
        }
    },
    {
        id: "gravity-mesh-dots",
        title: "Gravity Mesh 3D Dots",
        description: "A procedurally generated 3D coordinate system that deforms based on cursor proximity. Features a hybrid line-and-dot architecture with spring-physics relaxation for a liquid-smooth spatial effect.",
        tags: ["Gravity", "Mesh", "Dots", "3D", "Grid", "Procedural", "Canvas", "Physics", "Interactive", "Space", "Points", "Field", "Simulation", "Web Effect"],
        keywords: ["3D grid", "gravity pull", "procedural background", "canvas physics", "futuristic UI"],
        code: {
            html: `<div class="canvas-container">
    <canvas id="gravityGrid"></canvas>
    <div class="overlay-content">
        <h1>NEURAL SPACE</h1>
        <p>Interactive Gravity Field Active</p>
    </div>
</div>`,
            css: `.canvas-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #030014;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#gravityGrid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allows interaction with UI below */
}

.overlay-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    font-family: 'Inter', sans-serif;
    pointer-events: auto; /* Buttons here will still work */
}

h1 {
    font-size: 4rem;
    font-weight: 900;
    letter-spacing: 10px;
    background: linear-gradient(to right, #fff, #444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}`,
            js: `const canvas = document.getElementById('gravityGrid');
const ctx = canvas.getContext('2d');

let width, height;
let nodes = [];
const spacing = 40; // Space between grid lines
const mouse = { x: -1000, y: -1000, radius: 200 };

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    nodes = [];

    for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
            nodes.push({
                baseX: x,
                baseY: y,
                x: x,
                y: y,
                vx: 0,
                vy: 0
            });
        }
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', init);

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Line style
    ctx.strokeStyle = 'rgba(128, 128, 255, 0.15)';
    ctx.lineWidth = 1;

    nodes.forEach(node => {
        // Calculate distance to mouse
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
            // Gravity Pull Logic
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            // Move toward mouse
            node.vx += Math.cos(angle) * force * 5;
            node.vy += Math.sin(angle) * force * 5;
        }

        // Return to base position (Spring Physics)
        node.vx += (node.baseX - node.x) * 0.05;
        node.vy += (node.baseY - node.y) * 0.05;
        
        // Friction
        node.vx *= 0.85;
        node.vy *= 0.85;

        node.x += node.vx;
        node.y += node.vy;

        // Draw Dots
        ctx.fillStyle = 'rgba(0, 255, 200, 0.4)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Grid Lines
    // For performance, we draw dots above. For lines, a simple logic:
    // We can draw connections to neighboring nodes here.
    
    requestAnimationFrame(animate);
}

init();
animate();`
        }
    },
{
    id: "parallax-depth-card",
    title: "Dimensional Depth 3D Card",
    description: "A compact 3D parallax card with reactive lighting and premium skeleton-style placeholder content for futuristic UI loading states.",
    tags: ["3D", "Parallax", "Skeleton", "Glass", "Depth", "Interactive", "Premium UI"],
    keywords: ["3d loading card", "parallax skeleton ui", "glass depth card", "reactive glare card"],
    code: {
        html: `
<div class="parallax-scene">
    <div class="parallax-card" id="parallaxCard">
        
        <div class="layer layer-bg"></div>
        <div class="layer layer-orb"></div>
        
        <div class="layer layer-content">
            <div class="skeleton-icon"></div>
            <div class="skeleton-line large"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line small"></div>
            <div class="skeleton-button"></div>
        </div>

        <div class="layer layer-glare"></div>
        <div class="layer layer-glass"></div>
    </div>
</div>
`,

        css: `
.parallax-scene {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #030014;
    perspective: 1000px;
}

/* Smaller Card */
.parallax-card {
    position: relative;
    width: 220px;
    height: 320px;
    border-radius: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    transform-style: preserve-3d;
    cursor: pointer;
    overflow: visible;
    will-change: transform;
}

/* Ambient glow */
.parallax-card::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: linear-gradient(45deg, #8b5cf6, #ec4899);
    opacity: 0.07;
    filter: blur(25px);
    animation: breathe 5s ease-in-out infinite alternate;
    z-index: -1;
}

@keyframes breathe {
    from { opacity: 0.04; }
    to { opacity: 0.1; }
}

.layer {
    position: absolute;
    inset: 0;
    padding: 25px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    pointer-events: none;
}

/* Depth layers */
.layer-bg {
    transform: translateZ(-25px);
    background: radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08), transparent 70%);
}

.layer-orb {
    transform: translateZ(35px);
}
.layer-orb::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 20%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ec4899, #8b5cf6);
    filter: blur(30px);
    opacity: 0.4;
}

/* Skeleton Content */
.layer-content {
    transform: translateZ(60px);
    justify-content: center;
    align-items: flex-start;
    pointer-events: auto;
}

/* Skeleton animation */
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.skeleton-icon,
.skeleton-line,
.skeleton-button {
    background: linear-gradient(
        90deg,
        rgba(255,255,255,0.05) 25%,
        rgba(255,255,255,0.12) 50%,
        rgba(255,255,255,0.05) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite linear;
    border-radius: 8px;
}

.skeleton-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
}

.skeleton-line.large {
    width: 100%;
    height: 14px;
}

.skeleton-line.medium {
    width: 80%;
    height: 12px;
}

.skeleton-line.small {
    width: 60%;
    height: 12px;
}

.skeleton-button {
    width: 100%;
    height: 36px;
    border-radius: 12px;
}

/* Reactive glare */
.layer-glare {
    transform: translateZ(80px);
    background: radial-gradient(circle at var(--x) var(--y),
        rgba(255,255,255,0.25),
        transparent 60%);
    opacity: 0.5;
    pointer-events: none;
}

.layer-glass {
    transform: translateZ(90px);
    background: linear-gradient(
        135deg,
        rgba(255,255,255,0.08),
        rgba(255,255,255,0)
    );
    border: 1px solid rgba(255,255,255,0.08);
}
`,

        js: `
const card = document.getElementById("parallaxCard");

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    card.style.transform = \`rotateX(\${currentY}deg) rotateY(\${currentX}deg)\`;

    requestAnimationFrame(animate);
}

animate();

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetX = (centerX - x) / 18;
    targetY = (y - centerY) / 18;

    card.style.setProperty("--x", \`\${x}px\`);
    card.style.setProperty("--y", \`\${y}px\`);
});

card.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
});
`
    }
},
{
    id: "Holographic-obsidian-card",
    title: "Holographic Obsidian Card",
    description: "A refined, smaller holographic obsidian card with realistic silver diffraction, brushed metal depth, and restrained premium spectral physics.",
    tags: ["Luxury", "Minimal", "Stealth", "Premium UI", "Holographic"],
    keywords: ["premium holographic card", "stealth foil ui", "luxury metallic shimmer", "obsidian interface"],
    code: {
        html: `
<div class="lux-container">
    <div class="lux-card" id="luxCard">
        <div class="metal-texture"></div>
        <div class="spectral-layer" id="spectral"></div>
        <div class="glare-layer"></div>

        <div class="lux-content">
            <div class="micro-logo"></div>
            <div class="hud-block">
                <div class="line l1"></div>
                <div class="line l2"></div>
                <div class="line l3"></div>
            </div>
            <div class="footer-tag"></div>
        </div>

        <div class="edge-fresnel"></div>
    </div>
</div>
`,

        css: `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');

.lux-container {
    width: 100%;
    height: 100vh;
    background: #010101;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1800px;
}

/* Smaller refined proportions */
.lux-card {
    position: relative;
    width: 240px;
    height: 360px;
    border-radius: 10px;
    background: linear-gradient(145deg, #0b0b0b, #121212);
    border: 1px solid rgba(255,255,255,0.04);
    transform-style: preserve-3d;
    overflow: hidden;
    box-shadow:
        0 30px 60px rgba(0,0,0,0.85),
        0 10px 20px rgba(0,0,0,0.6);
}

/* Realistic brushed metal */
.metal-texture {
    position: absolute;
    inset: 0;
    background:
        repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.015) 0px,
            rgba(255,255,255,0.015) 1px,
            transparent 1px,
            transparent 3px
        );
    opacity: 0.4;
    z-index: 2;
    pointer-events: none;
}

/* Controlled silver diffraction */
.spectral-layer {
    position: absolute;
    inset: -120%;
    z-index: 1;
    opacity: 0;
    background:
        conic-gradient(
            from 180deg,
            rgba(200,220,255,0) 0%,
            rgba(200,220,255,0.15) 25%,
            rgba(255,255,255,0.25) 50%,
            rgba(180,210,255,0.15) 75%,
            rgba(200,220,255,0) 100%
        );
    mix-blend-mode: screen;
    filter: blur(40px);
    transition: opacity 0.6s ease;
}

/* Soft volumetric glare */
.glare-layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    background: radial-gradient(
        circle at var(--x) var(--y),
        rgba(255,255,255,0.06),
        transparent 65%
    );
    transition: opacity 0.4s ease;
    z-index: 3;
}

.lux-card:hover .spectral-layer,
.lux-card:hover .glare-layer {
    opacity: 1;
}

/* Minimal skeleton HUD */
.lux-content {
    position: relative;
    z-index: 4;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-family: 'Space Mono', monospace;
}

.micro-logo {
    width: 18px;
    height: 18px;
    border: 1px solid rgba(255,255,255,0.15);
    transform: rotate(45deg);
}

.hud-block { margin-top: 20px; display: flex; flex-direction: column; gap: 6px; }

.line {
    height: 1px;
    background: rgba(255,255,255,0.08);
}

.line.l1 { width: 100%; }
.line.l2 { width: 70%; }
.line.l3 { width: 40%; }

.footer-tag {
    margin-top: auto;
    width: 80px;
    height: 6px;
    background: rgba(255,255,255,0.08);
}

/* Edge Fresnel Light */
.edge-fresnel {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.05),
        inset 0 0 20px rgba(255,255,255,0.02);
    pointer-events: none;
    z-index: 10;
}
`,

        js: `
const card = document.getElementById("luxCard");
const spectral = document.getElementById("spectral");

let tx = 0, ty = 0;
let cx = 0, cy = 0;

card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    tx = (r.width/2 - x) / 25;
    ty = (y - r.height/2) / 25;

    const px = (x / r.width) * 100;
    const py = (y / r.height) * 100;

    card.style.setProperty("--x", px + "%");
    card.style.setProperty("--y", py + "%");

    spectral.style.transform =
        \`translate(\${px/15}%, \${py/15}%) rotate(\${px/10}deg)\`;
});

function animate(){
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    card.style.transform =
        \`rotateX(\${cy}deg) rotateY(\${cx}deg)\`;
    requestAnimationFrame(animate);
}

animate();

card.addEventListener("mouseleave", ()=>{
    tx = 0;
    ty = 0;
});
`
    }
},
{
    id: "neural-circuit-quantum-card",
    title: "Quantum edition Card",
    description: "A refined high-tech interface card featuring a traveling data pulse, precision circuitry, and stealth-grade reactive activation.",
    tags: ["SVG", "Circuit", "Minimal", "Dark UI", "Tech Luxury"],
    keywords: ["premium circuit ui", "dark tech card", "svg pulse animation", "futuristic interface"],
    code: {
        html: `
<div class="quantum-container">
    <div class="quantum-card">

        <svg class="circuit-svg" viewBox="0 0 260 340" preserveAspectRatio="none">
            <path class="trace-base" d="M15 15 L245 15 L245 80 L210 120 L210 320 L15 320 Z" />
            <path class="trace-active" d="M15 15 L245 15 L245 80 L210 120 L210 320 L15 320 Z" />
            <circle class="node n1" cx="245" cy="15" r="2"/>
            <circle class="node n2" cx="210" cy="120" r="2"/>
            <circle class="node n3" cx="15" cy="320" r="2"/>
        </svg>

        <div class="inner-content">
            <div class="chip-icon"></div>

            <div class="title-block">
                <div class="status">OFFLINE</div>
                <h3>NEURAL_CORE</h3>
            </div>

            <div class="spec-lines">
                <div class="line l1"></div>
                <div class="line l2"></div>
                <div class="line l3"></div>
            </div>
        </div>

        <div class="edge-glow"></div>

    </div>
</div>
`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;500&display=swap');

.quantum-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #040404;
}

/* Smaller, tighter card */
.quantum-card {
    position: relative;
    width: 260px;
    height: 340px;
    background: #0b0b0b;
    clip-path: polygon(0 0, 100% 0, 100% 23%, 85% 35%, 85% 100%, 0 100%);
    border: 1px solid rgba(255,255,255,0.04);
    box-shadow:
        0 25px 60px rgba(0,0,0,0.8),
        inset 0 0 0 1px rgba(255,255,255,0.02);
    overflow: hidden;
    cursor: pointer;
}

/* Subtle micro grid */
.quantum-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 25px 25px;
    opacity: 0.4;
}

/* SVG Circuit */
.circuit-svg {
    position: absolute;
    inset: 0;
    z-index: 2;
}

.trace-base {
    fill: none;
    stroke: rgba(255,255,255,0.05);
    stroke-width: 1;
}

.trace-active {
    fill: none;
    stroke: rgba(180,220,255,0.9);
    stroke-width: 1.5;
    stroke-dasharray: 50 800;
    stroke-dashoffset: 800;
    stroke-linecap: round;
    filter: drop-shadow(0 0 6px rgba(180,220,255,0.6));
    transition: stroke-dashoffset 1s cubic-bezier(.7,0,.2,1);
}

.node {
    fill: rgba(180,220,255,0.9);
    opacity: 0;
    transition: opacity .4s ease;
}

/* Hover Activation */
.quantum-card:hover .trace-active {
    stroke-dashoffset: 0;
}

.quantum-card:hover .node {
    opacity: 1;
}

/* Content */
.inner-content {
    position: relative;
    z-index: 3;
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'JetBrains Mono', monospace;
    color: #fff;
}

.chip-icon {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255,255,255,0.15);
    position: relative;
}

.chip-icon::before {
    content: "";
    position: absolute;
    inset: 6px;
    background: rgba(255,255,255,0.04);
}

.title-block {
    margin-top: 30px;
}

.status {
    font-size: 8px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.3);
    transition: color .3s ease;
}

.quantum-card:hover .status {
    color: rgba(180,220,255,0.9);
}

h3 {
    margin-top: 6px;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: .5px;
}

/* Minimal skeleton specs */
.spec-lines {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.line {
    height: 1px;
    background: rgba(255,255,255,0.1);
}

.line.l1 { width: 100%; }
.line.l2 { width: 70%; }
.line.l3 { width: 40%; }

/* Subtle rim light */
.edge-glow {
    position: absolute;
    inset: 0;
    border-radius: 0;
    box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.05),
        inset 0 0 25px rgba(180,220,255,0.03);
    pointer-events: none;
}
`,
        js: `
// No JS needed — pure precision CSS + SVG
`
    }
},
{
    id: "glass-stack-card",
    title: "Architectural Glass Stack Card",
    description: "A premium editorial glass card with magnetic tilt, ambient float, soft projected shadow, micro parallax typography and restrained glass refraction.",
    tags: ["Luxury", "Glass", "Magnetic", "Editorial", "Premium UI" ,"Card"],
    keywords: ["magnetic glass card", "luxury hover effect", "premium 3d card", "architectural ui"],
    code: {
        html: `
<div class="magnetic-container">
    <div class="shadow-projection"></div>

    <div class="magnetic-card" id="magneticCard">

        <div class="layer layer-image">
            <img src="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=600&auto=format&fit=crop" alt="Architecture">
            <div class="img-overlay"></div>
        </div>

        <div class="layer layer-glass">
            <div class="refraction"></div>
            <div class="grain"></div>
        </div>

        <div class="layer layer-content">
            <div class="meta">
                <span class="meta-left">KRONOS_ARCH</span>
                <span class="meta-right">2026</span>
            </div>

            <div class="body">
                <h2 class="title">The Brutalist Edit</h2>
                <div class="divider"></div>
                <p class="desc">
                    Exploration of concrete forms and negative space in modern residential structures.
                </p>
            </div>

            <button class="cta">View Project</button>
        </div>

    </div>
</div>
`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@300;500&display=swap');

.magnetic-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0b0b0b;
    perspective: 1600px;
    position: relative;
}

/* Soft projected shadow */
.shadow-projection {
    position: absolute;
    width: 200px;
    height: 50px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 70%);
    filter: blur(20px);
    transform: translateY(160px);
    transition: transform 0.2s ease;
}

.magnetic-card {
    position: relative;
    width: 260px;
    height: 380px;
    transform-style: preserve-3d;
    border-radius: 3px;
    transition: transform 0.2s ease;
    animation: float 6s ease-in-out infinite alternate;
    cursor: pointer;
}

/* Ambient floating */
@keyframes float {
    from { transform: translateY(0px); }
    to { transform: translateY(-8px); }
}

.layer {
    position: absolute;
    inset: 0;
    border-radius: 3px;
    transition: transform 0.4s cubic-bezier(.2,0,.2,1);
}

/* Image */
.layer-image {
    z-index: 1;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
}

.layer-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(110%);
    transition: transform 0.6s ease;
}

.img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%);
}

/* Glass */
.layer-glass {
    z-index: 2;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.08);
}

.grain {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
}

/* Subtle refraction shift */
.refraction {
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(255,255,255,0.1), transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Content */
.layer-content {
    z-index: 3;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #e5e5e5;
}

.meta {
    display: flex;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.5);
}

.title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 12px;
}

.divider {
    width: 30px;
    height: 1px;
    background: rgba(255,255,255,0.8);
    margin-bottom: 16px;
}

.desc {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255,255,255,0.65);
}

.cta {
    align-self: flex-start;
    background: #fff;
    color: #000;
    border: none;
    padding: 8px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.cta:hover { background: #d6d6d6; }

/* Hover separation */
.magnetic-card:hover .layer-image {
    transform: translateZ(-15px) translateY(-15px);
}

.magnetic-card:hover .layer-glass {
    transform: translateZ(10px);
}

.magnetic-card:hover .layer-content {
    transform: translateZ(25px) translateY(8px);
}

.magnetic-card:hover .refraction {
    opacity: 0.6;
}
`,
        js: `
const card = document.getElementById("magneticCard");
const shadow = document.querySelector(".shadow-projection");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetX = (centerX - x) / 25;
    targetY = (y - centerY) / 25;

    // Micro parallax text shift
    card.querySelector(".title").style.transform =
        \`translateX(\${targetX * 2}px) translateY(\${targetY * 2}px)\`;

    card.querySelector(".desc").style.transform =
        \`translateX(\${targetX}px) translateY(\${targetY}px)\`;

    shadow.style.transform =
        \`translateY(160px) scale(\${1 + Math.abs(targetX)/20})\`;
});

function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    card.style.transform =
        \`rotateX(\${currentY}deg) rotateY(\${currentX}deg)\`;

    requestAnimationFrame(animate);
}

animate();

card.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
});
`
    }
},





];
