import axios from 'axios';
import './main.css';

const form = document.getElementById('form-data');
const id = 'X28Xg10aFdoOBe5CX4Xg';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;

const displayScore = async () => {
  const leaderList = document.getElementById('leader__list');
  const getResult = await axios.get(url);
  const result = await getResult.data.result;
  leaderList.innerHTML = result.map((el, index) => (
    `<li class=${index % 2 !== 0 ? 'gray' : ''}><p>${el.user} : ${el.score}</p></li>`
  )).join(' ');
};
displayScore();
const addResult = async (data) => {
  await axios({
    method: 'post',
    url,
    data,

  });
  displayScore();
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const score = document.getElementById('score');
  const data = {
    user: name.value,
    score: +score.value,
  };
  addResult(data);
  name.value = '';
  score.value = '';
});
