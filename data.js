//how to work with data limitation
const dataSource = (() => {
  
  let isTestMode = false;
  let enableTestMode = () => { isTestMode = true; };

  const sendRequest = function(method, url, content, contentType) {
    // XHR used to allow for synchronous fetches
    let unixTime = new Date().getTime();
    if (unixTime - lastXhr < 5000) {
      throw new Error("You must wait at least 5 seconds since your last request."); 
    }
    lastXhr = unixTime;
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    let outStatus = 0;
    let outText = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        outStatus = xhr.status;
        outText = xhr.responseText;
        lastXhr = new Date().getTime();
      }
    }
    if (content) xhr.setRequestHeader("Content-Type", contentType);
    xhr.send(content || null);
    return {
      status: outStatus,
      content: outText,
    };
  };
  //news
  let getNews = (category) => {

    category = `${category}`.trim().toLowerCase();
    switch (category) {
      case 'business':
      case 'sports':
      case 'world':
      case 'politics':
      case 'technology':
      case 'startup':
      case 'entertainment':
      case 'science':
        break;
      default:
        throw new Error("Invalid category: " + category);
    }

    if (isTestMode) return JSON.parse(newsTestData).sort((a, b) => Math.random() * 2 - 1);

    let gatherJson = () => {
      let { status, content } = sendRequest('GET', 'https://inshorts.deta.dev/news?category=' + category);
      if (status !== 200) {
        throw new Error("News source not reachable at this time. Consider using test mode for now.");
      }
      if (!content) return null;
      let data;
      try {
        data = JSON.parse(content);
      } catch (e) {
        return null;
      }
      if (!data.success) return null;
      if (!data.data.length) return null;

      return data;
    };
    let data = gatherJson();
    if (!data) throw new Error("The news API is not available right now.");
    return data.data.map(item => {
      return {
        title: item.title,
        summary: item.content,
        url: item.readMoreUrl,
      };
    });
  };

  const newsTestData = JSON.stringify([
    {//science
      title: "Astronomers rediscover the moon after losing it for several hours",
      summary: "We were worried there for a second.",
      url: "about:blank",
    },
    {//entertainment
      title: "Trucks are cool",
      summary: "'They go vroom vroom' said Billy, a local resident of age 4",
      url: "about:blank",
    },
    {//sports
      title: "Local cat cafe unionizes",
      summary: "All humans have been fired from staff.",
      url: "about:blank",
    },
    {//technology
      title: "C++ declared a public health hazard",
      summary: "The department of public health and safety of California came to the startling conclusion",
      url: "about:blank",
    },
    {//business
      title: "New Tokyo Metro line announced",
      summary: "The new line will be in the shape of a spiral and intersect Otemachi 25 times and no other stations. 'Because we could'",
      url: "about:blank"
    },
    {//world
      title: "Gas prices go up again",
      summary: "The surge is blamed on the new gasoline NFTs. 'If you can't truly physically own gas, may as well sell un-ownership!'",
      url: "about:blank"
    },
    {//world
      title: "Starbucks announces new holiday drink",
      summary: "The new drink is coal-flavored, for that vendetta in your life.",
      url: "about:blank",
    }, 
    {//world
      title: "Typhoon this weekend",
      summary: "Wheeeeeeeeeeeeeeeeeeeeee!",
      url: "about:blank",
    },
    {//politics
      title: "NHK announces plan to abolish door-to-door subscription blanketing", 
      summary: "When reached for comment, they only said 'Our work is done here, we are moving on to the next planet.'",
      url: "about:blank",
    }, 
    {//business
      title: "Asahi vows to put a vending machine on Mars before the end of the decade",
      summary: "By placing vending machines on Mars, refridgeration costs could be save, so effectively it would pay for itself.",
      url: "about:blank",
    }
  ]);

  //weather information

  let lastXhr = 0;

  let cities = {//~
    fukuoka: { lat: 33.5902, lon: 130.4017 },
    hiroshima: { lat: 34.3853, lon: 132.4553 },
    kagoshima: { lat: 31.5969, lon: 130.5571 },
    kobe: { lat: 34.6901, lon: 135.1956 },
    kyoto: { lat: 35.0116, lon: 135.7681 },
    kawasaki: { lat: 35.5308, lon: 139.7029 },
    osaka: { lat: 34.6937, lon: 135.5023 },
    nagoya: { lat: 35.1815, lon: 136.9066 },
    nara: { lat: 34.6851, lon: 135.8048 },
    okinawa: { lat: 26.3344, lon: 127.8056 },
    saitama: { lat: 35.8616, lon: 139.6455 },
    sapporo: { lat: 43.0618, lon: 141.3545 },
    tokyo: { lat: 35.6762, lon: 139.6503 },
    yokohama: { lat: 35.4437, lon: 139.6380 },
  };

// get weather up
  let getWeather = (city) => { //~~~~~~~

    let { lat, lon } = cities[`${city}`.trim().toLowerCase()] || {};
    if (!lat && !lon) throw new Error("Invalid city");

    let cap = (t) => Math.floor(t * 10) / 10;
    if (isTestMode) {
      let nums = [];
      for (let i = 0; i < 24; i++) {
        nums.push(i);
      }

      let tempOffset = Math.random() * 999;
      let variance = Math.random() * 6 + 2;
      let baseTemp = Math.random() * 10 + 4;
      let rainOffset = Math.floor(Math.random() * 30) - 4;
      let rainExtra = [0, .1, .2, .5, 1.0, 1.0, 1.1, 1.0, 0.8, 0.8, .4, 0];
      let rain = Math.random() < 0.3 
        ? nums.map(_ => Math.random() * .3 + .8)
        : nums.map(_ => 0);
      if (Math.random() < .4) {
        for (let i = 0; i < rainExtra.length; i++) {
          let target = i + rainOffset;
          if (target >= 0 && target < 24) {
            rain[target] += rainExtra[i];
          }
        }
      }

      let hourly = nums.map(i => {
        return {//~~~~~~~
          tempC: cap(Math.sin(tempOffset + Math.PI * 2 * i / 24) * variance / 2 + baseTemp + Math.random() / 2),
          rainMm: Math.max(0, cap(rain[i])),
        };
      });

      return {//~~~~~~~~
        city: city,
        tempC: cap(5 + Math.random() * 17),
        hourly,
      };
    }


    let url = 'https://api.open-meteo.com/v1/forecast?' + [
      'latitude=' + lat, 
      'longitude=' + lon, 
      'current_weather=true', 
      'hourly=temperature_2m,rain',
    ].join('&');
    let data = sendRequest('GET', url);
    if (data.status !== 200) {
      throw new Error("Weather Source not reachable at this time. Consider using test mode for now.");
    }
    let weatherData = JSON.parse(data.content);

    let currentTemp = weatherData.current_weather.temperature;
    let hourlyTemp = weatherData.hourly.temperature_2m.slice(8).slice(0, 24);
    let hourlyRain = weatherData.hourly.rain.slice(8).slice(0, 24);
    let hourly = [];
    for (let i = 0; i < 24; i++) {
      hourly.push({
        tempC: hourlyTemp[i],
        rainMm: hourlyRain[i],
      });
    }
    return {
      tempC: currentTemp,
      hourly,
    }
  };

  return Object.freeze({
    getNews,
    getWeather,
    sendRequest,
    enableTestMode,
  });
})();
