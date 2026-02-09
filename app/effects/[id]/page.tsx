import React from "react";
import { effectsData } from "../data";
import ClientEditor from "./ClientEditor";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const effect = effectsData.find((e) => e.id === params.id);

    if (!effect) {
        return {
            title: "Effect Not Found | Codophile",
            description: "The requested CSS effect could not be found."
        };
    }

    return {
        title: `${effect.title} | Codophile`,
        description: effect.description,
        keywords: effect.keywords,
        openGraph: {
            title: effect.title,
            description: effect.description,
            type: 'article',
            siteName: 'Codophile',
        },
        twitter: {
            card: 'summary_large_image',
            title: effect.title,
            description: effect.description,
        }
    };
}

export default function EffectPage() {
    return <ClientEditor />;
}
