import { Metadata } from "next";
import { playgroundData } from "../../data";
import GridClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties["grid"];

    if (!meta) {
        return {
            title: "CSS Grid Playground",
            description: "Interactive CSS Grid Playground"
        }
    }

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
