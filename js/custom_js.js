window.onload = function() {
  initDragElement(element="");
};
// Draggable Divs
function initDragElement(element) {
  if(element == ""){
    console.log("No Element");
  }else{

  console.log(element.parentElement.id);
  // console.log("Dragging");
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var popups = document.getElementsByClassName("popup");
  var elmnt = null;
  var currentZIndex = 100; 
  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i];
    var header = getHeader(popup);

    popup.onmousedown = function() {
      this.style.zIndex = "" + ++currentZIndex;
    };

    if (header) {
      header.parentPopup = popup;
      header.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(e) {
    

    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;

    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    console.log("This is a header");
    if (!elmnt) {
      return;
    }

    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function getHeader(element) {
    var headerItems = element.getElementsByClassName("popup-header");

    if (headerItems.length == 1) {
      return headerItems[0];
    }

    return null;
  }
  }
}


// ================================================================
var _tabLength = 1;

function addNewTab(){
  
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("currentTab");
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById('tab').innerHTML += '<button class="tablinks" id="btnId'+_tabLength+'" onclick="openTab(this.id, \'tab'+_tabLength+'\')">Tab'+(_tabLength+1)+'</button>';
  document.getElementById('middle-section').innerHTML += '<div id="tab'+_tabLength+'" class="tabcontent"><p>New Tab, Add Widgets here.</p><button class="tab-content-close-btn" onclick="closeThisTab('+_tabLength+')"><strong class="tab-close">&times;</strong></button></div>';
  document.getElementById('tab'+_tabLength).style.display = "block";
  document.getElementById('tab'+_tabLength).className += " currentTab";
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
    tabcontent[i].classList.remove("currentTab");
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabId).style.display = "block";
  document.getElementById(tabId).className += " currentTab";
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


function closeWidget(widgetId){
    document.getElementById(widgetId).remove();
}

function addWidgetDropdown() {
  console.log("function triggered");
  document.getElementById("myDropdown").classList.toggle("show");
}

function addToCurrentTab(widgetClass) {

  console.log(widgetClass.split("-")[0]);

  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    if(tabcontent[i].classList.contains("currentTab")){
      // console.log(tabcontent[i].getAttribute("id"));
      tabcontent[i].innerHTML += '<div onmousedown="initDragElement(this)" class="popup '+widgetClass+'" id="'+tabcontent[i].getAttribute("id")+'-'+widgetClass+'"><div class="popup-header">Draggable and Resizable Widget: Quote</div><p>A stock quote is the price of a stock as quoted on an exchange. A basic quote for a specific stock provides information, such as its bid and ask price, last traded price, and volume traded.</p><div class="popup-footer"><button onclick="closeWidget(\''+tabcontent[i].getAttribute("id")+'-'+widgetClass+'\')">Close Widget &times;</button></div></div>';
    }
  }

  // element.classList.contains(class);





}
