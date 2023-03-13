/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
function node(tempValue) {
    const value = tempValue;
    let leftPointer = null; 
    let rightPointer = null;
    let root = null;

    return {value, leftPointer, rightPointer, root}
    
}

function createNode(array, start, end) {
    if (start > end) { return null }
    const mid = Math.round((start + end) / 2);
    const rootNode = node(array[mid]);
    rootNode.leftPointer = createNode(array, start, mid -1);
    rootNode.rightPointer = createNode(array, mid + 1, end)
    if (rootNode.leftPointer !== null) {
        rootNode.leftPointer.root = rootNode;
    }
    if (rootNode.rightPointer !== null) {
        rootNode.rightPointer.root = rootNode;
    }

    return rootNode
}

function buildTree(tempArray) {
    // sort and remove duplicates
    tempArray.sort((a, b) => a - b);
    const array = [...new Set(tempArray)];
    const rootNode = createNode(array, 0, array.length - 1)

    return rootNode
}

export function tree(array) {
    const root = buildTree(array);
    return root
}

export function insert(tempnode, tempvalue) {
    const value = Number(tempvalue);
    const targetNode = tempnode;
    if (value < targetNode.value) {
        if (targetNode.leftPointer === null) {
            targetNode.leftPointer = node(value);
            targetNode.leftPointer.root = targetNode;
        } else {
            insert(targetNode.leftPointer, value);
        }
    } else if (value > targetNode.value) {
        if (targetNode.rightPointer === null) {
            targetNode.rightPointer = node(value);
            targetNode.rightPointer.root = targetNode;
        } else {
            insert(targetNode.rightPointer, value);
        }
    } else {
        return null
    }
}

function getLeftMostChild(tempnode, tempPreviousNode) {
    const targetNode = tempnode;
    const previousNode = tempPreviousNode;
    if (targetNode.leftPointer === null) {
        return {targetNode, previousNode};
    }
    return getLeftMostChild(targetNode.leftPointer, targetNode);
}

export function remove(tempnode, tempvalue, tempPreviousNode = null, isLeft = null) {

    let targetNode = tempnode;
    const previousNode = tempPreviousNode;
    const value = Number(tempvalue);
    if (value < targetNode.value && targetNode.leftPointer !== null) {
        return remove(targetNode.leftPointer, value, targetNode, true);
    } else if (value > targetNode.value && targetNode.rightPointer !== null) {
        return remove(targetNode.rightPointer, value, targetNode, false);
    } else if (value !== targetNode.value) {
        return null
    }else {
        // eslint-disable-next-line no-lonely-if
        if (targetNode.leftPointer === null && targetNode.rightPointer === null) {
            if (previousNode === null) {
                return null;
            }
            if (isLeft) {
                previousNode.leftPointer = null;
                return previousNode
            } else if (isLeft === false) {
                previousNode.rightPointer = null;
                return previousNode
            }
        } else if (targetNode.leftPointer !== null && targetNode.rightPointer === null) {
            if (previousNode === null) {
                return targetNode.leftPointer;
            }
            if (isLeft) {
                previousNode.leftPointer = targetNode.leftPointer;
                if (targetNode.leftPointer !== null) {
                    targetNode.leftPointer.root =  previousNode;
                }
                return previousNode
            } else if (isLeft === false) {
                previousNode.rightPointer = targetNode.leftPointer;
                if (targetNode.leftPointer !== null) {
                    targetNode.leftPointer.root = previousNode;
                }
                return previousNode
            }
        } else if (targetNode.rightPointer !== null && targetNode.leftPointer === null) {
            if (previousNode === null) {
                return targetNode.rightPointer;
            }
            if (isLeft) {
                previousNode.leftPointer = targetNode.rightPointer;
                if (targetNode.rightPointer !== null) {
                    targetNode.rightPointer.root = previousNode;
                }
                return previousNode
            } else if (isLeft === false) {
                previousNode.rightPointer = targetNode.rightPointer;
                if (targetNode.rightPointer !== null) {
                    targetNode.rightPointer.root = previousNode;
                }
                return previousNode
            }
        } else if (targetNode.leftPointer !== null && targetNode.rightPointer !== null) {
            const leftMostNodeObj = getLeftMostChild(targetNode.rightPointer, targetNode);
            const leftMostNode = leftMostNodeObj.targetNode;
            const leftPreviousNode = leftMostNodeObj.previousNode;
            if (previousNode === null) {
                leftPreviousNode.leftPointer = leftMostNode.rightPointer;
                leftMostNode.rightPointer = targetNode.rightPointer;
                leftMostNode.leftPointer = targetNode.leftPointer;
                targetNode.value = leftMostNode.value;
                targetNode.leftPointer = leftMostNode.leftPointer;
                targetNode.rightPointer = leftMostNode.rightPointer;
                targetNode.root = null;
                return leftMostNode;
            }
            if (isLeft) {
                previousNode.leftPointer = leftMostNode;
                leftMostNode.root = previousNode;
                leftMostNode.leftPointer = targetNode.leftPointer;
                leftPreviousNode.leftPointer = leftMostNode.rightPointer;
                leftMostNode.rightPointer = targetNode.rightPointer;

                if (leftMostNode.leftPointer !== null) {
                    leftMostNode.leftPointer.root = leftMostNode;
                }

                if (leftPreviousNode.leftPointer !== null) {
                    leftPreviousNode.leftPointer.root = leftPreviousNode;
                } 
                return previousNode
            } else {
                leftPreviousNode.leftPointer = leftMostNode.rightPointer;
                if (leftPreviousNode.leftPointer) {
                    leftPreviousNode.leftPointer.root = leftPreviousNode;
                }
                leftMostNode.rightPointer = targetNode.rightPointer;
                if (leftMostNode.rightPointer) {
                    leftMostNode.rightPointer.root = leftMostNode;
                }
                leftMostNode.leftPointer = targetNode.leftPointer;
                if (leftMostNode.leftPointer) {
                    leftMostNode.leftPointer.root = leftMostNode;
                }
                previousNode.rightPointer = leftMostNode;
                leftMostNode.root = previousNode;
                return previousNode
            }
        }
    }
    console.log('error');
    return null
}

