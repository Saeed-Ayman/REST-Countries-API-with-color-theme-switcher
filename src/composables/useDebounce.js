export function useDebounce(fn, t) {
    var proses = null;

    return function(...args) {
        if (proses) clearTimeout(proses)

        proses = setTimeout(fn, t, ...args)
    }
};