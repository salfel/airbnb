import { LuStar } from "react-icons/lu";
import React, { useEffect, useState } from "react";

interface Props {
    value: number;
    onChange: (value: number) => void;
    size?: number;
}

export default function RatingInput({ value, onChange, size = 4 }: Props) {
    const [isDown, setIsDown] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", () => setIsDown(true));
        document.addEventListener("mouseup", () => setIsDown(false));

        return () => {
            document.removeEventListener("mousedown", () => setIsDown(true));
            document.removeEventListener("mouseup", () => setIsDown(false));
        };
    }, []);
    return (
        <div>
            {Array.from({ length: 5 }).map((_, index) => (
                <LuStar
                    fill={value >= index + 1 ? "black" : "none"}
                    className={`inline-block w-${size} h-${size}`}
                    onMouseOver={() => isDown && onChange(index + 1)}
                    onMouseDown={() => onChange(index + 1)}
                    key={index}
                />
            ))}
        </div>
    );
}
