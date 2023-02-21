function createPerson(name, age) {
    return { age, getName: () => name }
}

function createTeacher(name, age, classes) {
    return { ...createPerson(name, age), classes }
}

const teacher = createTeacher("Kasper", 34, ["WEB2"])

console.log(teacher.getName()) // → Kasper
