const fetchdata = async () => {
  const apiUrl = localStorage.getItem("apiUrl")
  if (apiUrl) {
    const response = await fetch(apiUrl+'/users')
    const data = await response.json();
    console.log(data)
  } else {
    window.location.href = "/api"
  }
}

fetchdata();
