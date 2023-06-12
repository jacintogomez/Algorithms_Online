//main code for display.html

outputdiv=document.getElementById("output");

function main(choice,s){
    var ar=makeintoarray(s);
    switch(choice){
        case 'merge':
            print(ar);
            merge(ar);
        case 'insert':
            insert(ar);
    }
}

function print(ar){
    addtext('[');
    for(let x=0;x<ar.length;x++){
        addtext(ar[x].toString()+' ');
    }
    appendtext(']');
}

function makeintoarray(s){
    var real=[];
    for(let x=0;x<s.length;x+=2){
        real.push(parseInt(s[x]));
    }
    return real;
}

function appendtext(text){
    outputdiv.innerHTML+=text+'<br>';
}

function addtext(text){
    outputdiv.innerHTML+=text;
}