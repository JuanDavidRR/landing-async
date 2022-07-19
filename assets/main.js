const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCKTuI9O4W71_DEMgqEw-w_A&part=snippet%2Cid&order=date&maxResults=9'

const content = null || document.getElementById('content')
const errorMessage = document.getElementById('error')

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'af364ea056msh4eb94beac942e10p121adejsn7f0be801b311',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

const fetchData = async (urlAPI) => {
    const response = await fetch(urlAPI, options)
    const data = await response.json()
    return data
}

(async () => {
    try {
        const videos = await fetchData(API)
        let view = `
        ${videos.items.map((video)=> `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src=${video.snippet.thumbnails.high.url} alt=${video.snippet.description} class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0,4).join("")}
        `;
        content.innerHTML = view
    } catch (error) {
        console.error(error);
        let displayError = `
            <h2 class="bg-red-300 p-4 my-3"><b>ERROR:</b> ${error}</h2>
        `
        errorMessage.innerHTML = displayError
    }
})();