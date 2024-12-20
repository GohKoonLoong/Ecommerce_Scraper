

// Helper function to extract data
async function extractData() {
    let data = {};

    const url = window.location.href;

    if (url.includes("shopee.com.my")) {

        data.platform = "Shopee";
        data.images = Array.from(document.querySelectorAll("img.uXN1L5.lazyload.raRnQV")).map(image => image.getAttribute('src'))
        data.productName = document.querySelector(".WBVL_7")?.innerText || "N/A";
        data.price = document.querySelector(".IZPeQz.B67UQ0")?.innerText || "N/A";
        data.description = (document.querySelector(".e8lZp3")?.innerText) || "N/A";
        data.colour = (document.querySelector('.flex.items-center.j7HL5Q')?.innerText.split('\n'))|| "N/A";



    } else if (url.includes("tiktok.com")) {
        
        data.platform = "TikTok";
        data.images = document.querySelector("img.lazy-img__onload.lazy-img-m9UfYR.undefined")?.src || "N/A";
        data.productName = document.querySelector(".title-v0v6fK")?.innerText || "N/A";
        data.price = document.querySelector(".price-w1xvrw")?.innerText || "N/A";
        data.description = document.querySelector(".wrapper-dylO2h")?.innerText || "N/A";
   

    } else if (url.includes("lazada.com.my")) {
        const element = document.querySelector('#block-CsL9M6wMIxG');
        
        if(element){
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
            data.platform = "Lazada";
            data.images = document.querySelector(".pdp-mod-common-image.gallery-preview-panel__image")?.src || "N/A";
            data.productName = document.querySelector(".pdp-mod-product-badge-title")?.innerText || "N/A";
            data.price = document.querySelector(".pdp-price")?.innerText || "N/A";
            data.description = document.querySelector(".html-content.detail-content")?.innerText || "N/A";
        }


    }

    console.log("Extracted Data:", data);

    return data;
}

// Send data to the background script or log it
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "extractData") {
//         const data = extractData();
//         sendResponse(data);
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractData") {
        (async () => {
            try {
                const data = await extractData(); // Await the async function
                sendResponse(data); // Send the response back to the sender
            } catch (error) {
                console.error("Error extracting data:", error);
                sendResponse({ error: error.message });
            }
        })();
        return true; // Indicates response will be sent asynchronously
    }
});