/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
function node(tempValue) {
    let value = tempValue;
    let leftPointer; 
    let rightPointer;

    return {value, leftPointer, rightPointer}
    
}
function linkedList() {
    let _head = null;
    let length = 0;
    return {
        head() {
            return _head
        },
        append(value) {
            if (_head === null) {
                _head = node(value);
            } else {
                let pointer = _head;
                while (pointer.rightPointer !== undefined) {
                    pointer = pointer.rightPointer;
                }
                pointer.rightPointer = node(value);
            }
            length += 1;
        },
        prepend(value) {
            const newHead = node(value);
            newHead.rightPointer = _head;
            _head = newHead;
            length++;
        },
        size() { return length },
        tail() {
            let pointer = _head;
            while (pointer.rightPointer !== undefined) {
                pointer = pointer.rightPointer;
            }
            return pointer
        },
        at(index) {
            let pointer = _head;
            for (let i = 0; i !== index; i++) {
                pointer = pointer.rightPointer;
            }
            return pointer
        },
        pop() {
            let pointer = _head;
            let previousPointer;
            while (pointer.rightPointer !== undefined) {
                previousPointer = pointer;
                pointer = pointer.rightPointer;
            }
            previousPointer.rightPointer = undefined;
            length--;
            return pointer
        },
        contains(value) {
            let pointer = _head;
            while (pointer.value !== value && pointer.rightPointer !== undefined) {
                pointer = pointer.rightPointer;
            }
            if (pointer.rightPointer) {
                return true
            }
            return false
        },
        find(value) {
            let pointer = _head;
            let index = 0;
            while (pointer.value !== value && pointer.rightPointer !== undefined) {
                index++;
                pointer = pointer.rightPointer;
            }
            if (pointer.rightPointer) {
                return index
            }
            return null
        },
        toString() {
            let string = "";
            let pointer = _head;
            while (pointer.rightPointer !== undefined) {
                string += `${pointer.value} -> `;
                pointer = pointer.rightPointer;
            }
            string += `${pointer.value} -> null`;
            return string
        },
        insertAt(value, index) {
            const previousNode = this.at(index - 1);
            const nextNode = previousNode.rightPointer;
            previousNode.rightPointer = node(value);
            previousNode.rightPointer.rightPointer = nextNode;
            length++;
        },
        removeAt(index) {
            const previousNode = this.at(index - 1);
            const nextNode = this.at(index + 1);
            previousNode.rightPointer = nextNode;
            length--;
        }
    }
   // return {_head, append, prepend, size, tail, at, pop, contains, find, toString, insertAt, removeAt}
}

const newList = linkedList();

let value = "";
for (let i = 0; i < 26; i++) {

    value = String.fromCharCode(97 + i);
    console.log(value);
    newList.append(value);
}
console.log(newList.size());
newList.prepend("A");
console.log(newList.at(0).value);

console.log(newList.head().value);
console.log(newList.tail().value);
console.log(newList.at(3).value);
newList.pop();
console.log(newList.tail().value);
console.log(newList.contains("f"));
console.log(newList.find("c"));
console.log(newList.toString());
newList.insertAt("RALPH", 3);
console.log(newList.at(3).value);
newList.removeAt(3);
console.log(newList.at(3).value);

