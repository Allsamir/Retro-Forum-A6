tailwind.config = {
      theme: {
        extend: {
          colors: {
            buttonBg: '#797DFC',
            navbarButtonBorder: 'rgba(3, 7, 18, 0.10)',
            navbarButtonBg: 'rgba(18, 19, 45, 0.03)',
            bannerBg: '#12132D',
            titleSectionBg: 'rgba(18, 19, 45, 0.05)',
            post_hover: 'rgba(121, 125, 252, 0.10)',
            postBg: '#F3F3F5',
            postPColor: 'rgba(18, 19, 45, 0.60)',
            borderPost: 'rgba(18, 19, 45, 0.25)',
            activeBg: '#10B981',
            inActiveBg: '#FF3434'
          }
        }
      }
    }

    const allPostURL = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    const spinner = document.getElementById('spinner');
    const allPostSection = document.getElementById('posts-section');
    const titleSection = document.getElementById('title-section');
    const readed = document.getElementById('readed');
    let postCount = 0;

    const loadDataFromApi = async () => {
          try {
                    const response = await fetch(allPostURL);
                    const realData = await response.json();
                    displayDataToUI(realData.posts)
          } catch (err) {
                    console.error("Error:", err)
          }    
    }

    const displayDataToUI = (posts) => {
          try {
                    allPostSection.innerHTML = '';
                    posts.map(post => {
                              const {id,category,image,isActive,title,description,comment_count,view_count,posted_time,author:{name}} = post;
                              const div = document.createElement('div');
                              const newTitle = title.includes("'") ? title.split("'").join('') : title; // removing ' from a title because it is causing error in showPostTitle function
                              div.classList.add('p-10', 'mulish-font', 'bg-postBg', 'hover:bg-post_hover', 'flex', 'gap-6', 'rounded-2xl')
                              div.innerHTML = `
                              <div class="flex-1 relative">
                              <img src="${image}" class="w-20 h-20 rounded-2xl"/>
                              <div class="w-[1.16669rem] h-[1.16669rem] rounded-[6.25rem] bg-${isActive ? 'activeBg' : 'inActiveBg'} absolute z-10 top-[-0.4rem] right-[1.2rem]"></div>
                              </div>
                              <div class="w-4/5">
                              <div><span class="text-[0.875rem] font-medium text-bannerBg inline-block"> #${category}</span> <span class="inline-block pl-6 text-[0.875rem] font-medium text-bannerBg">Author:${name}</span></div>
                              <h3 class="text-bannerBg font-bold text-xl py-2">${title}</h3>
                              <p class="text-postPColor font-normal text-base pt-2 pb-6">${description}</p>
                              <div class="h-4 border-t-4 border-dashed border-borderPost"></div>
                              <div class="flex items-center justify-between">
                              <div class="aditional-data items-center flex gap-6">
                              <span class="flex items-center gap-3"><img src="../images/tabler-icon-message-2.svg"/> ${comment_count}</span>
                              <span class="flex items-center gap-3"><img src="../images/tabler-icon-eye.svg"/>${view_count}</span>
                              <span class="flex items-center gap-3"><img src="../images/tabler-icon-clock-hour-9.svg"/>${posted_time}</span>
                              </div>
                              <div class="readed">
                              <button onclick='showPostTitle("${newTitle}", "${view_count}")'><img src="../images/email 1.svg" /></button>
                              </div>
                              </div>
                              </div>
                              `
                              allPostSection.appendChild(div);
                    })
                    hideSpinner();
          } catch (err) {
                    console.error("Error:", err)
          }
    }

    const hideSpinner = () => {
          spinner.classList.add('hidden')
    }

    const showPostTitle = (title, view_count) => {
          console.log(title)
          try {     
                    postCount++;
                    const div = document.createElement('div');
                    div.classList.add('px-4', 'py-[0.94rem]', 'rounded-2xl', 'flex', 'justify-between', 'text-bannerBg', 'bg-white', 'gap-3', 'my-4');
                    div.innerHTML = `
                    <span class="text-base font-semibold text-bannerBg">${title}</span>
                    <span class="flex items-center gap-2"><img src="../images/tabler-icon-eye.svg"/> ${view_count}</span>
                    `;
                    titleSection.appendChild(div);
                    readed.innerHTML = postCount
          } catch (err) {
                    console.error("Error:", err);
          }
    }     
    
    loadDataFromApi();