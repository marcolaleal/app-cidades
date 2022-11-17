import { useCallback, useRef } from 'react';


export const useDebounce = (delay = 300, notDelayInFirtTime = true) => {
    const deboucing = useRef<NodeJS.Timeout>();
    const isFirstTime = useRef(notDelayInFirtTime);


    const debounce = useCallback((func: () => void) => {
        if (isFirstTime.current) {
            isFirstTime.current = false;
            func();
        }else {
            if(deboucing.current){
                clearTimeout(deboucing.current);
            }
    
            deboucing.current = setTimeout(() => {func();},delay);
        }


    },[delay]);

    return { debounce };
};