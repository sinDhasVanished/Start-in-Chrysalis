window.addEventListener('load', () => {
  
  // If you remove the next line, it will show real data
  dataSource.enableTestMode();
  let button = document.getElementById("bigtitle");
  button.innerText = "SinD's interactive newsletter";
  // let newsData = dataSource.getNews("Science"));
  //weather information here
  //which city
  button.addEventListener('click', () => {//..................~~~~~~~~~~~~~~~~~~
  let cityName = prompt("Where are you now?");
  let weatherData = dataSource.getWeather(cityName);//access the weather data
  console.log(weatherData);//just a test
  //when
  let today = new Date(); // get the current date
  let index = today.getHours();//get the current hour


//temperature
  let topic1 = document.getElementById('topic1');
  topic1.innerText = "First, about today's weather.";
  // //create an id only for num and change it
  // let newNum = document.createElement("span");
  // newNum.id = num1;
  // // let num1 = document.body.getElementById('num1');
  // num1.innerText = weatherData.hourly[index].tempC;
  // //
  let temperatureDiv = document.getElementById('temperature');//create a new id in html
  temperatureDiv.innerText = "The current temperature in "+ cityName.toUpperCase() + " is " + 
  weatherData.hourly[index].tempC + " degrees celsius.";//create the text of the temperature id
  
//precipitation
  let rainDiv = document.getElementById('rain');//create a new id in html
  if (weatherData.hourly[index].rainMm===0){
    rainDiv.innerText = "The current precipitation in "+ cityName.toUpperCase() + " is " + weatherData.hourly[index].rainMm + " mm so please protect your skin when you go out!";
  }else{
    rainDiv.innerText = "The current precipitation in "+ cityName.toUpperCase() + " is " + weatherData.hourly[index].rainMm + " mm so please take an umbrella when you go out!";
  }

  //future forecast
  let futureWeather = document.getElementById("Following");
  let defaultText = "Weather Forecast";
  let hour = index;
  function future(){
    hour = hour + 1;
    if(hour<24){
    futureWeather.innerText = "🌧🌤"+defaultText+"❄️💨"+"\n"+ "👉At " + hour + " o'clock, " + "the temperature will be " +
     weatherData.hourly[hour].tempC + " degrees celsius, and the precipitation will be " + weatherData.hourly[hour].rainMm + " mm.👈";
    }
    
    setTimeout(future,2000)
  }

  setTimeout(future,2000)
  })


  // console.log(futureWeather.innerText);

   //getNews
  let button2 = document.getElementById("news1summary");///some problem
  button2.innerText = "Please click here again...";
  button2.addEventListener('click', (event) => {
    event.preventDefault;
    let columnTitle = document.getElementById('news').children[0];
    let categoryName = prompt("What do you want to read?");// input
    let newsData = dataSource.getNews(categoryName); //access the news data
    console.log(newsData);

    let cateArray = ['business','sports', 'world','politics','technology','startup','entertainment','science'];
    if (cateArray.includes(categoryName)){// if we type the category
      columnTitle.innerText = "Today's " + categoryName + " news we pick for you";
      let i = 0;
      function showNews(){
        if(i<9){
        let news1title = document.getElementById('news1title');
        news1title.innerText = "<"+newsData[i].title+">";
        let news1summary = document.getElementById('news1summary');
        news1summary.innerText = newsData[i].summary;
        let ul1 = document.getElementById('ul1');
        ul1.innerText = "Click here to read more➡️" + newsData[i].url; 
        }
        i=i+1;
        showNews();
    }
    setTimeout(showNews,1000);
    }
    
    })

    //tips
    window.addEventListener('keydown', () => {
      // let key = e.key;
      let tipsTitle = document.getElementById('tipTitle');
      let tips =prompt("What are you going to do today, work, study or rest?");
      let tipsArray = [
        {tip1: "Not to work overtime"
        },
        {tip2: "Remember to eat lunch."},
        {tip3: "Better to walk home after work."},
        {tip4: "Remember to stand up every 40 minutes." },
        {tip5: "Not to do things irrelevant with study."},
        {tip6: "Speak out when learning Japanese."},
        {tip7: "Not lie in bed for the whole day."},
        {tip8: "Take care when you go out."},
        {tip9: "Enjoy the day!"}
      ]
      let titleArray = ["work","study","rest"];
      if (titleArray.includes(tips)){
        tipsTitle.innerText = "For your " + tips + ", please remember the following tips!";
      function showTips(){
        if (tips === "work"){
          let tips1A = document.getElementById('tipA');
          tips1A.innerText = "1."+tipsArray[0].tip1;
          let tips2A = document.getElementById('tipB');
          tips2A.innerText = "2."+tipsArray[1].tip2;
          let tips3A = document.getElementById('tipC');
          tips3A.innerText = "3."+tipsArray[2].tip3;
          // showTips();
        }
        else if(tips === "study"){
          let tips4A = document.getElementById('tipA');
          tips4A.innerText = "1."+tipsArray[3].tip4;
          let tips5A = document.getElementById('tipB');
          tips5A.innerText = "2."+tipsArray[4].tip5;
          let tips6A = document.getElementById('tipC');
          tips6A.innerText = "3."+tipsArray[5].tip6;
          // showTips();
        }
        else if(tips === "rest"){
          let tips7A =document.getElementById('tipA');
          tips7A.innerText =  "1."+tipsArray[6].tip7;
          let tips8A = document.getElementById('tipB');
          tips8A.innerText = "2."+tipsArray[7].tip8;
          let tips9A = document.getElementById('tipC');
          tips9A.innerText = "3."+tipsArray[8].tip9;
          // console.log(tips9A.innerText);
          // showTips();
        }
        
      }
      
      setTimeout(showTips,1000);
    }

    })

  })


     //create some tips for you

    // else if(!cateArray.includes(categoryName)) {
    //   function allNews(){
    //     let newsContent = document.createElement("div");
    //     for(i=0;i<9;i++){
    //       // let newsContent = document.getElementByClassName("news"+i);
    //       newsContent.id = "newsList"+i;
    //       newsContent.getElementById("newsList"+i).innerText = newsData[i].title + "\n" + newsData[i].summary + "\n" + newsData[i].url;
    //       document.body.append(newsContent);
    //     }
    //   }
    //   console.log(allNews());
      
    // }

  
  
    
    // let news1 = document.getElementById('news1');
    // news1.innerText = newsData
    // let temperatureDiv = document.getElementById('temperature');//create a new id in html
    // temperatureDiv.innerText = "The current temperature in "+ cityName.toUpperCase() + " is " + 
    // weatherData.hourly[index].tempC + " degrees Celsius.";//create the text of the temperature id
  
