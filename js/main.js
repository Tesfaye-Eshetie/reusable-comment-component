window.onload = function setTemplate() {
  document.getElementById('allComments').innerHTML =
    localStorage.getItem('template');
};

function setOnLocalStorage() {
  localStorage.setItem(
    'template',
    document.getElementById('allComments').innerHTML
  );
}

function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

function addComment(ev) {
  let commentText;
  let wrapDiv;
  const textBox = document.createElement('div');
  const replyButton = document.createElement('button');
  replyButton.className = 'reply';
  replyButton.innerHTML = 'Reply';
  const likeButton = document.createElement('button');
  likeButton.innerHTML = 'Like';
  likeButton.className = 'likeComment';
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.className = 'deleteComment';
  if (hasClass(ev.target.parentElement, 'container')) {
    wrapDiv = document.createElement('div');
    wrapDiv.className = 'wrapper';
    wrapDiv.style.marginLeft = 0;
    commentText = document.getElementById('comment').value;
    document.getElementById('comment').value = '';
    textBox.innerHTML = commentText;
    textBox.style.backgroundColor = 'cornflowerblue';
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    // eslint-disable-next-line no-use-before-define
    commentContainer.appendChild(wrapDiv);
  } else {
    wrapDiv = ev.target.parentElement;
    commentText = ev.target.parentElement.firstElementChild.value;
    textBox.innerHTML = commentText;
    textBox.style.backgroundColor = 'paleturquoise';
    wrapDiv.innerHTML = '';
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
  }
  setOnLocalStorage();
}

const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', (ev) => {
  addComment(ev);
});

document.getElementById('allComments').addEventListener('click', (e) => {
  if (hasClass(e.target, 'reply')) {
    const parentDiv = e.target.parentElement;
    const wrapDiv = document.createElement('div');
    wrapDiv.style.marginLeft = `${(
      Number.parseInt(parentDiv.style.marginLeft, 10) + 15
    ).toString()}px`;
    wrapDiv.className = 'wrapper';
    const textArea = document.createElement('textarea');
    textArea.style.marginRight = '20px';
    const addButton = document.createElement('button');
    addButton.className = 'addReply';
    addButton.innerHTML = 'Add';
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.className = 'cancelReply';
    wrapDiv.append(textArea, addButton, cancelButton);
    parentDiv.appendChild(wrapDiv);
  } else if (hasClass(e.target, 'addReply')) {
    addComment(e);
  } else if (hasClass(e.target, 'likeComment')) {
    const likeBtnValue = e.target.innerHTML;
    e.target.innerHTML =
      likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue, 10) + 1 : 1;
    setOnLocalStorage();
  } else if (hasClass(e.target, 'cancelReply')) {
    e.target.parentElement.innerHTML = '';
    setOnLocalStorage();
  } else if (hasClass(e.target, 'deleteComment')) {
    e.target.parentElement.remove();
  }
});
