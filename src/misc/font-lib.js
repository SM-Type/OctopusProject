export async function loadFontFromUrl(url) {
    await loadFontPre()

    return new Promise((resolve, reject) => {
        async function loadFontFromUrl() {
            try {
                const font = new Font("fgf")
                font.onload = (e) => {
                    resolve(e.detail.font)
                }
                font.onerror = (e) => {
                    console.log(e)
                    reject(e)
                }
                font.src = url
            } catch (e) {
                console.log(e)
                reject(e)
            }
        }
        loadFontFromUrl()
    })
}