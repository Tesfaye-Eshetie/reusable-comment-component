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
</style>
  <div>
    <h3></h3>
    <h4></h4>
    <p><strong>Comment:</strong> <span></span></p>
    <p><strong>Commented on: </strong>${new Date()}</p>
  </div>`;

class userComment extends HTMLElement {
  constructor() {
    super();

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
  }
}

export default userComment;
