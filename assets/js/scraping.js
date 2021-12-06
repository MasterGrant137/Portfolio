const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const pretty = require('pretty');

const url = 'https://arcade-academy-1.herokuapp.com/'

const metaCompiler = (url) => {
    axios.get(url)
        .then((res) => {
            const $ = cheerio.load(res.data);
            $('head').children('meta').each((idx, meta) => {
                metaName = 
                metaObj[meta.attribs.name] = meta.attribs.content
                console.log(metaObj);
            })
        })
        .catch((err) => {
            console.log(`End of the line error: ${err}`);
        })
};

metaCompiler(url);