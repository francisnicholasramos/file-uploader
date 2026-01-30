const data = document.getElementById("entity-data")
const entities = JSON.parse(data.textContent);

const entityMap = entities.reduce((map, entity) => {
  map[entity.id] = entity;
  return map;
}, {});

// download file
document.addEventListener('DOMContentLoaded', () => {
    const download = document.querySelectorAll('.download')

    download.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.file-modal')
            const fileId = modal ? modal.dataset.id : btn.dataset.id
            const file = entityMap[fileId]

            if (file) {
                window.location.href = `/files/download/${fileId}`
            }
        })
    })
})

// delete file
document.addEventListener('DOMContentLoaded', () => {
    const deleteFile = document.querySelectorAll('.delete')

    deleteFile.forEach(btn => {
        btn.addEventListener('click', async () => {
            const modal = btn.closest('.file-modal')
            const fileId = modal ? modal.dataset.id : btn.dataset.id
            const file = entityMap[fileId]

            if (file) {
                window.location.href = `/files/deleteFile/${fileId}`
            }
        })
    })
})

// delete folder
document.addEventListener('DOMContentLoaded', () => {
    const deleteFolder = document.querySelectorAll('.deleteFolder')

    deleteFolder.forEach(btn => {
        btn.addEventListener('click', async () => {
            const path = window.location.pathname;
            const folderId = path.split("/").pop();

            if (!folderId || folderId === '') return;

            if (folderId) {
                window.location.href = `/storage/deleteFolder/${folderId}`
            }
        })
    })
})

// reduce(prev, currentVal)
