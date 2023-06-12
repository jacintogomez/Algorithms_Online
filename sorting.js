outputdiv=document.getElementById("output");
function main(al,arr){
    if(al==="merge"){
        appendtext(arr);
    }
}
function appendtext(text){
    outputdiv.innerHTML+=text+'<br>';
}