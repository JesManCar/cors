function getCharacter (){
    const characterInput = document.getElementById('name').value.toLowerCase();

    if (!characterInput) {
        alert('Por favor, ingresa un nombre de personaje.');
        return;
    }

    const characterDiv = document.getElementById('characterInfo');
    
    const url = `http://localhost:3001/character/${characterInput}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            characterDiv.innerHTML = '';
            data.forEach(element => {                
                const { name, status, species, gender, origin, image } = element;
                const icon = status === 'Alive' ? '🟢' : status=== "Dead" ? '🔴' : '⚫';
                characterDiv.innerHTML += `<div class="character-card">
                    <h2>${name}</h2>
                    <p><b>Status</b>: ${status} ${icon}</p>
                    <p><b>Species</b>: ${species}</p>
                    <p><b>Gender</b>: ${gender}</p>
                    <p><b>Origin</b>: ${origin}</p>
                    <img src="${image}" alt="${name}">
                    </div>`;
            });
        })
        .catch(error => {
            characterDiv.innerHTML = 
            `<div class="character-card">
                <h2>Error</h2>
                <p>No se encontró el personaje.</p>
                <p>Por favor, verifica el nombre e intenta nuevamente.</p>
                </div>`;;
        });
}