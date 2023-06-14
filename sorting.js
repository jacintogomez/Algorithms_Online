//main code for display.html

outputdiv=document.getElementById("output");

function main(choice,s){
    var ar=makeintoarray(s);
    appendtext('');
    switch(choice){
        case 'merge':
            merge(ar,0,ar.length-1,0);
            break;
        case 'insert':
            insertion(ar);
            break;
        case 'select':
            selection(ar);
            break;
        case 'bubble':
            bubble(ar);
            break;
        case 'quick':
            quick(ar,0,ar.length-1,0);
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

function insertion(ar){
    for(var i=1;i<ar.length;i++){
        var key=ar[i];
        var j=i-1;
        while(j>=0&&ar[j]>key){
            ar[j+1]=ar[j];
            j--;
        }
        var temp=ar[j+1];
        ar[j+1]=key;
        print(ar);
        printsortedportion(countspaces(ar,i));
        if(key!==temp) {
            appendtext(key+" was the next element in line, and was inserted before ");
        }else{
            appendtext("next element was the largest so far, no insertions were necessary");
        }
    }
}

function selection(ar){
    for(var i=0;i<ar.length;i++){
        var min=i;
        for(var j=i+1;j<ar.length;j++){
            if(ar[min]>ar[j]){
                min=j;
            }
        }
        if(min!==i){
            var temp=ar[min];
            ar[min]=ar[i];
            ar[i]=temp;
        }
        print(ar);
        printsortedportion(countspaces(ar,i));
        if(ar[min]!==ar[i]){
            appendtext(" the next largest was "+ar[i]+" and was swapped with "+ar[min]);
        }else{
            appendtext(" "+ar[min]+" happened to be the next smallest, so no swap occurred");
        }
    }
}

function bubble(ar){
    for(var i=ar.length-1;i>=0;i--){
        var swap=false;
        for(var j=0;j<i;j++) {
            if(ar[j]>ar[j+1]){
                var temp=ar[j+1];
                ar[j+1]=ar[j];
                ar[j]=temp;
                swap=true;
            }
        }
        print(ar);
        printsortedportionbubble(i,ar);
        if(swap) {
            appendtext(" " + ar[i] + " was the next largest, and was moved up to the end");
        }else{
            appendtext(" next largest element "+ar[i]+" was already in sorted position");
        }
    }
}

function quick(ar,low,high,step){
    if(low<high){
        var pivot=partition(ar,low,high,step);
        quick(ar,low,pivot-1,step+1);
        quick(ar,pivot+1,high,step+1);
    }
}

function partition(ar,low,high,step){
    var pivot=ar[high];
    var i=low-1;
    for(var j=low;j<=high-1;j++){
        if(ar[j]<pivot){
            i++;
            var temp=ar[j];
            ar[j]=ar[i];
            ar[i]=temp;
        }
    }
    var other=ar[i+1];
    ar[i+1]=ar[high];
    ar[high]=other;
    printsameline(ar);
    printsortedportionquick(i+1,ar);
    appendtext("     This recursive call is "+step+" level(s) deep");
    return i+1;
}

function heap(ar){
    addtext("Call heapify to turn array into max heap --> ");
    var n=ar.length;
    for(var i=n/2-1;i>=0;i--){heapify(ar,n,i);}
    print(ar);
    appendtext("Keep calling heapify each time a max element is taken away..");
    for(var j=n-1;j>=1;j--){
        var temp=ar[0];
        ar[0]=ar[j];
        ar[j]=temp;
        printsameline(ar);
        appendtext("   Switched heap root "+temp+" with last leaf "+ar[0]+", then call heapify on new root");
        heapify(ar,j,0);
        print(ar);
        printsortedportionbubble(j,ar);
        appendtext(ar[j]+" removed from heap");
    }
}

function heapify(ar,n,parent){
    var max=parent;
    var left=2*parent+1;
    var right=2*parent+2;
    if(left<n&&ar[left]>ar[max]){max=left;}
    if(right<n&&ar[right]>ar[max]){max=right;}
    if(max!==parent){
        var temp=ar[parent];
        ar[parent]=ar[max];
        ar[max]=temp;
        heapify(ar,n,max);
    }
}

function count(ar){
    var max=getmax(ar);
    addtext("This will use the max value of your array as the range...");
    var n=ar.length;
    var output = Array(n).fill(0);
    addtext("Output array initialized as ---> ");
    print(output);
    var count = Array(max+1).fill(0);
    addtext("Count array initialized as ---> ");
    print(count);
    for(var i=0;i<n;i++){count[ar[i]]++;}
    addtext("Count updated with frequency of each index ---> ");
    print(count);
    for(var j=1;j<=max;j++){count[j]+=count[j-1];}
    addtext("Count updated with index of each index --> ");
    print(count);
    for(var k=n-1;k>=0;k--){
        appendtext("Placing "+ar[k]+" into output array");
        output[count[ar[k]]-1]=ar[k];
        count[ar[k]]--;
        addtext("Output is now --> ");
        printsameline(output);
        addtext("  Count is now --> ");
        print(count);
    }
    for (var l = 0; l < n; l++) {
        ar[l] = output[l];
    }
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

function countspacesbubble(ve,index){
    var count=0;
    for(var i=0;i<=index-1;i++){
        var element=ve[i].toString();
        count+=element.length;
    }
    count+=index+1;
    return count;
}

function countspaces(ve,index){
    var count=0;
    for(var i=0;i<=index;i++){
        var element=ve[i].toString();
        count+=element.length;
    }
    count+=index;
    return count;
}

function counttotalspaces(ve){
    var count=0;
    for(var i=0;i<ve.length;i++){
        var element=ve[i].toString();
        count+=element.length;
    }
    count+=ve.length-1+2;//-1 because there will be 1 less comma than elements, +2 for the 2 brackets
    return count;
}

function counttotalspacesquick(ve){
    var count=0;
    for(var i=0;i<ve.length;i++){
        var element=ve[i].toString();
        count+=element.length;
    }
    count+=ve.length-1+2;//-1 because there will be 1 less comma than elements, +2 for the 2 brackets
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

function printsortedportionbubble(index,ve){
    var totalchars=counttotalspaces(ve);
    var spacestoindex=countspacesbubble(ve,index);
    var sortedduration=totalchars-spacestoindex;
    for(var i=1;i<spacestoindex;i++){
        addtext('&nbsp;');
    }
    addtext("|");
    for(var i=1;i<sortedduration;i++){
        addtext("_");
    }
    addtext("| <-sorted portion... ");
}

function printsortedportionquick(index,ve){
    var totalchars=counttotalspacesquick(ve)-2; //-2 to subtract the brackets
    var spacestoindex=countspacesbubble(ve,index)-2; //-2 to subtract the two |'s
    var spacesuptopivot=countspacesbubble(ve,index+1)-2;
    var pivotspaces=spacesuptopivot-spacestoindex-1;
    var afterpiv=totalchars-spacesuptopivot-1;
    appendtext(" <-- Pivot is "+ve[index]+", numbers greater than it placed to the left, smaller to the right");
    if(index!==0){addtext("|");}
    else{spacestoindex++;}
    for(var i=1;i<=spacestoindex;i++){addtext("_");}
    addtext("|");
    for(var i=1;i<=pivotspaces;i++){addtext(" ");}
    addtext("|");
    for(var i=1;i<=afterpiv;i++){addtext("_");}
    if(index!==ve.length-1){addtext("|");}
}

function printsortedportion(index){
    addtext('|');
    for(var i=0;i<index;i++){
        addtext('_');
    }
    addtext("| <-sorted portion... ");
}

function getmax(ar){
    var mx=ar[0];
    for(const i of ar){
        if(i>mx){
            mx=i;
        }
    }
    return mx;
}

function getmin(ar){
    var mn=ar[0];
    for(const i of ar){
        if(i<mn){
            mn=i;
        }
    }
    return mn;
}

function print(ar){
    addtext('[');
    for(let x=0;x<ar.length-1;x++){
        addtext(ar[x].toString()+' ');
    }
    appendtext(ar[ar.length-1].toString()+']');
}

function printsameline(ar){
    if(ar.length===0){
        addtext("[]");
        return;
    }
    addtext("[");
    for(var x=0;x<ar.length-1;x++){
        addtext(ar[x]+",");
    }
    addtext(ar[ar.length-1]+"]");
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