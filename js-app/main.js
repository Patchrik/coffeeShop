const url = 'https://localhost:5001/api/beanvariety/';

const targetBeanie = document.querySelector('.beanies');
const button = document.querySelector('#run-button');
button.addEventListener('click', () => {
  getAllBeanVarieties().then((beanVarieties) => {
    console.log(beanVarieties);
    printAllBeanVarieties(beanVarieties);
  });
});

const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', () => {
  console.log('You just clicked the add button.');
  printNewBeanieForm();
});

function getAllBeanVarieties() {
  return fetch(url).then((resp) => resp.json());
}

const printAllBeanVarieties = (beanArray) => {
  const beaniesHTML = beanArray
    .map((bean) => {
      return `<section class="bean card">
              <div><img  class="bean__image image--card" src="${bean.id}" /></div>
              <div class="bean__name">${bean.name}</div>
              <div class="bean__species">${bean.region}</div>
              <div class="bean__length">${bean.notes}</div>
            </section>`;
    })
    .join(' ');
  targetBeanie.innerHTML = beaniesHTML;
};

function printNewBeanieForm() {
  const beanieFormHTML = `<form>
                              <ul>
                                <li>
                                  <label for="name">Name:</label>
                                  <input type="text" id="name" name="bean_name">
                                </li>
                              <li>
                                <label for="region">Region:</label>
                                <input type="text" id="region" name="bean_region">
                              </li>
                              <li>
                                <label for="notes">Notes:</label>
                                <input type="text" id="notes" name="bean_notes">
                              </li>
                                <li class="save-bean-button">
                                <button id="save-button" type="button">Save Bean</button>
                              </li>
                              </ul>
                          </form>`;

  targetBeanie.innerHTML = beanieFormHTML;

  const saveBeanButton = document.getElementById('save-button');
  saveBeanButton.addEventListener('click', saveTheBeanie);
}

function saveTheBeanie() {
  debugger;
  const newBean = {};
  newBean.name = document.querySelector('#name').value;
  newBean.region = document.querySelector('#region').value;
  newBean.notes = document.querySelector('#notes').value;
  fetch('https://localhost:5001/api/beanvariety/', {
    method: 'POST',
    headers: { 'Content-Type': 'Application/JSON' },
    body: JSON.stringify(newBean),
  });
}
