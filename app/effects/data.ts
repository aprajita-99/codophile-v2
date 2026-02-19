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
{
    id: "cloud-node-visualizer",
    title: "Cloud Node Health Visualizer Style Card",
    description: "A production-ready server instance card. The ferrofluid acts as a live CPU thread visualizer that runs in the background. Hovering 'scrubs' through active threads to inspect specific load metrics.",
    tags: ["Dashboard", "Cloud", "SaaS", "Server", "Monitoring", "Interactive", "Data Viz"],
    keywords: ["server status card", "cloud dashboard ui", "cpu thread visualizer", "interactive saas widget"],
    code: {
        html: `
<div class="cloud-container">
    <div class="node-card" id="nodeCard">
        
        <div class="card-header">
            <div class="instance-info">
                <div class="status-indicator online"></div>
                <div class="meta">
                    <span class="region">US-EAST-1</span>
                    <span class="instance-id">i-0x829f</span>
                </div>
            </div>
            <div class="uptime-badge">99.9% uptime</div>
        </div>

        <div class="viz-container">
            <div class="viz-label">REAL-TIME THREAD ACTIVITY</div>
            
            <div class="fluid-engine" id="fluidEngine"></div>
            
            <svg style="display:none;">
                <defs>
                    <filter id="node-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" 
                            values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 19 -9" 
                            result="goo"/>
                    </filter>
                </defs>
            </svg>

            <div class="scrub-data">
                <span class="label">THREAD LOAD:</span>
                <span class="value" id="threadVal">--</span>
            </div>
        </div>

        <div class="metric-grid">
            <div class="metric-item">
                <span class="m-label">MEMORY</span>
                <span class="m-val">12.4 / 16 GB</span>
                <div class="progress-bg"><div class="progress-fill" style="width: 75%"></div></div>
            </div>
            <div class="metric-item">
                <span class="m-label">LATENCY</span>
                <span class="m-val">24ms</span>
                <div class="progress-bg"><div class="progress-fill" style="width: 15%"></div></div>
            </div>
        </div>

        <div class="card-actions">
            <button class="action-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17l6-6-6-6M12 19h8"/></svg>
                SSH
            </button>
            <button class="action-btn secondary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/></svg>
                REBOOT
            </button>
        </div>

    </div>
</div>`,

        css: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

.cloud-container {
    width: 100%;
    height: 100vh;
    background: #09090b;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
}

.node-card {
    width: 320px;
    background: #121214;
    border: 1px solid #27272a;
    border-radius: 12px;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* --- Header --- */
.card-header {
    padding: 16px;
    border-bottom: 1px solid #27272a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #18181b;
}

.instance-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-indicator {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px #10b981;
}

.meta {
    display: flex;
    flex-direction: column;
}

.region { font-size: 10px; color: #71717a; font-weight: 600; }
.instance-id { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #e4e4e7; }

.uptime-badge {
    font-size: 10px;
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
}

/* --- Visualizer --- */
.viz-container {
    position: relative;
    height: 140px;
    background: #000;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
}

.viz-label {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 9px;
    color: #52525b;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.fluid-engine {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    filter: url(#node-goo);
    /* Prevent blur clipping */
    margin: 0 -10px; 
    padding: 0 10px;
    width: calc(100% + 20px);
}

.thread-bar {
    width: 12px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50% 50% 0 0;
    transition: height 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* --- Scrub Data --- */
.scrub-data {
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #3b82f6;
    opacity: 0;
    transition: opacity 0.2s;
}

.node-card:hover .scrub-data { opacity: 1; }

/* --- Metrics --- */
.metric-grid {
    padding: 16px;
    display: grid;
    gap: 12px;
}

.metric-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.m-label { font-size: 10px; color: #71717a; font-weight: 600; }
.m-val { font-size: 12px; color: #e4e4e7; font-weight: 500; font-family: 'JetBrains Mono'; }

.progress-bg {
    width: 100%;
    height: 4px;
    background: #27272a;
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #52525b;
    border-radius: 2px;
}

/* --- Actions --- */
.card-actions {
    padding: 12px 16px;
    background: #18181b;
    border-top: 1px solid #27272a;
    display: flex;
    gap: 8px;
}

.action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: #e4e4e7;
    color: #000;
    border: none;
}

.action-btn:hover { background: #fff; }

.action-btn.secondary {
    background: transparent;
    color: #a1a1aa;
    border: 1px solid #3f3f46;
}

.action-btn.secondary:hover {
    background: #27272a;
    color: #fff;
}
`,
        js: `
const container = document.getElementById('fluidEngine');
const threadVal = document.getElementById('threadVal');
const card = document.getElementById('nodeCard');

const threadCount = 16;
let threads = [];
let animationId;

// Initialize "Threads" (Spikes)
for(let i=0; i<threadCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'thread-bar';
    container.appendChild(bar);
    threads.push({
        el: bar,
        baseHeight: 20 + Math.random() * 15, // Idle noise
        targetHeight: 20,
        x: 0 // Will store screen position
    });
}

// 1. Idle Animation Loop (Simulate Background Traffic)
function idleLoop() {
    threads.forEach(t => {
        // Randomly fluctuate height
        if(Math.random() > 0.9) {
            t.targetHeight = 20 + Math.random() * 40;
        } else {
            // Slowly return to base
            t.targetHeight += (t.baseHeight - t.targetHeight) * 0.05;
        }
        
        t.el.style.height = \`\${t.targetHeight}px\`;
    });
    
    animationId = requestAnimationFrame(idleLoop);
}
idleLoop(); // Start idle

// 2. Interactive "Scrubbing"
card.addEventListener('mousemove', (e) => {
    // Pause idle noise so user can "inspect"
    cancelAnimationFrame(animationId);
    
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    
    threads.forEach((t, i) => {
        const barX = (i / threadCount) * rect.width + (rect.width/threadCount)/2;
        const dist = Math.abs(mx - barX);
        
        // If mouse is close, spike the height (Interaction)
        if (dist < 60) {
            const power = 1 - (dist / 60);
            t.el.style.height = \`\${40 + (power * 80)}px\`;
            
            // Highlight the specific thread being hovered
            if (power > 0.9) {
                t.el.style.backgroundColor = '#60a5fa'; // Brighter Blue
                threadVal.innerText = Math.round(power * 100) + '%';
            } else {
                t.el.style.backgroundColor = '#3b82f6';
            }
        } else {
            t.el.style.height = '25px'; // Dim others
            t.el.style.backgroundColor = '#1e3a8a'; // Darker Blue
        }
    });
});

// 3. Resume Idle
card.addEventListener('mouseleave', () => {
    idleLoop();
    threadVal.innerText = '--';
    threads.forEach(t => {
        t.el.style.backgroundColor = '#3b82f6';
    });
});
`
    }
},
{
    id: "quantum-fusion-spinner",
    title: "Quantum Fusion Loading Spinner",
    description: "A compact, synchronized loading spinner. Particles rhythmically fuse into a central core and eject outward, visualizing a busy 'processing' state in a small footprint.",
    tags: ["Loader", "Spinner", "Small", "Synchronization", "Gooey", "Plasma", "Neon"],
    keywords: ["fusion spinner css", "small loading animation", "synchronized loader", "gooey effect small"],
    code: {
        html: `
<div class="loader-scene">
    <svg style="position:absolute;width:0;height:0;">
        <defs>
            <filter id="fusion-goo-small">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix in="blur" mode="matrix" 
                    values="1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 18 -7" 
                    result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </defs>
    </svg>

    <div class="loader-container">
        <div class="fusion-engine">
            <div class="core"></div>
            <div class="particle p1"></div>
            <div class="particle p2"></div>
            <div class="particle p3"></div>
            <div class="particle p4"></div>
        </div>
        
        <div class="ring r1"></div>
        <div class="ring r2"></div>
    </div>

    <div class="loading-label">INITIALIZING</div>
</div>`,
        css: `
.loader-scene {
    width: 100%;
    height: 100vh;
    background: #050505;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

/* Compact Container (100px) */
.loader-container {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* --- The Liquid Engine --- */
.fusion-engine {
    position: relative;
    width: 100%;
    height: 100%;
    filter: url('#fusion-goo-small');
    animation: engine-spin 6s linear infinite; 
}

.core {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 24px; height: 24px;
    background: #00ffff;
    border-radius: 50%;
    animation: core-beat 2s ease-in-out infinite; 
}

.particle {
    position: absolute;
    top: 50%; left: 50%;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #00ffff;
    transform: translate(-50%, -50%);
}

.p1 { animation: particle-cycle 2s ease-in-out infinite; --angle: 0deg;   background: #00ffff; }
.p2 { animation: particle-cycle 2s ease-in-out infinite; --angle: 90deg;  background: #0088ff; }
.p3 { animation: particle-cycle 2s ease-in-out infinite; --angle: 180deg; background: #00ffff; }
.p4 { animation: particle-cycle 2s ease-in-out infinite; --angle: 270deg; background: #0088ff; }

/* The Cycle: Scaled down distance (30px) */
@keyframes particle-cycle {
    0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0px); }
    45% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(35px); }
    55% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(35px); }
    100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0px); }
}

@keyframes core-beat {
    0% { width: 24px; height: 24px; background: #fff; }
    40% { width: 18px; height: 18px; background: #00ffff; }
    60% { width: 18px; height: 18px; background: #00ffff; }
    100% { width: 24px; height: 24px; background: #fff; }
}

@keyframes engine-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* --- Rings --- */
.ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(0, 255, 255, 0.1);
    pointer-events: none;
}

.r1 { width: 80px; height: 80px; border-color: rgba(0, 255, 255, 0.3); animation: spin 4s linear infinite; }
.r2 { width: 110px; height: 110px; border-style: dashed; border-color: rgba(0, 136, 255, 0.2); animation: spin-rev 10s linear infinite; }

/* Text */
.loading-label {
    font-family: 'Courier New', monospace;
    color: #00ffff;
    font-size: 10px;
    letter-spacing: 2px;
    animation: blink 1.5s infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes spin-rev { to { transform: rotate(-360deg); } }
@keyframes blink { 50% { opacity: 0.5; } }
`,
        js: `// Pure CSS Synchronization`
    }
},
{
    id: "kawaii-mochi-loader-ultra",
    title: "Kawaii Mochi Bounce — Loading spinner ",
    description: "An ultra-cute jelly mochi character loader featuring soft squash physics, ear wiggle, blush glow, sparkle particles, floating pastel blobs, and heart pop animation.",
    tags: ["Cute", "Kawaii", "Character Loader", "Pastel", "Squash Stretch", "Playful", "Animated Mascot"],
    keywords: [
        "super cute css loader",
        "kawaii character animation",
        "jelly bounce loader",
        "pastel animated spinner",
        "adorable loading screen",
        "cute mascot loader",
        "mochi css animation"
    ],
    code: {
        html: `
<div class="mochi-world">

    <div class="floating-blob blob1"></div>
    <div class="floating-blob blob2"></div>
    <div class="floating-blob blob3"></div>

    <div class="mochi-scene">
        <div class="sparkles">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="mochi">
            <div class="ear left-ear"></div>
            <div class="ear right-ear"></div>

            <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="cheek left"></div>
                <div class="cheek right"></div>
                <div class="mouth"></div>
            </div>
        </div>

        <div class="shadow"></div>
        <div class="heart-pop"></div>

        <div class="loading-text">LOADING CUTENESS...</div>
    </div>
</div>
`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&display=swap');

.mochi-world {
    width:100%;
    height:100vh;
    overflow:hidden;
    background: linear-gradient(180deg,#ffe8f3,#ffd6ec);
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
}

/* Floating background blobs */
.floating-blob{
    position:absolute;
    border-radius:50%;
    background:rgba(255,255,255,0.3);
    animation: float 10s infinite ease-in-out;
    filter: blur(40px);
}
.blob1{ width:200px;height:200px; top:10%; left:15%; }
.blob2{ width:160px;height:160px; bottom:20%; right:10%; animation-delay:2s;}
.blob3{ width:120px;height:120px; top:50%; right:30%; animation-delay:4s;}

@keyframes float{
    0%,100%{ transform:translateY(0);}
    50%{ transform:translateY(-30px);}
}

.mochi-scene{
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:18px;
}

/* Mochi body */
.mochi{
    width:85px;
    height:75px;
    background: radial-gradient(circle at 30% 30%, #ffffff, #fff6fb);
    border-radius:50% 50% 45% 45%;
    position:relative;
    z-index:2;
    animation: bounce 1.4s infinite cubic-bezier(.4,.0,.2,1);
    box-shadow:
        inset -8px -8px 20px rgba(0,0,0,0.04),
        0 10px 20px rgba(255,105,180,0.2);
}

/* Jelly ears */
.ear{
    position:absolute;
    width:18px;
    height:30px;
    background:#fff;
    border-radius:50%;
    top:-15px;
    animation: ear-wiggle 1.4s infinite ease-in-out;
}
.left-ear{ left:8px; }
.right-ear{ right:8px; }

@keyframes ear-wiggle{
    0%,100%{ transform:rotate(0deg);}
    50%{ transform:rotate(8deg);}
}

/* Face */
.face{
    position:absolute;
    top:55%;
    left:50%;
    transform:translate(-50%,-50%);
    width:60%;
    height:45%;
}

.eye{
    position:absolute;
    width:9px;
    height:9px;
    background:#4a4a4a;
    border-radius:50%;
    animation: blink 4s infinite;
}
.eye.left{ left:5px;}
.eye.right{ right:5px;}

.cheek{
    position:absolute;
    width:12px;
    height:8px;
    background:#ff9ecb;
    border-radius:50%;
    opacity:0.7;
}
.cheek.left{ left:-4px; top:10px;}
.cheek.right{ right:-4px; top:10px;}

.mouth{
    position:absolute;
    bottom:4px;
    left:50%;
    transform:translateX(-50%);
    width:10px;
    height:6px;
    border-radius:50%;
    background:#ff6fa5;
}

/* Shadow */
.shadow{
    width:65px;
    height:12px;
    background:rgba(0,0,0,0.08);
    border-radius:50%;
    animation: shadow-scale 1.4s infinite ease-in-out;
}

/* Bounce physics */
@keyframes bounce{
    0%,100%{ transform:translateY(0) scale(1.15,.85);}
    30%{ transform:translateY(-70px) scale(.9,1.1);}
    60%{ transform:translateY(-35px) scale(.95,1.05);}
    85%{ transform:translateY(0) scale(1.15,.85);}
}

@keyframes shadow-scale{
    0%,100%{ transform:scale(1); opacity:0.2;}
    30%{ transform:scale(.5); opacity:0.05;}
}

/* Sparkles */
.sparkles span{
    position:absolute;
    width:6px;
    height:6px;
    background:#fff;
    border-radius:50%;
    animation: sparkle 2s infinite ease-in-out;
}
.sparkles span:nth-child(1){ left:-30px; top:-40px;}
.sparkles span:nth-child(2){ right:-25px; top:-20px; animation-delay:0.5s;}
.sparkles span:nth-child(3){ left:10px; top:-60px; animation-delay:1s;}

@keyframes sparkle{
    0%,100%{ transform:scale(0); opacity:0;}
    50%{ transform:scale(1.4); opacity:1;}
}

/* Heart pop */
.heart-pop{
    position:absolute;
    width:14px;
    height:14px;
    background:#ff6fa5;
    clip-path:polygon(50% 0%, 61% 15%, 75% 15%, 85% 28%, 75% 42%, 50% 70%, 25% 42%, 15% 28%, 25% 15%, 39% 15%);
    animation: heart 3s infinite ease-in-out;
}
@keyframes heart{
    0%,100%{ transform:translateY(0) scale(0); opacity:0;}
    50%{ transform:translateY(-40px) scale(1); opacity:1;}
}

/* Blink */
@keyframes blink{
    0%,95%,100%{ transform:scaleY(1);}
    97%{ transform:scaleY(0.1);}
}

.loading-text{
    font-family:'Fredoka',sans-serif;
    font-size:14px;
    color:#ff6fa5;
    letter-spacing:2px;
}
`,
        js: `// Pure CSS ultra kawaii physics`
    }
},
{
    id: "bauhaus-morph-loader",
    title: "Geometric Loading spinner",
    description: "An artistic loader inspired by the Bauhaus movement. Geometric primitives morph and rotate in a synchronized loop, utilizing primary colors and sharp transitions.",
    tags: ["Art", "Design", "Minimal", "Bauhaus", "Geometric", "Abstract", "Modern"],
    keywords: ["bauhaus animation", "geometric loader", "shape morphing css", "minimalist spinner"],
    code: {
        html: `
<div class="art-scene">
    <div class="canvas">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>
    <div class="gallery-text">DESIGNING</div>
</div>`,
        css: `
.art-scene {
    width: 100%;
    height: 100vh;
    background: #f4f4f0; /* Off-white canvas */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.canvas {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.shape {
    width: 30px;
    height: 30px;
    /* Mix-blend-mode creates new colors when they overlap */
    mix-blend-mode: multiply; 
}

.shape-1 {
    background: #e63946; /* Red */
    animation: morph-1 4s ease-in-out infinite;
}

.shape-2 {
    background: #f1faee; /* White-ish placeholder, will change */
    background: #457b9d; /* Blue */
    animation: morph-2 4s ease-in-out infinite;
}

.shape-3 {
    background: #e9c46a; /* Yellow */
    animation: morph-3 4s ease-in-out infinite;
}

/* Cycle: 
   1. Shapes rotate positions
   2. Shapes change geometry (Circle <-> Square)
*/

@keyframes morph-1 {
    0% { border-radius: 50%; transform: translateX(0); }
    33% { border-radius: 0%; transform: translateX(45px) rotate(90deg); }
    66% { border-radius: 50%; transform: translateX(90px) rotate(180deg); }
    100% { border-radius: 50%; transform: translateX(0) rotate(360deg); }
}

@keyframes morph-2 {
    0% { border-radius: 0%; transform: translateX(0); }
    33% { border-radius: 50%; transform: translateX(45px) rotate(90deg); }
    66% { border-radius: 0%; transform: translateX(-45px) rotate(180deg); }
    100% { border-radius: 0%; transform: translateX(0) rotate(360deg); }
}

@keyframes morph-3 {
    0% { border-radius: 50%; transform: translateX(0); }
    33% { border-radius: 0%; transform: translateX(-90px) rotate(90deg); }
    66% { border-radius: 50%; transform: translateX(-45px) rotate(180deg); }
    100% { border-radius: 50%; transform: translateX(0) rotate(360deg); }
}

.gallery-text {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 700;
    letter-spacing: 4px;
    color: #1d3557;
    font-size: 12px;
}
`,
        js: `// Pure CSS Art`
    }
},
{
    id: "cozy-coffee-loader",
    title: "Morning Brew Aesthetic Loading spinner",
    description: "A cozy, minimalist loader featuring a steaming cup of coffee. Steam wisps rise with organic turbulence and opacity fades, creating a relaxing waiting experience.",
    tags: ["Cozy", "Aesthetic", "Food", "Calm", "Minimal", "Line Art"],
    keywords: ["coffee cup animation", "steam css effect", "cozy loader", "aesthetic spinner"],
    code: {
        html: `
<div class="cozy-scene">
    <div class="cup-container">
        <div class="steam s1"></div>
        <div class="steam s2"></div>
        <div class="steam s3"></div>
        
        <div class="cup">
            <div class="coffee"></div>
        </div>
        <div class="handle"></div>
        <div class="plate"></div>
    </div>
    <div class="cozy-text">BREWING CONTENT</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap');

.cozy-scene {
    width: 100%;
    height: 100vh;
    background: #f7f3e8; /* Cream/Beige */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.cup-container {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Cup Body */
.cup {
    position: relative;
    width: 70px;
    height: 50px;
    background: #fff;
    border: 3px solid #d4a373; /* Latte Brown */
    border-radius: 0 0 40px 40px;
    z-index: 10;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

/* Coffee Liquid (Wobble Effect) */
.coffee {
    position: absolute;
    top: 10px; left: 0; right: 0; bottom: 0;
    background: #d4a373;
    opacity: 0.2;
    transform-origin: 50% 0;
    animation: liquid-wobble 4s ease-in-out infinite;
}

/* Handle */
.handle {
    position: absolute;
    right: 5px; top: 10px;
    width: 25px; height: 30px;
    border: 3px solid #d4a373;
    border-radius: 0 50% 50% 0;
    z-index: 1;
}

/* Saucer */
.plate {
    position: absolute;
    bottom: 12px;
    width: 90px;
    height: 4px;
    background: #d4a373;
    border-radius: 10px;
}

/* Steam Wisps */
.steam {
    position: absolute;
    top: -20px;
    width: 6px;
    height: 15px;
    background: #d4a373;
    border-radius: 50%;
    opacity: 0;
    filter: blur(3px);
}

.s1 { left: 35px; animation: steam-rise 2.5s ease-out infinite 0s; }
.s2 { left: 50px; animation: steam-rise 2.5s ease-out infinite 0.8s; }
.s3 { left: 65px; animation: steam-rise 2.5s ease-out infinite 1.6s; }

/* Animations */
@keyframes steam-rise {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    20% { opacity: 0.6; }
    100% { transform: translateY(-40px) scale(2); opacity: 0; }
}

@keyframes liquid-wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    75% { transform: rotate(-3deg); }
}

.cozy-text {
    font-family: 'Lora', serif;
    font-style: italic;
    color: #a98467;
    font-size: 14px;
    letter-spacing: 1px;
    animation: fade 3s infinite;
}

@keyframes fade {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}
`,
        js: `// Pure CSS Cozy Vibes`
    }
},
{
    id: "spooky-ghost-loader-ultra",
    title: "Lil' Boo — Haunted Lantern Night (Ultra Cute Edition) Loading Spinner",
    description: "An ultra-cute yet spooky ghost loader featuring glowing aura, floating mist, wiggly tail physics, lantern bloom lighting, tiny bats, sparkles, and soft night atmosphere.",
    tags: ["Cute", "Spooky", "Ghost", "Halloween", "Character Loader", "Floating", "Lantern Glow", "Atmospheric"],
    keywords: [
        "cute spooky css loader",
        "ghost floating animation",
        "halloween animated spinner",
        "lantern glow css effect",
        "kawaii ghost character",
        "night themed loading screen",
        "spooky pastel animation"
    ],
    code: {
        html: `
<div class="spooky-world">

    <div class="mist mist-1"></div>
    <div class="mist mist-2"></div>

    <div class="bat bat-1"></div>
    <div class="bat bat-2"></div>

    <div class="spooky-scene">
        <div class="ghost">
            <div class="aura"></div>

            <div class="face">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="blush left"></div>
                <div class="blush right"></div>
                <div class="mouth"></div>
            </div>

            <div class="hands">
                <div class="hand left"></div>
                <div class="hand right">
                    <div class="lantern">
                        <div class="light"></div>
                        <div class="spark"></div>
                    </div>
                </div>
            </div>

            <div class="tail"></div>
        </div>

        <div class="shadow"></div>
        <div class="spooky-text">SUMMONING SPIRITS...</div>
    </div>
</div>
`,
        css: `
.spooky-world {
    width:100%;
    height:100vh;
    overflow:hidden;
    background: radial-gradient(circle at 50% 30%, #3b2f5a, #1a1230 70%);
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
}

/* Floating mist */
.mist{
    position:absolute;
    width:300px;
    height:100px;
    background:rgba(255,255,255,0.05);
    filter:blur(30px);
    border-radius:50%;
    animation: drift 12s infinite linear;
}
.mist-1{ top:20%; left:-10%; }
.mist-2{ bottom:15%; right:-10%; animation-delay:4s;}

@keyframes drift{
    0%{ transform:translateX(0);}
    50%{ transform:translateX(100px);}
    100%{ transform:translateX(0);}
}

/* Tiny bats */
.bat{
    position:absolute;
    width:20px;
    height:10px;
    background:#000;
    clip-path: polygon(0 50%, 20% 0, 40% 50%, 60% 0, 80% 50%, 100% 50%, 80% 100%, 60% 50%, 40% 100%, 20% 50%);
    animation: fly 6s infinite linear;
    opacity:0.3;
}
.bat-1{ top:25%; left:10%; }
.bat-2{ top:35%; right:15%; animation-delay:2s;}

@keyframes fly{
    0%{ transform:translateX(0);}
    50%{ transform:translateX(80px);}
    100%{ transform:translateX(0);}
}

.spooky-scene{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:25px;
    position:relative;
}

/* Ghost */
.ghost{
    position:relative;
    width:85px;
    height:105px;
    background: radial-gradient(circle at 30% 30%, #ffffff, #f1f1ff);
    border-radius:45px 45px 0 0;
    animation: float 3.5s ease-in-out infinite;
    box-shadow:
        0 10px 30px rgba(0,0,0,0.4);
    z-index:2;
}

/* Glow aura */
.aura{
    position:absolute;
    inset:-15px;
    border-radius:50%;
    background: radial-gradient(circle, rgba(200,180,255,0.2), transparent 70%);
    z-index:-1;
}

/* Wiggly tail */
.tail{
    position:absolute;
    bottom:-12px;
    left:0;
    width:100%;
    height:25px;
    background:#fff;
    border-radius:0 0 30px 30px;
    animation: ripple 2s infinite ease-in-out;
}

@keyframes ripple{
    0%,100%{ transform:skewX(0deg);}
    50%{ transform:skewX(5deg);}
}

/* Face */
.face{
    position:absolute;
    top:35px;
    left:50%;
    transform:translateX(-50%);
    width:60px;
    height:40px;
}

.eye{
    position:absolute;
    width:12px;
    height:16px;
    background:#2b1e4a;
    border-radius:50%;
    animation: blink 5s infinite;
}
.eye.left{ left:8px;}
.eye.right{ right:8px;}

.blush{
    position:absolute;
    width:12px;
    height:6px;
    background:#ff9ecb;
    border-radius:50%;
    opacity:0.6;
    top:20px;
}
.blush.left{ left:5px;}
.blush.right{ right:5px;}

.mouth{
    position:absolute;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    width:10px;
    height:8px;
    background:#ff6fa5;
    border-radius:50%;
}

/* Hands */
.hand{
    position:absolute;
    top:65px;
    width:16px;
    height:16px;
    background:#fff;
    border-radius:50%;
}
.hand.left{ left:-6px;}
.hand.right{ right:-6px; display:flex; justify-content:center;}

/* Lantern */
.lantern{
    position:absolute;
    bottom:-28px;
    width:16px;
    height:26px;
    background:#3a2a1f;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    transform-origin:top;
    animation:swing 3.5s ease-in-out infinite;
}

.light{
    width:8px;
    height:14px;
    background:#ffaa33;
    border-radius:3px;
    box-shadow:0 0 20px #ffaa33;
    animation:flicker 0.6s infinite alternate;
}

.spark{
    position:absolute;
    width:4px;
    height:4px;
    background:#ffd966;
    border-radius:50%;
    top:-5px;
    animation:sparkle 1.5s infinite ease-in-out;
}

/* Shadow */
.shadow{
    width:70px;
    height:12px;
    background:rgba(0,0,0,0.3);
    border-radius:50%;
    animation:shadow-pulse 3.5s ease-in-out infinite;
}

/* Text */
.spooky-text{
    font-family:monospace;
    color:#d5c6ff;
    letter-spacing:2px;
    font-size:13px;
}

/* Animations */
@keyframes float{
    0%,100%{ transform:translateY(0);}
    50%{ transform:translateY(-18px);}
}

@keyframes shadow-pulse{
    0%,100%{ transform:scale(1); opacity:0.25;}
    50%{ transform:scale(0.75); opacity:0.15;}
}

@keyframes swing{
    0%,100%{ transform:rotate(-12deg);}
    50%{ transform:rotate(12deg);}
}

@keyframes flicker{
    0%{ opacity:0.8;}
    100%{ opacity:1;}
}

@keyframes sparkle{
    0%,100%{ transform:translateY(0) scale(0); opacity:0;}
    50%{ transform:translateY(-8px) scale(1); opacity:1;}
}

@keyframes blink{
    0%,96%,100%{ transform:scaleY(1);}
    98%{ transform:scaleY(0.1);}
}
`,
        js: `// Boo 👻`
    }
},
{
    id: "lofi-vinyl-loader",
    title: "Lo-Fi Vinyl Player Loading Animation",
    description: "A retro-styled loader mimicking a vinyl record player. The record spins and the tone arm mechanically moves onto the groove to symbolize the start of a process.",
    tags: ["Retro", "Music", "Vinyl", "Lo-Fi", "Chill", "Vibe"],
    keywords: ["vinyl record css animation", "retro music loader", "record player spinner", "lo-fi aesthetic ui"],
    code: {
        html: `
<div class="vinyl-scene">
    <div class="turntable">
        <div class="platter"></div>
        <div class="record">
            <div class="label-sticker">
                <div class="hole"></div>
            </div>
        </div>
        <div class="tone-arm">
            <div class="counterweight"></div>
            <div class="arm-body"></div>
            <div class="headshell"></div>
        </div>
    </div>
    <div class="vibe-text">DROPPING THE NEEDLE...</div>
</div>`,
        css: `
.vinyl-scene {
    width: 100%;
    height: 100vh;
    background: #d4c4a8; /* Warm retro beige */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.turntable {
    position: relative;
    width: 220px;
    height: 180px;
    background: #8c6e52; /* Wood grain color */
    border-radius: 10px;
    box-shadow: 
        inset 0 0 20px rgba(0,0,0,0.2),
        5px 5px 15px rgba(0,0,0,0.1);
    overflow: hidden;
}

.platter {
    position: absolute;
    top: 10px; left: 10px;
    width: 160px; height: 160px;
    background: #444;
    border-radius: 50%;
    box-shadow: inset 0 0 10px #000;
}

.record {
    position: absolute;
    top: 15px; left: 15px;
    width: 150px; height: 150px;
    background: 
        repeating-radial-gradient(
            #111 0px, 
            #111 2px, 
            #222 3px, 
            #222 4px
        ); /* Vinyl grooves texture */
    border-radius: 50%;
    animation: spin-record 2s linear infinite;
}

.label-sticker {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 50px; height: 50px;
    background: #ff6b6b; /* Retro Red */
    border-radius: 50%;
    border: 2px solid #fff;
}

.hole {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 8px; height: 8px;
    background: #e0e0e0;
    border-radius: 50%;
}

/* Tone Arm Mechanism */
.tone-arm {
    position: absolute;
    top: 20px; right: 20px;
    width: 40px; height: 140px;
    transform-origin: top center;
    animation: move-arm 4s ease-in-out infinite;
}

.counterweight {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 20px; height: 20px; background: #666; border-radius: 50%; border: 2px solid #444;
}
.arm-body {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    width: 6px; height: 100px; background: #999; border-radius: 3px;
}
.headshell {
    position: absolute; bottom: 20px; left: 50%;
    width: 12px; height: 20px; background: #333;
    transform: translateX(-50%) rotate(20deg);
}

.vibe-text {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #5e4b3c;
    font-size: 12px;
    letter-spacing: 1px;
    animation: pulse 2s infinite;
}

/* Animations */
@keyframes spin-record {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes move-arm {
    0%, 100% { transform: rotate(0deg); } /* Rest position */
    30%, 70% { transform: rotate(-35deg); } /* On the record */
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}
`,
        js: `// Analog warmth`
    }
},
{
    id: "zero-point-tesseract",
    title: "Zero-Point Tesseract Loading Animation",
    description: "A visually stunning 3D hyper-cube loader. A translucent containment field rotates around a volatile, pulsating energy core. Features true volumetric 3D rendering using CSS transforms.",
    tags: ["3D", "Sci-Fi", "Cube", "Hologram", "Futuristic", "High-Tech", "Neon"],
    keywords: ["3d cube loader css", "tesseract animation", "holographic box spinner", "sci-fi energy core"],
    code: {
        html: `
<div class="tesseract-scene">
    <div class="cube-wrapper">
        <div class="cube">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
            
            <div class="core-cube">
                <div class="core-face front"></div>
                <div class="core-face back"></div>
                <div class="core-face right"></div>
                <div class="core-face left"></div>
                <div class="core-face top"></div>
                <div class="core-face bottom"></div>
            </div>
        </div>
    </div>
    <div class="tech-readout">
        <span class="label">CONTAINMENT STABLE</span>
        <div class="data-line"></div>
    </div>
</div>`,
        css: `
.tesseract-scene {
    width: 100%;
    height: 100vh;
    background: #000510; /* Deep Space Blue */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective: 1000px; /* Essential for 3D */
    overflow: hidden;
}

.cube-wrapper {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotate-scene 10s linear infinite;
}

/* --- OUTER CUBE --- */
.cube {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
}

.face {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0, 255, 255, 0.5); /* Neon Cyan Borders */
    background: rgba(0, 255, 255, 0.05); /* Glassy tint */
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Face Markings (Tech Details) */
.face::after {
    content: '';
    width: 80%; height: 80%;
    border: 1px dashed rgba(0, 255, 255, 0.2);
}

/* Positioning the 6 faces */
.front  { transform: rotateY(0deg) translateZ(50px); }
.back   { transform: rotateY(180deg) translateZ(50px); }
.right  { transform: rotateY(90deg) translateZ(50px); }
.left   { transform: rotateY(-90deg) translateZ(50px); }
.top    { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }

/* --- INNER CORE CUBE --- */
.core-cube {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 30px; left: 30px; /* Center it */
    transform-style: preserve-3d;
    animation: counter-spin 4s linear infinite;
}

.core-face {
    position: absolute;
    width: 40px;
    height: 40px;
    background: rgba(255, 0, 100, 0.6); /* Magenta Core */
    border: 1px solid #ff0066;
    box-shadow: 0 0 20px #ff0066;
}

.core-face.front  { transform: rotateY(0deg) translateZ(20px); }
.core-face.back   { transform: rotateY(180deg) translateZ(20px); }
.core-face.right  { transform: rotateY(90deg) translateZ(20px); }
.core-face.left   { transform: rotateY(-90deg) translateZ(20px); }
.core-face.top    { transform: rotateX(90deg) translateZ(20px); }
.core-face.bottom { transform: rotateX(-90deg) translateZ(20px); }

/* --- ANIMATIONS --- */
@keyframes rotate-scene {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes counter-spin {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(-360deg) rotateY(-360deg); }
}

/* --- UI TEXT --- */
.tech-readout {
    margin-top: 80px;
    font-family: 'Courier New', monospace;
    color: #00ffff;
    text-align: center;
    letter-spacing: 2px;
    font-size: 10px;
}

.data-line {
    width: 150px;
    height: 2px;
    background: #003333;
    margin-top: 5px;
    position: relative;
    overflow: hidden;
}

.data-line::after {
    content:'';
    position: absolute; top:0; left:0;
    width: 50%; height: 100%;
    background: #00ffff;
    animation: scan 2s ease-in-out infinite;
}

@keyframes scan {
    0% { left: -50%; }
    100% { left: 100%; }
}
`,
        js: `// 3D Matrix Logic`
    }
},
{
    id: "orbital-defense-loader",
    title: "Orbital Defense HUD Loading animation",
    description: "A tactical military-grade loader. Features multiple rotating radar rings, scanning sweep effects, and target tracking blips on a holographic grid.",
    tags: ["HUD", "Military", "Sci-Fi", "Radar", "Tech", "Detailed", "Interface"],
    keywords: ["radar scanner css", "hud loader animation", "iron man ui spinner", "tactical interface"],
    code: {
        html: `
<div class="hud-scene">
    <div class="radar-system">
        <div class="grid-overlay"></div>
        
        <div class="ring outer-ring"></div>
        <div class="blip target-1"></div>
        
        <div class="ring mid-ring">
            <div class="scanner-sweep"></div>
        </div>
        
        <div class="core-circle">
            <div class="dot-matrix"></div>
        </div>
        
        <div class="crosshair-h"></div>
        <div class="crosshair-v"></div>
    </div>
    <div class="hud-text">
        <span>SYSTEM SCAN</span>
        <span class="count">42.8%</span>
    </div>
</div>`,
        css: `
.hud-scene {
    width: 100%;
    height: 100vh;
    background: #050505;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    /* CRT Scanline overlay */
    background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 4px;
}

.radar-system {
    position: relative;
    width: 200px;
    height: 200px;
}

/* Grid Background */
.grid-overlay {
    position: absolute;
    inset: -20%;
    background-image: 
        radial-gradient(rgba(0, 255, 0, 0.15) 1px, transparent 1px);
    background-size: 20px 20px;
    border-radius: 50%;
    opacity: 0.3;
}

/* Outer Ring */
.outer-ring {
    position: absolute;
    inset: 0;
    border: 1px dashed rgba(0, 255, 0, 0.3);
    border-radius: 50%;
    border-top: 1px solid #00ff00;
    border-bottom: 1px solid #00ff00;
    animation: spin-slow 10s linear infinite;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
}

/* Target Blip */
.target-1 {
    position: absolute;
    top: 10px; left: 50%;
    width: 6px; height: 6px;
    background: #ff0000;
    border-radius: 50%;
    box-shadow: 0 0 5px #ff0000;
    animation: orbit-blip 4s linear infinite;
    transform-origin: 0 90px; /* Offset rotation origin to center of radar */
}

@keyframes orbit-blip {
    0% { transform: rotate(0deg) translateY(0); opacity: 1; }
    50% { opacity: 0.2; }
    100% { transform: rotate(360deg) translateY(0); opacity: 1; }
}

/* Middle Ring & Scanner */
.mid-ring {
    position: absolute;
    inset: 30px;
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 50%;
}

.scanner-sweep {
    position: absolute;
    top: 50%; left: 50%;
    width: 50%; height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00);
    transform-origin: left center;
    animation: radar-sweep 2s linear infinite;
    opacity: 0.6;
}

@keyframes radar-sweep {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Inner Core */
.core-circle {
    position: absolute;
    inset: 70px;
    border: 2px solid #00ff00;
    border-radius: 50%;
    background: rgba(0, 255, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
    animation: pulse-core 2s ease-in-out infinite;
}

/* Crosshairs */
.crosshair-h {
    position: absolute;
    top: 50%; left: 0; width: 100%; height: 1px;
    background: rgba(0, 255, 0, 0.3);
}
.crosshair-v {
    position: absolute;
    left: 50%; top: 0; width: 1px; height: 100%;
    background: rgba(0, 255, 0, 0.3);
}

.hud-text {
    font-family: 'Share Tech Mono', monospace;
    color: #00ff00;
    display: flex;
    gap: 10px;
    font-size: 12px;
    text-shadow: 0 0 5px #00ff00;
}

.count {
    animation: blink-text 0.5s infinite alternate;
}

@keyframes spin-slow { 100% { transform: rotate(360deg); } }
@keyframes pulse-core {
    0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.2); border-color: #00ff00; }
    50% { box-shadow: 0 0 25px rgba(0, 255, 0, 0.5); border-color: #afffa; }
}
@keyframes blink-text { from { opacity: 1; } to { opacity: 0.5; } }
`,
        js: `// Tactical Display`
    }
},
{
    id: "vhs-tracking-loader",
    title: "VHS Tracking Glitch Loading Page",
    description: "A gritty, analog-style loader mimicking a damaged VCR tape. Text suffers from chromatic aberration (RGB split), scanline distortion, and signal noise.",
    tags: ["Retro", "Glitch", "VHS", "90s", "Analog", "Horror", "Text"],
    keywords: ["vhs css animation", "glitch text effect", "retro loader", "analog horror style"],
    code: {
        html: `
<div class="vhs-scene">
    <div class="screen-overlay"></div>
    <div class="glitch-wrapper">
        <div class="glitch" data-text="TRACKING...">TRACKING...</div>
    </div>
    <div class="scanlines"></div>
    <div class="vcr-ui">PLAY > 00:00:04</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Vt323&display=swap');

.vhs-scene {
    width: 100%;
    height: 100vh;
    background: #0000bb; /* Classic Blue Screen */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
}

.glitch-wrapper {
    position: relative;
}

.glitch {
    font-family: 'Vt323', monospace;
    font-size: 80px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    letter-spacing: 5px;
}

/* Creating the RGB Split Layers */
.glitch::before,
.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0000bb; /* Match BG to hide main text */
}

.glitch::before {
    color: #ff00c1; /* Magenta Shift */
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    left: -2px;
}

.glitch::after {
    color: #00fff9; /* Cyan Shift */
    animation: glitch-anim-2 2s infinite linear alternate-reverse;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    left: 2px;
}

/* Scanlines Texture */
.scanlines {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.2) 50%,
        rgba(0,0,0,0.2)
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 10;
}

/* Rolling Bar Effect */
.screen-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 10px;
    background: rgba(255,255,255,0.2);
    opacity: 0.5;
    animation: roll-bar 5s linear infinite;
    filter: blur(5px);
}

.vcr-ui {
    position: absolute;
    top: 40px; left: 40px;
    font-family: 'Vt323', monospace;
    color: #fff;
    font-size: 24px;
    text-shadow: 2px 2px #000;
    animation: blink 1s steps(2) infinite;
}

/* Glitch Keyframes */
@keyframes glitch-anim-1 {
    0% { clip-path: inset(20% 0 80% 0); }
    20% { clip-path: inset(60% 0 10% 0); }
    40% { clip-path: inset(40% 0 50% 0); }
    60% { clip-path: inset(80% 0 5% 0); }
    80% { clip-path: inset(10% 0 70% 0); }
    100% { clip-path: inset(30% 0 20% 0); }
}

@keyframes glitch-anim-2 {
    0% { clip-path: inset(10% 0 60% 0); }
    20% { clip-path: inset(80% 0 5% 0); }
    40% { clip-path: inset(30% 0 20% 0); }
    60% { clip-path: inset(10% 0 80% 0); }
    80% { clip-path: inset(50% 0 30% 0); }
    100% { clip-path: inset(70% 0 10% 0); }
}

@keyframes roll-bar {
    0% { top: -10%; opacity: 0; }
    10% { opacity: 0.2; }
    90% { opacity: 0.2; }
    100% { top: 110%; opacity: 0; }
}

@keyframes blink { 0% { opacity: 1; } 100% { opacity: 0; } }
`,
        js: `// Be Kind Rewind`
    }
},
{
    id: "iso-server-loader",
    title: "Isometric Data Stack Loading Animation",
    description: "A professional 3D loader representing cloud infrastructure. Isometric layers of a server stack float and compress rhythmically. Perfect for SaaS, database, or cloud computing platforms.",
    tags: ["3D", "Tech", "Isometric", "Server", "Database", "SaaS", "Enterprise"],
    keywords: ["isometric css animation", "server stack loader", "database spinner", "3d layers animation"],
    code: {
        html: `
<div class="iso-scene">
    <div class="stack-container">
        <div class="layer l3">
            <div class="side top"></div>
            <div class="side left"></div>
            <div class="side right"></div>
        </div>
        <div class="layer l2">
            <div class="side top"></div>
            <div class="side left"></div>
            <div class="side right"></div>
        </div>
        <div class="layer l1">
            <div class="side top"></div>
            <div class="side left"></div>
            <div class="side right"></div>
        </div>
    </div>
    <div class="server-shadow"></div>
    <div class="iso-text">SYNCING DATABASE</div>
</div>`,
        css: `
.iso-scene {
    width: 100%;
    height: 100vh;
    background: #f1f5f9; /* Slate 100 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

.stack-container {
    position: relative;
    width: 60px;
    height: 60px;
    /* Isometric Rotation */
    transform: rotateX(60deg) rotateZ(45deg);
    transform-style: preserve-3d;
}

.layer {
    position: absolute;
    width: 60px; height: 60px;
    transform-style: preserve-3d;
    transition: transform 0.3s;
}

/* The bounce animation affects the Z-translate (vertical in 3D space) */
.l1 { animation: stack-bounce 2s ease-in-out infinite 0s; z-index: 1; }
.l2 { animation: stack-bounce 2s ease-in-out infinite 0.15s; z-index: 2; }
.l3 { animation: stack-bounce 2s ease-in-out infinite 0.3s; z-index: 3; }

/* Cube Faces */
.side {
    position: absolute;
    width: 100%; height: 100%;
    border: 1px solid rgba(255,255,255,0.2);
}

.top {
    background: #3b82f6; /* Blue 500 */
    transform: translateZ(10px);
}
.left {
    background: #2563eb; /* Blue 600 */
    transform: rotateX(-90deg) translateZ(30px); /* Height of block */
    height: 10px; top: 50px;
}
.right {
    background: #1d4ed8; /* Blue 700 */
    transform: rotateY(90deg) translateZ(30px);
    width: 10px; left: 50px;
}

/* Data Lights on the edges */
.right::after, .left::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 4px; height: 4px;
    background: #60a5fa; /* Light Blue blinker */
    border-radius: 50%;
    animation: blink-data 1s infinite;
    box-shadow: 0 0 5px #60a5fa;
}

.server-shadow {
    width: 80px; height: 20px;
    background: rgba(0,0,0,0.1);
    border-radius: 50%;
    filter: blur(8px);
    animation: shadow-size 2s ease-in-out infinite;
    margin-top: -30px;
}

.iso-text {
    font-family: 'Verdana', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    color: #64748b;
    font-size: 11px;
    text-transform: uppercase;
}

/* Animations */
@keyframes stack-bounce {
    0% { transform: translateZ(0px); }
    50% { transform: translateZ(40px); } /* Levitate up */
    100% { transform: translateZ(0px); }
}

@keyframes shadow-size {
    0% { transform: scale(1); opacity: 0.1; }
    50% { transform: scale(0.8); opacity: 0.05; }
    100% { transform: scale(1); opacity: 0.1; }
}

@keyframes blink-data {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}
`,
        js: `// Cloud Infrastructure`
    }
},
{
    id: "gyroscope-loader",
    title: "Precision Gyroscope Loading Animation",
    description: "A professional 3D loader representing stability and precision. Nested rings rotate on independent axes around a glowing core, mimicking a navigational gyroscope.",
    tags: ["3D", "Tech", "Enterprise", "Global", "Finance", "Precision"],
    keywords: ["gyroscope css animation", "3d ring spinner", "enterprise loader", "tech orbit animation"],
    code: {
        html: `
<div class="gyro-scene">
    <div class="gyroscope">
        <div class="ring outer"></div>
        <div class="ring middle"></div>
        <div class="ring inner"></div>
        <div class="core"></div>
    </div>
    <div class="gyro-text">CALIBRATING</div>
</div>`,
        css: `
.gyro-scene {
    width: 100%;
    height: 100vh;
    background: #0f172a; /* Slate 900 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    perspective: 800px;
}

.gyroscope {
    position: relative;
    width: 120px;
    height: 120px;
    transform-style: preserve-3d;
    animation: floating 4s ease-in-out infinite;
}

.ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    transform-style: preserve-3d;
}

/* Outer Ring (Horizontal Spin) */
.outer {
    border-top: 2px solid #3b82f6; /* Blue 500 */
    border-bottom: 2px solid #3b82f6;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
    animation: spin-x 4s linear infinite;
}

/* Middle Ring (Vertical Spin) */
.middle {
    inset: 10px;
    border-left: 2px solid #60a5fa; /* Blue 400 */
    border-right: 2px solid #60a5fa;
    box-shadow: 0 0 10px rgba(96, 165, 250, 0.2);
    animation: spin-y 5s linear infinite;
}

/* Inner Ring (Diagonal Spin) */
.inner {
    inset: 25px;
    border-top: 2px solid #93c5fd; /* Blue 300 */
    border-left: 2px solid #93c5fd;
    box-shadow: 0 0 10px rgba(147, 197, 253, 0.2);
    animation: spin-z 3s linear infinite;
}

/* The Stable Core */
.core {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 12px; height: 12px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 20px #fff;
    animation: pulse-core 2s ease-in-out infinite;
}

.gyro-text {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 3px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
}

/* Animations */
@keyframes spin-x {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(45deg); }
}

@keyframes spin-y {
    0% { transform: rotateY(0deg) rotateX(45deg); }
    100% { transform: rotateY(360deg) rotateX(45deg); }
}

@keyframes spin-z {
    0% { transform: rotateZ(0deg) rotateX(15deg); }
    100% { transform: rotateZ(360deg) rotateX(15deg); }
}

@keyframes pulse-core {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

@keyframes floating {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}
`,
        js: `// Gyroscopic Physics`
    }
},
{
    id: "network-packet-loader",
    title: "Network Data Stream Loading Animation",
    description: "A visualization of digital data transfer. 'Packets' (dots) travel along invisible circuit lines, converging at a central hub before dispersing. Ideal for file transfers, server connections, or crypto apps.",
    tags: ["Data", "Network", "Upload", "Tech", "Connectivity", "Speed"],
    keywords: ["network stream animation", "data packet loader", "uploading css animation", "connectivity spinner"],
    code: {
        html: `
<div class="net-scene">
    <div class="hub-container">
        <div class="hub"></div>
        <div class="packet p1"></div>
        <div class="packet p2"></div>
        <div class="packet p3"></div>
        <div class="packet p4"></div>
        
        <div class="line l1"></div>
        <div class="line l2"></div>
        <div class="line l3"></div>
        <div class="line l4"></div>
    </div>
    <div class="net-text">ESTABLISHING UPLINK</div>
</div>`,
        css: `
.net-scene {
    width: 100%;
    height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.hub-container {
    position: relative;
    width: 200px;
    height: 200px;
}

/* The Central Hub */
.hub {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 20px; height: 20px;
    background: #00ff88;
    border-radius: 50%;
    box-shadow: 0 0 20px #00ff88;
    z-index: 10;
    animation: hub-pulse 1s ease-in-out infinite;
}

/* Connection Lines (Faint) */
.line {
    position: absolute;
    top: 50%; left: 50%;
    width: 100px; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.3));
    transform-origin: left center;
}
.l1 { transform: rotate(0deg); }
.l2 { transform: rotate(90deg); }
.l3 { transform: rotate(180deg); }
.l4 { transform: rotate(270deg); }

/* Data Packets */
.packet {
    position: absolute;
    top: 50%; left: 50%;
    width: 8px; height: 4px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px #fff;
    z-index: 5;
    opacity: 0;
}

/* The Travel Animation:
   Packets start far away (100px) and zoom into the center (0px)
*/
.p1 { transform: rotate(0deg); animation: data-in 1.5s linear infinite; animation-delay: 0s; }
.p2 { transform: rotate(90deg); animation: data-in 1.5s linear infinite; animation-delay: 0.5s; }
.p3 { transform: rotate(180deg); animation: data-in 1.5s linear infinite; animation-delay: 0.25s; }
.p4 { transform: rotate(270deg); animation: data-in 1.5s linear infinite; animation-delay: 0.75s; }

@keyframes data-in {
    0% { transform: rotate(var(--r)) translateX(100px); opacity: 0; }
    20% { opacity: 1; }
    90% { transform: rotate(var(--r)) translateX(10px); opacity: 1; }
    100% { transform: rotate(var(--r)) translateX(0px); opacity: 0; }
}

/* Fix rotation vars for animation reuse */
.p1 { --r: 0deg; }
.p2 { --r: 90deg; }
.p3 { --r: 180deg; }
.p4 { --r: 270deg; }

@keyframes hub-pulse {
    0% { box-shadow: 0 0 20px #00ff88; transform: translate(-50%, -50%) scale(1); }
    10% { box-shadow: 0 0 40px #00ff88; transform: translate(-50%, -50%) scale(1.2); background: #fff; }
    100% { box-shadow: 0 0 20px #00ff88; transform: translate(-50%, -50%) scale(1); }
}

.net-text {
    font-family: 'Courier New', monospace;
    color: #00ff88;
    letter-spacing: 2px;
    font-size: 12px;
    text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
}
`,
        js: `// High Speed Transfer`
    }
},
{
    id: "ferrofluid-magnet-pro",
    title: "Ferrofluid Core — Magnetic Field Simulation Loading Animation ",
    description: "A refined ferrofluid magnetic simulation featuring graphite liquid gradients, volumetric glow core, organic spike pulses, rotating magnetic field, and laboratory-grade depth rendering.",
    tags: ["Physics", "Ferrofluid", "Magnetic Field", "Premium", "Dark UI", "Gooey Filter", "Science"],
    keywords: [
        "premium ferrofluid animation",
        "magnetic field css simulation",
        "gooey liquid spinner",
        "graphite liquid ui",
        "organic blob animation",
        "science interface animation",
        "dark physics loader"
    ],
    code: {
        html: `
<div class="ferro-scene">
    <svg style="position:absolute;width:0;height:0;">
        <defs>
            <filter id="ferro-goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
                <feColorMatrix in="blur" mode="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 18 -7"
                    result="goo"/>
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </defs>
    </svg>

    <div class="magnet-container">
        <div class="magnetic-ring"></div>

        <div class="fluid-box">
            <div class="core-ball"></div>

            <div class="spike s1"></div>
            <div class="spike s2"></div>
            <div class="spike s3"></div>
            <div class="spike s4"></div>
            <div class="spike s5"></div>
            <div class="spike s6"></div>
            <div class="spike s7"></div>
            <div class="spike s8"></div>
        </div>
    </div>

    <div class="ferro-text">MAGNETIC FIELD ACTIVE</div>
</div>
`,
        css: `
.ferro-scene {
    width:100%;
    height:100vh;
    background: radial-gradient(circle at 50% 40%, #1a1f29, #0b0e13 70%);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:40px;
}

/* Container smaller + elegant */
.magnet-container{
    width:170px;
    height:170px;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    filter:url(#ferro-goo);
    animation: rotate-system 14s linear infinite;
}

/* Magnetic Field Ring */
.magnetic-ring{
    position:absolute;
    width:100%;
    height:100%;
    border-radius:50%;
    border:1px solid rgba(255,255,255,0.06);
    box-shadow:0 0 25px rgba(0,200,255,0.05);
    animation: pulse-ring 4s ease-in-out infinite;
}

@keyframes pulse-ring{
    0%,100%{ transform:scale(1); opacity:0.5;}
    50%{ transform:scale(1.08); opacity:0.2;}
}

.fluid-box{
    position:relative;
    width:100%;
    height:100%;
}

/* Core Ball with metallic gradient */
.core-ball{
    position:absolute;
    top:50%; left:50%;
    transform:translate(-50%,-50%);
    width:70px;
    height:70px;
    border-radius:50%;
    background:
        radial-gradient(circle at 35% 30%, #2a313d, #0a0c11 70%);
    box-shadow:
        inset -8px -10px 18px rgba(255,255,255,0.06),
        inset 10px 12px 20px rgba(0,0,0,0.8);
}

/* Spikes */
.spike{
    position:absolute;
    top:50%; left:50%;
    width:24px;
    height:24px;
    border-radius:50%;
    background:
        radial-gradient(circle at 30% 30%, #2b313c, #050608 80%);
    transform:translate(-50%,-50%);
}

/* Organic timing offsets */
.s1{ animation:pulse 2.4s ease-in-out infinite 0s; --angle:0deg;}
.s2{ animation:pulse 2.4s ease-in-out infinite .3s; --angle:45deg;}
.s3{ animation:pulse 2.4s ease-in-out infinite .6s; --angle:90deg;}
.s4{ animation:pulse 2.4s ease-in-out infinite .9s; --angle:135deg;}
.s5{ animation:pulse 2.4s ease-in-out infinite 1.2s; --angle:180deg;}
.s6{ animation:pulse 2.4s ease-in-out infinite 1.5s; --angle:225deg;}
.s7{ animation:pulse 2.4s ease-in-out infinite 1.8s; --angle:270deg;}
.s8{ animation:pulse 2.4s ease-in-out infinite 2.1s; --angle:315deg;}

@keyframes pulse{
    0%{
        transform:translate(-50%,-50%) rotate(var(--angle)) translateY(0);
    }
    45%{
        transform:translate(-50%,-50%) rotate(var(--angle)) translateY(-50px) scale(0.55);
    }
    60%{
        transform:translate(-50%,-50%) rotate(var(--angle)) translateY(-45px) scale(0.6);
    }
    100%{
        transform:translate(-50%,-50%) rotate(var(--angle)) translateY(0);
    }
}

/* Slow system rotation */
@keyframes rotate-system{
    from{ transform:rotate(0deg);}
    to{ transform:rotate(360deg);}
}

/* Subtle depth shadow */
.magnet-container::after{
    content:"";
    position:absolute;
    bottom:-25px;
    width:120px;
    height:20px;
    background:radial-gradient(circle, rgba(0,0,0,0.5), transparent 70%);
    border-radius:50%;
    filter:blur(8px);
    z-index:-1;
}

.ferro-text{
    font-family: 'Inter', sans-serif;
    font-weight:600;
    letter-spacing:3px;
    font-size:11px;
    color:#8f9bb3;
    text-transform:uppercase;
}
`,
        js: `// Magnetic system stabilized`
    }
},
{
    id: "time-warp-loader",
    title: "Singularity Time Warp - Loading Animation",
    description: "A cosmic event loader. Streams of light spiral into a central singularity, simulating the accretion disk of a black hole. High-speed motion blur creates a 'warp speed' effect.",
    tags: ["Space", "Cosmic", "Black Hole", "Warp", "Speed", "Sci-Fi", "Dark"],
    keywords: ["black hole animation", "warp speed css", "spiral galaxy loader", "cosmic spinner"],
    code: {
        html: `
<div class="warp-scene">
    <div class="singularity-container">
        <div class="black-hole"></div>
        <div class="accretion-disk"></div>
        <div class="accretion-disk blur"></div>
    </div>
    <div class="warp-text">ENGAGING HYPERDRIVE</div>
</div>`,
        css: `
.warp-scene {
    width: 100%;
    height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.singularity-container {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.black-hole {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #000;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 20px #000; /* Eat light */
}

.accretion-disk {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* The Spiral Gradient */
    background: conic-gradient(
        from 0deg,
        transparent 0%,
        #4400ff 40%, 
        #aa00ff 60%, 
        #ffffff 80%, 
        transparent 100%
    );
    /* Mask to make it a ring */
    -webkit-mask-image: radial-gradient(transparent 35%, black 40%);
    animation: warp-spin 1s linear infinite;
}

/* Second layer for Motion Blur trail */
.accretion-disk.blur {
    filter: blur(10px);
    opacity: 0.8;
    animation: warp-spin 1s linear infinite;
}

.warp-text {
    font-family: 'Verdana', sans-serif;
    color: #aa00ff;
    font-size: 10px;
    letter-spacing: 6px;
    text-transform: uppercase;
    animation: pulse-text 0.5s infinite alternate;
}

@keyframes warp-spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); } /* Breathing effect */
    100% { transform: rotate(360deg) scale(1); }
}

@keyframes pulse-text {
    from { opacity: 0.5; letter-spacing: 6px; }
    to { opacity: 1; letter-spacing: 8px; }
}
`,
        js: `// Relative Time`
    }
},
{
    id: "synthwave-pyramid-pro",
    title: "Synthwave Flux Pyramid — Neon Loading Animation",
    description: "A premium 3D synthwave loader. A semi-transparent gradient pyramid floats over an infinite scrolling grid. Inside, a volatile energy core pulses, illuminating the glass faces from within.",
    tags: ["3D", "Synthwave", "Neon", "Cyberpunk", "Gradient", "Prism", "Premium"],
    keywords: ["3d neon pyramid", "cyberpunk loader", "synthwave prism css", "futuristic spinner"],
    code: {
        html: `
<div class="pyramid-scene">
    <div class="grid-floor"></div>

    <div class="scene-camera">
        <div class="pyramid-assembly">
            
            <div class="core-light"></div>
            
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            
            <div class="base-shadow"></div>
        </div>
    </div>

    <div class="status-text">
        <span class="glitch-text">SYSTEM ONLINE</span>
    </div>
</div>
`,
        css: `
.pyramid-scene {
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at 50% 30%, #2b1055, #000); /* Deep Space Purple */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective: 1000px; /* Essential for 3D depth */
    overflow: hidden;
    position: relative;
}

/* --- 1. THE INFINITE FLOOR --- */
.grid-floor {
    position: absolute;
    bottom: -20%;
    width: 200%;
    height: 100%;
    background: 
        linear-gradient(transparent 0%, rgba(255, 0, 255, 0.4) 2%, transparent 3%),
        linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.4) 2%, transparent 3%);
    background-size: 60px 60px;
    transform: rotateX(70deg); /* Flatten it out */
    animation: grid-scroll 3s linear infinite;
    mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%); /* Fade out horizon */
    pointer-events: none;
}

/* --- 2. THE 3D OBJECT --- */
.scene-camera {
    width: 140px;
    height: 140px;
    transform-style: preserve-3d; /* Allows children to be 3D */
    animation: float-object 4s ease-in-out infinite;
}

.pyramid-assembly {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: spin-geometry 8s linear infinite;
}

/* --- 3. THE FACES --- */
.face {
    position: absolute;
    width: 140px;
    height: 140px;
    /* Construct Triangle */
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    /* Glassy Gradient */
    background: linear-gradient(180deg, rgba(0, 255, 255, 0.6) 0%, rgba(255, 0, 255, 0.2) 100%);
    transform-origin: bottom center;
    /* Frosty Glass Effect */
    backdrop-filter: blur(4px); 
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    box-shadow: inset 0 0 30px rgba(0, 255, 255, 0.2);
}

/* 3D MATH:
   Base size = 140px. 
   Distance from center to edge = 70px.
   Tilt angle = 30deg.
*/
.front { transform: translateZ(70px) rotateX(30deg); }
.back  { transform: rotateY(180deg) translateZ(70px) rotateX(30deg); }
.right { transform: rotateY(90deg) translateZ(70px) rotateX(30deg); }
.left  { transform: rotateY(-90deg) translateZ(70px) rotateX(30deg); }

/* --- 4. THE CORE (Light Source) --- */
.core-light {
    position: absolute;
    top: 60%; left: 50%;
    transform: translate(-50%, -50%);
    width: 40px; height: 40px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 
        0 0 20px #ff00ff,
        0 0 60px #00ffff;
    animation: pulse-energy 2s infinite alternate;
}

/* --- 5. THE SHADOW --- */
.base-shadow {
    position: absolute;
    width: 140px; height: 140px;
    background: radial-gradient(circle, rgba(255, 0, 255, 0.8), transparent 60%);
    transform: rotateX(90deg) translateZ(-100px); /* Push down to floor */
    filter: blur(20px);
    animation: shadow-scale 4s ease-in-out infinite;
}

/* --- 6. TEXT UI --- */
.status-text {
    margin-top: 120px;
    font-family: 'Montserrat', sans-serif; /* Use a geometric font */
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 6px;
    color: #00ffff;
    text-shadow: 0 0 10px #ff00ff;
    position: relative;
    z-index: 10;
}

/* --- ANIMATIONS --- */
@keyframes spin-geometry {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
}

@keyframes float-object {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes grid-scroll {
    0% { background-position: 0 0; }
    100% { background-position: 0 60px; }
}

@keyframes pulse-energy {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

@keyframes shadow-scale {
    0%, 100% { transform: rotateX(90deg) translateZ(-100px) scale(0.8); opacity: 0.5; }
    50% { transform: rotateX(90deg) translateZ(-100px) scale(1.2); opacity: 0.2; } /* Fades as object rises */
}
`,
        js: `// Welcome to the Neon Grid`
    }
},
{
    id: "aether-crystal-loader",
    title: "Aether Crystal Loading Animation",
    description: "A mesmerizing 3D octahedron (double pyramid) resembling a floating magical gem. Features semi-transparent glassy faces and glowing edges, rotating on multiple axes.",
    tags: ["Crystal", "Gem", "Magic", "3D", "Elegant", "Glass", "Fantasy"],
    keywords: ["3d crystal animation", "gemstone loader", "octahedron css", "magical ui spinner"],
    code: {
        html: `
<div class="crystal-scene">
    <div class="crystal">
        <div class="pyramid top">
            <div class="side s1"></div>
            <div class="side s2"></div>
            <div class="side s3"></div>
            <div class="side s4"></div>
        </div>
        <div class="pyramid bottom">
            <div class="side s1"></div>
            <div class="side s2"></div>
            <div class="side s3"></div>
            <div class="side s4"></div>
        </div>
    </div>
    <div class="crystal-text">CRYSTALLIZING</div>
</div>`,
        css: `
.crystal-scene {
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at center, #1a2a6c, #b21f1f, #fdbb2d); /* Mystic Gradient */
    background: #0f172a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    perspective: 1000px;
}

.crystal {
    position: relative;
    width: 80px;
    height: 120px;
    transform-style: preserve-3d;
    animation: crystal-spin 8s linear infinite;
}

.pyramid {
    position: absolute;
    width: 100%; height: 50%;
    transform-style: preserve-3d;
}

/* Top half sits up, Bottom half sits down */
.pyramid.top { top: 0; }
.pyramid.bottom { bottom: 0; transform: rotateX(180deg); }

.side {
    position: absolute;
    width: 80px; height: 60px; /* Adjust height for sharpness */
    background: rgba(100, 200, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 10px rgba(100, 200, 255, 0.2);
    /* Triangle Clip */
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform-origin: bottom center;
}

/* Assemble the 4 sides */
.s1 { transform: translateZ(40px) rotateX(35deg); }
.s2 { transform: rotateY(90deg) translateZ(40px) rotateX(35deg); }
.s3 { transform: rotateY(180deg) translateZ(40px) rotateX(35deg); }
.s4 { transform: rotateY(-90deg) translateZ(40px) rotateX(35deg); }

/* Glow Effects */
.crystal::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 10px; height: 10px;
    box-shadow: 0 0 50px 20px rgba(255, 255, 255, 0.8);
    background: white;
    border-radius: 50%;
    animation: pulse-core 2s infinite;
}

@keyframes crystal-spin {
    0% { transform: rotateY(0deg) rotateX(10deg); }
    100% { transform: rotateY(360deg) rotateX(10deg); }
}

@keyframes pulse-core {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
}

.crystal-text {
    font-family: 'Cinzel', serif;
    color: #a5f3fc;
    letter-spacing: 4px;
    font-size: 12px;
}
`,
        js: `// Double Pyramid Geometry`
    }
},
{
    id: "hyper-prism-loader",
    title: "Hyper-Prism Crystal Loading Animation",
    description: "A mesmerizing 3D octahedron (double pyramid) with semi-transparent glass faces. A volatile energy core pulses inside, illuminating the edges with neon gradients.",
    tags: ["3D", "Crystal", "Neon", "Glass", "Sci-Fi", "Geometry", "Premium"],
    keywords: ["3d crystal css", "neon octahedron loader", "glassmorphism spinner", "futuristic gem animation"],
    code: {
        html: `
<div class="prism-scene">
    <div class="prism-wrapper">
        <div class="octahedron">
            <div class="face top t1"></div>
            <div class="face top t2"></div>
            <div class="face top t3"></div>
            <div class="face top t4"></div>
            
            <div class="face bottom b1"></div>
            <div class="face bottom b2"></div>
            <div class="face bottom b3"></div>
            <div class="face bottom b4"></div>
            
            <div class="prism-core"></div>
        </div>
        <div class="prism-shadow"></div>
    </div>
    <div class="prism-text">CHARGING CRYSTAL</div>
</div>`,
        css: `
.prism-scene {
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at center, #1a1a2e, #000);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    gap: 60px;
    overflow: hidden;
}

.prism-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    animation: prism-float 4s ease-in-out infinite;
}

.octahedron {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: prism-spin 12s linear infinite;
}

/* Common Face Style */
.face {
    position: absolute;
    width: 100px; height: 87px; /* Triangle Height */
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background: linear-gradient(180deg, rgba(0,255,255,0.1), rgba(255,0,255,0.3));
    border-bottom: 1px solid rgba(255,255,255,0.5);
    backdrop-filter: blur(2px);
    transform-origin: bottom center;
}

/* Face Positioning Logic */
/* We create a top pyramid and a bottom pyramid */

/* Top Faces */
.top { top: -87px; left: 0; transform-origin: bottom center; }
.t1 { transform: translateZ(50px) rotateX(30deg); }
.t2 { transform: rotateY(90deg) translateZ(50px) rotateX(30deg); }
.t3 { transform: rotateY(180deg) translateZ(50px) rotateX(30deg); }
.t4 { transform: rotateY(270deg) translateZ(50px) rotateX(30deg); }

/* Bottom Faces */
.bottom { top: 0; left: 0; transform-origin: top center; }
.b1 { transform: translateZ(50px) rotateX(-30deg); }
.b2 { transform: rotateY(90deg) translateZ(50px) rotateX(-30deg); }
.b3 { transform: rotateY(180deg) translateZ(50px) rotateX(-30deg); }
.b4 { transform: rotateY(270deg) translateZ(50px) rotateX(-30deg); }

/* The Core */
.prism-core {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 40px; height: 40px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 40px #00ffff, 0 0 20px #ff00ff;
    animation: pulse-light 2s infinite alternate;
}

.prism-shadow {
    position: absolute;
    top: 150px; left: 50%;
    transform: translateX(-50%) rotateX(90deg);
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(0,255,255,0.4), transparent 70%);
    filter: blur(10px);
    animation: shadow-scale 4s ease-in-out infinite;
}

.prism-text {
    font-family: 'Verdana', sans-serif;
    color: #00ffff;
    font-size: 10px;
    letter-spacing: 6px;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
}

/* Animations */
@keyframes prism-spin {
    0% { transform: rotateY(0deg) rotateX(10deg); }
    100% { transform: rotateY(360deg) rotateX(10deg); }
}

@keyframes prism-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes pulse-light {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

@keyframes shadow-scale {
    0%, 100% { transform: translateX(-50%) rotateX(90deg) scale(1); opacity: 0.4; }
    50% { transform: translateX(-50%) rotateX(90deg) scale(0.6); opacity: 0.2; }
}
`,
        js: `// Pure CSS Geometry`
    }
},
{
    id: "ufo-realistic-cinematic",
    title: "Area 51 — Classified Footage - Loading Animation",
    description: "A photorealistic sci-fi loader mimicking 'found footage'. Features a metallic saucer with rotating rim lights, a volumetric tractor beam with particle turbulence, and atmospheric fog/grain effects.",
    tags: ["UFO", "Realistic", "Cinematic", "Sci-Fi", "Metal", "Atmosphere", "Horror"],
    keywords: ["realistic ufo css", "cinematic sci-fi loader", "found footage animation", "metal texture css", "volumetric light beam"],
    code: {
        html: `
<div class="classified-scene">
    <div class="film-grain"></div>
    <div class="fog-layer"></div>

    <div class="ufo-assembly">
        <div class="saucer-body">
            <div class="cockpit-dome"></div>
            <div class="metallic-rim">
                <div class="rim-light l1"></div>
                <div class="rim-light l2"></div>
                <div class="rim-light l3"></div>
                <div class="rim-light l4"></div>
                <div class="rim-light l5"></div>
            </div>
            <div class="engine-core"></div>
        </div>

        <div class="beam-cone">
            <div class="beam-core"></div>
            <div class="dust-particles"></div>
        </div>
        
        <div class="ground-spot"></div>

        <div class="specimen-wrapper">
            <div class="specimen"></div>
            <div class="debris d1"></div>
            <div class="debris d2"></div>
            <div class="debris d3"></div>
        </div>
    </div>

    <div class="cam-ui">
        <div class="rec-dot"></div> REC
        <span class="time-code">02:14:59:12</span>
    </div>
    <div class="loader-status">UPLINK ESTABLISHED...</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

.classified-scene {
    width: 100%;
    height: 100vh;
    background: #050508;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    perspective: 1000px;
}

/* --- ATMOSPHERE --- */
.film-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
    opacity: 0.15;
    pointer-events: none;
    z-index: 20;
}

.fog-layer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, rgba(10,20,30,0.8), transparent);
    filter: blur(20px);
    z-index: 1;
}

/* --- UFO ASSEMBLY --- */
.ufo-assembly {
    position: relative;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-style: preserve-3d;
}

/* --- THE SHIP (Metallic Texture) --- */
.saucer-body {
    position: relative;
    width: 200px;
    height: 60px;
    z-index: 10;
    transform-style: preserve-3d;
    animation: hover-tilt 4s ease-in-out infinite;
}

/* Brushed Metal Main Disc */
.metallic-rim {
    position: absolute;
    top: 20px;
    width: 100%;
    height: 40px;
    border-radius: 50%;
    /* Realistic Metal Gradient */
    background: conic-gradient(
        from 90deg,
        #2a2a2a 0%,
        #555 10%,
        #888 25%,
        #111 45%,
        #444 50%,
        #222 70%,
        #666 85%,
        #2a2a2a 100%
    );
    box-shadow: 
        inset 0 1px 2px rgba(255,255,255,0.3),
        0 10px 20px rgba(0,0,0,0.5);
    overflow: hidden;
    transform: rotateX(10deg); /* Tilt to show depth */
}

/* The Spinning Lights Ring */
.rim-light {
    position: absolute;
    top: 50%; left: 50%;
    width: 180px; height: 180px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px dashed rgba(0, 255, 255, 0.3);
    animation: spin-rim 2s linear infinite;
}
.rim-light::after {
    content:''; position: absolute; top: 0; left: 50%; width: 4px; height: 4px;
    background: #fff; box-shadow: 0 0 10px #0ff; border-radius: 50%;
}

/* Cockpit Dome */
.cockpit-dome {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 80px; height: 40px;
    background: radial-gradient(circle at 30% 20%, rgba(200, 255, 255, 0.9), rgba(0, 50, 60, 0.8));
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
    z-index: 5;
}

/* Bottom Engine Glow */
.engine-core {
    position: absolute;
    bottom: -5px; left: 50%;
    transform: translateX(-50%) rotateX(10deg);
    width: 60px; height: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 30px 10px rgba(0, 255, 255, 0.6);
    z-index: 1;
}

/* --- THE BEAM (Volumetric) --- */
.beam-cone {
    position: absolute;
    top: 60px;
    width: 140px;
    height: 250px;
    /* Cone shape */
    clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
    background: linear-gradient(to bottom, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.05));
    /* Soft edges */
    -webkit-mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 70%);
    z-index: 5;
    animation: beam-flicker 0.1s infinite alternate;
}

.beam-core {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 45%, rgba(255,255,255,0.3) 50%, transparent 55%);
    filter: blur(4px);
}

.dust-particles {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(white 1px, transparent 1px);
    background-size: 10px 10px;
    opacity: 0.5;
    animation: updraft 1s linear infinite;
}

/* --- THE SPECIMEN --- */
.specimen-wrapper {
    position: absolute;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 6;
    animation: levitate 4s ease-in infinite;
}

.specimen {
    width: 15px; height: 25px;
    background: #000; /* Silhouette */
    border-radius: 50% 50% 5px 5px; /* Vague humanoid/creature shape */
    box-shadow: 0 0 10px rgba(0,0,0,0.8);
    position: relative;
}

/* Floating debris */
.debris {
    position: absolute;
    background: #000;
    width: 3px; height: 3px;
    border-radius: 50%;
}
.d1 { top: 10px; left: -10px; animation: debris-float 2s infinite; }
.d2 { top: 20px; right: -12px; animation: debris-float 3s infinite 0.5s; }
.d3 { bottom: -5px; left: 5px; animation: debris-float 1.5s infinite 0.2s; }


.ground-spot {
    position: absolute;
    bottom: -20px;
    width: 200px; height: 40px;
    background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.3), transparent 70%);
    transform: rotateX(70deg);
    filter: blur(10px);
    z-index: 0;
}

/* --- CAM UI --- */
.cam-ui {
    position: absolute;
    top: 40px; right: 40px;
    font-family: 'Share Tech Mono', monospace;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.7;
}
.rec-dot {
    width: 10px; height: 10px; background: red; border-radius: 50%;
    animation: blink 1s infinite;
}

.loader-status {
    position: absolute;
    bottom: 40px;
    left: 40px;
    font-family: 'Share Tech Mono', monospace;
    color: #00ffff;
    letter-spacing: 2px;
    text-shadow: 0 0 5px #00ffff;
    font-size: 14px;
}

/* --- ANIMATIONS --- */
@keyframes hover-tilt {
    0%, 100% { transform: translateY(0) rotate(1deg); }
    50% { transform: translateY(-10px) rotate(-1deg); }
}

@keyframes spin-rim {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes updraft {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-50px); opacity: 0; }
}

@keyframes levitate {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    30% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(-150px) rotate(-10deg) scale(0); opacity: 0; }
}

@keyframes debris-float {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-30px); opacity: 0; }
}

@keyframes blink { 50% { opacity: 0; } }
@keyframes beam-flicker { 0% { opacity: 0.8; } 100% { opacity: 0.9; } }
`,
        js: `// Target Acquired`
    }
},
{
    id: "midnight-drive-loader",
    title: "Midnight Grid Run - Loading Animation",
    description: "A classic synthwave/outrun aesthetic loader. A neon grid scrolls endlessly towards a retro gradient sun. Features perspective distortion and scanline effects.",
    tags: ["Retro", "Synthwave", "80s", "Grid", "Sun", "Aesthetic", "Cool"],
    keywords: ["synthwave grid animation", "retro sun css", "outrun style loader", "80s aesthetic spinner"],
    code: {
        html: `
<div class="drive-scene">
    <div class="sky">
        <div class="sun"></div>
    </div>
    <div class="ground">
        <div class="grid"></div>
    </div>
    <div class="drive-text">LOADING ASSETS</div>
</div>`,
        css: `
.drive-scene {
    width: 100%;
    height: 100vh;
    background: #090014;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    perspective: 400px; /* Strong perspective for the road */
}

/* THE SKY & SUN */
.sky {
    position: relative;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, #2b1055, #000);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 2;
}

.sun {
    width: 120px;
    height: 120px;
    background: linear-gradient(to top, #ff00ff, #ffbd00);
    border-radius: 50%;
    margin-bottom: -40px; /* Half buried */
    box-shadow: 0 0 40px #ff00ff;
    /* Create the "Blinds" effect on the sun */
    mask-image: linear-gradient(
        to bottom,
        black 0%, black 50%,
        transparent 50%, transparent 55%,
        black 55%, black 65%,
        transparent 65%, transparent 70%,
        black 70%, black 80%,
        transparent 80%, transparent 85%,
        black 85%, black 100%
    );
}

/* THE GROUND & GRID */
.ground {
    position: relative;
    width: 100%;
    height: 50%;
    background: #140024;
    transform-style: preserve-3d;
    overflow: hidden;
}

.grid {
    position: absolute;
    top: 0; left: -50%;
    width: 200%;
    height: 200%;
    background: 
        linear-gradient(transparent 0%, rgba(0,255,255,0.4) 2%, transparent 3%),
        linear-gradient(90deg, transparent 0%, rgba(255,0,255,0.4) 2%, transparent 3%);
    background-size: 40px 40px;
    transform: rotateX(80deg) translateY(-20px);
    animation: grid-scroll 1s linear infinite;
    box-shadow: 0 0 50px rgba(0,255,255,0.2);
}

.drive-text {
    position: absolute;
    bottom: 20px;
    font-family: 'Helvetica', sans-serif;
    font-style: italic;
    font-weight: bold;
    color: #00ffff;
    letter-spacing: 4px;
    text-shadow: 2px 2px #ff00ff;
    z-index: 10;
}

@keyframes grid-scroll {
    0% { background-position: 0 0; }
    100% { background-position: 0 40px; }
}
`,
        js: `// Enjoy the ride`
    }
},
{
    id: "retro-cassette-loader",
    title: "Retro Mixtape - Loading Animation",
    description: "A nostalgic cassette tape loader. Spools spin, tape winds, and the label features a handwritten font. Perfect for music players, podcasts, or retro-themed creative portfolios.",
    tags: ["Retro", "Music", "Cassette", "80s", "90s", "Audio", "Nostalgia"],
    keywords: ["cassette css animation", "retro music loader", "tape recorder spinner", "audio player loading"],
    code: {
        html: `
<div class="cassette-scene">
    <div class="cassette">
        <div class="sticker-area">
            <div class="title">AWESOME MIX VOL. 1</div>
            
            <div class="spool left">
                <div class="teeth"></div>
                <div class="tape-roll"></div>
            </div>
            
            <div class="spool right">
                <div class="teeth"></div>
                <div class="tape-roll small"></div>
            </div>
            
            <div class="window">
                <div class="tape-bridge"></div>
            </div>
        </div>
        
        <div class="holes">
            <div class="screw"></div>
            <div class="screw"></div>
            <div class="screw"></div>
            <div class="screw"></div>
        </div>
    </div>
    <div class="status-text">REWINDING...</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

.cassette-scene {
    width: 100%;
    height: 100vh;
    background: #2d3436;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.cassette {
    position: relative;
    width: 200px;
    height: 125px;
    background: #333;
    border-radius: 10px;
    box-shadow: 
        inset 0 0 10px #000,
        0 10px 20px rgba(0,0,0,0.3);
    border: 2px solid #555;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

/* The Sticker Label */
.sticker-area {
    position: relative;
    width: 180px;
    height: 80px;
    background: #f1c40f; /* Retro Yellow */
    border-radius: 5px;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
    overflow: hidden;
}

.title {
    font-family: 'Permanent Marker', cursive;
    font-size: 10px;
    color: #333;
    position: absolute;
    top: 5px; left: 10px;
    transform: rotate(-2deg);
}

/* Spools */
.spool {
    position: absolute;
    top: 25px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}

.left { left: 40px; }
.right { right: 40px; }

.teeth {
    width: 100%; height: 100%;
    background: 
        conic-gradient(transparent 10%, #fff 10%, #fff 20%, transparent 20%, transparent 30%, #fff 30%, #fff 40%, transparent 40%, transparent 50%, #fff 50%, #fff 60%, transparent 60%, transparent 70%, #fff 70%, #fff 80%, transparent 80%, transparent 90%, #fff 90%, #fff 100%);
    border-radius: 50%;
    animation: spin-reel 2s linear infinite;
    mask-image: radial-gradient(transparent 30%, black 31%);
}

.tape-roll {
    position: absolute;
    border-radius: 50%;
    background: #111;
    z-index: -1;
}

/* Left starts full, gets smaller */
.left .tape-roll {
    width: 50px; height: 50px;
    animation: shrink-roll 10s linear infinite;
}

/* Right starts small, gets bigger */
.right .tape-roll {
    width: 32px; height: 32px;
    animation: grow-roll 10s linear infinite;
}

.window {
    position: absolute;
    top: 25px; left: 70px;
    width: 40px; height: 30px;
    background: #333;
    opacity: 0.2;
    z-index: 2;
}

.holes {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: auto;
}

.screw {
    width: 6px; height: 6px;
    background: #111;
    border-radius: 50%;
    box-shadow: inset 1px 1px 1px rgba(255,255,255,0.2);
}

.status-text {
    font-family: 'Courier New', monospace;
    color: #f1c40f;
    letter-spacing: 2px;
    animation: blink 1s infinite;
}

/* Animations */
@keyframes spin-reel {
    to { transform: rotate(360deg); }
}

@keyframes shrink-roll {
    0% { transform: scale(1); }
    50% { transform: scale(0.65); } /* Don't go to 0 */
    100% { transform: scale(1); }
}

@keyframes grow-roll {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
}

@keyframes blink { 50% { opacity: 0; } }
`,
        js: `// Press Play`
    }
},
{
    id: "arcane-grimoire-relic",
    title: "Arcane Grimoire Loading Animation",
    description: "A museum-quality 3D book loader. Features worn leather textures, gold leaf detailing, individual page physics, and a mystical particle system emitting from the open pages.",
    tags: ["Fantasy", "Magic", "Realistic", "3D", "Book", "Ancient", "Cinematic"],
    keywords: ["realistic book css", "fantasy grimoire loader", "magic particle animation", "ancient tome spinner"],
    code: {
        html: `
<div class="relic-scene">
    <div class="mystic-fog"></div>
    
    <div class="book-assembly">
        <div class="grimoire">
            <div class="cover back-cover"></div>
            
            <div class="spine"></div>
            
            <div class="page-block"></div>
            
            <div class="page-layer p1">
                <div class="page-content"></div>
            </div>
            <div class="page-layer p2">
                <div class="page-content"></div>
            </div>
            <div class="page-layer p3">
                <div class="page-content"></div>
            </div>
            <div class="page-layer p4">
                <div class="page-content"></div>
            </div>

            <div class="cover front-cover">
                <div class="gem-socket">
                    <div class="gem"></div>
                </div>
                <div class="gold-filigree"></div>
            </div>
        </div>

        <div class="magic-emitter">
            <div class="rune r1">✨</div>
            <div class="rune r2">✴</div>
            <div class="rune r3">✦</div>
            <div class="rune r4">✨</div>
            <div class="glow-orb"></div>
        </div>
        
        <div class="book-shadow"></div>
    </div>

    <div class="ancient-text">DECIPHERING RUNES...</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');

.relic-scene {
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at 50% 30%, #2a1a3a, #050208 80%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective: 1200px;
    overflow: hidden;
    position: relative;
}

/* Atmospheric Fog */
.mystic-fog {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(100,0,255,0.1), transparent);
    filter: blur(20px);
    pointer-events: none;
}

.book-assembly {
    position: relative;
    width: 180px;
    height: 120px;
    transform-style: preserve-3d;
    animation: levitate 6s ease-in-out infinite;
}

.grimoire {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(40deg) rotateY(0deg) rotateZ(-10deg);
}

/* --- COVERS (Worn Leather Texture) --- */
.cover {
    position: absolute;
    width: 100%; height: 100%;
    background: #3e2723; /* Dark Leather */
    border-radius: 4px 10px 10px 4px;
    /* Simulated Leather Texture via Gradients */
    background-image: 
        radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.6) 100%),
        repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px);
    box-shadow: 
        inset 2px 2px 5px rgba(255,255,255,0.1),
        inset -2px -2px 10px rgba(0,0,0,0.5);
    transform-origin: left;
}

.back-cover {
    transform: translateZ(0px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

.front-cover {
    transform: translateZ(15px); /* Thickness of book */
    animation: open-book 8s ease-in-out infinite;
    z-index: 10;
}

/* Spine */
.spine {
    position: absolute;
    left: 0; top: 0;
    width: 20px; height: 100%;
    background: #2d1b18;
    transform-origin: right;
    transform: rotateY(-90deg) translateX(-15px);
    border-radius: 2px;
}

/* Decorative Elements */
.gold-filigree {
    position: absolute;
    inset: 10px;
    border: 2px solid #c5a059; /* Gold */
    border-radius: 2px 6px 6px 2px;
    opacity: 0.6;
    mask-image: linear-gradient(black, black); /* Simple mask placeholder */
    /* In production, use an SVG background for ornate patterns */
    background: radial-gradient(circle at center, transparent 60%, rgba(197, 160, 89, 0.1));
}

.gem-socket {
    position: absolute;
    top: 50%; right: 20px;
    transform: translateY(-50%);
    width: 30px; height: 30px;
    background: #c5a059;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
}

.gem {
    width: 20px; height: 20px;
    background: radial-gradient(circle at 30% 30%, #ff0055, #550011);
    border-radius: 50%;
    box-shadow: inset 0 0 5px rgba(255,255,255,0.5);
}

/* --- PAGES (Aged Paper) --- */
.page-block {
    position: absolute;
    top: 2px; left: 2px;
    width: 170px; height: 116px;
    background: #d7ccc8;
    transform: translateZ(2px);
    box-shadow: inset -5px 0 10px rgba(0,0,0,0.1);
}

.page-layer {
    position: absolute;
    top: 2px; left: 2px;
    width: 170px; height: 116px;
    background: #f5f5dc; /* Beige */
    border-radius: 0 4px 4px 0;
    transform-origin: left;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    border-right: 1px solid rgba(0,0,0,0.1);
}

.page-content {
    width: 100%; height: 100%;
    background: linear-gradient(to right, #e0e0e0, #f5f5dc 10%, #f5f5dc 90%, #e0e0e0);
    /* Simulated Text Lines */
    background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 10px, rgba(0,0,0,0.05) 11px);
    background-size: 80% 80%;
    background-position: center;
    background-repeat: no-repeat;
}

/* Page Animation Sequence */
.p1 { animation: flip-page 8s ease-in-out infinite 1s; z-index: 4; }
.p2 { animation: flip-page 8s ease-in-out infinite 1.5s; z-index: 3; }
.p3 { animation: flip-page 8s ease-in-out infinite 2s; z-index: 2; }
.p4 { animation: flip-page 8s ease-in-out infinite 2.5s; z-index: 1; }

/* --- MAGIC FX --- */
.magic-emitter {
    position: absolute;
    top: -20px; left: 50%;
    width: 100px; height: 100px;
    transform: translateX(-50%) translateZ(20px);
    pointer-events: none;
}

.glow-orb {
    position: absolute;
    bottom: 0; left: 50%;
    width: 60px; height: 60px;
    background: radial-gradient(circle, rgba(255, 200, 0, 0.4), transparent 70%);
    transform: translateX(-50%);
    filter: blur(15px);
    animation: pulse-magic 2s infinite alternate;
}

.rune {
    position: absolute;
    font-size: 10px;
    color: #ffd700;
    text-shadow: 0 0 5px #ffaa00;
    opacity: 0;
}
.r1 { left: 20%; animation: rune-rise 3s ease-out infinite 0s; }
.r2 { left: 50%; animation: rune-rise 3s ease-out infinite 1s; }
.r3 { left: 80%; animation: rune-rise 3s ease-out infinite 2s; }
.r4 { left: 30%; animation: rune-rise 4s ease-out infinite 0.5s; }

.book-shadow {
    position: absolute;
    bottom: -60px;
    left: 20px;
    width: 140px; height: 20px;
    background: black;
    border-radius: 50%;
    filter: blur(15px);
    opacity: 0.5;
    transform: rotateZ(-10deg);
    animation: shadow-breath 6s ease-in-out infinite;
}

.ancient-text {
    margin-top: 80px;
    font-family: 'Cinzel Decorative', cursive;
    color: #deb887; /* Burlywood */
    font-size: 14px;
    letter-spacing: 4px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    opacity: 0.8;
    animation: text-glow 3s infinite alternate;
}

/* --- ANIMATIONS --- */

@keyframes levitate {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
}

@keyframes open-book {
    0%, 100% { transform: translateZ(15px) rotateY(0deg); }
    15%, 85% { transform: translateZ(15px) rotateY(-160deg); }
}

@keyframes flip-page {
    0% { transform: rotateY(0deg); }
    15% { transform: rotateY(0deg); }
    35% { transform: rotateY(-160deg); } /* Fast flip */
    85% { transform: rotateY(-160deg); } /* Hold */
    100% { transform: rotateY(0deg); } /* Close */
}

@keyframes rune-rise {
    0% { transform: translateY(20px) scale(0); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateY(-80px) rotate(360deg) scale(1.2); opacity: 0; }
}

@keyframes pulse-magic {
    0% { opacity: 0.3; transform: translateX(-50%) scale(1); }
    100% { opacity: 0.8; transform: translateX(-50%) scale(1.2); }
}

@keyframes shadow-breath {
    0%, 100% { transform: rotateZ(-10deg) scale(1); opacity: 0.5; }
    50% { transform: rotateZ(-10deg) scale(0.8); opacity: 0.3; }
}

@keyframes text-glow {
    0% { text-shadow: 0 0 5px #deb887; }
    100% { text-shadow: 0 0 20px #ffaa00; }
}
`,
        js: `// Secrets Revealed`
    }
},
{
    id: "vault-security-loader",
    title: "Digital Vault Lock - Loading Animation",
    description: "A high-security fintech loader. Concentric metallic rings rotate in opposing directions like a safe's combination lock. Features a scanning light effect and metallic gradients.",
    tags: ["Security", "Fintech", "Crypto", "Lock", "Metal", "Premium", "Bank"],
    keywords: ["vault lock animation", "security scanner css", "fintech loader", "crypto spinner"],
    code: {
        html: `
<div class="vault-scene">
    <div class="vault-lock">
        <div class="ring outer">
            <div class="notch"></div>
            <div class="notch n2"></div>
        </div>
        <div class="ring middle">
            <div class="notch"></div>
        </div>
        <div class="lock-core">
            <div class="keyhole"></div>
        </div>
        <div class="scan-beam"></div>
    </div>
    <div class="secure-text">VERIFYING CREDENTIALS</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');

.vault-scene {
    width: 100%;
    height: 100vh;
    background: #0f172a; /* Slate 900 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.vault-lock {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    /* Metallic Background */
    background: radial-gradient(circle, #334155, #1e293b);
    box-shadow: 
        0 10px 30px rgba(0,0,0,0.5),
        inset 0 0 20px rgba(255,255,255,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
}

.ring {
    position: absolute;
    border-radius: 50%;
    border: 5px solid #475569; /* Slate 600 */
    border-top-color: #94a3b8; /* Highlight */
    border-bottom-color: #1e293b; /* Shadow */
    display: flex;
    justify-content: center;
}

.outer {
    width: 140px; height: 140px;
    animation: spin-cw 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

.middle {
    width: 100px; height: 100px;
    border-color: #64748b;
    border-top-color: #cbd5e1;
    animation: spin-ccw 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

.notch {
    position: absolute;
    top: -5px;
    width: 10px; height: 10px;
    background: #38bdf8; /* Cyan Light */
    border-radius: 50%;
    box-shadow: 0 0 10px #38bdf8;
}
.n2 { top: auto; bottom: -5px; background: #ef4444; box-shadow: 0 0 10px #ef4444; }

.lock-core {
    width: 60px; height: 60px;
    background: linear-gradient(135deg, #e2e8f0, #94a3b8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
}

.keyhole {
    width: 12px; height: 20px;
    background: #0f172a;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #000;
}

.scan-beam {
    position: absolute;
    width: 100%; height: 2px;
    background: #38bdf8;
    box-shadow: 0 0 15px #38bdf8;
    animation: scan-vertical 2s ease-in-out infinite;
    opacity: 0.5;
    z-index: 10;
}

.secure-text {
    font-family: 'Rajdhani', sans-serif;
    color: #38bdf8;
    letter-spacing: 3px;
    font-size: 14px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
    animation: pulse-text 1s infinite alternate;
}

/* Animations */
@keyframes spin-cw {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
}

@keyframes spin-ccw {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-180deg); }
    100% { transform: rotate(-360deg); }
}

@keyframes scan-vertical {
    0% { top: 0; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}

@keyframes pulse-text {
    from { opacity: 0.6; }
    to { opacity: 1; }
}
`,
        js: `// Access Granted`
    }
},
{
    id: "steampunk-gear-loader",
    title: "Clockwork Steam Engine - Loading Animation",
    description: "A detailed mechanical loader. Interlocking brass and iron gears rotate in sync, driven by a pulsing steam piston. Features metallic gradients, rivet details, and particle steam effects.",
    tags: ["Steampunk", "Mechanical", "Gears", "Retro", "Industrial", "Metal", "Complex"],
    keywords: ["steampunk css animation", "gear spinner loader", "mechanical clockwork css", "industrial loading screen"],
    code: {
        html: `
<div class="steam-scene">
    <div class="machine-container">
        <div class="gear main-gear">
            <div class="spokes"></div>
            <div class="hub"></div>
        </div>
        
        <div class="gear small-gear">
            <div class="spokes iron"></div>
            <div class="hub iron"></div>
        </div>

        <div class="piston-arm">
            <div class="rod"></div>
            <div class="connector"></div>
        </div>

        <div class="steam-vent">
            <div class="puff p1"></div>
            <div class="puff p2"></div>
            <div class="puff p3"></div>
        </div>
    </div>
    
    <div class="brass-plate">
        <span class="engraving">BUILDING PRESSURE...</span>
        <div class="rivet r1"></div>
        <div class="rivet r2"></div>
        <div class="rivet r3"></div>
        <div class="rivet r4"></div>
    </div>
</div>`,
        css: `
.steam-scene {
    width: 100%;
    height: 100vh;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    background-image: radial-gradient(circle, #2a2a2a, #000);
}

.machine-container {
    position: relative;
    width: 200px;
    height: 160px;
}

/* --- GEAR MECHANICS --- */
.gear {
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}

/* Brass Gear Style */
.main-gear {
    top: 20px; left: 20px;
    width: 100px; height: 100px;
    background: conic-gradient(from 0deg, #b8860b 0deg, #cd853f 10deg, #8b4513 20deg, #b8860b 30deg); 
    /* Repeating gradient simulates teeth */
    background: radial-gradient(circle at center, #d4af37 60%, transparent 61%),
                conic-gradient(#8b4513 10%, transparent 10% 20%, #8b4513 20% 30%, transparent 30% 40%, #8b4513 40% 50%, transparent 50% 60%, #8b4513 60% 70%, transparent 70% 80%, #8b4513 80% 90%, transparent 90%);
    animation: spin-cw 4s linear infinite;
}

/* Iron Gear Style */
.small-gear {
    bottom: 20px; right: 30px;
    width: 70px; height: 70px;
    background: radial-gradient(circle at center, #7f8c8d 60%, transparent 61%),
                conic-gradient(#2c3e50 10%, transparent 10% 20%, #2c3e50 20% 30%, transparent 30% 40%, #2c3e50 40% 50%, transparent 50% 60%, #2c3e50 60% 70%, transparent 70% 80%, #2c3e50 80% 90%, transparent 90%);
    animation: spin-ccw 2.8s linear infinite; /* Speed ratio matched to size roughly */
}

/* Inner Details */
.spokes {
    position: absolute;
    width: 80%; height: 80%;
    border: 4px solid #8b4513;
    border-radius: 50%;
    background: radial-gradient(transparent 50%, #d4af37 50%);
}
.spokes.iron { border-color: #2c3e50; background: radial-gradient(transparent 50%, #95a5a6 50%); }

.hub {
    width: 20px; height: 20px;
    background: radial-gradient(circle at 30% 30%, #ffd700, #8b4513);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    z-index: 5;
}
.hub.iron { background: radial-gradient(circle at 30% 30%, #ecf0f1, #2c3e50); }

/* --- PISTON ARM --- */
.piston-arm {
    position: absolute;
    top: 70px; left: 70px;
    width: 100px; height: 10px;
    transform-origin: left;
    animation: piston-pump 4s linear infinite;
    pointer-events: none;
}
.rod {
    width: 100%; height: 6px;
    background: linear-gradient(to bottom, #bdc3c7, #7f8c8d);
    border-radius: 3px;
}

/* --- STEAM FX --- */
.steam-vent {
    position: absolute;
    top: -20px; right: 0;
    width: 20px; height: 20px;
}

.puff {
    position: absolute;
    background: rgba(255,255,255,0.4);
    border-radius: 50%;
    filter: blur(8px);
}
.p1 { width: 20px; height: 20px; animation: steam-rise 2s infinite 0s; }
.p2 { width: 30px; height: 30px; animation: steam-rise 2s infinite 0.7s; }
.p3 { width: 15px; height: 15px; animation: steam-rise 2s infinite 1.4s; }

/* --- UI PLATE --- */
.brass-plate {
    position: relative;
    padding: 10px 30px;
    background: linear-gradient(to bottom, #b8860b, #8b4513);
    border: 2px solid #5a3a1a;
    border-radius: 4px;
    box-shadow: 
        inset 1px 1px 0 rgba(255,255,255,0.4),
        0 5px 10px rgba(0,0,0,0.5);
}

.engraving {
    font-family: 'Courier New', serif;
    font-weight: bold;
    color: #3e2723;
    text-shadow: 0 1px 0 rgba(255,255,255,0.3);
    letter-spacing: 2px;
}

.rivet {
    position: absolute;
    width: 6px; height: 6px;
    background: radial-gradient(circle at 30% 30%, #fff, #333);
    border-radius: 50%;
    box-shadow: 0 1px 2px black;
}
.r1 { top: 4px; left: 4px; }
.r2 { top: 4px; right: 4px; }
.r3 { bottom: 4px; left: 4px; }
.r4 { bottom: 4px; right: 4px; }

/* --- ANIMATIONS --- */
@keyframes spin-cw { 100% { transform: rotate(360deg); } }
@keyframes spin-ccw { 100% { transform: rotate(-360deg); } }

@keyframes piston-pump {
    0% { transform: rotate(0deg) translateX(0); }
    25% { transform: rotate(15deg) translateX(10px); }
    50% { transform: rotate(0deg) translateX(0); }
    75% { transform: rotate(-15deg) translateX(10px); }
    100% { transform: rotate(0deg) translateX(0); }
}

@keyframes steam-rise {
    0% { transform: translateY(0) scale(0.5); opacity: 0; }
    20% { opacity: 0.6; }
    100% { transform: translateY(-60px) scale(2); opacity: 0; }
}
`,
        js: `// Full Steam Ahead`
    }
},
{
    id: "biometric-scan-loader",
    title: "Retina Verification - Loading Animation",
    description: "A high-security biometric scanner. Digital segments form an iris which is scanned by a laser beam. Features a tech grid background and data-processing text effects.",
    tags: ["Security", "Tech", "Biometric", "Scanner", "Blue", "Futuristic", "Fintech"],
    keywords: ["retina scan animation", "biometric loader css", "security scanner ui", "fingerprint spinner"],
    code: {
        html: `
<div class="bio-scene">
    <div class="scan-container">
        <div class="eye-outer">
            <div class="eye-iris">
                <div class="pupil"></div>
                <div class="iris-segment s1"></div>
                <div class="iris-segment s2"></div>
                <div class="iris-segment s3"></div>
            </div>
            
            <div class="scan-line"></div>
            <div class="scan-overlay"></div>
        </div>
        
        <div class="bracket tl"></div>
        <div class="bracket tr"></div>
        <div class="bracket bl"></div>
        <div class="bracket br"></div>
    </div>
    
    <div class="bio-text">
        <span class="status">VERIFYING IDENTITY</span>
        <span class="code">ID: 492-XFA-99</span>
    </div>
</div>`,
        css: `
.bio-scene {
    width: 100%;
    height: 100vh;
    background: #000510;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    font-family: 'Courier New', monospace;
    /* Tech Grid BG */
    background-image: 
        linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
}

.scan-container {
    position: relative;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.eye-outer {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid rgba(0, 255, 255, 0.3);
    overflow: hidden;
    background: rgba(0, 20, 40, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

.eye-iris {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 1px dashed #00ffff;
    animation: rotate-iris 10s linear infinite;
}

.pupil {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 30px; height: 30px;
    background: #000;
    border: 1px solid #00ffff;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ffff;
}

.iris-segment {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: rgba(0, 255, 255, 0.5);
    border-bottom-color: rgba(0, 255, 255, 0.5);
}
.s1 { width: 60px; height: 60px; animation: spin-cw 4s linear infinite; }
.s2 { width: 100px; height: 100px; animation: spin-ccw 5s linear infinite; border-width: 2px; }
.s3 { width: 40px; height: 40px; animation: spin-cw 2s linear infinite; border-width: 6px; border-left-color: rgba(0,255,255,0.3); border-right-color: rgba(0,255,255,0.3); }

/* The Laser Scan */
.scan-line {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: #00ffff;
    box-shadow: 0 0 15px #00ffff;
    animation: scan-down 2s ease-in-out infinite;
    z-index: 10;
}

.scan-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,255,255,0) 0%, rgba(0,255,255,0.2) 50%, rgba(0,255,255,0) 100%);
    background-size: 100% 200%;
    animation: scan-move 2s ease-in-out infinite;
    pointer-events: none;
}

/* UI Brackets */
.bracket {
    position: absolute;
    width: 20px; height: 20px;
    border: 2px solid #00ffff;
    opacity: 0.6;
}
.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.br { bottom: 0; right: 0; border-left: none; border-top: none; }

.bio-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.status {
    color: #00ffff;
    font-size: 14px;
    letter-spacing: 2px;
    animation: blink 0.5s infinite alternate;
}

.code {
    color: #008888;
    font-size: 10px;
}

/* Animations */
@keyframes rotate-iris { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes spin-cw { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes spin-ccw { 100% { transform: translate(-50%, -50%) rotate(-360deg); } }

@keyframes scan-down {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}

@keyframes scan-move {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
}

@keyframes blink { 100% { opacity: 0.5; } }
`,
        js: `// Access Granted`
    }
},
{
    id: "realistic-jellyfish-loader",
    title: "Bioluminescent Jellyfish Loading Animation",
    description: "A photorealistic deep-sea jellyfish loader. Features a multi-layered gelatinous bell, fluid tentacle physics, volumetric lighting, and a 3D plankton particle system.",
    tags: ["Realistic", "Nature", "Ocean", "Bioluminescence", "3D", "Fluid", "Cinematic"],
    keywords: ["realistic jellyfish css", "bioluminescent animation", "underwater physics loader", "deep sea creature css"],
    code: {
        html: `
<div class="deep-sea-scene">
    <div class="caustics-overlay"></div>
    
    <div class="jellyfish-wrapper">
        <div class="bell-outer">
            <div class="bell-inner">
                <div class="organs">
                    <span class="organ o1"></span>
                    <span class="organ o2"></span>
                    <span class="organ o3"></span>
                </div>
            </div>
            <div class="bell-rim"></div>
        </div>

        <div class="oral-arms">
            <div class="arm a1"></div>
            <div class="arm a2"></div>
            <div class="arm a3"></div>
        </div>

        <div class="tentacles-long">
            <div class="tentacle l1"></div>
            <div class="tentacle l2"></div>
            <div class="tentacle l3"></div>
            <div class="tentacle l4"></div>
            <div class="tentacle l5"></div>
        </div>
    </div>

    <div class="plankton-field">
        <div class="speck s1"></div>
        <div class="speck s2"></div>
        <div class="speck s3"></div>
        <div class="speck s4"></div>
        <div class="speck s5"></div>
        <div class="speck s6"></div>
    </div>

    <div class="depth-text">DEPTH: 4,000m</div>
</div>`,
        css: `
.deep-sea-scene {
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle at 50% -20%, #001e36, #000810 80%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    perspective: 1000px;
}

/* Light Caustics from surface */
.caustics-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: 
        radial-gradient(circle at 30% 20%, rgba(0, 255, 255, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 70% 60%, rgba(0, 100, 255, 0.03) 0%, transparent 40%);
    pointer-events: none;
    z-index: 10;
}

.jellyfish-wrapper {
    position: relative;
    width: 140px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: swim-cycle 6s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(0, 150, 255, 0.2));
}

/* --- THE BELL (Complex Layering) --- */
.bell-outer {
    position: relative;
    width: 120px;
    height: 90px;
    background: linear-gradient(180deg, rgba(100, 220, 255, 0.1), rgba(0, 150, 255, 0.05));
    border-radius: 50% 50% 20% 20%;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    box-shadow: inset 0 10px 20px rgba(255, 255, 255, 0.1);
    z-index: 5;
    transform-origin: bottom center;
    animation: bell-contract 3s ease-in-out infinite;
    overflow: hidden;
}

.bell-inner {
    position: absolute;
    top: 10px; left: 10px; right: 10px; bottom: 5px;
    background: radial-gradient(circle at 50% 30%, rgba(0, 200, 255, 0.1), transparent 70%);
    border-radius: 50% 50% 30% 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.organs {
    position: relative;
    width: 50px; height: 30px;
}

.organ {
    position: absolute;
    width: 15px; height: 15px;
    background: radial-gradient(circle, #ff00aa, transparent);
    border-radius: 50%;
    filter: blur(2px);
    opacity: 0.6;
    animation: glow-pulse 3s infinite alternate;
}
.o1 { top: 0; left: 17px; }
.o2 { bottom: 0; left: 0; }
.o3 { bottom: 0; right: 0; }

.bell-rim {
    position: absolute;
    bottom: 0;
    width: 100%; height: 10px;
    background: rgba(255, 255, 255, 0.1);
    filter: blur(2px);
    border-radius: 50%;
}

/* --- ORAL ARMS (Frilly center) --- */
.oral-arms {
    position: absolute;
    top: 80px;
    width: 40px;
    z-index: 4;
    display: flex;
    justify-content: center;
}

.arm {
    width: 8px; height: 60px;
    background: linear-gradient(to bottom, rgba(255, 100, 200, 0.3), transparent);
    filter: blur(1px);
    border-radius: 50%;
    position: absolute;
    transform-origin: top;
}
.a1 { left: 10px; animation: frill-sway 3s ease-in-out infinite 0s; }
.a2 { right: 10px; animation: frill-sway 3s ease-in-out infinite 0.5s; }
.a3 { width: 12px; height: 70px; background: linear-gradient(to bottom, rgba(255, 100, 200, 0.5), transparent); animation: frill-sway 3s ease-in-out infinite 0.2s; }

/* --- LONG TENTACLES --- */
.tentacles-long {
    position: absolute;
    top: 85px;
    width: 100px;
    height: 150px;
    z-index: 3;
}

.tentacle {
    position: absolute;
    width: 2px;
    background: linear-gradient(to bottom, rgba(100, 220, 255, 0.8), transparent);
    border-radius: 1px;
    transform-origin: top;
    opacity: 0.6;
}

.l1 { left: 10%; height: 120px; animation: tentacle-wave 4s ease-in-out infinite 0s; }
.l2 { left: 30%; height: 150px; animation: tentacle-wave 4s ease-in-out infinite 0.5s; }
.l3 { left: 50%; height: 130px; animation: tentacle-wave 4s ease-in-out infinite 1s; }
.l4 { left: 70%; height: 160px; animation: tentacle-wave 4s ease-in-out infinite 1.5s; }
.l5 { left: 90%; height: 110px; animation: tentacle-wave 4s ease-in-out infinite 2s; }

/* --- PLANKTON --- */
.plankton-field {
    position: absolute;
    width: 100%; height: 100%;
    pointer-events: none;
}
.speck {
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: drift 10s linear infinite;
}
.s1 { width: 2px; height: 2px; top: 80%; left: 20%; animation-duration: 12s; }
.s2 { width: 3px; height: 3px; top: 60%; left: 80%; animation-duration: 8s; filter: blur(1px); }
.s3 { width: 1px; height: 1px; top: 40%; left: 40%; animation-duration: 15s; }
.s4 { width: 4px; height: 4px; top: 20%; left: 10%; animation-duration: 20s; filter: blur(2px); opacity: 0.2; }
.s5 { width: 2px; height: 2px; top: 90%; left: 60%; animation-duration: 9s; }
.s6 { width: 1px; height: 1px; top: 10%; left: 90%; animation-duration: 18s; }

.depth-text {
    position: absolute;
    bottom: 40px;
    font-family: 'Verdana', sans-serif;
    color: rgba(0, 150, 255, 0.6);
    font-size: 10px;
    letter-spacing: 4px;
}

/* --- ANIMATIONS --- */

@keyframes swim-cycle {
    0% { transform: translateY(0); }
    30% { transform: translateY(-30px); } /* Propel up */
    100% { transform: translateY(0); } /* Drift down */
}

@keyframes bell-contract {
    0% { transform: scaleX(1) scaleY(1); }
    20% { transform: scaleX(0.85) scaleY(1.1); } /* Squeeze */
    50% { transform: scaleX(1.05) scaleY(0.95); } /* Relax */
    100% { transform: scaleX(1) scaleY(1); }
}

@keyframes glow-pulse {
    0% { opacity: 0.4; transform: scale(1); }
    100% { opacity: 0.8; transform: scale(1.2); }
}

@keyframes frill-sway {
    0%, 100% { transform: rotate(5deg) scaleY(1); }
    50% { transform: rotate(-5deg) scaleY(0.9); }
}

@keyframes tentacle-wave {
    0% { transform: rotate(2deg) translateX(0); }
    50% { transform: rotate(-2deg) translateX(10px); }
    100% { transform: rotate(2deg) translateX(0); }
}

@keyframes drift {
    from { transform: translateY(0); }
    to { transform: translateY(-100vh); }
}
`,
        js: `// Abyssopelagic Zone`
    }
},
{
    id: "realistic-train-loader",
    title: "Orient Express Loading Animation",
    description: "A cinematic, photorealistic train loader. Features a detailed steam engine cutting through atmospheric fog, with volumetric headlights, particle smoke, sparks, and multi-layer parallax scrolling.",
    tags: ["Realistic", "Train", "Cinematic", "Night", "Atmosphere", "Steam", "Travel"],
    keywords: ["realistic train css", "steam engine animation", "cinematic parallax loader", "atmospheric night scene"],
    code: {
        html: `
<div class="night-run-scene">
    <div class="sky-gradient"></div>
    <div class="moon-glow"></div>
    
    <div class="mountains layer-3"></div>
    <div class="forest layer-2"></div>
    <div class="fog-layer"></div>
    
    <div class="train-container">
        <div class="engine-body">
            <div class="chimney">
                <div class="smoke-emitter">
                    <div class="puff p1"></div>
                    <div class="puff p2"></div>
                    <div class="puff p3"></div>
                </div>
            </div>
            <div class="dome"></div>
            <div class="cabin-roof"></div>
            <div class="cabin-window"></div>
            
            <div class="headlight">
                <div class="beam-cone"></div>
            </div>
            
            <div class="piston-rod"></div>
            <div class="wheels-assembly">
                <div class="big-wheel w1">
                    <div class="spoke"></div>
                    <div class="spoke"></div>
                </div>
                <div class="big-wheel w2">
                    <div class="spoke"></div>
                    <div class="spoke"></div>
                </div>
                <div class="small-wheel w3"></div>
            </div>
            
            <div class="sparks-emitter"></div>
        </div>
    </div>
    
    <div class="track-bed">
        <div class="ties"></div>
        <div class="rail"></div>
    </div>
    <div class="foreground-blur"></div>
    
    <div class="cinematic-text">DESTINATION: UNKNOWN</div>
</div>`,
        css: `
.night-run-scene {
    width: 100%;
    height: 100vh;
    background: #050510;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
}

.sky-gradient {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 60%;
    background: linear-gradient(to bottom, #020205, #101025 80%, #1a1a3a 100%);
    z-index: 0;
}

.moon-glow {
    position: absolute;
    top: 15%; right: 15%;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(200,200,255,0.8), transparent 60%);
    filter: blur(10px);
    opacity: 0.6;
}

/* --- PARALLAX SCENERY --- */
.mountains {
    position: absolute;
    bottom: 40%;
    width: 200%; height: 40%;
    background: linear-gradient(170deg, transparent 40%, #080810 40%),
                linear-gradient(190deg, transparent 40%, #080810 40%);
    background-size: 300px 100%;
    filter: blur(2px);
    animation: scroll-slow 30s linear infinite;
    opacity: 0.8;
}

.forest {
    position: absolute;
    bottom: 40%;
    width: 200%; height: 100px;
    background: 
        conic-gradient(from 160deg at 50% 0, transparent 0deg, #050508 0deg, #050508 40deg, transparent 40deg);
    background-size: 50px 100px;
    filter: blur(1px);
    animation: scroll-med 8s linear infinite;
    z-index: 2;
}

.fog-layer {
    position: absolute;
    bottom: 30%;
    width: 200%; height: 150px;
    background: linear-gradient(to top, rgba(255,255,255,0.05), transparent);
    filter: blur(20px);
    animation: scroll-fast 4s linear infinite;
    z-index: 3;
}

/* --- THE TRAIN ENGINE --- */
.train-container {
    position: relative;
    z-index: 10;
    width: 240px; height: 120px;
    transform: scale(1.2); /* Adjust size */
    margin-bottom: -15px; /* Sit tight on track */
}

.engine-body {
    position: relative;
    width: 100%; height: 100%;
    background: linear-gradient(180deg, #222, #000);
    border-radius: 5px 20px 5px 5px;
    /* Detailed silhouette using clip-path */
    clip-path: polygon(
        20% 0%, 55% 0%, 55% 20%, 65% 20%, 65% 0%, 90% 0%, 100% 30%, /* Cabin top */
        100% 100%, 0% 100%, 0% 60%, 10% 40%, 20% 40% /* Front nose */
    );
    box-shadow: inset 10px 0 20px rgba(0,0,0,0.8);
    animation: rumble 0.1s infinite alternate;
}

/* Details overlaid on clip-path shape */
.chimney {
    position: absolute;
    top: 0; left: 35px;
    width: 25px; height: 40px;
    background: #111;
    z-index: 11;
}

.smoke-emitter {
    position: absolute;
    top: -10px; left: 50%;
}

.puff {
    position: absolute;
    background: rgba(200,200,200,0.1);
    border-radius: 50%;
    filter: blur(8px);
}
.p1 { width: 30px; height: 30px; animation: smoke-trail 2s linear infinite; }
.p2 { width: 40px; height: 40px; animation: smoke-trail 2s linear infinite 0.6s; }
.p3 { width: 25px; height: 25px; animation: smoke-trail 2s linear infinite 1.2s; }

.cabin-window {
    position: absolute;
    top: 40px; right: 20px;
    width: 30px; height: 25px;
    background: #ffaa00;
    box-shadow: 0 0 20px rgba(255, 170, 0, 0.4);
    opacity: 0.8;
}

/* Headlight */
.headlight {
    position: absolute;
    top: 65px; left: -5px;
    width: 10px; height: 15px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 10px #fff;
    z-index: 12;
}

.beam-cone {
    position: absolute;
    top: -30px; right: 10px; /* Shoot left */
    width: 300px; height: 80px;
    background: linear-gradient(to left, rgba(255,255,200,0.4), transparent);
    clip-path: polygon(100% 45%, 0% 0%, 0% 100%, 100% 55%);
    filter: blur(5px);
    mix-blend-mode: screen;
}

/* Wheels */
.wheels-assembly {
    position: absolute;
    bottom: -15px; left: 10px;
    width: 100%;
    display: flex;
    align-items: flex-end;
}

.big-wheel {
    width: 45px; height: 45px;
    border-radius: 50%;
    border: 3px solid #555;
    background: #111;
    margin-right: 5px;
    position: relative;
    overflow: hidden;
    animation: spin-wheel 0.5s linear infinite;
}

.spoke {
    position: absolute;
    top: 50%; left: 0;
    width: 100%; height: 2px;
    background: #333;
}
.spoke:nth-child(2) { transform: rotate(90deg); }

.small-wheel {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 3px solid #555;
    background: #111;
    margin-left: 10px;
    animation: spin-wheel 0.3s linear infinite;
}

.piston-rod {
    position: absolute;
    bottom: 25px; left: 25px;
    width: 90px; height: 6px;
    background: #888;
    transform-origin: right;
    animation: piston-move 0.5s linear infinite;
    z-index: 13;
}

/* Sparks */
.sparks-emitter {
    position: absolute;
    bottom: 0; left: 20px;
    width: 100px; height: 5px;
    background-image: radial-gradient(circle, #ffaa00 1px, transparent 1px);
    background-size: 10px 5px;
    opacity: 0;
    animation: sparks-fly 0.5s linear infinite;
}

/* --- FOREGROUND --- */
.track-bed {
    position: relative;
    width: 100%; height: 40px;
    background: #050505;
    z-index: 9;
    margin-top: -10px;
}
.rail {
    position: absolute;
    top: 0; width: 100%; height: 4px;
    background: #333;
    box-shadow: 0 0 5px #000;
}

.foreground-blur {
    position: absolute;
    bottom: 0;
    width: 100%; height: 100px;
    background: linear-gradient(to bottom, transparent, #000);
    z-index: 20;
    backdrop-filter: blur(2px);
}

.cinematic-text {
    position: absolute;
    bottom: 40px;
    font-family: 'Courier New', monospace;
    letter-spacing: 6px;
    color: #888;
    font-size: 12px;
    z-index: 30;
    text-shadow: 0 2px 4px #000;
}

/* --- ANIMATIONS --- */
@keyframes scroll-slow { from { background-position: 0 0; } to { background-position: -300px 0; } }
@keyframes scroll-med { from { background-position: 0 0; } to { background-position: -600px 0; } }
@keyframes scroll-fast { from { background-position: 0 0; } to { background-position: -1200px 0; } }

@keyframes spin-wheel { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

@keyframes rumble {
    from { transform: translateY(0); }
    to { transform: translateY(1px); }
}

@keyframes smoke-trail {
    0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    100% { transform: translate(-150px, -20px) scale(3); opacity: 0; }
}

@keyframes piston-move {
    0% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-10px) rotate(5deg); }
    50% { transform: translateX(0) rotate(0deg); }
    75% { transform: translateX(10px) rotate(-5deg); }
    100% { transform: translateX(0) rotate(0deg); }
}

@keyframes sparks-fly {
    0% { opacity: 0.8; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(-50px); }
}
`,
        js: `// Full Steam Ahead`
    }
},
{
    id: "brute-force-loader",
    title: "System Decryption Loading Animation",
    description: "A cyberpunk text-decoding loader. Random characters cycle rapidly before locking into the final 'SUCCESS' message, simulating a brute-force password crack.",
    tags: ["Cyberpunk", "Hacker", "Text", "Glitch", "Matrix", "Tech", "Security"],
    keywords: ["text scrambling animation", "hacker loader css", "brute force animation", "matrix text effect"],
    code: {
        html: `
<div class="hack-scene">
    <div class="terminal-window">
        <div class="header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
        </div>
        <div class="screen">
            <div class="code-line">> INITIALIZING DAEMON...</div>
            <div class="code-line">> TARGET: MAINFRAME</div>
            <div class="code-line">> DECRYPTING KEY:</div>
            
            <div class="decrypt-box">
                <span class="char c1">A</span>
                <span class="char c2">C</span>
                <span class="char c3">C</span>
                <span class="char c4">E</span>
                <span class="char c5">S</span>
                <span class="char c6">S</span>
            </div>
            
            <div class="progress-bar">
                <div class="fill"></div>
            </div>
        </div>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.hack-scene {
    width: 100%;
    height: 100vh;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'VT323', monospace;
}

.terminal-window {
    width: 300px;
    height: 200px;
    background: #0c0c0c;
    border: 1px solid #333;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
    overflow: hidden;
}

.header {
    height: 25px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    padding-left: 10px;
    gap: 5px;
}

.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.screen {
    padding: 20px;
    color: #00ff00;
}

.code-line {
    font-size: 14px;
    opacity: 0;
    animation: type-line 0.5s forwards;
}
.code-line:nth-child(1) { animation-delay: 0s; }
.code-line:nth-child(2) { animation-delay: 0.8s; }
.code-line:nth-child(3) { animation-delay: 1.6s; margin-bottom: 15px; }

.decrypt-box {
    font-size: 32px;
    letter-spacing: 5px;
    margin-bottom: 20px;
    display: flex;
}

.char {
    display: inline-block;
    width: 20px;
    position: relative;
    overflow: hidden;
    color: #00ff00;
    animation: flicker-char 0.1s infinite;
}

/* "Locking" the characters one by one */
.c1 { animation: lock-char 0s forwards 2.5s; }
.c2 { animation: lock-char 0s forwards 2.7s; }
.c3 { animation: lock-char 0s forwards 2.9s; }
.c4 { animation: lock-char 0s forwards 3.1s; }
.c5 { animation: lock-char 0s forwards 3.3s; }
.c6 { animation: lock-char 0s forwards 3.5s; }

.progress-bar {
    width: 100%;
    height: 10px;
    background: #111;
    border: 1px solid #00ff00;
}

.fill {
    height: 100%;
    background: #00ff00;
    width: 0%;
    animation: fill-bar 4s steps(20) infinite;
}

/* ANIMATIONS */
@keyframes type-line {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes flicker-char {
    0% { opacity: 0.5; transform: scaleY(1.1); text-shadow: 0 0 5px #00ff00; }
    50% { opacity: 1; transform: scaleY(1); }
    100% { opacity: 0.5; transform: scaleY(1.1); }
}

/* This is a visual trick. In CSS we can't randomly generate letters easily. 
   So we flicker the opacity and blur to make it LOOK like it's changing, 
   then 'snap' to the clear letter. */
@keyframes lock-char {
    to { 
        animation: none; 
        opacity: 1; 
        color: #fff; /* White means locked */
        background: #008800;
        text-shadow: none;
    }
}

@keyframes fill-bar {
    0% { width: 0%; }
    100% { width: 100%; }
}
`,
        js: `// Access Granted`
    }
},
{
    id: "newtons-galaxy-loader",
    title: "Kinetic Energy Transfer - Loading Animation",
    description: "A physics-based abstract loader. Orbital particles swing inward to strike a central core, triggering expanding shockwaves. Mesmerizing rhythmic motion.",
    tags: ["Physics", "Space", "Abstract", "Science", "Impact", "Energy", "Modern"],
    keywords: ["newtons cradle animation", "impact ripple css", "physics loader", "kinetic energy spinner"],
    code: {
        html: `
<div class="kinetic-scene">
    <div class="system">
        <div class="core-star"></div>
        
        <div class="shockwave s1"></div>
        <div class="shockwave s2"></div>
        
        <div class="swing-arm left">
            <div class="orb"></div>
        </div>
        <div class="swing-arm right">
            <div class="orb"></div>
        </div>
    </div>
    <div class="kinetic-text">CALCULATING PHYSICS...</div>
</div>`,
        css: `
.kinetic-scene {
    width: 100%;
    height: 100vh;
    background: #121212;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 60px;
}

.system {
    position: relative;
    width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.core-star {
    width: 30px; height: 30px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 20px #fff;
    z-index: 10;
    /* Flash when hit */
    animation: core-flash 2s ease-in-out infinite;
}

/* The Swing Arms */
.swing-arm {
    position: absolute;
    top: -50px;
    width: 20px; height: 100px;
    transform-origin: top center;
}

.orb {
    position: absolute;
    bottom: 0; left: 0;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #00aaff;
    box-shadow: 0 0 15px #00aaff;
}

.left {
    left: 40px;
    animation: swing-left 2s ease-in-out infinite;
}

.right {
    right: 40px;
    animation: swing-right 2s ease-in-out infinite;
}

.right .orb { background: #ff0055; box-shadow: 0 0 15px #ff0055; }

/* Shockwaves */
.shockwave {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 50%;
    opacity: 0;
}

.s1 { animation: ripple 2s ease-out infinite 0s; } /* Trigger on Left Hit (0s) */
.s2 { animation: ripple 2s ease-out infinite 1s; } /* Trigger on Right Hit (1s) */

/* ANIMATIONS */

/* Cycle: 2s
   0.0s: Left hits Center
   1.0s: Right hits Center
*/

@keyframes swing-left {
    0% { transform: rotate(0deg); } /* Hit */
    25% { transform: rotate(45deg); } /* Swing Out */
    50% { transform: rotate(0deg); } /* Return to center (rest) */
    100% { transform: rotate(0deg); }
}

@keyframes swing-right {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(0deg); } /* Wait for left */
    75% { transform: rotate(-45deg); } /* Swing Out */
    100% { transform: rotate(0deg); } /* Hit */
}

@keyframes core-flash {
    0% { transform: scale(1.2); background: #ccffff; } /* Impact Left */
    10% { transform: scale(1); background: #fff; }
    50% { transform: scale(1.2); background: #ffccff; } /* Impact Right */
    60% { transform: scale(1); background: #fff; }
    100% { transform: scale(1.2); background: #ccffff; }
}

@keyframes ripple {
    0% { width: 30px; height: 30px; opacity: 1; border-width: 4px; }
    100% { width: 150px; height: 150px; opacity: 0; border-width: 0px; }
}

.kinetic-text {
    font-family: 'Helvetica', sans-serif;
    font-weight: 300;
    letter-spacing: 2px;
    color: #888;
    font-size: 10px;
    text-transform: uppercase;
}
`,
        js: `// Action & Reaction`
    }
},
{
    id: "neural-loom-pro",
    title: "The Neural Loom - Loading Spinner",
    description: "An ultra-modern generative loader. Two invisible points weave a complex 3D neural mesh in real-time, featuring rhythmic light impulses and high-performance Canvas rendering.",
    tags: ["Tech", "Ultra-Modern", "Generative", "Canvas", "Data", "3D"],
    keywords: ["neural network animation", "canvas loading spinner", "generative mesh css", "cyberpunk loader"],
    code: {
        html: `
<div class="loom-scene">
    <canvas id="loomCanvas"></canvas>
    
    <div class="interface-overlay">
        <div class="scanner-line"></div>
        <div class="data-readout">
            <span class="label">NEURAL MESH:</span>
            <span class="value" id="meshPercent">0%</span>
        </div>
    </div>
    
    <div class="loom-status">WEAVING SYNAPSES...</div>
</div>`,
        css: `
.loom-scene {
    width: 100%;
    height: 100vh;
    background: #020205; /* Deep Void Blue */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
}

canvas {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 10px rgba(0, 242, 255, 0.3));
}

/* --- HUD OVERLAY --- */
.interface-overlay {
    position: absolute;
    width: 280px;
    height: 280px;
    border: 1px solid rgba(0, 242, 255, 0.1);
    border-radius: 50%;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scanner-line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00f2ff, transparent);
    top: 50%;
    animation: scanner-sweep 4s ease-in-out infinite;
    opacity: 0.3;
}

.data-readout {
    position: absolute;
    bottom: -40px;
    font-family: 'Courier New', monospace;
    font-size: 10px;
    color: #00f2ff;
    letter-spacing: 2px;
    display: flex;
    gap: 10px;
}

.loom-status {
    position: absolute;
    bottom: 40px;
    font-family: 'Helvetica', sans-serif;
    font-weight: 100;
    color: #fff;
    letter-spacing: 8px;
    font-size: 11px;
    text-transform: uppercase;
    animation: text-pulse 2s infinite alternate;
}

/* --- ANIMATIONS --- */
@keyframes scanner-sweep {
    0%, 100% { transform: translateY(-140px); opacity: 0; }
    50% { transform: translateY(140px); opacity: 0.5; }
}

@keyframes text-pulse {
    from { opacity: 0.3; filter: blur(1px); }
    to { opacity: 0.8; filter: blur(0); }
}
`,
        js: `
const canvas = document.getElementById('loomCanvas');
const ctx = canvas.getContext('2d');
const meshText = document.getElementById('meshPercent');

let width, height, particles = [];
const particleCount = 60;
const connectionDist = 120;
let impulseActive = false;
let impulseProgress = 0;

function init() {
    resize();
    for(let i=0; i<particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            history: []
        });
    }
    animate();
    setInterval(triggerImpulse, 4000);
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function triggerImpulse() {
    impulseActive = true;
    impulseProgress = 0;
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections (The Weave)
    for(let i=0; i<particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        // Bounce logic
        if(p1.x < 0 || p1.x > width) p1.vx *= -1;
        if(p1.y < 0 || p1.y > height) p1.vy *= -1;

        for(let j=i+1; j<particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < connectionDist) {
                ctx.beginPath();
                // If impulse is active, highlight lines
                let opacity = 1 - (dist/connectionDist);
                let color = impulseActive ? \`rgba(255, 255, 255, \${opacity})\` : \`rgba(0, 242, 255, \${opacity * 0.4})\`;
                
                ctx.strokeStyle = color;
                ctx.lineWidth = impulseActive ? 2 : 0.5;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    if(impulseActive) {
        impulseProgress += 0.05;
        if(impulseProgress > 1) impulseActive = false;
        meshText.innerText = Math.floor(Math.random() * 100) + "%";
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();`
    }
},
{
    id: "pixel-glitch-quest-pro",
    title: "The 8-Bit Glitch Quest - Loading Animation",
    description: "A nostalgic retro-gaming loader. A pixel character navigates a scrolling 8-bit world that occasionally suffers from digital glitching, culminating in a satisfying 'Level Up' particle burst.",
    tags: ["Retro", "Gaming", "Pixel Art", "Glitch", "Vintage", "Action"],
    keywords: ["pixel art animation css", "retro game loader", "8-bit glitch effect", "sprite jump animation"],
    code: {
        html: `
<div class="quest-scene">
    <svg style="width: 0; height: 0; position: absolute;">
        <defs>
            <filter id="retro-glitch">
                <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            </filter>
        </defs>
    </svg>

    <div class="world-viewport">
        <div class="bg-mountains"></div>
        
        <div class="scrolling-ground"></div>

        <div class="block">?</div>

        <div class="hero-container">
            <div class="hero-sprite">
                <div class="hero-head"></div>
                <div class="hero-body"></div>
                <div class="hero-feet"></div>
            </div>
        </div>

        <div class="level-up-particles">
            <span></span><span></span><span></span><span></span><span></span>
        </div>
    </div>

    <div class="hud-text">LEVEL 1-1: LOADING...</div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.quest-scene {
    width: 100%;
    height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    image-rendering: pixelated; /* Essential for 8-bit crispness */
}

.world-viewport {
    position: relative;
    width: 320px;
    height: 180px;
    background: #5c94fc; /* Classic Mario Blue */
    border: 4px solid #fff;
    overflow: hidden;
    animation: glitch-flash 5s infinite;
}

/* --- SCENERY --- */
.bg-mountains {
    position: absolute;
    bottom: 40px;
    width: 200%;
    height: 60px;
    background: linear-gradient(transparent 70%, #00a000 70%);
    background-image: repeating-linear-gradient(135deg, #007000 0, #007000 20px, transparent 20px, transparent 40px);
    opacity: 0.5;
    animation: scroll 10s linear infinite;
}

.scrolling-ground {
    position: absolute;
    bottom: 0;
    width: 200%;
    height: 40px;
    background: #885010;
    border-top: 4px solid #00a000;
    background-image: radial-gradient(#000 2px, transparent 2px);
    background-size: 20px 20px;
    animation: scroll 2s linear infinite;
}

/* --- THE HERO --- */
.hero-container {
    position: absolute;
    bottom: 40px;
    left: 40px;
    width: 32px;
    height: 40px;
    z-index: 10;
    animation: hero-physics 2.5s infinite ease-in-out;
}

.hero-sprite {
    width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center;
}

.hero-head { width: 16px; height: 16px; background: #ffcca5; box-shadow: 4px 4px 0 #000; }
.hero-body { width: 20px; height: 16px; background: #ff0000; margin-top: 2px; }
.hero-feet { width: 24px; height: 6px; background: #885010; margin-top: 2px; animation: run-step 0.2s steps(2) infinite; }

/* --- OBSTACLE --- */
.block {
    position: absolute;
    bottom: 40px;
    right: -40px;
    width: 32px;
    height: 32px;
    background: #f83800;
    border: 4px solid #000;
    color: #fff;
    font-family: 'Press Start 2P', cursive;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    animation: block-move 2.5s infinite linear;
}

/* --- PAYOFF FX --- */
.level-up-particles span {
    position: absolute;
    width: 8px; height: 8px;
    background: #ffff00;
    bottom: 60px; left: 60px;
    opacity: 0;
    animation: particle-burst 2.5s infinite;
}

.level-up-particles span:nth-child(2) { animation-delay: 0.1s; background: #00ff00; }
.level-up-particles span:nth-child(3) { animation-delay: 0.2s; background: #ff00ff; }

.hud-text {
    margin-top: 30px;
    font-family: 'Press Start 2P', cursive;
    color: #fff;
    font-size: 12px;
    letter-spacing: 2px;
}

/* --- ANIMATIONS --- */
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@keyframes block-move { 
    0% { transform: translateX(0); }
    100% { transform: translateX(-400px); }
}

@keyframes hero-physics {
    0%, 50%, 90%, 100% { transform: translateY(0); }
    65% { transform: translateY(-70px) rotate(10deg); } /* The Jump */
    80% { transform: translateY(0) scaleY(0.8); } /* The Landing Squash */
}

@keyframes run-step {
    from { transform: translateX(-2px); }
    to { transform: translateX(2px); }
}

@keyframes particle-burst {
    0%, 75% { transform: scale(0); opacity: 0; }
    80% { opacity: 1; transform: scale(1) translateY(0); }
    100% { transform: scale(0) translateY(-60px); opacity: 0; }
}

@keyframes glitch-flash {
    0%, 40%, 45%, 90%, 100% { filter: none; }
    42% { filter: url('#retro-glitch') invert(1); }
    95% { filter: url('#retro-glitch') hue-rotate(90deg); }
}
`,
        js: `// High-Score Syncing...`
    }
},
{
    id: "kinetic-magnet-pro",
    title: "Kinetic Magnet — Button",
    description: "A high-fidelity interactive button using spring physics. The button base gravitates toward the cursor while the internal label floats on a secondary parallax plane, creating a tangible sense of mass and magnetism.",
    tags: ["Magnetic", "Physics", "Minimal", "Interactive", "Premium"],
    keywords: ["magnetic button css", "spring physics ui", "parallax button hover", "kinetic interaction"],
    code: {
        html: `
    <div class="magnetic-item" id="magnetWrap">
        <button class="kinetic-btn" id="magnetBtn">
            <span class="btn-label" id="magnetText">INITIALIZE CORE</span>
            
            <div class="btn-glint" id="magnetGlint"></div>
            
            <div class="btn-grain"></div>
        </button>
    </div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');


.magnetic-item {
    position: relative;
    will-change: transform;
    /* Spring transition for smooth snapping back */
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.kinetic-btn {
    position: relative;
    padding: 28px 70px;
    background: #111;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    letter-spacing: 5px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.btn-label {
    position: relative;
    z-index: 10;
    display: block;
    will-change: transform;
    transition: transform 0.2s ease-out;
}

/* --- DYNAMIC LIGHT GLINT --- */
.btn-glint {
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    top: 0; left: 0;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 5;
    mix-blend-mode: overlay;
}

/* --- MATERIAL TEXTURE --- */
.btn-grain {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    pointer-events: none;
}

.kinetic-btn:hover {
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
}

.kinetic-btn:active {
    transform: scale(0.97);
}
`,
        js: `
const wrap = document.getElementById('magnetWrap');
const btn = document.getElementById('magnetBtn');
const text = document.getElementById('magnetText');
const glint = document.getElementById('magnetGlint');

document.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    
    // Calculate center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance between mouse and button center
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    
    // Interaction Radius (how far out it starts pulling)
    const radius = 250;

    if (distance < radius) {
        // Power curve: gets stronger as you get closer
        const power = (radius - distance) / radius;
        
        // Displacement factors
        const xMove = dx * power * 0.4;
        const yMove = dy * power * 0.4;
        
        // Apply Magnetism to the Wrap
        wrap.style.transform = \`translate(\${xMove}px, \${yMove}px)\`;
        
        // Apply Parallax to the Text (Inner float)
        text.style.transform = \`translate(\${xMove * 0.3}px, \${yMove * 0.3}px)\`;
        
        // Position the Glint (The interactive highlight)
        const glintX = e.clientX - rect.left;
        const glintY = e.clientY - rect.top;
        glint.style.left = \`\${glintX}px\`;
        glint.style.top = \`\${glintY}px\`;
        glint.style.opacity = power;
    } else {
        // Reset position when mouse is outside radius
        wrap.style.transform = 'translate(0px, 0px)';
        text.style.transform = 'translate(0px, 0px)';
        glint.style.opacity = '0';
    }
});`
    }
},
{
    id: "retro-neon-tube-pro",
    title: "Retro Neon Tube — Button",
    description: "A cinematic neon sign button featuring realistic gas-tube ignition flicker, layered volumetric glow, chromatic bleed, and glass reflection detailing.",
    tags: ["Neon", "Retro", "Arcade", "Cyberpunk", "Vintage", "Glow"],
    code: {
        html: `
    <button class="neon-btn">
        <span class="neon-core">OPEN SHOP</span>
        <span class="neon-glow"></span>
        <span class="glass-sheen"></span>
    </button>
`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');


/* BUTTON BASE */
.neon-btn{
    position:relative;
    padding:22px 60px;
    background:transparent;
    border:2px solid #1a1a1f;
    border-radius:8px;
    cursor:pointer;
    overflow:hidden;
    transition:.3s ease;
    backdrop-filter:blur(2px);
}

/* TEXT CORE (HOT CENTER OF TUBE) */
.neon-core{
    position:relative;
    z-index:3;
    font-family:'Orbitron',monospace;
    font-size:1.3rem;
    letter-spacing:4px;
    color:#2a2a2a;
    transition:.3s ease;
}

/* OUTER GLOW LAYER */
.neon-glow{
    position:absolute;
    inset:0;
    border-radius:8px;
    pointer-events:none;
    z-index:1;
    opacity:0;
    transition:.3s ease;
}

/* GLASS REFLECTION */
.glass-sheen{
    position:absolute;
    inset:0;
    border-radius:8px;
    background:linear-gradient(
        120deg,
        rgba(255,255,255,0.15) 0%,
        transparent 40%
    );
    mix-blend-mode:overlay;
    opacity:.4;
    pointer-events:none;
    z-index:4;
}

/* HOVER = IGNITION */
.neon-btn:hover{
    border-color:#ff00cc;
}

/* Gas ignition flicker */
.neon-btn:hover .neon-core{
    color:#ff4dff;
    text-shadow:
        0 0 3px #ff4dff,
        0 0 8px #ff00ff,
        0 0 18px #ff00ff,
        0 0 40px #ff00ff;
    animation:ignite 1.4s infinite;
}

.neon-btn:hover .neon-glow{
    opacity:1;
    background:
        radial-gradient(circle at center,
            rgba(255,0,255,0.35),
            transparent 70%);
    box-shadow:
        0 0 40px rgba(255,0,255,0.6),
        0 0 80px rgba(255,0,255,0.4),
        0 0 140px rgba(255,0,255,0.2);
    animation:outer-flicker 1.4s infinite;
}

/* IGNITION FLICKER TIMING (Irregular) */
@keyframes ignite{
    0%, 12%, 18%, 22%, 100% { opacity:1; }
    14%, 20% { opacity:.4; }
    16% { opacity:.8; }
}

@keyframes outer-flicker{
    0%, 15%, 21%, 23%, 100%{
        box-shadow:
            0 0 40px rgba(255,0,255,0.6),
            0 0 80px rgba(255,0,255,0.4),
            0 0 140px rgba(255,0,255,0.2);
    }
    17%, 19%{
        box-shadow:
            0 0 10px rgba(255,0,255,0.2);
    }
}

/* ACTIVE CLICK */
.neon-btn:active{
    transform:scale(.96);
    filter:hue-rotate(30deg);
}
`
    }
},
{
    id: "quantum-tunnel",
    title: "Quantum Tunnel — High-Contrast Scan Button",
    description: "An optimized version of the scan-line button. Uses text-inversion and a controlled glow-bleed to ensure 100% legibility during high-intensity state changes.",
    tags: ["Cyber", "Legibility", "Animation", "Tech"],
    code: {
        html: `
    <button class="tunnel-btn">
        <span class="btn-label">AUTH_ACCESS</span>
        <div class="scan-overlay"></div>
        <div class="glow-edge"></div>
    </button>`,
        css: `

.tunnel-btn {
    position: relative;
    padding: 20px 50px;
    background: transparent;
    border: 1px solid rgba(0, 242, 255, 0.4);
    color: #00f2ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 4px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.btn-label {
    position: relative;
    z-index: 10;
    /* Ensuring text stays sharp regardless of background */
    mix-blend-mode: exclusion; 
    transition: letter-spacing 0.4s;
}

.scan-overlay {
    position: absolute;
    inset: 0;
    /* Horizontal scan-lines */
    background: repeating-linear-gradient(
        transparent 0px,
        transparent 2px,
        rgba(0, 242, 255, 0.2) 2px,
        rgba(0, 242, 255, 0.2) 4px
    );
    background-size: 100% 4px;
    opacity: 0.5;
    z-index: 1;
    pointer-events: none;
    transition: all 0.3s;
}

/* --- THE HOVER REFINEMENT --- */
.tunnel-btn:hover {
    color: #fff; /* Switch to white for maximum punch */
    border-color: #00f2ff;
    box-shadow: 
        0 0 20px rgba(0, 242, 255, 0.4),
        inset 0 0 15px rgba(0, 242, 255, 0.2);
}

.tunnel-btn:hover .scan-overlay {
    background: #00f2ff;
    opacity: 1;
    /* Move lines horizontally while solidifying */
    animation: scan-pulse 0.2s steps(2) infinite;
}

.tunnel-btn:hover .btn-label {
    letter-spacing: 6px; /* Expanding effect adds 'digital' weight */
}

@keyframes scan-pulse {
    0% { transform: scaleY(1); opacity: 0.8; }
    100% { transform: scaleY(1.1); opacity: 1; }
}

.tunnel-btn:active {
    transform: scale(0.95);
    filter: hue-rotate(-20deg);
}
`,
        js: `// Refined CSS-only interaction`
    }
},
{
    id: "social-reveal-link",
    title: "The Social Reveal Link",
    description: "An upscaled version of the social handle link. Increased base diameter to 52px for better visibility and a wider expansion for comfortable legibility of longer handles.",
    tags: ["Social", "UI", "Link", "Compact", "Premium"],
    code: {
        html: `
<a href="#" class="social-pill-link x-brand">
    <div class="icon-circle">
        <span class="brand-icon">𝕏</span>
    </div>
    <div class="label-box">
        <span class="full-name">Aman</span>
        <span class="handle">@aman_dev</span>
    </div>
</a>`,
        css: `
.social-pill-link {
    display: inline-flex; 
    align-items: center; 
    padding: 6px;
    background: #1a1a1a; 
    border-radius: 100px;
    cursor: pointer;
    text-decoration: none;
    /* Increased base size */
    width: 52px; 
    height: 52px; 
    overflow: hidden;
    transition: width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
}

.social-pill-link:hover { 
    /* Increased expanded width */
    width: 240px; 
    background: #222; 
}

.icon-circle {
    position: relative; 
    /* Increased inner circle size */
    min-width: 52px; 
    height: 52px;
    background: #000; 
    border-radius: 50%;
    display: flex; 
    align-items: center; 
    justify-content: center;
    flex-shrink: 0;
}

.brand-icon { 
    color: #fff; 
    /* Increased icon size */
    font-size: 22px; 
    font-weight: bold; 
}

.label-box {
    margin-left: 18px; 
    display: flex; 
    flex-direction: column;
    opacity: 0; 
    transform: translateX(-20px);
    transition: opacity 0.3s ease, transform 0.4s ease;
    white-space: nowrap;
}

.social-pill-link:hover .label-box { 
    opacity: 1; 
    transform: translateX(0); 
}

.full-name { 
    color: #fff; 
    font-family: 'Inter', sans-serif; 
    font-weight: bold; 
    /* Increased font size */
    font-size: 16px; 
    line-height: 1.2;
}

.handle { 
    color: #888; 
    font-family: 'Inter', sans-serif; 
    /* Increased font size */
    font-size: 13px; 
}

.social-pill-link:active {
    transform: scale(0.96);
}`
    }
},
{
    id: "insta-premium-circle-expand",
    title: "Instagram social handle button",
    description: "The refined version of the social expand button. Corrects the aspect ratio to ensure the button is a geometrically perfect circle in its idle state before expanding into a pill shape.",
    tags: ["Social", "Premium", "Circle", "Animation", "Fixed"],
    code: {
        html: `
    <a href="#" class="insta-premium-btn">
        <div class="btn-glow"></div>
        <div class="btn-content">
            <div class="icon-wrapper">
                <div class="icon-ring"></div>
                <svg class="insta-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </div>
            <div class="text-content">
                <div class="name">Jessica Sanders</div>
                <div class="action">View Profile</div>
            </div>
        </div>
    </a>`,
        css: `
:root {
    --insta-grad: conic-gradient(#833ab4, #fd1d1d, #fcb045, #833ab4);
}

/* Main button container */
.insta-premium-btn {
    position: relative;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    border-radius: 60px;
    z-index: 1;
}

/* The soft, multi-color glow */
.btn-glow {
    position: absolute;
    inset: -4px;
    background: var(--insta-grad);
    border-radius: 60px;
    filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
    transition: opacity 0.3s ease;
}

/* Button content wrapper - The animating pill */
.btn-content {
    display: flex;
    align-items: center;
    padding: 12px;
    
    /* FIX: Set width to match icon-wrapper (52px) exactly. 
       52px content + 24px padding = 76px total width.
       Height is also 76px. Result: Perfect Circle. */
    width: 52px; 
    
    background: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 60px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    /* Animation props */
    overflow: hidden;
    transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

/* Icon Wrapper */
.icon-wrapper {
    position: relative;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #000;
    flex-shrink: 0; 
}

/* Gradient ring */
.icon-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 3px;
    background: var(--insta-grad);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
}

.insta-icon { color: #fff; z-index: 2; }

/* Text Styling - Hidden by default */
.text-content {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.3s ease, transform 0.4s ease;
    white-space: nowrap; 
}

.name {
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
}

.action {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-family: 'Inter', sans-serif;
}

/* --- HOVER STATES --- */

/* Expand width on hover */
.insta-premium-btn:hover .btn-content {
    width: 210px; /* Expanded width to fit text */
}

.insta-premium-btn:hover .text-content {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 0.1s;
}

.insta-premium-btn:hover .btn-glow {
    opacity: 0.8;
}

.insta-premium-btn:active {
    transform: scale(0.96);
}
`
    }
},
{
    id: "kinetic-auth-premium",
    title: "Kinetic Auth — Premium Glass",
    description: "A luxury-grade authentication component featuring high-fidelity glassmorphism, realistic metallic accents, and a frictionless 360° kinetic transition. Designed for high-end web applications.",
    tags: ["3D", "Premium", "Glassmorphism", "Auth", "Kinetic", "Production-Ready"],
    code: {
        html: `
<div class="premium-scene">
    <div class="mount-base"></div>
    
    <div class="suspension-bar">
        <div class="cap left"></div>
        <div class="cap right"></div>
    </div>
    
    <div class="kinetic-assembly" id="swingPlate">
        <div class="hinge-group">
            <div class="hinge left"></div>
            <div class="hinge right"></div>
        </div>

        <div class="glass-card" id="plateContent">
            <div class="state-container">
                <div class="top-accent"></div>
                <h2 class="card-heading">New here?</h2>
                <p class="card-sub">Choose your path to continue.</p>
                <div class="btn-group">
                    <button class="choice-btn yes" onclick="swingToState('signup')">Yes</button>
                    <button class="choice-btn no" onclick="swingToState('login')">No</button>
                </div>
            </div>
        </div>
        
        <div class="surface-glare"></div>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

.premium-scene {
    width: 100%; height: 550px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    perspective: 1600px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow: hidden;
}

/* --- HARDWARE --- */
.mount-base {
    width: 140px; height: 12px; background: #222;
    border-radius: 0 0 12px 12px; margin-bottom: -6px; z-index: 5;
    box-shadow: 0 5px 20px rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.05);
    border-top: none;
}

.suspension-bar {
    position: relative;
    width: 360px; height: 12px;
    background: linear-gradient(180deg, #999, #eee 40%, #777);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.9);
    z-index: 10;
}

.cap {
    position: absolute; top: -3px; width: 18px; height: 18px;
    background: radial-gradient(circle at 30% 30%, #fff, #888);
    border-radius: 50%;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.6);
}
.cap.left { left: -4px; }
.cap.right { right: -4px; }

/* --- KINETIC ASSEMBLY --- */
.kinetic-assembly {
    position: relative;
    transform-style: preserve-3d;
    transform-origin: top center;
    transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1); /* Elegant easing */
    top: -6px;
}

.hinge-group {
    display: flex; justify-content: space-between; width: 220px; margin: 0 auto;
}
.hinge {
    width: 14px; height: 28px;
    background: linear-gradient(90deg, #333, #aaa, #333);
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
    border-radius: 2px;
}

/* --- THE CARD --- */
.glass-card {
    position: relative;
    width: 340px; height: 220px;
    background: rgba(30, 30, 35, 0.85);
    border: 1px solid rgba(255,255,255,0.08);
    border-top: 3px solid #555; /* Hinge Weight */
    border-radius: 0 0 20px 20px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    box-shadow: 
        0 25px 60px rgba(0,0,0,0.7),
        inset 0 0 0 1px rgba(255,255,255,0.03);
    backdrop-filter: blur(24px);
    overflow: hidden;
}

/* --- CONTENT --- */
.state-container {
    width: 100%; display: flex; flex-direction: column; align-items: center;
    animation: fade-up 0.5s ease forwards;
}

.top-accent {
    width: 40px; height: 4px; border-radius: 10px;
    background: rgba(255,255,255,0.1); margin-bottom: 25px;
}

.card-heading {
    color: #fff; font-size: 26px; margin: 0 0 8px 0; font-weight: 800; letter-spacing: -0.5px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.card-sub {
    color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 30px 0; font-weight: 500;
}

.btn-group { display: flex; gap: 16px; }

.choice-btn {
    padding: 12px 36px; border-radius: 10px; border: none;
    font-weight: 700; font-size: 15px; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.yes { 
    background: linear-gradient(135deg, #fff, #e0e0e0); 
    color: #000; 
    box-shadow: 0 4px 15px rgba(255,255,255,0.15);
}
.yes:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,255,255,0.25); }

.no { 
    background: rgba(255,255,255,0.05); 
    border: 1px solid rgba(255,255,255,0.1); 
    color: rgba(255,255,255,0.8); 
}
.no:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.3); }

/* --- DYNAMIC STATES --- */
.glass-card.signup-mode {
    background: radial-gradient(circle at 50% 0%, rgba(255, 50, 100, 0.15), rgba(30, 30, 35, 0.95) 70%);
    border-color: rgba(255, 50, 100, 0.4);
    box-shadow: 0 30px 80px rgba(255, 0, 85, 0.15);
}
.glass-card.login-mode {
    background: radial-gradient(circle at 50% 0%, rgba(0, 200, 255, 0.15), rgba(30, 30, 35, 0.95) 70%);
    border-color: rgba(0, 200, 255, 0.4);
    box-shadow: 0 30px 80px rgba(0, 242, 255, 0.15);
}

.final-btn {
    width: 80%; padding: 16px 0; border: none; border-radius: 10px;
    font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;
    cursor: pointer; margin-top: 5px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transition: transform 0.2s;
}
.final-btn:hover { transform: translateY(-2px); }

.signup-btn { background: linear-gradient(135deg, #ff3366, #ff0044); color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.2); }
.login-btn { background: linear-gradient(135deg, #00eeff, #00bbff); color: #000; }

.back-link {
    margin-top: 25px; color: rgba(255,255,255,0.3); font-size: 12px; cursor: pointer; font-weight: 600;
    transition: color 0.2s;
}
.back-link:hover { color: #fff; }

.surface-glare {
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.0) 50%);
    z-index: 20;
}

@keyframes fade-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
`,
        js: `
const plate = document.getElementById('swingPlate');
const contentBox = document.getElementById('plateContent');
let currentRotation = 0; 
let isAnimating = false;

// Content Templates
const templates = {
    initial: \`
        <div class="state-container">
            <div class="top-accent"></div>
            <h2 class="card-heading">New here?</h2>
            <p class="card-sub">Choose your path to continue.</p>
            <div class="btn-group">
                <button class="choice-btn yes" onclick="swingToState('signup')">Yes</button>
                <button class="choice-btn no" onclick="swingToState('login')">No</button>
            </div>
        </div>\`,
    signup: \`
        <div class="state-container">
            <h2 class="card-heading">Create Account</h2>
            <p class="card-sub">Start your premium journey.</p>
            <button class="final-btn signup-btn">Sign Up Now</button>
            <div class="back-link" onclick="swingToState('initial')">Go back</div>
        </div>\`,
    login: \`
        <div class="state-container">
            <h2 class="card-heading">Welcome Back</h2>
            <p class="card-sub">Access your dashboard.</p>
            <button class="final-btn login-btn">Log In</button>
            <div class="back-link" onclick="swingToState('initial')">Go back</div>
        </div>\`
};

window.swingToState = function(targetState) {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Kinetic Spin
    currentRotation += 360;
    plate.style.transform = \`rotateX(\${currentRotation}deg)\`;

    // 2. Invisible Content Swap (at 250ms)
    setTimeout(() => {
        contentBox.className = 'glass-card'; // Reset
        
        if (targetState === 'signup') contentBox.classList.add('signup-mode');
        if (targetState === 'login') contentBox.classList.add('login-mode');
        
        contentBox.innerHTML = templates[targetState];
    }, 250);

    // 3. Reset Lock
    setTimeout(() => {
        isAnimating = false;
    }, 900);
}`
    }
},
{
    // please ignore title, descriptions and keywords for now , ill reWrite  all of these 
    // leave these on me.
    // to add option to provide the spritesheet as well for use to the user.
    // to see that this works without any issue in all devices , in all sizes.
    id: "rocket-launch-frame-skip",
    title: "Rocket Launch Get started button",
    description: "A refined version that skips the corrupted first frame. It sets the static state to Frame 2 and uses a negative animation delay to seamlessly start the sequence from the second frame, ending at Frame 66.",
    tags: ["Button", "Spritesheet", "Fixed", "Offset", "CSS"],
    code: {
        html: `
<div class="rocket-wrapper">
    <button class="rocket-btn" aria-label="Get Started"></button>
</div>
`,
        css: `
.rocket-wrapper {
    -webkit-font-smoothing: antialiased;
}

.rocket-btn {
    /* 1. DIMENSIONS */
    width: 200px;
    height: 167px;

    /* 2. SPRITESHEET */
    background-image: url('button_with_rocket.png');
    background-repeat: no-repeat;
    
    /* Pixel-perfect size for 5 cols x 14 rows */
    background-size: 1000px 2344px;

    /* FIX #1: Start at Frame 2 (-200px) instead of Frame 1 (0px) */
    background-position: -200px 0; 

    border: none;
    cursor: pointer;
    background-color: transparent;
    transition: transform 0.1s;
}

.rocket-btn:active {
    transform: scale(0.98);
}

/* 3. ANIMATION LOGIC */
.rocket-btn:hover {
    animation-name: sprite-x, sprite-y;
    animation-duration: 0.15s, 2.1s; 
    animation-timing-function: steps(5), steps(14);
    
    /* FIX #2: Negative delay fast-forwards animation by 1 frame (0.03s)
       This ensures smooth continuity from the static state (Frame 2) 
       without snapping back to Frame 1. 
    */
    animation-delay: -0.03s, -0.03s;

    /* Stop exactly at virtual Frame 66 */
    animation-iteration-count: 13.2, 0.9428; 
    
    animation-fill-mode: forwards;
}

/* 4. KEYFRAMES */
@keyframes sprite-x {
    from { background-position-x: 0px; }
    to { background-position-x: -1000px; }
}

@keyframes sprite-y {
    from { background-position-y: 0px; }
    to { background-position-y: -2344px; }
}
`
    }
}
];
