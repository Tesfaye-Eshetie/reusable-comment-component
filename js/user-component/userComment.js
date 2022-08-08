const template = document.createElement('template');
template.innerHTML = `
<style>
h3, h4 {
  font-weight: bold;
  margin: 1rem 0;
}
h3 {
  font-size: 1.4rem;
}
p {
  font-size: .9rem;
  line-height: 1.4rem;
}
strong {
  font-weight: bold;
}
#preference span {
  min-width: 3rem;
  display: inline-block;
  text-align: center;
}
#preference {
  font-weight: bold;
  font-size: 1.4rem;
}

#preference button {
  width: 6rem;
  height: 3rem;
  border: none;
  border-radius: 10px;
  background-color: seagreen;
  color: white;
}
#preference #bntDislike {
  background-color: #ddA333;
}
</style>
  <div>
    <h3></h3>
    <h4></h4>
    <p><strong>Comment:</strong> <span></span></p>
    <p><strong>Commented on: </strong>${new Date()}</p>
    <div id="preference"> 
      <button id="bntLike">Like</button>
      <span id="like"></span>
      <button id="bntDislike">Dislike</button>
      <span id="dislike"></span>
    </div>
  </div>`;

class userComment extends HTMLElement {
  constructor() {
    super();
    this.countLikes = 0;
    this.countDislikes = 0;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(
      'h3'
    ).textContent = `Name: ${this.getAttribute('name')} `;
    this.shadowRoot.querySelector(
      'h4'
    ).textContent = `Email: ${this.getAttribute('email')}  `;
    this.shadowRoot.querySelector('span').textContent =
      this.getAttribute('comment');
    this.shadowRoot.getElementById('bntLike').onclick = () => this.incLikes();
    this.shadowRoot.getElementById('bntDislike').onclick = () =>
      this.incDislikes();
    this.update('like', this.countLikes);
    this.update('dislike', this.countDislikes);
  }

  incLikes() {
    // eslint-disable-next-line no-plusplus
    this.update('like', ++this.countLikes);
  }

  incDislikes() {
    // eslint-disable-next-line no-plusplus
    this.update('dislike', ++this.countDislikes);
  }

  update(id, count) {
    this.shadowRoot.getElementById(id).textContent = count;
  }
}

export default userComment;
