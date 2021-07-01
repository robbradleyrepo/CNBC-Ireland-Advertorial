/// Social sharing ...

var postLoadFunctions = postLoadFunctions || {};

postLoadFunctions.initScriptLoader = function() {
  function customFunc() {
    var initData = {
      templateName: "wildcard",
      gigya_api_key:
        "2_Jx5rsFp18pauXYlKGzHQVpbahcR1iJ30bbyfqZsn69A6vbt3dQ7gYFCESWKMM1sP",
      socialBarTitle: document.title,
      containerID: "social_bar",
      pos: "top",
      showShareCount: false,
      shareButtons: [
        {
          provider: "twitter"
        },
        {
          provider: "facebook"
        },
        {
          provider: "linkedin"
        },
        {
          provider: "email"
        }
      ]
    };

    initData.showCounts = "none";
    initData.iconsOnly = "true";
    initData.deviceType = "auto";

    initData.onSendDone = CNBC_Gigya_Omniture.onSendDoneTop;

    initData.onLoad = function(e) {
      var targetID = e.containerID;

      var options = {
        callback: fnResponse,
        disabledProviders: "delicious"
      };

      function fnResponse(response) {
        var shareCount = formatTotal(getTotal(response));

        var container = $("#" + targetID).prev();

        if (shareCount) {
          container.removeClass("hide");
          container.find(".share-total").text(shareCount);
        }
      }

      function getTotal(r) {
        var total = 0;

        for (var item in r.shareCounts) {
          if (
            r.shareCounts.hasOwnProperty(item) &&
            typeof r.shareCounts[item] == "number"
          ) {
            total += r.shareCounts[item];
          }
        }
        return total;
      }

      function formatTotal(t) {
        if (!t || typeof t != "number" || t < 2) {
          return false;
        }

        if (t < 1000) {
          return t;
        } else if (t >= 1000 && t < 10000) {
          return (Number(t.toString().slice(0, -2)) / 10).toFixed(1) + "K";
        } else if (t >= 10000) {
          return Math.floor(t / 1000) + "K";
        }
      }
      gigya.socialize.getProviderShareCounts(options);
    };

    if (CNBC_Utils.isMobile()) {
      initData.onSendDone = CNBC_Gigya_Omniture.onSendDone; // onSendDone method is called after Gigya finishes the
      initData.onShareButtonClicked =
        CNBC_Gigya_Omniture.onShareButtonClickedMobile; // onSendDone method is called after
    }
    initData.onConnectionAdded = CNBC_Gigya_Omniture.onConnectionAdded; // Fired whenever a user is connected to a
    // provider
    initData.onConnectionRemoved = CNBC_Gigya_Omniture.onConnectionRemoved;
    initData.onLogin = CNBC_Gigya_Omniture.trackLoginEvent; // call trackLoginEvent when Social Login finishes
    // successfully
    initData.onLogout = CNBC_Gigya_Omniture.onLogout;
    initData.showEmailButton = false;

    if (CNBC_Utils.isMobile()) {
      initData.moreEnabledProviders =
        "facebook, reddit, twitter, tumblr, googleplus, pinterest, digg, stumbleupon";
    } else {
      initData.moreEnabledProviders =
        "facebook, reddit, twitter, linkedin, tumblr, googleplus, pinterest, digg, stumbleupon";
    }

    if (window.conf == undefined) {
      window.conf = {
        APIKey: initData.gigya_api_key
      };
      window.ua = new gigya.services.socialize.UserAction();

      var imgSrc = $("meta[property='og:image']").attr("content");
      var urlLink = $("meta[property='og:url']").attr("content");
      var bigImgSrc = imgSrc.replace("1910x1000", "600x400").split("?");

      if (
        typeof window.ua == "object" &&
        typeof window.ua.setTitle == "function"
      ) {
        window.ua.setTitle(initData.socialBarTitle);
      }

      if (
        typeof window.ua.addMediaItem == "function" &&
        bigImgSrc &&
        bigImgSrc[0]
      ) {
        window.ua.addMediaItem({
          type: "image", // Type of the media (image/flash/mp3)
          src: bigImgSrc[0], // URL to the image source
          href: urlLink // URL to redirect the user when he clicks the image
        });
      }
    }
    initData.userAction = window.ua;
    initData.socialBarTitle = CNBC_Utils.htmlDecode(initData.socialBarTitle);
    gigya.services.socialize.showShareBarUI(initData);
  }

  function loadScripts() {
    script = document.createElement("script");
    script.src =
      "https://fm.cnbc.com/applications/cnbc.com/staticcontent/scripts/social-tools-omniture/gigya-omniture.js";
    document.body.appendChild(script);
    script.addEventListener("load", function(event) {
      customFunc();
    });
  }
  loadScripts();
};
