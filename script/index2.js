

function removeActiveClass(){


    const removeClasses= document.getElementsByClassName("active");
  
 for( let removeClass of removeClasses){
  removeClass.classList.remove("active");
}

} 




    function loadCategories(){
        fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then (response => response.json())
        .then (data => {
            displayCategories(data.categories)
           
        })
    }



    function loadVideos (searchText=""){
        fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(resposne => resposne.json())
        .then (data => {
            removeActiveClass() ;
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        })
    }



function loadCategoryVideos(id){
  const url= `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
fetch(url)
.then(res=> res.json())
.then ( data =>{
   removeActiveClass()  ;
    const buttonClicked = document.getElementById(`btn-${id}`);
   
    buttonClicked.classList.add("active");

    displayVideos(data.category)
})
}


function loadVideoDetails (videoID){
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
 
 fetch(url)
 .then(res => res.json())
 .then(data => displayVideoDetails(data.video))
}



function displayVideoDetails(video){

document.getElementById("video_details").showModal();
const detailsContainer = document.getElementById("details-container");
 
 detailsContainer.innerHTML= `

 <h2 class='font-bold text-lg'> ${video.title}</h2> 
 <p class='font-medium text-md' >views: ${video.others.views} </p>
<p>${video.description} </p>
 `
}









    function displayCategories(categories){

const categoryContainer = document.getElementById("category-container");
        for (cat of categories){
         

            const catDiv = document.createElement("div");
            catDiv.innerHTML=`
            <button id="btn-${cat.category_id}"  onclick="loadCategoryVideos(${cat.category_id})" class="btn-sm btn" >${cat.category} </button> 
            ` ;
            categoryContainer.appendChild(catDiv)


        }
    }








function  displayVideos(videos){
    const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML= "";
if(videos.length== 0){
    videoContainer.innerHTML= `
     <div class=" py-10 font-bold text-2xl col-span-full inline-flex flex-col justify-center items-center ">
            <img class="p-5" src="assets/Icon.png" alt="">
            <p>Oops!! Sorry, There is no content here</p>
         </div>
    `
}
for (let video of videos){
   

    const videoCard= document.createElement("div");

    videoCard.innerHTML= `


    <div class=" bg-base-100  h-[300px ]   ">
  <figure>
    <img class="w-full h-[180px] rounded-md "
      src=${video.thumbnail}
      >
  </figure>
  <div class="flex  p-2  ">
   <div class=" ">
   <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-5 rounded-full ring ring-offset-2">
    <img src=${video.authors[0].profile_picture}/>
  </div>
</div>
 
   </div>

   <div class="ml-2 space-y-2"> 

<h2 class="font-bold text-md" >${video.title} </h2>
<p class="font-base text-xs flex gap-2" >${video.authors[0].profile_name}

${video.authors[0].verified == true ?  `<img  class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png alt="" />` :``}
</p> 
<p class="font-base text-xs">${video.others.views } views </p> 
   </div>
   
  </div>
 <button id="" onclick="loadVideoDetails('${video.video_id}')" class="btn btn-wide">show details</button>

</div>
    `  ;




videoContainer.appendChild(videoCard)

}
}

document.getElementById("search-input").addEventListener("keyup",function(event){
    const input= event.target.value;
  loadVideos(input)


})

 loadCategories();
   