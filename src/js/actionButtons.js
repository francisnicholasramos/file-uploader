const data = document.getElementById("entity-data")
const entities = JSON.parse(data.textContent);

const entityMap = entities.reduce((map, entity) => {
  map[entity.id] = entity;
  return map;
}, {});

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

// reduce(prev, currentVal)