export function find(tempnode, tempvalue) {
    const targetNode = tempnode;
    const value = Number(tempvalue);
    if (targetNode === null) {
        return null
    }
    if (targetNode.value === value) {
        return targetNode
    } else if (value < targetNode.value) {
        return find(targetNode.leftPointer, value);
    } else if (value > targetNode.value) {

        return find(targetNode.rightPointer, value);
    }
    return null
}

function levelOrderNoFunction(tempNode) {
    const arrayOfValues = [];
    const targetNode = tempNode;
    const queue = [];
    queue.push(targetNode);

    for (let i = 0; i < queue.length; i++) {
        arrayOfValues.push(queue[i].value)
        if (queue[i].leftPointer !== null) {
            queue.push(queue[i].leftPointer);
        }
        if (queue[i].rightPointer !== null) {
            queue.push(queue[i].rightPointer);
        }
    }
    return arrayOfValues
}

function levelOrderRecursion(tempqueue, tempfunction) {
    const queue = tempqueue;
    const targetFunction = tempfunction;

    if (queue.length === 0) {
        return null
    }

    targetFunction(queue[0]);

    if (queue[0].leftPointer !== null) {
        queue.push(queue[0].leftPointer)
    }
    if (queue[0].rightPointer !== null) {
        queue.push(queue[0].rightPointer)
    }

    queue.shift();
    levelOrderRecursion(queue, targetFunction);
    return targetFunction

}

export function levelOrder(tempnode, tempfunction = null, tempqueue = []) {
    const targetNode = tempnode;
    const targetFunction = tempfunction;
    const queue = tempqueue;
    
    if (targetFunction === null) {
        return levelOrderNoFunction(targetNode)
    }
    queue.push(targetNode);
    levelOrderRecursion(queue, targetFunction);
    return targetNode
}

export function preorder(tempnode, tempfunction = null) {
    const targetNode = tempnode;
    const targetFunction = tempfunction;

    if (targetNode === null) {
        return null
    }

    if (targetFunction === null) {
        const arrayOfValues = [];
        preorder(targetNode, (targetNode2) => {
            arrayOfValues.push(targetNode2.value)
        })
        return arrayOfValues
    }

    targetFunction(targetNode);
    preorder(targetNode.leftPointer, targetFunction);
    preorder(targetNode.rightPointer, targetFunction);
    return targetNode
}

export function inorder(tempnode, tempfunction = null) {
    const targetNode = tempnode;
    const targetFunction = tempfunction;

    if (targetNode === null) {
        return null
    }

    if (targetFunction === null) {
        const arrayOfValues = [];
        inorder(targetNode, (targetNode2) => {
            arrayOfValues.push(targetNode2.value)
        })
        return arrayOfValues
    }

    inorder(targetNode.leftPointer, targetFunction);
    targetFunction(targetNode);
    inorder(targetNode.rightPointer, targetFunction);
    return targetNode
}
export function postorder(tempnode, tempfunction = null) {
    const targetNode = tempnode;
    const targetFunction = tempfunction;

    if (targetNode === null) {
        return null
    }

    if (targetFunction === null) {
        const arrayOfValues = [];
        postorder(targetNode, (targetNode2) => {
            arrayOfValues.push(targetNode2.value)
        })
        return arrayOfValues
    }

    postorder(targetNode.leftPointer, targetFunction);
    postorder(targetNode.rightPointer, targetFunction);
    targetFunction(targetNode);
    return targetNode
}

export function height(tempnode) {
    const targetNode = tempnode;

    if (targetNode === null) {
        return -1
    }

    const leftHeight = height(targetNode.leftPointer);
    const rightHeight = height(targetNode.rightPointer);
    return Math.max(leftHeight, rightHeight) + 1;

}

export function depth(tempnode) {
    const targetNode = tempnode;

    if (targetNode === null) {
        return -1
    }
    const depthNumber = depth(targetNode.root);
    return depthNumber + 1
}

export function isBalanced(tempnode) {
    const targetNode = tempnode;
    const arrayOfValues = inorder(targetNode);
    const rightHeight = depth(find(targetNode, arrayOfValues[arrayOfValues.length -1]));
    const leftHeight = depth(find(targetNode, arrayOfValues[0]));
    const difference = rightHeight - leftHeight;

   // console.log(`right: ${rightHeight} left: ${leftHeight} difference: ${difference}`)
    if (difference > 1 || difference < -1) {
        return false
    }
    return true
}

export function rebalance(tempnode) {
    let targetNode = tempnode;
    const arrayOfValues = inorder(targetNode);
    const rebalancedTree = tree(arrayOfValues);
    targetNode.value = rebalancedTree.value;
    targetNode.leftPointer = rebalancedTree.leftPointer;
    targetNode.rightPointer = rebalancedTree.rightPointer;
    return targetNode
}

export const prettyPrint = (tempnode, prefix = '', isLeft = true) => {
    if (tempnode.rightPointer !== null) {
      prettyPrint(tempnode.rightPointer, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${tempnode.value}`);
    if (tempnode.leftPointer !== null) {
      prettyPrint(tempnode.leftPointer, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
