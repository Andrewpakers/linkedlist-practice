import {tree, insert, remove, find, levelOrder, preorder, inorder, postorder, height, depth, isBalanced, rebalance, prettyPrint} from "./binarySearchTree.mjs"

function generateArray() {
    const newArray = [];
    for (let i = 0; i < 21; i++) {
        newArray.push(Math.round(Math.random() * 100));
    }
    return newArray;
}

const test = tree(generateArray());
prettyPrint(test);
console.log(`Is it balanced: ${isBalanced(test)}`);
console.log(`Pre: ${preorder(test)}, Post: ${postorder(test)}, In: ${inorder(test)}`);
insert(test, 999);
insert(test, 9999);
insert(test, 99999);
insert(test, 999999);
insert(test, 9999999);
console.log(`Is it balanced: ${isBalanced(test)}`);
rebalance(test);
console.log(`Is it balanced: ${isBalanced(test)}`);
console.log(`Pre: ${preorder(test)}, Post: ${postorder(test)}, In: ${inorder(test)}`);

