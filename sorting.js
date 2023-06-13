//main code for display.html

outputdiv=document.getElementById("output");

function main(choice,s){
    var ar=makeintoarray(s);
    appendtext('');
    switch(choice){
        case 'merge':
            merge(ar,0,ar.length-1,0);
            print(ar);
            break;
        case 'insert':
            insert(ar);
            break;
        case 'select':
            select(ar);
            break;
        case 'bubble':
            bubble(ar);
            break;
        case 'quick':
            quick(ar);
            break;
        case 'heap':
            heap(ar);
            break;
        case 'count':
            count(ar);
            break;
        case 'radix':
            radix(ar);
            break;
        case 'bucket':
            bucket(ar);
            break;
        default:
            break;
    }
    addtext('Final sorted array: ');
    print(ar);
}

function mergesort(ar,left,mid,right){
    var half1=[];
    var half2=[];
    var half1length=mid-left+1;
    var half2length=right-mid;
    for(var i=0;i<half1length;i++){half1.push(ar[left+i]);}
    for(var i=0;i<half2length;i++){half2.push(ar[mid+i+1]);}
    var i=0;
    var j=0;
    var k=left;
    while(i<half1length&&j<half2length){
        if(half1[i]<=half2[j]){
            ar[k]=half1[i];
            i++;
        }else{
            ar[k]=half2[j];
            j++;
        }
        k++;
    }
    while(i<half1length){
        ar[k]=half1[i];
        i++;
        k++;
    }
    while(j<half2length){
        ar[k]=half2[j];
        j++;
        k++;
    }
}

function merge(ar,begin,end,step){
    if(begin>=end){return;}
    var mid=Math.floor((begin+end)/2);
    merge(ar,begin,mid,step+1);
    merge(ar,mid+1,end,step+1);
    mergesort(ar,begin,mid,end);
    print(ar);
    printsortedportionmerge(countspacesmerge(ar,begin),countmiddleunderscores(ar,begin,end));
    appendtext(" this recursive call is "+step+" level(s) deep");
}

function countspacesmerge(ve,index){
    var count=0;
    for(var i=0;i<index;i++){
        var element=ve[i].toString();
        count+=element.length;
    }
    count+=index;
    return count;
}

function countmiddleunderscores(ve,start,end){
    var count=0;
    for(var i=start;i<=end;i++){
        var element=ve[i].toString();
        count+=element.length;
    }
    count+=end-start;
    return count;
}

function printsortedportionmerge(blanks,range){
    for(var i=0;i<blanks;i++){
        addtext('&nbsp;');
    }
    addtext('|');
    for(var i=0;i<range;i++){
        addtext('_');
    }
    addtext("| <-segment just sorted... ");
}

function print(ar){
    addtext('[');
    for(let x=0;x<ar.length-1;x++){
        addtext(ar[x].toString()+' ');
    }
    appendtext(ar[ar.length-1].toString()+']');
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