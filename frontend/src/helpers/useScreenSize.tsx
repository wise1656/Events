import { useEffect, useState } from 'react';


export function useScreenWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);
    return width;
}


export function useScreenWidthLessThen(point: number) {
    const [isLess, setIsLess] = useState(window.innerWidth < point);
    useEffect(() => {
        window.addEventListener('resize', () => setIsLess(window.innerWidth < point));
    }, []);
    return isLess;
}
