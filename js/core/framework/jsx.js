const placeholder = `__jsxPlaceholder${Date.now()}`;

export const types = {
    element: 'element',
    value: 'value',
    props: 'props',
}

const jsx = (splits, ...values) => {
    let root = parseElement(splits.join(placeholder), values);
    
    return root;
}

function parseElement(str, values) {
    let match = str.match(/(<.*?>|[^<]+)\s*/g);
    const node = {
        type: types.element,
        props: {},
        children: [],
    }
    
    let parentTag = match[0].match(/<(\w+)/);
    
    if (!parentTag) {
        return parseValue(match[0], values);
    }

    node.tag = parentTag[1] === placeholder ? values.shift() : parentTag[1];
    node.name = parentTag[1];
    node.props = parseProps(match[0], values);
    if (match.length === 1) {
        return node;
    }
    
    match = match.slice(1, match.length - 1);

    let slicesHTML = parseChildren(match);

    let children = slicesHTML.map((child) => parseElement(child, values));
    
    children = [].concat(...children);

    children = children.filter(item => Object.getOwnPropertyDescriptor(item, 'value') ? getRidOfSpace(item.value) : item )

    node.children = children;

    return node;
}
        
function parseProps(str, values) {
    let attributes = str.match(/(\w+)="(.*?)"/g);

    if (!attributes) {
        return {};
    }

    const props = Object.fromEntries(attributes.map(attribute => {
                let [key, value] = attribute.split("=");
                value = value.slice(1, value.length - 1);
                value = value === placeholder ? values.shift() : concatDynamicParameters(value, values);
                
                return [key, value];
    }));
    
    return props;
}

function concatDynamicParameters(str, values) {
    const lines = str.split(placeholder);
    let text = lines[0];
    for (let i = 1; i < lines.length; i++) {
        let value = values.shift();
        text += value + lines[i];
    }
    return text
}

function parseValue(str, values) {
    let index = 0;
    const children = [];
    
    while (str !== "") {
        let lastIndex = str.indexOf(placeholder);
        
        if (lastIndex >= 0) {
            let childText = str.slice(index, lastIndex);
            
            str = str.slice(childText.length + placeholder.length);

            children.push(createTextElement(childText));
            
            const dynamicValue = values.shift();
            
            if (Array.isArray(dynamicValue)) {
                children.push(...dynamicValue);
            }
            else if (typeof dynamicValue === "object") {
                children.push(dynamicValue);
            }
            else {
                children.push(createTextElement(dynamicValue));
            }

            continue;
        }

        let childText = str.slice(0);
            
        str = str.slice(str.length);
        
        children.push(createTextElement(childText));
    }
    return children;
}

function getRidOfSpace(value) {
    value = value.replace(/\n/gi, '')
    return value.trim();
}

function createTextElement(value) {
    return { type: types.value, props: { nodeValue: value } }
}



function parseChildren (lines) {
    let children = [];
    let count = 0;
    let startingPosition = 0;

    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let tag = line.match(/<(\w+)/);
        let closedTag = line.match(/<\/(\w+)>/);
        let singleTag = line.match(/(?<=\<)[^)]+(?=\/\>)/g);
        
        if(singleTag) {
            if (count >= 1) {
                continue;
            }

            children.push(line);
            startingPosition++;
            continue;
        }
        else if(tag) {
            count++;
        }
        else if (closedTag) {
            count--;
        }

        if (count === 0) {
            const htmlSlice = lines.slice(startingPosition, i + 1);
            startingPosition = i + 1;
            const html = htmlSlice.join('');
            children.push(html);
        }

    }
    
    return children;
}


export default jsx;