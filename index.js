const url = window.location.href;

const valueDisplays = [];
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');
const title = document.getElementById('title');


const getData = () => {
  axios.get("http://localhost:8080/users")
  .then(response => renderData(response))
  console.log("data")
  setTimeout(getData, 1000);
}
getData();












