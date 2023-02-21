// Using call

const obj = {
    fun(x) {
        return this + x
    },
}

console.log(obj.fun.call(2, 2)) // → 4
