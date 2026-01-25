function getShareFileUrl() {
    // target only what's belong to "modal" scope
    document.querySelectorAll('.file-modal select').forEach(select => {
        const modal = select.closest(".file-modal");
        const inputLink = modal.querySelector(".copyLink")

        inputLink.style.display = 'none'

        select.addEventListener('change', async (e) => {
            e.preventDefault();
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
                        inputLink.style.display = 'block'
                        generatedLink.value = data.url;
                        select.style.display = 'none'
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

function getShareDirectoryUrl() {
    document.querySelectorAll('#share-folder select').forEach(select => {
        const modal = select.closest("#share-folder");
        const inputLink = modal.querySelector(".copyLink")
        const copyBtn = modal.querySelector(".btn-primary");

        inputLink.style.display = 'none'
        copyBtn.style.display = 'none'

        select.addEventListener('change', async (e) => {
            const path = window.location.pathname;
            const folderId = path.split("/storage/").pop();
            const expiresIn = e.target.value

            if (folderId) {
                try {
                    inputLink.value = 'Generating URL...'
                    inputLink.disabled =  true
                    const res = await fetch(`/share/folder/${folderId}?expiresIn=${expiresIn}`)
                    const data = await res.json()

                    if (res.ok && data.publicDirectoryUrl) {
                        select.style.display = 'none'
                        inputLink.style.display = 'block'
                        inputLink.value = data.publicDirectoryUrl;
                        inputLink.disabled = false
                        select.disabled = true
                        copyBtn.style.display = 'block'

                        copyBtn.addEventListener("click", () => {
                            navigator.clipboard.writeText(data.publicDirectoryUrl)
                            copyBtn.textContent = "Copied!"
                            copyBtn.disabled = true
                        })
                    }
                } catch (error) {
                    inputLink.value = 'Failed to generate URL.'
                    inputLink.disabled = true
                }
            }

        })
    })
}

document.addEventListener('DOMContentLoaded', getShareFileUrl)
document.addEventListener('DOMContentLoaded', getShareDirectoryUrl)
