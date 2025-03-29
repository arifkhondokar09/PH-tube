console.log("index is connected")


function removeActiveClass(){
const removeClasses= document.getElementsByClassName("active");

for(let removeClass of removeClasses){

    removeClass.classList.remove("active")
}
}



function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then( data => displayCategories(data.categories))
  
}


function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(response => response.json())
        .then(data => {
            removeActiveClass()
            document.getElementById("btn-all").classList.add("active")
            displayVideos(data.videos);
        })
    
}



function loadCategoryVideos (id ){
   
const url= ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
   


fetch(url)
.then (response => response.json())
.then (data =>{
    removeActiveClass()
    const clickedButton= document.getElementById(`btn-${id}`);
    clickedButton.classList.add("active");

    
    displayVideos(data.category)
     
})

   }





   function displayCategories(categories){

    const categoryContainer= document.getElementById("category-container");
  
      for (let cat of categories){
          const catDiv = document.createElement("div");
  
          catDiv.innerHTML= `
             <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
             `;
  
             categoryContainer.appendChild(catDiv);
  
      }
   }






 const   displayVideos = (videos)=> {
  
    const videoContainer= document.getElementById("video-container");
    videoContainer.innerHTML='' ;
    if(videos.length == 0){
        videoContainer.innerHTML=`
             
         <div class=" py-10 font-bold text-2xl col-span-full inline-flex flex-col justify-center items-center ">
            <img class="p-5" src="assets/Icon.png" alt="">
            <p>Oops!! Sorry, There is no content here</p>
         </div>
         `;
    };
        videos.forEach(video => {
       
   const  videoCard= document.createElement("div");
    videoCard.innerHTML=
   
    `
   <div class="card bg-base-100  shadow-sm">
                <figure class="relative ">
                  <img class="w-full h-[150px]"
                    src="${video.thumbnail}"
                    alt="Shoes" />
                    <span class="absolute bottom-2 right-2 bg-black text-white text-xs p-1 rounded-sm">3hrs 56 min ago</span>
                </figure>

                <div class="flex py-5 gap-3">
                    <!-- avatar -->
                 <div class="ml-1" >
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 ">
                          <img class="" src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                 </div>
                 <!-- description -->
                 <div class="space-y-2" >
                    <h2 class="font-bold  ">Building a Winning UX Strategy Using the Kano Model</h2>
                    <p class="text-gray-500 text-xs flex gap-2">${video.authors[0].profile_name}<img  class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"> </img> </p>
                    <p class="text-gray-500 text-xs">${video.others.views} views</p>
                 </div>
                  </div>
                </div>
              </div>

    
    `;
    
    videoContainer.appendChild(videoCard);
    videoContainer.classList.add("gap-5")
    
    
        });
     }




    //  call function
loadCategories()



