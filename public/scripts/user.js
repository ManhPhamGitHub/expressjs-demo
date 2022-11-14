if (document.querySelectorAll('#delete-user')) {
    document.querySelectorAll('#delete-user').forEach(selector => selector.addEventListener('click', async () => {
        // Send PUT Request here
        await fetch('/delete', {
            body: JSON.stringify({ id: 1 }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json()).then((value) => {
            if (value.status === 'success')
                alert(value.message)
        })
    }))
}
if (document.querySelector('#add-user')) {
    document.querySelector('#add-user').addEventListener('click', async () => {
        // Send PUT Request here
        const name = document.querySelector("#name").value
        const age = document.querySelector("#age").value
        const file = document.querySelector("#file").files[0]
        const formData = new FormData()
        formData.append('name', name)
        formData.append('age', age)
        formData.append('file', file)

        await fetch('/add-user', {
            body: formData,
            method: 'POST',
        }).then((response) => response.json()).then((value) => {
            if (value.status === 'success')
                alert(value.message)
        })
    })
}