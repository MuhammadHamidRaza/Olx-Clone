import { postAdToDb } from "../../../config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "../../../config.js";
onAuthStateChanged(auth, (user) => {
  if (user) {
      window.onSubmit = function() {
        const uid = auth.currentUser.uid //Authentication

          const allInputs = document.getElementsByTagName('input');
          const title = allInputs[0];
          const description = allInputs[1];
          const amount = allInputs[2];
          const image = allInputs[3];

          const ad = {
              title: title.value,
              description: description.value,
              amount: amount.value,
              image: image.files[0],
              uid

          };

          postAdToDb(ad);

          // Clear the file input by setting its value to an empty string
          setTimeout(function(){
          image.value = '';

          title.value = '';
          description.value = '';
          amount.value = '';
        }, 6000);
      };

      const uid = user.uid;
  } else {
      window.location = '../../../login/index.html';
  }
});


