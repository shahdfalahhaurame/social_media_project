
function setUserInfo(){
    let userInfo =JSON.parse(localStorage.getItem("user"))
    if(userInfo!=null || userInfo!=""){
        document.getElementById("name-user-info-title").innerHTML=userInfo.name
        document.getElementById("username-user-info-title").innerHTML=userInfo.username
        document.getElementById("email-user-info-title").innerHTML=userInfo.email
        document.getElementById("numberPost-user-info-title").innerHTML=userInfo.posts_count
        document.getElementById("numberComment-user-info-title").innerHTML=userInfo.comments_count
        document.getElementById("user-info-title-picture").src=userInfo.profile_image

        GetUserPost(userInfo.id)
    }
}



function GetUserinfo(id) {
    
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then((response) => {
        let user=response.data.data

        document.getElementById("name-user-info-title").innerHTML=user.name
        document.getElementById("username-user-info-title").innerHTML=user.username
        document.getElementById("email-user-info-title").innerHTML=user.email
        document.getElementById("numberPost-user-info-title").innerHTML=user.posts_count
        document.getElementById("numberComment-user-info-title").innerHTML=user.comments_count
        document.getElementById("user-info-title-picture").src=user.profile_image

        GetUserPost(id)
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

const URLParam=new URLSearchParams(window.location.search)
const id=URLParam.get("postId")
const clickOnProfile=URLParam.get("clickOnProfile")

console.log(clickOnProfile)

if(clickOnProfile=="true"){
    setUserInfo()
}else{
    GetUserinfo(id)

}

function GetUserPost(id) {
    let homeCenterWrapper = document.querySelector(".ALL-MY-POST")
    homeCenterWrapper.innerHTML =''
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then((response) => {

        let posts = response.data.data
        
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
                                <img src="${post.author.profile_image}" alt="user picture">
                                <ul>
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
}
