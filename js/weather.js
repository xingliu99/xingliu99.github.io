/* 禁用f12与按键防抖 start */
// 防抖全局计时器
let DT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (DT !== null) clearTimeout(DT);
  DT = setTimeout(fn, time);
}

// 复制提醒
// 未生效
document.addEventListener("copy", function () {
    debounce(function () {
      new Vue({
        mounted() {
            Vue.notify({
                title: "哎嘿！复制成功🍬",
                message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                position: 'top-left',
                offset: 50,
                duration: 5000,
                type: "success",
                onClick: () => {
                    // 点击通知时的回调
                    console.log("Notification clicked");
                }
            });
        }
      })
    }, 300);
  })


  // JavaScript code to detect and apply color scheme
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Function to apply dark or light mode styles
function applyTheme(darkMode) {
    const root = document.documentElement;
    if (darkMode) {
        root.style.setProperty('--trans-light', 'rgba(25, 25, 25, 0.61)');
        root.style.setProperty('--text-color', 'white');
    } else {
        root.style.setProperty('--trans-light', 'rgba(253, 253, 253, 0.61)');
        root.style.setProperty('--text-color', 'black');
    }
}

// Initial application based on system preference
applyTheme(prefersDarkScheme.matches);

// Listen for changes in system color scheme preference
prefersDarkScheme.addListener((event) => {
    applyTheme(event.matches);
});


/* 阅读进度 start */
document.addEventListener('pjax:complete', function () {
    window.onscroll = percent;
  });
  document.addEventListener('DOMContentLoaded', function () {
    window.onscroll = percent;
  });
  // 页面百分比
function percent() {
  try {
    rmf.showRightMenu(false);
    document.querySelector('.rmMask').style.display = 'none';
  } catch (err) {
    // 如果报错，不做处理
  }

  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
  ) - document.documentElement.clientHeight;
  let percent = Math.round((scrollTop / scrollHeight) * 100);
  let btn = document.querySelector("#go-up");

  if (btn) {
    let percentSpan = btn.querySelector("span.scroll-percent");
    let arrowIcon = btn.querySelector("i.fas.fa-arrow-up");

    if (percent < 95) {
      percentSpan.style.display = 'block'; // 显示百分比
      percentSpan.innerHTML = percent + '%';
      arrowIcon.style.display = 'none'; // 隐藏箭头
    } else {
      percentSpan.style.display = 'none'; // 隐藏百分比
      arrowIcon.style.display = 'block'; // 显示箭头
    }
  }
}
  /* 阅读进度 end */

  /* 导航栏显示标题 start */

document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav() {
  document.getElementById("name-container").setAttribute("style", "display:none");
  var position = $(window).scrollTop();
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      document.getElementById("name-container").setAttribute("style", "");
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");
    } else {
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
      document.getElementById("name-container").setAttribute("style", "display:none");
    }
    position = scroll;
  });
  //修复没有弄右键菜单的童鞋无法回顶部的问题
  document.getElementById("page-name").innerText = document.title.split(" | Fomalhaut🥝")[0];
}

