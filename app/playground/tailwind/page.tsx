import { Metadata } from "next";
import { playgroundData } from "../data";
import TailwindPlaygroundClient from "./ClientPage";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.tailwind;

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: {
            title: meta.title,
            description: meta.description,
            type: 'website',
            siteName: 'Codophile',
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
        }
    };
}

export default function TailwindPlaygroundPage() {
    return <TailwindPlaygroundClient />;
}
