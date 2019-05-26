function get(url){

    var file = new XMLHttpRequest();
    file.open('GET', url, false);
    file.send(null);
    return file.responseText;
}
function convert(unixtimestamp){

    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var date = new Date((unixtimestamp) * 1000);
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var converted;
    if(minutes < 10){
        converted = day+'.'+month+'.'+year+' '+hours+':0'+minutes;
    }else converted = day+'.'+month+'.'+year+' '+hours+':'+minutes;
    return converted;      
}


var jsonObj = JSON.parse(get('https://www.reddit.com/r/funny.json'));
var x = jsonObj.data.children;
posts = new Array();

for(d in x){
    posts[d] = new Object();
    posts[d].title = x[d].data.title;
    posts[d].upvotes = x[d].data.ups;
    posts[d].downvotes = x[d].data.downs;
    posts[d].score = x[d].data.score;
    posts[d].num_comments = x[d].data.num_comments;
    posts[d].created = convert(x[d].data.created_utc);
    posts[d].date = x[d].data.created_utc;
}

var p = {
    "posts": posts,
    "count": posts.length
}

document.getElementById('test').innerHTML= "";

for(d in posts){
    document.getElementById('test').innerHTML += "<b>TITLE:</b> " + p.posts[d].title + ", <b>UPVOTES:</b> " + p.posts[d].upvotes + ", <b>DOWNVOTES:</b> " +  p.posts[d].downvotes + 
        ", <b>SCORE:</b> " + p.posts[d].score + ", <b>NUM_COMMENTS:</b> " + p.posts[d].num_comments + ", <b>CREATED:</b> " + p.posts[d].created + '</br>';
} 
   
    
function sort(x){

        return function(a, b){
            if(a[x] < b[x]){
                return 1;
            }else if(a[x] > b[x]){
                return -1;
            }
            return 0;
        }
}

function przycisk(a){

    p.posts.sort(sort(a));
    document.getElementById('test').innerHTML= "";
    
    for(d in posts){
        document.getElementById('test').innerHTML += "<b>TITLE:</b> " + p.posts[d].title + ", <b>UPVOTES:</b> " + p.posts[d].upvotes + ", <b>DOWNVOTES:</b> " +  p.posts[d].downvotes + 
      ", <b>SCORE:</b> " + p.posts[d].score + ", <b>NUM_COMMENTS:</b> " + p.posts[d].num_comments + ", <b>CREATED:</b> " + p.posts[d].created + '</br>';
    }
}
function showLatest(){

    document.getElementById('test').innerHTML= "";

    for(d in posts){

        if(p.posts[d].date < (new Date().getTime()/1000) &&  p.posts[d].date > ((new Date().getTime()/1000) - (24 * 60 * 60 ))){
        document.getElementById('test').innerHTML += "<b>TITLE:</b> " + p.posts[d].title + ", <b>UPVOTES:</b> " + p.posts[d].upvotes + ", <b>DOWNVOTES:</b> " +  p.posts[d].downvotes + 
      ", <b>SCORE:</b> " + p.posts[d].score + ", <b>NUM_COMMENTS:</b> " + p.posts[d].num_comments + ", <b>CREATED:</b> " + p.posts[d].created + '</br>';
        }else document.getElementById('test').innerHTML += "";

    }
    
}
function upsDownsRatio(){

    p.posts.sort(sort('date'));
    ratio = new Array();
    for(d in posts){
        ratio[d] = Object();
        if(p.posts[d].downvotes != 0){
            ratio[d].val = p.posts[d].upvotes / p.posts[d].downvotes ;
            ratio[d].title = p.posts[d].title; 
        }else{
            ratio[d].val = p.posts[d].upvotes;
            ratio[d].title = p.posts[d].title; 
        }  
    }
    ratio.sort(sort('val'));
    document.getElementById('info2').innerHTML += '<b>TITLE:</b> ' + ratio[0].title;
}
upsDownsRatio();
