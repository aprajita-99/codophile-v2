"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, Code, Layers, RefreshCw, Terminal, XCircle, Trash2, Maximize2, Minimize2, Download, Layout, Columns, Square, X, GripVertical } from "lucide-react";
import Link from "next/link";
import { effectsData } from "../data";
import Editor from "@monaco-editor/react";

export default function ClientEditor() {
    const params = useParams();
    const router = useRouter();
    const effectId = params.id as string;

    const effect = effectsData.find(e => e.id === effectId);

    // Editor State
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [jsCode, setJsCode] = useState("");
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

    // Layout State
    const [layout, setLayout] = useState<'split' | 'preview' | 'editor'>('split');
    const [splitPosition, setSplitPosition] = useState(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Console State
    const [logs, setLogs] = useState<{ type: 'log' | 'error' | 'warn'; message: string }[]>([]);
    const [showConsole, setShowConsole] = useState(false);

    // Use srcDoc for rendering
    const [srcDoc, setSrcDoc] = useState("");

    // Initialize state
    useEffect(() => {
        if (effect) {
            setHtmlCode(effect.code.html);
            setCssCode(effect.code.css);
            setJsCode(effect.code.js);
        }
    }, [effect]);

    // Handle Dragging
    const startDragging = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        e.preventDefault(); // Prevent text selection
    }, []);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onDrag = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        // Prevent scrolling on mobile while dragging
        if (e.cancelable) e.preventDefault();

        const containerRect = containerRef.current.getBoundingClientRect();
        const isDesktop = window.innerWidth >= 1024; // lg breakpoint matches Tailwind

        let clientPos = 0;
        let containerSize = 0;

        if (isDesktop) {
            clientPos = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            containerSize = containerRect.width;
            const newPos = ((clientPos - containerRect.left) / containerSize) * 100;
            setSplitPosition(Math.min(Math.max(newPos, 20), 80)); // Clamp between 20% and 80%
        } else {
            clientPos = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
            containerSize = containerRect.height;
            const newPos = ((clientPos - containerRect.top) / containerSize) * 100;
            setSplitPosition(Math.min(Math.max(newPos, 20), 80));
        }
    }, [isDragging]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onDrag);
            window.addEventListener('mouseup', stopDragging);
            window.addEventListener('touchmove', onDrag, { passive: false });
            window.addEventListener('touchend', stopDragging);
        } else {
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', stopDragging);
            window.removeEventListener('touchmove', onDrag);
            window.removeEventListener('touchend', stopDragging);
        }
        return () => {
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', stopDragging);
            window.removeEventListener('touchmove', onDrag);
            window.removeEventListener('touchend', stopDragging);
        };
    }, [isDragging, onDrag, stopDragging]);


    // Download Function
    const handleDownload = () => {
        const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${effect?.title || 'Effect'}</title>
    <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0e0e0e; color: white; font-family: sans-serif; }
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        ${jsCode}
    </script>
