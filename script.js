const sample =  `
S3    M1      M2
S3    M1      M3
S3    M1      M4
S3    M2      M5
S3    M3      M6
S3    M4      M7
S3    M2      M8
S3    M2      M9
`

function modify(from, to, tree){
    for(const n in tree){
	if(n===from){
	    tree[n][to] = {};
	    return true;
	}
	if(n===to){
	    tree[from] = tree[n];
	    delete tree[n];
	    return true;
	}
	modify(from, to, tree[n]);
    }
    return false;
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
    const toProcess = input.split(`\n`).map(s=>s.replace(/\s+/g, ' ')).filter(x=>x).map(v=>v.split(' '));
    while(toProcess.length){
	const [_, from, to] = toProcess.shift();
	const addedToExisting = modify(from, to, tree);
	if(!addedToExisting){
	    tree[from] = {[to]: {}};
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


//transform(sample);
