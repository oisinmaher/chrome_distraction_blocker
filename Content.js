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
function removeEndscreen() {
    const observer = new MutationObserver(() => {
        const endscreen = document.querySelector('.ytp-endscreen-content');
        if (endscreen) endscreen.remove();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
}
function watchingVideoCase(){
    removeSubscriptions();
    removeEndscreen();
    removeRecommendedSideBar();
    document.addEventListener('yt-navigate-start', removeRecommendedSideBar, removeSubscriptions);
    document.addEventListener('yt-navigate-finish', removeRecommendedSideBar, removeSubscriptions);
}
function hideElementsYoutube(currentURL) {
    removeSubscriptions();
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
    // chrome.storage.sync.get([
    //     "blockInstagramKey",
    //     "blockFacebookKey",
    //     "blockTiktokKey",
    //     "blockTwitterKey",
    //     "blockYouTubeFullKey",
    //     "blockShortsKey",
    //     "hideYouTubeRecKey"
    // ], (result) => {
    //     let puoInsta = result.blockInstagramKey ?? false;
    //     let puoFb = result.blockFacebookKey ?? false;
    //     let puoTT = result.blockTiktokKey ?? false;
    //     let puoX = result.blockTwitterKey ?? false;
    //     let puoYTF = result.blockYouTubeFullKey ?? false;
    //     let puoShor = result.blockShortsKey ?? false;
    //     let puoYTRec = result.hideYouTubeRecKey ?? false;
    // }
    // );
    // console.log("Loaded values:", { puoInsta, puoFb, puoTT, puoX, puoYTF, puoShor, puoYTRec });
    if(url.startsWith("https://www.youtube.com")){
        hideElementsYoutube(url);
        removeSubscriptions();
    }
    else if(url.startsWith("https://www.tiktok.com")){ 
        console.log(puoTT);
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
});
urlObserver.observe(document.body, {childList: true, subtree: true});
