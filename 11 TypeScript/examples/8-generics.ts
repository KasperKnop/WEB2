class Queue<T> {
    private data: T[] = []

    enqueue(item: T) {
        this.data.push(item)
    }

    dequeue(): T | undefined {
        return this.data.shift()
    }

    size(): number {
        return this.data.length
    }
}

const queue = new Queue<string>()
queue.push("ITEM")
