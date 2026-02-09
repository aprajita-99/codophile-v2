# Guide: Adding New Playground Items

## Overview
The playground is structured to support both CSS properties and Tailwind utilities. Each playground item follows a consistent pattern for SEO optimization.

## Directory Structure
```
app/playground/
├── data.ts                          # 📝 SEO metadata for all playground items
├── page.tsx                         # Main playground selector (server component)
├── client-page.tsx                  # Main playground selector (client component)
│
├── css/
│   ├── page.tsx                     # CSS index page (server component)
│   ├── ClientPage.tsx               # CSS index page (client component)
│   │
│   └── [property-name]/             # Individual CSS property
│       ├── page.tsx                 # Server component with SEO metadata
│       └── ClientPlayground.tsx     # Client component with interactive UI
│
└── tailwind/
    ├── page.tsx                     # Tailwind index page (server component)
    ├── ClientPage.tsx               # Tailwind index page (client component)
    │
    └── [utility-name]/              # Individual Tailwind utility
        ├── page.tsx                 # Server component with SEO metadata
        └── ClientPlayground.tsx     # Client component with interactive UI
```

---

## Step-by-Step: Adding a New CSS Property

### Example: Adding "Grid Layout" property

### Step 1: Add Metadata to `app/playground/data.ts`

Add the new property to the `css.properties` object:

```typescript
export const playgroundData = {
    css: {
        // ... existing metadata
        properties: {
            // ... existing properties
            
            "grid": {  // 👈 URL slug (lowercase, hyphenated)
                title: "CSS Grid Layout Playground - Visual Grid Editor",
                description: "Master CSS Grid with interactive controls for grid-template-columns, grid-template-rows, gap, and alignment. Build complex layouts visually.",
                keywords: ["css grid", "grid layout", "grid-template-columns", "css grid playground", "grid visual editor"]
            }
        }
    },
    // ...
};
```

**Key Points:**
- The key (`"grid"`) becomes the URL: `/playground/css/grid`
- Title should be descriptive and include "Playground" or "Generator"
- Description should be 150-160 characters, mention key properties
- Keywords should be an array of search terms (5-7 keywords)

---

### Step 2: Add Card to CSS Index Page

Edit `app/playground/css/ClientPage.tsx` and add your new item to the `categories` array:

```typescript
const categories = [
    // ... existing categories
    
    {
        title: "Grid Layout",                              // Display name
        description: "Build complex layouts with CSS Grid visual controls.",
        icon: "/icons/Grid-layout.png",                    // ⚠️ Create this icon!
        href: "/playground/css/grid",                      // Must match the slug from data.ts
        color: "from-green-500 to-emerald-500"            // Tailwind gradient
    }
];
```

**Icon Requirements:**
- Save icon to: `public/icons/Grid-layout.png`
- Recommended size: 128x128px or higher
- Format: PNG with transparency

---

### Step 3: Create the Property Directory

Create folder: `app/playground/css/grid/`

---

### Step 4: Create `ClientPlayground.tsx`

Create `app/playground/css/grid/ClientPlayground.tsx`:

```tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function GridClient() {
    // 1. State for all controls
    const [columns, setColumns] = useState("repeat(3, 1fr)");
    const [rows, setRows] = useState("auto");
    const [gap, setGap] = useState(16);
    const [copied, setCopied] = useState(false);

    // 2. Reset function
    const resetValues = () => {
        setColumns("repeat(3, 1fr)");
        setRows("auto");
        setGap(16);
    };

    // 3. Copy function
    const handleCopy = () => {
        const code = `.grid-container {
    display: grid;
    grid-template-columns: ${columns};
    grid-template-rows: ${rows};
    gap: ${gap}px;
}`;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">

                {/* Controls Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            Grid Layout
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Create powerful layouts with CSS Grid properties.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">
                        
                        <ControlGroup title="Grid Properties">
                            {/* Add your controls here */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Columns</label>
                                <input
                                    type="text"
                                    value={columns}
                                    onChange={(e) => setColumns(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50"
                                    placeholder="repeat(3, 1fr)"
                                />
                            </div>
                            
                            <SliderControl
                                label="Gap"
                                value={gap}
                                onChange={setGap}
                                min={0}
                                max={100}
                                unit="px"
                            />
                        </ControlGroup>

                    </div>

                    <button
                        onClick={resetValues}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>


                {/* Preview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] p-8">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* The Grid Container */}
                        <div
                            className="relative z-10 w-full max-w-2xl"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: columns,
                                gridTemplateRows: rows,
                                gap: `${gap}px`
                            }}
                        >
                            {/* Grid Items */}
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white/10 rounded-lg p-4 border border-white/20 flex items-center justify-center">
                                    <span className="text-white/50 font-mono text-sm">Item {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">CSS Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300">
                            <div className="text-purple-400">.grid-container <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <div><span className="text-cyan-400">display</span>: <span className="text-orange-300">grid</span>;</div>
                                <div><span className="text-cyan-400">grid-template-columns</span>: <span className="text-orange-300">{columns}</span>;</div>
                                <div><span className="text-cyan-400">gap</span>: <span className="text-orange-300">{gap}px</span>;</div>
                            </div>
                            <div className="text-white">{`}`}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

// Reusable Components
function ControlGroup({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SliderControl({ label, value, onChange, min, max, step = 1, unit = "" }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-cyan-400">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>
    );
}
```

