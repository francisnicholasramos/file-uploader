function getShareFileUrl() {
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', async (e) => {
            e.preventDefault();
            const modal = e.target.closest('[data-modal]')
            const expiresIn = e.target.value
            const fileId = modal.dataset.id
            const generatedLink = modal.querySelector('.copyLink')

            if (fileId) {
                try {
                    generatedLink.value = 'Generating URL...'
                    generatedLink.disabled = true
                    const response = await fetch(`/share/file/${fileId}?expiresIn=${expiresIn}`)
                    const data = await response.json()

                    if (response.ok && data.url) {
                        generatedLink.value = data.url;
                        generatedLink.disabled = false
                    }
                } catch (err) {
                    generatedLink.value = 'Failed to generate URL'
                    generatedLink.disabled = true
                    console.log('API Error', data)
                }
            }
        })
    })
}

// TODO: dataset from button with js href link produced by api
function getShareDirectoryUrl() {
    const shareDirectory = document.querySelector(".shareDirBtn")
    const expiresIn = 1;

    shareDirectory.addEventListener("click", async () => {
        if (dataset.id) {
            const response = await fetch(`/share/folder/${folderId}}`)
            const data = await response.json()
        }
    })
}

document.addEventListener('DOMContentLoaded', getShareFileUrl)
// document.addEventListener('DOMContentLoaded', getShareDirectoryUrl)
