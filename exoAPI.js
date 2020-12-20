document.getElementById("buttonAPI").addEventListener("click", function (event) {
    event.preventDefault();// prevenir que ça va detruire 
    
    //recupere les id du formulaire
    let displaySurface = new Number(document.getElementById("surface").value);
    let displayPropertyType = document.querySelector("#selectHouse").value;
    
    // selection all the drone type in the input
    let displayRoomNumber = new Number(document.getElementById("rooms-number").value);
    let displaypostalCode = new Number(document.getElementById("postalCode").value);

    //Avoir les données dans l'api 
    let data = {
        data: { // "required": ["data"] data, se trouve dans l'api 
            "area": displaySurface,
            "property-type": displayPropertyType,
            "rooms-number": displayRoomNumber,
            "zip-code": displaypostalCode
        }
    }

    console.log(data);

    //http://cnos.herokuapp.com/predict
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://cnos5.herokuapp.com/predict"; // site that doesn’t send Access-Control-*

    fetch(proxyurl + url, {
        method: "POST",
        body: JSON.stringify(data),
        Headers: { "Content-type": "application/json; charset=utf-8" }
    }) // https://cors-anywhere.herokuapp.com/https://example.com

        .then(response => response.json())
        //.then(contents => console.log(contents))
        .then((data) => {
            let pricePrediction = document.getElementById("displayPrice")
            console.log(data.prediction)
            let propertyValue = data.prediction.slice(-18, -9);
            console.log(propertyValue)

             //conversion en euro
             const euro = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
              });

            pricePrediction.innerHTML = "Le prix d'estimation est de " + euro.format(propertyValue); 
            
            
            
            //displaySurface.innerHTML = ;
            // displayPropertyType.innerHTML = data.properties.data.properties;
        })

        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

})