---

### Step 5: Create `page.tsx` (Server Component)

Create `app/playground/css/grid/page.tsx`:

```tsx
import { Metadata } from "next";
import { playgroundData } from "../../data";
import GridClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties["grid"];  // 👈 Must match slug from data.ts
    
    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: {
            title: meta.title,
            description: meta.description,
            type: 'article',
            siteName: 'Codophile',
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
        }
    };
}

export default function GridPage() {
    return <GridClient />;
}
```

---

## Step-by-Step: Adding a New Tailwind Utility

The process is identical, but the files are in the `tailwind/` directory instead:

1. **Add metadata** to `app/playground/data.ts` under `tailwind.properties`
2. **Add card** to `app/playground/tailwind/ClientPage.tsx`
3. **Create directory**: `app/playground/tailwind/[utility-name]/`
4. **Create** `ClientPlayground.tsx` with Tailwind-specific controls
5. **Create** `page.tsx` referencing `playgroundData.tailwind.properties["utility-name"]`

---

## Quick Reference Checklist

When adding a new playground item:

- [ ] Add metadata to `app/playground/data.ts`
- [ ] Add card to index page (`css/ClientPage.tsx` or `tailwind/ClientPage.tsx`)
- [ ] Create icon in `public/icons/[name].png`
- [ ] Create directory `app/playground/[css|tailwind]/[slug]/`
- [ ] Create `ClientPlayground.tsx` with interactive UI
- [ ] Create `page.tsx` with SEO metadata generation
- [ ] Test the page locally
- [ ] Verify SEO tags in browser DevTools (view page source)

---

## Common Patterns

### Control Types

**Slider:**
```tsx
<SliderControl
    label="Size"
    value={size}
    onChange={setSize}
    min={0}
    max={100}
    unit="px"
/>
```

**Dropdown:**
```tsx
<div className="space-y-1.5">
    <label className="text-xs text-gray-300">Style</label>
    <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
    >
        <option value="solid">Solid</option>
        <option value="dashed">Dashed</option>
    </select>
</div>
```

**Color Picker:**
```tsx
<div className="space-y-1.5">
    <div className="flex items-center justify-between">
        <label className="text-xs text-gray-300">Color</label>
        <span className="text-xs font-mono text-cyan-400">{color}</span>
    </div>
    <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
    />
</div>
```

**Text Input:**
```tsx
<div className="space-y-1.5">
    <label className="text-xs text-gray-300">Value</label>
    <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50"
        placeholder="Enter value..."
    />
</div>
```

---

## SEO Best Practices

### Title Format
- **CSS**: `"CSS [Property Name] [Playground|Generator] - [Key Feature]"`
- **Tailwind**: `"Tailwind [Utility Category] [Playground|Utilities] - [Key Feature]"`

### Description Guidelines
- 150-160 characters
- Start with action verb (Master, Experiment, Create, Generate)
- Mention 2-3 key properties/features
- Include use case or benefit
- End with "real-time", "visually", or similar engagement word

### Keywords Strategy
- 5-7 keywords per property
- Include the main CSS property name
- Include common search variations
- Add "playground", "generator", "visual editor" variants
- Include specific sub-properties when relevant

---

## Need Help?

If you run into issues:
1. Check existing property pages for reference patterns
2. Verify file paths match exactly
3. Ensure the slug in `data.ts` matches the folder name and href
4. Check browser console for errors
5. Restart the dev server after adding new pages

Happy coding! 🚀
