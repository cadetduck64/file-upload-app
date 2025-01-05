const showRename = document.querySelectorAll('#request-rename')
// const renameForms = document.querySelectorAll('#rename-form')
const cancelRenameButton = document.querySelectorAll('#cancel-rename')

for (let i = 0; i < showRename.length; i++)
{showRename[i].addEventListener('click', () => {showRename[i].nextElementSibling.hidden = false})
,cancelRenameButton[i].addEventListener('click', () => {cancelRenameButton[i].parentElement.hidden = true})
// ,renameForms[i].addEventListener('focusout', () => {renameForms[i].hidden = true})
}