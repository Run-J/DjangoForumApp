console.log("Hello Wrold!")

const helloWroldBox = document.getElementById('hello-world');


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