function returnResults() {  
    var results = document.getElementById("numResults").value;
    var error = document.getElementById("tooMany");

    if(results == "" || results == null || results < 0) error.innerHTML = "Quit foolin' around son!";
    else {
        var list = document.getElementById("myList");
        while(list.firstChild) list.removeChild(list.firstChild);

        fetch("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=3f35ade65ef74d3494b779ad65cc8876").then(function(response) {
            response.text().then(function(text) {
                var json = JSON.parse(text);
                var articles = json.articles;
                var numArticles = articles.length;
                if(results > numArticles) error.innerHTML = "Sorry, there aren't enough articles!";
                else {
                    error.innerHTML = "";
                    for(var i = 0; i < results; i++) {
                        var node = document.createElement("LI");
                        var a = document.createElement("a");

                        a.textContent = articles[i].title;
                        a.setAttribute("href", articles[i].url);
                        node.appendChild(a);
                        list.appendChild(node);  
                    }
                }
            });
        });
    }
}

setInterval(returnResults, 300000);