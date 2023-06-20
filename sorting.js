//main code for display.html

outputdiv=document.getElementById("output");

function main(choice,s,bn){
    cleartext();
    let ar=makeintoarray(s);
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
            bucket(ar,bn);
            break;
        default:
            break;
    }
    addtext('Final sorted array: ');
    print(ar);
}

function mergesort(ar,left,mid,right){
    let half1=[];
    let half2=[];
    let half1length=mid-left+1;
    let half2length=right-mid;
    for(let i=0;i<half1length;i++){half1.push(ar[left+i]);}
    for(let i=0;i<half2length;i++){half2.push(ar[mid+i+1]);}
    let i=0;
    let j=0;
    let k=left;
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
    let mid=Math.floor((begin+end)/2);
    merge(ar,begin,mid,step+1);
    merge(ar,mid+1,end,step+1);
    mergesort(ar,begin,mid,end);
    print(ar);
    printsortedportionmerge(countspacesmerge(ar,begin),countmiddleunderscores(ar,begin,end));
    appendtext(" this recursive call is "+step+" level(s) deep");
}

function insertionwithoutmessages(ar){
    for(let i=1;i<ar.length;i++){
        let key=ar[i];
        let j=i-1;
        while(j>=0&&ar[j]>key){
            ar[j+1]=ar[j];
            j--;
        }
        ar[j+1]=key;
    }
}

function insertion(ar){
    for(let i=1;i<ar.length;i++){
        let key=ar[i];
        let j=i-1;
        while(j>=0&&ar[j]>key){
            ar[j+1]=ar[j];
            j--;
        }
        let temp=ar[j+1];
        ar[j+1]=key;
        print(ar);
        printsortedportion(countspaces(ar,i));
        if(key!==temp) {
            appendtext(key+" was the next element in line, and was inserted before "+temp);
        }else{
            appendtext("next element was the largest so far, no insertions were necessary");
        }
    }
}