</body>
</html>`;
        const blob = new Blob([fullCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${effectId || 'effect'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Listen for console messages from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'console-message') {
                setLogs(prev => [...prev, { type: event.data.level, message: event.data.args.join(' ') }]);
                // Auto-open console on error if not open
                if (event.data.level === 'error') setShowConsole(true);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Update Preview
    useEffect(() => {
        // Add a separator to indicate code change/reload
        setLogs(prev => [...prev, { type: 'log', message: '--- Reloading Preview ---' }]);

        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>
                            body {
                                background-color: transparent;
                                color: white;
                                font-family: sans-serif;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                                overflow: hidden;
                            }
                            ${cssCode}
                        </style>
                    </head>
                    <body>
                        ${htmlCode}
                        <script>
                            // Infrastructure: Override console & handlers
                            (function() {
                                const originalLog = console.log;
                                const originalWarn = console.warn;
                                const originalError = console.error;

                                console.log = (...args) => {
                                    window.parent.postMessage({ type: 'console-message', level: 'log', args: args.map(String) }, '*');
                                    originalLog.apply(console, args);
                                };
                                console.warn = (...args) => {
                                    window.parent.postMessage({ type: 'console-message', level: 'warn', args: args.map(String) }, '*');
                                    originalWarn.apply(console, args);
                                };
                                console.error = (...args) => {
                                    window.parent.postMessage({ type: 'console-message', level: 'error', args: args.map(String) }, '*');
                                    originalError.apply(console, args);
                                };

                                window.onerror = function(message, source, lineno, colno, error) {
                                    window.parent.postMessage({
                                        type: 'console-message',
                                        level: 'error',
                                        args: ['Error: ' + message]
                                    }, '*');
                                    return false;
                                };

                                window.onunhandledrejection = function(event) {
                                    window.parent.postMessage({
                                        type: 'console-message',
                                        level: 'error',
                                        args: ['Uncaught (in promise): ' + event.reason]
                                    }, '*');
                                };
                            })();
                        </script>
                        <script>
                            // User Code
                            ${jsCode}
                        </script>
                    </body>
                </html>
            `);
        }, 800); // 800ms Debounce

        return () => clearTimeout(timeout);
    }, [htmlCode, cssCode, jsCode]);

    if (!effect) {
        return (
            <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Effect Not Found</h1>
                    <Link href="/effects" className="text-pink-400 hover:underline">Back to Effects</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-dvh bg-[#030014] text-white font-sans flex flex-col overflow-hidden">
            {/* Minimal Editor Strip */}
            <div className="h-6 bg-[#020202] border-b border-white/5 flex items-center justify-center shrink-0 z-50">
                <span className="text-[10px] font-medium text-white/20 tracking-[0.2em] uppercase select-none">Codophile Editor</span>
            </div>

            <div
                ref={containerRef}
                className="flex-1 flex flex-col lg:flex-row min-h-0 relative"
            >

                {/* LEFT SIDE: PREVIEW */}
                <div
                    className={`flex flex-col bg-[#050505] border-r border-white/5 relative ${layout === 'editor' ? 'hidden' : 'flex-initial'
                        }`}
                    style={layout === 'split' ? { flexBasis: `${splitPosition}%`, flexGrow: 0, flexShrink: 0 } : { flexGrow: 1 }}
                >
                    {/* Toolbar */}
                    <div className="h-14 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-4">
                            <Link href="/effects" className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                            <span className="font-semibold text-sm hidden md:block">{effect.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Layout Toggle (Mobile/Desktop) */}
                            <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
                                <button
                                    onClick={() => setLayout('preview')}
                                    className={`p-1.5 rounded ${layout === 'preview' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                                    title="Full Preview"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setLayout('split')}
                                    className={`p-1.5 rounded ${layout === 'split' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                                    title="Split View"
                                >
                                    <Columns className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="h-4 w-px bg-white/10 mx-1" />

                            <button
                                onClick={() => setShowConsole(!showConsole)}
                                className={`p-2 rounded-md transition-colors flex items-center gap-2 text-xs font-medium border ${showConsole ? 'bg-white/10 text-white border-white/10' : 'text-gray-400 border-transparent hover:bg-white/5'}`}
                            >
                                <Terminal className="w-4 h-4" /> <span className="hidden md:inline">Console</span>
                            </button>

                            <div className="h-4 w-px bg-white/10 mx-1" />

                            <div className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> <span className="hidden md:inline">Live</span>
                            </div>
                        </div>
                    </div>

                    {/* Iframe Container */}
                    <div className="flex-1 min-h-0 relative bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center flex flex-col">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
                        <iframe
                            srcDoc={srcDoc}
                            className={`w-full flex-1 min-h-0 relative z-10 border-0 ${isDragging ? 'pointer-events-none' : ''}`}
                            title="preview"
                            sandbox="allow-scripts"
                        />

                        {/* Console Panel */}
                        {showConsole && (
                            <div className="relative z-20 h-48 bg-[#0a0a0a] border-t border-white/10 flex flex-col animate-in slide-in-from-bottom-5 duration-200 shrink-0">
                                <div className="flex items-center justify-between px-3 py-1.5 bg-[#111] border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Terminal className="w-3.5 h-3.5 text-gray-500" />
                                        <span className="text-xs font-mono text-gray-400">Console</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setLogs([])} className="p-1 text-gray-500 hover:text-white transition-colors" title="Clear Console">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => setShowConsole(false)} className="p-1 text-gray-500 hover:text-white transition-colors" title="Close Console">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 font-mono text-xs custom-scrollbar space-y-1">
                                    {logs.length === 0 ? (
                                        <div className="text-gray-600 italic px-2">No logs yet...</div>
                                    ) : (
                                        logs.map((log, idx) => (
                                            <div key={idx} className={`px-2 py-0.5 border-b border-white/5 ${log.type === 'error' ? 'text-red-400 bg-red-500/5' :
                                                log.type === 'warn' ? 'text-yellow-400 bg-yellow-500/5' :
                                                    'text-gray-300'
                                                }`}>
                                                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                                {log.type === 'error' && <XCircle className="w-3 h-3 inline mr-1" />}
                                                {log.message}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RESIZER HANDLE */}
                {layout === 'split' && (
                    <div
                        className={`z-50 flex items-center justify-center bg-[#0a0a0a] hover:bg-white/5 transition-colors 
                            cursor-row-resize lg:cursor-col-resize touch-none select-none
                            w-full h-4 lg:w-4 lg:h-full
                            border-y border-white/5 lg:border-x lg:border-y-0
                        `}
                        onMouseDown={startDragging}
                        onTouchStart={startDragging}
                    >
                        {/* Visual Grip Indicator */}
                        <div className="flex items-center justify-center opacity-50">
                            <GripVertical className="hidden lg:block w-4 h-4 text-gray-400" />
                            {/* Horizontal Grip for Mobile */}
                            <div className="lg:hidden flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-gray-500" />
                                <div className="w-1 h-1 rounded-full bg-gray-500" />
                                <div className="w-1 h-1 rounded-full bg-gray-500" />
                            </div>
                        </div>
                    </div>
                )}

                {/* RIGHT SIDE: CODE EDITOR */}
                <div
                    className={`flex flex-col bg-[#0f0f0f] ${layout === 'preview' ? 'hidden' : 'flex-initial'
                        }`}
                    style={{ flexGrow: 1 }}
                >
                    {/* Editor Tabs */}
                    <div className="h-14 border-b border-white/5 flex items-center justify-between px-2 bg-[#0a0a0a] shrink-0">
                        <div className="flex h-full">
                            <TabButton
                                active={activeTab === 'html'}
                                onClick={() => setActiveTab('html')}
                                icon={Code}
                                label="HTML"
                                color="text-orange-400"
                            />
                            <TabButton
                                active={activeTab === 'css'}
                                onClick={() => setActiveTab('css')}
                                icon={Layers}
                                label="CSS"
                                color="text-blue-400"
                            />
                            <TabButton
                                active={activeTab === 'js'}
                                onClick={() => setActiveTab('js')}
                                icon={Play}
                                label="JS"
                                color="text-yellow-400"
                            />
                        </div>

                        <div className="flex items-center gap-2 pr-2">
                            <button
                                onClick={handleDownload}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                title="Download Code"
                            >
                                <Download className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setLayout(layout === 'editor' ? 'split' : 'editor')}
                                className={`p-2 rounded-md transition-colors ${layout === 'editor' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                title={layout === 'editor' ? "Exit Fullscreen" : "Fullscreen Editor"}
                            >
                                {layout === 'editor' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Editor Input Area */}
                    <div className="flex-1 relative min-h-0 bg-[#0f0f0f]">
                        <div className="absolute inset-0">
                            <Editor
                                height="100%"
                                language={activeTab === 'js' ? 'javascript' : activeTab}
                                theme="vs-dark"
                                value={activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode}
                                onChange={(value: string | undefined) => {
                                    if (activeTab === 'html') setHtmlCode(value || "");
                                    else if (activeTab === 'css') setCssCode(value || "");
                                    else setJsCode(value || "");
                                }}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineHeight: 21,
                                    padding: { top: 16 },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    tabSize: 4,
                                    fontFamily: "'Geist Mono', monospace",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label, color }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 h-full border-b-2 transition-colors ${active
                ? `border-indigo-500 bg-white/5 text-white`
                : `border-transparent text-gray-400 hover:text-white hover:bg-white/5`
                }`}
        >
            <Icon className={`w-4 h-4 ${active ? color : 'text-gray-500'}`} />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}
