import { useCallback, useEffect, useState } from 'react';

type UsePageParams = {
    page: number;
    setPage: (next: number | ((current: number) => number)) => void;
    rawSearchParams: URLSearchParams;
};

function parsePage(s: string | null): number {
    if (!s) return 1;
    const n = Number(s);
    if (!Number.isFinite(n) || Number.isNaN(n)) return 1;
    const i = Math.floor(n);
    return i >= 1 ? i : 1;
}


export function usePageParam(): UsePageParams {
    const getPageFromUrl = () => parsePage(new URLSearchParams(window.location.search).get('page'));

    const [page, setPageState] = useState(getPageFromUrl);
    const [rawSearchParams, setRawSearchParams] = useState(
        new URLSearchParams(window.location.search)
    );

    useEffect(() => {
        const onPopState = () => {
            setPageState(getPageFromUrl());
            setRawSearchParams(new URLSearchParams(window.location.search));
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const setPage = useCallback(
        (next: number | ((current: number) => number)) => {
            const current = page;
            const newPage =
                typeof next === 'function' ? (next as (c: number) => number)(current) : next;
            const normalized = Math.max(1, Math.floor(Number(newPage) || 1));

            const params = new URLSearchParams(window.location.search);
            params.set('page', String(normalized));

            const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash || ''}`;
            window.history.pushState({}, '', newUrl);

            // manually trigger update
            window.dispatchEvent(new PopStateEvent('popstate'));
        },
        [page]
    );

    return { page, setPage, rawSearchParams };
}
