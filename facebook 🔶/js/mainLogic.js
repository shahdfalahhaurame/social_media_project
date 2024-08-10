const basicURL = "https://tarmeezacademy.com/api/v1";

function Login() {
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;

    let loginErrorUsername = document.querySelector(".login-error-username");
    let loginErrorPassword = document.querySelector(".login-error-password");

    document.getElementById("alert-login-success").Visibility = "none";

    const params = {
        username: loginUsername,
        password: loginPassword,
    };

    const URL = `${basicURL}/login`;
    toggleLoader(true)
    axios.post(URL, params)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const modal = document.getElementById("login-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      // Show the success alert
      AlertSuccess();
      loginErrorUsername.classList.remove("ErrorOccur");
      loginErrorPassword.classList.remove("ErrorOccur");
    })
    .catch(function (error) {
      document.getElementById("alert-login-success").display = "none";

      let errors = error.response.data.errors;
      //console.log(errors.username!=undefined,errors.password!=undefined)
      console.log("Params:", params);

      if (errors.username != undefined) {
        loginErrorUsername.classList.add("ErrorOccur");
        loginErrorUsername.innerHTML = errors.username;
      } else {
        loginErrorUsername.classList.remove("ErrorOccur");
      }

      if (errors.password != undefined) {
        loginErrorPassword.classList.add("ErrorOccur");
        loginErrorPassword.innerHTML = errors.password;
      } else {
        loginErrorPassword.classList.remove("ErrorOccur");
      }
    })
    .finally(()=>{
      toggleLoader(false)
    })
}

function RegisterNewUser() {
    const registerProfileImage = document.getElementById("register-profile-image").files[0];
    const registerName = document.getElementById("register-name").value;
    const registerUsername = document.getElementById("register-username").value;
    const registerEmail = document.getElementById("register-email").value;
    const registerPassword = document.getElementById("register-password").value;

    let formData = new FormData();
    formData.append("username", registerUsername);
    formData.append("password", registerPassword);
    formData.append("image", registerProfileImage);
    formData.append("name", registerName);
    formData.append("email", registerEmail);

    const URL = `${basicURL}/register`;
    toggleLoader(true)
    axios.post(URL, formData)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const modal = document.getElementById("register-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      // Show the success alert
      AlertSuccess();
      gg()

    })
    .catch(function (error) {
      let errors = error.response.data.message;
      let alertLogoutSuccess = document.getElementById("alert-danger");

      console.log(localStorage.getItem("token") == null);

      alertLogoutSuccess.style.visibility = "visible"; // Change display from 'none' to 'flex'
      alertLogoutSuccess.classList.add("show");
      alertLogoutSuccess.innerHTML = errors;
      setTimeout(() => {
        alertLogoutSuccess.style.visibility = "hidden"; // Hide after 1 second
        alertLogoutSuccess.classList.remove("show");
      }, 2000);
    })
    .finally(()=>{
      toggleLoader(false)
    })
}

function AlertSuccess() {
  let alertLoginSuccess = document.getElementById("alert-login-success");

  if (localStorage.getItem("token") != null) {
    alertLoginSuccess.style.visibility = "visible"; // Change display from 'none' to 'flex'
    alertLoginSuccess.classList.add("show");
    setTimeout(() => {
      alertLoginSuccess.style.visibility = "hidden"; // Hide after 1 second
      alertLoginSuccess.classList.remove("show");
    }, 2000);

    let LoginRegister = document.querySelector(".login-register");
    LoginRegister.setAttribute("aria-disabled", "none");
    changingUI();
  } else {
    changingUI();
  }
}

function LogOut() {
  toggleLoader(true)

  changingUI();
  localStorage.clear();

  let alertLoginSuccess = document.getElementById("alert-login-success");
  document.getElementById("alert-text-success").innerHTML =
    "You are Successfully LogOut";
  console.log(alertLoginSuccess);
  alertLoginSuccess.style.visibility = "visible"; // Change display from 'none' to 'flex'
  alertLoginSuccess.classList.add("show");
  setTimeout(() => {
    alertLoginSuccess.style.visibility = "hidden"; // Hide after 1 second
    alertLoginSuccess.classList.remove("show");
  }, 2000);
    toggleLoader(false)
  //setUserInfoToHTML()
  //IfLogoutSuccess()
}

