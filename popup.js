document.addEventListener('DOMContentLoaded', () => {
    // website options
    const blockInstagram = document.getElementById('blockInstagram');
    const blockFacebook = document.getElementById('blockFacebook');
    const blockTiktok = document.getElementById('blockTiktok');
    const blockTwitter = document.getElementById('blockTwitter');
    // youtube options
    const blockYouTubeFull = document.getElementById('blockYouTubeFull')
    const blockShorts = document.getElementById('blockShorts');
    const hideYouTubeRec = document.getElementById('hideYouTubeRec');

    let optionLists = [blockInstagram, blockFacebook, blockTiktok, blockTwitter, blockYouTubeFull, blockShorts, hideYouTubeRec];
    optionLists.forEach(option => {
        console.log("404as");
        const storageKey = option.id + "Key";
        chrome.storage.sync.get(storageKey, result => {
            if(result[storageKey] !== undefined){
                option.checked = result[storageKey];
            }
            broadcastAction(option.id, option.checked);
        })
        option.addEventListener('change', () => {
            chrome.storage.sync.set({
                [storageKey]: option.checked
            });
            broadcastAction(option.id, option.checked);
        });
    })


})
function broadcastAction(actionName, isChecked){
    console.log("i was ran");
    chrome.tabs.query({
        active: true,
        currentWindow: true,
        },
    function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
            action: actionName,
            value: isChecked
        })
    }
    )
}