let testFetchbtn = document.getElementById('test')
let testInsertBtn = document.getElementById('add-data-test')


const getTestFromDB = () => {
  fetch('api/test', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}



const addTestToDB = (infos) => {
  fetch('api/addTest', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(infos),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

testFetchbtn.addEventListener('click', (event) => {
  getTestFromDB()
})

testInsertBtn.addEventListener('click', (event) => {
  input = document.getElementById('test-input').value
  addTestToDB({data: input})
})