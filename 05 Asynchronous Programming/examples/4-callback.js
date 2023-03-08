function myAsyncFunction(callback) {
    setTimeout(callback, 3000)
}

myAsyncFunction(() => console.log("later"))
