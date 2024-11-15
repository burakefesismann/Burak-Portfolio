function saatTarihGuncelle() {
    const now = new Date(); 
    const saat = now.getHours().toString().padStart(2, '0'); 
    const dakika = now.getMinutes().toString().padStart(2, '0');   
    const saniye = now.getSeconds().toString().padStart(2, '0');  
    const gun = now.getDate().toString().padStart(2, '0');  
    const ay = (now.getMonth() + 1).toString().padStart(2, '0');  
    const yil = now.getFullYear();  

    const saatMetni = `${saat}:${dakika}:${saniye}`;  
    const tarihMetni = `${gun}/${ay}/${yil}`;  

     
    const saatTarihGosterge = document.getElementById("saatTarihGosterge");
    if (saatTarihGosterge) {
        saatTarihGosterge.innerHTML = `${tarihMetni}  ${saatMetni}`;
    }
}

 
window.onload = function () {
    saatTarihGuncelle();  
    setInterval(saatTarihGuncelle, 1000); 

    const iletisimForm = document.getElementById("iletisimForm");
    if (iletisimForm) {
        iletisimForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const isim = document.getElementById("isim").value;
            const email = document.getElementById("email").value;
            const mesaj = document.getElementById("mesaj").value;

            clearErrors();  

            let hasError = false;

            if (isim.trim() === "") {
                showError(document.getElementById("isim"), "İsim alanı boş bırakılamaz.");
                hasError = true;
            }

            if (email.trim() === "") {
                showError(document.getElementById("email"), "E-posta alanı boş bırakılamaz.");
                hasError = true;
            } else if (!validateEmail(email)) {
                showError(document.getElementById("email"), "Geçerli bir e-posta adresi girin.");
                hasError = true;
            }

            if (mesaj.trim() === "") {
                showError(document.getElementById("mesaj"), "Mesaj alanı boş bırakılamaz.");
                hasError = true;
            }

            if (!hasError) {
                const mailtoLink = `mailto:burakefesismann@gmail.com?subject=İletişim Formu&body=İsim: ${isim}%0D%0AEmail: ${email}%0D%0AMesaj: ${mesaj}`;

                window.location.href = mailtoLink;

                document.getElementById("iletisimForm").reset();
            }
        });
    }
};



function openModal(projeId) {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");

    
    if (projeId === 'proje1') {
        modalTitle.textContent = "Library Management App";
        modalImage.src = "resimler/Proje-1.jpg";
        modalDescription.textContent = "C# dilinde geliştirilen bu Library Management App, kullanıcıların kütüphane yönetimini kolayca ve verimli bir şekilde yapabilmesi için tasarlandı. Kitapların kaydı, üyelik yönetimi ve ödünç işlemleri gibi özelliklerle kullanıcı dostu bir arayüz sunuyor. Arkadaşlarımla birlikte geliştirdiğimiz bu uygulama, kitap tutkunlarının kütüphane deneyimini dijital çağa taşıyor.";
    } else if (projeId === 'proje2') {
        modalTitle.textContent = "Medical Store App";
        modalImage.src = "resimler/Proje-2.jpg";
        modalDescription.textContent = "Java dilinde geliştirilen Medical Store App, ilaç stok takibini kolaylaştıran ve satış işlemlerini düzenleyen bir çözüm sunuyor. Reçetelerin ve ürünlerin yönetimi gibi özelliklerle eczanelerin günlük operasyonlarını hızlandırıyor. Arkadaşlarımla birlikte çalışarak, sağlık sektörü için pratik ve güvenilir bir uygulama ortaya koyduk.";
    } else if (projeId === 'proje3') {
        modalTitle.textContent = "Vehicle Log App";
        modalImage.src = "resimler/Proje-3.jpg";
        modalDescription.textContent = "Araç sahiplerinin ve filoların günlük kullanım kayıtlarını tutabileceği bu Vehicle Log App, Java ile geliştirildi. Yakıt tüketimi, bakım ve yolculuk kayıtları gibi detayların takibi için mükemmel bir araç olarak tasarlandı. Arkadaşlarımla birlikte bu uygulamayı oluşturarak, araç yönetimini daha düzenli ve kolay hale getirdik.";
    }

    
    modal.style.display = "block";
}

document.getElementById("show-all-button").addEventListener("click", showAllProjects);


document.getElementById("show-latest-button").addEventListener("click", showLatestProjects);


document.getElementById("show-popular-button").addEventListener("click", showPopularProjects);

function showAllProjects() {
    
    location.reload();
}


function showLatestProjects() {
    const projectCardsContainer = document.getElementById("project-cards-container");
    const projects = Array.from(projectCardsContainer.querySelectorAll(".project-card"));
    
    
    projects.sort((a, b) => new Date(b.getAttribute("data-date")) - new Date(a.getAttribute("data-date")));

    projectCardsContainer.innerHTML = ""; 
    projects.forEach(project => {
        project.style.display = "block";
        projectCardsContainer.appendChild(project); 
    });
}

function showPopularProjects() {
    const projectCardsContainer = document.getElementById("project-cards-container");
    const projects = Array.from(projectCardsContainer.querySelectorAll(".project-card"));
    
    
    projects.sort((a, b) => b.getAttribute("data-likes") - a.getAttribute("data-likes"));

    projectCardsContainer.innerHTML = ""; 
    projects.forEach(project => {
        project.style.display = "block";
        projectCardsContainer.appendChild(project); 
    });
}


function closeModal() {
    const modal = document.getElementById("projectModal");
    modal.style.display = "none";
}


window.addEventListener('click', function(event) {
    const modal = document.getElementById("projectModal");
    if (event.target === modal) {
        closeModal();
    }
});


function showError(input, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.innerText = message;
    input.parentElement.insertBefore(error, input.nextSibling);
    input.style.borderColor = "red"; 
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(error => error.remove());

    const inputs = document.querySelectorAll("#iletisimForm input, #iletisimForm textarea");
    inputs.forEach(input => input.style.borderColor = ""); 
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


function toggleText() {
    var text1 = document.getElementById("yazi");
    var text2 = document.getElementById("yazi-2");
    var button = document.getElementById("toggleButton");

    if (text2.style.display === "none") {
        text2.style.display = "block"; 
        button.textContent = "Daha Az Gör"; 
    } else {
        text2.style.display = "none"; 
        button.textContent = "Daha Fazla Gör"; 
    }
}
