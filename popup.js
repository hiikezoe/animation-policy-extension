// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function animationPolicyChanged() {
  if (this.checked) {
    var setting = this.value;
    console.log('set policy '+': '+setting);
    browser.browserSettings.imageAnimationBehavior.set({value: setting});
  }
}

function listener(data) {
  console.log('animation policy is changed.');
}

function init() {
  var i18nElements = document.querySelectorAll('*[i18n-content]');
  for (var i = 0; i < i18nElements.length; i++) {
    var elem = i18nElements[i];
    var msg = elem.getAttribute('i18n-content');
    elem.innerHTML = browser.i18n.getMessage(msg);
  }

  // Bug 1410412: onChange hasn't yet implemented.
  // browser.browserSettings.imageAnimationBehavior.onChange.addListener(listener);
  browser.browserSettings.imageAnimationBehavior.get({'incognito': false},
    policy => {
      console.log('get policy '+': '+policy.value);
      var selects = document.querySelectorAll('input');
      for (var i = 0; i < selects.length; i++) {
        if (selects[i].value == policy.value)
          selects[i].checked = true;
      }
    }
  );

  var selects = document.querySelectorAll('input');
  for (var i = 0; i < selects.length; i++) {
    selects[i].addEventListener('change', animationPolicyChanged);
  }
}

window.addEventListener('load', init, false);
