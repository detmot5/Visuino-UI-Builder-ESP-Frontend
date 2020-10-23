const url = window.location.href;

const valueDisplays = [];
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');
const title = document.getElementById('title');


axios.get(`${url}init`)
.then(response => {
  document.title = response.data;
  title.innerHTML = response.data;

});




const getData = () => {
  axios.get(`${url}input`)
  .then(response => renderData(response))
  console.log("data")
  setTimeout(getData, 1000);
}
getData();