function scrollToTop() {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

/* 导航栏显示标题 end */

/* 欢迎信息 start */
//get请求
$.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
      key: 'C5GBZ-YD6C7-APEXI-PR3ZU-CL5NZ-UXF57', 
      output: 'jsonp',
    },
    dataType: 'jsonp',
    success: function (res) {
      ipLoacation = res;
    }
  })
  function getDistance(e1, n1, e2, n2) {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
      e *= PI / 180
      n *= PI / 180
      return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }
  
    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
  }
  
  function showWelcome() {
  
    let dist = getDistance(116.460370, 39.832670, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
    let pos = ipLoacation.result.ad_info.nation;
    let ip;
    let posdesc;
    //根据国家、省份、城市信息自定义欢迎语
    switch (ipLoacation.result.ad_info.nation) {
      case "日本":
        posdesc = "よろしく，一起去看樱花吗";
        break;
      case "美国":
        posdesc = "Let us live in peace!";
        break;
      case "英国":
        posdesc = "想同你一起夜乘伦敦眼";
        break;
        case "俄罗斯":
          posdesc = "干了这瓶伏特加！";
          break;
        case "缅甸":
          posdesc = "别噶我腰子啊啊啊啊";
          break;
      case "法国":
        posdesc = "C'est La Vie";
        break;
      case "德国":
        posdesc = "Die Zeit verging im Fluge.";
        break;
      case "澳大利亚":
        posdesc = "一起去大堡礁吧！";
        break;
      case "加拿大":
        posdesc = "拾起一片枫叶赠予你";
        break;
      case "中国":
        pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
        ip = ipLoacation.result.ip;
        switch (ipLoacation.result.ad_info.province) {
          case "北京市":
            posdesc = "北——京——欢迎你~~~";
            break;
          case "天津市":
            posdesc = "来了天津卫，我嘛也没学会~";
            break;
          case "河北省":
            posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
            break;
          case "河南省":
            posdesc = "老乡见老乡。两眼泪汪汪。";
            break;
          case "内蒙古自治区":
            posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
            break;
          case "辽宁省":
            posdesc = "我想吃烤鸡架！";
            break;
          case "吉林省":
            posdesc = "状元阁就是东北烧烤之王。";
            break;
          case "黑龙江省":
            posdesc = "很喜欢哈尔滨大剧院。";
            break;
          case "上海市":
            posdesc = "沪爷来了，里面请。";
            break;
          case "江苏省":
            switch (ipLoacation.result.ad_info.city) {
              case "南京市":
                posdesc = "这是我挺想去的城市啦。";
                break;
              case "苏州市":
                posdesc = "上有天堂，下有苏杭。";
                break;
              default:
                posdesc = "散装是必须要散装的。";
                break;
            }
            break;
          case "浙江省":
            posdesc = "东风渐绿西湖柳，雁已还人未南归。";
            break;
          case "安徽省":
            posdesc = "蚌埠住了，芜湖起飞。";
            break;
          case "福建省":
            posdesc = "井邑白云间，岩城远带山。";
            break;
          case "江西省":
            posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
            break;
          case "山东省":
            posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
            break;
          case "湖北省":
            posdesc = "来碗热干面！";
            break;
          case "湖南省":
            posdesc = "74751，长沙斯塔克。";
            break;
          case "广东省":
            posdesc = "老板来两斤福建人。";
            break;
          case "广西壮族自治区":
            posdesc = "桂林山水甲天下。";
            break;
          case "海南省":
            posdesc = "朝观日出逐白浪，夕看云起收霞光。";
            break;
          case "四川省":
            posdesc = "康康川妹子。";
            break;
          case "贵州省":
            posdesc = "茅台，学生，再塞200。";
            break;
          case "云南省":
            posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
            break;
          case "西藏自治区":
            posdesc = "躺在茫茫草原上，仰望蓝天。";
            break;
          case "陕西省":
            posdesc = "来份臊子面加馍。";
            break;
          case "甘肃省":
            posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
            break;
          case "青海省":
            posdesc = "牛肉干和老酸奶都好好吃。";
            break;
          case "宁夏回族自治区":
            posdesc = "大漠孤烟直，长河落日圆。";
            break;
          case "新疆维吾尔自治区":
            posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
            break;
          case "台湾省":
            posdesc = "我在这头，大陆在那头。";
            break;
          case "香港特别行政区":
            posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
            break;
          case "澳门特别行政区":
            posdesc = "性感荷官，在线发牌。";
            break;
          default:
            posdesc = "带我去你的城市逛逛吧！";
            break;
        }
        break;
      default:
        posdesc = "带我去你的国家逛逛吧。";
        break;
    }
  
    //根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，早晨起来，拥抱太阳！";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
    else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，中午不睡下午崩溃！";
    else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，饮茶先啦！";
    else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>要吃晚饭咯！</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>夜生活才刚开始！";
    else timeChange = "夜深了，早点休息，少熬夜。";
  
    try {
      //自定义文本和需要放的位置
      document.getElementById("welcome-info").innerHTML =
      `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里， ${posdesc}</b>`;
    } catch (err) {
      // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
    }
  }
  window.onload = showWelcome;
  // 如果使用了pjax在加上下面这行代码
  document.addEventListener('pjax:complete', showWelcome);
  
  /* 欢迎信息 end */