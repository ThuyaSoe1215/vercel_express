const apiUrl = localStorage.getItem("apiUrl");

const fetchdata = async () => {
  if (apiUrl) {
    const response = await fetch(apiUrl + "/users");
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};

fetchdata();

const uploadFile = async () => {
  const formData = new FormData();
  const fileTag = document.getElementById("inputTag")
  const files = [...fileTag.files]
  files.forEach(file => formData.append("images", file))
  const response = await fetch(apiUrl + "/uploads", {
    method: "POST",
    body: formData,
  });
  console.log(response);
};
