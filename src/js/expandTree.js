function expandDirectory() {
    const path = window.location.pathname;
    const id = path.split("/").pop();

    if (!id || id === '') return;

    const targetDirectory = document.getElementById(`${id}`);

    if (targetDirectory) {
        targetDirectory.open = true;

        // expand directories recursively
        expandParentDirectories(targetDirectory)
    }
}

function expandParentDirectories(params) {
    let parent = params.closest('.subtree')

    while (parent) {
        const parentElement = parent.closest('details')

        if (parentElement) {
            parentElement.open = true;
        }

        parent = parentElement?.closest('.subtree')
    }
}

document.addEventListener('DOMContentLoaded', expandDirectory)
