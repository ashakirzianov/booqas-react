function prodConfig() {
    return {
        frontUrl: 'http://booka.pub',
        backUrl: 'https://reader-back.herokuapp.com',
        libUrl: 'https://booka-lib.herokuapp.com',
    };
}

function debugConfig(): AppConfig {
    const prod = prodConfig();
    return {
        ...prod,
        frontUrl: window && window.location && window.location.hostname
            ? `http://${window.location.hostname}:3000`
            : prod.frontUrl,
        backUrl: 'http://localhost:3042',
        libUrl: 'http://localhost:3141',
    };
}

export function config() {
    return isDebug()
        ? debugConfig()
        : prodConfig();
}
export function whileDebug(callback: () => void) {
    if (isDebug()) {
        callback();
    }
}
export type AppConfig = ReturnType<typeof prodConfig>;

function isDebug() {
    return process.env.NODE_ENV === 'development';
}
