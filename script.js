document.getElementById('startAdventure').addEventListener('click', function () {
    // Cacher la div de bienvenue et montrer la création de personnage
    document.querySelector('.welcome-container').style.display = 'none';
    document.querySelector('.character-creation-container').style.display = 'block';

    // Générer les slots de personnage avec des formulaires
    const characterSlots = document.getElementById('characterSlots');
    const totalPoints = 20; // Total points à répartir
    for (let i = 0; i < 3; i++) {
        let slot = document.createElement('div');
        slot.className = 'character-slot';

        // Formulaire pour la création de personnage
        slot.innerHTML = `
<form class="character-form">
    <input type="text" placeholder="Nom du personnage" required />
    <div class="attribute-container">
        <div class="attribute-field"><label>PV/HP: </label><input type="number" name="hp" value="0" min="0" max="${totalPoints}" required /></div>
        <div class="attribute-field"><label>Force: </label><input type="number" name="force" value="0" min="0" max="${totalPoints}" required /></div>
        <div class="attribute-field"><label>Intelligence: </label><input type="number" name="intelligence" value="0" min="0" max="${totalPoints}" required /></div>
        <div class="attribute-field"><label>Chance: </label><input type="number" name="chance" value="0" min="0" max="${totalPoints}" required /></div>
        <div class="attribute-field"><label>Défense: </label><input type="number" name="defense" value="0" min="0" max="${totalPoints}" required /></div>
        <div class="attribute-field"><label>Esquive: </label><input type="number" name="esquive" value="0" min="0" max="${totalPoints}" required /></div>
        <div class="attribute-field"><label>Coups Critiques: </label><input type="number" name="CC" value="0" min="0" max="${totalPoints}" required /></div>
    </div>
    <div class="points-remaining">Points restants : <span id="pointsRemaining${i}">${totalPoints}</span></div>
    <button type="submit">Créer</button>
</form>
`;

        // Gérer la soumission du formulaire
        slot.querySelector('form').onsubmit = function (event) {
            event.preventDefault();
            const name = this.querySelector('input[name="name"]').value;
            const hp = this.querySelector('input[name="hp"]').value;
            const force = this.querySelector('input[name="force"]').value;
            const intelligence = this.querySelector('input[name="intelligence"]').value;
            const chance = this.querySelector('input[name="chance"]').value;
            const defense = this.querySelector('input[name="defense"]').value;
            const esquive = this.querySelector('input[name="esquive"]').value;
            const CC = this.querySelector('input[name="CC"]').value;

            console.log(`Personnage créé : ${name} (Vie: ${hp}, Force: ${force}, Intelligence: ${intelligence}, Chance: ${chance}, Défense: ${defense}, Esquive: ${esquive}, Coups Critiques: ${CC})`);
            // Ici, vous pouvez stocker les données du personnage et gérer l'activation du slot
            // ...
        };

        // Gérer les changements dans les champs d'attribut
        const attributeInputs = slot.querySelectorAll('.attribute-container input');
        attributeInputs.forEach(input => {
            input.addEventListener('change', function () {
                let pointsUsed = 0;
                attributeInputs.forEach(input => {
                    pointsUsed += parseInt(input.value);
                });
                let pointsRemaining = totalPoints - pointsUsed;
                document.getElementById(`pointsRemaining${i}`).textContent = pointsRemaining;

                // Vérifier si le total des points dépasse la limite
                if (pointsRemaining < 0) {
                    alert("Vous ne pouvez pas attribuer plus de 20 points au total.");
                    input.value = parseInt(input.value) + pointsRemaining; // Ajuster la valeur pour que le total soit de 20
                    document.getElementById(`pointsRemaining${i}`).textContent = 0; // Mettre à jour les points restants
                }
            });
        });

        characterSlots.appendChild(slot);
    }
});