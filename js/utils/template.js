export function template(temp, data) {
    let res = temp.replace(/{{(.*?)}}/g, (match, name) => {
        let key = name.trim();
        return data[key];
    });
    return res;
}