import { Metadata } from "next";
import { playgroundData } from "./data";
import PlaygroundClientPage from "./client-page";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "CSS Playground Online (Live Editor) + Tailwind CSS Generator | Codophile",
        description: "Use this CSS playground online with live preview to test styles instantly. Generate Tailwind CSS classes, experiment with layouts, and copy production-ready code.",
        keywords: ["css playground", "tailwind playground", "interactive css", "visual css editor", "tailwind learning"],
        openGraph: {
            title: "CSS Playground Online (Live Editor) + Tailwind CSS Generator | Codophile",
            description: "Use this CSS playground online with live preview to test styles instantly. Generate Tailwind CSS classes, experiment with layouts, and copy production-ready code.",
            type: 'website',
            siteName: 'Codophile',
        },
        twitter: {
            card: 'summary_large_image',
            title: "Playground - Interactive CSS & Tailwind Learning",
            description: "Master CSS properties or Tailwind utilities with visual controls.",
        }
    };
}

export default function PlaygroundPage() {
    return <PlaygroundClientPage />;
}
