window.addEventListener("scroll", function() {
  controlNavigation();
});

window.addEventListener("resize", function() {
  controlNavigation();
});

function controlNavigation() {
  if (window.scrollY > 120) {
    document.querySelector(".place_holder_header").classList.add("redux");
  } else {
    document.querySelector(".place_holder_header").classList.remove("redux");
  }
  if (window.scrollY > 120 && window.innerWidth < 720) {
    document.querySelector(".place_holder_header").classList.add("hide");
    document.getElementById("paid_by").classList.add("hide");
  } else {
    document.querySelector(".place_holder_header").classList.remove("hide");
    document.getElementById("paid_by").classList.remove("hide");
  }
  if (window.innerWidth < 720) {
    document.querySelector(".placeholder_footer").classList.remove("hide");
  } else {
    document.querySelector(".placeholder_footer").classList.add("hide");
  }
  if (document.getElementById("CNBCCatalystCampaign_Root")) {
    document.getElementById("CNBCCatalystCampaign_Root").style.marginTop =
      document.querySelector(".place_holder_header").clientHeight +
      document.getElementById("paid_by").clientHeight +
      "px";
  }
  document.getElementById("paid_by").style.top =
    document.querySelector(".place_holder_header").clientHeight + "px";
}

controlNavigation();
