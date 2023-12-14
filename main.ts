console.log("hello world")


interface User {
    id: number
    firstName: string
    lastName: string
    role: string
}

function updateUser(id: number, update: Partial<User>) {
   console.log(update.id)
}

export default updateUser