const data = document.getElementById("entity-data")
const entities = JSON.parse(data.textContent);

const entityMap = entities.reduce((map, entity) => {
  map[entity.id] = entity;
  return map;
}, {});

document.addEventListener('DOMContentLoaded', () => {
    const download = document.querySelectorAll('.download')
    const dataContainer = document.getElementById('data-container');
    const sharedFolderId = dataContainer.dataset.id;

    download.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.file-modal')
            const fileId = modal ? modal.dataset.id : btn.dataset.id
            const file = entityMap[fileId]
            const fileName = file.name

            if (file) {
                window.location.href = `/public/${sharedFolderId}/download/${fileId}?filename=${encodeURIComponent(fileName)}`
            }
        })
    })
})
