const container = document.querySelector('#container');

const containerStyles = {
    setW: null,
}

const globalStyles = {
    textAlign : 'left',
    setFill: ' ',
    font: 'sans-serif',
}

const processText = (utf8Text) => {
    let text = UTF8ToString(utf8Text);
    return text;
}

const pushToPending = (text)=>{
    let line = text;
    pendingText.push(line);
}

window.setGlobalStyles = (key, value,needsParse=false) => {
    globalStyles[key] = (needsParse) ?  UTF8ToString(value) : value;
}

window.setContainerStyles = (key, value,needsParse=false) => {
    containerStyles[key] = (needsParse) ?  UTF8ToString(value) : value;
}

let pendingText = [];

window.buildText = (text) => {
    const lines = processText(text).split('\n');
    
    lines.forEach((line,i) => {
        pushToPending(line);
        if(i === 0 && lines.length > 1) window.newLine();
        else if(i < lines.length - 1) window.newLine();
    });
}

window.buildNumber = (number) => {
    pushToPending(number.toString());
}

window.buildImage = (imageSrc) => {
    const img = document.createElement('img');
    img.src = processText(imageSrc);
    img.style.maxWidth = '50vw';
    img.style.maxHeight = '30vh';
    container.appendChild(img);
}

//When we hit a \n or endl
window.newLine = () => {
    //Pad text to min width depending on text-align
    const line = pendingText.map(text=>{
        //If text as padding, ensure that the alignment is respected
        if(containerStyles.setW !== null){
            if(containerStyles.setW > text.trim().length){
                if(globalStyles.textAlign === 'left'){
                    text = text.padEnd(containerStyles.setW,globalStyles.setFill);
                }else{
                    text = text.padStart(containerStyles.setW,globalStyles.setFill);
                }
            }

            containerStyles.setW = null;
        }
        return text;
    }).join('');

    const text = document.createElement('span');
    text.style.whiteSpace = 'pre';
    text.style.margin = '0';
    text.classList.add(globalStyles.font)
    text.innerText = line;

    const section = document.createElement('section');

    section.appendChild(text);
    section.style.marginBottom = '0.1rem';
    container.appendChild(section);
    //Reset container styles
    pendingText.length = 0;

}

window.buildMarkdown = (text) =>{
    const textParsed = parse(processText(text));
    const section = document.createElement('section');
    section.innerHTML = textParsed;

    container.appendChild(section);
}

window.getInput = () =>{
    newLine();
    const form = document.createElement('form');
    const input = document.createElement('input');

    input.type = 'text';
    input.required = true;
    input.display = 'block'
    input.style.width = '100%'
    input.style.margin = '1rem';

    form.appendChild(input);


    container.appendChild(form);
    input.focus();

    return new Promise((resolve, reject) => {
        form.addEventListener('submit', (event) => {
            form.parentElement.removeChild(form);
            resolve(input.value);
        });
    })
}

window.getNumber = async () =>{
    let num = NaN;
    let numsChecked = 0;

    while(isNaN(num)){
        if(numsChecked > 0) alert('Invalid number, try again');
        num = parseFloat(await window.getInput());
    }

    return num;
}

window.getChar = async () =>{
    let char = '';
    let charsChecked = 0;

    while(char.length !== 1){
        if(charsChecked > 0) alert('Invalid character, try again');
        char = await window.getInput();
    }

    return char.charCodeAt(0);
}


//SNARKDOWN
//https://github.com/developit/snarkdown
const TAGS = {
	'': ['<em>','</em>'],
	_: ['<strong>','</strong>'],
	'*': ['<strong>','</strong>'],
	'~': ['<s>','</s>'],
	'\n': ['<br />'],
	' ': ['<br />'],
	'-': ['<hr />']
};

/** Outdent a string based on the first indented line's leading whitespace
 *	@private
 */
function outdent(str) {
	return str.replace(RegExp('^'+(str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *	@private
 */
function encodeAttr(str) {
	return (str+'').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Parse Markdown into an HTML String. */
function parse(md, prevLinks) {
	let tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,
		context = [],
		out = '',
		links = prevLinks || {},
		last = 0,
		chunk, prev, token, inner, t;

	function tag(token) {
		let desc = TAGS[token[1] || ''];
		let end = context[context.length-1] == token;
		if (!desc) return token;
		if (!desc[1]) return desc[0];
		if (end) context.pop();
		else context.push(token);
		return desc[end|0];
	}

	function flush() {
		let str = '';
		while (context.length) str += tag(context[context.length-1]);
		return str;
	}

	md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, (s, name, url) => {
		links[name.toLowerCase()] = url;
		return '';
	}).replace(/^\n+|\n+$/g, '');

	while ( (token=tokenizer.exec(md)) ) {
		prev = md.substring(last, token.index);
		last = tokenizer.lastIndex;
		chunk = token[0];
		if (prev.match(/[^\\](\\\\)*\\$/)) {
			// escaped
		}
		// Code/Indent blocks:
		else if (t = (token[3] || token[4])) {
			chunk = '<pre class="code '+(token[4]?'poetry':token[2].toLowerCase())+'"><code'+(token[2] ? ` class="language-${token[2].toLowerCase()}"` : '')+'>'+outdent(encodeAttr(t).replace(/^\n+|\n+$/g, ''))+'</code></pre>';
		}
		// > Quotes, -* lists:
		else if (t = token[6]) {
			if (t.match(/\./)) {
				token[5] = token[5].replace(/^\d+/gm, '');
			}
			inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
			if (t=='>') t = 'blockquote';
			else {
				t = t.match(/\./) ? 'ol' : 'ul';
				inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
			}
			chunk = '<'+t+'>' + inner + '</'+t+'>';
		}
		// Images:
		else if (token[8]) {
			chunk = `<img src="${encodeAttr(token[8])}" alt="${encodeAttr(token[7])}">`;
		}
		// Links:
		else if (token[10]) {
			out = out.replace('<a>', `<a href="${encodeAttr(token[11] || links[prev.toLowerCase()])}">`);
			chunk = flush() + '</a>';
		}
		else if (token[9]) {
			chunk = '<a>';
		}
		// Headings:
		else if (token[12] || token[14]) {
			t = 'h' + (token[14] ? token[14].length : (token[13]>'=' ? 1 : 2));
			chunk = '<'+t+'>' + parse(token[12] || token[15], links) + '</'+t+'>';
		}
		// `code`:
		else if (token[16]) {
			chunk = '<code>'+encodeAttr(token[16])+'</code>';
		}
		// Inline formatting: *em*, **strong** & friends
		else if (token[17] || token[1]) {
			chunk = tag(token[17] || '--');
		}
		out += prev;
		out += chunk;
	}

	return (out + md.substring(last) + flush()).replace(/^\n+|\n+$/g, '');
}