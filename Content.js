let puoX = false, puoInsta = false, puoFb = false, 
puoTT = false, puoYTF = false, puoShor = false, puoYTRec = false; 
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
function removeBellIcon(){
    let notificationIcon = document.querySelector('ytd-notification-topbar-button-renderer');
        if(notificationIcon) notificationIcon.remove();
}
function removeEndscreen() {
    const observer = new MutationObserver(() => {
        const endscreen = document.querySelector('.ytp-endscreen-content');
        if (endscreen) endscreen.remove();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
}
function watchingVideoCase(){
    removeEndscreen();
    removeRecommendedSideBar();
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
    else if(url.startsWith("https://discord.com/")){
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
    removeBellIcon();
});
urlObserver.observe(document.body, {childList: true, subtree: true});
console.log(puoInsta);
chrome.storage.sync.get([
    "blockInstagramKey",
    "blockFacebookKey",
    "blockTiktokKey",
    "blockTwitterKey",
    "blockYouTubeFullKey",
    "blockShortsKey",
    "hideYouTubeRecKey"
], (result) => {
    puoInsta = result.blockInstagramKey ?? false;
    puoFb = result.blockFacebookKey ?? false;
    puoTT = result.blockTiktokKey ?? false;
    puoX = result.blockTwitterKey ?? false;
    puoYTF = result.blockYouTubeFullKey ?? false;
    puoShor = result.blockShortsKey ?? false;
    puoYTRec = result.hideYouTubeRecKey ?? false;
    console.log("Loaded values:", { puoInsta, puoFb, puoTT, puoX, puoYTF, puoShor, puoYTRec });
});
