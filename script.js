// ===== VARIABLES GLOBALES =====
let panier = [];

// ===== FONCTION POUR AJOUTER AU PANIER =====
function ajouterAuPanier(nom, prix) {
    // Ajouter l'article au panier
    panier.push({
        nom: nom,
        prix: prix
    });
    
    // Mettre à jour l'affichage
    mettreAJourPanier();
    
    // Afficher un message de confirmation
    alert('✅ ' + nom + ' a été ajoutée à votre panier !');
}

// ===== FONCTION POUR METTRE À JOUR L'AFFICHAGE DU PANIER =====
function mettreAJourPanier() {
    // Récupérer les éléments du DOM
    const panierCount = document.getElementById('panier-count');
    const contenuPanier = document.getElementById('contenu-panier');
    const totalPanier = document.getElementById('total-panier');
    const btnCommander = document.getElementById('btn-commander');
    
    // Mettre à jour le compteur
    panierCount.textContent = panier.length;
    
    // Si le panier est vide
    if (panier.length === 0) {
        contenuPanier.innerHTML = '<p class="panier-vide">Votre panier est vide</p>';
        totalPanier.style.display = 'none';
        btnCommander.style.display = 'none';
        return;
    }
    
    // Construire le HTML du panier
    let html = '';
    let total = 0;
    
    panier.forEach((item, index) => {
        html += `
            <div class="panier-item">
                <div>
                    <strong>${item.nom}</strong><br>
                    <span style="color: #ff1493;">Prix : ${item.prix}€</span>
                </div>
                <button class="btn-supprimer" onclick="supprimerDuPanier(${index})">
                    Supprimer
                </button>
            </div>
        `;
        total += item.prix;
    });
    
    // Afficher le panier
    contenuPanier.innerHTML = html;
    totalPanier.innerHTML = 'Total : ' + total + '€';
    totalPanier.style.display = 'block';
    btnCommander.style.display = 'block';
}

// ===== FONCTION POUR SUPPRIMER UN ARTICLE DU PANIER =====
function supprimerDuPanier(index) {
    // Demander confirmation
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        // Supprimer l'article
        panier.splice(index, 1);
        
        // Mettre à jour l'affichage
        mettreAJourPanier();
    }
}

// ===== FONCTION POUR AFFICHER LE FORMULAIRE DE COMMANDE =====
function afficherFormulaire() {
    if (panier.length === 0) {
        alert('❌ Votre panier est vide !');
        return;
    }
    
    // Afficher la section commande
    const sectionCommande = document.getElementById('commande');
    sectionCommande.style.display = 'block';
    
    // Faire défiler jusqu'au formulaire
    sectionCommande.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== GESTION DU FORMULAIRE DE COMMANDE =====
document.addEventListener('DOMContentLoaded', function() {
    const formulaireCommande = document.getElementById('formulaire-commande');
    
    formulaireCommande.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher le rechargement de la page
        
        // Récupérer les valeurs du formulaire
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const adresse = document.getElementById('adresse').value;
        const dateMariage = document.getElementById('date-mariage').value;
        const commentaire = document.getElementById('commentaire').value;
        
        // Calculer le total
        let total = 0;
        panier.forEach(item => {
            total += item.prix;
        });
        
        // Créer le message de confirmation
        let listeRobes = '';
        panier.forEach(item => {
            listeRobes += '<li>' + item.nom + ' - ' + item.prix + '€</li>';
        });
        
        const messageConfirmation = document.getElementById('message-confirmation');
        messageConfirmation.style.display = 'block';
        messageConfirmation.innerHTML = `
            <h3>✅ Commande confirmée !</h3>
            <p><strong>Merci ${nom} !</strong></p>
            <p>Votre commande a été enregistrée avec succès.</p>
            <hr style="margin: 1rem 0; border: 1px solid #c3e6cb;">
            <p><strong>Détails de la commande :</strong></p>
            <ul style="text-align: left; margin: 1rem 0;">${listeRobes}</ul>
            <p><strong>Montant total : ${total}€</strong></p>
            <hr style="margin: 1rem 0; border: 1px solid #c3e6cb;">
            <p>Un email de confirmation a été envoyé à <strong>${email}</strong></p>
            <p>Nous vous contacterons au <strong>${telephone}</strong> dans les 24h pour confirmer les détails.</p>
        `;
        
        // Réinitialiser le formulaire
        formulaireCommande.reset();
        
        // Vider le panier
        panier = [];
        mettreAJourPanier();
        
        // Faire défiler vers le message de confirmation
        messageConfirmation.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    });
});

// ===== GESTION DU FORMULAIRE DE CONTACT =====
document.addEventListener('DOMContentLoaded', function() {
    const formulaireContact = document.getElementById('formulaire-contact');
    
    formulaireContact.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher le rechargement de la page
        
        // Récupérer les valeurs du formulaire
        const nom = document.getElementById('contact-nom').value;
        const email = document.getElementById('contact-email').value;
        const sujet = document.getElementById('contact-sujet').value;
        const message = document.getElementById('contact-message').value;
        
        // Afficher le message de confirmation
        const messageContact = document.getElementById('message-contact');
        messageContact.style.display = 'block';
        messageContact.innerHTML = `
            <h3>✅ Message envoyé !</h3>
            <p><strong>Merci ${nom} !</strong></p>
            <p>Votre message concernant "<strong>${sujet}</strong>" a été envoyé avec succès.</p>
            <p>Nous vous répondrons dans les plus brefs délais à l'adresse <strong>${email}</strong></p>
        `;
        
        // Réinitialiser le formulaire
        formulaireContact.reset();
        
        // Faire défiler vers le message
        messageContact.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Masquer le message après 5 secondes
        setTimeout(function() {
            messageContact.style.display = 'none';
        }, 5000);
    });
});

// ===== NAVIGATION FLUIDE =====
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les liens de navigation
    const liens = document.querySelectorAll('nav a[href^="#"]');
    
    liens.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer l'ID de la section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Faire défiler vers la section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});