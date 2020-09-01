// 导入超级代理模块
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');



// 爬取前端渲染
const beforeWay = () => {
  superagent
    .get('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js')
    .end((error, response) => {

      const { hero } = JSON.parse(response.body);

      fs.writeFile(
        path.join(__dirname, './lolHero.json'),
        JSON.stringify(hero, null, 2),
        (err) => {
          if (err === null) {
            console.log('写入成功');
          } else {
            console.log('写入失败');
          }
        }
      );
    });
};

// beforeWay();



// 爬取后端渲染
const afterWay = () => {
  superagent
    .get('https://yys.163.com/index.html')
    .end((error, response) => {
      // console.log(response.text);
      // 🚩

      // 解析页面的text
      const $ = cheerio.load(response.text);
      // 获取页面title标签里的内容
      const res = $('#NIE-topBar-menu').text();

      console.log(res);

      const goodsList = [];
      $('#NIE-topBar-menu a').each((index, item) => {

        const proName = $(item).find('em').text();
        console.log(proName);
        goodsList.push({
          proName
        });

      });
      console.log(goodsList);
      // 写入部分
      fs.writeFile(
        path.join(__dirname, './yys.json'),
        JSON.stringify(goodsList, null, 2),
        (err) => {
          if (err === null) {
            console.log('写入成功');
          } else {
            console.log('写入失败');
          }
        }
      );

    });
};

afterWay();


