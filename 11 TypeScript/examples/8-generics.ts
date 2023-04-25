class Queue<T> {
    private data: T[] = []

    push(item: T) {
        this.data.push(item)
    }

    pop(): T | undefined {
        return this.data.shift()
    }

    size(): number {
        return this.data.length
    }
}

const queue = new Queue<string>()
queue.push("ITEM")
