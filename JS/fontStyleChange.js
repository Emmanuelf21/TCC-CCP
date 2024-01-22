let buttonStyles = document.querySelectorAll(".stylesbtn");

for(let buttonStyle of buttonStyles){
  buttonStyle.addEventListener('click', function(){
    newStyle(buttonStyle);
  })
  
}

function newStyle(buttonStyle){
  
  const changeStyles = document.querySelectorAll(".style-change");
  const titleStyle = document.querySelector(".title-icons");
  
  switch (buttonStyle.value) {
    case '0': 
      for(let changeStyle of changeStyles){
        changeStyle.style.fontFamily = "Arial";
      }
      titleStyle.style.fontFamily = "Arial";
      
    break;
      
    case '1':
      for(let changeStyle of changeStyles){
        changeStyle.style.fontFamily = "oswald";
      }
      titleStyle.style.fontFamily = "oswald";
     
    break;
  
    case '2':
      for(let changeStyle of changeStyles){
        changeStyle.style.fontFamily = "open-sans";
      }
      titleStyle.style.fontFamily = "open-sans";
      
    break;
        
    case '3':
      for(let changeStyle of changeStyles){
        changeStyle.style.fontSize = "18px";
      }
      titleStyle.style.fontSize = "20px";
      
      break;

    case '4':
      for(let changeStyle of changeStyles){
        changeStyle.style.fontSize = "20px";
      }
      titleStyle.style.fontSize = "22px";
      
      break;
      
    
    case '5':
      for(let changeStyle of changeStyles){
        changeStyle.style.fontSize = "22px";
      }
      titleStyle.style.fontSize = "24px";
      
      
    break;
      
  }
}