//this forces javascript to conform to some rules, like declaring variables with var
//"use strict";

window.onload = init;

function init(){
    //NHL URL for ESPN RSS feed
    //var url = "http://espn.go.com/espn/rss/nhl/news";
    //var url = "http://espn.go.com/espn/rss/nfl/news";
    //var url = "http://espn.go.com/espn/rss/nba/news"; //USE ESPN LINKS

    var urls = new Array();
    var stringUrl = "Checked: ";

    $('input[type=checkbox]').each(function () {
        if(this.checked) {
            urls.push(this.value);
            stringUrl += this.name + " ";
        }
    });

    console.log(urls);

    document.querySelector("#checked").innerHTML = "<p>" + stringUrl + "</p>";

    document.querySelector("#content").innerHTML = "<b>Loading news...</b>";
    $("#content").fadeOut(250);
    //fetch the data
    urls.forEach(function(url){
        $.get(url).done(function(data){xmlLoaded(data);});
    });
}


function xmlLoaded(obj){
    console.log("obj = " +obj);

    var items = obj.querySelectorAll("item");

    //show the logo
    var image = obj.querySelector("image");
    var logoSrc = image.querySelector("url").firstChild.nodeValue;
    var logoLink = image.querySelector("link").firstChild.nodeValue;
    $("#logo").attr("src",logoSrc);

    //parse the data
    var html = "";
    for (var i=0;i<items.length;i++){
        //get the data out of the item
        var newsItem = items[i];
        var title = newsItem.querySelector("title").firstChild.nodeValue;
        console.log(title);
        var description = newsItem.querySelector("description").firstChild.nodeValue;
        var link = newsItem.querySelector("link").firstChild.nodeValue;
        var pubDate = newsItem.querySelector("pubDate").firstChild.nodeValue;

        //present the item as HTML
        var line = '<div class="item">';
        line += "<h2>"+title+"</h2>";
        line += '<p><i>'+pubDate+'</i> - <a href="'+link+'" target="_blank">See original</a></p>';
        //title and description are always the same (for some reason) so I'm only including one
        //line += "<p>"+description+"</p>";
        line += "</div>";

        html += line;
    }
    document.querySelector("#content").innerHTML = html;

    $("#content").fadeIn(1000);

}