function selection(ar){
    for(let i=0;i<ar.length;i++){
        let min=i;
        for(let j=i+1;j<ar.length;j++){
            if(ar[min]>ar[j]){
                min=j;
            }
        }
        if(min!==i){
            let temp=ar[min];
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
    for(let i=ar.length-1;i>=0;i--){
        let swap=false;
        for(let j=0;j<i;j++) {
            if(ar[j]>ar[j+1]){
                let temp=ar[j+1];
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
        let pivot=partition(ar,low,high,step);
        quick(ar,low,pivot-1,step+1);
        quick(ar,pivot+1,high,step+1);
    }
}

function partition(ar,low,high,step){
    let pivot=ar[high];
    let i=low-1;
    for(let j=low;j<=high-1;j++){
        if(ar[j]<pivot){
            i++;
            let temp=ar[j];
            ar[j]=ar[i];
            ar[i]=temp;
        }
    }
    let other=ar[i+1];
    ar[i+1]=ar[high];
    ar[high]=other;
    printsameline(ar);
    printsortedportionquick(i+1,ar);
    appendtext("     This recursive call is "+step+" level(s) deep");
    return i+1;
}

function heap(ar){
    addtext("Call heapify to turn array into max heap --> ");
    let n=ar.length;
    for(let i=n/2-1;i>=0;i--){heapify(ar,n,i);}
    print(ar);
    appendtext("Keep calling heapify each time a max element is taken away..");
    for(let j=n-1;j>=1;j--){
        let temp=ar[0];
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
    let max=parent;
    let left=2*parent+1;
    let right=2*parent+2;
    if(left<n&&ar[left]>ar[max]){max=left;}
    if(right<n&&ar[right]>ar[max]){max=right;}
    if(max!==parent){
        let temp=ar[parent];
        ar[parent]=ar[max];
        ar[max]=temp;
        heapify(ar,n,max);
    }
}

function count(ar){
    let max=getmax(ar);
    addtext("This will use the max value of your array as the range...");
    let n=ar.length;
    let output = Array(n).fill(0);
    addtext("Output array initialized as ---> ");
    print(output);
    let count = Array(max+1).fill(0);
    addtext("Count array initialized as ---> ");
    print(count);
    for(let i=0;i<n;i++){count[ar[i]]++;}
    addtext("Count updated with frequency of each index ---> ");
    print(count);
    for(let j=1;j<=max;j++){count[j]+=count[j-1];}
    addtext("Count updated with index of each index --> ");
    print(count);
    for(let k=n-1;k>=0;k--){
        appendtext("Placing "+ar[k]+" into output array");
        output[count[ar[k]]-1]=ar[k];
        count[ar[k]]--;
        addtext("Output is now --> ");
        printsameline(output);
        addtext("  Count is now --> ");
        print(count);
    }
    for (let l = 0; l < n; l++) {
        ar[l] = output[l];
    }
}

function countsort(ar,exp){
    let n=ar.length;
    let output=Array(n).fill(0);
    let count=Array(10).fill(0);
    for(let i=0;i<n;i++){count[Math.floor((ar[i]/exp))%10]++;}
    for(let i=1;i<10;i++){count[i]+=count[i-1];}
    for(let i=n-1;i>=0;i--){
        output[count[Math.floor((ar[i]/exp))%10]-1]=ar[i];
        count[Math.floor((ar[i]/exp))%10]--;
    }
    for(let i=0;i<n;i++){ar[i]=output[i];}
}

function radix(ar){
    let step=1;
    let m=getmax(ar);
    for(let exp=1;Math.floor(m/exp)>0;exp*=10){
        countsort(ar,exp);
        printsameline(ar);
        appendtext("<--- iteration "+step+" called counting sort on the "+exp+"'s digit");
        step++;
    }
}

function bucket(ar,bn){
    let buckets=parseInt(bn);
    let max=getmax(ar);
    let min=getmin(ar);
    if(buckets<=0){
        buckets=Math.floor(Math.sqrt(ar.length));
    }
    let rnge=(max-min)/buckets;
    let all=[];
    for(let x=0;x<buckets;x++){
        let temp=[]
        all.push(temp);
    }
    for(let i=0;i<ar.length;i++){
        let diff=(ar[i]-min)/rnge-Math.floor((ar[i]-min)/rnge);
        if(diff===0&&ar[i]!==min){
            all[Math.floor((ar[i]-min)/rnge)-1].push(ar[i]);
        }else{
            all[Math.floor((ar[i]-min)/rnge)].push(ar[i]);
        }
    }
    appendtext("Number of buckets used: "+buckets);
    appendtext("Sorting elements of specific ranges into buckets:");
    for(let j=0;j<all.length;j++){
        let bucketnum=j+1;
        addtext("Bucket "+bucketnum+": ");
        print(all[j]);
    }
    for(let j=0;j<all.length;j++){
        if(all[j].length!==0){
            insertionwithoutmessages(all[j]);
        }
    }
    appendtext("Sort each bucket with insertion sort, and concatenate into one array");
    let k=0;
    for(const l of all){
        if(l.length!==0){
            for(const i of l){
                ar[k]=i;
                k++;
            }
        }
    }
}

function countspacesmerge(ve,index){
    let count=0;
    for(let i=0;i<index;i++){
        let element=ve[i].toString();
        count+=element.length;
    }
    count+=index;
    return count;
}

function countspacesbubble(ve,index){
    let count=0;
    for(let i=0;i<=index-1;i++){
        let element=ve[i].toString();
        count+=element.length;
    }
    count+=index+1;
    return count;
}

function countspaces(ve,index){
    let count=0;
    for(let i=0;i<=index;i++){
        let element=ve[i].toString();
        count+=element.length;
    }
    count+=index;
    return count;
}

function counttotalspaces(ve){
    let count=0;
    for(let i=0;i<ve.length;i++){
        let element=ve[i].toString();
        count+=element.length;
    }
    count+=ve.length-1+2;//-1 because there will be 1 less comma than elements, +2 for the 2 brackets
    return count;
}

function counttotalspacesquick(ve){
    let count=0;
    for(let i=0;i<ve.length;i++){
        let element=ve[i].toString();
        count+=element.length;
    }
    count+=ve.length-1+2;//-1 because there will be 1 less comma than elements, +2 for the 2 brackets
    return count;
}

function countmiddleunderscores(ve,start,end){
    let count=0;
    for(let i=start;i<=end;i++){
        let element=ve[i].toString();
        count+=element.length;
    }
    count+=end-start;
    return count;
}

function printsortedportionmerge(blanks,range){
    for(let i=0;i<blanks;i++){
        addtext('&nbsp;');
    }
    addtext('|');
    for(let i=0;i<range;i++){
        addtext('_');
    }
    addtext("| <-segment just sorted... ");
}

function printsortedportionbubble(index,ve){
    let totalchars=counttotalspaces(ve);
    let spacestoindex=countspacesbubble(ve,index);
    let sortedduration=totalchars-spacestoindex;
    for(let i=1;i<spacestoindex;i++){
        addtext('&nbsp;');
    }
    addtext("|");
    for(let i=1;i<sortedduration;i++){
        addtext("_");
    }
    addtext("| <-sorted portion... ");
}

function printsortedportionquick(index,ve){
    let totalchars=counttotalspacesquick(ve)-2; //-2 to subtract the brackets
    let spacestoindex=countspacesbubble(ve,index)-2; //-2 to subtract the two |'s
    let spacesuptopivot=countspacesbubble(ve,index+1)-2;
    let pivotspaces=spacesuptopivot-spacestoindex-1;
    let afterpiv=totalchars-spacesuptopivot-1;
    appendtext(" <-- Pivot is "+ve[index]+", numbers greater than it placed to the left, smaller to the right");
    if(index!==0){addtext("|");}
    else{spacestoindex++;}
    for(let i=1;i<=spacestoindex;i++){addtext("_");}
    addtext("|");
    for(let k=1;k<=pivotspaces;k++){addtext('&nbsp');}
    addtext("|");
    for(let i=1;i<=afterpiv;i++){addtext("_");}
    if(index!==ve.length-1){addtext("|");}
}

function printsortedportion(index){
    addtext('|');
    for(let i=0;i<index;i++){
        addtext('_');
    }
    addtext("| <-sorted portion... ");
}

function getmax(ar){
    let mx=ar[0];
    for(const i of ar){
        if(i>mx){
            mx=i;
        }
    }
    return mx;
}

function getmin(ar){
    let mn=ar[0];
    for(const i of ar){
        if(i<mn){
            mn=i;
        }
    }
    return mn;
}

function print(ar){
    if(ar.length===0){
        appendtext("[]");
        return;
    }
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
    for(let x=0;x<ar.length-1;x++){
        addtext(ar[x]+",");
    }
    addtext(ar[ar.length-1]+"]");
}

function makeintoarray(s){
    let stnum=s.split(" ");
    let real=stnum.map(Number);
    return real;
}

function appendtext(text){
    outputdiv.innerHTML+=text+'<br>';
}

function addtext(text){
    outputdiv.innerHTML+=text;
}

function cleartext(){
    outputdiv.innerHTML='';
}

function toggleTextInput() {
  let selectElement = document.getElementById("algos");
  let textInputContainer = document.getElementById("numbuckets");
  if (selectElement.value === "bucket") {
    textInputContainer.classList.remove("hidden");
  } else {
    textInputContainer.classList.add("hidden");
  }
}