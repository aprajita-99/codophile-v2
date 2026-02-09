import { Metadata } from "next";
import { playgroundData } from "./data";
import PlaygroundClientPage from "./client-page";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Playground - Interactive CSS & Tailwind Learning | Codophile",
        description: "Choose your playground: Master CSS properties or Tailwind utilities with visual, interactive controls. Real-time feedback for rapid learning.",
        keywords: ["css playground", "tailwind playground", "interactive css", "visual css editor", "tailwind learning"],
        openGraph: {
            title: "Playground - Interactive CSS & Tailwind Learning",
            description: "Choose your playground: Master CSS properties or Tailwind utilities with visual, interactive controls.",
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
