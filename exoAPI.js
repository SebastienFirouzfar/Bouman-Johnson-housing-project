document.getElementById("buttonAPI").addEventListener("click", function () {
    //recupere les id du formulaire
    let displaySurface = new Number(document.getElementById("surface").value);
    let displayPropertyType = document.querySelector("input[name='drone']:checked");
    // selection all the drone type in the input
    let displayRoomNumber = new Number(document.getElementById("rooms-number").value);
    let displaypostalCode = new Number(document.getElementById("postalCode").value);

    //Avoir les données dans l'api 
    let data = {
        data: { // "required": ["data"], se trouve dans l'api 
            "area": displaySurface,
            "property-type": displayPropertyType,
            "rooms-number": displayRoomNumber,
            "zip-code": displaypostalCode
        }
    }

    console.log(data);

    //http://cnos.herokuapp.com/predict
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://cnos.herokuapp.com/predict"; // site that doesn’t send Access-Control-*

    fetch(proxyurl + url, {
        method: "POST",
        body: JSON.stringify(data),
        Headers: { "Content-type": "application/json; charset=utf-8" }
    }) // https://cors-anywhere.herokuapp.com/https://example.com

        .then(response => response.json())
        
        //.then(contents => console.log(contents))
        .then((data) => {
            console.log(data)
            //displaySurface.innerHTML = ;
            // displayPropertyType.innerHTML = data.properties.data.properties;
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
        })

})

