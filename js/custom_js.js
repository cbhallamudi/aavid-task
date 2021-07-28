var _tabLength = 1;

function addNewTab(){
  // _tabLength = document.getElementsByClassName('tabcontent').length;
  // console.log(_tabLength);
  // _tabLength = 1;
  document.getElementById('tab').innerHTML += '<button class="tablinks" id="btnId'+_tabLength+'" onclick="openTab(this.id, \'tab'+_tabLength+'\')">Tab'+(_tabLength+1)+'</button>';
  document.getElementById('middle-section').innerHTML += '<div id="tab'+_tabLength+'" class="tabcontent"><p>Tab number'+(_tabLength+1)+' Add Widgets here.</p><button class="tab-content-close-btn" onclick="closeThisTab('+_tabLength+')"><strong class="tab-close">&times;</strong></button></div>';
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById('tab'+_tabLength).style.display = "block";
  document.getElementById('btnId'+_tabLength).className += " active";
  _tabLength++;
  console.log(_tabLength);
}

function openTab(btnId, tabId) {
  console.log(btnId+','+tabId);
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabId).style.display = "block";
  document.getElementById(btnId).className += " active";
} 

function closeThisTab(btnTabId){
  document.getElementById('tab'+btnTabId).remove();
  document.getElementById('btnId'+btnTabId).remove();
  var i, tabcontent, tablinks;
  // _tabLength = document.getElementsByClassName('tabcontent').length;
  tabcontent = document.getElementsByClassName("tabcontent");
  if(tabcontent.length > 1){
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("middle-section").lastChild.style.display = "block";
    document.getElementById("tab").lastChild.className += " active";
    // _tabLength++;
  }else{
    document.getElementById("tab0").style.display = "block";
    document.getElementById("btnId0").className += " active";
    // _tabLength++;   
  }

}
