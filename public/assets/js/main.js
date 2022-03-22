const updatedOpticianForm = document.querySelectorAll("form.update-optician");

// console.log(updatedOpticianForm);

updatedOpticianForm.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const url = `https://youandeyeawards-nodeserver.herokuapp.com/api/v1/updateOneOptician/${this.dataset.opticianId}`;
    console.log(url);
    // console.log(this.getAttribute("data-optician-id"));
    // console.log(this.dataset.opticianId);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
});
