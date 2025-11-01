"use client";

import React, { useEffect, useState } from 'react';

const generateBinaryString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.round(Math.random());
  }
  return result;
};

const BinaryRain = ({ columnCount = 40 }: { columnCount?: number }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {Array.from({ length: columnCount }).map((_, i) => (
        <p
          key={i}
          className="binary-code"
          style={{
            left: `${(i / columnCount) * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 0.5 + 0.75}rem`,
          }}
        >
          {generateBinaryString(50)}
        </p>
      ))}
    </div>
  );
};

export default BinaryRain;
