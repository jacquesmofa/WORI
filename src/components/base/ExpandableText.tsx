import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

export default function ExpandableText({ text, maxLength = 400 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;
  const displayText = expanded || !shouldTruncate ? text : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p className="text-base text-charcoal-600/70 leading-relaxed whitespace-pre-line">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
        >
          {expanded ? (
            <>
              <i className="ri-arrow-up-s-line" />
              Read Less
            </>
          ) : (
            <>
              <i className="ri-arrow-down-s-line" />
              Read More
            </>
          )}
        </button>
      )}
    </div>
  );
}