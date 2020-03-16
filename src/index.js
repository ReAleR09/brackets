function getEnclosingBracket(symbol, bracketsConfig) {
    for (let i in bracketsConfig) {
        if(bracketsConfig[i][0] === symbol) {
            return bracketsConfig[i][1];
        }
    }
    return null;
}

module.exports = function check(str, bracketsConfig) {
    let stack = [];
    const bracketsQueue = str.split('');

    const openingBrackets = bracketsConfig.map((value) => value[0]);
    const isOpeningBracket = (sym) => openingBrackets.includes(sym);

    const enclosingBrackets = bracketsConfig.map((value) => value[1]);
    const isEnclosingBracket = (sym) => enclosingBrackets.includes(sym);

    for(let index in bracketsQueue) {
        // current symbol
        const symbol = bracketsQueue[index];

        // if stack is empty, just add a symbol and continue
        if(stack.length === 0) {
            stack.push(symbol);
            continue;
        }
        
        // first we check if current bracket can pair the previous one
        if(isEnclosingBracket(symbol)) { // current symbol is an enclosing bracket
            const prevBracket = stack[stack.length - 1];

            // finding an enclosing pair for the top of the stack
            const prevBracketPair = getEnclosingBracket(prevBracket, bracketsConfig);
            if(prevBracketPair === null) {
                // there is no enclosing pair for the symbol, meaning that the symbol was not declared in the bracketsConfig
                return false;
            }
            
            if(prevBracketPair === symbol) {
                // if current symbol is actually is an enclosing pair to the top of the stack, just removing the top
                stack.pop();
            } else if(isOpeningBracket(symbol)) {
                // if not, but the symbol may be an opening bracket as well, we will add it to the stack
                stack.push(symbol);
            } else {
                // otherwise, invalid closing bracket or invalid symbol, instantly returning false
                return false;
            }

        } else if(openingBrackets.includes(symbol)) {
            // just add to the stack
            stack.push(symbol);
        } else {
            // symbol is not opening bracket nor enclosing, instant false
            return false;
        }

    }

    // empty stack meaning all opening brackets were paired with enclosing brackets in the correct order
    return (stack.length === 0);
}
