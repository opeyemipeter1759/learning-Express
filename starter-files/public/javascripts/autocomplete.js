function autocomplete(input, latInput, lngInput) {
    // console.log(input, latInput, lngInput);
    if (!input) return;
    const dropdown = new google.maps.places.Autocomplete(input)

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        console.log(place);
        latInput.value = place.geometry.latitude.lat()
        lngInput.value = place.geometry.longitude.lng()

        input.on('keydown', (event) => {
            if (e, keyCode === 13) {
                e.preventDefault();
            }
        })
    })

}

export default autocomplete