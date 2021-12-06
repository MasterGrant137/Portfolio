const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const proj_urls = [
    'https://arcade-academy-1.herokuapp.com/',
    'https://erudite-1.herokuapp.com/',
    'https://finstagram-1.herokuapp.com/',
    'https://creepy-crawler-1.herokuapp.com/'
]

const metaCompiler = (proj_urls) => {
    for (let i = 0; i <= proj_urls.length - 1; i++) {
        axios.get(proj_urls[i])
        .then((res) => {
            const $ = cheerio.load(res.data);
            const metaObj = {};
            $('head').children('meta').each((idx, meta) => {
                metaObj[meta.attribs.name] = meta.attribs.content;
            })
            const title = $('title').text();
            const jsonMetaObj = JSON.stringify(metaObj, null, 4);
            fs.appendFile('./meta_data.json', `{${'\n'}"${title}": ${jsonMetaObj}${'\n'}}`, (err) => {
                if (err) throw err;
                console.log('Data successfully appended :D');
            })
        })
        .catch((err) => {
            console.log(`End of the line error: ${err}`);
        })
    }
};

metaCompiler(proj_urls);