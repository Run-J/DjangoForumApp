console.log("Hello Wrold!")

const postsBox = document.getElementById('posts-box');
const spinnerBox = document.getElementById('spinner-box');
const loadBtn = document.getElementById('load-btn');
const endBox = document.getElementById('end-box');


const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');



const likeUnlikePosts = () => {
    const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')]
    likeUnlikeForms.forEach(form=> form.addEventListener('submit', e=>{
        e.preventDefault() // It prevents the default action of the event from happening, the default action here is to submit and reload the page.
        const clickedId = e.target.getAttribute('data-form-id')
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

        $.ajax({
            type: 'POST',
            url: "/like-unlike/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,
            },
            success: function(response) {
                console.log(response)
                clickedBtn.textContent =  response.liked ? `Unlike (${response.likedCount})`: `Like (${response.likedCount})`
            },
            error: function(error) {
                console.log(error)
            }
        })
    }))
}



let visible = 3;

const getData = () => {
    $.ajax({
        type: 'GET',
        url: `/data/${visible}/`,
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
                                    <div class="col-2">
                                        <a href="#" class="btn btn-primary">Details</a>
                                    </div>
                                    <div class="col-2">
                                        <form class="like-unlike-forms" data-form-id="${ele.id}">
                                            <!-- Inserts a hidden token into the form; Prevents Cross-Site Request Forgery (CSRF) attacks -->
                                            <button href="#" class="btn btn-primary" id="like-unlike-${ele.id}">${ele.liked ? `Unlike (${ele.count})`: `Like (${ele.count})`}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>                
                    `
                });
                
                likeUnlikePosts()

                console.log("Total of posts num:",response.size)
                if (response.size === 0) {
                    endBox.textContent = 'No posts added yet...'
                }
                else if (response.size <= visible) {
                    loadBtn.classList.add('not-visible')
                    endBox.textContent = 'No more posts to load...'
                }

            }, 500);
        },
        error: function(response) {
            console.log(error)
        }
    })
}


loadBtn.addEventListener('click', ()=>{
    spinnerBox.classList.remove('not-visible')
    visible += 3
    getData()
})

getData()