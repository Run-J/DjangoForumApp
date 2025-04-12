console.log("Hello Wrold!")

const helloWroldBox = document.getElementById('hello-world');
const postsBox = document.getElementById('posts-box');
const spinnerBox = document.getElementById('spinner-box');

// helloWroldBox.innerHTML = 'hello <i><b>world!<b><i>';


$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response){
        console.log('success', response.text)
        helloWroldBox.textContent = response.text;
    },
    error: function(error){
        console.log('error', error)
    }
})

$.ajax({
    type: 'GET',
    url: '/data/',
    success: function(response){
        console.log(response)
        const data = response.data  // here is response.data, bcoz the 'data' is returned by load_post_data_view, instead of keyword.
        
        setTimeout(() => {
            spinnerBox.classList.add('not-visible')
            console.log(data)
            data.forEach(ele => {
                //  here it's using ` isteaf of '
                postsBox.innerHTML += `  
                    ${ele.title} - <b>${ele.body}</b> <br>
                `
            });
        }, 100);
    },
    error: function(response) {
        console.log(error)
    }
})