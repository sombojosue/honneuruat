import React, { useEffect, useRef, useState } from "react";

interface TruncatedTitleProps {
  text: string;
  maxHeight: number; // in pixels
  className?: string;
}

const TruncatedTitle: React.FC<TruncatedTitleProps> = ({
  text,
  maxHeight,
  className,
}) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const words = text.split(" ");
    el.textContent = ""; // Clear content

    for (let i = 0; i < words.length; i++) {
      el.textContent = words.slice(0, i + 1).join(" ") + " ";
      if (el.offsetHeight > maxHeight) {
        setDisplayText(words.slice(0, i).join(" ") + "...");
        return;
      }
    }

    setDisplayText(text); // Text fits, use original
  }, [text, maxHeight]);

  return (
    <h2
      ref={elementRef}
      className={className}
      style={{ overflow: "hidden", height: maxHeight, maxHeight: "70px" }}
    >
      {displayText}
    </h2>
  );
};

export default TruncatedTitle;
