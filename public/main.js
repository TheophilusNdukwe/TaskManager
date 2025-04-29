var trash = document.getElementsByClassName("btn-danger");
var checkDone = document.getElementsByClassName("btn-success")

Array.from(checkDone).forEach(function(element) {
    element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.querySelector('.task-name').innerText
        const tasks = this.parentNode.parentNode.querySelector('.task-description').innerText
        const checkDone = this.parentNode.parentNode.querySelector('.task-status').innerText
        fetch('/dashboard/done', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
              'tasks': tasks,
                'checkDone': checkDone
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                console.log(data)
                
                //add check symbol
                
            }).then(function (response) {
            window.location.reload()
        })
    });
});


Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.querySelector('.task-name').innerText
        const tasks = this.parentNode.parentNode.querySelector('.task-description').innerText
        fetch('/dashboard', { // Changed route to /dashboard
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'tasks': tasks
            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});
