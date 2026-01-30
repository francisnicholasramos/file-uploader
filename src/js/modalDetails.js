document.addEventListener("DOMContentLoaded", () => {
    const file = document.querySelectorAll(".file")

    // open modal
    file.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;

            const targetModal = document.querySelector(
                `dialog[data-id="${id}"]`
            );

            targetModal.showModal()
        });
    });

    // close modal
    document.querySelectorAll("[data-close-modal]").forEach(el => {
        el.addEventListener("click", () => {
            el.closest('dialog').close()  
        })
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const newFile = document.getElementById("file")
    const newFolder = document.getElementById("folder")

    if (newFile) {
      newFile.addEventListener("click", () => {
        document.getElementById("new-file").showModal()
      })
    }

    if (newFolder) {
      newFolder.addEventListener("click", () => {
        document.getElementById("new-folder").showModal()
      })
    }

    const closeButtons = document.querySelectorAll(".closeModal");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest('dialog').close();
        });
    });
})

document.addEventListener("DOMContentLoaded", () => {
    const shareFolder = document.getElementById("share");
    if (shareFolder) {
        shareFolder.addEventListener("click", () => {
            document.getElementById("share-folder").showModal();
        });
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const deleteFolder = document.getElementById("delete");
    if (deleteFolder) {
        deleteFolder.addEventListener("click", () => {
            document.getElementById("delete-folder").showModal();
        });
    }
})
