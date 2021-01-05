const {injectManifest} = require('workbox-build')

let workboxConfig = {
    globDirectory: 'build/',
    globPatterns: [
        'favicon.ico',
        'index.html',
        'static/**/*.css',
        'static/**/*.js'
    ],
    swSrc: 'src/service-worker.js',
    swDest: 'build/service-worker.js'
}

injectManifest(workboxConfig)
    .then(({count, size}) => {
        console.log(`Generated ${workboxConfig.swDest}, which will precache ${count} files, totaling ${size} bytes.`)
    })