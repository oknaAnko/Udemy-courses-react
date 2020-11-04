const { merge } = require('webpack-merge');

//ładujemy plik konfiguracyjny common.js
const commonConfiguration = require('./webpack/common');

module.exports = (_env, { mode }) => {
    //ładujemy pliki konfiguracyjne z developmentu lub z production, ( mode oznacza środowisko developerskie lub produkcyjne)
    const properlyConfig = require(`./webpack/${mode}`);
    const mergedConfig = merge(commonConfiguration, properlyConfig);

    return mergedConfig;
}