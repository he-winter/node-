// 导入超级代理模块 - 就是用来让服务器发送网络请求的而已
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');



// 爬取前端渲染的接口
const page1 = () => {
  superagent
    .get('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js')
    .end((error, response) => {
      // console.log(response.text);
      // console.log(response.body);
      const { hero } = JSON.parse(response.body);
      // console.log(hero);
      // response.json({ code:200,data:hero });
      // 写入到文件中
      fs.writeFile(
        path.join(__dirname, './lolHero.json'),
        JSON.stringify(hero, null, 2),
        (err) => {
          if (err === null) {
            console.log('lol英雄写入成功');
          } else {
            console.log('lol英雄写入失败');
          }
        }
      );
    });
};

// page1();



// 爬取后端渲染的页面
const page2 = () => {
  superagent
    .get('https://www.mi.com/')
    .end((error, response) => {
      // console.log(response.text);
      // 🚩
      const $ = cheerio.load(response.text);

      // const res = $('title').text();
      // const res = $('.children-list').text();
      // console.log(res);
      const goodsList = [];
      $('.children-list li').each((index, item) => {
        const imgSrc = $(item).find('img').attr('data-src');
        const proName = $(item).find('span').text();
        goodsList.push({
          imgSrc,
          proName
        });
      });

      fs.writeFile(
        path.join(__dirname, './mi.json'),
        JSON.stringify(goodsList, null, 2),
        (err) => {
          if (err === null) {
            console.log('mi写入成功');
          } else {
            console.log('mi写入失败');
          }
        }
      );

      // console.log(goodsList);
      // console.log(response.body);
    });
};

page2();


