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
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${ele.title}</h5>
                            <p class="card-text">${ele.body}</p>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Like</a>
                                </div>
                            </div>
                        </div>
                    </div>                
                `
            });
        }, 100);
    },
    error: function(response) {
        console.log(error)
    }
})