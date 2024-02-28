
// document.body.header[0].innerText = "Push Me!";
let clickCounter=1;
window.addEventListener("load",()=>{
    let button = document.getElementById("buttonOne");
    // console.log(button);
    button.addEventListener("click",()=>{
      button.innerText = clickCounter;
      clickCounter +=1;
    })
    button.addEventListener("keydown",()=>{
      button.innerText = clickCounter;
      clickCounter +=1;
    })
    button.addEventListener("keyup",()=>{
        button.innerText = clickCounter;
        clickCounter +=1;
    })
    
})
