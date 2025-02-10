function redirectToSearchPage(){
    window.location.href="https://www.youtube.com/results?search_query=";
}
function redirectToHome(){
    window.location.href="https://www.google.com/";
}
function removeSubscriptions(){
    const xpathSubscriptions = '//*[@id="sections"]/ytd-guide-section-renderer[2]';
    const subElement = 
        document.evaluate(xpathSubscriptions, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(subElement) subElement.remove();
}
function removeRecommendedSideBar(){
    const secondaryDiv = document.getElementById('secondary');
    if (secondaryDiv) 
        secondaryDiv.remove();
}
// work in progress...
// function removeEndOfVideoRecommended(){
//     const observer = new MutationObserver(() => {
//         const endscreenEl = document.querySelector('ytp-endscreen-content');
//         if (endscreenEl) {
//           endscreenEl.remove();
//         }
//     });
//     observer.observe(document.documentElement, {
//         childList: true,
//         subtree: true
//       });
// }
function watchingVideoCase(){
    removeRecommendedSideBar();
    // removeEndOfVideoRecommended();
    document.addEventListener('yt-navigate-start', removeRecommendedSideBar);
    document.addEventListener('yt-navigate-finish', removeRecommendedSideBar);
}
function hideElementsYoutube(currentURL) {
    if(currentURL === "https://www.youtube.com/"
    || currentURL.startsWith("https://www.youtube.com/shorts")
    || currentURL.startsWith("https://www.youtube.com/feed") ){
        redirectToSearchPage();
    }
    else if(currentURL.startsWith("https://www.youtube.com/watch?v")){
        watchingVideoCase();
    }
}
function handleRequestByURL(url){
    if(url.startsWith("https://www.youtube.com")){
        hideElementsYoutube(url);
    }
    else if(url.startsWith("https://www.tiktok.com")){
        redirectToHome();
    }
    else if(url.startsWith("https://x.com")){
        redirectToHome();
    }
    else if(url.startsWith("https://www.instagram.com/")){
        redirectToHome();
    }
    else if(url.startsWith("https://www.facebook.com/")){
        redirectToHome();
    }
}
let lastURL = window.location.href; 
handleRequestByURL(lastURL);
const urlObserver = new  MutationObserver(() => {
    const currentURL = window.location.href;
    if(currentURL !== lastURL){
        lastURL = currentURL;
        handleRequestByURL(currentURL);
    }
    removeSubscriptions();
});

urlObserver.observe(document.body, {childList: true, subtree: true});