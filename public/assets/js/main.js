const updatedOpticianForm = document.querySelectorAll("form.update-optician");

// console.log(updatedOpticianForm);

updatedOpticianForm.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const button = this.querySelector("button.cta");

    // console.log(button);

    const url = `https://youandeyeawards-nodeserver.herokuapp.com/api/v1/updateOneOptician/${this.dataset.opticianId}`;

    console.log(url);

    // const url = `http://localhost:3000/api/v1/updateOneOptician/${this.dataset.opticianId}`;
    // console.log(url);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    // console.log(this.getAttribute("data-optician-id"));
    // console.log(this.dataset.opticianId);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        if (data.status === "success") {
          console.log("optician updated");
          button.textContent = "Updated Successfully";
          this.closest(".card").style.borderColor = "green";
        } else {
          button.textContent = "Could Not Update. Contact Admin";
          this.closest(".card").style.borderColor = "red";
        }
      });
  });
});
