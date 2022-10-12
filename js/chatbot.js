document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
     
      count=0;
  
   
    // let count=0;
    let incr=suggestionbox(count);
    inputField.addEventListener("keydown", function (e) {
      if (e.code === "Enter") {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
    });
  });
  
  
  const trigger = [
    //0
    ["hi", "hey", "hello"],
    //1
    ["how are you", "how are things"],
    //2
    ["what is going on", "what is up"],
    //3
    ["happy", "good", "well", "fantastic", "cool"],
    //4
    ["bad", "bored", "tired", "sad"],
    //5
    ["tell me story", "tell me joke"],
    //6
    ["thanks", "thank you"],
    //7
    ["bye", "good bye", "goodbye"],
    //8
    ["skills", "technology", "programming languages"],
    //9
    ["your name", "what is your name", "name"],
    //10
    ["college","college name"],
  //11
    ["cgpa","college percentage"],
    //12
    ["internship","inplant training"],
  //13
    ["class12","class12 mark","class 12 percentage"],
    //14
    ["class10","class10 mark","class 10 percentage"],
    //15
    ["school","school name"],
    //16
    ["are you single","committed","lover","girlfriend"],
    //17
    ["friends","close ones","friend","best ones"],
    
    
  ];
  
  const reply = [
    //0
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    //1
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?",
    ],
    //2
    ["Nothing much", "Exciting things!"],
    //3
    ["Glad to hear it"],
    //4
    ["Why?", "Cheer up buddy"],
    //5
    ["What about?", "Once upon a time..."],
    //6
    ["You're welcome", "No problem"],
    //7
    ["Goodbye", "See you later"],
    //8
    ["Java,Html5,CSS3,JavaScript,Php,MySQL,jQuery","Java,Html5,CSS3,JavaScript,Php,MySQL,jQuery","Java,Html5,CSS3,JavaScript,Php,MySQL,jQuery"],
    //9
    ["I'm Natasha😊", "Natasha😊"],
    //10
    ["Panimalar institute of Technology[PIT]","PIT"],
    //11
    ["8.4","84%"],
    //12
    ["Ciarpro Tech Pvt Limited,Megam Solution,Oneyes Technologies"],
    //13
    ["6.4","64%"],
    //14
    ["8.8","88%"],
    //15
    ["AV Nagai","Amirta Vidyalayam Nagai"],
    //16
    ["Single!!Ready to Mingle❤️","Single","Happy😊"],
    //17
    ["ASH","Abishek,Shylu,Haridha","Evane,Eruma,Minion"]
    
  ];
  
  const alternatives = [
    "Same",
    "Go on...",
    "Try again",
    "I'm listening...",
    "Bro...",
  ];
  const suggestion = [
    //0
    ["hi", "what is going on", "school"],
    //1
    ["your name","are you single?","Skils"],
    ["Class12","Class10","College"],
    ["Friends","Internship","cgpa"],
  
  ];
  
  function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    if (compare(trigger, reply, text)) {
      // Search for exact match in triggers
      product = compare(trigger, reply, text);
    } else {
      product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
  
    addChatEntry(input, product);
  }
  
  function compare(utterancesArray, answersArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < utterancesArray.length; x++) {
      for (let y = 0; y < utterancesArray[x].length; y++) {
        if (utterancesArray[x][y] === string) {
          let replies = answersArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) {
        break;
      }
    }
    return reply;
  }
  
  function addChatEntry(input, product) {
    const messagesContainer = document.getElementById("messages");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "chat-box-send";
    userDiv.innerHTML = `<p class="user">${input}</p>`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "chat-box-body-receive";
    botText.className = "Assistant";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
  
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
    if(count<suggestion.length){
    
    suggestionbox(count);
    }
  }
  
  function addSuggestion(arrValue){
    if (document.getElementById('wrap')){
      var elem = document.getElementById('wrap');
      elem.parentNode.removeChild(elem);
  }
    const suggestionContainer = document.getElementById("suggestion");
    let sugDiv = document.createElement("div");
   
    
    
      for(let b=0; b<arrValue.length;b++){
        let sugText = document.createElement("span");
        sugDiv.className="sugWrapper";
        sugDiv.id="wrap";
        sugText.className="sugText";
        sugText.innerText=arrValue[b];
        sugText.onclick = (e) => output(e.target.textContent)
        // sugText.addEventListener("click",output("hii"));
        sugDiv.appendChild(sugText);
    }
    suggestionContainer.appendChild(sugDiv);
    count=count+1;
  
   
   
    
  }
  
  
  function suggestionbox(count){
    addSuggestion(suggestion[count]);
    
  }
  