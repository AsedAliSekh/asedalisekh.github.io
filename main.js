const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Message Send Successfully!";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 4000);
        });
});





document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("migrationOverlay");
    const popup = document.getElementById("migrationPopup");
    const closeButton = document.getElementById("migrationClose");

    // Safety check
    if (!overlay || !popup || !closeButton) {
        console.error("Migration popup elements not found!");
        return;
    }

    // Close popup function
    function closeMigrationPopup() {
        overlay.setAttribute("hidden", "");
    }

    // Close button click
    closeButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        closeMigrationPopup();
    });

    // Close when clicking outside popup
    overlay.addEventListener("click", function (event) {

        if (!popup.contains(event.target)) {
            closeMigrationPopup();
        }

    });

    // Close using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && !overlay.hidden) {
            closeMigrationPopup();
        }

    });

});
