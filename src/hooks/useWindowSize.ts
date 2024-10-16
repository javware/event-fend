import { useEffect, useState } from "react";

type windowSizeProps = {
    width?: number
    height?: number
}
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<windowSizeProps>();

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize(); // Llama al handler inmediatamente para inicializar el tamaño.

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
};
