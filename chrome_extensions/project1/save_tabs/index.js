let myTabs = []
const inputEl = document.getElementById("inputEl");
const inputBtn = document.getElementById("inputBtn");
const ulEl = document.getElementById("ulEl");
ulEl.style.listStyleType = "none";
const deleteBtn = document.getElementById("deleteBtn");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myTabs") );
const tabBtn = document.getElementById("tabBtn");

if (leadsFromLocalStorage) {
    myTabs = leadsFromLocalStorage;
    display(myTabs);
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){   // chrome api
        let newUrl = tabs[0].url ;
        if(myTabs.includes(newUrl)){
                // do nothing

        }else{  // do below work
            myTabs.push(newUrl) ;
            localStorage.setItem("myTabs", JSON.stringify(myTabs) );
            display([newUrl]);
        }
        
    })
})

function display(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        let liEl = document.createElement("li");
        let aEl = document.createElement("a");
        aEl.href = tabs[i];
        aEl.target = "_blank";
        aEl.textContent = tabs[i]; 
        liEl.appendChild(aEl);
        ulEl.appendChild(liEl);
        
    }
    
}

deleteBtn.addEventListener("dblclick", function() {  // double click to delete all
    localStorage.clear()
    myTabs = [] ;
    ulEl.textContent = "";
    display(myTabs)
})

inputBtn.addEventListener("click", function() {
    if(inputBtn.value !== null){
    ulEl.textContent = "";
    myTabs.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myTabs", JSON.stringify(myTabs) )
    display(myTabs)
    }
})