export class MinHeap {
    heap;
    constructor() {
        this.heap = [];
    }
    // Insert a new element into the heap
    insert(item) {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }
    // Extract the minimum element (due the soonest)
    extractMin() {
        if (this.isEmpty())
            return null;
        if (this.heap.length === 1)
            return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    // Get the minimum element without removing it
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }
    // Check if the heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }
    // Move the item at index `idx` up to its correct position
    heapifyUp(idx) {
        let parentIdx = Math.floor((idx - 1) / 2);
        while (idx > 0 && this.heap[idx].dueDate < this.heap[parentIdx].dueDate) {
            [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
            parentIdx = Math.floor((idx - 1) / 2);
        }
    }
    // Move the item at index `idx` down to its correct position
    heapifyDown(idx) {
        let smallest = idx;
        const leftChildIdx = 2 * idx + 1;
        const rightChildIdx = 2 * idx + 2;
        if (leftChildIdx < this.heap.length && this.heap[leftChildIdx].dueDate < this.heap[smallest].dueDate) {
            smallest = leftChildIdx;
        }
        if (rightChildIdx < this.heap.length && this.heap[rightChildIdx].dueDate < this.heap[smallest].dueDate) {
            smallest = rightChildIdx;
        }
        if (smallest !== idx) {
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            this.heapifyDown(smallest);
        }
    }
    // Update an item within the heap
    update(item) {
        const index = this.heap.findIndex(c => c === item);
        if (index > -1) {
            this.heapifyDown(index);
            this.heapifyUp(index);
        }
    }
}
