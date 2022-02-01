let videogrid=document.getElementsByClassName("video-grid");
let apikey="AIzaSyAaCF-Hxbjcz8yNMHn2rmDCrZHFneDZE3I";
let videourl="https://www.googleapis.com/youtube/v3/videos?";
let channelurl="https://www.googleapis.com/youtube/v3/channels?";
// async function getData(){
// try{
//     let response= await fetch("https://www.googleapis.com/youtube/v3/videos?AIzaSyAaCF-Hxbjcz8yNMHn2rmDCrZHFneDZE3I");
//     let data=await response.json()
//    console.log(data);
// }catch(error){
//    console.log(error);
// }  
// }
// getData()
fetch(videourl + new URLSearchParams({
    key:apikey,
    part:"snippet",
    chart:"mostPopular",
    maxResults: 50,
    regionCode: "IN",
}))
.then(res => res.json())
.then(data => {
    console.log(data)
data.items.forEach(element => {
    getChannelIcon(element);
})
})
.catch((error) => {
    console.log(error);
})
let getChannelIcon = (video_data) => {
    fetch(channelurl + new URLSearchParams({
        key:apikey,
        part:"snippet",
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}
let makeVideoCard=((data) => {
    videogrid.innerHTML =` <div class="video-grid">
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img class="thumbnail" src="${data.snippet.thumbnails.high.url}" alt="">
    <div class="video-detail">    
        <img class="sub-img" src="${data.channelThumbnail}" alt="">
    <div class="video-info">
        <h4 class="title">${data.snippet.title}</h4>
        <p class="channel">${data.snippet.channelTitle}</p>
     </div>
</div>
</div>
</div>`
})




