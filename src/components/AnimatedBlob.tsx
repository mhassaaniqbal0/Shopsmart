import { useEffect, useState } from "react";

export default function AnimatedBlob() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX / 50, y: e.clientY / 50 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-full h-64 md:h-96"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g transform="translate(300,300)">
          <path
            d="M120,-161.4C151.1,-136.8,163.1,-85.3,167.2,-35.6C171.3,14,167.5,62.1,141.2,99.4C114.9,136.7,66.2,163.3,11.7,168.1C-42.7,173,-85.5,156,-114.5,123.7C-143.6,91.4,-158.9,43.7,-154.4,0.6C-150,-42.5,-125.9,-85,-91.3,-110.6C-56.7,-136.2,-11.7,-145,38.4,-162.1C88.4,-179.1,176.2,-186.1,120,-161.4Z"
            fill="#f3e7e8"
          />
        </g>
      </svg>
    </div>
  );
}
