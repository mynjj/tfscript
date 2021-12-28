/*
const sample =  `
 S3    M1      M2
 S3    M5      M10
 S3    M1      M3
 S3    M1      M4
 S3    M2      M5
 S3    M3      M6
 S3    M4      M7
 S3    M2      M8
 S3    M2      M9
 S3   M2     M12
`
*/
const sample =  `
 S3    M1      M2
 S3    M5      M10
S3    M2      M5
`

function modify(from, to, tree, how={}){
    //let fromQ = null;
    //let toQ = null;
    let modified = false;
    for(const n in tree){
	if(n===from){
	    //tree[n][to] = {};
	    //fromQ = n;
	    console.log('a');
	    modified = true;
	    how.fromQ = n;
	    //return true;
	}
	if(n===to){
	    //tree[from] = tree[n];
	    //delete tree[n];
	    //toQ = n;
	    console.log('b');
	    modified = true;
	    how.toQ = n;
	    //return true;
	}
	if(modify(from, to, tree[n], how)){
	    console.log('c');
	    modified = true;
	    //return true;
	}
	//if(modified) break;
    }
    if(how.fromQ && how.toQ){
	console.log(1, how.fromQ, how.toQ);
	tree[how.fromQ][to] = tree[how.toQ];
	delete tree[how.toQ];
    }
    else if(how.fromQ){
	console.log(2, how.fromQ);
	tree[how.fromQ][to] = {};
    }
    else if(how.toQ){
	console.log(3, how.toQ);
	tree[from] = tree[how.toQ];
	delete tree[how.toQ];
    }
    return modified;
    //return false;
}

function printTree(tree, prevPrinted=''){
    if(!Object.keys(tree).length){
	return [prevPrinted];
    }
    let f = 1;
    let allstrs = [];
    for(const n in tree){
	const strs = printTree(tree[n], prevPrinted+`F${f},${n},`);
	allstrs.push(strs.join('<br/>'));
	f++;
    }
    return allstrs;
}

function transform(input){
    let tree = {};
    const toProcess = input.split(`\n`).map(s=>s.replace(/\s+/g, ' ').trim()).filter(x=>x).map(v=>v.split(' '));
    while(toProcess.length){
	const [_, from, to] = toProcess.shift();
	const addedToExisting = modify(from, to, tree);
	if(!addedToExisting){
	    tree[from] = {[to]: {}};
	    console.log('*', JSON.stringify(tree));
	}
    }

    console.log(sample);
    console.log(tree);

    return printTree(tree);
}

function go(){
    const prev = document.getElementById('input').value;
    const toPrint = transform(prev);
    document.getElementById('result').innerHTML = toPrint.join('<br/>');
}


transform(sample);
