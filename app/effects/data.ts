export const effectsData = [
    {
        id: "neon-button",
        title: "Cyberpunk Neon Glow Button Effect",
        description: "Create a futuristic cyberpunk-style button with pulsating neon glow effects using pure CSS box-shadow and text-shadow. Perfect for gaming websites and modern dark-mode UIs. This effect utilizes CSS keyframes for smooth animation and hover states.",
        keywords: ["css neon button", "cyberpunk css", "glowing button", "css3 animation", "web design effects", "box-shadow glow"],
        code: {
            html: `<button class="neon-button">
    HOVER ME
</button>`,
            css: `/* Define the custom font family in your project if needed */
.neon-button {
    font-size: 1.5rem;
    padding: 1rem 3rem;
    color: #03e9f4;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    overflow: hidden;
    background: transparent;
    border: 2px solid #03e9f4;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    font-family: 'Consolas', sans-serif; /* Tech feel */
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4;
    text-shadow: 0 0 5px #03e9f4;
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
    min-height: 400px; /* Ensure enough space */
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, #ff00cc, #333399); 
    font-family: sans-serif;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* Safari support */
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.5); /* Highlight */
    border-left: 1px solid rgba(255, 255, 255, 0.5); /* Highlight */
    padding: 40px;
    border-radius: 15px;
    color: white;
    max-width: 350px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glass-card h2 {
    margin-top: 0;
    font-weight: 600;
}

.glass-card p {
    font-weight: 300;
    opacity: 0.8;
    line-height: 1.6;
}

.glass-btn {
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.1);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.glass-btn:hover {
    background: rgba(255,255,255,0.2);
}`,
            js: `// No JavaScript needed! pure CSS magic.`
        }
    },
    {
        id: "magnetic-button",
        title: "Magnetic Button Interaction",
        description: "A highly interactive button that magnetically attracts to the user's cursor movement. This advanced JavaScript effect calculates mouse position relative to the element to create a fluid, organic feel. Ideal for call-to-action buttons that demand attention.",
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
    height: 100vh;
}

.magnetic-btn {
    padding: 25px 50px;
    font-size: 18px;
    font-weight: bold;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.1s ease; /* Smooth reset, JS handles active move */
    position: relative;
    overflow: hidden;
    z-index: 1;
}

/* Optional: Ripple or hover effect */
.magnetic-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to right, #6366f1, #8b5cf6);
    z-index: -1;
    transition: opacity 0.3s;
    opacity: 0;
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
    }
];
