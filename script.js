
// fetch category API//

function loadCategory(){
   fetch('https://openapi.programming-hero.com/api/news/categories')
   .then(res => res.json())
   .then(data => displayCategory(data.data.news_category))
}

loadCategory();


// display category list

function displayCategory(data){
   const category = document.getElementById('category');
   data.forEach( categoryObj => {
      let categoryList = document.createElement('div')
      categoryList.innerHTML= `                
         <span onclick='getDetails(${categoryObj.category_id})'> <i class="fa-regular fa-newspaper"></i> ${categoryObj.category_name} </span>     
      `
      categoryList.classList.add('btnBtn')
      category.appendChild(categoryList);
   });
}

// fetch news based on category from API 

function getDetails(category_id){
   fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
   .then(res => res.json())
   .then(data => createCard(data.data))
   .catch(error => console.log(error))
}

// create card and display news

function createCard(data){
   counter(data);

   let categoryNews = document.getElementById('category-news');
   categoryNews.innerHTML = "";
   for (const singleDetails of data)
   {
      console.log(singleDetails);
      let newsDiv = document.createElement('div')
      newsDiv.classList.add('col-lg-6')
      newsDiv.classList.add('col-md-12')
      newsDiv.classList.add('col-sm-12')

      newsDiv.innerHTML = `

         <div class="card mb-3">
            <div class="row g-0">
               <div class="col-md-4">
                  <img class="img-fluid m-2" src="${singleDetails.thumbnail_url}" alt="...">
               </div>
               <div class="col-md-8 d-flex align-items-center">
                  <div class="card-body ms-2">
                     <h5 class="card-title fw-bold">${singleDetails.title}</h5>
                     <p class="card-text">${singleDetails.details.slice(0,130)}...</p>
                  
                     <div class="d-flex justify-content-between align-items-center">
                        <div>
                           <img  style="width: 30px; border-radius: 15px;" src="${singleDetails.author.img}" alt="">
                            ${singleDetails.author.name}
                        </div>
                        <div><i class="fa-solid fa-eye"></i> ${singleDetails.total_view}</div>
                        <div>
                           <button  type="button" class="btn text-primary bg-white" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="newsFunc(${singleDetails._id})" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                           <i class="fa-solid fa-arrow-right"></i>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      `
      categoryNews.appendChild(newsDiv)
   }

}

// fetch news from API 

function newsFunc(news_id){
   document.getElementsByClassName("loader")[0].style.display = "block"; // spinner
   fetch(`https://openapi.programming-hero.com/api/news/_${news_id}`)
   .then(res => res.json())
   .then(data => newsModal(data.data))
   .catch(error => console.log(error))
}


// display news on Modal

function newsModal(data){
   let news = document.getElementById('modal-body');
   // categoryNews.innerHTML = "";
   let newsModal = document.createElement('div')
   newsModal.innerHTML = `

      <div class="row g-0">
         <div class="col-md-4">
            <img class="img-fluid m-2" src="${data.thumbnail_url}" alt="...">
         </div>
         <div class="col-md-8 d-flex align-items-center">
            <div class="card-body ms-2">
               <h5 class="card-title fw-bold">${data.title}</h5>
               <p class="card-text">${data.details}...</p>
            
               <div class="d-flex justify-content-between align-items-center">
                  <div>
                     <img  style="width: 30px; border-radius: 15px;" src="${data.author.img}" alt="">
                        ${data.author.name}
                  </div>
                  <div><i class="fa-solid fa-eye"></i> ${data.total_view}</div>
               </div>
            </div>
         </div>
      </div>
   `
   // set value to modal box
   news.appendChild(newsModal);
}


// result counter

function counter(arrayLength){
   let arrayCounter = document.getElementById('arrayCounter');
   arrayCounter.innerHTML = `🔥 ${arrayLength.length} result found`
}



// -----------------------
// -----------------------



