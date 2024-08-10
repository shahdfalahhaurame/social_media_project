let currentPage=1
let last_page=1
window.addEventListener("scroll",()=>{
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight-2;
    //console.log(endOfPage)
    if(endOfPage && currentPage<=last_page){
        GetPosts(currentPage++)
        return
    }
})

function GetPosts(page=1) {
    let homeCenterWrapper = document.querySelector(".home-center-wrapper")
    
    toggleLoader(true)
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=4&page=${page}`)
    .then((response) => {

        let posts = response.data.data
        
        last_page=response.data.meta.last_page

    
        for (post of posts) {
            let display="display:none"
            let userinfo=JSON.parse(localStorage.getItem("user"))
            let user=userinfo!=null && userinfo.id ==post.author.id
            if(user){
                display ="display:block"
            }

            let postTitle = ""
            if (post.title != null) {
                postTitle = post.title
            }

            let TagsHTML = ''

            if (post.tags != null) {
                for (tag of post.tags) {
                    let nodeSpan = `<span class="tag"># ${tag.name}</span>`
                    TagsHTML += `${nodeSpan}`
                }
            }

            homeCenterWrapper.innerHTML +=
            `
                <div class="fb-post1">
                    <div class="fb-post1-container" >

                        <div class="fb-post1-header">
                            <ul>
                                <li class="active">popular</li>
                                <li>recent</li>
                                <li>most view</li>
                            </ul>
                        </div>

                        <div class="fb-p1-main">
                            <div class="post-title">
                                <img src="${post.author.profile_image}" alt="user picture" onclick="showProfileUser(${post.author.id})">
                                <ul onclick="showProfileUser(${post.author.id})">
                                    <li><h3>${post.author.name} <span> . ${post.created_at}</span></h3></li>
                                    <li><span>02 march at 12:55 PM</span></li>
                                </ul>

                                <div class="dropdown">
                                    <button class="dropbtn"><i class="fa-solid fa-ellipsis"></i></button>
                                    <div class="dropdown-content">
                                        <a href="#">Feature on top of profile</a>
                                        <a href="#">Save</a>
                                        <a href="#">Copy link to post</a>
                                        <a href="#">Embed this post</a>
                                        <a onclick="editPost('${encodeURIComponent(JSON.stringify(post))}')" href="#" id="edit-post-section" style=${display}>Edit post</a>
                                        <a onclick="deletePost('${encodeURIComponent(JSON.stringify(post))}')" href="#" style=${display}>Delete post</a>
                                        <a href="#">Who can comment on this post?</a>
                                        <a href="#">Who can see this post?</a>
                                    </div>
                                </div>
                            </div>
                            <h3>${postTitle}</h3>
                            <p>${post.body}</p>
                            <div class="tags" style="display: flex;">
                                ${TagsHTML}
                            </div>
                            <div class="post-images" onclick="showPost(${post.id})">
                                <div class="post-images1">
                                    <img src="${post.image}" alt="post images 01">
                                    <img src="${post.image}" alt="post images 02">
                                    <img src="${post.image}" alt="post images 03">
                                </div>
                                <div class="post-images2">
                                    <img src="${post.image}" alt="post images 04">
                                </div>
                            </div>

                            <div class="like-comment" onclick="showPost(${post.id})">
                                <ul>
                                    <li>
                                        <img src="images/love.png" alt="love">
                                        <img src="images/like.png" alt="like">
                                        <span>22k like</span>
                                    </li>
                                    <li><i class="fa-regular fa-comment-dots"></i> <span>${post.comments_count} comments</span></li>
                                    <li><i class="fa-solid fa-share-from-square"></i> <span>254 share</span></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            `
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(()=>{
        toggleLoader(false)
    })
}
GetPosts()



function showPost(id){
    window.location=`showPost.html?postId=${id}`
}

/*-----------change to dark mode--------------*/
var darkButton = document.querySelector(".darkTheme");

darkButton.onclick = function () {
    darkButton.classList.toggle("button-Active");
    document.body.classList.toggle("dark-color")
}

var homeLeft = document.querySelector(".home-left")
var homeRight = document.querySelector(".home-right")

function checkWindowSize() {
    let containerCenter = document.querySelector(".container")
    containerCenter.classList.remove("col-6")

    if (window.innerWidth < 768) {

        containerCenter.classList.remove("col-6")
        homeLeft.style.display = "none";
        homeRight.style.display = "none";

    } else {

        containerCenter.classList.add("col-6")
        homeLeft.style.display = "block";
        homeRight.style.display = "block";

    }
}
// Initial check
checkWindowSize();
// Check on window resize
window.addEventListener('resize', checkWindowSize);
/*-----------/change to dark mode/--------------*/


function showProfileUser(id){
    window.location=`Profile.html?postId=${id}&clickOnProfile=false`
}

