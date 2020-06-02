export function makeFresnelCircle(xc, yc, r = 10, z = 1e-9, N = 512, wv = 6.33e-6) {
    let worker = new Worker('fresnel-worker.js');

    return new Promise(resolve => {

        worker.onmessage = (event) => {
            if (event.data === 'DONE') {
                worker.postMessage({i: 0, xc, yc, r, z, wv, N});
            } else {
                resolve(event.data.resp);
            }
        };
    });
}