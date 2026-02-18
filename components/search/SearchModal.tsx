"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBox, Hits, Index } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

function Hit({ hit, onClose }: any) {
  return (
    <Link
      href={`/effects/${hit.objectID}`}
      onClick={onClose}
      className="block rounded-md px-4 py-3 hover:bg-white/5 transition"
    >
      <p className="text-xs text-violet-400 uppercase tracking-wide">
        {hit.type}
      </p>
      <p className="text-white font-medium">{hit.title}</p>
      <p className="text-sm text-gray-400 line-clamp-2">
        {hit.description}
      </p>
    </Link>
  );
}

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const searchBoxWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      const input =
        searchBoxWrapperRef.current?.querySelector("input");
      input?.focus();
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto mt-24 max-w-2xl rounded-xl bg-[#050014] border border-white/10 shadow-2xl"
      >
        <InstantSearchNext searchClient={searchClient}>
          <Index indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}>
            <div
              ref={searchBoxWrapperRef}
              className="border-b border-white/10 px-4 py-3"
            >
              <SearchBox
                placeholder="Search Codophile..."
                classNames={{
                  input:
                    "w-full bg-transparent text-white outline-none placeholder-gray-500",
                }}
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              <Hits
                hitComponent={(props) => (
                  <Hit {...props} onClose={onClose} />
                )}
              />
            </div>
          </Index>
        </InstantSearchNext>
      </div>
    </div>
  );
}