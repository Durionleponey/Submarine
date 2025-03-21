function checkCity(cityName) {
    
    if (!cityName) {
        alert("Veuillez entrer un nom de ville.");
        return;
    }

    const apiKey = 'e0b6f34609826a'; // Remplace par ta clé API IPinfo.io

    const url = `https://ipinfo.io/json?token=${apiKey}`;

    // Récupérer la position de l'utilisateur via IPinfo.io
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const userLocation = data.loc.split(',');
            const userLat = parseFloat(userLocation[0]);
            const userLon = parseFloat(userLocation[1]);

            console.log(`Votre position : Lat ${userLat}, Lon ${userLon}`);

            // Récupérer les coordonnées des villes qui correspondent
            const geoUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`;

            fetch(geoUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        alert("❌ Ville non trouvée. Vérifiez l'orthographe.");
                        return;
                    }

                    if (data.length === 1) {
                        // Si une seule ville est trouvée, on la prend directement
                        verifyCity(userLat, userLon, data[0].lat, data[0].lon, cityName);
                    } else {
                        // Si plusieurs villes sont trouvées, demander à l'utilisateur de choisir
                        let cityOptions = "Plusieurs villes trouvées. Choisis un numéro :\n";
                        data.forEach((city, index) => {
                            cityOptions += `${index + 1}. ${city.display_name}\n`;
                        });

                        let choice = prompt(cityOptions);
                        let selectedCity = data[parseInt(choice) - 1];

                        if (selectedCity) {
                            verifyCity(userLat, userLon, selectedCity.lat, selectedCity.lon, cityName);
                        } else {
                            alert("❌ Choix invalide.");
                        }
                    }
                })
                .catch(() => {
                    alert("❌ Erreur lors de la récupération des coordonnées.");
                });
        })
        .catch(() => {
            alert("❌ Erreur lors de la récupération de la position via IPinfo.io.");
        });
}

// Fonction pour comparer les coordonnées
function verifyCity(userLat, userLon, cityLat, cityLon, cityName) {
    cityLat = parseFloat(cityLat);
    cityLon = parseFloat(cityLon);

    console.log(`Position de ${cityName} : Lat ${cityLat}, Lon ${cityLon}`);

    // Comparer la distance
    const distance = getDistanceFromLatLonInKm(userLat, userLon, cityLat, cityLon);

    console.log(`Distance : ${distance} km`);

    if (distance <= 10) {
        alert(`✅ GG ! Tu es bien à ${cityName} (distance : ${distance.toFixed(2)} km)`);
    } else {
        alert(`❌ T'es pas à ${cityName}, tu es à environ ${distance.toFixed(2)} km de là.`);
    }
}

// Fonction pour calculer la distance entre deux points GPS
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
