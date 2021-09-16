const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;


const getHtml = async(crawlingURL) => {
    try {
        return await axios.get(crawlingURL);
    } catch (error) {
        console.error(error);
    }
};

const crawlingTest = async(db, data) => {
    return new Promise((resolve, reject) => {

        db.getList('test', 'crawling', data)
            .then(function(row) {
                console.log(row[0]);
                getHtml(row[0].c_url)
                    .then(html => {
                        let ulList = [];
                        const $ = cheerio.load(html.data);
                        const $bodyList = $("div.list-type038 ul").children("li");

                        $bodyList.each(function(i, elem) {
                            ulList[i] = {
                                title: $(this).find('strong.tit-news').text(),
                                url: $(this).find('div.news-con a').attr('href'),
                                image_url: $(this).find('figure a img').attr('src'),
                                image_alt: $(this).find('figure a img').attr('alt'),
                                summary: $(this).find('p.lead').text().slice(0, -11),
                                date: $(this).find('span.txt-time').text()
                            };
                        });

                        const data = ulList.filter(n => n.title);
                        resolve(data);
                    })
            })
            .catch(err => { console.log('err', err) })

    });

}

module.exports = {
    crawlingTest: crawlingTest
}