function setUserInfoToHTML(src = "images/user.jpg", name = "Your name") {
    let userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo != null) {
        let hello = userInfo.profile_image;

        let a = {};
        if (typeof hello != typeof a) {
        src = userInfo.profile_image;
        }
        if (userInfo.name != "") {
        name = userInfo.name;
        }
    }

    let userPic= document.querySelector(".user-pic")
    userPic.setAttribute("src", src);

    let userInfoImageProfile=document.getElementById("user-info-image-profile")
    userInfoImageProfile.setAttribute("src", src);
    let userInfoName=document.getElementById("user-info-name")
    userInfoName.innerHTML = name;

    let homeLeftProfileImage=document.getElementById("home-left-profile-image")

    if(homeLeftProfileImage!=null){
        homeLeftProfileImage.setAttribute("src", src);
        
        document.getElementById("home-left-name").innerHTML = name;

        document.getElementById("post-text-profile-image").setAttribute("src", src);
        document.getElementById("post-text-input").placeholder = `What's on your mind, ${name}`;

        document.getElementById("single-stories-image-small").setAttribute("src", src);
        document.getElementById("single-stories-image-big").setAttribute("src", src);
    }
    let userInfoTitlePicture=document.getElementById("user-info-title-picture")

    if(userInfoTitlePicture!=null){
      userInfoTitlePicture.setAttribute("src", src);
    }
}
function changingUI() {
    let LoginRegister = document.querySelector(".login-register");
    let userPic = document.querySelector(".user-pic");
    let createPost = document.querySelector(".createPost");

    if (LoginRegister.getAttribute("aria-disabled") == "block") {
        userPic.style.display = "none";

        if(createPost!=null){
            createPost.style.display = "none";
        }
    }

    if (LoginRegister.getAttribute("aria-disabled") == "none") {
        LoginRegister.style.display = "none";

        userPic.style.display = "block";

        if(createPost!=null){
            createPost.style.display = "none";
        }
    }
    //------changing display Commenting when login and logout--------//
    if(window.location.pathname=="/D:/PROGRAMING/Javascrept/API/facebook%20%F0%9F%94%B6/showPost.html"){
      let sendCommentUl=document.getElementById("send-comment-ul")
      if (localStorage.getItem("token") != null) {
        if(sendCommentUl!=null){
          sendCommentUl.style.display="flex";
        }
      }else{
        if(sendCommentUl!=null){
          sendCommentUl.style.display="none"; 
        }

      }
    }
    //-----/changing display Commenting when login and logout/-------//

  setUserInfoToHTML();
}
changingUI()

if (localStorage.getItem("token") != null) {
    let LoginRegister = document.querySelector(".login-register");
    let createPost = document.querySelector(".createPost");

    LoginRegister.style.display = "none";
    let userPic = document.querySelector(".user-pic");
    userPic.style.display = "block";
    if(createPost!=null){
        createPost.style.display = "block";
    }
}

function toggleMenu() {
  let subMenu = document.getElementById("subMenu");
  subMenu.classList.toggle("open-menu");
}






