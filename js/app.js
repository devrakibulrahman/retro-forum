// all post api integrate ---------------->
const loadAllPost = () => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
        .then((res) => res.json())
        .then((allPostData) => displayAllPost(allPostData))
        .catch((err) => console.log(err))
};

// latest post api integrate --------------->
const loadLatestPost = () => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
        .then((res) => res.json())
        .then((latestPost) => displayAllLatestPost(latestPost))
        .catch((err) => console.log(err))
}

// category search api integrate ----------------->
const loadSearchCategory = (search) => {
    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
        .then((res) => res.json())
        .then((loadCategory) => displayAllPost(loadCategory))
        .catch((err) => console.log(err))
};

// display all post ----------------->
const displayAllPost = (data) => {
    const {posts} = data;
    const cardContainer = document.querySelector('#card-container');
    cardContainer.innerHTML = '';

    posts.forEach((post) => {
        const {image, title, description, comment_count, view_count, posted_time, category, isActive, author} = post;
        const authorName = author.name;

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('w-full');
        cardDiv.innerHTML = `
            <div class="w-full min-h-[50px] bg-[#F3F3F5] rounded-2xl p-5 flex flex-col justify-center md:flex-row lg:p-[40px] lg:rounded-3xl lg:gap-x-1">
                <!-- ------------- user profile -->
                <div class="w-full md:max-w-[100px]">
                    <div class="w-[72px] h-[72px] bg-white rounded-lg relative">
                        <!-- -------------- api load img -->
                        <div class="w-full h-full overflow-hidden rounded-lg">
                            <img src=${image} class="object-cover">
                        </div>
                        <span class="w-[16px] h-[16px] ${isActive === true ? 'bg-green-600' : 'bg-red-600'} border-2 border-white rounded-full absolute top-[-4px] right-[-4px] z-10"></span>
                    </div>
                </div>
                <!-- ------------- user post -->
                <div class="w-full">
                    <div class="w-full border-b-2 border-[#12132D40] border-dashed pb-5">
                        <div class="flex items-center gap-x-5 mt-3 mb-2 md:mt-0">
                            <p class="font-inter text-sm leading-[17px] font-semibold text-[#12132DCC]"># ${category}</p>
                            <p class="font-inter text-sm leading-[17px] font-semibold text-[#12132DCC]">Author : ${authorName}</p>
                        </div>
                        <div class="w-full">
                            <h1 class="font-mulish text-lg leading-[25px] font-black text-[#12132D] mb-3 md:text-[20px] lg:mb-4 lg:text-xl">${title}.</h1>    
                            <p class="font-inter text-base leading-[26px] font-normal text-[#12132D99]">${description}.</p>
                        </div>
                    </div>
                    <div class="w-full mt-6 flex items-center justify-between">
                        <div class="w-full flex items-center gap-x-6">
                            <div class="flex items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-[#12132D99]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <span class="font-inter text-sm leading-[19px] font-normal text-[#12132D99] md:text-base">${comment_count}</span>
                            </div>
                            <div class="flex items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-[#12132D99]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>                                      
                                <span class="font-inter text-sm leading-[19px] font-normal text-[#12132D99] md:text-base">${view_count}</span>
                            </div>
                            <div class="flex items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-[#12132D99]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>                                                                            
                                <span class="font-inter text-sm leading-[19px] font-normal text-[#12132D99] md:text-base">${posted_time} min</span>
                            </div>
                        </div>
                        <div class="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" onclick="readLater('${description}', '${view_count}')">
                            <img src="./assets/vector.png" alt="" id="read-later">                                                                        
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv)
    });

};

// display all latest post ------------------>
const displayAllLatestPost = (data) => {
    const latestPostContainer = document.querySelector('#latest-post-container');

    data.forEach((latestPost) => {
        const {cover_image, profile_image, title, description, author} = latestPost;
        const {name, designation, posted_date} = author;

        const cardDiv = document.createElement('div');
        cardDiv.classList.add("w-[400px]", "max-w-full", "min-h-[495px]", "sm:w-[400px]", "border", "border-[#12132D26]", "rounded-2xl", "p-4", "md:w-full", "lg:rounded-[32px]", "xl:w-full", "xl:p-6", "2xl:min-h-[540px]");
        cardDiv.innerHTML = `
            <div class="w-full h-[190px] rounded-[10px] bg-[#12132D0D] overflow-hidden lg:rounded-[20px] 2xl:h-[210px]">
                <div class="w-full h-full overflow-hidden">
                    <img src=${cover_image} class="object-cover">
                </div>
            </div>
            <!-- ---------------- post details from api -->
            <div class="w-full mt-[25px]">
                <div class="w-full flex items-center gap-x-3 mb-[15px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-[#12132D99]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <span class="font-mulish text-base leading-[20px] font-semibold text-[#12132D99]">${posted_date ? posted_date : "No Publish Date"}</span>                                  
                </div>
                <div class="w-full mb-[16px]">
                    <h1 class="font-mulish text-[18px] leading-[30px] font-extrabold text-[#12132D] mb-3">${title}.</h1>
                    <p class="font-mulish text-base leading-[26px] font-medium text-[#12132D99]">${description}.</p>
                </div>
                <div class="w-full flex items-center gap-x-4">
                    <div class="w-[44px] h-[44px] rounded-full bg-[#12132D0D] overflow-hidden">
                        <div class="w-full h-full overflow-hidden">
                            <img src=${profile_image} class="object-cover">
                        </div>
                    </div>
                    <div class="w-auto">
                        <h1 class="font-mulish text-base leading-[20px] font-bold text-[#12132D] mb-[5px]">${name}</h1>
                        <p class="font-mulish text-sm leading-[18px] font-medium text-[#12132D99]">${designation ? designation : "Unknown"}</p>
                    </div>
                </div>
            </div>
        `
        latestPostContainer.appendChild(cardDiv);
    });
};

// read later ------------------>
const readLater = (description, view) => {
    const postDes = description;
    const postView = view;
    const readLaterContainer = document.querySelector('#read-later-container');
    
    const div = document.createElement('div');
    div.classList.add('w-full');
    div.innerHTML = `
        <div class="w-full bg-white py-[15px] px-[16px] rounded-lg flex items-center justify-between" onclick="">
            <h1 class="font-mulish text-base leading-[26px] font-bold text-[#12132D]">${postDes}</h1>
            <div class="flex items-center justify-center gap-x-[8px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-[#12132D99]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span class="font-inter text-base leading-[19px] font-normal text-[#12132D99]">${postView}</span>                                      
            </div>
        </div>
    `;

    readLaterContainer.appendChild(div);

    readLaterCounter();
};

// read later counter ------------------>
const readLaterCounter = () => {
    const readCounter = document.getElementById('read-counter');
    const readCounterToNum = parseInt(readCounter.innerText);
    let counterUp = readCounterToNum;

    readCounter.innerText = counterUp += 1;
};

// search --------------->
const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', () => {
    const searchBox = document.querySelector('#search-box').value;
    loadSearchCategory(searchBox);
});


// all api function call here ------------------>
loadAllPost();
loadLatestPost();