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
            const modal = btn.closest('.modal')
            const fileId = modal ? modal.dataset.id : btn.dataset.id
            const file = entityMap[fileId]

            if (file) {
                window.location.href = `/files/download/${fileId}`
            }
        })
    })
})

// reduce(prev, currentVal)