function createAnewPost() {
  // Retrieve the title and textarea elements and access their value properties
  let titleMe = document.getElementById("title-create-a-new-post").value;
  let textarea = document.getElementById("textarea-create-a-new-post").value;
  let imagePost = document.getElementById("image-create-a-new-post").files[0];

  let postIdInput=document.getElementById("post-id-input").value
  let isCreate=postIdInput==null || postIdInput==''

  let formData=new FormData()
  formData.append("title",titleMe)
  formData.append("body",textarea)
  formData.append("image",imagePost)

  let URL = '';

  const token = localStorage.getItem("token");
  const headers = {
      "Content-type":"multipart/form-data",
      Authorization: `Bearer ${token}` // Correct header key with capital "A"
  };
  if(isCreate){
      URL=`${basicURL}/posts`
  }else{
      let editSection=document.getElementById("edit-post-section")
      editSection.style.display="block"

      formData.append("_method","put")
      URL=`${basicURL}/posts/${postIdInput}`
  }

  axios.post(URL, formData, {
      headers: headers
  })
  .then((response) => {
      

      // Hide the modal using Bootstrap's modal instance
      const modal = document.getElementById("create-post-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      GetPosts()
  })
  .catch((error) => {
      console.error("Error creating post:", error);
      let errors = error.response.data.message
      let alertLogoutSuccess = document.getElementById("alert-danger-post");

      //console.log(localStorage.getItem("token") == null)

      alertLogoutSuccess.style.visibility = "visible";  // Change display from 'none' to 'flex'
      alertLogoutSuccess.classList.add("show");
      alertLogoutSuccess.innerHTML=errors
      setTimeout(() => {
          alertLogoutSuccess.style.visibility = "hidden";  // Hide after 1 second
          alertLogoutSuccess.classList.remove("show");
      }, 2000);
  });

}
/*-----------ON EDITING POST--------------*/
function editPost(postObj){
  let post=JSON.parse(decodeURIComponent(postObj))
  console.log(post)
  document.getElementById("post-modal-submit-but").innerHTML="Update"
  document.getElementById("Title-create-post-modal").innerHTML="Edit post"

  let editPostSection=document.getElementById("edit-post-section")
  //let isEditPostInput=
  document.getElementById("post-id-input").value=post.id


  document.getElementById("title-create-a-new-post").value=post.title
  document.getElementById("textarea-create-a-new-post").value=post.body
  //document.getElementById("image-create-a-new-post")

  let postModal= new bootstrap.Modal(document.getElementById("create-post-modal"),{})
  postModal.toggle()
}
/*-----------/ON EDITING POST/--------------*/

/*-----------ON CREATING POST--------------*/
function createPost(){

  document.getElementById("post-modal-submit-but").innerHTML="Create"
  document.getElementById("Title-create-post-modal").innerHTML="Create a New Post"

  document.getElementById("post-id-input").value=''

  document.getElementById("title-create-a-new-post").value=''
  document.getElementById("textarea-create-a-new-post").value=''
  //document.getElementById("image-create-a-new-post")

  let postModal= new bootstrap.Modal(document.getElementById("create-post-modal"),{})
  postModal.toggle()
}
/*-----------/ON CREATING POST/--------------*/

/*-----------ON DELETING POST--------------*/
let postId;
function deletePost(postObj){
  let post=JSON.parse(decodeURIComponent(postObj))
  postId=post.id
  let postModal= new bootstrap.Modal(document.getElementById("delete-post-modal"))
  postModal.toggle()
}
function confirmDeletePost(){
  const token = localStorage.getItem("token");
  const headers = {
      Authorization: `Bearer ${token}` // Correct header key with capital "A"
  };
  let URL=`${basicURL}/posts/${postId}`

  axios.delete(URL,{
      headers: headers
  })
  .then((response) => {
      const modal = document.getElementById("delete-post-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      // Show the success alert
      AlertSuccess();
      GetPosts()
  })
  .catch((error) => {
      console.error("Error creating post:", error);
      let errors = error.response.data.message
      let alertLogoutSuccess = document.getElementById("alert-danger-post");


      alertLogoutSuccess.style.visibility = "visible";
      alertLogoutSuccess.classList.add("show");
      alertLogoutSuccess.innerHTML=errors
      setTimeout(() => {
          alertLogoutSuccess.style.visibility = "hidden";
          alertLogoutSuccess.classList.remove("show");
      }, 2000);
  })
  .finally(()=>{

  })
}
/*-----------/ON DELETING POST/--------------*/

function toggleLoader(show){
  if(show){
      document.getElementById("loader-container").style.visibility="visible"
  }else{
      document.getElementById("loader-container").style.visibility="hidden"
  }
}