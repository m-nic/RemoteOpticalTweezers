import {cCallWrapper} from "@/misc/cCallWrapper";


function timeit(fn, name) {
    console.time(name);
    fn();
    console.timeEnd(name);
}

let fresnelCFn = null;

export function makeFresnelCircle(xc, yc, r = 10, z = 1e-9, N = 512, wv = 6.33e-6) {

    if (!fresnelCFn) {
        fresnelCFn = cCallWrapper
            .of('fresnelCircle')
            .setReturnType('array', 'HEAPF64', N * N)
            .setParamTypes(['number', 'number', 'number', 'number', 'number'])
            .make();
    }

    return new Promise(resolve => {
        timeit(() => {
            resolve(
                fresnelCFn(xc, yc, r, z, wv, N)
            );
        }, '[C Fresnel]');
    });
}