/*!
* Start Bootstrap - Clean Blog v6.0.7 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
let map = L.map('map').setView([53.26763914, -6.19930624], 13);
window.addEventListener('DOMContentLoaded', () => {
    console.log("called content loaded");
   document.querySelector('#copyright').textContent = new Date().getFullYear();
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });


    //maps
// let map = L.map('map').setView([53.26763914, -6.19930624], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoicG9seWFueWFud3UiLCJhIjoiY2wwdjA5bm1hMHlobTNsbjVqbHBhZzJwdyJ9.0szDQLezQVYM0GGdLjlfZg'
}).addTo(map);
// let marker = L.marker([53.26763914, -6.19930624], {title:"MICROSOFT IRELAND OPERATIONS LIMITED"}).addTo(map);
// marker = L.marker([53.27590025, -6.217248351], {title:"GOOGLE"}).addTo(map);
loadCompanies();
// let popup = L.popup()
//     .setLatLng([53.26763914, -6.19930624])
//     .setContent("MICROSOFT IRELAND OPERATIONS LIMITED")
//     .openOn(map);
// map.on('click', onMapClick);
})


function loadCompanies (){
    const companies_json = document.querySelector("#map").dataset.companies;
    const companies = JSON.parse(companies_json);
    let marker;
    for (let company of companies){
     //   console.log(company)
        const content =  company.organisation_name + " <br>" + company.web_address +" <br>"+ company.nace_1_label
                        + " <br>" +company.nace_2_label + " <br>" + company.nace_3_label;
        marker = L.marker([company.latitude, company.longitude], {title:company.organisation_name + "\n" + company.web_address}).addTo(map);
        marker.on('click',function(e){
            console.log("marker clicked = " + e.latlng + " content= " + content );
            let popup = L.popup();
            popup
            .setLatLng(e.latlng)
            .setContent(content)
            .openOn(map);
        });
        console.log(company.latitude + " long ="+ company.longitude + " name==" + company.organisation_name + " web: " + company.web_address);
    }
    // console.log(companies);
}

// function onMapClick(e) {
//     console.log(e.target);
//     if(e.latlng === [53.26763914, -6.19930624]){
//         contentName = "MICROSOFT IRELAND OPERATIONS LIMITED";
//     }else{
//         contentName="";
//     }
//     if (contentName){
//         let popup = L.popup();
//         popup
//         .setLatLng(e.latlng)
//         .setContent(contentName)
//         .openOn(map);
//     }
//  }





