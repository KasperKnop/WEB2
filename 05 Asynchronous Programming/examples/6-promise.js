const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) resolve("SUCCESS")
        else reject(new Error("Error"))
    }, 1000)
})

myPromise.then(result => console.log(result)).catch(e => console.log(e.message))
