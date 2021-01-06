# Garbage Collection

It will not because the function object stored in the `counter` variable is a closure that still contains a reference to the `count` variable's value. This is essentially a private variable that only the `counter` function can interact with by incrementing and logging it.
